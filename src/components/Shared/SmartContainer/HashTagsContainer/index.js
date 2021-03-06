import React from 'react'
import styled, { css } from 'styled-components'

export const HashTagsContainer = (props) => {
  const content = Object.keys(props).map((key) => (
    <HashTags label={key} value={props[key]}>
      {key} {props[key]}
    </HashTags>
  ))

  return (
    <Wrapper>
      <HashTagsWrapper> {content} </HashTagsWrapper>
    </Wrapper>
  )
}

const HashTags = styled.div`
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 1.2rem;
  font-size: 1rem;
  margin-right: 5px;
  ${({ value, label }) => {
    if (label === 'course') {
      return css`
        color: #2aa8a1;
        border: 1px solid #2aa8a1;
      `
    }
    if (label === 'exam') {
      if (value) {
        return css`
          color: #2aa8a1;
          border: 1px solid #2aa8a1;
        `
      }
      return css`
        color: #eb5757;
        border: 1px solid #eb5757;
      `
    }
    if (label === 'difficulty') {
      switch (value) {
        case 1:
          return css`
            color: #2aa8a1;
            border: 1px solid #2aa8a1;
          `
        case 2:
          return css`
            color: #eda656;
            border: 1px solid #eda656;
          `
        case 3:
          return css`
            color: #f57b4e;
            border: 1px solid #f57b4e;
          `
        case 4:
          return css`
            color: #eb5757;
            border: 1px solid #eb5757;
          `
        default:
          return
      }
    }
  }}
`

const HashTagsWrapper = styled.div`
  display: flex;
  justify-content: row;
  align-items: center;
  margin: 1rem 0;
  font-size: 1.3rem;
`

const Wrapper = styled.div`
  bottom: -15px;
  position: absolute;
`
