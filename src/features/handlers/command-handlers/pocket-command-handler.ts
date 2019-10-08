import { Effect } from '../../../models/effect'
import * as EO from '../../utils/effect-operations'
import * as S from 'sanctuary'
import Command from '../../../models/command'
import Element from '../../../models/element'

export const getPocketEffect = function(command: Command, pocket: Element[]) {
  const getElementsNamesFrom = S.map(S.prop('name'))
  const elementsInPocket = getElementsNamesFrom(pocket)

  const messageFrom = S.ifElse(S.equals([]))(() => 'You pocket is empty')(
    elementsInPocket =>
      `You have these things in your pocket: ${S.joinWith(', ')(
        elementsInPocket as string[]
      )}`
  )

  return {
    operation: EO.NoStateChange,
    message: messageFrom(elementsInPocket)
  } as Effect
}
