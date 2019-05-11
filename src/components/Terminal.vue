var Terminal = Vue.component('Terminal', {
import { request } from 'http';

<template>
  <div>
    <i class="fas fa-terminal icon-terminal"></i>
    <input v-model="command" v-on:keyup.enter="addMessage" type="text" name="terminal" autofocus>
  </div>
</template>

<script>
import { clone } from "ramda";
import { getResult, matchResult } from "../features/mainProcessor.js";
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
      const result = getResult(this.command, clone(this.gameState));
      const { state, message } = matchResult(result, clone(this.gameState));
      this.gameState = state;
      this.message = message;
      this.$emit("message", message);
      this.message = "";
      this.command = "";
    }
  }
};
</script>

<style scoped>
.icon-terminal {
  font-size: 80%;
}

input {
  font-size: 15px;
  border: none;
  margin-left: 5px;
  outline: none;
}

input :focus {
  outline: none;
}
</style>
})
