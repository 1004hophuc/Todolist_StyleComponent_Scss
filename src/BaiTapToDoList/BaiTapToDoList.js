/*
- Đối với taskEdit, chúng ta đang lấy dữ liệu từ store về thông qua props, mà mỗi lần người dùng nhập (onChange, thì state sẽ được set lại, do đó component sẽ render lại và sau đó  dữ liệu của taskEdit vẫn quay về props cũ, vì thế ta không thể chỉnh sửa thêm trên input được)

- Vì vậy cần 1 lifecycle để can thiệp vào việc này lúc mà setState lại mà trước khi component render ra, và value của input phải binding từ state chớ không lấy từ props nữa
*/

import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components'
import { Button } from './Components/Button';
import { Dropdown } from './Components/DropDown';
import { Heading3 } from './Components/Heading';
import { Table, Th, Thead, Tr } from './Components/Table';
import { TextField } from './Components/TextField';
import { Container } from './Container/Container';

import { connect } from 'react-redux';
import { addTaskAction, changeThemeAction, deleteTaskAction, doneTaskAction, editTaskAction, updateTaskAction } from '../redux/actions/AddTaskAction';
import { arrThemes } from './Themes/ManagerTheme';

class BaiTapToDoList extends Component {

    renderTheme = () => {
        return arrThemes.map((theme, index) => {
            return <option key={index} value={theme.id}> {theme.name} </option>
        })
    }

    renderTaskToDo = () => (
        this.props.taskList.filter(task => !task.done).map((taskToDo, index) => (
            <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{taskToDo.taskName}</Th>
                <Th className="text-right">

                    <Button onClick={() => {
                        this.setState({
                            disabled: false
                        }, () => {
                            this.props.dispatch(editTaskAction(taskToDo))
                        })
                    }} className="ml-2"><i className="fa fa-edit"></i></Button>

                    <Button onClick={() => {
                        this.setState()
                        this.props.dispatch(doneTaskAction(taskToDo))
                    }} className="ml-2"><i className="fa fa-check"></i></Button>

                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(taskToDo.id))
                    }} className="ml-2"><i className="fa fa-trash"></i></Button>

                </Th>
            </Tr>
        ))
    )

    renderTaskCompleted = () => (
        this.props.taskList.filter(task => task.done).map((taskToDo, index) => (
            <Tr key={index}>
                <Th style={{ verticalAlign: 'middle' }}>{taskToDo.taskName}</Th>
                <Th className="text-right">

                    <Button onClick={() => {
                        this.props.dispatch(deleteTaskAction(taskToDo.id))
                    }} className="ml-2"><i className="fa fa-trash"></i></Button>

                </Th>
            </Tr>
        ))
    )

    state = {
        taskName: '',
        disabled: true
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(this.state)
        })
    }
    // Vì trong text field có rất nhiều trường như (name, value, className, placeHolder... nên chúng ta sẽ dùng bóc tách kiểu mảng [name] = value)

    /*
    - Vấn đề gặp phải:
        + Dữ liệu value input taskName được lấy từ props (state từ redux)
        + Mỗi lần user nhập dữ liệu cần binding giá trị vào state => setState => lifecycle phương thức render chạy lại => inpit lại lấy dữ liệu từ redux mà không phải từ user nhập vào

    => Khắc phục:
        + Xử lý trước khi hàm render được gọi ta sẽ can thiệp bằng lifecycle để lấy props từ redux => gán về thuộc tính this.state của component, và value của input phải binding từ state
    */

    // Lifecycle bảng 16 nhận vào props mới được thực thi trước render
    // Khi dùng lifecyle để can thiệp vấn đề không nhập liệu được thì phải đổi value từ nhận dữ liệu từ props sang nhận từ state
    // componentWillReceiveProps(newProps) { // Ví dụ đang ở task 2 click qua edit task 3 thì task 2 là this.props, còn task 3 là newProps
    //     this.setState({
    //         taskName: newProps.taskEdit.taskName
    //     })
    // }



    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList} >
                <Container className="w-50">

                    <Dropdown onChange={(e) => {
                        let { value } = e.target;
                        // Dispatch value lên reducer
                        this.props.dispatch(changeThemeAction(value));
                    }}>
                        {this.renderTheme()}
                    </Dropdown>

                    <Heading3>To do list</Heading3>

                    <TextField value={this.state.taskName} onChange={this.handleChange} name="taskName" label="Task name" className="w-50"></TextField>


                    <Button onClick={() => {
                        // Lấy thông tin người dùng nhập vào input
                        let { taskName } = this.state

                        // Tạo ra 1 task object để add task vào

                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }

                        // Đưa task object lên redux thông qua method dispatch
                        this.props.dispatch(addTaskAction(newTask))

                    }} className="ml-2"><i className="fa fa-plus"></i>Add task</Button>

                    {this.state.disabled ? <Button disabled onClick={() => {
                        this.props.dispatch(updateTaskAction(this.state.taskName))
                    }} className="ml-2"><i className="fa fa-upload"></i>Update task</Button> : <Button onClick={() => {
                        // Lưu trữ lại giá trị trước khi clear, vì nếu không lưu thì giá trị sẽ luôn luôn = ''
                        let { taskName } = this.state;
                        this.setState({
                            disabled: true,
                            taskName: ''
                        }, () => {
                            this.props.dispatch(updateTaskAction(taskName))
                        })

                    }} className="ml-2"><i className="fa fa-upload"></i>Update task</Button>}


                    <hr />
                    <Heading3>Task to do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                        </Thead>
                    </Table>
                    <Heading3>Task completed</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskCompleted()}
                        </Thead>
                    </Table>
                </Container>
            </ThemeProvider>
        )
    }

    /**
    - Ở đây, life cycle này sẽ giải quyết cho chúng ta 2 việc
        - Đầu tiên là lấy dữ liệu từ redux về thông qua props để binding lên value của textfield
        - Thứ 2 là giúp user có thể tiếp tục nhập liệu được là vì:
            - Khi setState thì người dùng sẽ không nhập được, nhưng ở đây điều kiện để setState lại là 2 props phải khác nhau, còn giờ chúng ta cùng thao tác 2 vấn đề trên 1 props thì user sẽ nhập liệu được, và component sẽ không render lại

    */

    // Đây là Lifecycle trả về props cũ và state cũ của component trước khi render (lifecycle này chạy sau render)
    componentDidUpdate(prevProps, prevState) {
        // So sánh nếu như props trước đó (taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }
    }

}

const mapStateToProp = (state) => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit
    }
}

// const mapDispatchStateToProps = (dispatch) => {
//     return {
//         addTaskAction: (newTask) => {
//             dispatch({
//                 type: ADD_TASK,
//                 newTask
//             })
//             // let action = {
//             //     type: ADD_TASK,
//             //     newTask
//             // }
//             // dispatch(action);
//         }
//     }
// }

export default connect(mapStateToProp)(BaiTapToDoList)

/*
- Trong React để lấy thông tin người dùng nhập vào thì sử dụng state. Để mỗi lần người ta nhập cái gì thì tự động nó sẽ binding lên trên state.

- Trong thể input để lấy thông tin thì phải đặt thuộc tính name cho thẻ input. Tức là muốn lấy value thì cái name được đặt trên thẻ input

- Trong method Onchange nó sẽ trả ra cho chúng 1 callback function có tên là event.

- Sau khi có được name của input rồi, thông qua onChange trả về callback function là event thì:

    - Nếu muốn thấy value của input: e.target.value
    - Nếu muốn lấy name của input: e.target.name

state = {
    firstName: '',
    userName: ''
}

<input onChange={(e) => {
    // Từ input lấy ra name và value của nó để truyền cho method handleChange()
    let {name,value} = e.target;
    this.handleChange(name,value);
}} name="firstName"></input>

<input onChange={() => {
    this.setState({
        userName: event.target.value
    })
}} name="userName"></input>

->> Ví dụ có 10 trường input thì setState lại kiểu này khá cực. Do đó viết ra cái hàm chung cho tất cả 10 đứa này.
Từ input lấy ra name và value của nó để truyền cho method handleChange(). Và có thể truyền vào cả 10 thằng input

handleChangeValue = (name,value) => {
    clg(name, value)
}

- Lúc này bài toán được giải quyết 1 phần, nhưng chẳng lẽ mỗi field sẽ setState lại (userName, firstName,...) thì khá lâu, do vậy trong ES6 có 1 thuộc tính gọi là động về mặt thuộc tính. Ta sẽ đưa tất cả cả name của 10 field này vào cùng 1 mảng tên là name, và tương tự value cũng vậy. Khi ta gọi name thì tương ứng với mỗi field sẽ có ra 1 value khác nhau từ người dùng nhập vào. Ứng với mỗi name nào thì sẽ có value của từng name đó
*/