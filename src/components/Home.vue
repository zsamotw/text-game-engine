var home = Vue.component('Home', {
<template>
  <div class="contener">
    <div class="title">{{ title }}</div>
    <div class="game-field">
      <MessagesBox></MessagesBox>
      <Terminal></Terminal>
    </div>
  </div>
</template>

<script>
import Terminal from './Terminal'
import MessagesBox from './MessagesBox'

export default {
  components: {
    Terminal,
    MessagesBox
  },
  data: function () {
    return {
      title: 'Game'
    }
  },
  methods: {}
}
</script>

<style  scoped>
.contener {
  height: 80vh;
  width: 90vw;
}

.title {
}
.game-field {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>

})
