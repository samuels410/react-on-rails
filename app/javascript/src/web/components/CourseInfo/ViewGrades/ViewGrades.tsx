import React, { useState } from 'react'
import {
  Button,
  Typography,
  Popper,
  ClickAwayListener,
  Paper,
} from '@material-ui/core'
import { CourseID } from '../../../../common/types'
import CourseGrades from '../../../containers/CourseGrades'
import styles from './ViewGrades.module.css'

interface Props {
  courseId: CourseID
}

const ViewGrades = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const id = open ? 'course-grades-handler' : undefined
  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const clickAwayHandler = (event: any) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <ClickAwayListener onClickAway={clickAwayHandler}>
      <div>
        <Button
          className={styles.viewGradesButton}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Typography
            className={styles.viewGradesText}
            variant="subtitle2"
            color="primary"
          >
            View Grades
          </Typography>
        </Button>

        <Popper
          className={styles.popover}
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal
          placement="bottom-end"
          modifiers={{
            flip: { enabled: false },
          }}
        >
          <Paper className={styles.gradeBookContainer}>
            <Typography variant="h5">GradeBook</Typography>
            <CourseGrades
              className={styles.gradeBook}
              courseId={props.courseId}
            />
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}

export default ViewGrades
