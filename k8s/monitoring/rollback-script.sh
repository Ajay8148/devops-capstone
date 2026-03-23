#!/bin/bash

PROM_URL="http://a51fa923f84f14b44ab41d6e68a61fff-1950857517.us-east-1.elb.amazonaws.com:9090"

ERROR_RATE=$(curl -s "$PROM_URL/api/v1/query?query=up" | jq -r '.data.result[0].value[1]')

THRESHOLD=1

echo "Error Rate: $ERROR_RATE"

# Handle empty value
if [ -z "$ERROR_RATE" ] || [ "$ERROR_RATE" = "null" ]; then
  echo "No data from Prometheus. Skipping..."
  exit 1
fi

# Compare safely
RESULT=$(echo "$ERROR_RATE > $THRESHOLD" | bc -l)

if [ "$RESULT" -eq 1 ]; then
  echo "High error rate detected! Rolling back..."
  kubectl rollout undo deployment/todo-app

  echo "Rollback triggered due to high error rate" | mail -s "ALERT" ajayaws81@gmail.com
else
  echo "System healthy"
fi
