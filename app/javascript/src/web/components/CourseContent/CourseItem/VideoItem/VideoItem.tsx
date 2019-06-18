import React from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock'
import { Grid, Typography, IconButton } from '@material-ui/core'
import itemStyles from '../CourseItem.module.css'
import { minutesToText } from '../../../../../common/utils'
// import videoStyles from './VideoItem.module.css'

import {
  CourseID,
  ModuleID,
  ItemID,
  VideoModuleItemData,
  PageModuleItemData,
} from '../../../../../common/types'
import { ProgressIcon } from '../../../Icons'

interface Props {
  itemId: ItemID
  courseId: CourseID
  moduleId: ModuleID
  locked: boolean
  moduleItem: VideoModuleItemData | PageModuleItemData
}

const getVideoSecondaryInfo = (
  videoWatched?: number,
  videoLength?: number
): string => {
  if (
    videoLength === undefined ||
    videoWatched === undefined ||
    videoLength < 1 ||
    videoWatched === videoLength
  ) {
    return ''
  }
  if (videoWatched > 0) {
    return `${minutesToText(videoLength - videoWatched)} remaining`
  }
  return minutesToText(videoLength)
}

const getProgressPercent = (progress?: number, total?: number): number =>
  progress && total ? (100 * progress) / total : 0

const VideoItem = (props: Props) => {
  const progress = getProgressPercent(
    props.moduleItem.videoWatchedLength,
    props.moduleItem.videoLength
  )
  return (
    <Grid container className={cx(itemStyles.container)}>
      <Link
        to={`/courses/${props.courseId}/modules/${props.moduleId}/items/${
          props.itemId
        }`}
        className={cx(itemStyles.courseItemLink)}
      />
      <Grid item xs={1} className={cx(itemStyles.itemIconGrid)}>
        <div className={cx(itemStyles.itemIconWrapper)}>
          <PlayArrow className={cx(itemStyles.itemIcon)} />
        </div>
      </Grid>
      <Grid item className={cx(itemStyles.itemTitleGrid)} zeroMinWidth>
        <Typography className={itemStyles.itemTitle} variant="subtitle2" noWrap>
          {props.moduleItem.title}
        </Typography>
      </Grid>
      <Grid item className={itemStyles.itemSecondaryInfoGrid} zeroMinWidth>
        <Typography
          className={itemStyles.itemSecondaryInfoText}
          variant="subtitle2"
          noWrap
        >
          {getVideoSecondaryInfo(
            props.moduleItem.videoWatchedLength,
            props.moduleItem.videoLength
          )}
        </Typography>
      </Grid>
      <Grid item xs={1} className={itemStyles.itemStatusIconGrid}>
        <IconButton
          disabled={props.locked}
          className={itemStyles.itemStatusButton}
        >
          {!props.locked ? (
            <ProgressIcon size={24} value={progress} />
          ) : (
            <LockIcon className={itemStyles.itemStatusIcon} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default VideoItem
