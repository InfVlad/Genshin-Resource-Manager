import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // setupFiles: 'vitest.setup.ts',
    // testNamePattern: '.*\\.int\\.test\\.ts$',
    environment: 'node',
    // environmentMatchGlobs: [
    //   // all tests in tests/dom will run in jsdom
    //   ['**/*!(.int).test.ts', 'jsdom'],
    //   // all tests in tests/ with .int.test.ts will run in node
    //   ['**/*.int.test.ts', 'node'],
    //   // ...
    // ],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
