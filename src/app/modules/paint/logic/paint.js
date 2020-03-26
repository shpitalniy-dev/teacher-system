export function DrawController(socket, teacher) {
    this.initialization = () => {
        this.lineObj = {
            size: undefined,
            color: undefined,
            moveTo: [],
            lineTo: []
        };
        this.socket = socket;
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.color = document.getElementById('color');
        this.background = document.getElementById('background');
        this.size = document.getElementById("size");
        this.btnClear = document.getElementById('btnClear');
        this.position = document.getElementById('position');
        this.isDrawing;

        this.canvas.onmousedown = this.startDrawing;
        this.canvas.onmouseup = this.stopDrawing;
        this.canvas.onmouseout = () => {
            this.stopDrawing();
            this.clearPosition();
        }
        this.canvas.onmousemove = event => {
            this.draw(event);
            this.definePosition(event);
        }
        this.background.onchange = this.setBackground;
        this.btnClear.onclick = this.clearCanvas;
    }

    this.layout = lines => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < lines.length; i++) {
            this.context.beginPath();
            this.context.strokeStyle = lines[i].color;
            this.context.lineWidth = lines[i].size;
            this.context.moveTo(lines[i].moveTo[0], lines[i].moveTo[1]);
            for (let j = 0; j < lines[i].lineTo.length; j = j + 2) {
                this.context.lineTo(lines[i].lineTo[j], lines[i].lineTo[j + 1]);
                this.context.stroke();
            }
        }
    }

    this.startDrawing = event => {
        this.isDrawing = true;
        this.context.beginPath();
        this.context.strokeStyle = this.color.value;
        this.context.lineWidth = this.size.value;
        let x = event.offsetX;
        let y = event.offsetY;
        this.context.moveTo(x, y);
        this.lineObj.size = this.size.value;
        this.lineObj.color = this.color.value;
        this.lineObj.moveTo.push(x, y);
    }

    this.draw = event => {
        if (this.isDrawing === true) {
            let x = event.offsetX;
            let y = event.offsetY;
            this.context.lineTo(x, y);
            this.lineObj.lineTo.push(x, y);
            this.context.stroke();
        }
    }

    this.stopDrawing = () => {
        if (this.isDrawing === true) {
            socket.emit('DRAW', {
                id: teacher.id,
                socket: socket.id,
                lines: this.lineObj,
            });
            this.lineObj.moveTo.length = 0;
            this.lineObj.lineTo.length = 0;
            this.isDrawing = false;
        }
    }

    this.definePosition = event => {
        let x = event.offsetX;
        let y = event.offsetY;
        this.position.innerHTML = x + " : " + y;
    }

    this.clearPosition = () => {
        this.position.innerHTML = "";
    }

    this.setBackground = () => {
        this.canvas.style.background = background.value;
    }

    this.clearCanvas = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        socket.emit('CLEAR_CANVAS', { id: teacher.id, socket: socket.id });
    }
}