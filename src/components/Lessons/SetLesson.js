import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import EditorText from "../EditorText";
import Search from "../Search";
import {
  ButtonWrapper,
  TitleInput,
  DescriptionTextArea,
  LessonButton as ConstructirButton,
  Wrapper,
  DarkGround,
  LabelElement,
  ConsturctorForm,
  ConsturctorWrapper,
  ButtonWrapperConstructor,
  ImgMark,
  ImgCross
} from "./style";

import Button from "../Button";
import AdminService from "../../service";

import checkMark from "../../img/good.png";
import redCross from "../../img/bad.png";

const name = "lesson";
const token = localStorage.getItem("token");
let options = [];

const adminService = new AdminService();

class SetLessons extends Component {
  state = {
    title: "",
    editorState: EditorState.createEmpty(),
    exam: false,
    courseIndex: 0,
    constructor: false
  };

  componentDidMount() {
    adminService
      .getAll(token, "course")
      .then(response => {
        options = response.courses.map((element, index) => {
          const option = index + 1;
          return { value: option, label: option };
        });
      })
      .catch(console.error());
  }

  onSubmit = event => {
    event.preventDefault();

    const { addLesson } = this.props;
    const { constructor, editorState } = this.state;
    const { title, exam, courseIndex } = this.state;

    const description = stateToHTML(editorState.getCurrentContent());

    this.setState({
      constructor: !constructor,
      title: "",
      description: "",
      exam: false,
      courseIndex: 0,
      editorState: EditorState.createEmpty()
    });

    addLesson(title, description, exam, name, courseIndex.value);

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleChange = courseIndex => {
    this.setState({ courseIndex });
  };

  showConstructor = () => {
    this.setState({
      constructor: !this.state.constructor
    });
  };

  ChangeExamTrue = () => {
    this.setState({ exam: true });
  };

  ChangeExamFalse = () => {
    this.setState({ exam: false });
  };

  render() {

    const { constructor, exam, courseIndex, editorState } = this.state;
    const { onChange, value } = this.props;


    return (
      <Wrapper>
        <ButtonWrapperConstructor>
          <Search onChange={onChange} value={value} />
          <Button onClick={this.showConstructor}>ADD NEW LESSON</Button>
        </ButtonWrapperConstructor>
        {constructor && (
          <>
            <DarkGround onClick={this.showConstructor} />
            <ConsturctorWrapper>
              <ConsturctorForm onSubmit={this.onSubmit}>
                <LabelElement>title</LabelElement>
                <TitleInput
                  name="title"
                  placeholder="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <LabelElement>description</LabelElement>
                <EditorText
                  editorState={editorState}
                  onEditorStateChange={this.onEditorStateChange}
                />
                <LabelElement>EXAM :</LabelElement>

                <ImgMark
                  style={!exam ? { filter: "grayscale(100%)" } : {}}
                  src={checkMark}
                  onClick={this.ChangeExamTrue}
                />
                <ImgCross
                  style={exam ? { filter: "grayscale(100%)" } : {}}
                  src={redCross}
                  onClick={this.ChangeExamFalse}
                />
                <br />
                <LabelElement>Course Index :</LabelElement>
                <Select
                  value={courseIndex}
                  onChange={this.handleChange}
                  options={options}
                />
                <ButtonWrapper>
                  <Button type="submit">ADD NEW LESSON</Button>
                </ButtonWrapper>
              </ConsturctorForm>
            </ConsturctorWrapper>
          </>
        )}
      </Wrapper>
    );
  }
}

export default SetLessons;

SetLessons.defaultProps = {
  addLesson() {},
  course: null
};

SetLessons.propTypes = {
  addLesson: PropTypes.func,
  course: PropTypes.object
};
