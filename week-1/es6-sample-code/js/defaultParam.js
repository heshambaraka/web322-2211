
const doSomething = (name = "no value", age = "no value") =>
{

    if (name == "no value" && age == "no value")
    {
        // Do something here
    }

    console.log(`${name}`);
    console.log(`${age}`);
}

doSomething();
doSomething("Jon Snow");
doSomething(undefined, 40);
doSomething("Jon Snow", undefined);
