const axios = require('../../../index');
const package = require('../../../package.json');
const http = require('http');
const fs = require('fs');
const { Transform } = require('stream');



let n = 1;
let total = 0;

describe('3396', () => {
  before((done) => {
    const server = http.createServer((request, response) => {
      // simulate slow connection:
      const throttler = new Transform({
        transform(chunk, encoding, send) {
          setTimeout(() => {
            send(null, chunk);
          }, 100);
        }
      });

      let fh = fs.createReadStream(__dirname + '/../../../package-lock.json', 'utf-8');
      fh.pipe(throttler).pipe(response)
        .on('end', () => {
          fh.close();
        });
    })
    server.listen(3000, done);
  });
  it('crashes node.exe', async () => {
    do {
      await axios.get('http://localhost:3000/')
        .then(res => {
          let size = JSON.stringify(res.data).length;
          total += size;
          console.log(`${n++} got ${size.toLocaleString()} (${total.toLocaleString()}) node: ${process.version}, axios ${package.version}`);
        })
        .catch(err => { console.error("ERROR: " + err.message); process.exit() })
    } while (total < 3000000000); // Transfer 3Gb.	  
    console.log(`Moved ${total.toLocaleString()} bytes no error`);
    server.close();
  });
});



