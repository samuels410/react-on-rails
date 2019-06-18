import React from 'react'
import cx from 'classnames'
import { Typography } from '@material-ui/core'
import styles from './CourseModule.module.css'
import { ModuleData } from '../../../containers/CourseContent/CourseModules/CourseModules.reducer'

interface Props {
  className?: string
  children?: React.ReactNode
  moduleData: ModuleData
  hasMore: boolean
}

const CourseModule = (props: Props) => {
  return (
    <div
      className={cx(
        styles.container,
        props.className,
        props.hasMore && styles.hasMore
      )}
    >
      <div>
        <Typography variant="h6" className={styles.moduleName}>
          {props.moduleData.name}
        </Typography>
      </div>
      {props.children}
    </div>
  )
}

CourseModule.defaultProps = {
  hasMore: false,
}

export default CourseModule
