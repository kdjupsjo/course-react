import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, action } = this.props;

    if (courses.length === 0) {
      action.loadCourses().catch((err) => {
        alert("Failed load courses", err);
      });
    }

    if (authors.length === 0) {
      action.loadAuthors().catch((err) => {
        alert("Failed load authors", err);
      });
    }
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.action.deleteCourse(course);
    } catch (errors) {
      toast.error("Delete failed for course" + errors.message, {
        autoClose: false,
      });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  action: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log(state);

  return {
    courses:
      state.authors.lenth === 0
        ? []
        : state.courses.map((course) => {
            const author = state.authors.find((a) => a.id === course.authorId);
            return {
              ...course,
              authorName: author ? author.name : "",
            };
          }),
    authors: state.authors,
    loading: state.waitingApiRequest > 0,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
