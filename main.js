// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      //console.log('Original DNA: ' + this.dna)  ;
      const randIndex = Math.floor(Math.random()*15);
      //console.log('Random Index selected: ' + randIndex);
      const randBase = this.dna[randIndex];
      let dnaBases = [];
      //console.log('Base originally in position Random Index: ' + randBase);
      if (randBase === 'A') {
        dnaBases = ['C', 'G', 'T'];
      } else if (randBase === 'C') {
        dnaBases = ['A', 'G', 'T'];
      } else if (randBase === 'G') {
        dnaBases = ['A', 'C', 'T'];
      } else if (randBase === 'T') {
        dnaBases = ['A', 'C', 'G'];
      };
      //console.log('dnaBases: ' + dnaBases);
      this.dna[randIndex] = dnaBases[Math.floor(Math.random()*3)]
      //console.log('New base in random index position is now: ' + this.dna[randIndex]);
      //console.log('new DNA: ' + this.dna);
    },
    compareDNA(otherOrg) {
      let similarity = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrg.dna[i]) {
          similarity++;
        };
      };
      let inCommonPercent = (similarity/15)*100
      console.log('Specimen #1 and Specimen #2 have ' + inCommonPercent + '% DNA in common.');
    },
    willLikelySurvive() {
      let dnaArray = this.dna;
      let goodBaseCount = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          goodBaseCount++;
        };
      };
      if (goodBaseCount >= this.dna.length*0.6) {
        return true;
      } else {
        return false;
      };
    },
  };
};

const survivingSpecimen = [];
const idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive() === true) {
    survivingSpecimen.push(newOrg);
  };
};

console.log(survivingSpecimen);
console.log(survivingSpecimen.specimenNum);