import Storage from '@main/storageManager'
import CronManager from '@main/cronManager'
import { ipcMainHandle } from '@main/utils/ipc-main'

const storage = new Storage()
const cronManager = new CronManager()

export default function useStorageHooks(): void {
  ipcMainHandle('main.StorageManager:get', async (event, key: string) => {
    return storage.get(key)
  })

  ipcMainHandle('main.StorageManager:set', async (event, key: string, val: any) => {
    storage.set(key, val)

    if (key === 'setting') {
      cronManager.updateCronJobs(val.timers)
    }

    return true
  })

  ipcMainHandle('main.StorageManager:has', async (event, key: string) => {
    return storage.has(key)
  })
}
