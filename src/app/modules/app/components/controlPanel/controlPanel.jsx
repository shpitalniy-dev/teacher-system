import React from 'react';
import { toast } from 'react-toastify';
import { sendNewStudentOnServer, clearGroupOnServer, deleteGroupFromServer, checkNewStudent } from "./logic/controlPanel";
import { checkNameInputValue, checkNumberInputValue, clearError } from "../../../../../library/logic/validation";

export default class controlPanel extends React.Component {

    inputFirstName = React.createRef();
    inputLastName = React.createRef();
    inputAge = React.createRef();
    inputCity = React.createRef();
    outputFirstName = React.createRef();
    outputLastName = React.createRef();
    outputAge = React.createRef();
    outputCity = React.createRef();

    clearInput = () => {
        this.inputFirstName.current.value = "";
        this.inputLastName.current.value = "";
        this.inputAge.current.value = "";
        this.inputCity.current.value = "";
    };

    createNewStudent = () => {
        const { activeGroup, users, teacher } = this.props;
        const { resources } = this.props.dictionary;
        if (activeGroup === 0 || users.length >= 100) return false;
        const { updateRawData } = this.props;
        const student = checkNewStudent(this.inputFirstName.current, this.inputLastName.current,
            this.inputAge.current, this.inputCity.current, this.outputFirstName.current,
            this.outputLastName.current, this.outputAge.current, this.outputCity.current);
        student.idGroup = activeGroup;
        student.teacherLogin = teacher.login;

        for (let key in student) {
            if (!student[key]) {
                return false;
            }
        }

        sendNewStudentOnServer(student)
            .then(() => updateRawData())
            .then(() => this.clearInput())
            .then(() => toast.success(resources.successCreateStudent, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            }))
            .catch(error => console.log(error));
    };

    clearGroup = () => {
        if (this.props.activeGroup === 0) return false;

        const { resources } = this.props.dictionary;
        const { updateRawData } = this.props;
        const group = {};
        group.id = this.props.activeGroup;

        clearGroupOnServer(group)
            .then(() => updateRawData())
            .then(() => toast.success(resources.successClearGroup, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            }))
            .catch(error => console.log(error));
    };

    deleteGroup = () => {
        const { resources } = this.props.dictionary;
        const { updateRawData, updateGroups, setActiveGroup, activeGroup, groupNames } = this.props;
        const group = { id: activeGroup };

        clearGroupOnServer(group)
            .then(() => deleteGroupFromServer(group))
            .then(() => updateGroups())
            .then(() => updateRawData())
            .then(() => {
                if (groupNames.length > 1) {
                    setActiveGroup(activeGroup === groupNames[0].id ? groupNames[1].id : groupNames[groupNames.length - 2].id)
                } else {
                    setActiveGroup(null)
                }
            })
            .then(() => toast.success(resources.successDeleteGroup, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
            }))
            .catch(error => console.log(error))
    };

    render() {
        const { createNewStudent, clearGroup, deleteGroup } = this;
        const { setConfirm } = this.props;
        const { resources } = this.props.dictionary;

        return (
            <React.Fragment>
                <div className="control-panel__add-user">
                    <h3>{resources.createStudent}</h3>
                    <div className="control-panel__item">
                        <label htmlFor="inputFirstName">{resources.firstName}</label>
                        <input className="input-style" ref={this.inputFirstName} id="inputFirstName" type="text" placeholder={resources.enterFirstName} maxLength="30"
                            onKeyDown={checkNameInputValue} onChange={() => clearError(this.inputFirstName.current, this.outputFirstName.current)} />
                        <output className="output-style" ref={this.outputFirstName} id="outputFirstName">{resources.incorrectFirstName}</output>
                    </div>
                    <div className="control-panel__item">
                        <label htmlFor="inputLastName">{resources.lastName}</label>
                        <input className="input-style" ref={this.inputLastName} id="inputLastName" type="text" placeholder={resources.enterLastName} maxLength="30"
                            onKeyDown={checkNameInputValue} onChange={() => clearError(this.inputLastName.current, this.outputLastName.current)} />
                        <output className="output-style" ref={this.outputLastName} id="outputLastName">{resources.incorrectLastName}</output>
                    </div>
                    <div className="control-panel__item">
                        <label htmlFor="inputAge">{resources.age}</label>
                        <input className="input-style" ref={this.inputAge} id="inputAge" type="text" placeholder={resources.enterAge} maxLength="2"
                            onKeyDown={checkNumberInputValue} onChange={() => clearError(this.inputAge.current, this.outputAge.current)} />
                        <output className="output-style" ref={this.outputAge} id="outputAge">{resources.incorrectAge}</output>
                    </div>
                    <div className="control-panel__item">
                        <label htmlFor="inputCity">{resources.city}</label>
                        <input className="input-style" ref={this.inputCity} id="inputCity" type="text" placeholder={resources.enterCity} maxLength="30"
                            onKeyDown={checkNameInputValue} onChange={() => clearError(this.inputCity.current, this.outputCity.current)} />
                        <output className="output-style" ref={this.outputCity} id="outputCity">{resources.incorrectCity}</output>
                    </div>
                    <div className="control-panel__item">
                        <button className="button-style" onClick={createNewStudent}>{resources.createStudent}</button>
                    </div>
                </div>
                <div className="control-panel__settings">
                    <div className="control-panel__item">
                        <button className="button-style"
                            onClick={() => setConfirm({
                                isOpen: true,
                                message: resources.confirmClearGroup,
                                btnOk: () => { clearGroup(); setConfirm({ isOpen: false }) },
                                btnCancel: () => setConfirm({ isOpen: false })
                            })}>{resources.clearGroup}</button>
                    </div>
                    <div className="control-panel__item">
                        <button className="button-style" 
                            onClick={() => setConfirm({
                                isOpen: true,
                                message: resources.confirmDeleteGroup,
                                btnOk: () => {deleteGroup(); setConfirm({isOpen: false})},
                                btnCancel: () => {setConfirm({isOpen: false})}
                            })}
                            >{resources.deleteGroup}</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}