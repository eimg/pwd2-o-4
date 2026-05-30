let str: string;
str = "abc";

function add(a: number, b: number) {
    return a + b;
}

interface User {
    name: string;
    age: number;
}

let alice: User;
alice = { name: "Allice", age: 22 };

type Student = {
    name: string;
    age: number;
    bio?: string;
    grade: "A" | "B";
}

let bob: Student = {
    name: "Bob",
    age: 23,
    grade: "A",
};

let eve: Student & { gender: "Male" | "Female" } = {
    name: "Eve",
    age: 22,
    grade: "A",
    gender: "Female",
};

function wrap<T>(value: T) {
    return [value];
}

wrap(123);
wrap("abc");
