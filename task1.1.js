function reverseString(data){ 
    const reverseStr= data.toString().split('').reverse().join('');
    process.stdout.write(reverseStr.trim() + '\n\n');
}

process.stdin.on('data', reverseString);



// const readline = require('readline')

// const rl = readline.createInterface({
//     input: process.stdin, output: process.stdout
// });

// const TEXT_TEMPLATE = 'Type any text: ';
// const getResult = (result) => `Result: ${result} \n ----------`
// const getReverse = (str) => str.split('').reverse().join('');

// rl.question(TEXT_TEMPLATE + '\n', (value) => {
//     const result = getReverse(value)
//     console.log(getResult(result))
//     rl.setPrompt(TEXT_TEMPLATE + '\n')
//     rl.prompt()
//     rl.on('line', (value) => {
//         const result = getReverse(value)
//         console.log(`${getResult(result)}\n${TEXT_TEMPLATE}`)
//     })

// })



