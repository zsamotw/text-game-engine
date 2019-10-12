import { match } from 'minta'
import { getChangeStageEffect } from '../handlers/command-handlers/go-command-handler'
import { getDescriptionEffect } from '../handlers/command-handlers/look-at-command-handler'
import { getHelpEffect } from '../handlers/command-handlers/help-command-handler'
import { getOverviewEffect } from '../handlers/command-handlers/look-command-handler'
import { getPocketEffect } from '../handlers/command-handlers/pocket-command-handler'
import { getPutElementEffect } from '../handlers/command-handlers/put-command-handler'
import { getTakenElementEffect } from '../handlers/command-handlers/take-command-handler'
import { getTalkEffect } from '../handlers/command-handlers/talk-command-handler'
import { getUndefinedEffect } from '../handlers/command-handlers/undefined-command-handler'
import * as CO from '../utils/command-order'
import * as S from 'sanctuary'
import Command from '../../models/command'
import State from '../../models/state'

// processCommandAndGetEffect :: String -> State -> Effect
const processCommandAndGetEffect = (command: Command, state: State) => {
  const order = S.prop('order')(command)
  return match(order)(
    S.equals(order)(CO.Look),
    () => {
      const { stages, actors, currentStageId } = state
      return getOverviewEffect(stages, actors, currentStageId)
    },
    S.equals(order)(CO.LookAt),
    () => {
      const { stages, currentStageId, actors } = state
      return getDescriptionEffect(command, stages, currentStageId, actors)
    },
    S.equals(order)(CO.Go),
    () => {
      const { stages, currentStageId } = state
      return getChangeStageEffect(command, stages, currentStageId)
    },
    S.equals(order)(CO.Take),
    () => {
      const { stages, currentStageId, pocket } = state
      return getTakenElementEffect(command, stages, currentStageId, pocket)
    },
    S.equals(order)(CO.Put),
    () => {
      const { currentStageId, pocket } = state
      return getPutElementEffect(command, currentStageId, pocket)
    },
    S.equals(order)(CO.Pocket),
    () => {
      const { pocket } = state
      return getPocketEffect(command, pocket)
    },
    S.equals(order)(CO.Talk),
    () => {
      const { actors, currentStageId } = state
      return getTalkEffect(command, currentStageId, actors)
    },
    S.equals(order)(CO.Help),
    () => {
      return getHelpEffect(command, state)
    },
    S.equals(order)(CO.Undefined),
    () => {
      const { settings } = state
      getUndefinedEffect(command, settings)
    },
    otherwise => 'Error!!!'
  )
}

export { processCommandAndGetEffect }
