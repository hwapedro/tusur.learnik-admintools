import React, { Component } from "react";
//import { connect } from "react-redux";

//import { deleteTask } from "../../../../store/actions";

//import Tests from "../TaskComponents/Tests";
import TestConstructor from "./TestConstructor";

// import { throws } from "assert";

class TaskConstructor extends Component {
  state = {
    displayConstructor: false,
    displayTestConstructor: true,
    taskEditFlag: false
  };

  displayConstructor = () => {
    const displayConstructor = this.state.displayConstructor;
    this.setState({ displayConstructor: !displayConstructor });
  };

  selectChange = event => {
    if (event.target.value === "test") {
      this.setState({
        taskType: event.target.value,
        displayTestConstructor: true
      });
    } else {
      this.setState({ displayTestConstructor: false });
    }
    // console.log(event.target.value)
  };

  titleChange = event => {
    this.setState({ title: event.target.value });
    //  console.log(this.state.title)
  };

  getParams = (name, description, question, id) => {
    // console.log("we working boys");
    this.setState({
      taskEditFlag: true,
      info: { name, description, question, id }
    });
  };

  render() {
    const { displayConstructor, displayTestConstructor } = this.state;
    return (
      <>
        <div>
          {displayConstructor ? (
            <div>
              <div>
                <button onClick={this.displayConstructor}>Cancel</button>
              </div>
              <select onChange={this.selectChange} defaultValue="test">
                <option value="test">Test</option>
                <option value="none">Placeholder</option>
              </select>
              {displayTestConstructor ? (
                <>
                  <TestConstructor
                    oldInfo={this.state.info}
                    edited={false}
                    pageId={this.props.pageId}
                  />
                </>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div>
              <button onClick={this.displayConstructor}>Add Task</button>
            </div>
          )}
        </div>
        {/* <div><Tests /></div> */}
        {/* <button onClick={()=>this.goTo(page._id)}>To task</button> */}
      </>
    );
  }
}

export default TaskConstructor;