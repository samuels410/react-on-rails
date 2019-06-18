import React, { Fragment } from 'react'
import { LinearProgress, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Link } from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import styles from './Active.module.css'
import { ActiveCourseData } from '../CourseCards.types'
import { ObjectWithStringValues } from '../../../../common/types'

interface Props {
  data: ActiveCourseData
}

const gradeStatus: ObjectWithStringValues = {
  'at risk': 'atRisk',
}

const Active = (props: Props) => {
  return (
    <Card className={styles.card}>
      <Link
        className={styles.cardLink}
        to={`/courses/${props.data.course_id}`}
      />
      <CardMedia
        className={styles.cardMedia}
        image={props.data.image_url}
        title={props.data.course_name}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.cardDesc}>
          <Typography gutterBottom variant="h5" className={styles.cardTitle}>
            {props.data.course_name}
          </Typography>
          <Typography
            gutterBottom
            component="p"
            variant="body2"
            className="multiline-limit multiline-limit-body2"
          >
            {props.data.desc}
          </Typography>
        </div>
        <Grid container className={styles.metaContainer}>
          <Grid item className={styles.metaLeftBlock}>
            {props.data.progress !== undefined &&
            Number.isFinite(props.data.progress) ? (
              <Fragment>
                <LinearProgress
                  variant="determinate"
                  value={props.data.progress}
                  className={styles.progressBar}
                />
                <Typography variant="body2" component="p">
                  {props.data.progress}%
                </Typography>
              </Fragment>
            ) : null}
          </Grid>

          <Grid item className={styles.metaRightBlock}>
            <Typography variant="body2" component="p">
              Marks:{' '}
              <span
                className={
                  styles[gradeStatus[(props.data.grade || '').toLowerCase()]]
                }
              >
                {props.data.marks || '--'}/{props.data.total_marks || '--'}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Active
