# Lib Directory

Core utility functions and infrastructure clients for the Rikminoodt Admin dashboard:

- `api.ts`: Pre-configured Axios instance with authorization bearer token interceptor and global error handlers.
- `utils.ts`: Tailwind CSS class-merging helper (`cn`) and formatting utilities.
- `indexed-db-storage.ts`: Asynchronous IndexedDB storage adapter for local offline caching with automatic fallback.
