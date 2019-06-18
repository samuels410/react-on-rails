import React from 'react'
import { Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import DoneIcon from '@material-ui/icons/Done'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styles from './Completed.module.css'
import { CompletedCourseData } from '../CourseCards.types'
import { getGradeText } from '../../../../common/utils/courses'

interface Props {
  data: CompletedCourseData
}

const Completed = (props: Props) => (
  <Card className={styles.card} data-testId="completed-course-card">
    <Link className={styles.cardLink} to={`/courses/${props.data.course_id}`} />
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
          <div className={styles.doneIcon}>
            <DoneIcon />
          </div>
          <Typography variant="body2">Completed</Typography>
        </Grid>
        <Grid className={styles.metaRightBlock}>
          {props.data.grade ? (
            <Typography variant="body2">
              Grade: {getGradeText(props.data.grade)}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

export default Completed
