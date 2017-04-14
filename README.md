# fixfn.js

Fixes footnote ordering in GitBook.

`node fixfn.js filename [writefile]`

## The Problem

If you create footnotes in [GitBook](https://www.gitbook.com), they number them in the sequence you created your footnotes, not of the order of appearance. Unless you strictly write your text and insert footnotes from top to bottom, you end up with footnote numbers that are out of order.

Example: say you insert a footnote on before the other ones. What you get is:

My text where the footnotes are ordered[3] like[1] this[2].

And your footnotes:

[1] First footnote I inserted.    
[2] Second one.    
[3] Third footnote I entered.    

According to [gitbook](https://github.com/GitbookIO/feedback/issues/472), this is a feature, not a bug.

What you want:

My text where the footnotes are ordered[1] like[2] this[3].

And your footnotes:

[1] Third footnote I entered.     
[2] First footnote I inserted.        
[3] Second one.        

## How to Use

Requirements: [node.js](https://nodejs.org/)

To prepare:

1. Connect your GitBook with GitHub.
2. Publish your book edits and check if the synchronization to GitHub works in your GitBook settings(!).
3. Head over to your GitHub repository and clone.

4. Run:  

`node fixfn.js filename [writefile]`

on the file(s) you want to fix.

5. Add, commit and push.
6. Check if sync back to GitBook worked.

Note: if you omit writefile, it will change your file in place without backup. This assumes you are using it within a git repository, so you can easily rollback if something goes wrong.
It also assumes you have the footnotes at the end of the file and use the standard numbering 1, 2, 3 ... like what comes out of the GitBook web editor. It will probably do nasty things if you have manually edited your MarkDown file like adding things at the end etc.

A quick fix that works for me but has not properly tested. Use at your own risk.
