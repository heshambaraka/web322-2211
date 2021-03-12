var things = [
    {
        category: 'school',
        name: 'book'
    },
    {
        category: 'school',
        name: 'pencil'
    },
    {
        category: 'cars',
        name: 'mercedes'
    },
    {
        category: 'cars',
        name: 'acura'
    },
    {
        category: 'school',
        name: 'eraser'
    },
    {
        category: 'cars',
        name: 'ford'
    }
];

// Categorize with JS reduce()
// Categorize with JS map()

// Categorize manually
let categories = [];

for (i = 0; i < things.length; i++) {
    let currentThing = things[i];
    let categoryName = currentThing.category
    
    let category = categories.find(c=>c.category == categoryName);

    if (!category) {
        category = {
            category: categoryName,
            items: []
        };

        categories.push(category);
    }
    
    category.items.push(currentThing);
}

console.log(categories);