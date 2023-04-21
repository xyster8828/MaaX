import { CronJob } from 'cron'
import logger from '@main/utils/logger'
import { Singleton } from '@common/function/singletonDecorator'
import { ipcMainSend } from '@main/utils/ipc-main'

@Singleton
class CronManager implements Module {
  constructor() {
    this.cronJobs = []
  }

  public clearCronJobs() {
    this.cronJobs.forEach((job) => {
      job.stop()
    })
    this.cronJobs = []
  }

  public createCronJobs(jobs: TimerConfig[]) {
    jobs.forEach((item) => {
      if (item.enabled) {
        let t = item.time.split(':')
        let minute = t[1]
        let hour = t[0]

        this.cronJobs.push(new CronJob(
          `${minute} ${hour} * * *`,
          function () {
            logger.silly('cron task running')
            ipcMainSend('renderer.CronManager:runTask', {})
          },
          null,
          true,
          ''
        ))
      }
    })
  }

  public updateCronJobs(jobs: TimerConfig[]) {
    // logger.silly('update cron jobs', jobs)
    if (!jobs) return
    this.clearCronJobs()
    this.createCronJobs(jobs)
  }

  public get name(): string {
    return 'CronManager'
  }

  public get version(): string {
    return '1.0.0'
  }

  private cronJobs: CronJob[]
}

export default CronManager

