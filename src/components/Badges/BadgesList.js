import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import base64Img from "base64-img";

import ButtonMaterial from "@material-ui/core/Button";
import Button from "../Button";

const name = "badge";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class badgeList extends Component {
  state = {
    title: "",
    description: "",
    changeFlag: false,
    badgeIndex: null,
    picture: null
  };

  getParams = (badgeIndex, title, description) => {
    this.setState({
      changeFlag: true,
      badgeIndex: badgeIndex,
      title: title,
      description: description,
      picture: null
    });
  };

  setParams = event => {
    event.preventDefault();
    const { changeBadge } = this.props;
    const {
      title,
      description,
      picture,
      badgeIndex
    } = this.state;

    var formData = new FormData();
    formData.append("image", picture);
    // this.props.changeIconBadge(formData, id);
    console.log(this.state.badgeIndex);
    let icon;
    getBase64(picture).then(base64 => {
      icon = base64;
      if (title && description)
        changeBadge(badgeIndex, title, description, name, icon);
    });

    this.setState({ changeFlag: false, badgeIndex: null });
  };

  setPicture = event => {
    console.log(this.props.changeIconBadge);
    this.setState({ picture: event.target.files[0] });
  };

  deleteItem = badgeIndex => {
    const { delBadge } = this.props;
    delBadge(badgeIndex, name);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { badges, search } = this.props;
    let list = badges
      .filter(badge => {
        if (badge.title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      })
      .map(badge => {
        if (this.state.changeFlag && badge._id === this.state.badgeIndex) {
          return (
            <ElementWrapper key={badge._id}>
              <form onSubmit={this.setParams}>
                <LabelElement>Name of badge :</LabelElement>
                <TitleInput
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                />
                <LabelElement>Description of badge : </LabelElement>
                <DescriptionTextArea
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                />
                <input
                  accept="image/*"
                  id="text-button-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  onChange={this.setPicture}
                />
                <label htmlFor="text-button-file">
                  <ButtonMaterial component="span">Upload</ButtonMaterial>
                </label>
                <span>{this.state.picture && this.state.picture.name}</span>

                <ButtonWrapper>
                  <Button buttonStyle={"outlined"} type="submit">
                    CONFIRM
                  </Button>
                </ButtonWrapper>
              </form>
            </ElementWrapper>
          );
        } else {
          return (
            <ElementWrapper key={badge._id}>
              <LabelElement>Name of badge :</LabelElement>
              <TitleSpan> {badge.title}</TitleSpan>
              <LabelElement>Description of badge : </LabelElement>
              <DescriptionSpan>{badge.description}</DescriptionSpan>
              <ButtonWrapper>
                <Button
                  buttonStyle={"outlined"}
                  onClick={() =>
                    this.getParams(badge._id, badge.title, badge.description)
                  }
                >
                  CHANGE badge
                </Button>
                <Button
                  buttonStyle={"outlined"}
                  onClick={() => this.deleteItem(badge._id)}
                >
                  DELETE badge
                </Button>
              </ButtonWrapper>
            </ElementWrapper>
          );
        }
      });
    return (
      <Wrapper>
        <ElementsWrapper>{list}</ElementsWrapper>
      </Wrapper>
    );
  }
}

export default badgeList;

badgeList.defaultProps = {
  badge: [],
  loading: false,
  error: false,
  delBadge() {},
  changeBadge() {}
};

badgeList.propTypes = {
  badge: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,

  delBadge: PropTypes.func,
  changeBadge: PropTypes.func
};

const Wrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

const TitleInput = styled.input`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
  color: black;
`;

const LabelElement = styled.span`
  margin-top: 2rem;
  font-weight: 900;
  font-size: 1.8rem;
`;

const DescriptionSpan = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`;

const DescriptionTextArea = styled.textarea`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 400px;
  max-height: 100%;
  max-width: 100%;
  resize: none;
  align-items: center;
  margin-top: 2rem;
  font-size: 1.3rem;
  color: black;
`;

const ElementsWrapper = styled.ul`
  list-style-type: none;
  width: 1000px;
`;

const ElementWrapper = styled.li`
  background-color: ${props => props.theme.courses};
  margin-top: 2rem;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.3);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 0.5rem;
`;
export const SignInButton = styled.button`
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: ${props => props.theme.button};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
    cursor: pointer;
  }
  margin-right: 1rem;
`;
