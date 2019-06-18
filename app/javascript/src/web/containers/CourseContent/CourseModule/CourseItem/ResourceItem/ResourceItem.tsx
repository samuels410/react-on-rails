import React from 'react'
import { connect } from 'react-redux'
import { ResourceItem as ResourceItemComponent } from '../../../../../components/CourseContent/CourseItem'
import {
  ItemID,
  CourseID,
  ModuleID,
  ResourceModuleItemData,
} from '../../../../../../common/types'
import { fetchCourseItemContent } from '../CourseItem.actions'

interface Props {
  itemId: ItemID
  courseId: CourseID
  moduleId: ModuleID
  locked: boolean
  moduleItem: ResourceModuleItemData
  fetchCourseItemContent: typeof fetchCourseItemContent
}

interface State {
  loading: boolean
  error: boolean
}

const downloadFile = async ({
  url,
  fileName,
}: {
  url: string
  fileName: string
}) => {
  const fileReq = await fetch(url)
  if (fileReq.ok) {
    const fileBlob = await fileReq.blob()
    const blobUrl = window.URL.createObjectURL(fileBlob)
    const anchorElement = document.createElement('a')
    anchorElement.href = blobUrl
    anchorElement.download = fileName
    document.body.appendChild(anchorElement)
    anchorElement.click()
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl)
      anchorElement.remove()
    })
  } else {
    throw new Error(`Unable to download file: ${fileName}`)
  }
}

class ResourceItem extends React.Component<Props, State> {
  state = {
    loading: false,
    error: false,
  }

  componentDidUpdate() {
    if (
      this.state.loading &&
      this.props.moduleItem.itemContent &&
      !(this.props.moduleItem.itemContent instanceof Error)
    ) {
      const { url, filename: fileName } = this.props.moduleItem.itemContent
      downloadFile({ url, fileName })
        .then(() => this.setState({ loading: false }))
        .catch(() => this.setState({ loading: false, error: true }))
    }
  }

  fetchResource = async () => {
    /** Prevent re-triggering if download is already in progress  */
    if (this.state.loading) {
      return
    }
    console.log('received click')

    this.setState(
      {
        loading: true,
        error: false,
      },
      () => {
        if (!this.props.moduleItem.itemContent) {
          const params = {
            url: this.props.moduleItem.url,
          }
          const meta = {
            itemId: this.props.itemId,
          }
          this.props.fetchCourseItemContent(params, meta)
        }
      }
    )
  }

  render() {
    return (
      <ResourceItemComponent
        {...this.props}
        error={this.state.error}
        loading={this.state.loading}
        fetchResource={this.fetchResource}
      />
    )
  }
}

export default connect(
  null,
  { fetchCourseItemContent }
)(ResourceItem)
