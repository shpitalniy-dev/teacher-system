import React from "react";
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import Table from "./components/table/table.jsx";
import ControlPanel from './components/controlPanel/controlPanel.jsx';
import { checkGroupNameInputValue } from "../../../library/logic/validation";
import { sendTime } from "../../../library/requests/requests";
import { getGroupsFromServer, getUsersRawDataFromServer, createNewGroup, renameGroupDB } from "./logic/app";

export default class App extends React.Component {
    static propTypes = {
        groupNames: PropTypes.array.isRequired,
        setGroupNames: PropTypes.func.isRequired,
        activeGroup: PropTypes.number,
        setActiveGroup: PropTypes.func.isRequired,
        usersRawData: PropTypes.array.isRequired,
        setUsersRawData: PropTypes.func.isRequired,
        dictionary: PropTypes.object.isRequired,
        teacher: PropTypes.object.isRequired,
        update: PropTypes.number.isRequired,
        setUpdateStudent: PropTypes.func.isRequired,
        setConfirm: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.lock = false;
        this.updateGroups();
        this.updateRawData();
        this.start = 0;
        this.finish = 0;
    }

    componentDidMount() {
        this.start = Date.now();
    }

    componentWillUnmount() {
        const { teacher } = this.props;
        this.finish = Date.now();
        sendTime(teacher, "table", this.finish - this.start);
    }

    componentDidUpdate() {
        const { groupNames, setActiveGroup } = this.props;
        if (!this.lock && groupNames && groupNames[0]) {
            setActiveGroup(groupNames[0].id);
            this.lock = true;
        }
    }

    btnAddNewGroup = React.createRef();

    changeGroup = event => {
        const { setActiveGroup } = this.props;
        setActiveGroup(+event.target.accessKey);
    };

    addNewGroup = () => {
        const { groupNames, setGroupNames, setActiveGroup, teacher } = this.props;
        const { resources } = this.props.dictionary;
        const { btnAddNewGroup } = this;
        if (groupNames.length < 3) {
            if (btnAddNewGroup.current) {
                btnAddNewGroup.current.disabled = true;
            }
            createNewGroup(teacher)
                .then(() => getGroupsFromServer(teacher))
                .then(result => {
                    setGroupNames(result);
                    setActiveGroup(result[result.length - 1].id);
                })
                .then(() => {
                    if (btnAddNewGroup.current) {
                        btnAddNewGroup.current.disabled = false;
                    }
                })
                .then(() => toast.success(resources.successCreateGroup, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                }))
                .catch(err => console.log(err));
        } else {
            console.log("You cant create more than 3 groups");
        }
    };

    startRenameGroup = event => {
        event.target.readOnly = false;
        const prevValue = event.target.value;
        // event.target.onblur = event => this.finishRenameGroup(event, prevValue);
        event.target.onkeydown = event => {
            if (event.key === 'Enter') {
                this.finishRenameGroup(event, prevValue);
                return;
            } else if (event.key === 'Escape') {
                event.target.value = prevValue;
                event.target.readOnly = true;
                event.target.onblur = null;
                event.target.onkeydown = null;
                return;
            }
        };
        event.target.onblur = event => {
            event.target.value = prevValue;
            event.target.readOnly = true;
            event.target.onblur = null;
            event.target.onkeydown = null;
            return;
        }
    };

    finishRenameGroup = (event, prevValue) => {
        const { resources } = this.props.dictionary;
        event.target.readOnly = true;
        event.target.onblur = null;
        event.target.onkeydown = null;
        const value = event.target.value;
        if (value !== prevValue) {
            if (value.split("").every(item => item.match(/[a-zA-Z0-9 -()]/)) && value.trim() !== "") {
                const group = {};
                group.id = event.target.accessKey;
                group.name = event.target.value.trim();
                renameGroupDB(group)
                    .then(() => toast.success(resources.sucessRenameGroup, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                    }))
                    .catch(error => {
                        event.target.value = prevValue;
                        console.log(error)
                    });
                return;
            } else {
                event.target.value = prevValue;
                toast.error(resources.failRenameGroup, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                })
                return;
            }
        } else {
            event.target.value = prevValue;
        }
    };

    updateGroups = () => {
        const { teacher } = this.props;
        getGroupsFromServer(teacher)
            .then(result => this.props.setGroupNames(result))
            .catch(error => console.log(error));
    };

    updateRawData = () => {
        const { teacher } = this.props;
        getUsersRawDataFromServer(teacher).
            then(result => this.props.setUsersRawData(result))
            .catch(error => console.log(error));
    };

    render() {
        const { groupNames, activeGroup, usersRawData, dictionary, update, setUpdateStudent, setActiveGroup, setConfirm, teacher } = this.props;
        const { changeGroup, addNewGroup, updateRawData, updateGroups } = this;

        return (
            <React.Fragment>
                <div className="tables">
                    <div className="tables__group-panel">
                        {groupNames.map(item =>
                            <input type="text"
                                key={item.id}
                                accessKey={item.id}
                                style={activeGroup !== item.id ? null : { background: "lightgreen" }}
                                className="table-tabs"
                                onClick={changeGroup}
                                onDoubleClick={this.startRenameGroup}
                                defaultValue={item.group_name}
                                onKeyDown={checkGroupNameInputValue}
                                maxLength="30"
                                readOnly />
                        )}
                        {groupNames && groupNames.length < 3 ? <button
                            ref={this.btnAddNewGroup}
                            style={{
                                width: "30px",
                                textAlign: "center",
                                borderRadius: "3px",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            onClick={addNewGroup}
                        >+</button> : null}
                        {!groupNames.length ? <span
                            style={{
                                color: "#ffd800",
                                marginLeft: "5px",
                                alignSelf: "center",
                            }}
                        >{dictionary.dialogs.startFromAddingGroup}</span> : null}
                    </div>
                    <div className="tables__body">
                        {groupNames.filter(item => item.id === activeGroup).length != 0 ?
                            <Table
                                users={usersRawData.filter(item => item.group_id === activeGroup)}
                                dictionary={dictionary}
                                update={update}
                                setUpdateStudent={setUpdateStudent}
                                updateRawData={updateRawData}
                                teacher={teacher}
                            />
                            : null}
                    </div>
                </div>
                <div className="control-panel">
                    {activeGroup !== null ?
                        <ControlPanel
                            dictionary={dictionary}
                            users={usersRawData.filter(item => item.group_id === activeGroup)}
                            activeGroup={activeGroup}
                            updateRawData={updateRawData}
                            updateGroups={updateGroups}
                            setActiveGroup={setActiveGroup}
                            setConfirm={setConfirm}
                            groupNames={groupNames}
                            teacher={teacher}
                        />
                        :
                        null}
                </div>
            </React.Fragment>
        )
    }
};