import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, IconButton } from '@material-ui/core'
import cx from 'classnames'
import LockIcon from '@material-ui/icons/Lock'
import { ReactComponent as DiscussionQuestionItemIcon } from '../../../../../common/images/icons/discussion.svg'
import itemStyles from '../CourseItem.module.css'
import {
  CourseID,
  ModuleID,
  ItemID,
  DiscussionQuestionModuleItemData,
} from '../../../../../common/types'
import { readableDate } from '../../../../../common/utils'
import { ProgressIcon } from '../../../Icons'

interface Props {
  itemId: ItemID
  courseId: CourseID
  moduleId: ModuleID
  locked: boolean
  moduleItem: DiscussionQuestionModuleItemData
}

const OVER_DUE_TEXT = 'Overdue'
const getSecondaryInfo = (
  moduleItem: DiscussionQuestionModuleItemData,
  isLocked: boolean
): string => {
  if (moduleItem.isCompleted) {
    if (typeof moduleItem.score === 'number') {
      return `Your Score: ${moduleItem.score}`
    }
  }
  if (isLocked) {
    return ''
  }

  const { content_details = {} } = moduleItem
  if (content_details.due_at && Date.parse(content_details.due_at)) {
    if (new Date(content_details.due_at).getTime() > new Date().getTime()) {
      return `Due Date ${readableDate(content_details.due_at)}`
    }
    return OVER_DUE_TEXT
  }
  return ''
}

const DiscussionQuestionItem = (props: Props) => {
  const secondaryInfo = getSecondaryInfo(props.moduleItem, props.locked)
  const isOverdue = secondaryInfo === OVER_DUE_TEXT
  return (
    <Grid
      container
      className={cx(itemStyles.container, isOverdue && itemStyles.overdue)}
    >
      <Link
        to={`/courses/${props.courseId}/modules/${props.moduleId}/items/${
          props.itemId
        }`}
        className={itemStyles.courseItemLink}
      />
      <Grid item xs={1} className={itemStyles.itemIconGrid}>
        <div className={itemStyles.itemIconWrapper}>
          <DiscussionQuestionItemIcon className={itemStyles.itemIcon} />
        </div>
      </Grid>
      <Grid item className={itemStyles.itemTitleGrid} zeroMinWidth>
        <Typography className={itemStyles.itemTitle} variant="subtitle2" noWrap>
          {props.moduleItem.title}
        </Typography>
      </Grid>
      {secondaryInfo ? (
        <Grid item className={itemStyles.itemSecondaryInfoGrid} zeroMinWidth>
          <Typography
            className={itemStyles.itemSecondaryInfoText}
            variant="subtitle2"
            noWrap
          >
            {secondaryInfo}
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={1} className={itemStyles.itemStatusIconGrid}>
        <IconButton
          disabled={props.locked}
          className={itemStyles.itemStatusButton}
        >
          {!props.locked ? (
            <ProgressIcon
              size={24}
              value={typeof props.moduleItem.score === 'number' ? 100 : 0}
            />
          ) : (
            <LockIcon className={itemStyles.itemStatusIcon} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  )
}
export default DiscussionQuestionItem
