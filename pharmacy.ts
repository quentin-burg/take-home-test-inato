// #####################
// ####### TYPES #######
// #####################
type DrugSpecs<Name> = {
  name: Name;
  expiresIn: number;
  benefit: number;
  benefitStep: number;
};

type Doliprane = DrugSpecs<'Doliprane'>;
type HerbalTea = DrugSpecs<'Herbal Tea'>;
type Fervex = DrugSpecs<'Fervex'>;
type MagicPill = DrugSpecs<'Magic Pill'>;
type Dafalgan = DrugSpecs<'Dafalgan'>;

type Drug = Doliprane | HerbalTea | Fervex | MagicPill | Dafalgan;

type OptsCreation<T extends Drug> = Pick<T, 'expiresIn' | 'benefit'>;

// #####################
// ##### DOLIPRANE #####
// #####################

export const createDoliprane = (
  { expiresIn, benefit }: OptsCreation<Doliprane> = {
    expiresIn: 20,
    benefit: 30,
  }
) => ({ name: 'Doliprane', expiresIn, benefit, benefitStep: -1 } as Doliprane);

const updateDoliprane = (doliprane: Doliprane): Doliprane => {
  if (doliprane.benefit <= 0 || doliprane.benefit > 50)
    return { ...doliprane, expiresIn: doliprane.expiresIn - 1 };
  if (doliprane.expiresIn <= 0)
    return {
      ...doliprane,
      expiresIn: doliprane.expiresIn - 1,
      benefit: doliprane.benefit + 2 * doliprane.benefitStep,
    };
  return {
    ...doliprane,
    benefit: doliprane.benefit + 1 * doliprane.benefitStep,
    expiresIn: doliprane.expiresIn - 1,
  };
};

// ######################
// ##### HERBAL TEA #####
// ######################

export const createHerbalTea = (
  { expiresIn, benefit }: OptsCreation<Doliprane> = {
    expiresIn: 10,
    benefit: 5,
  }
) => ({ name: 'Herbal Tea', expiresIn, benefit, benefitStep: 1 } as HerbalTea);

const updateHerbalTea = (herbalTea: HerbalTea): HerbalTea => {
  if (
    herbalTea.benefit >= 50 ||
    (herbalTea.benefit >= 48 && herbalTea.expiresIn <= 0)
  )
    return { ...herbalTea, expiresIn: herbalTea.expiresIn - 1, benefit: 50 };
  if (herbalTea.expiresIn <= 0) {
    return {
      ...herbalTea,
      expiresIn: herbalTea.expiresIn - 1,
      benefit: herbalTea.benefit + 2 * herbalTea.benefitStep,
    };
  }
  return {
    ...herbalTea,
    benefit: herbalTea.benefit + 1 * herbalTea.benefitStep,
    expiresIn: herbalTea.expiresIn - 1,
  };
};

// ######################
// ####### FERVEX #######
// ######################

export const createFervex = (
  { expiresIn, benefit }: OptsCreation<Doliprane> = {
    expiresIn: 12,
    benefit: 35,
  }
) => ({ name: 'Fervex', expiresIn, benefit, benefitStep: +1 } as Fervex);

const updateFervex = (fervex: Fervex): Fervex => {
  if (fervex.expiresIn <= 0)
    return { ...fervex, expiresIn: fervex.expiresIn - 1, benefit: 0 };
  if (
    fervex.benefit >= 50 ||
    (fervex.benefit >= 47 && fervex.expiresIn <= 5) ||
    (fervex.benefit >= 48 && fervex.expiresIn <= 10)
  )
    return { ...fervex, benefit: 50, expiresIn: fervex.expiresIn - 1 };
  if (fervex.expiresIn <= 10 && fervex.expiresIn > 5)
    return {
      ...fervex,
      expiresIn: fervex.expiresIn - 1,
      benefit: fervex.benefit + 2 * fervex.benefitStep,
    };
  if (fervex.expiresIn <= 5 && fervex.expiresIn > 0)
    return {
      ...fervex,
      expiresIn: fervex.expiresIn - 1,
      benefit: fervex.benefit + 3 * fervex.benefitStep,
    };

  return {
    ...fervex,
    benefit: fervex.benefit + 1 * fervex.benefitStep,
    expiresIn: fervex.expiresIn - 1,
  };
};

// ##########################
// ####### MAGIC PILL #######
// ##########################

export const createMagicPill = (
  { expiresIn, benefit }: OptsCreation<Doliprane> = {
    expiresIn: 15,
    benefit: 40,
  }
) => ({ name: 'Magic Pill', expiresIn, benefit, benefitStep: 0 } as MagicPill);

const updateMagicPill = (magicPill: MagicPill): MagicPill => magicPill;

// ##########################
// ######## DAFALGAN ########
// ##########################

export const createDafalgan = (
  { expiresIn, benefit }: OptsCreation<Doliprane> = {
    expiresIn: 13,
    benefit: 35,
  }
) => ({ name: 'Dafalgan', expiresIn, benefit, benefitStep: -2 } as Dafalgan);

const updateDafalgan = (dafalgan: Dafalgan): Dafalgan => {
  if (
    dafalgan.benefit <= 2 ||
    (dafalgan.benefit <= 4 && dafalgan.expiresIn <= 0)
  )
    return { ...dafalgan, benefit: 0, expiresIn: dafalgan.expiresIn - 1 };
  if (dafalgan.expiresIn <= 0)
    return {
      ...dafalgan,
      expiresIn: dafalgan.expiresIn - 1,
      benefit: dafalgan.benefit + 2 * dafalgan.benefitStep,
    };
  return {
    ...dafalgan,
    expiresIn: dafalgan.expiresIn - 1,
    benefit: dafalgan.benefit + 1 * dafalgan.benefitStep,
  };
};

// ##########################

export const updateBenefitValue = (drug: Drug) => {
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
