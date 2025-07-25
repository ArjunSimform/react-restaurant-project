import { defineConfig } from 'vitest/config';

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     browser: {
//       enabled: true,
//       provider: 'playwright',
//       instances: [{ browser: 'chromium' }],
//     },
//   },
// });

export default defineConfig({
  test: {
    browser: {
      enabled: true, // Enable browser mode
      name: 'chromium', // Or 'firefox', 'webkit'
      provider: 'playwright', // Or 'webdriverio'
    },
    include: ['vitest-example/**/*.test.tsx'], // Include browser tests
    exclude: ['**/node_modules/**'],
  },
});
