import { PROGRAM_FETCH, PROGRAM_FETCH_CANCEL } from './CourseProgram.types'

export const fetchProgramDetails = () => ({
  type: PROGRAM_FETCH,
})

export const fetchProgramDetailsCancel = () => ({
  type: PROGRAM_FETCH_CANCEL,
})
