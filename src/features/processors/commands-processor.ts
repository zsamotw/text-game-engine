import * as S from 'sanctuary'
import * as EH from '../helpers/effect-helper'
import * as CO from '../utils/command-order'
import State from '../../models/state'
import Command from '../../models/command'
import { match } from 'minta'

// processCommandAndGetEffect :: String -> State -> Effect
const processCommandAndGetEffect = (command: Command, state: State) => {
  const order = S.prop('order')(command)
  return match(order)(
    S.equals(order)(CO.Look),
    () => {
      const { stages, actors, currentStageId } = state
      return EH.getOverviewEffect(stages, actors, currentStageId)
    },
    S.equals(order)(CO.LookAt),
    () => {
      const { stages, currentStageId } = state
      return EH.getDescriptionEffect(command, stages, currentStageId)
    },
    S.equals(order)(CO.Go),
    () => {
      const { stages, currentStageId } = state
      return EH.getChangeStageEffect(command, stages, currentStageId)
    },
    S.equals(order)(CO.Take),
    () => {
      const { stages, currentStageId, pocket } = state
      return EH.getTakenElementEffect(command, stages, currentStageId, pocket)
    },
    S.equals(order)(CO.Put),
    () => {
      const { currentStageId, pocket } = state
      return EH.getPutElementEffect(command, currentStageId, pocket)
    },
    S.equals(order)(CO.Pocket),
    () => {
      const { pocket } = state
      return EH.getPocketEffect(command, pocket)
    },
    S.equals(order)(CO.Talk),
    () => {
      const { actors, currentStageId } = state
      return EH.getTalkEffect(command, currentStageId, actors)
    },
    S.equals(order)(CO.Help),
    () => {
      return EH.getHelpEffect(command, state)
    },
    S.equals(order)(CO.Undefined),
    () => EH.getUndefinedEffect(command, state),
    otherwise => 'Error!!!'
  )
}

export { processCommandAndGetEffect }
