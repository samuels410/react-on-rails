import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import {
  getCourseListMiddleware,
  getCourseListApi as getCourseListAPI,
} from '../Courses.middlewares'
import getCourseListReducer from '../Courses.reducer'
import { fetchCourseList, fetchCourseListCancel } from '../Courses.actions'

describe('Courses/Redux', () => {
  const mockData = {
    completed_courses: [
      {
        course_name: 'Predictive Modeling',
        course_id: 3161,
        start_date: '2019-03-12',
        end_date: '2019-03-02',
        grade: 'E',
        marks: 20,
        total_marks: 50,
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
      {
        course_name: 'Predictive Modeling',
        course_id: 3162,
        start_date: '2019-04-12',
        end_date: '2019-04-02',
        grade: 'E',
        marks: 20,
        total_marks: 50,
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
    ],
    active_courses: [
      {
        course_name: 'Predictive Modeling',
        course_id: 3163,
        start_date: '2019-03-12',
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
      {
        course_name: 'Predictive Modeling',
        course_id: 3164,
        start_date: '2019-04-12',
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
    ],
    upcoming_courses: [
      {
        course_name: 'Predictive Modeling',
        course_id: 3165,
        start_date: '2019-03-12',
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
      {
        course_name: 'Predictive Modeling',
        course_id: 3166,
        start_date: '2019-04-12',
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
    ],
    failed_courses: [
      {
        course_name: 'Predictive Modeling',
        course_id: 3167,
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
      {
        course_name: 'Predictive Modeling',
        course_id: 3168,
        image_url:
          'https://d9jmtjs5r4cgq.cloudfront.net/images/pgpbabi/PM-min.jpg',
      },
    ],
  }

  test('Fetches course data successfully', async () => {
    const { storeState } = await expectSaga(getCourseListMiddleware)
      .withReducer(getCourseListReducer as any)
      .provide([[matchers.call.fn(getCourseListAPI), mockData]])
      .dispatch(fetchCourseList({ programId: 12 }))
      .run()

    expect(storeState).toEqual(
      expect.objectContaining({
        byCourse: {},
        byProgram: {
          '12': {
            data: ['3161', '3162', '3163', '3164', '3165', '3166'],
            error: false,
            loading: false,
          },
        },
        data: {
          byId: {
            '3161': {
              course_id: expect.any(Number),
              course_name: expect.any(String),
              desc: expect.any(String),
              end_date: expect.any(String),
              grade: expect.any(String),
              image_url: expect.any(String),
              marks: expect.any(Number),
              start_date: expect.any(String),
              total_marks: expect.any(Number),
            },
            '3162': {
              course_id: expect.any(Number),
              course_name: expect.any(String),
              desc: expect.any(String),
              end_date: expect.any(String),
              grade: expect.any(String),
              image_url: expect.any(String),
              marks: expect.any(Number),
              start_date: expect.any(String),
              total_marks: expect.any(Number),
            },
            '3163': {
              course_id: expect.any(Number),
              course_name: expect.any(String),
              desc: expect.any(String),
              image_url: expect.any(String),
              progress: expect.any(Number),
              start_date: expect.any(String),
            },
            '3164': {
              course_id: expect.any(Number),
              course_name: expect.any(String),
              desc: expect.any(String),
              image_url: expect.any(String),
              progress: expect.any(Number),
              start_date: expect.any(String),
            },
            '3165': {
              course_id: expect.any(Number),
              course_name: expect.any(String),
              desc: expect.any(String),
              image_url: expect.any(String),
              start_date: expect.any(String),
            },
            '3166': {
              course_id: expect.any(Number),
              course_name: expect.any(String),
              desc: expect.any(String),
              image_url: expect.any(String),
              start_date: expect.any(String),
            },
          },
          activeIds: [3163, 3164],
          completedIds: [3162, 3161],
          failedIds: [],
          upcomingIds: [3165, 3166],
        },
      })
    )
  })

  test('Able to handle any error', async () => {
    const error = new Error('error')
    const { storeState } = await expectSaga(getCourseListMiddleware)
      .withReducer(getCourseListReducer as any)
      .provide([[matchers.call.fn(getCourseListAPI), throwError(error)]])
      .dispatch(fetchCourseList({ programId: 12 }))
      .run()

    expect(storeState).toEqual(
      expect.objectContaining({
        data: expect.any(Object),
        byCourse: {},
        byProgram: {
          12: {
            loading: false,
            error,
          },
        },
      })
    )
  })

  test('Dispatching cancel action resets state to initial state', async () => {
    const { storeState } = await expectSaga(getCourseListMiddleware)
      .withReducer(getCourseListReducer as any)
      .dispatch(fetchCourseList({ programId: 12 }))
      .dispatch(fetchCourseListCancel({ programId: 12 }))
      .run()

    expect(storeState).toEqual(
      expect.objectContaining({
        data: expect.any(Object),
        byProgram: { 12: { loading: false } },
        byCourse: expect.any(Object),
      })
    )
  })
})
