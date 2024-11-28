import { Input } from "./components/input.js";
const app = new PIXI.Application({ width: 640, height: 360});
document.body.appendChild(app.view);

let paddle, state;
function setup() {
    paddle = new PIXI.Graphics;
    paddle.beginFill(0xFFFFFF);
    paddle.drawRect(0, 0, 100, 20);
    paddle.endFill();
    
    paddle.x = app.screen.width / 2 - 50;
    paddle.y = app.screen.height - 50;
    
    paddle.vx = 2;
    
    app.stage.addChild(paddle);

    state = play;

    app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    if (Input.pressed("KeyA")) {
        paddle.x -= paddle.vx;  
    }
    if (Input.pressed("KeyD")) {
        paddle.x += paddle.vx;  
    }

    if(paddle.x < 0) paddle.x = 0
    if (paddle.x > app.screen.width - paddle.width) {
        paddle.x = app.screen.width - paddle.width;
    }
    

}


setup();