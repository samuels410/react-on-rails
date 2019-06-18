import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'
import {
  ActiveCard,
  FailedCard,
  UpcomingCard,
  CompletedCard,
  CompletedCourseData,
  UpcomingCourseData,
  FailedCourseData,
  ActiveCourseData,
} from '../../components/CourseCards'
import styles from './Courses.module.css'
import { fetchCourseList } from './Courses.actions'
import { AppState } from '../../store'
import { CourseListState } from './Courses.reducer'
import { ObjectWithStringValues } from '../../../common/types'
import Loader from '../../components/Loader'
import AsyncDOM from '../../components/AsyncDOM'

export interface Props {
  classes: ObjectWithStringValues
  fetchCourseList: typeof fetchCourseList
  courses: CourseListState
}

const style = () => ({
  courseCategoryHeader: {
    marginBottom: 20,
  },
})

export class Courses extends Component<Props> {
  componentDidMount() {
    this.props.fetchCourseList({ programId: 154 })
  }

  renderActiveCourses() {
    if (!this.props.courses.data || !('byId' in this.props.courses.data)) {
      return null
    }

    const {
      activeIds: courseIds = [],
      byId: coursesById,
    } = this.props.courses.data
    if (!coursesById || !courseIds.length) {
      return null
    }

    return (
      <div className={styles.courseCategoryContainer}>
        <Typography
          variant="h5"
          classes={{ root: this.props.classes.courseCategoryHeader }}
        >
          Active Courses
        </Typography>
        <Grid container spacing={4} className={styles.courseList}>
          {courseIds.map(courseId => (
            <Grid key={courseId} item xs={12} sm={6}>
              <ActiveCard data={coursesById[courseId] as ActiveCourseData} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  renderFailedCourses() {
    if (!this.props.courses.data || !('byId' in this.props.courses.data)) {
      return null
    }

    const {
      failedIds: courseIds = [],
      byId: coursesById,
    } = this.props.courses.data
    if (!coursesById || !courseIds.length) {
      return null
    }

    return (
      <div className={styles.courseCategoryContainer}>
        <Typography
          variant="h5"
          classes={{ root: this.props.classes.courseCategoryHeader }}
        >
          Failed Courses
        </Typography>
        <Grid container spacing={4} className={styles.courseList}>
          {courseIds.map(courseId => (
            <Grid key={courseId} item xs={12} sm={6}>
              <FailedCard data={coursesById[courseId] as FailedCourseData} />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  renderUpcomingCourses() {
    if (!this.props.courses.data || !('byId' in this.props.courses.data)) {
      return null
    }

    const {
      upcomingIds: courseIds = [],
      byId: coursesById,
    } = this.props.courses.data
    if (!coursesById || !courseIds.length) {
      return null
    }

    return (
      <div className={styles.courseCategoryContainer}>
        <Typography
          variant="h5"
          classes={{ root: this.props.classes.courseCategoryHeader }}
        >
          Upcoming Courses
        </Typography>
        <Grid container spacing={4} className={styles.courseList}>
          {courseIds.map(courseId => (
            <Grid key={courseId} item xs={12} sm={6}>
              <UpcomingCard
                data={coursesById[courseId] as UpcomingCourseData}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  renderCompletedCourses() {
    if (!this.props.courses.data || !('byId' in this.props.courses.data)) {
      return null
    }

    const {
      completedIds: courseIds = [],
      byId: coursesById,
    } = this.props.courses.data
    if (!coursesById || !courseIds.length) {
      return null
    }

    return (
      <div className={styles.courseCategoryContainer}>
        <Typography
          variant="h5"
          classes={{ root: this.props.classes.courseCategoryHeader }}
        >
          Completed Courses
        </Typography>
        <Grid container spacing={4} className={styles.courseList}>
          {courseIds.map(courseId => (
            <Grid key={courseId} item xs={12} sm={6}>
              <CompletedCard
                data={coursesById[courseId] as CompletedCourseData}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  render() {
    const programInfo = this.props.courses.byProgram[154]
    if (!programInfo) {
      return null
    }

    return (
      <div className={styles.container}>
        <AsyncDOM data={!!this.props.courses.data}>
          <AsyncDOM.Loader
            show={programInfo.loading && (programInfo.data || []).length === 0}
          >
            <Loader />
          </AsyncDOM.Loader>

          <AsyncDOM.Content>
            {this.renderActiveCourses()}
            {this.renderFailedCourses()}
            {this.renderUpcomingCourses()}
            {this.renderCompletedCourses()}
          </AsyncDOM.Content>
        </AsyncDOM>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  courses: state.courses,
})

export default connect(
  mapStateToProps,
  { fetchCourseList }
)(withStyles(style)(Courses))
