/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LinkIcon from '@material-ui/icons/Link'
import cx from 'classnames'
import { IconButton, Link as MaterialLink } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { Link } from 'react-router-dom'
import itemStyles from '../CourseItem.module.css'
import linkItemStyles from './LinkItem.module.css'
import {
  CourseID,
  ModuleID,
  ItemID,
  LinkModuleItemData,
} from '../../../../../common/types'

interface Props {
  itemId: ItemID
  courseId: CourseID
  moduleId: ModuleID
  locked: boolean
  moduleItem: LinkModuleItemData
}

const LinkItem = (props: Props) => {
  return (
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
      <Grid
        item
        xs={1}
        className={cx(
          itemStyles.itemStatusIconGrid,
          itemStyles.courseItemAboveLink
        )}
      >
        {!props.locked ? (
          <MaterialLink
            target="_blank"
            rel="noopener"
            href={props.moduleItem.external_url}
            className={cx(itemStyles.itemStatusButton, linkItemStyles.itemLink)}
          >
            <Typography>VISIT</Typography>
          </MaterialLink>
        ) : (
          <IconButton
            disabled={props.locked}
            className={itemStyles.itemStatusButton}
          >
            <LockIcon className={itemStyles.itemStatusIcon} />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

export default LinkItem
