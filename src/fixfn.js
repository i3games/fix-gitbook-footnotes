// fixes footnote ordering on gitbooks
// see https://github.com/GitbookIO/feedback/issues/472
// node fixfn.js filename [writefile]
// it assumes standard footnote numbering: 1, 2, 3..
// if you omit writefile, it changes the file in place (it assumes we are in a git repository)

const fs = require('fs')
const os = require('os')

const fixfn = (text) => {

  const fn_marker_re = /\[\^([0-9]+)\]/g  // footnote markers -> numbers; unfortunately we can't exclude : [^:], or exclude if it is at the beginning of the line
  const fn_re = /\[\^([0-9]+)\]:(.+)/g    // footnotes -> numbers, text
  const fn_list = [], fn_markers = []

  // create a list from the footnote markers in the order they appear
  let fn_marker
  while (fn_marker = fn_marker_re.exec(text)) {
    if (fn_markers.indexOf(fn_marker[1]) === -1) { fn_markers.push(fn_marker[1]) }
  }

  // create a list from the footnotes: indices and text. sort this according to fn_markers
  let fn, fn_start
  while (fn = fn_re.exec(text)) {
    if (fn_start == null) { fn_start = fn.index } // get the start of the footnote area
    fn_list.push({index: fn[1], footnote: fn[2]})
  }
  fn_list.sort((a, b) => {
    return (fn_markers.indexOf(a.index) > fn_markers.indexOf(b.index))? 1 : -1
  })

  // delete the footnote area
  // TODO check if there is anything after the footnotes
  text = text.substring(0, fn_start)

  // now sort fn_markers numerically then replace the markers in the text
  fn_markers.sort((a, b) => { return a - b })
  let i = 0
  text = text.replace(fn_marker_re, () => { return `[^${fn_markers[i++]}]` })

  // replace the indices in fn_list by the sorted markers as well
  let j = 0
  for (let fn of fn_list) {  fn.index = fn_markers[j++] }

  // append the footnotes
  for (let fn of fn_list) { text = text.concat(`[^${fn.index}]:`, fn.footnote, os.EOL, os.EOL) }

  return text
}

const readpath = process.argv[2]
let writepath = process.argv[3]
if (readpath == null) { return console.log('usage: node fixfn.js filename [writefile]') }
if (writepath == null) { writepath = readpath }
fs.readFile(readpath, 'utf8', (err, text) => {
  if (err) { return console.log(`cannot open file: ${err.path}`) }
  fs.writeFile(writepath, fixfn(text), (err) => { if (err) throw err })
})
