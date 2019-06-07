var home = Vue.component('Home', {
import Terminal from './Terminal.vue'
import MessagesBox from './MessagesBox.vue'
<template>
  <div class="contener">
    <div class="title">{{ title }}</div>
    <div class="game-field">
      <MessagesBox v-bind:messages="messages"></MessagesBox>
      <Terminal v-on:command="processCommand"></Terminal>
    </div>
  </div>
</template>

<script>
import { clone } from 'ramda';
import { state } from '../db/state.js';
import { getResult, matchResult } from '../features/mainProcessor.js';
import { getSystemMessagesFromState } from '../features/systemMessageProcessor';
import { getActorsStream } from '../features/actorsProcessor';
import MessagesBox from './MessagesBox';
import Terminal from './Terminal';

export default {
  components: {
    Terminal,
    MessagesBox
  },
  data: function() {
    return {
      gameState: state,
      title: 'Game',
      messages: ["Welcome in G a m e"]
    };
  },
  methods: {
    processCommand: function(command) {
      const result = getResult(command, clone(this.gameState));
      const { state, message } = matchResult(result, clone(this.gameState));
      this.gameState = state;
      this.messages.push(message);
    }
  },
  created: function() {
    getSystemMessagesFromState(state).subscribe(m => this.messages.push(m));
    getActorsStream(this.gameState).subscribe(state => {
      this.gameState = state;
    })
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
  font-size: 200%;
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
