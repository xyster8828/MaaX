<script lang="ts" setup>
import {
  NSpace,
  NTimePicker,
  NCheckbox
} from 'naive-ui'
import useSettingStore from '@/store/settings'

const settingStore = useSettingStore()
</script>

<template>
  <div id="timer">
    <h2 class="title">
      定时执行
    </h2>
    <div id="advance_setting">
      <n-space :item-style="{
        width: 'calc(50% - 10px)'
      }"
      >
        <n-space :align="'center'" :justify="'center'" v-for="(item, index) in settingStore.timers">
          <n-checkbox v-model:checked="item.enabled" @update:checked="(checked)=>{
            settingStore.setTimer({
             ...item,
             enabled: checked,
            }, index)
          }"
          >

          </n-checkbox>
          <n-time-picker :default-formatted-value="item.time" :on-update:value="(value, formattedValue)=>{
            settingStore.setTimer({
             ...item,
             time: formattedValue,
            }, index)
          }"
          />
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<style>
</style>
