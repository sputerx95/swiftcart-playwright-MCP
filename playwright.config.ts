import { defineConfig, devices } from "@playwright/test";

const baseURL =
  process.env.BASE_URL?.trim() || "https://swiftcart-sanaev-dev.lovable.app";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ["html", { open: "never" }],
    ["list"]
  ],
  use: {
    baseURL,
    actionTimeout: 15_000,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 30_000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
