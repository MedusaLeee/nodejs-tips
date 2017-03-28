/**
 * Created by lijianxun on 2017/3/23.
 */
const Readable = require('stream').Readable;
const fs = require('fs');


class JsonReadable extends Readable {
  constructor(source) {
    super();
    this._buffer = '';
    this.source = source;
  }

  onSourceReadable() {
    this.read();
  }

  // Stream.Readable是抽象类，子类要实现_read的方法
  _read() {
    let lineIndex;
    let chunk;
    let line;
    let result;
    if (this._buffer.length === 0) {
      chunk = this.source.read();
      this._buffer += chunk;
      //console.log('chunk: ', chunk);
    }
    lineIndex = this._buffer.indexOf('\n');
    if (lineIndex !== -1) {
      line = this._buffer.slice(0, lineIndex);
      if (line) {
        result = JSON.parse(line);
        this._buffer = this._buffer.slice(lineIndex + 1);
        this.push(JSON.stringify(result));
      } else {
        this._buffer = this._buffer.slice(1);
      }
    }


  }
}

const txtReadStream = fs.createReadStream(__dirname + '/json.txt', {encoding: 'utf-8'});
txtReadStream.on('readable', () => {
  const jsonReadable = new JsonReadable(txtReadStream);
  jsonReadable.onSourceReadable();
  jsonReadable.pipe(process.stdout);
});

