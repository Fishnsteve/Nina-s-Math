import fs from 'fs';

const oldCode = fs.readFileSync('src/data/curriculum.ts', 'utf8');

const prefix = oldCode.substring(0, oldCode.indexOf('export const generateQuestion ='));
const suffix = oldCode.substring(oldCode.indexOf('export const QUESTIONS: Question[] = ['));

const newFunc = `export const generateQuestion = (topic: string, forcedDifficulty?: 'Easy' | 'Normal' | 'Hard' | 'Extra'): Question => {
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const id = Math.random().toString(36).substr(2, 9);
  
  let difficultyLevel = forcedDifficulty;
  if (!difficultyLevel) {
    const difficultyRand = Math.random();
    difficultyLevel = difficultyRand > 0.8 ? 'Hard' : (difficultyRand > 0.4 ? 'Normal' : 'Easy');
  }

  switch (topic) {
    case 'U1_GCF_LCM': {
      const isGCF = Math.random() > 0.5;
      if (isGCF) {
        let a, b;
        if (difficultyLevel === 'Easy') {
          a = randInt(2, 5) * randInt(2, 3);
          b = randInt(2, 5) * randInt(2, 3);
        } else if (difficultyLevel === 'Normal') {
          a = randInt(2, 10) * randInt(2, 5);
          b = randInt(2, 10) * randInt(2, 5);
        } else if (difficultyLevel === 'Hard') {
          a = randInt(10, 20) * randInt(2, 5);
          b = randInt(10, 20) * randInt(2, 5);
        } else {
          a = randInt(15, 30) * randInt(3, 8);
          b = randInt(15, 30) * randInt(3, 8);
        }
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const ans = gcf(a, b);
        const wrong1 = ans + 1;
        const wrong2 = ans > 1 ? ans - 1 : ans + 2;
        const wrong3 = Math.max(a, b);
        const options = [ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => Math.random() - 0.5);
        
        const qText = difficultyLevel === 'Extra' 
          ? { en: \`A florist has \${a} roses and \${b} tulips. They want to make identical bouquets without any leftover flowers. What is the greatest number of bouquets they can make?\`, zh: \`花店有\${a}朵玫瑰和\${b}朵鬱金香。他們想要製作相同的花束且不剩下任何花朵。他們最多能製作幾束花？\` }
          : { en: \`What is the Greatest Common Factor (GCF) of \${a} and \${b}?\`, zh: \`\${a}和\${b}的最大公因數(GCF)是多少？\` };
          
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: options, zh: options },
          correctAnswer: options.indexOf(ans.toString()),
          explanation: { en: \`The largest number that divides both \${a} and \${b} without a remainder is \${ans}.\`, zh: \`能同時整除\${a}和\${b}的最大的數是\${ans}。\` }
        };
      } else {
        let a, b;
        if (difficultyLevel === 'Easy') {
          a = randInt(2, 4);
          b = randInt(3, 5);
        } else if (difficultyLevel === 'Normal') {
          a = randInt(4, 8);
          b = randInt(5, 10);
        } else if (difficultyLevel === 'Hard') {
          a = randInt(6, 12);
          b = randInt(8, 15);
        } else {
          a = randInt(10, 18);
          b = randInt(12, 22);
        }
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const lcm = (a * b) / gcf(a, b);
        const ans = lcm;
        const wrong1 = a * b;
        const wrong2 = lcm * 2;
        const wrong3 = lcm + Math.min(a, b);
        const options = Array.from(new Set([ans, wrong1, wrong2, wrong3]));
        while(options.length < 4) options.push(options[0] + 1);
        const finalOpts = options.slice(0,4).map(String).sort(() => Math.random() - 0.5);
        
        const qText = difficultyLevel === 'Extra'
          ? { en: \`Two trains leave the station at the same time. Train A returns every \${a} minutes, and Train B returns every \${b} minutes. How many minutes until they both meet at the station again?\`, zh: \`兩列火車同時離開車站。A列車每\${a}分鐘返回一次，B列車每\${b}分鐘返回一次。需要幾分鐘它們才會再次在車站相遇？\` }
          : { en: \`What is the Least Common Multiple (LCM) of \${a} and \${b}?\`, zh: \`\${a}和\${b}的最小公倍數(LCM)是多少？\` };
          
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: finalOpts, zh: finalOpts },
          correctAnswer: finalOpts.indexOf(ans.toString()),
          explanation: { en: \`The smallest number that is a multiple of both \${a} and \${b} is \${ans}.\`, zh: \`\${a}和\${b}的最小公倍數是\${ans}。\` }
        };
      }
    }
    case 'U2_Fraction_Division': {
      let a, b, c, d;
      if (difficultyLevel === 'Easy') {
        a = randInt(1, 3); b = randInt(2, 4); c = randInt(1, 2); d = randInt(2, 4);
      } else if (difficultyLevel === 'Normal') {
        a = randInt(2, 5); b = randInt(3, 7); c = randInt(1, 4); d = randInt(2, 6);
      } else if (difficultyLevel === 'Hard') {
        a = randInt(3, 8); b = randInt(5, 10); c = randInt(2, 7); d = randInt(3, 9);
      } else {
        a = randInt(5, 12); b = randInt(8, 15); c = randInt(3, 10); d = randInt(4, 12);
      }
      
      const num = a * d;
      const den = b * c;
      const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
      const divisor = gcf(num, den);
      const simpleNum = num / divisor;
      const simpleDen = den / divisor;
      
      const ansStr = simpleDen === 1 ? \`\${simpleNum}\` : \`\${simpleNum}/\${simpleDen}\`;
      const wrong1 = \`\${a*c}/\${b*d}\`; 
      const wrong2 = \`\${b*c}/\${a*d}\`;
      const wrong3 = \`\${simpleNum+1}/\${simpleDen}\`;
      const optionSet = Array.from(new Set([ansStr, wrong1, wrong2, wrong3]));
      while(optionSet.length < 4) optionSet.push(\`\${simpleNum}/\${simpleDen+1}\`);
      const options = optionSet.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const qText = difficultyLevel === 'Extra'
        ? { en: \`A baker has \${a}/\${b} kg of flour and needs to split it into small bags that each hold \${c}/\${d} kg. How many bags can they fill?\`, zh: \`麵包師傅有\${a}/\${b}公斤的麵粉，需要將其分裝成每袋\${c}/\${d}公斤的小袋。他們可以裝滿幾袋？\` }
        : { en: \`Calculate: \${a}/\${b} ÷ \${c}/\${d}\`, zh: \`計算：\${a}/\${b} ÷ \${c}/\${d}\` };
        
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(ansStr),
        explanation: { en: \`Multiply by the reciprocal: \${a}/\${b} × \${d}/\${c} = \${num}/\${den}, which simplifies to \${ansStr}.\`, zh: \`乘以倒數：\${a}/\${b} × \${d}/\${c} = \${num}/\${den}，化簡後為\${ansStr}。\` }
      };
    }
    case 'U3_Algebra': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0 || difficultyLevel === 'Easy') {
        let x = randInt(2, 20);
        let a = randInt(1, 15);
        if (difficultyLevel === 'Hard') { x = randInt(20, 100); a = randInt(15, 50); }
        else if (difficultyLevel === 'Extra') { x = randInt(50, 200); a = randInt(30, 150); }
        
        const sum = x + a;
        const options = [x.toString(), (sum + a).toString(), sum.toString(), Math.abs(x - a).toString() || (x + 2).toString()].sort(() => Math.random() - 0.5);
        
        const qText = difficultyLevel === 'Extra'
          ? { en: \`Sarah had some money in her bank. She deposited $\${a} and now has $\${sum}. How much money did she start with?\`, zh: \`莎拉銀行裡有一些錢。她存入了 \$\${a} 後，現在有 \$\${sum}。她一開始有多少錢？\` }
          : { en: \`If x + \${a} = \${sum}, what is x?\`, zh: \`如果 x + \${a} = \${sum}，請問 x 是多少？\` };
          
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: options, zh: options },
          correctAnswer: options.indexOf(x.toString()),
          explanation: { en: \`Subtract \${a} from both sides: x = \${sum} - \${a}, so x = \${x}.\`, zh: \`等式兩邊減去\${a}：x = \${sum} - \${a}，所以 x = \${x}。\` }
        };
      } else if (type === 1) {
        let x = randInt(2, 12);
        let a = randInt(2, 10);
        if (difficultyLevel === 'Hard') { x = randInt(10, 30); a = randInt(5, 15); }
        else if (difficultyLevel === 'Extra') { x = randInt(15, 50); a = randInt(12, 25); }
        
        const prod = x * a;
        const options = [x.toString(), (x + 2).toString(), (prod / 2).toString(), (prod + a).toString()].sort(() => Math.random() - 0.5);
        
        const qText = difficultyLevel === 'Extra'
          ? { en: \`A factory produces identical boxes. If \${a} boxes weigh a total of \${prod} kg, how much does one box weigh?\`, zh: \`一家工廠生產相同的箱子。如果\${a}個箱子總重\${prod}公斤，一個箱子重多少？\` }
          : { en: \`If \${a}x = \${prod}, what is x?\`, zh: \`如果 \${a}x = \${prod}，請問 x 是多少？\` };
          
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: options, zh: options },
          correctAnswer: options.indexOf(x.toString()),
          explanation: { en: \`Divide both sides by \${a}: x = \${prod} ÷ \${a}, so x = \${x}.\`, zh: \`等式兩邊同除以\${a}：x = \${prod} ÷ \${a}，所以 x = \${x}。\` }
        };
      } else {
        let x = randInt(2, 10);
        let a = randInt(2, 8);
        let b = randInt(1, 10);
        if (difficultyLevel === 'Hard') { x = randInt(5, 20); a = randInt(3, 12); b = randInt(5, 20); }
        else if (difficultyLevel === 'Extra') { x = randInt(10, 30); a = randInt(5, 15); b = randInt(15, 50); }
        
        const sum = (a * x) + b;
        const options = [x.toString(), (x + 1).toString(), (x - 1 || 5).toString(), (x * 2).toString()].sort(() => Math.random() - 0.5);
        
        const qText = difficultyLevel === 'Extra'
          ? { en: \`A taxi charges a flat rate of $\${b} plus $\${a} per mile. If the total fare is $\${sum}, how many miles was the trip?\`, zh: \`計程車收取基本費 \$\${b} 加上每英里 \$\${a}。如果總車費是 \$\${sum}，請問這趟行程是多少英里？\` }
          : { en: \`If \${a}x + \${b} = \${sum}, what is x?\`, zh: \`如果 \${a}x + \${b} = \${sum}，請問 x 是多少？\` };
          
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: options, zh: options },
          correctAnswer: options.indexOf(x.toString()),
          explanation: { en: \`First subtract \${b}: \${a}x = \${sum - b}. Then divide by \${a}: x = \${x}.\`, zh: \`先減去\${b}：\${a}x = \${sum - b}。然後除以\${a}：x = \${x}。\` }
        };
      }
    }
    case 'U4_Decimal_Division': {
      let a, b;
      if (difficultyLevel === 'Easy') {
        a = randInt(2, 5); b = randInt(2, 5);
      } else if (difficultyLevel === 'Normal') {
        a = randInt(2, 9); b = randInt(2, 9);
      } else if (difficultyLevel === 'Hard') {
        a = randInt(5, 15); b = randInt(5, 15);
      } else {
        a = randInt(12, 25); b = randInt(8, 20);
      }
      const product = a * b;
      
      const dividend = product / 10;
      const divisor = a / 10;
      const ans = b;
      
      const wrong1 = b / 10;
      const wrong2 = b * 10;
      const wrong3 = b + 1;
      const options = [ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => Math.random() - 0.5);
      
      const qText = difficultyLevel === 'Extra'
        ? { en: \`A contractor bought \${dividend} meters of copper wire. They need to cut it into pieces that are \${divisor} meters long each. How many pieces can they make?\`, zh: \`承包商買了\${dividend}公尺的銅線。他們需要將其切成每段\${divisor}公尺長的銅線。他們可以切成幾段？\` }
        : { en: \`Calculate: \${dividend} ÷ \${divisor}\`, zh: \`計算：\${dividend} ÷ \${divisor}\` };
        
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(ans.toString()),
        explanation: { en: \`Move the decimal point one place to the right for both numbers: \${product} ÷ \${a} = \${ans}.\`, zh: \`將兩個數字的小數點都向右移動一位：\${product} ÷ \${a} = \${ans}。\` }
      };
    }
    case 'U5_Ratio': {
      let multiplier, a, b;
      if (difficultyLevel === 'Easy') {
        multiplier = randInt(2, 4); a = randInt(2, 4); b = randInt(2, 4);
      } else if (difficultyLevel === 'Normal') {
        multiplier = randInt(3, 8); a = randInt(2, 7); b = randInt(2, 7);
      } else if (difficultyLevel === 'Hard') {
        multiplier = randInt(5, 15); a = randInt(4, 12); b = randInt(4, 12);
      } else {
        multiplier = randInt(10, 25); a = randInt(8, 18); b = randInt(5, 15);
      }
      
      if (a === b) b++;
      const num1 = a * multiplier;
      const num2 = b * multiplier;
      const ans = \`\${a}:\${b}\`;
      
      const wrong1 = \`\${b}:\${a}\`;
      const wrong2 = \`\${a * 2}:\${b}\`;
      const wrong3 = \`\${a}:\${b * 2}\`;
      const optionSet = Array.from(new Set([ans, wrong1, wrong2, wrong3]));
      while(optionSet.length < 4) optionSet.push(\`\${a+1}:\${b}\`);
      const finalOptions = optionSet.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const qText = difficultyLevel === 'Extra'
        ? { en: \`In a large company, there are \${num1} developers and \${num2} designers. What is the simplified ratio of developers to designers?\`, zh: \`一家大公司裡有\${num1}位開發人員和\${num2}位設計師。開發人員與設計師的化簡比例是多少？\` }
        : { en: \`Simplify the ratio \${num1}:\${num2}\`, zh: \`化簡比例 \${num1}:\${num2}\` };
        
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: finalOptions, zh: finalOptions },
        correctAnswer: finalOptions.indexOf(ans),
        explanation: { en: \`Divide both numbers by their GCF, which is \${multiplier}. \${num1}÷\${multiplier} = \${a}, \${num2}÷\${multiplier} = \${b}. The simplified ratio is \${ans}.\`, zh: \`兩數同除以最大公因數\${multiplier}。\${num1}÷\${multiplier} = \${a}，\${num2}÷\${multiplier} = \${b}。化簡後的比例為 \${ans}。\` }
      };
    }
    case 'U6_Circle_Circumference': {
      let diameter;
      if (difficultyLevel === 'Easy') diameter = randInt(2, 6) * 2;
      else if (difficultyLevel === 'Normal') diameter = randInt(2, 12) * 2;
      else if (difficultyLevel === 'Hard') diameter = randInt(10, 30) * 2;
      else diameter = randInt(25, 60) * 2;
      
      const ans = (3.14 * diameter).toFixed(2);
      
      const wrong1 = (3.14 * (diameter / 2)).toFixed(2); // used radius
      const wrong2 = (3.14 * diameter * diameter / 4).toFixed(2); // used area
      const wrong3 = (3.14 * diameter * 2).toFixed(2);
      
      const options = [\`\${ans}\`, \`\${wrong1}\`, \`\${wrong2}\`, \`\${wrong3}\`].map(v => \`\${v} \${difficultyLevel==='Extra'?'m':'cm'}\`).sort(() => Math.random() - 0.5);
      const correctText = \`\${ans} \${difficultyLevel==='Extra'?'m':'cm'}\`;
      
      const qText = difficultyLevel === 'Extra'
        ? { en: \`A circular race track has a diameter of \${diameter}m. How far does a runner travel in one complete lap? (Use π ≈ 3.14)\`, zh: \`一個圓形跑道的直徑為\${diameter}公尺。跑者跑完完整一圈的距離是多少？(使用 π ≈ 3.14)\` }
        : { en: \`If a circle has a diameter of \${diameter}cm, what is its circumference? (Use π ≈ 3.14)\`, zh: \`一個直徑\${diameter}公分的圓，其圓周長是多少？(使用 π ≈ 3.14)\` };
        
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(correctText),
        explanation: { en: \`Circumference = π × diameter. 3.14 × \${diameter} = \${ans}.\`, zh: \`圓周長 = π × 直徑。 3.14 × \${diameter} = \${ans}。\` }
      };
    }
    case 'U7_Circle_Area': {
      let radius;
      if (difficultyLevel === 'Easy') radius = randInt(2, 5);
      else if (difficultyLevel === 'Normal') radius = randInt(5, 12);
      else if (difficultyLevel === 'Hard') radius = randInt(10, 25);
      else radius = randInt(15, 40);
      
      const ans = (3.14 * radius * radius).toFixed(2);
      
      const wrong1 = (3.14 * radius * 2).toFixed(2); // circumference instead of area
      const wrong2 = (3.14 * radius * radius * 2).toFixed(2);
      const wrong3 = (3.14 * radius).toFixed(2);
      
      const options = [\`\${ans}\`, \`\${wrong1}\`, \`\${wrong2}\`, \`\${wrong3}\`].map(v => \`\${v} \${difficultyLevel==='Extra'?'m²':'cm²'}\`).sort(() => Math.random() - 0.5);
      const correctText = \`\${ans} \${difficultyLevel==='Extra'?'m²':'cm²'}\`;
      
      const qText = difficultyLevel === 'Extra'
        ? { en: \`A city is building a circular park with a radius of \${radius}m. What is the total area of the park? (Use π ≈ 3.14)\`, zh: \`城市正在建造一個半徑為\${radius}公尺的圓形公園。公園的總面積是多少？(使用 π ≈ 3.14)\` }
        : { en: \`What is the area of a circle with a radius of \${radius}cm? (Use π ≈ 3.14)\`, zh: \`一個半徑\${radius}公分的圓，其面積是多少？(使用 π ≈ 3.14)\` };
        
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(correctText),
        explanation: { en: \`Area = π × r². 3.14 × \${radius}² = 3.14 × \${radius * radius} = \${ans}.\`, zh: \`面積 = π × 半徑²。 3.14 × \${radius}² = 3.14 × \${radius * radius} = \${ans}。\` }
      };
    }
    case 'U8_Speed': {
      let speed, hours;
      if (difficultyLevel === 'Easy') { speed = randInt(4, 8) * 10; hours = randInt(2, 4); }
      else if (difficultyLevel === 'Normal') { speed = randInt(5, 12) * 10; hours = randInt(2, 6); }
      else if (difficultyLevel === 'Hard') { speed = randInt(8, 20) * 5; hours = randInt(3, 8); }
      else { speed = randInt(15, 30) * 10; hours = randInt(4, 12); }
      
      const distance = speed * hours;
      
      const ans = speed;
      const wrong1 = Math.floor(distance / (hours + 1));
      const wrong2 = Math.floor(distance / (hours - 1)) || speed + 10;
      const wrong3 = distance * hours;
      
      const options = [\`\${ans} km/h\`, \`\${wrong1} km/h\`, \`\${wrong2} km/h\`, \`\${wrong3} km/h\`].sort(() => Math.random() - 0.5);
      
      const qText = difficultyLevel === 'Extra'
        ? { en: \`A commercial airplane flies a total distance of \${distance} km across the ocean. If the flight took \${hours} hours without stopping, what was the average speed of the airplane?\`, zh: \`一架商用客機飛越海洋，總距離為\${distance}公里。如果這趟飛行中途不停留花了\${hours}小時，請問這架飛機的平均速率是多少？\` }
        : { en: \`A car travels \${distance} km in \${hours} hours. What is its speed?\`, zh: \`一輛車在\${hours}小時內行駛了\${distance}公里。它的速率是多少？\` };
        
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(\`\${ans} km/h\`),
        explanation: { en: \`Speed = Distance ÷ Time. \${distance} km ÷ \${hours} hours = \${ans} km/h.\`, zh: \`速率 = 距離 ÷ 時間。 \${distance} km ÷ \${hours}小時 = \${ans} km/h。\` }
      };
    }
    default:
      return QUESTIONS[0]; // fallback
  }
};
`;

fs.writeFileSync('src/data/curriculum.ts', prefix + newFunc + suffix);

