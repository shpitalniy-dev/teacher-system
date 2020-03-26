import React from "react";

const Footer = props => {
    const { resources } = props.dictionary;
    return (
        <div className='footer__block footer'>
            <div className="footer__copyright">
                {resources.copyright}<br/>
                {resources.team}
            </div>
        </div>
    )
}

export default Footer;