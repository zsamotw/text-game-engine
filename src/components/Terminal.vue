var Terminal = Vue.component('Terminal', {
<template>
  <div>
    <input v-model="command" v-on:keyon.enter="addMessage" type="text" name="terminal">
    <div>Command is {{ command }}</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      command: ''
    }
  },
  methods: {
    addMessage () {
      console.log(this.command)
    }
  }
}
</script>

<style  scoped>
</style>
})
