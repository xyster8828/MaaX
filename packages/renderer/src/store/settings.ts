import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import version from '@/hooks/caller/version'
import { RogueTheme, TouchMode } from '@common/enum/settings'

export enum Locale {
  zhCN = 'ZhCN',
  enUS = 'EnUS',
}

export interface SettingState {
  penguinReportId: string
  yituliuReportId: string
  rogueTheme: RogueTheme
  version: {
    core: {
      current?: string
      latest?: string
    }
    ui: {
      current?: string
      latest?: string
    }
  }
  _locale: Locale
  monsters: boolean
  touchMode: TouchMode
  timers: TimerConfig[]
}

export interface SettingAction {
  checkUpdate: () => void
  setPenguinReportId: (reportId: string) => void
  setYituliuReportId: (reportId: string) => void
  changeLocale: (locale: Locale) => void
  updateVersionInfo: () => void
  changeRogueTheme: (theme: RogueTheme) => void
  toggleMonsters: () => void
  setTouchMode: (mode: TouchMode) => void
  setTimer: (timerConfig: TimerConfig, index:number) => void
}

export interface SettingGetters {
  [K: string]: any
  locale: (state: SettingState) => Locale
}

const useSettingStore = defineStore<'setting', SettingState, SettingGetters, SettingAction>(
  'setting',
  {
    state: () => {
      return {
        penguinReportId: '',
        yituliuReportId: '',
        rogueTheme: RogueTheme.Phantom,
        version: {
          core: {},
          ui: {}
        },
        _locale: Locale.zhCN,
        monsters: false,
        touchMode: TouchMode.minitouch,
        timers: [
          {
            time: '00:00:00',
            enabled: false,
          },
          {
            time: '03:00:00',
            enabled: false,
          },
          {
            time: '06:00:00',
            enabled: false,
          },
          {
            time: '09:00:00',
            enabled: false,
          },
          {
            time: '12:00:00',
            enabled: false,
          },
          {
            time: '15:00:00',
            enabled: false,
          },
          {
            time: '18:00:00',
            enabled: false,
          },
          {
            time: '21:00:00',
            enabled: false,
          },
        ]
      }
    },
    getters: {
      locale (state) {
        if (state.monsters) {
          return Locale.enUS
        }
        return state._locale
      }
    },
    actions: {
      checkUpdate () {
      },
      setPenguinReportId (reportId) {
        this.penguinReportId = reportId
      },
      setYituliuReportId (reportId) {
        this.yituliuReportId = reportId
      },
      changeLocale (locale: Locale) {
        if (this.monsters) {
          this.toggleMonsters()
        }
        this._locale = locale
        const i18n = useI18n()
        i18n.locale.value = this.locale
      },
      async updateVersionInfo () {
        this.version.core.current = await version.core() ?? undefined
        this.version.ui.current = await version.ui()
      },
      changeRogueTheme (theme: RogueTheme) {
        this.rogueTheme = theme
      },
      toggleMonsters () {
        this.monsters = !this.monsters
        if (this.monsters) {
          document.body.className = 'monster'
        } else {
          document.body.className = ''
        }
        const i18n = useI18n()
        i18n.locale.value = this.locale
      },
      setTouchMode (mode: TouchMode) {
        this.touchMode = mode
      },
      setTimer(timerConfig: TimerConfig, index: number) {
        this.timers[index] = timerConfig
      }
    }
  }
)

export default useSettingStore
