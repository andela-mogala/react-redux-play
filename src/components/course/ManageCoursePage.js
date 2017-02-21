import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import authorsFormattedForDropdown from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state  = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // make sure the form stays populated on refresh but do not make unnecessary reloads
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
      formIsValid = false;
    }
    this.setState({errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) return;

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Course Saved");
    this.context.router.push("/courses");
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onSave={this.saveCourse}
        onChange={this.updateCourseState}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving} />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let courseId = ownProps.params.id; // fetch the id from the path 'course/:id'
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', categroy: ''};

  if (courseId && state.courses.length > 0) {
    course = state.courses.find(course => courseId === course.id) || course;
  }



  return {
    course, 
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);