import {
  createDafalgan,
  createDoliprane,
  createFervex,
  createHerbalTea,
  createMagicPill,
  updateBenefitValue,
  updateDrugs,
} from '../pharmacy';

describe('Doliprane testing', () => {
  it('should decrease the benefit and expiresIn', () => {
    const doliprane = createDoliprane({ benefit: 10, expiresIn: 10 });
    const dolipraneExpected = createDoliprane({ benefit: 9, expiresIn: 9 });
    expect(updateBenefitValue(doliprane)).toStrictEqual(dolipraneExpected);
  });

  it('should not decrease under 0 point of benefit', () => {
    const doliprane = createDoliprane({ benefit: 0, expiresIn: 10 });
    const dolipraneExpected = createDoliprane({ benefit: 0, expiresIn: 9 });
    expect(updateBenefitValue(doliprane)).toStrictEqual(dolipraneExpected);
  });

  it('should decrease benefit twice after the expiration date', () => {
    const doliprane = createDoliprane({ benefit: 30, expiresIn: -1 });
    const dolipraneExpected = createDoliprane({ benefit: 28, expiresIn: -2 });
    expect(updateBenefitValue(doliprane)).toStrictEqual(dolipraneExpected);
  });
});

describe('Magic pill testing', () => {
  it('should not decrease the benefit and expiresIn', () => {
    const magicPill = createMagicPill();
    const magicPillExpected = createMagicPill();
    expect(updateBenefitValue(magicPill)).toStrictEqual(magicPillExpected);
  });
});

describe('Dafalgan testing', () => {
  it('should degrades in benefit twice as fast as normal drugs', () => {
    const dafalgan = createDafalgan({ benefit: 30, expiresIn: 10 });
    const dafalganExpected = createDafalgan({ benefit: 28, expiresIn: 9 });
    expect(updateBenefitValue(dafalgan)).toStrictEqual(dafalganExpected);
  });

  it('should not decrease under 0', () => {
    const dafalgan = createDafalgan({ benefit: 2, expiresIn: 10 });
    const dafalganExpected = createDafalgan({ benefit: 0, expiresIn: 9 });
    expect(updateBenefitValue(dafalgan)).toStrictEqual(dafalganExpected);
  });

  it('should decrease twice faster after the expiration date', () => {
    const dafalgan = createDafalgan({ benefit: 5, expiresIn: 0 });
    const dafalganExpected = createDafalgan({ benefit: 1, expiresIn: -1 });
    expect(updateBenefitValue(dafalgan)).toStrictEqual(dafalganExpected);
  });

  it('should not decrease under 0 given benefit at 3 and after expiration date', () => {
    const dafalgan = createDafalgan({ benefit: 3, expiresIn: -2 });
    const dafalganExpected = createDafalgan({ benefit: 0, expiresIn: -3 });
    expect(updateBenefitValue(dafalgan)).toStrictEqual(dafalganExpected);
  });
});

describe('Herbal tea testing', () => {
  it('should increase benefit the older it gets', () => {
    const herbalTea = createHerbalTea({ benefit: 40, expiresIn: 12 });
    const herbalTeaExpected = createHerbalTea({ benefit: 41, expiresIn: 11 });
    expect(updateBenefitValue(herbalTea)).toStrictEqual(herbalTeaExpected);
  });

  it('should not benefit never more than 50', () => {
    const herbalTea = createHerbalTea({ benefit: 50, expiresIn: 12 });
    const herbalTeaExpected = createHerbalTea({ benefit: 50, expiresIn: 11 });
    expect(updateBenefitValue(herbalTea)).toStrictEqual(herbalTeaExpected);
  });

  it('should increase benefit twice after the expiration date', () => {
    const herbalTea = createHerbalTea({ benefit: 30, expiresIn: -1 });
    const herbalTeaExpected = createHerbalTea({ benefit: 32, expiresIn: -2 });
    expect(updateBenefitValue(herbalTea)).toStrictEqual(herbalTeaExpected);
  });

  it('should not benefit never more than 50 after the expiration date', () => {
    const herbalTea = createHerbalTea({ benefit: 49, expiresIn: -1 });
    const herbalTeaExpected = createHerbalTea({ benefit: 50, expiresIn: -2 });
    expect(updateBenefitValue(herbalTea)).toStrictEqual(herbalTeaExpected);
  });
});

describe('Fervex testing', () => {
  it('should increase benefit the older it gets', () => {
    const fervex = createFervex({ benefit: 40, expiresIn: 12 });
    const fervexExpected = createFervex({ benefit: 41, expiresIn: 11 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });

  it('should not benefit never more than 50', () => {
    const fervex = createFervex({ benefit: 50, expiresIn: 12 });
    const fervexExpected = createFervex({ benefit: 50, expiresIn: 11 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });

  it('should not benefit never more than 50 given expires in 10 days', () => {
    const fervex = createFervex({ benefit: 49, expiresIn: 10 });
    const fervexExpected = createFervex({ benefit: 50, expiresIn: 9 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });

  it('should not benefit never more than 50 given expires in 5 days', () => {
    const fervex = createFervex({ benefit: 48, expiresIn: 5 });
    const fervexExpected = createFervex({ benefit: 50, expiresIn: 4 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });

  it('should increase benefit by 2 when there are 10 days or less ', () => {
    const fervex = createFervex({ benefit: 40, expiresIn: 10 });
    const fervexExpected = createFervex({ benefit: 42, expiresIn: 9 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });

  it('should increase benefit by 3 when there are 5 days or less', () => {
    const fervex = createFervex({ benefit: 40, expiresIn: 5 });
    const fervexExpected = createFervex({ benefit: 43, expiresIn: 4 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });

  it('should drops benefit to 0 after the expiration date', () => {
    const fervex = createFervex({ benefit: 40, expiresIn: 0 });
    const fervexExpected = createFervex({ benefit: 0, expiresIn: -1 });
    expect(updateBenefitValue(fervex)).toStrictEqual(fervexExpected);
  });
});

describe('Testing updateDrugs function', () => {
  it('should update pharmacy according business rules', () => {
    const pharmacy = [
      createDafalgan({ expiresIn: 10, benefit: 3 }),
      createMagicPill(),
    ];
    expect(updateDrugs(pharmacy)).toStrictEqual([
      createDafalgan({ expiresIn: 9, benefit: 1 }),
      createMagicPill(),
    ]);
  });
});
