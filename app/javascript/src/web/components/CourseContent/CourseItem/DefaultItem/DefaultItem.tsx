/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LinkIcon from '@material-ui/icons/Link'
import LockIcon from '@material-ui/icons/Lock'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import itemStyles from '../CourseItem.module.css'
import {
  CourseID,
  ModuleID,
  ItemID,
  FallbackModuleItemData,
} from '../../../../../common/types'

interface Props {
  itemId: ItemID
  courseId: CourseID
  moduleId: ModuleID
  locked: boolean
  moduleItem: FallbackModuleItemData
}

const DefaultItem = (props: Props) => (
  <Grid container className={itemStyles.container}>
    <Link
      to={`/courses/${props.courseId}/modules/${props.moduleId}/items/${
        props.itemId
      }`}
      className={itemStyles.courseItemLink}
    />
    <Grid item xs={1} className={itemStyles.itemIconGrid}>
      <div className={itemStyles.itemIconWrapper}>
        <LinkIcon className={itemStyles.itemIcon} />
      </div>
    </Grid>
    <Grid item className={itemStyles.itemTitleGrid} zeroMinWidth>
      <Typography className={itemStyles.itemTitle} variant="subtitle2" noWrap>
        {props.moduleItem.title}
      </Typography>
    </Grid>
    <Grid item xs={1} className={itemStyles.itemStatusIconGrid}>
      <IconButton
        disabled={props.locked}
        className={itemStyles.itemStatusButton}
      >
        {!props.locked ? (
          <Typography color="primary">VISIT</Typography>
        ) : (
          <LockIcon className={itemStyles.itemStatusIcon} />
        )}
      </IconButton>
    </Grid>
  </Grid>
)

export default DefaultItem
