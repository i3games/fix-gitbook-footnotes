// fixes footnote ordering on gitbooks
// see https://github.com/GitbookIO/feedback/issues/472
// node fixfn.js [filename]
// it changes the file in place without backup (assumes we are in a git repository)

fs = require('fs')

const fixfn = (err, data) => {
  if (err) {
    return console.log(`cannot open file: ${err.path}`)
  }
  console.log(data)
}

const path = process.argv[2]
if (path == null) { return console.log('usage: node fixfn.js [filename]') }
fs.readFile(process.argv[2] ? process.argv[2] : '', 'utf8', fixfn)
