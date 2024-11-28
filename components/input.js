export class Input {

    constructor(){
        throw new Error()
    }

    static initialize() {
        this._oldBuffer = [];
        this._buffer = [];
        this._state = [];
        this._map = new Map();
        document.addEventListener("keydown", this._onKeyDown.bind(this));
        document.addEventListener("keyup", this._onKeyUp.bind(this));
    }

    static _onKeyDown(event) {
        if (!this._map.has(event.code)) this._map.set(event.code, event.keyCode);
        this._state[event.keyCode] = true;
    }

    static _onKeyUp(event) {
        this._state[event.keyCode] = false;
    }

    static update(delta) {
        this._oldBuffer = this._buffer.slice();
        for (const [i, state] of Object.entries(this._state)) {
            this._buffer[Number(i)] = this._buffer[Number(i)] || 0;
            if (state) {
                this._buffer[Number(i)]++;
            } else {
                this._buffer[Number(i)] = 0;
            }
        }
    }

    static pressed(key) {
        if (typeof key === 'string') {
            key = this.codeToKeyCode(key);
        }
        return this._state[key];
    }

    static triggered(key) {
        if (typeof key === 'string') {
            key = this.codeToKeyCode(key);
        }
        return this._buffer[key] && !this._oldBuffer[key];
    }

    static released(key) {
        if (typeof key === 'string') {
            key = this.codeToKeyCode(key);
        }
        return this._oldBuffer[key] && !this._buffer[key];
    }

    static codeToKeyCode(code) {
        return this._map.get(code) || 0;
    }

}
Input.initialize();
//Idealmente, já que estamos usando PIXI, a função Input.update deve ser chamada no updater do PIXI, mas também posso criar o meu próprio updater:
requestAnimationFrame(Input.update.bind(Input));