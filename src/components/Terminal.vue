var Terminal = Vue.component('Terminal', {
import { request } from 'http';
<template>
  <div>
    <i class="fas fa-terminal"></i>
    <input v-model="command" v-on:keyup.enter="addMessage" type="text" name="terminal" autofocus>
  </div>
</template>

<script>
import { process } from "../features/mainProcessor.js";
import { state } from "../db/state.js";

export default {
  data: function() {
    return {
      command: "",
      message: "",
      gameState: state
    };
  },
  methods: {
    addMessage() {
      const { state, message } = process(this.command, this.gameState);
      this.gameState = state;
      this.message = message;
      this.$emit('message', message);
      this.message = '';
      this.command = '';
    }
  }
};
</script>

<style scoped>
input {
  border: none;
  margin-left: 5px;
  outline: none;
}

input :focus {
  outline: none;
}
</style>
})
