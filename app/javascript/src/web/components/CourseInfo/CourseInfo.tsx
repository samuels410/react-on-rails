import React from 'react'
import { Grid, LinearProgress, Typography } from '@material-ui/core'
import styles from './CourseInfo.module.css'
import AuthorImages from './AuthorImages'
import ReadMore from '../ReadMore'
import { CourseID } from '../../../common/types'
import ViewGrades from './ViewGrades'

interface CourseInfo {
  course_name: string
  progress?: number
}

interface Props {
  courseId: CourseID
  data: CourseInfo
}

const CourseInfo = (props: Props) => {
  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} alignItems="flex-start">
        <Grid item xs={9}>
          <Typography variant="h4">{props.data.course_name}</Typography>
        </Grid>
        <Grid container item xs={3} justify="flex-end" alignItems="center">
          <Grid item xs={6}>
            <Typography variant="subtitle2" className={styles.courseMarks}>
              Marks: <span>45 / 50</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ViewGrades courseId={props.courseId} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.progressGrid}>
        <Typography variant="subtitle2" className={styles.progressValue}>
          {props.data.progress || 10}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={props.data.progress || 10}
        />
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={6}>
          <Typography variant="h6">Skills</Typography>
          <Typography>Python, R, Ensembling techniques.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Authors and Mentors</Typography>
          <Typography>
            <AuthorImages />
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Overview</Typography>
        <Typography variant="body2">
          <ReadMore limit={500}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt diam ligula, eget maximus orci ullamcorper eget.
            Pellentesque vitae nisl eget lorem interdum iaculis et a nulla.
            Aenean mi risus, aliquet in nulla at, auctor molestie tortor. Duis
            ornare ex sem, sed gravida nibh ultrices ut. Integer ut risus
            rutrum, porta sapien dapibus, pulvinar risus. Aenean vulputate lorem
            neque, et congue ligula molestie eu. Pellentesque vitae nisl eget
            lorem interdum iaculis et a nulla. Aenean mi risus, aliquet in nulla
            at, auctor molestie tortor. Duis ornare ex sem, sed gravida nibh
            ultrices ut. Integer ut risus rutrum, porta sapien dapibus, pulvinar
            risus. Aenean vulputate lorem neque, et congue ligula molestie eu.
          </ReadMore>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CourseInfo
