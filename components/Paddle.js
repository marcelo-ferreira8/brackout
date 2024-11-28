export class Paddle {
    constructor () {
        this.paddle = new PIXI.Graphics;
        paddle.beginFill(0xFFFFFF);
        paddle.drawRect(0, 0, 100, 20);
        paddle.endFill();
        paddle.x = app.screen.width / 2 - 50;
        paddle.y = app.screen.height - 50;
        paddle.vx = 2;
    }
}