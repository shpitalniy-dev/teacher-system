import React from "react";
import PropTypes from "prop-types";
import { DrawController } from "./logic/paint";
import { sendTime } from "../../../library/requests/requests";
import "./styles/paint.less";
export default class Paint extends React.Component {
    static propTypes = {
        dictionary: PropTypes.object.isRequired,
        teacher: PropTypes.object.isRequired,
        lines: PropTypes.array.isRequired,
        setLines: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.start = 0;
        this.finish = 0;
    }

    componentDidMount() {
        const { socket, teacher } = this.props;
        this.start = Date.now();
        this.paint = new DrawController(socket, teacher);
        this.paint.initialization();

        socket.on('SHOW_DRAWED', lines => {
            this.paint.layout(lines);
        })

        socket.emit('GET_DRAWS', { 
            id: teacher.id,
            socket: socket.id,
            lines: [], 
        });
    }

    componentWillUnmount() {
        const { teacher, socket } = this.props;
        this.finish = Date.now();
        sendTime(teacher, "paint", this.finish - this.start);
    }

    render() {
        const { resources } = this.props.dictionary;

        return (
            <div className="paint-wrapper">
                <div className="paint-body">
                    <div className="paint-body__canvas-conteiner">
                        <canvas id="canvas" width="600px" height="400px"></canvas>
                    </div>
                    <div className="paint-body__settings settings">
                        <div className="settings__menu">
                            <label>{resources.color}:<input id="color" type="color" /></label>
                            <label>{resources.background}:<input id="background" type="color" defaultValue="#ffffff" /></label>
                            <label>{resources.size}:<input id="size" type="range" min="1" max="10" step="1" defaultValue="3" /></label>
                            <input id="btnClear" type="button" defaultValue={resources.clear} />
                        </div>
                        <div className="settings__position">
                            <span id="position"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
