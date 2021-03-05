import path from 'path'
import fs from 'fs'
import csv from 'csvtojson'
import { pipeline } from 'stream'

const csvFilePath = path.join(__dirname, 'csv', 'input.csv')
const outputFilePath = path.join(__dirname, 'output', 'output.txt')

let readableStream = fs.createReadStream(csvFilePath, 'utf8');
let writeableStream = fs.createWriteStream(outputFilePath);

pipeline(
    readableStream,
    csv(),
    writeableStream,
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
