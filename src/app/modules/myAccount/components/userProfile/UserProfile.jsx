import { checkTextInputValue, checkNumberInputValue, checkMailInputValue, checkLoginInputValue, clearError } from "../../../../../library/logic/validation";
import {getTeacherInfoToMyAccount} from '../../logic/helpers/helpers.js';
import PureComponent from "../../../../../base/PureComponent.jsx";
import ErrorBoundary from "../../../../../base/ErrorBoundary.jsx";
import {finishValidate} from '../../logic/helpers/helpers.js';
import {sendImage} from '../../logic/helpers/helpers.js';
import ContextMenu from 'react-context-menu';
import PropTypes from "prop-types";
import "./userProfille.less";
import React from 'react';


@ErrorBoundary
export default class UserProfile extends PureComponent {
    static propTypes = {
        dictionary: PropTypes.object.isRequired,
        isChangeMode: PropTypes.bool.isRequired,
        toggleUserProfileMode: PropTypes.func.isRequired,
    };

    inputLogin = React.createRef();
    outputLogin = React.createRef();
    inputMail = React.createRef();
    outputMail = React.createRef();
    inputPhone = React.createRef();
    outputPhone = React.createRef();

    componentDidUpdate() {
        getTeacherInfoToMyAccount();
    }

    fileInput = () => {
        document.getElementById("file").click();
    }

    onClickButton = () => {
           finishValidate() ? this.successValidation() : "";
           const {isChangeButton} = this.props;
           const {isStateButton} = this.props;
       };

       successValidation = () =>{
       this.props.changeStateButton();
       }

       render() {
           const {isStateButton, dictionary} = this.props;
           const {inputLogin, outputLogin, inputMail, outputMail, inputPhone, outputPhone} = this;
           return (
               <div className="user-profile-main">
                   {
                       isStateButton ?

                       <div className="user-profile-wrapper">

                         <div className="sidebar-avatar" id="sidebarAvatar">
                         </div>

                           <button className="main-container__button button-style" onClick={this.successValidation}>{dictionary.resources.change}</button>

                            <div className="user-profile-form-item">
                                <label htmlFor="userProfileLogin" id="loginLabel">{dictionary.resources.login}</label>
                                <input ref={inputLogin} className="input-style-user" type="text" placeholder={dictionary.resources.login} id="userProfileLogin" required onKeyDown={checkLoginInputValue} onChange={() => clearError(inputLogin.current, outputLogin.current)} maxLength="30" readOnly = {true} />
                                <output ref={outputLogin} className="output-style" id="outputLogin">{dictionary.resources.incorrectLogin}</output>
                            </div>

                            <div className="user-profile-form-item">
                                 <label htmlFor="userProfileMail" id="emailLabel">{dictionary.resources.email}</label>
                                 <input ref={inputMail} className="input-style-user" type="email" placeholder={dictionary.resources.email} id="userProfileMail" required onKeyDown={checkMailInputValue} onChange={() => clearError(inputMail.current, outputMail.current)} maxLength="30" readOnly = {true} />
                                 <output ref={outputMail} className="output-style" id="userOutputMail">{dictionary.resources.incorrectMail}</output>
                            </div>

                            <div className="user-profile-form-item">
                                <label htmlFor="userProfilePhoneNumber" id="phoneLabel">{dictionary.resources.phone}</label>
                                <div className="phone-number">
                                    <select className="input-style-user phone-number__code" disabled={true}>
                                        <option value="ukr">+380</option>
                                    </select>
                                <input ref={inputPhone} className="input-style-user phone-number__number" type="tel" placeholder={dictionary.resources.phone} id="userProfilePhoneNumber" required onKeyDown={checkNumberInputValue} readOnly = {true} maxLength="30" />
                                </div>
                                <output ref={outputPhone} className="output-style" id="userOutputPhoneNumber">{dictionary.resources.incorrectPhone }</output>
                            </div>

                        </div>
                    :
                        <div>

                            <div className="sidebar-avatar" id="sidebarAvatar">

                               <input name="myFile" type="file" id="file" onChange={()=> sendImage()} hidden/>

                                    <ContextMenu
                                        contextId={"sidebarAvatar"}
                                            items={[
                                                {
                                                    label: 'Select image',
                                                    onClick: () => this.fileInput()
                                                }
                                            ]}/>
                            </div>

                                        <button className="main-container__button button-style" onClick={this.onClickButton}>{dictionary.resources.save}</button>

                            <div className="user-profile-form-item">
                               <label htmlFor="userProfileLogin" id="loginLabel">{dictionary.resources.login}</label>
                               <input ref={inputLogin} className="input-style-user" type="text" placeholder={dictionary.resources.login} id="userProfileLogin" required onKeyDown={checkLoginInputValue} onChange={() => clearError(inputLogin.current, outputLogin.current)} maxLength="30" readOnly = {true} />
                               <output ref={outputLogin} className="output-style" id="userOutputLogin">{dictionary.resources.incorrectLogin}</output>
                            </div>

                            <div className="user-profile-form-item">
                                  <label htmlFor="userProfileMail" id="emailLabel">{dictionary.resources.email}</label>
                                  <input  ref={inputMail} className="input-style-user" type="email" placeholder={dictionary.resources.email} id="userProfileMail" required onKeyDown={checkMailInputValue} onChange={() => clearError(inputMail.current, outputMail.current)} maxLength="30" readOnly = {false} />
                                  <output ref={outputMail} className="output-style" id="userOutputMail">{dictionary.resources.incorrectMail}</output>
                            </div>

                            <div className="user-profile-form-item">
                                <label htmlFor="userProfilePhoneNumber" id="phoneLabel">{dictionary.resources.phone}</label>
                                <div className="phone-number">
                                    <select className="input-style-user phone-number__code">
                                         <option value="ukr">+380</option>
                                    </select>
                                    <input ref={inputPhone} className="input-style-user phone-number__number" type="tel" placeholder={dictionary.resources.phone} id="userProfilePhoneNumber" required onKeyDown={checkNumberInputValue} onChange={() => clearError(inputPhone.current, outputPhone.current)} maxLength="9" readOnly = {false} />
                                 </div>
                                <output ref={outputPhone}  className="output-style" id="userOutputPhoneNumber">{dictionary.resources.incorrectPhone}</output>
                            </div>
                    </div>
                }
            </div>
        );
    }
}


