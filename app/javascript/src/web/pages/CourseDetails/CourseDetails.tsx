import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import CourseRecordings from '../../containers/CourseRecordings'
import IndustryArticles from '../../containers/IndustryArticles'
import styles from './CourseDetails.module.css'

import CourseInfo from '../../containers/CourseInfo'
import CourseContent from '../../containers/CourseContent'

interface CourseDetailsProps {
  match: {
    params: {
      courseId: string | number
    }
  }
}

const CourseDetails = (props: CourseDetailsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: any, value: number) => setActiveTab(value)
  const { courseId } = props.match.params
  return (
    <div className={styles.container}>
      <div className={styles.courseInfo}>
        <CourseInfo courseId={courseId} />
      </div>
      <Paper className={styles.courseBody}>
        <Tabs
          className={styles.tabs}
          classes={{ indicator: styles.indicator }}
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab
            classes={{ root: styles.tab, wrapper: styles.tabContentWrapper }}
            label="Content"
          />
          <Tab
            classes={{ root: styles.tab, wrapper: styles.tabContentWrapper }}
            label="Recordings"
          />
          <Tab
            classes={{ root: styles.tab, wrapper: styles.tabContentWrapper }}
            label="Discussion"
            disabled
          />
          <Tab
            classes={{ root: styles.tab, wrapper: styles.tabContentWrapper }}
            label="Industry Focus"
          />
        </Tabs>
        {activeTab === 0 && <CourseContent courseId={courseId} />}
        {activeTab === 1 && <CourseRecordings courseId={courseId} />}
        {activeTab === 3 && <IndustryArticles courseId={courseId} />}
      </Paper>
    </div>
  )
}

export default CourseDetails
