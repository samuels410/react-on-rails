export type ObjectWithStringValues = {
  [s: string]: string
}

export type NestedObjectWithStringValues = {
  [s: string]: string | NestedObjectWithStringValues
}

export type FunctionReturningBoolean = (...args: any[]) => boolean

export type ProgramID = string | number
export type CourseID = string | number
export type ModuleID = string | number
export type ItemID = string | number
export type RecordingID = string | number
export type IndustryArticleID = string | number
export type GradedItemID = string | number

// Course Grade Item: Assignment | Quiz
export interface GradedItemData {
  id: GradedItemID
  total: number
  score: number
  title: string
  date: string
}

// Course Recording
export interface CourseRecordingData {
  id: RecordingID
  imageUrl: string
  authorName: string
  createdAt: number
  title: string
  duration: number
}

// Industry Articles
export interface IndustryArticleData {
  id: IndustryArticleID
  url: string
  title: string
  desc: string
  source: string
  imgUrl: string
}

// Module Items
export type ModuleItem = {
  id: ItemID
  content_details?: {
    due_at?: string
    locked_for_user?: boolean
  }
  title: string
  itemContent?:
    | {
        [s: string]: any
      }
    | Error
}
export interface AssignmentModuleItemData extends ModuleItem {
  type: 'Assignment'
  progress?: number
  isCompleted?: boolean
  score?: number
  total?: number
}
export interface VideoModuleItemData extends ModuleItem {
  type: 'Video'
  title: string
  videoLength?: number
  videoWatchedLength?: number
}
export interface PageModuleItemData extends ModuleItem {
  type: 'Page'
  title: string
  videoLength?: number
  videoWatchedLength?: number
}
export interface LearningMaterialModuleItemData extends ModuleItem {
  type: 'Learning'
  progress?: number
}
export interface SubHeaderModuleItemData extends ModuleItem {
  type: 'SubHeader'
}
export interface LinkModuleItemData extends ModuleItem {
  type: 'ExternalUrl'
  external_url: string
}
export interface ResourceModuleItemData extends ModuleItem {
  type: 'File'
  url: string
  itemContent?:
    | {
        filename: string
        url: string
      }
    | Error
}
export interface QuizModuleItemData extends ModuleItem {
  type: 'Quiz'
  title: string
  isCompleted?: boolean
  score?: number
  total?: number
}
export interface DiscussionQuestionModuleItemData extends ModuleItem {
  type: 'Discussion'
  progress?: number
  isCompleted?: boolean
  score?: number
  total?: number
}
export interface FallbackModuleItemData extends ModuleItem {
  type: ''
}

export type ModuleItemData =
  | AssignmentModuleItemData
  | VideoModuleItemData
  | PageModuleItemData
  | SubHeaderModuleItemData
  | LearningMaterialModuleItemData
  | LinkModuleItemData
  | ResourceModuleItemData
  | QuizModuleItemData
  | DiscussionQuestionModuleItemData
