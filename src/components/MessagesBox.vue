var MessagesBox = Vue.component('MessagesBox', {
<template>
  <div class="messages">
    <div v-for="message in messages">
      <div class="message">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['messages'],
  data: function () {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style  scoped>
.messages {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
  margin: 20px 20px 20px;
}

.message {
  padding: 10px;
}
</style>
})
