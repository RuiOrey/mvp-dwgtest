import * as Stats from '/stats-js/build/stats.min.js'

class Test {
    user: string;
    stats: any;

    greeter = (person) => {
        return "Hello, " + person;
    }

    initStats = () => {
        this.stats = new Stats();
        this.stats.setMode(1); // 0: fps, 1: ms, 2: mb, 3+: custom

        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

    }

    constructor() {
        this.user = "Jane User";
        document.body.innerHTML = this.greeter(this.user);
        this.initStats();
    }
}
let _test = new Test();

// hack to put object on global context
(<any>window)._test = _test;
document.body.appendChild(_test.stats.domElement);