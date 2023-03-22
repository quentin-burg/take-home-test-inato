import fs from 'fs';

// TODO refacto types
type Doliprane = {
  name: 'Doliprane';
  expiresIn: number;
  benefit: number;
};

type HerbalTea = {
  name: 'Herbal Tea';
  expiresIn: number;
  benefit: number;
};

type Fervex = {
  name: 'Fervex';
  expiresIn: number;
  benefit: number;
};

type MagicPill = {
  name: 'Magic Pill';
  expiresIn: number;
  benefit: number;
};

type Dafalgan = {
  name: 'Dafalgan';
  expiresIn: number;
  benefit: number;
};

type Drug = Doliprane | HerbalTea | Fervex | MagicPill | Dafalgan;

export const createDoliprane = () =>
  ({ name: 'Doliprane', expiresIn: 20, benefit: 30 } as Doliprane);
export const createHerbalTea = () =>
  ({ name: 'Herbal Tea', expiresIn: 10, benefit: 5 } as HerbalTea);
export const createFervex = () =>
  ({ name: 'Fervex', expiresIn: 12, benefit: 35 } as Fervex);
export const createMagicPill = () =>
  ({ name: 'Magic Pill', expiresIn: 15, benefit: 40 } as MagicPill);
export const createDafalgan = () =>
  ({ name: 'Dafalgan', expiresIn: 13, benefit: 35 } as Dafalgan);

const updateDoliprane = (doliprane: Doliprane): Drug => {
  if (doliprane.benefit <= 0 || doliprane.benefit >= 50)
    return { ...doliprane, expiresIn: doliprane.expiresIn - 1 };
  return {
    ...doliprane,
    benefit: doliprane.benefit - 1,
    expiresIn: doliprane.expiresIn - 1,
  };
};

const updateHerbalTea = (herbalTea: HerbalTea): Drug => {
  if (herbalTea.benefit >= 50)
    return { ...herbalTea, expiresIn: herbalTea.expiresIn - 1 };
  if (herbalTea.expiresIn <= 0) {
    return {
      ...herbalTea,
      expiresIn: herbalTea.expiresIn - 1,
      benefit: herbalTea.benefit + 2,
    };
  }
  return {
    ...herbalTea,
    benefit: herbalTea.benefit + 1,
    expiresIn: herbalTea.expiresIn - 1,
  };
};

const updateFervex = (fervex: Fervex): Drug => {
  if (fervex.expiresIn <= 0)
    return { ...fervex, expiresIn: fervex.expiresIn - 1, benefit: 0 };
  if (fervex.benefit >= 50)
    return { ...fervex, expiresIn: fervex.expiresIn - 1 };
  if (fervex.expiresIn <= 10 && fervex.expiresIn > 5)
    return {
      ...fervex,
      expiresIn: fervex.expiresIn - 1,
      benefit: fervex.benefit + 2,
    };
  if (fervex.expiresIn <= 5 && fervex.expiresIn > 0)
    return {
      ...fervex,
      expiresIn: fervex.expiresIn - 1,
      benefit: fervex.benefit + 3,
    };

  return {
    ...fervex,
    benefit: fervex.benefit + 1,
    expiresIn: fervex.expiresIn - 1,
  };
};

const updateMagicPill = (magicPill: MagicPill): Drug => magicPill;

const updateDafalgan = (dafalgan: Dafalgan): Drug => {
  if (dafalgan.benefit <= 0)
    return { ...dafalgan, expiresIn: dafalgan.expiresIn - 1 };
  return {
    ...dafalgan,
    expiresIn: dafalgan.expiresIn - 1,
    benefit: dafalgan.benefit - 2,
  };
};

// 20min

const updateBenefitValue = (drug: Drug) => {
  switch (drug.name) {
    case 'Doliprane':
      return updateDoliprane(drug);
    case 'Herbal Tea':
      return updateHerbalTea(drug);
    case 'Fervex':
      return updateFervex(drug);
    case 'Magic Pill':
      return updateMagicPill(drug);
    case 'Dafalgan':
      return updateDafalgan(drug);
  }
};

export const updateDrugs = (drugs: Drug[]) => {
  return drugs.map(d => updateBenefitValue(d));
};

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
  'new-output.json',
  JSON.stringify({ result: log }, null, 2).concat('\n'),
  err => {
    if (err) {
      console.log('error');
    } else {
      console.log('success');
    }
  }
);
