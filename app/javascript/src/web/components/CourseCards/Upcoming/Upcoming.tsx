import React, { useState, Fragment } from 'react'
// import { withStyles, Theme } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import LockIcon from '@material-ui/icons/Lock'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import { render } from 'react-testing-library'
import styles from './Upcoming.module.css'
import { UpcomingCourseData } from '../CourseCards.types'
import { readableDate } from '../../../../common/utils'
import Alert from '../../Alert'

interface Props {
  data: UpcomingCourseData
}

const AlertComponent = () => {
  const [isOpen, setAlertStatus] = useState(false)
  const onClose = () => setAlertStatus(false)
  const onOpen = () => setAlertStatus(true)
  return (
    <Fragment>
      <div role="presentation" className={styles.cardLink} onClick={onOpen} />
      <Alert
        open={isOpen}
        onClose={onClose}
        variant="warning"
        message="Course is not yet active"
      />
    </Fragment>
  )
}

const Upcoming = (props: Props) => (
  <Card className={styles.card}>
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
          component="p"
          variant="body2"
          className="multiline-limit multiline-limit-body2"
        >
          {props.data.desc}
        </Typography>
      </div>
      <Grid container className={styles.metaContainer}>
        <Grid item className={styles.metaLeftBlock}>
          <div className={styles.lockIconContainer}>
            <LockIcon className={styles.lockIcon} />
          </div>
        </Grid>
        <Grid>
          {props.data.start_date ? (
            <Typography variant="body2" component="p">
              Available from {readableDate(props.data.start_date)}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </CardContent>
    <AlertComponent />
  </Card>
)

export default Upcoming
