#!/bin/bash

# Script to inject environment variables into index.html from index.html.template
#
# Usage:
#   ./inject-env.sh
#
# Environment variables:
#   GOOGLE_ANALYTICS_STREAM_ID - Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
#
# For local development, you can source a .env file before running the script:
#   export $(cat .env | xargs) && ./inject-env.sh

set -e

# Load .env file if it exists (for local development)
if [ -f .env ]; then
    echo "Loading environment variables from .env file"
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if GOOGLE_ANALYTICS_STREAM_ID is set
if [ -z "$GOOGLE_ANALYTICS_STREAM_ID" ]; then
    echo "Error: GOOGLE_ANALYTICS_STREAM_ID environment variable is not set" >&2
    echo "For local development, create a .env file with:" >&2
    echo "  GOOGLE_ANALYTICS_STREAM_ID=G-XXXXXXXXXX" >&2
    exit 1
fi

# Validate format (basic check for G-XXXXXXXXXX format)
if ! echo "$GOOGLE_ANALYTICS_STREAM_ID" | grep -qE '^G-[A-Z0-9]+$'; then
    echo "Warning: GOOGLE_ANALYTICS_STREAM_ID format may be invalid: $GOOGLE_ANALYTICS_STREAM_ID" >&2
    echo "Expected format: G-XXXXXXXXXX" >&2
fi

# Replace placeholder with actual value using sed
sed "s/{{GOOGLE_ANALYTICS_STREAM_ID}}/$GOOGLE_ANALYTICS_STREAM_ID/g" index.html.template > index.html

echo "Successfully generated index.html with Google Analytics ID"
