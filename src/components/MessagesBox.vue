var MessagesBox = Vue.component('MessagesBox', {
<template>
  <div class="messages">
    <div v-for="message in Messages">{{message}}</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {},
  created () {
  },
  computed: {
    Messages () {
      return ['messs', 'halo', 'jekjdfkjdkfj']
    }
  }
}
</script>

<style  scoped>
.messages {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

}
</style>
})
