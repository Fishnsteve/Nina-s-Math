const fs = require('fs');
let code = fs.readFileSync('src/data/curriculum.ts', 'utf8');

code = code.replace(
  `export const generateQuestion = (topic: string): Question => {`,
  `export const generateQuestion = (topic: string, forcedDifficulty?: 'Easy' | 'Normal' | 'Hard' | 'Extra'): Question => {`
);

code = code.replace(
  `const difficultyLevel = difficultyRand > 0.8 ? 'Hard' : (difficultyRand > 0.4 ? 'Normal' : 'Easy');`,
  `const difficultyLevel = forcedDifficulty || (difficultyRand > 0.8 ? 'Hard' : (difficultyRand > 0.4 ? 'Normal' : 'Easy'));`
);

// U1 GCF (Easy/Normal/Hard) -> Add Extra
code = code.replace(
  /\} else \{\n\s+a = randInt\(10, 20\) \* randInt\(2, 5\);\n\s+b = randInt\(10, 20\) \* randInt\(2, 5\);\n\s+\}/g,
  `} else if (difficultyLevel === 'Hard') {\n          a = randInt(10, 20) * randInt(2, 5);\n          b = randInt(10, 20) * randInt(2, 5);\n        } else {\n          a = randInt(15, 30) * randInt(3, 8);\n          b = randInt(15, 30) * randInt(3, 8);\n        }`
);

code = code.replace(
  /\} else \{\n\s+a = randInt\(6, 12\);\n\s+b = randInt\(8, 15\);\n\s+\}/g,
  `} else if (difficultyLevel === 'Hard') {\n          a = randInt(6, 12);\n          b = randInt(8, 15);\n        } else {\n          a = randInt(12, 20);\n          b = randInt(15, 25);\n        }`
);

// We need to inject the "Extra" case story wrappers where possible, or just scale numbers up. But user requested "complex real life questions".
