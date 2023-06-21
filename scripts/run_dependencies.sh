#!/usr/bin/env bash

set -e

echo
echo "Tearing down any existing cluster resources..."
echo
docker-compose down --remove-orphans

# Run the image
exec docker-compose -f ./docker-compose.yml up
