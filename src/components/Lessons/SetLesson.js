import React, { Component } from "react";

const name = 'lesson'

class SetLessons extends Component {
  state = {
    title: "",
    description: ""
  };
 
  onSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;
    let token = localStorage.getItem("userId");
    this.props.addLesson(title, description, token, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <label>Название</label>
          <input
            name="title"
            placeholder="Название курса"
            type="text"
            value={this.state.title}
            onChange={this.onChange}
          />
          <label>Описание</label>
          <textarea
            name="description"
            placeholder="Описание курса"
            value={this.state.description}
            type="text"
            onChange={this.onChange}
          />
          <button type="submit">Cоздать новый курс</button>
        </form>
      </>
    );
  }
}

export default SetLessons;