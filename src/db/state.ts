import Actor from '../models/actor'
import Doors from '../models/doors'
import Elem from '../models/elem'
import Stage from '../models/stage'
import State from '../models/state'

const state = {
  stages: [
    {
      id: 1,
      name: 'kitchen.',
      description: 'kitchen, kitchen, och kitchen...Dirty table, two chairs  and one door.',
      elems: [
        {
          name: 'knife',
          description: 'very sharp knife.'
        } as Elem,
        {
          name: 'flower',
          description: 'green flower which needs water.'
        } as Elem
      ],
      doors: {
        north: undefined,
        south: undefined,
        west: 2,
        east: undefined 
      } as Doors
    } as Stage,
    {
      id: 2,
      name: 'living room',
      description: 'Huge room with nothing. One sofa. There are one door to kichen. You can go there.',
      elems: [
        {
          name: 'newspaper',
          description: 'It is Gazeta Wyborcza with articele about Tomasz is Great!!!'
        } as Elem,
        {
          name: 'hammer',
          description: 'black hammer'
        } as Elem
      ],
      doors: {
        north: undefined,
        south: undefined,
        west: undefined,
        east: 1
      } as Doors
    }
  ],
  currentStageId: 1,
  pocket: [],
  actors: [
    {
      id: 1,
      name: 'tomasz',
      description: 'It is tomasz',
      interval: 3000,
      stageId: 1
    } as Actor,
    {
      id: 2,
      name: 'antonina',
      description: 'It is antonina',
      interval: 3000,
      stageId: 2
    } as Actor
  ],
  systemMessages: [
    'Hello, Hello',
    'Go to the next room. Somebody could wait for you.',
    'What time it is ? It is too late...',
    'Look at the clock. It is last hour!',
    'It is last hour!',
    'Are you sure...?',
    'Game has started! You are in the game.',
    'Run run run and run!',
    'It is a place not for you!',
    'Who knows you...?',
    'Go left, go right.',
    'Hello World'
  ]
} as State

export default {
  state
}
