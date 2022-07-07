import { DarkTheme } from "../../BaiTapToDoList/Themes/DarkTheme";
import { LightTheme } from "../../BaiTapToDoList/Themes/LightTheme";
import { PurpleTheme } from "../../BaiTapToDoList/Themes/PurpleTheme";
import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../types/ToDoListActionTypes";
import { arrThemes } from "../../BaiTapToDoList/Themes/ManagerTheme";

const stateDefault = {
    themeToDoList: DarkTheme,
    taskList: [
        { id: 1, taskName: 'Task 1', done: true },
        { id: 2, taskName: 'Task 2', done: false },
        { id: 3, taskName: 'Task 3', done: true },
        { id: 4, taskName: 'Task 4', done: false }
    ],
    taskEdit: { id: 0, taskName: '', done: false }
}

const ToDoListReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName);
            if (index !== -1) {
                alert(`${action.newTask.taskName} already exist!`)
            } else {
                taskListUpdate.push(action.newTask)
            }
            state.taskList = taskListUpdate;
            return { ...state };
        }

        case CHANGE_THEME: {
            console.log(action)
            // Tìm ra theme dựa vào action.themId được chọn
            let theme = arrThemes.find(themeChange => themeChange.id == action.themeId); //Lưu ý value gửi lên là string, mà mình đang so sánh với số (id) nên chỉ để 2 dấu bằng
            if (theme) {
                console.log(theme)
                // set lại theme cho state.themeToDoList, đối với react nó thuộc kiểu so sánh nguyên thuỷ, không hiểu object mới và cũ, nên là luôn set object mới để nó nhận biết
                state.themeToDoList = { ...theme.theme }
            }
            return { ...state }
        }

        case DONE_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === action.task.id);
            if (index !== -1) {
                taskListUpdate[index].done = true;
            }
            state.taskList = taskListUpdate;
            return { ...state };
            // return {...state,taskList: taskListUpdate}: viết ngắn của 2 dòng 49,50
        }

        case DELETE_TASK: {
            let taskListUpdate = [...state.taskList];
            // Cách 1:
            // let index = taskListUpdate.findIndex(task => task.id === action.taskID);
            // if (index !== -1) {
            //     taskListUpdate.splice(index, 1)
            // }

            // Cách 2: Loại bỏ chính nó ra khỏi mảng
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskID);
            return { ...state, taskList: taskListUpdate };

            // Cách 3: 
            // return {...state, taskList: state.taskList.filter(task => task.id !== action.taskID)}
        }

        case EDIT_TASK: {
            return { ...state, taskEdit: action.task }
        }

        case UPDATE_TASK: {
            console.log(action.task)
            // Chỉnh sửa lại taskName của taskEdit
            state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

            // Tìm trong taskList để cập nhật lại taskEdit người dùng update
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);
            if (index !== -1) {
                taskListUpdate[index].taskName = state.taskEdit.taskName;
            }

            state.taskList = taskListUpdate;
            state.taskEdit = { id: -1, taskName: '', done: false };
            return { ...state }
        }
        default: return { ...state }
    };


}

export default ToDoListReducer;