import React, { Component } from "react";
import { connect } from "react-redux";

//import { withRouter } from "react-router-dom";

import Test from "./Tests";
import Text from "./Text";
import { getLesson } from "../../../../store/actions/actionLessons";

const goTo = (lessonId, taskId, history) => {
  history.push(`/task/${lessonId}/${taskId}`);
};

class Tasks extends Component {
  componentDidMount() {
    const { getLesson, lessonId } = this.props;
    let token = localStorage.getItem("userId");
    getLesson(lessonId);
  }

  goBack = id => {
    this.props.history.push(`/lesson/${id}`);
  };

  constSwitch = (page, type, taskId, lessonId) => {
    switch (type) {
      case "test":
        return (
          <Test
            page={page}
            taskId={taskId}
            lessonId={lessonId}
            lesson={this.props.lesson}
          />
        );
      case "text":
        return (
          <Text
            page={page}
            taskId={taskId}
            lessonId={lessonId}
            lesson={this.props.lesson}
          />
        );
      default:
        return <div />;
    }
  };

  render() {
    const { lessonId, taskId, lesson } = this.props;
    let page, task;

    // lesson.pages.map(page => {
    //   letask = page.tasks.find(task => task._id === taskId);
    // });

    for (let i = 0; i < lesson.pages.length; i++) {
      if (
        lesson.pages[i].tasks.find(task => task._id === taskId) !== undefined
      ) {
        page = lesson.pages[i];
        task = lesson.pages[i].tasks.find(task => task._id === taskId);
      }
    }
    console.log(page, task);
    return (
      <>
        {task && (
          <div>{this.constSwitch(page, task.type, taskId, lessonId)} </div>
        )}
        <button onClick={() => this.goBack(this.props.lesson._id)}>Back</button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  lesson: state.Lessons.lesson
});

const mapDispatchToProps = dispatch => ({
  getLesson: id => dispatch(getLesson(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
