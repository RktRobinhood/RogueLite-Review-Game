# AA SL Content Folder

This folder contains topic-specific placeholder files for IB Math AA SL content.

How to add an exam pack:
- Create a JS file that calls `Game.addPack({...})` with `id`, `name`, and `questions`.
- Each question should include `type`, `subject`, `topic`, and `gen` or `data`.

Recommended topics:
- algebra.js
- functions.js
- sequences.js
- geometry.js

When you provide exam files, I'll add them into topic files and register packs.
