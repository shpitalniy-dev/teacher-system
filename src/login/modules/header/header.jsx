import React from "react";
import logo from "../../../img/wecan.png";
import settingsIcon from "../../../img/settings.png";

const Header = props => {
    const { toggleModal } = props;

    return (
        <div className="header__wrapper header-wrapper">
            <div className="header-wrapper__logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header-wrapper__settings">
                <img src={settingsIcon} 
                    alt="settings" 
                    height="45"
                    onClick={toggleModal}
                />
            </div>
        </div>
    )
}

export default Header;
