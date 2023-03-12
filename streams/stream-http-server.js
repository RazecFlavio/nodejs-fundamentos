import http from 'node:http'
import { Transform } from 'node:stream'


class ToNegativeNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log('lendo:', transformed);
        callback(null, Buffer.from(String(transformed)))
    }
}



const server = http.createServer((req, res) => {

    


    return req
        .pipe(new ToNegativeNumber())
        .pipe(res)
});

server.listen(3334)