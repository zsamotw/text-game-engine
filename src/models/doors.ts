import{Maybe} from '../features/utils/types'
export default interface Doors {
  north: Maybe<number>
  south: Maybe<number>
  west: Maybe<number>
  east: Maybe<number>
}
