import React from 'react';
import style from '../../styles/style.less';
import ButtonSidebar from './component/button/index.js';


export default class Sidebar extends React.Component {


inputLog = () => {
const buttonState = store.getState();
   return buttonState.account.isStateButtonSidebar ?  <input className="input-style" type="text" placeholder={/*resources.inputLogin*/ 'Login'} id="sidebarLogin" readOnly = {true} /> :
                                                        <input className="input-style" type="text" placeholder={/*resources.inputLogin*/ 'Login'} id="sidebarLogin" readOnly = {false} />;
}

render () {
  return (

    <div className="main-container__sidebar sidebar">
        <ButtonSidebar  />
        <div className="sidebar-avatar">
            Avatar
        </div>
        {this.inputLog()}

         <input className="password-style" type="text" placeholder={/*resources.inputLogin*/ 'Password'} id="sidebarPassword" readOnly = {false} />
         <input className="input-style" type="tel" placeholder={/*resources.inputPhone*/ 'Phone'} id="sidebarPhoneNumber" readOnly = {false} />
        </div>

  );
  }
}

