import Actor from '../models/actor'
import Doors from '../models/doors'
import Element from '../models/element'
import Stage from '../models/stage'
import CommandsHistory from '../models/commandsHistory'

const stages: Stage[] = [
  {
    id: 0,
    name: 'kitchen.',
    description:
      'kitchen, kitchen, och kitchen...Dirty table, two chairs  and one door.',
    elements: [
      {
        name: 'knife',
        description: 'very sharp knife.'
      } as Element,
      {
        name: 'flower',
        description: 'green flower which needs water.'
      } as Element
    ],
    doors: {
      north: 2,
      south: undefined,
      west: 1,
      east: undefined
    } as Doors
  } as Stage,
  {
    id: 1,
    name: 'living room',
    description:
      'Huge room with nothing. One sofa. There are one door to kichen. You can go there.',
    elements: [
      {
        name: 'newspaper',
        description:
          'It is Gazeta Wyborcza with articele about Tomasz is Great!!!'
      } as Element,
      {
        name: 'hammer',
        description: 'black hammer'
      } as Element
    ],
    doors: {
      north: undefined,
      south: undefined,
      west: undefined,
      east: 0
    } as Doors
  } as Stage,
  {
    id: 2,
    name: 'Bathroom',
    description: 'Just Bathroom.',
    elements: [
      {
        name: 'soap',
        description: 'Red soap.'
      } as Element
    ],
    doors: {
      north: undefined,
      south: 0,
      west: undefined,
      east: undefined
    } as Doors
  } as Stage
]

const currentStageId: number = 0

const pocket: Element[] = []

const actors: Actor[] = [
  {
    id: 1,
    name: 'tomasz',
    description: 'It is tomasz',
    knowledge: 'halo it is Tomasz',
    interval: 300000,
    stageId: 0
  } as Actor,
  {
    id: 1,
    name: 'antonina',
    description: 'It is antonina',
    knowledge: 'halo it is Antonina',
    interval: 300000,
    stageId: 1
  } as Actor
]

const messages: string[] = ['Welcome in game']

const commandsHistory = {
  command: '',
  commands: [],
  position: 0
} as CommandsHistory

export { stages, currentStageId, pocket, actors, messages, commandsHistory }
