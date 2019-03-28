import {
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  GETALL_COURSE_SUCCESS,
  GETALL_ELEMENT_FAILURE,
  GETALL_ELEMENT_REQUEST,
  GETALL_LESSON_SUCCESS,
  GETALL_BADGE_SUCCESS,
  ADD_ELEMENT_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_BADGE_SUCCESS,
  ADD_LESSON_SUCCESS,
  ADD_ELEMENT_FAILURE,
  DELETE_ELEMENT_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_BADGE_SUCCESS,
  DELETE_LESSON_SUCCESS,
  DELETE_ELEMENT_FAILURE,
  CHANGE_ELEMENT_REQUEST,
  CHANGE_COURSE_SUCCESS,
  CHANGE_BADGE_SUCCESS,
  CHANGE_LESSON_SUCCESS,
  CHANGE_ELEMENT_FAILURE,
  GET_LESSON_REQUEST,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAILURE,
  ADD_TEST_TASK,
  DELETE_TASK,
  CHANGE_TEST_TASK,
  ADD_PAGE_REQUEST,
ADD_PAGE_SUCCESS,
ADD_PAGE_FAILURE, 
DELETE_PAGE_REQUEST,
DELETE_PAGE_SUCCESS,
DELETE_PAGE_FAILURE
} from "../constants";

import AdminService from "../../service";

const adminService = new AdminService();

export const login = (username, password) => dispatch => {
  adminService
    .login(username, password)
    .then(response => {
      localStorage.setItem("userId", response.body.token);
      window.history.pushState({}, "", "/courses");
      window.history.go();
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        token: response.body.token
      });
    })
    .catch(error => dispatch({ type: FETCH_LOGIN_FAILURE,error: true }));
};

export const getAllElements = (token, name) => dispatch => {
  dispatch({
    type: GETALL_ELEMENT_REQUEST
  });

  adminService
    .getAll(token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: GETALL_COURSE_SUCCESS,
            courses: response.courses
          });
          break;
        case "badge":
          dispatch({
            type: GETALL_BADGE_SUCCESS,
            badges: response.badges
          });
          break;
        case "lesson":
          dispatch({
            type: GETALL_LESSON_SUCCESS,
            lessons: response.lessons
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: GETALL_ELEMENT_FAILURE ,error: true}));
};

export const addElement = (title, description, token, name) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });

  adminService
    .add(title, description, token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: ADD_COURSE_SUCCESS,
            courses: response.course
          });
          break;
        case "badge":
          dispatch({
            type: ADD_BADGE_SUCCESS,
            badges: response.badge
          });
          break;
        case "lesson":
          dispatch({
            type: ADD_LESSON_SUCCESS,
            lessons: response.lesson
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE,error: true }));
};

export const deletElement = (index, token, name) => dispatch => {
  dispatch({
    type: DELETE_ELEMENT_REQUEST
  });

  adminService
    .delet(index, token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: DELETE_COURSE_SUCCESS,
            index: index
          });
          break;
        case "badge":
          dispatch({
            type: DELETE_BADGE_SUCCESS,
            index: index
          });
          break;
        case "lesson":
          dispatch({
            type: DELETE_LESSON_SUCCESS,
            index: index
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: DELETE_ELEMENT_FAILURE,error: true }));
};

export const changeElement = (
  index,
  title,
  description,
  exam,
  token,
  name
) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  adminService
    .changeLesson(index, title, description, exam, token, name)
    .then(response => {
      dispatch({
        type: CHANGE_LESSON_SUCCESS,
        lesson: response.lesson
      });
    })
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE,error: true }));
};

export const CourseChange = (
  index,
  title,
  description,
  token,
  name
) => dispatch => {
  dispatch({
    type: CHANGE_ELEMENT_REQUEST
  });

  adminService
    .change(index, title, description, token, name)
    .then(response => {
      switch (name) {
        case "course":
          dispatch({
            type: CHANGE_COURSE_SUCCESS,
            course: response.course
          });
          break;
        case "badge":
          dispatch({
            type: CHANGE_BADGE_SUCCESS,
            badge: response.badge
          });
          break;
        default:
          break;
      }
    })
    .catch(error => dispatch({ type: CHANGE_ELEMENT_FAILURE,error: true }));
};

export const getLesson = (token, id) => dispatch => {
  dispatch({
    type: GET_LESSON_REQUEST
  });

  adminService
    .getLesson(token, id)
    .then(response => {
      dispatch({
        type: GET_LESSON_SUCCESS,
        lesson: response.lesson
      });
    })
    .catch(error => dispatch({ type: GET_LESSON_FAILURE,error: true }));
};

export const addLesson = (
  title, description, exam, token, name
) => dispatch => {
  dispatch({
    type: ADD_ELEMENT_REQUEST
  });

  adminService
    .addLesson(title, description, exam, token, name)
    .then(response => {
      dispatch({
        type: ADD_LESSON_SUCCESS,
        lessons: response.lesson
      });
    })
    .catch(error => dispatch({ type: ADD_ELEMENT_FAILURE,error: true }));
};

// export const changeCourse = (courseIndex, title, description) => {
//   return { type: CHANGE_COURSE_ELEMENT, courseIndex, title, description };
// };
export const addPage = (token, id, text, tasks, needToComplete) => dispatch =>{
  dispatch({
    type: ADD_PAGE_REQUEST
  });
  adminService
  .addPage(token, id, text, tasks, needToComplete)
  .then(response => {
    console.log(response)
    dispatch({
      type: ADD_PAGE_SUCCESS,
      page: response.lesson.pages  
    });
  })
  .catch(error => dispatch({ type: ADD_PAGE_FAILURE}))
}

export const deletePage = (token, id) => dispatch =>{
  dispatch({type: DELETE_PAGE_REQUEST});

  adminService
  .deletePage(token, id)
  .then(response =>{
    dispatch({
      type: DELETE_PAGE_SUCCESS,
      lesson: response.lesson
    })
  })
  .catch(error => dispatch({type: DELETE_PAGE_FAILURE}))
}

let id  = 0
export const deleteTask = id => {
  return {
    type: DELETE_TASK,
    id: id
  };
 };

export const addTestTask = (name, description, question, options) => {
  id++
  const type = "test"
  return {
    type: ADD_TEST_TASK,
    task: { name, description, question, id, type, options }
  };
};

export const changeTestTask = (name, description, question, options, id) => {
  const taskType = "test"
  return {
    type: CHANGE_TEST_TASK,
    task: {name, description, question, id, taskType, options}
  };
};
