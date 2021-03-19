import path from 'path'
import fs from 'fs'
import csv from 'csvtojson'
import { pipeline, Transform } from 'stream'

const csvFilePath = path.join(__dirname, 'csv', 'input.csv')
const outputFilePath = path.join(__dirname, 'output', 'output.txt')

let readableStream = fs.createReadStream(csvFilePath, 'utf8');
let writeableStream = fs.createWriteStream(outputFilePath);

class toCSV extends Transform {
  constructor() {
    super()
  }

  async _transform(chunk, enc, done) {

    const str = chunk.toString('utf8')
    const jsonObj = await csv().fromString(str)

    jsonObj.forEach((value) => {
      const result = Object.keys(value).reduce((acc, curr) => {
        const smallValue = curr.toLowerCase();
        if (smallValue !== 'amount') {
          acc[smallValue] = value[curr]
        }
        return acc
      }, {})

      this.push(JSON.stringify(result) + '\n')
    })

    done()
  }

}

pipeline(
  readableStream,
  new toCSV(),
  writeableStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
