function reverseString(data){ 
    const reverseStr= data.toString().split('').reverse().join('');
    process.stdout.write(`Result: ${reverseStr.trim()}` + '\n\n');
}

process.stdin.on('data', reverseString);




