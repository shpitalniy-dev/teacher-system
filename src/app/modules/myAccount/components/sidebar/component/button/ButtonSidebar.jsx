import React from 'react';
import style from '../../../../styles/style.less';
import saveOrChangeButton from '../../../../logic/myAccount.js';

export default class Button extends React.Component {

 fdghfgh = () => {this.props.changeStateButton(), saveOrChangeButton()};
 fgfgfg = () => {this.props.changeStateButton(), saveOrChangeButton()};

    inputRef = React.createRef()

changeValueButton = () => {
        alert("hohohoho");
        this.props.changeStateButton();
    }

render() {
    const { isStateButton } = this.props
    console.log(isStateButton)
      return (
                <div>
                    {
                        isStateButton ?
                        <div>
                            <button onClick={this.props.checkKnowledge}>Check me</button>
                            <button className="main-container__button button" onClick={this.props.changeStateButton}>Change</button>
                            <input type="text" defaultValue="Kolya" readOnly={true} />
                        </div>
                        :
                        <div>
                            <button onClick={this.props.checkKnowledge}>You ok!</button>
                            <button className="main-container__button button" onClick={this.changeValueButton}>Save</button>
                            <input type="text" defaultValue="Kolya" readOnly={false} />
                        </div>
                    }
                    </div>

      );
  }
}

