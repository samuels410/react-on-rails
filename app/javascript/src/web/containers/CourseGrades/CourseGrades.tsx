import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { fetchCourseGrades } from './CourseGrades.actions'
import { AppState } from '../../store'
import { CourseGradesState } from './CourseGrades.reducer'
import { CourseID, GradedItemData } from '../../../common/types'
import CourseGradesComponent from '../../components/CourseGrades'
import AsyncDOM from '../../components/AsyncDOM'
import Loader from '../../components/Loader'
import { pick } from '../../../common/utils'
import styles from './CourseGrades.module.css'

interface DispatchProps {
  fetchCourseGrades: typeof fetchCourseGrades
}
interface StateProps {
  courseGradesData: CourseGradesState['data']['byId']
  courseGradesAPI: CourseGradesState['byCourse']['x']
}
interface OwnProps {
  courseId: CourseID
  className?: string
}
type Props = OwnProps & DispatchProps & StateProps

const CourseGrades = (props: Props) => {
  useEffect(() => {
    if (!props.courseGradesAPI || !props.courseGradesAPI.loading) {
      const { courseId } = props
      props.fetchCourseGrades({ courseId }, { courseId })
    }
  }, [])

  if (!props.courseGradesAPI) {
    return null
  }

  return (
    <div className={cx(styles.container, props.className)}>
      <AsyncDOM data={!!props.courseGradesAPI.data.length}>
        <AsyncDOM.Loader
          show={
            props.courseGradesAPI.loading &&
            props.courseGradesAPI.data.length === 0
          }
        >
          <Loader className={styles.loader} />
        </AsyncDOM.Loader>
        <AsyncDOM.Content>
          <CourseGradesComponent
            data={
              pick(
                props.courseGradesData,
                props.courseGradesAPI.data
              ) as GradedItemData[]
            }
          />
        </AsyncDOM.Content>
      </AsyncDOM>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  courseGradesData: state.courseGrades.data.byId,
  courseGradesAPI: state.courseGrades.byCourse[ownProps.courseId],
})

export default connect(
  mapStateToProps,
  { fetchCourseGrades }
)(CourseGrades)
