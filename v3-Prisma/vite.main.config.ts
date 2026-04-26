import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'better-sqlite3',
        /\.node$/,
      ],
    },
  },
  define: {
    'import.meta.url': 'require("url").pathToFileURL(__filename).href',
  },
});
