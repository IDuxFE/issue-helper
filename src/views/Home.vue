<template>
  <HelloWorld :msg="'hello @idux'"></HelloWorld>
  <IxButton icon="like" mode="primary" @Click="onClick">Click Me</IxButton>
</template>

<script lang="ts" setup>
import { useMessage } from '@idux/components/message'

const { info } = useMessage()
const onClick = () => info('hello @idux')
</script>
