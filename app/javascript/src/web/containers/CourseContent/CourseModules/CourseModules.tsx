import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchCourseModules,
  CourseModulesFetchParams,
} from './CourseModules.actions'
import styles from './CourseModules.module.css'
import { CourseModulesState } from './CourseModules.reducer'
import { CourseID } from '../../../../common/types'
import AsyncDOM from '../../../components/AsyncDOM'
import Loader from '../../../components/Loader'
import CourseModule from '../CourseModule'
import { AppState } from '../../../store'

interface Props {
  courseId: CourseID
  fetchCourseModules: typeof fetchCourseModules
  modules: CourseModulesState
}

const CourseModules = (props: Props) => {
  const { courseId } = props

  useEffect(() => {
    const params: CourseModulesFetchParams = {
      courseId,
    }
    props.fetchCourseModules(params, { courseId })
  }, [])

  const modulesAPI = props.modules.byCourse[courseId] || {}
  return (
    <AsyncDOM data={!!modulesAPI.data}>
      <AsyncDOM.Loader show={modulesAPI.loading && !modulesAPI.data}>
        <Loader />
      </AsyncDOM.Loader>

      <AsyncDOM.Content>
        {Array.isArray(modulesAPI.data) && modulesAPI.data.length > 0
          ? modulesAPI.data.map(moduleId => (
              <CourseModule
                className={styles.module}
                courseId={props.courseId}
                moduleId={moduleId}
                moduleData={props.modules.data.byId[moduleId]}
              />
            ))
          : null}
      </AsyncDOM.Content>
    </AsyncDOM>
  )
}

const mapStateToProps = (state: AppState) => ({
  modules: state.modules,
})

export default connect(
  mapStateToProps,
  { fetchCourseModules }
)(CourseModules)
