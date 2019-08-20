import React, { Component } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import PropTypes from "prop-types";

import { TextQuestion } from "../styleLocal";

import {
  LabelElement,
  ConsturctorForm,
  ButtonWrapper
} from "../../../GlobalStyles/styleGlobal";
import Button from "../../../Shared/Button";
import CustomInput from "../../../Shared/Input";
import EditorText from "../../../EditorText";

export default class TextConstructor extends Component {
  state = {
    name: "",
    question: "",
    options: [],
    editorState: EditorState.createEmpty()
  };

  componentDidMount() {
    const { task } = this.props;
    if (task) {
      if (task.info.description !== "") {
        const blocksFromHTML = convertFromHTML(task.info.description);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        this.setState({
          name: task.info.name,
          question: task.info.question,
          options: task.info.options,
          editorState: EditorState.createWithContent(state)
        });
      } else {
        this.setState({
          name: task.info.name,
          question: task.info.question,
          options: task.info.options,
          editorState: EditorState.createEmpty()
        });
      }
    }
  }

  infoChange = event => {
    if (event.target.name === "question") {
      this.parseAnswer(event.target.value);
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  parseAnswer = string => {
    const regular = new RegExp(/\~([^~]*?)\~/gi);
    let options = [];
    let answer;
    while ((answer = regular.exec(string))) {
      options.push(answer[1]);
    }
    this.setState({
      options: options
    });
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { pageId, addTask, task, changeTask, changeEditFlag } = this.props;
    const { name, question, options, editorState } = this.state;
    const type = "text";
    const description = stateToHTML(editorState.getCurrentContent());
    const info = {
      name: name,
      description: description,
      question: question,
      options: options
    };
    if (task) {
      changeTask(task._id, type, info, pageId);
      changeEditFlag();
    } else {
      console.log(pageId)
      addTask(pageId, type, info);
    }
  };

  render() {
    const { editorState } = this.state;
    const { name, question } = this.state;
    return (
      <>
        <ConsturctorForm onSubmit={this.onSubmit}>
          <CustomInput
            label="Title"
            placeholder="Title goes here"
            name="name"
            value={name}
            onChange={this.infoChange}
            required={true}
          />
          <LabelElement>Description</LabelElement>
          <EditorText
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
          <LabelElement>Question</LabelElement>
          <br />
          <LabelElement>Put words in ~ ~ to mark as answer</LabelElement>
          <TextQuestion
            name="question"
            placeholder="Question"
            value={question}
            onChange={this.infoChange}
          />

          <ButtonWrapper>
            <Button buttonStyle={"outlined"} type="submit">
              Save
            </Button>
          </ButtonWrapper>
        </ConsturctorForm>
      </>
    );
  }
}

TextConstructor.defaultProps = {
  addTask() {},
  changeTask() {}
};

TextConstructor.propTypes = {
  addTask: PropTypes.func,
  changeTask: PropTypes.func
};
