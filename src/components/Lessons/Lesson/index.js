import React, { Component } from "react";
import { connect } from "react-redux";

import { getLesson, changeElement } from "../../../store/actions";
import {
  ButtonWrapper,
  TitleInput,
  DescriptionTextArea,
  LessonButton,
  Wrapper,
  ElementWrapper,
  TitleSpan,
  DescriptionSpan,
  LabelElement,
  ImgMark,
  ImgCross,
  ConsturctorForm 
} from "../style";

import checkMark from "../../../img/good.png";
import redCross from "../../../img/bad.png";
import Menu from "../../Menu";
import Spinner from "../../Spinner";

const token = localStorage.getItem("userId");
const name = "lesson";

class Lesson extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    _id: null,
    exam: null
  };

  componentDidMount() {
    const { getLesson, id } = this.props;
    let token = localStorage.getItem("userId");
    console.log(this.props);
    getLesson(token, this.props.itemId);
  }

  changeExamMark = exam => {
    this.setState({ exam: !exam });
  };

  getParams = (_id, title, description, exam) => {
    this.setState({
      changeFlag: true,
      _id: _id,
      title: title,
      description: description,
      exam: exam
    });
  };

  setParams = event => {
    event.preventDefault();
    const { changeLesson } = this.props;
    const { title, description } = this.state;

    if (title && description)
      changeLesson(
        this.state._id,
        this.state.title,
        this.state.description,
        this.state.exam,
        token,
        name
      );
    this.setState({ changeFlag: false, _id: null });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { lesson, loading } = this.props;
    if (loading) {
      return (
        <>
          <Menu />
          <Spinner />
        </>
      );
    }

    if (this.state.changeFlag) {
      return (
        <>
          <Menu />
          <Wrapper>
            <ElementWrapper key={lesson._id}>
              <form onSubmit={this.setParams}>
                <LabelElement>Name of Lessons :</LabelElement>
                <TitleInput
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                />
                <LabelElement>Description of Lessons : </LabelElement>
                <DescriptionTextArea
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
                <LabelElement>EXAM :</LabelElement>
                {this.state.exam ? (
                  <ImgMark
                    src={checkMark}
                    onClick={() => this.changeExamMark(this.state.exam)}
                  />
                ) : (
                  <ImgCross
                    src={redCross}
                    onClick={() => this.changeExamMark(this.state.exam)}
                  />
                )}
                <ButtonWrapper>
                  <LessonButton type="submit">CONFIRM</LessonButton>
                </ButtonWrapper>
              </form>
            </ElementWrapper>
          </Wrapper>
        </>
      );
    } else {
      return (
        <>
          <Menu />

          <Wrapper>
            <ElementWrapper
              key={lesson._id}
              onClick={() =>
                this.getParams(
                  lesson._id,
                  lesson.title,
                  lesson.description,
                  lesson.exam
                )
              }
            >
              <LabelElement>Name of Lessons :</LabelElement>
              <TitleSpan> {lesson.title}</TitleSpan>
              <LabelElement>Description of Lessons : </LabelElement>
              <DescriptionSpan>{lesson.description}</DescriptionSpan>

              <LabelElement>EXAM :</LabelElement>
              {lesson.exam ? (
                <ImgMark src={checkMark} />
              ) : (
                <ImgCross src={redCross} />
              )}
              <br />

              {/* <LabelElement>courseIndex :</LabelElement>
              <TitleSpan> {lesson.courseIndex}</TitleSpan> */}
            </ElementWrapper>
          </Wrapper>
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  lesson: state.lesson,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  getLesson: (token, id) => dispatch(getLesson(token, id)),
  changeLesson: (lessonsIndex, title, description, exam, token, name) =>
    dispatch(changeElement(lessonsIndex, title, description, exam, token, name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
