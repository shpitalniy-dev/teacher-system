import React from 'react';
import { toast } from 'react-toastify';
import { updateStudent, deleteStudent, getUpdatedStudent } from "./logic/table";
import { checkNameInputValue, checkNumberInputValue, clearErrorFromInput } from "../../../../../library/logic/validation";
// Must be render by div`s

export default class Table extends React.Component {
    btnOkUpdate = React.createRef()

    deleteStudentMethod = event => {
        const { updateRawData, teacher } = this.props;
        const { resources } = this.props.dictionary;
        deleteStudent(event.target.accessKey, teacher)
            .then(() => updateRawData())
            .then(() => toast.success(resources.successDeleteStudent, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            }))
            .catch(error => console.log(error));
    }

    updateStudentMethod = () => {
        const { btnOkUpdate } = this;
        const { update, setUpdateStudent, updateRawData, teacher } = this.props;
        const { resources } = this.props.dictionary;
        const student = getUpdatedStudent(btnOkUpdate.current, update, teacher);
        for (let key in student) {
            if (!student[key]) {
                return false;
            }
        }

        updateStudent(student)
            .then(() => setUpdateStudent(0))
            .then(() => updateRawData())
            .then(() => toast.success(resources.successUpdateStudent, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            }))
            .catch(error => console.log(error));
    }

    render() {
        const { updateStudentMethod, btnOkUpdate, deleteStudentMethod } = this;
        const { users, update, setUpdateStudent } = this.props;
        const { resources } = this.props.dictionary;
        let number = 1;

        return (
            <table>
                <thead>
                    <tr>
                        <th>{resources.number}</th>
                        <th>{resources.firstName}</th>
                        <th>{resources.lastName}</th>
                        <th>{resources.age}</th>
                        <th>{resources.city}</th>
                        <th colSpan={2}>{resources.actions}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length !== 0 ?
                        users.map(item => item.id !== update ?
                            <tr key={item.id}>
                                <td>{number++}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.age}</td>
                                <td>{item.city}</td>
                                <td colSpan={2}>
                                    <button onClick={() => setUpdateStudent(item.id)}>{resources.btnUpdate}</button>
                                    <button accessKey={item.id} onClick={deleteStudentMethod}>{resources.btnDelete}</button>
                                </td>
                            </tr>
                            :
                            <tr key={item.id}>
                                <td>{number++}</td>
                                <td><input type="text" defaultValue={item.firstname} style={{ width: "100%", boxSizing: "border-box" }} maxLength="30" onKeyDown={checkNameInputValue} onChange={() => clearErrorFromInput(event.target)} /></td>
                                <td><input type="text" defaultValue={item.lastname} style={{ width: "100%", boxSizing: "border-box" }} maxLength="30" onKeyDown={checkNameInputValue} onChange={() => clearErrorFromInput(event.target)} /></td>
                                <td><input type="text" defaultValue={item.age} style={{ width: "100%", boxSizing: "border-box" }} maxLength="2" onKeyDown={checkNumberInputValue} onChange={() => clearErrorFromInput(event.target)} /></td>
                                <td><input type="text" defaultValue={item.city} style={{ width: "100%", boxSizing: "border-box" }} maxLength="30" onKeyDown={checkNameInputValue} onChange={() => clearErrorFromInput(event.target)} /></td>
                                <td colSpan={2}>
                                    <button ref={btnOkUpdate} onClick={updateStudentMethod}>{resources.btnOk}</button>
                                    <button onClick={() => setUpdateStudent(0)}>{resources.btnCancel}</button>
                                </td>
                            </tr>
                        )
                        : null}
                </tbody>
            </table>
        )
    }
}