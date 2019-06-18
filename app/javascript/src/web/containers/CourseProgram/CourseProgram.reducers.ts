import { CourseID } from '../../../common/types'

export interface CourseProgramData {
  list?: CourseID[]
}

export interface CourseProgramState {
  data: null | CourseProgramData
  loading?: boolean
  error?: boolean
}

const courseProgramReducer = () => {}

export default courseProgramReducer
