import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  //Arrange
  const initalState = [
    {
      title: "A",
    },
    {
      title: "B",
    },
  ];

  const newCourse = {
    title: "C",
  };

  const action = actions.createCourseSuccess(newCourse);

  //act
  const newState = courseReducer(initalState, action);

  //assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  //Arrange
  const initalState = [
    {
      id: 1,
      title: "A",
    },
    {
      id: 2,
      title: "B",
    },
    {
      id: 3,
      title: "C",
    },
  ];

  const course = { id: 2, title: "new title" };
  const action = actions.updateCourseSuccess(course);

  //act
  const newState = courseReducer(initalState, action);
  const updatedCourse = newState.find((c) => c.id === course.id);
  const untouchedCourse = newState.find((c) => c.id === 1);

  //assert
  expect(updatedCourse.title).toEqual("new title");
  expect(untouchedCourse.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
