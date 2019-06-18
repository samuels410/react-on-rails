import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { fetchCourseModuleItems } from './CourseModule.actions'
import { CourseModule as CourseModuleComponent } from '../../../components/CourseContent'
import { AppState } from '../../../store'
import { ModuleID, CourseID, ItemID } from '../../../../common/types'
import { CourseModuleItemsState } from './CourseModule.reducer'
import { ModuleData } from '../CourseModules/CourseModules.reducer'
import styles from './CourseModule.module.css'
import CourseItem from './CourseItem'
import ShowMore from '../../../components/ShowMore'

interface Props {
  courseId: CourseID
  moduleId: ModuleID
  moduleData: ModuleData
  moduleItems: CourseModuleItemsState
  className?: string
  fetchCourseModuleItems: typeof fetchCourseModuleItems
}

const PAGE_SIZE = 10

class CourseModule extends React.Component<Props, { page: number }> {
  state = {
    page: 1,
  }

  componentDidUpdate(prevProps: Props) {
    const prevAPIData = prevProps.moduleItems.byModule[this.props.moduleId]
    const currAPIData = this.props.moduleItems.byModule[this.props.moduleId]
    if (
      prevAPIData &&
      currAPIData &&
      prevAPIData.loading !== currAPIData.loading &&
      currAPIData.loading
    ) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }))
    }
  }

  loadNextPage = () => {
    const moduleItemsAPIData = this.props.moduleItems.byModule[
      this.props.moduleId
    ]

    if (!moduleItemsAPIData || moduleItemsAPIData.data.length === 0) {
      return
    }

    /** If data is available for next page, use the same; else trigger a fetch request */
    if (moduleItemsAPIData.data.length > (this.state.page + 1) * PAGE_SIZE) {
      this.setState(prevState => ({ page: prevState.page + 1 }))
    } else {
      const { courseId, moduleId } = this.props
      const params = {
        courseId,
        moduleId,
        include: ['content_details'],
        per_page: PAGE_SIZE,
        page: this.state.page + 1,
      }
      const meta = {
        courseId,
        moduleId,
      }
      this.props.fetchCourseModuleItems(params, meta)
    }
  }

  renderItem = (itemId: ItemID, idx: number, moduleItemsList: ItemID[]) => {
    const moduleItem = this.props.moduleItems.data.byId[itemId]
    if (
      !moduleItem ||
      (moduleItem.type === 'SubHeader' && idx === moduleItemsList.length - 1)
    ) {
      return null
    }

    const isItemAvailableForUser =
      moduleItem.content_details &&
      moduleItem.content_details.locked_for_user === false
    return (
      <CourseItem
        key={itemId}
        locked={!isItemAvailableForUser}
        itemId={itemId}
        courseId={this.props.courseId}
        moduleId={this.props.moduleId}
        moduleItem={moduleItem}
      />
    )
  }

  renderModuleItems(moduleItemsList: ItemID[]) {
    return moduleItemsList
      .slice(0, this.state.page * PAGE_SIZE)
      .map(this.renderItem)
  }

  render() {
    const moduleAPIData = this.props.moduleItems.byModule[this.props.moduleId]
    if (
      !moduleAPIData ||
      moduleAPIData.data.length === 0 ||
      ('count' in moduleAPIData && moduleAPIData.count === 0)
    ) {
      return null
    }

    const isNextPageAvailable =
      moduleAPIData.count > this.state.page * PAGE_SIZE

    return (
      <div className={cx(styles.container, this.props.className)}>
        <CourseModuleComponent
          moduleData={this.props.moduleData}
          className={styles.moduleContainer}
          hasMore={isNextPageAvailable}
        >
          {this.renderModuleItems(moduleAPIData.data)}
          {isNextPageAvailable && (
            <ShowMore
              className={styles.showMore}
              loading={moduleAPIData.loading}
              onClick={this.loadNextPage}
            />
          )}
        </CourseModuleComponent>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  moduleItems: state.moduleItems,
})

export default connect(
  mapStateToProps,
  { fetchCourseModuleItems }
)(CourseModule)
