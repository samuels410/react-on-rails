import React from 'react'
import { connect } from 'react-redux'
import styles from './NavigationContent.module.css'
import ItemsNavigator, {
  ItemsNavigatorData,
} from '../../../../components/ItemsNavigator'
import {
  CourseID,
  ModuleItemData,
  ItemID,
  ModuleID,
} from '../../../../../common/types'
import { AppState } from '../../../../store'
import { CourseModulesState } from '../../../CourseContent/CourseModules'
import { CourseModuleItemsState } from '../../../CourseContent/CourseModule'

interface NavigationContentProps {
  courseId: CourseID
  moduleId: ModuleID
  itemId: ItemID
  modules: CourseModulesState
  moduleItems: CourseModuleItemsState
}

const NavigationContent = (props: NavigationContentProps) => {
  const { courseId, moduleId, itemId, moduleItems, modules } = props

  const navigationData: ItemsNavigatorData = Object.keys(
    moduleItems.byModule
  ).map(id => {
    const courseModuleId = moduleItems.byModule[id]

    let moduleItemIds: ItemID[] = []
    if (courseModuleId) moduleItemIds = [...courseModuleId.data]
    const moduleName = modules.data.byId[id].name

    if (moduleItemIds) {
      const items: (ModuleItemData)[] = []
      moduleItemIds.forEach(moduleItemId => {
        const itemData = moduleItems.data.byId[moduleItemId]
        if (itemData && itemData.type !== 'SubHeader') items.push(itemData)
      })
      return { id, name: moduleName, items }
    }
    return { id, name: moduleName }
  })

  return (
    <div className={styles.container}>
      <ItemsNavigator
        items={navigationData}
        path={`/courses/${courseId}/modules/`}
        defaultPanel={moduleId}
        defaultPanelItem={itemId}
      />
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  moduleItems: state.moduleItems,
  modules: state.modules,
})
export default connect(mapStateToProps)(NavigationContent)
