import Command from '../../models/command'
import * as S from 'sanctuary'
import * as CO from '../utils/command-order'
import { match } from 'minta'

const messageWhenEmptyString = (command: Command) => {
  const order = S.prop('order')(command)
  return match(order)(
    S.equals(order)(CO.LookAt),
    () => 'Provide the name of the think you want to look at',
    S.equals(order)(CO.Go),
    () => 'Write down direction where you want to go',
    S.equals(order)(CO.Take),
    () => 'What do you want to take?',
    S.equals(order)(CO.Put),
    () => 'What do you want to put on the ground?',
    S.equals(order)(CO.Talk),
    () => 'Provide the name of the person you want to talk to',
    otherwise => 'Something wrong with your command'
  )
}

export { messageWhenEmptyString }
