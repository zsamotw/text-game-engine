var home = Vue.component('Home', {
import Terminal from './Terminal.vue'
import MessagesBox from './MessagesBox.vue'
<template>
  <div class="contener">
    <div class="title">{{ title }}</div>
    <div class="game-field">
      <MessagesBox v-bind:messages="messages"></MessagesBox>
      <Terminal v-on:message="addMessage"></Terminal>
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
      title: 'Game',
      messages: ['Welcome in G a m e']
    };
  },
  methods: {
    addMessage: function (message) {
      this.messages.push(message)
    }
  }
};
</script>

<style  scoped>
.contener {
  height: 80vh;
  width: 90vw;
}

.title {
  text-decoration: brown;
  text-transform: uppercase;
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
