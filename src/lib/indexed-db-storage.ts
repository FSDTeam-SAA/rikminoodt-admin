/**
 * IndexedDB Storage Helper for offline caching and persistent client data.
 */

const DB_NAME = "rikminoodt_admin_cache"
const STORE_NAME = "app_keyval"
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB is not supported in this environment"))
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export const indexedDbStorage = {
  async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(key)

        request.onsuccess = () => resolve(request.result !== undefined ? request.result : null)
        request.onerror = () => reject(request.error)
      })
    } catch {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : null
      }
      return null
    }
  },

  async setItem<T = any>(key: string, value: T): Promise<void> {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.put(value, key)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
      }
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(key)

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key)
      }
    }
  },

  async clear(): Promise<void> {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const request = store.clear()

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    } catch {
      if (typeof window !== "undefined") {
        localStorage.clear()
      }
    }
  },
}
