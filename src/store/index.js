import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  messages : ['firsr', 'last']
}

const getters = {
  getMessages(state) {
    return state.messages
  }
}

const store = new Vuex.Store({
  state,
  getters
})

// const store = new Vuex.Store({
//   state: {
//     messages: 0 //['first', 'second']
//   },
//   mutations: {
//     addMessage (state, message) {
//       state.messages.push(message)
//     }
//   },
//   getters: {
//     myMessages: state => {
//       return 'mumessage'//state.messages
//     }
//   }
// })

export default {
  store
}
