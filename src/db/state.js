// const { State } = require('../models/state.js')
const state = {
  stages: [{
    name: 'kitchen.',
    description: 'kitchen, kitchen, och kitchen...Dirty table, two chairs  and one door.',
    id: 1,
    elems: [{
      name: 'knife',
      description: 'very sharp knife.'
    },
    {
      name: 'flower',
      description: 'green flower which needs water.'
    }],
    doors: {
      north: undefined,
      south: undefined,
      west: 2,
      east: undefined
    }
  },
  {
    name: 'living room',
    description: 'Huge room with nothing. One sofa. There are one door to kichen. You can go there.',
    id: 2,
    elems: [{
      name: 'newspaper',
      description: 'It is Gazeta Wyborcza with articele about Tomasz is Great!!!'
    },
    {
      name: 'hammer',
      description: 'black hammer'
    }],
    doors: {
      north: undefined,
      south: undefined,
      west: undefined,
      east: 1
    }
  }
  ],
  currentStageId: 1,
  pocket: [],
  systemMessages: [
    'Hello, Hello',
    'Go to the next room. Somebody could wait for you.',
    'What time it is ?',
    'Look at the clock.',
    'It is last hour!'
  ]
}

module.exports = {
  state
}
