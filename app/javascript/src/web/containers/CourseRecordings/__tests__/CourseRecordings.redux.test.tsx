import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import {
  getCourseRecordingsMiddleware,
  getCourseRecordingsAPI,
} from '../CourseRecordings.middlewares'
import getCourseRecordingsReducer from '../CourseRecordings.reducer'
import {
  fetchCourseRecordings,
  fetchCourseRecordingsCancel,
} from '../CourseRecordings.actions'

describe('Courses/Redux', () => {
  const mockData = [
    {
      authorName: 'Kedar Joshi',
      imageUrl:
        'https://greatlearning.hosted.panopto.com/Panopto/Services/FrameGrabber.svc/FrameRedirect?objectId=d862c732-e671-4344-a678-aa4a004e9d29&mode=Delivery&random=0.451539313165256',
      createdAt: 4365464564646,
      id: 21,
      duration: 4535,
      title: 'Session 1',
    },
    {
      authorName: 'Kedar Joshi',
      imageUrl:
        'https://greatlearning.hosted.panopto.com/Panopto/Services/FrameGrabber.svc/FrameRedirect?objectId=06086fa0-8b22-407c-a423-aa28004c870e&mode=Delivery&random=0.451539313165256',
      createdAt: 4365412364646,
      id: 22,
      duration: 56443,
      title: 'Session 2',
    },
    {
      authorName: 'Kedar Joshi',
      imageUrl:
        'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      createdAt: 4365462544646,
      id: 23,
      duration: 3401,
      title: 'Session 3',
    },
    {
      authorName: 'Kedar Joshi',
      imageUrl:
        'https://greatlearning.hosted.panopto.com/Panopto/Services/FrameGrabber.svc/FrameRedirect?objectId=387c0e92-c94d-4648-8d16-aa36006cacb5&mode=Delivery&random=0.451539313165256',
      createdAt: 4365465764646,
      id: 24,
      duration: 1232,
      title: 'Session 4',
    },
    {
      authorName: 'Kedar Joshi',
      imageUrl:
        'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      createdAt: 4365234564646,
      id: 25,
      duration: 2512,
      title: 'Session 5',
    },
  ]

  test('Fetches industry articles data successfully', async () => {
    const { storeState } = await expectSaga(getCourseRecordingsMiddleware)
      .withReducer(getCourseRecordingsReducer as any)
      .provide([[matchers.call.fn(getCourseRecordingsAPI), mockData]])
      .dispatch(fetchCourseRecordings({ courseId: 12 }, { courseId: 12 }))
      .run()

    expect(storeState).toMatchObject({
      data: {
        byId: {
          21: expect.any(Object),
          22: expect.any(Object),
          23: expect.any(Object),
          24: expect.any(Object),
          25: expect.any(Object),
        },
      },
      byCourse: {
        12: { data: [24, 21, 23, 22, 25], loading: false, error: false },
      },
    })
  })

  test('Able to handle any error', async () => {
    const error = new Error('error')
    const { storeState } = await expectSaga(getCourseRecordingsMiddleware)
      .withReducer(getCourseRecordingsReducer as any)
      .provide([[matchers.call.fn(getCourseRecordingsAPI), throwError(error)]])
      .dispatch(fetchCourseRecordings({ courseId: 12 }, { courseId: 12 }))
      .run()

    expect(storeState).toMatchObject({
      byCourse: { 12: { loading: false, error } },
    })
  })

  test('Dispatching cancel action resets state to initial state', async () => {
    const { storeState } = await expectSaga(getCourseRecordingsMiddleware)
      .withReducer(getCourseRecordingsReducer as any)
      .dispatch(fetchCourseRecordings({ courseId: 12 }, { courseId: 12 }))
      .dispatch(fetchCourseRecordingsCancel({ courseId: 12 }, { courseId: 12 }))
      .run()

    expect(storeState).toMatchObject({
      byCourse: { 12: { loading: false } },
    })
  })
})
