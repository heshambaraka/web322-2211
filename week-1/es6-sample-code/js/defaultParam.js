
const doSomething = (name = "no value", age = "no value")=>
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
doSomething("Jon Snow", undefined);
doSomething(undefined, 40);
