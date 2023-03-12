import http from 'node:http'
import { Transform } from 'node:stream'


class ToNegativeNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log('lendo:', transformed);
        callback(null, Buffer.from(String(transformed)))
    }
}



const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk)  //acumulando todos os pedacinhos em um arquivo
    }

    const fullStream = Buffer.concat(buffers).toString()

    return res.end(fullStream);
});

server.listen(3335)