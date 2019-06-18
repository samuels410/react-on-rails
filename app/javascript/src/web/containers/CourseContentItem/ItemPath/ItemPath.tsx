import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BreadcrumbsNavigation from '../../../components/BreadCrumbs'
import styles from './ItemPath.module.css'
import { AppState } from '../../../store'
import { CourseListState, fetchCourseDetails } from '../../Courses'
import { CourseID, ItemID } from '../../../../common/types'
import { CourseModuleItemsState } from '../../CourseContent/CourseModule'

interface ItemPathProps {
  fetchCourseDetails: typeof fetchCourseDetails
  courses: CourseListState
  courseId: CourseID
  itemId: ItemID
  moduleItems: CourseModuleItemsState
}

const ItemPath = (props: ItemPathProps) => {
  const { courseId, itemId } = props

  const courseDetails = props.courses.data.byId[courseId]
  const itemDetails = props.moduleItems.data.byId[itemId]

  useEffect(() => {
    if (!courseDetails) {
      props.fetchCourseDetails({ courseId }, { courseId })
    }
  }, [])

  if (courseDetails && itemDetails) {
    return (
      <div className={styles.container}>
        <BreadcrumbsNavigation
          breadCrumbs={[
            { pathName: 'courses', pathUrl: '/courses' },
            {
              pathName: courseDetails.course_name,
              pathUrl: `/courses/${courseId}`,
            },
            {
              pathName: itemDetails.title,
            },
          ]}
        />
      </div>
    )
  }

  return null
}

const mapStateToProps = (state: AppState) => ({
  courses: state.courses,
  moduleItems: state.moduleItems,
})

export default connect(
  mapStateToProps,
  { fetchCourseDetails }
)(ItemPath)
