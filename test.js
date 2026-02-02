// console.log("hello")
const fruits = ['Apple', 'Banana', 'Grapes', 'Strawberry', 'Pine Apple', 'Musk Melon', "Water Melon", 
    'Banana','Banana','Banana',
    'Apple',
]
console.log(fruits.length);
console.log(fruits.join(' - '))

// add something



// pure functions - doesnt touch your old data but creates a new one
// impure functions - it fucks the current value | changes current data

// impure
// fruits.push('Strawberry')
// console.log(fruits)

// pure
// const newFruits = fruits.concat(['Strawberry', 'Mango'])
// console.log(fruits)
// console.log(newFruits)


// console.log(fruits.find((x)=> x.toLowerCase() == 'AppLe'.toLowerCase()))
// console.log(fruits.findIndex((x)=>x=='Grapes'))


// console.log(fruits.filter((item)=>item.toLowerCase().includes('meLon'.toLowerCase())));
console.log([...new Set(fruits)])


// const amounts = [100,400,500,200,400,203]
// console.log(amounts.reduce((previousValue,currentValue)=>previousValue+currentValue,0))

// const number= [1,3,4,6,3,]
// console.log(number.reduce((prev,curr)=>prev*curr, 1))

const cart =  [{name: "Apple", quantity: 10, amount: 100},
    {name: "Mango", quantity: 50, amount: 120},
    {name: "Banana", quantity: 34, amount: 40, }
 ]

console.log(cart.reduce((prev,curr)=>prev+curr.amount * curr.quantity,0))