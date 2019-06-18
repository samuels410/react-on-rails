import React from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import { Link } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  IconButton,
  Typography,
} from '@material-ui/core'
import { readableDate, getDurationString } from '../../../common/utils'
import styles from './CourseRecording.module.css'
import { CourseRecordingData, RecordingID } from '../../../common/types'

interface Props {
  recordingId: RecordingID
  data: CourseRecordingData
}

const CourseRecording = (props: Props) => {
  return (
    <Card className={styles.container}>
      <Link className={styles.url} to={`/recordings/${props.data.id}`} />
      <CardMedia className={styles.imageContainer} image={props.data.imageUrl}>
        <Typography variant="body2" className={styles.duration}>
          {getDurationString(props.data.duration)}
        </Typography>
      </CardMedia>
      <CardContent className={styles.contentContainer}>
        <CardActionArea className={styles.playIconContainer}>
          <IconButton className={styles.playIconButton}>
            <PlayArrow />
          </IconButton>
        </CardActionArea>

        <Typography variant="h6" noWrap>
          {[props.data.title, readableDate(props.data.createdAt)].join(' - ')}
        </Typography>

        {props.data.authorName ? (
          <Typography variant="subtitle2">
            By {props.data.authorName}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default CourseRecording
