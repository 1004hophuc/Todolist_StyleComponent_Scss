import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, UPDATE_TASK } from "../types/ToDoListActionTypes";

export const addTaskAction = (newTask) => {
    return {
        type: ADD_TASK,
        newTask
    }
}

export const changeThemeAction = (themeId) => {
    return {
        type: CHANGE_THEME,
        themeId
    }
}

export const doneTaskAction = (task) => {
    return {
        type: DONE_TASK,
        task
    }
}

export const deleteTaskAction = (taskID) => {
    return {
        type: DELETE_TASK,
        taskID
    }
}

export const editTaskAction = (task) => {
    return {
        type: EDIT_TASK,
        task
    }
}

export const updateTaskAction = (taskName) => {
    return {
        type: UPDATE_TASK,
        taskName
    }
}