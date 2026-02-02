console.log('hello world');

const vegetables=['Tomato','Potato', 'Onion','Carrot']
console.log(vegetables.length);
console.log(vegetables.join('---'))

const newVegetables=vegetables.concat(['Beans','Cucumber',''])
console.log(vegetables)
console.log(newVegetables)

console.log(vegetables.find((y)=>y=='Carrot'));
console.log(vegetables.findIndex((y)=>y=='Onion'))
console.log(vegetables.findIndex((y)=>y=='Potato'))
console.log(vegetables.findIndex((y)=>y=='Tomato'))