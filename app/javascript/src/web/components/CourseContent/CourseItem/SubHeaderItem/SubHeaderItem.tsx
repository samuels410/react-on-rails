import React from 'react'
import { Typography } from '@material-ui/core'
import cx from 'classnames'
import { ItemID, SubHeaderModuleItemData } from '../../../../../common/types'
import itemStyles from '../CourseItem.module.css'
import subHeaderStyles from './SubHeaderItem.module.css'

interface Props {
  itemId: ItemID
  moduleItem: SubHeaderModuleItemData
}

const SubHeaderItem = (props: Props) => {
  return (
    <div className={cx(itemStyles.container, subHeaderStyles.container)}>
      <Typography variant="subtitle1" className={subHeaderStyles.subHeader}>
        {props.moduleItem.title}
      </Typography>
    </div>
  )
}

export default SubHeaderItem
