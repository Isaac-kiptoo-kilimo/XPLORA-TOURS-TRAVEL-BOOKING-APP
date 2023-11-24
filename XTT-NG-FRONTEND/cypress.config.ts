import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl:"http://localhost:4200",
    setupNodeEvents(on, config) {
      
    },
  },
});