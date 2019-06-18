import { ObjectWithStringValues } from '../types'

export const grades: ObjectWithStringValues = {
  E: 'Excellent',
  C: 'Completed',
}

export const getGradeText = (grade: string) => {
  return grades[grade.toUpperCase()]
}
