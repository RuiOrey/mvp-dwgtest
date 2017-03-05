class Test {
    user: string;

    greeter = (person) => {
        return "Hello, " + person;
    }

    constructor() {
        this.user = "Jane User";
        document.body.innerHTML = this.greeter(this.user);
    }
}

let _test = new Test();