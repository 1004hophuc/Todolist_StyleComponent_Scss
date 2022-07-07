// import React, { Component } from 'react'

// export default class TestLayThongTin extends Component {

// // Cách 1: Basic
//     state = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: ''
//     }

//     handleChangeValue = (name, value) => {
//         this.setState({
//             [name]: value
//         }, () => {
//             console.log(this.state)
//         })
//     }


//     render() {
//         return (
//             <div className="mt-5 w-50">
//                 <div className="form-group">
//                     <input onChange={(e) => {
//                         let { name, value } = e.target;
//                         this.handleChangeValue(name, value)
//                     }} type="text" className="form-control" name="firstName" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">First Name</small>
//                 </div>
//                 <div className="form-group">
//                     <input onChange={(e) => {
//                         let { name, value } = e.target;
//                         this.handleChangeValue(name, value)
//                     }} type="text" className="form-control" name="lastName" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">Last Name</small>
//                 </div>
//                 <div className="form-group">
//                     <input onChange={(e) => {
//                         let { name, value } = e.target;
//                         this.handleChangeValue(name, value)
//                     }} type="email" className="form-control" name="email" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">Email</small>
//                 </div>
//                 <div className="form-group">
//                     <input onChange={(e) => {
//                         let { name, value } = e.target;
//                         this.handleChangeValue(name, value)
//                     }} type="password" className="form-control" name="password" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">Password</small>
//                 </div>
//             </div>

//         )
//     }
// }


// import React, { Component } from 'react'

// export default class TestLayThongTin extends Component {

//     // Cách 2: Advanced
//     state = {
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: ''
//     }

//     handleChangeValue = (e) => {
//         let { name, value } = e.target;
//         this.setState({
//             [name]: value
//         }, () => {
//             console.log(this.state)
//         })
//     }


//     render() {
//         return (
//             <div className="mt-5 w-50">
//                 <div className="form-group">
//                     <input onChange={this.handleChangeValue} type="text" className="form-control" name="firstName" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">First Name</small>
//                 </div>
//                 <div className="form-group">
//                     <input onChange={this.handleChangeValue} type="text" className="form-control" name="lastName" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">Last Name</small>
//                 </div>
//                 <div className="form-group">
//                     <input onChange={this.handleChangeValue} type="email" className="form-control" name="email" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">Email</small>
//                 </div>
//                 <div className="form-group">
//                     <input onChange={this.handleChangeValue} type="password" className="form-control" name="password" aria-describedby="helpId" />
//                     <small id="helpId" className="form-text text-muted">Password</small>
//                 </div>
//             </div>

//         )
//     }
// }

import React, { Component } from 'react'

export default class TestLayThongTin extends Component {

    // Kết hợp với validation
    state = {
        values: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        errors: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

    }

    handleChangeValue = (e) => {
        let { name, value } = e.target;
        let newValues = { ...this.state.values, [name]: value };
        let newErrors = { ...this.state.errors };

        if (value.trim() === '') {
            newErrors[name] = name + ' is required!';
        } else {
            newErrors[name] = '';
        }

        // Kiểm tra form của email

        this.setState({
            values: newValues,
            errors: newErrors
        })
    }

    // Xử lý sự kiện submit


    render() {
        return (
            <div className="mt-5 w-50">
                <div className="form-group">
                    <input value={this.state.values.firstName} onChange={this.handleChangeValue} type="text" className="form-control" name="firstName" aria-describedby="helpId" />
                    <span id="helpId" className="form-text text-danger">{this.state.errors.firstName}</span>
                </div>
                <div className="form-group">
                    <input value={this.state.values.lastName} onChange={this.handleChangeValue} type="text" className="form-control" name="lastName" aria-describedby="helpId" />
                    <span id="helpId" className="form-text text-danger">{this.state.errors.lastName}</span>
                </div>
                <div className="form-group">
                    <input value={this.state.values.email} onChange={this.handleChangeValue} type="email" className="form-control" name="email" aria-describedby="helpId" />
                    <span id="helpId" className="form-text text-danger">{this.state.errors.email}</span>
                </div>
                <div className="form-group">
                    <input value={this.state.values.password} onChange={this.handleChangeValue} type="password" className="form-control" name="password" aria-describedby="helpId" />
                    <span id="helpId" className="form-text text-danger">{this.state.errors.password}</span>
                </div>
            </div>

        )
    }
}

/*
- Kết hợp với validation thì phải dùng chung 1 name cho input để vừa lấy value user nhập vào, vừa kiểm tra value đó có hợp lệ hay không, bằng cách tạo 2 đối tượng values và errors chứa các field name.
- Vì khi setSate nó sẽ lấy lại value của state cũ, nên là mỗi khi setState mình sẽ phải gán nó thành cái mới. Ví dụ nếu không gán thành cái mới thì ô input của mình sẽ luôn luôn rỗng, vì state ban đầu khai báo là rồng


- Xử lý sự kiện submit: tất cả các thuộc tính của values không được rỗng và tất cả thuộc tính của errors phải  = rỗng thì mới cho submit
- Dùng for in để duyệt qua tất cả các thuộc tính của object value để kiểm tra
- Đặt biến valid = true mặc định để form submit


*/