# Production showcase tunnel

- Public hostname: `https://prod.huiyuanxp.com`
- Cloudflare Tunnel ID: `3643a015-2cf2-4c25-83d5-48ca8b5a4bd0`
- Local origin: `http://127.0.0.1:4173`
- Token file: `.cloudflare-prod-token` (raw tunnel token only; do not commit)

Start the showcase application on port 4173, then run:

```bash
chmod +x run-prod-tunnel.sh
./run-prod-tunnel.sh
```

In Cloudflare, configure the published application route `prod.huiyuanxp.com` to service `http://localhost:4173` for this tunnel.
