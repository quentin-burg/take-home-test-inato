import {
  createDoliprane,
  createHerbalTea,
  createFervex,
  createMagicPill,
  createDafalgan,
  updateDrugs,
} from './pharmacy';

import fs from 'fs';

let pharmacy = [
  createDoliprane(),
  createHerbalTea(),
  createFervex(),
  createMagicPill(),
  createDafalgan(),
];
const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  pharmacy = updateDrugs(pharmacy);
  log.push(JSON.parse(JSON.stringify(pharmacy)));
}

/* eslint-disable no-console */
fs.writeFile(
  'output.json',
  JSON.stringify({ result: log }, null, 2).concat('\n'),
  err => {
    if (err) {
      console.log('error');
    } else {
      console.log('success');
    }
  }
);
