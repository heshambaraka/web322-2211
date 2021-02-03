var employees = [
    {
        name: "John",
        age: 23,
        occupation: "Developer",
        company: "Scotiabank",
        visible: true,
        imageUrl: '/employee/person1.jpg'
    },
    {
        name: "Frank",
        age: 40,
        occupation: "Project Manager",
        company: "Scotiabank",
        visible: false,
        imageUrl: '/employee/person2.jpg'
    },
    {
        name: "Elmo",
        age: 39,
        occupation: "Manager",
        company: "Seneca",
        visible: true,
        imageUrl: '/employee/person3.jpg'
    }
];

module.exports.getAllEmployees = function() {
    return employees;
};

module.exports.getVisibleEmployees = function() {
    var filtered = [];

    for (var i = 0; i < employees.length; i++) {
        if (employees[i].visible) {
            filtered.push(employees[i]);
        }
    }

    return filtered;
};