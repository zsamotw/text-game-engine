var Terminal = Vue.component('Terminal', {
import { request } from 'http';

<template>
  <div>
    <i class="fas fa-terminal icon-terminal"></i>
    <input v-model="command" v-on:keyup.enter="inputChange" type="text" name="terminal" autofocus>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      command: '' 
    };
  },
  methods: {
    inputChange() {
      this.$emit('command', this.command);
      this.command = '';
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
