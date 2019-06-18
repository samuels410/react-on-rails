import React from 'react'
import styles from './VideoContentItem.module.css'
import {
  VideoModuleItemData,
  PageModuleItemData,
} from '../../../../common/types'

interface VideoContentItemProps {
  itemData: VideoModuleItemData | PageModuleItemData
}

const VideoContentItem = (props: VideoContentItemProps) => {
  const { itemData } = props

  let itemContentBody = ''
  if (!(itemData.itemContent instanceof Error))
    itemContentBody = `<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' /> <div style="overflow-wrap: break-word;">${
      itemData.itemContent!.body
      }</div>`

  return (
    <div className={styles.container}>
      <span className={styles.extraDetail}>
        Estimated time to complete: 3 min
      </span>
      <div dangerouslySetInnerHTML={{ __html: itemContentBody }} />
    </div>
  )
}

export default VideoContentItem
