#!/usr/bin/env bash
set -euo pipefail

TUNNEL_ID="3643a015-2cf2-4c25-83d5-48ca8b5a4bd0"
TOKEN_FILE="${PROD_TUNNEL_TOKEN_FILE:-.cloudflare-prod-token}"
ORIGIN="${PROD_ORIGIN:-http://127.0.0.1:4173}"

if [[ ! -f "$TOKEN_FILE" ]]; then
  echo "Missing Cloudflare tunnel token file: $TOKEN_FILE" >&2
  exit 2
fi

if ! curl -fsS "$ORIGIN" >/dev/null 2>&1; then
  echo "Warning: origin $ORIGIN is not responding yet; tunnel will still start." >&2
fi

exec cloudflared tunnel --no-autoupdate run --token-file "$TOKEN_FILE" "$TUNNEL_ID"
