import { defineConfig } from "@playwright/test";
import { resolve } from "node:path";
export default defineConfig({
  testDir: "tests/browser",
  timeout: 60000,
  expect: { timeout: 15000 },
  workers: 1,
  retries: 0,
  reporter: [
    ["list"],
    ["json", { outputFile: "docs/evidence/week1/browser-results.json" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4175",
    viewport: { width: 1440, height: 960 },
    headless: true,
    launchOptions: {
      args: [
        "--disable-dev-shm-usage",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  outputDir: ".runtime/test-results",
  webServer: {
    command: "bash scripts/run-workbench.sh",
    env: {
      PORT: "4175",
      APP_ORIGIN: "http://127.0.0.1:4175",
      APP_DATA_DIR: resolve(".runtime/browser-test-data"),
    },
    url: "http://127.0.0.1:4175/healthz",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
