import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCoursesSucess(courses) {
  return { type: types.LOAD_COURSES_SUCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCESS, course };
}

export function deleteCourseOptimstic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSucess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
export function deleteCourse(course) {
  return function (dispatch) {
    //Dispatch immediatly
    dispatch(deleteCourseOptimstic(course));
    return courseApi.deleteCourse(course.id);
  };
}
