type StoredValue = string;

type Entry = [string, StoredValue | null];

// Minimal in-memory AsyncStorage shim for web builds.
const storage = new Map<string, StoredValue>();

const AsyncStorage = {
  async getItem(key: string): Promise<StoredValue | null> {
    return storage.has(key) ? storage.get(key)! : null;
  },

  async setItem(key: string, value: StoredValue): Promise<void> {
    storage.set(key, value);
  },

  async removeItem(key: string): Promise<void> {
    storage.delete(key);
  },

  async clear(): Promise<void> {
    storage.clear();
  },

  async getAllKeys(): Promise<string[]> {
    return Array.from(storage.keys());
  },

  async multiGet(keys: string[]): Promise<Entry[]> {
    return keys.map((key) => [key, storage.has(key) ? storage.get(key)! : null]);
  },

  async multiSet(entries: Entry[]): Promise<void> {
    for (const [key, value] of entries) {
      if (value !== null) {
        storage.set(key, value);
      }
    }
  },

  async multiRemove(keys: string[]): Promise<void> {
    for (const key of keys) {
      storage.delete(key);
    }
  },
};

export const useAsyncStorage = (key: string) => ({
  getItem: () => AsyncStorage.getItem(key),
  setItem: (value: StoredValue) => AsyncStorage.setItem(key, value),
  removeItem: () => AsyncStorage.removeItem(key),
});

export { AsyncStorage };

export default AsyncStorage;
