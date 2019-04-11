import {
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_LESSON_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_LESSON_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_LESSON_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  GET_LESSON_REQUEST,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAILURE
} from "../../constants";

import { startLoading, stopLoading } from "../../utils";

const initialState = {
  token: null,
  loading: false,
  error: null,
  lessons: [],
  lesson: {}
};

function reducerLesson(state = initialState, action = {}) {
  switch (action.type) {
    //ADD BLOCK
    case ADD_ELEMENT_REQUEST:
      return startLoading(state, action);

    case ADD_LESSON_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        lessons: [...state.lessons, action.lessons]
      };

    case ADD_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET ALL BLOCK
    case GETALL_ELEMENT_REQUEST:
      return startLoading(state, action);

    case GETALL_LESSON_SUCCESS:
      return {
        ...state,
        lessons: action.lessons,
        loading: false,
        error: false
      };

    case GETALL_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //DELETE COURSES BLOCK
    case DELETE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case DELETE_LESSON_SUCCESS:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== action.index),
        loading: false,
        error: false
      };

    case DELETE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //CHANGE BLOCK
    case CHANGE_ELEMENT_REQUEST:
      return startLoading(state, action);

    case CHANGE_LESSON_SUCCESS:
      return {
        ...state,
        lesson: action.lesson,
        loading: false,
        error: false
      };

    case CHANGE_ELEMENT_FAILURE:
      return stopLoading(state, action);

    //GET LESSON
    case GET_LESSON_REQUEST:
      return startLoading(state, action);

    case GET_LESSON_SUCCESS:
      return {
        ...state,
        lesson: action.lesson,
        loading: false,
        error: false
      };

    case GET_LESSON_FAILURE:
      return stopLoading(state, action);

    default:
      return {
        ...state
      };
  }
}

export default reducerLesson;
