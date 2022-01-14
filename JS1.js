let numbers = {
	a: 2,
	b: 4
}

function result (numbers) {
    numbers.a = numbers.a+numbers.b;
    numbers.b = numbers.a-numbers.b;
    numbers.a = numbers.a-numbers.b;
    return numbers;
}

console.log(result(numbers));