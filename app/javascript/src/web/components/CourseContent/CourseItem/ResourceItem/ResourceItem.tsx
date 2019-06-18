import React from 'react'
import AttachFile from '@material-ui/icons/AttachFile'
import LockIcon from '@material-ui/icons/Lock'
import cx from 'classnames'
import SaveAlt from '@material-ui/icons/SaveAlt'
import { Grid, Typography, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import itemStyles from '../CourseItem.module.css'
import resourceItemStyles from './ResourceItem.module.css'
import {
  CourseID,
  ModuleID,
  ItemID,
  ResourceModuleItemData,
} from '../../../../../common/types'
import Loader from '../../../Loader'

interface Props {
  loading: boolean
  error: boolean
  itemId: ItemID
  locked: boolean
  courseId: CourseID
  moduleId: ModuleID
  moduleItem: ResourceModuleItemData
  fetchResource: () => void
}

interface CTAProps {
  loading: boolean
}

const CTA = (props: CTAProps) => {
  return props.loading ? (
    <Loader
      type="circle"
      className={resourceItemStyles.loader}
      loaderProps={{
        variant: 'indeterminate',
        size: 24,
      }}
    />
  ) : (
    <SaveAlt className={itemStyles.itemStatusIcon} />
  )
}

const ResourceItem = (props: Props) => {
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
          <AttachFile className={itemStyles.itemIcon} />
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
          itemStyles.courseItemAboveLink,
          itemStyles.itemStatusIconGrid
        )}
      >
        <IconButton
          disabled={props.locked || props.loading}
          onClick={props.fetchResource}
          className={itemStyles.itemStatusButton}
        >
          {!props.locked ? (
            <CTA loading={props.loading} />
          ) : (
            <LockIcon className={itemStyles.itemStatusIcon} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default ResourceItem
