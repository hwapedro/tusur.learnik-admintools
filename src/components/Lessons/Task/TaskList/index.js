import React from "react";
import { withRouter } from "react-router-dom";


import {
  TaskElementWrapper,
  TaskInfo,
  LabelElement,
  TitleSpan,
  ButtonsWrapper,
  ButtonWrapper,
  TaskListWrapper
} from "../styleLocal";
import Button from "../../../Button";

const goTo = (lessonId, taskId, history) => {
  history.push(`/task/${lessonId}/${taskId}`);
};
let id = 1;
const TaskList = props => {
  const { lessonId, page, deleteTask } = props;
  const taskList = page.tasks.map(task => {
    return (
      <TaskElementWrapper key={id++}>
        {task.info && (
          <TaskInfo>
            <LabelElement>Task type:</LabelElement>
            <TitleSpan>{task.type}</TitleSpan>
            <LabelElement>Task title:</LabelElement>
            <TitleSpan>{task.info.name}</TitleSpan>
            <LabelElement>Task description:</LabelElement>
            <TitleSpan
              dangerouslySetInnerHTML={{
                __html: task.info.description
              }}
            />
            <LabelElement>Question:</LabelElement>
            <TitleSpan>{task.info.question}</TitleSpan>
          </TaskInfo>
        )}

        <ButtonsWrapper>
          <ButtonWrapper>
            <Button
              buttonStyle={"outlined"}
              onClick={() => goTo(lessonId, task._id, props.history)}
            >
              Go To
            </Button>
          </ButtonWrapper>

          <ButtonWrapper>
            <Button
              buttonStyle={"outlined"}
              onClick={() => deleteTask(page._id, task._id)}
            >
              Delete Task
            </Button>
          </ButtonWrapper>
        </ButtonsWrapper>
      </TaskElementWrapper>
    );
  });
  return <TaskListWrapper>{taskList}</TaskListWrapper>;
};
export default withRouter(TaskList);
