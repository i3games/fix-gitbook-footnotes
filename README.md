# fixfn.js

fixes footnote ordering in gitbook.

`node fixfn.js [filename]`

If you create footnotes with (gitbook)[https://www.gitbook.com], it numbers and sorts them in the sequence you created them instead of the order of appearance. Unless you write and insert footnotes from top to bottom, you end up with footnotes that are out of order.

According to ()[https://github.com/GitbookIO/feedback/issues/472], this is a feature, not a bug.

Requirements: node.js

To prepare:

1. connect your gitbook with github.
2. publish your book edits and check if the synchronization to github works
3. clone your github repository

Run:  

`node fixfn.js [filename]`

note: it changes the file in place without backup (assumes we are in a git repository)
