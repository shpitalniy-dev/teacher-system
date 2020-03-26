import React from 'react';
import './game.less';
import * as balls from './logic/logic.js'


export default class Game extends React.Component {

    componentDidMount() {
        let canvas = document.getElementById('canvas-game');
        balls.init(canvas);
    }

    render() {
        return (
            <div className='game'>
                <canvas id="canvas-game"
                        width="600px"
                        height="150px"
                        className="canvas"
                        onClick={() => balls.makeBall(event)}/>
            </div>

        );
    }
}