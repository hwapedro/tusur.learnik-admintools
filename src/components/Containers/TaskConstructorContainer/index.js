import { connect } from "react-redux";
import TaskConstructor from '../../Lessons/Task/TaskConstructors'

import LessonsModule from '../../../store/modules/LessonsModule'

const mapDispatchToProps = dispatch => ({
    addTask: (pageid, type, info, answer) =>
      dispatch(LessonsModule.addTask(pageid, type, info, answer)),
    changeTask: (taskId, type, info, pageId) =>
      dispatch(LessonsModule.changeTask(taskId, type, info, pageId))
  });
  
  export default connect(
    null,
    mapDispatchToProps
  )(TaskConstructor);