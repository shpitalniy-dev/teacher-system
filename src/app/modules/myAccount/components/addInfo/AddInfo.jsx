import React from 'react';
import {getTextareaInfo} from './helpers.js';
import {some} from './helpers.js';
import PropTypes from "prop-types";
import "./index.less"


export default class AddInfo extends React.Component {
    static propTypes = {
        dictionary: PropTypes.object.isRequired,
    };

    componentDidMount() {
        some();
    }
    componentDidUpdate() {
        some();
    }

    onClickButton =() =>{
        getTextareaInfo();
        console.log(this.props)
        this.props.changeStateButton()
    };
        render() {
            const {isStateButton, dictionary} = this.props;
            return (
                <div className="add-info-main">
                    {
                        isStateButton ?
                                <div className="add-info-wrapper">
                                    <div className="wrapper-for-button">
                                        <div className="add-info-span"><span className="add-info__title">{dictionary.resources.additionalInfo}</span></div>
                                        <button className="main-container__button button-style" onClick={this.props.changeStateButton}>{dictionary.resources.change}</button>
                                    </div>
                                    <div className="wrapper-textarea">
                                        <textarea readOnly={true} className="add-info__textarea input-style" maxLength="300" id="addInfoText"></textarea>
                                    </div>
                                </div>
                            :
                                <div className="add-info-wrapper">
                                    <div className="wrapper-for-button">
                                        <div className="add-info-span"><span className="add-info__title">{dictionary.resources.additionalInfo}</span></div>
                                        <button className="main-container__button button-style" onClick={this.onClickButton}>{dictionary.resources.save}</button>
                                    </div>
                                <div className="wrapper-textarea">
                                    <textarea readOnly={false} className="add-info__textarea input-style" maxLength="500" id="addInfoText"></textarea>
                                </div>
                                </div>
                    }
                </div>
      );
    }
};

