import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import { fetchCourseDetails, CourseListState } from '../Courses'
import { AppState } from '../../store'
import AsyncDOM from '../../components/AsyncDOM'
import Loader from '../../components/Loader'
import CourseInfoComponent from '../../components/CourseInfo'
import styles from './CourseInfo.module.css'

interface OwnProps {
  courseId: number | string
}

interface DispatchProps {
  fetchCourseDetails: typeof fetchCourseDetails
}

interface StateProps {
  courseAPI: CourseListState['byCourse']['x']
  courseData: CourseListState['data']['byId']['x']
}

type Props = OwnProps & DispatchProps & StateProps

const CourseInfo = (props: Props) => {
  useEffect(() => {
    const { courseId } = props
    props.fetchCourseDetails(
      {
        courseId,
      },
      { courseId }
    )
  }, [])

  if (!props.courseAPI) {
    return null
  }

  return (
    <Paper className={styles.container}>
      <AsyncDOM data={!!(props.courseAPI.data && props.courseAPI.data.length)}>
        <AsyncDOM.Loader
          show={
            props.courseAPI.loading && (props.courseAPI.data || []).length === 0
          }
        >
          <Loader />
        </AsyncDOM.Loader>
        <AsyncDOM.Content>
          <CourseInfoComponent
            data={props.courseData}
            courseId={props.courseId}
          />
        </AsyncDOM.Content>
      </AsyncDOM>
    </Paper>
  )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  courseAPI: state.courses.byCourse[ownProps.courseId],
  courseData: state.courses.data.byId[ownProps.courseId],
})

export default connect(
  mapStateToProps,
  { fetchCourseDetails }
)(CourseInfo)
