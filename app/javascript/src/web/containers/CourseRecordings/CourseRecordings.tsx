import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import { AppState } from '../../store'
import { fetchCourseRecordings } from './CourseRecordings.actions'
import CourseRecordingComponent from '../../components/CourseRecording'
import { CourseID } from '../../../common/types'
import AsyncDOM from '../../components/AsyncDOM'
import Loader from '../../components/Loader'
import styles from './CourseRecordings.module.css'
import { CourseRecordingsState } from './CourseRecordings.reducer'

interface OwnProps {
  courseId: CourseID
}

interface DispatchProps {
  fetchCourseRecordings: typeof fetchCourseRecordings
}

interface StateProps {
  recordingsData: CourseRecordingsState['data']['byId']
  recordingsAPI: CourseRecordingsState['byCourse']['x']
}

type Props = StateProps & OwnProps & DispatchProps

export const CourseRecordings = (props: Props) => {
  useEffect(() => {
    if (
      !props.recordingsAPI ||
      (props.recordingsAPI.loading === false &&
        props.recordingsAPI.data.length === 0)
    ) {
      const { courseId } = props
      props.fetchCourseRecordings({ courseId }, { courseId })
    }
  }, [])

  if (!props.recordingsAPI) {
    return null
  }

  return (
    <div className={styles.container}>
      <AsyncDOM data={!!props.recordingsAPI.data.length}>
        <AsyncDOM.Loader show={props.recordingsAPI.loading}>
          <Loader />
        </AsyncDOM.Loader>
        <AsyncDOM.Content>
          <Grid container spacing={4}>
            {props.recordingsAPI.data.map(recordingId =>
              props.recordingsData[recordingId] ? (
                <Grid key={recordingId} item xs={4}>
                  <CourseRecordingComponent
                    recordingId={recordingId}
                    data={props.recordingsData[recordingId]!}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AsyncDOM.Content>
      </AsyncDOM>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  recordingsData: state.courseRecordings.data.byId,
  recordingsAPI: state.courseRecordings.byCourse[ownProps.courseId],
})

export default connect(
  mapStateToProps,
  { fetchCourseRecordings }
)(CourseRecordings)
