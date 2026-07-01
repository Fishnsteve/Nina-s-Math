import { Zone, Question } from '../types/game';

export const ZONES: Zone[] = [
  {
    id: 'zone_1',
    name: { en: 'Factor Forest', zh: '因數森林' },
    topic: 'U1_GCF_LCM',
    description: { en: 'Master prime factorization, GCF, and LCM!', zh: '精通質因數分解、最大公因數與最小公倍數！' },
    icon: 'Trees',
    color: 'from-green-400 to-emerald-600',
    requiredLevel: 1,
  },
  {
    id: 'zone_2',
    name: { en: 'Fraction Castle', zh: '分數城堡' },
    topic: 'U2_Fraction_Division',
    description: { en: 'Conquer fraction division and mixed numbers!', zh: '征服分數除法與帶分數！' },
    icon: 'Castle',
    color: 'from-blue-400 to-indigo-600',
    requiredLevel: 2,
  },
  {
    id: 'zone_3',
    name: { en: 'Algebra Factory', zh: '代數工廠' },
    topic: 'U3_Algebra',
    description: { en: 'Solve equations and find unknown numbers!', zh: '解方程式並找出未知數！' },
    icon: 'Settings',
    color: 'from-orange-400 to-red-600',
    requiredLevel: 4,
  },
  {
    id: 'zone_4',
    name: { en: 'Decimal Ocean', zh: '小數海洋' },
    topic: 'U4_Decimal_Division',
    description: { en: 'Dive deep into decimal division!', zh: '潛入深海學習小數除法！' },
    icon: 'Waves',
    color: 'from-cyan-400 to-blue-600',
    requiredLevel: 6,
  },
  {
    id: 'zone_5',
    name: { en: 'Ratio Kingdom', zh: '比例王國' },
    topic: 'U5_Ratio',
    description: { en: 'Balance ratios and find equivalent proportions!', zh: '平衡比例並找出相等的比例！' },
    icon: 'Scale',
    color: 'from-purple-400 to-fuchsia-600',
    requiredLevel: 8,
  },
  {
    id: 'zone_6',
    name: { en: 'Circle Temple', zh: '圓之神殿' },
    topic: 'U6_Circle_Circumference',
    description: { en: 'Explore the mysteries of Pi and circumference!', zh: '探索圓周率與圓周長的奧秘！' },
    icon: 'CircleDashed',
    color: 'from-pink-400 to-rose-600',
    requiredLevel: 10,
  },
  {
    id: 'zone_7',
    name: { en: 'Area Arena', zh: '面積競技場' },
    topic: 'U7_Circle_Area',
    description: { en: 'Calculate areas of circles and composite figures!', zh: '計算圓形與複合圖形的面積！' },
    icon: 'SquareDashedBottom',
    color: 'from-yellow-400 to-orange-600',
    requiredLevel: 12,
  },
  {
    id: 'zone_8',
    name: { en: 'Speed Highway', zh: '速度公路' },
    topic: 'U8_Speed',
    description: { en: 'Race through speed, distance, and time problems!', zh: '在速率、距離與時間的問題中奔馳！' },
    icon: 'Zap',
    color: 'from-red-400 to-rose-700',
    requiredLevel: 15,
  }
];

export const generateQuestion = (topic: string): Question => {
  const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const id = Math.random().toString(36).substr(2, 9);

  switch (topic) {
    case 'U1_GCF_LCM': {
      const isGCF = Math.random() > 0.5;
      if (isGCF) {
        const a = randInt(2, 10) * randInt(2, 5);
        const b = randInt(2, 10) * randInt(2, 5);
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const ans = gcf(a, b);
        const wrong1 = ans + 1;
        const wrong2 = ans > 1 ? ans - 1 : ans + 2;
        const wrong3 = Math.max(a, b);
        const options = [ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => Math.random() - 0.5);
        return {
          id, topic, difficulty: 'Normal',
          question: { en: `What is the Greatest Common Factor (GCF) of ${a} and ${b}?`, zh: `${a}和${b}的最大公因數(GCF)是多少？` },
          options: { en: options, zh: options },
          correctAnswer: options.indexOf(ans.toString()),
          explanation: { en: `The largest number that divides both ${a} and ${b} without a remainder is ${ans}.`, zh: `能同時整除${a}和${b}的最大的數是${ans}。` }
        };
      } else {
        const a = randInt(2, 6);
        const b = randInt(3, 8);
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const ans = (a * b) / gcf(a, b);
        const wrong1 = a * b;
        const wrong2 = ans * 2;
        const wrong3 = ans + a;
        const options = Array.from(new Set([ans, wrong1, wrong2, wrong3])).map(String);
        while (options.length < 4) options.push(randInt(10, 50).toString());
        const finalOptions = options.slice(0, 4).sort(() => Math.random() - 0.5);
        return {
          id, topic, difficulty: 'Normal',
          question: { en: `Find the Least Common Multiple (LCM) of ${a} and ${b}.`, zh: `找出${a}和${b}的最小公倍數(LCM)。` },
          options: { en: finalOptions, zh: finalOptions },
          correctAnswer: finalOptions.indexOf(ans.toString()),
          explanation: { en: `The smallest number that is a multiple of both ${a} and ${b} is ${ans}.`, zh: `${a}和${b}的最小的公倍數是${ans}。` }
        };
      }
    }
    case 'U2_Fraction_Division': {
      const a = randInt(1, 5);
      const b = randInt(2, 6); // a/b
      const c = randInt(1, 5);
      const d = randInt(2, 6); // c/d
      // (a/b) / (c/d) = (a*d) / (b*c)
      const num = a * d;
      const den = b * c;
      const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
      const common = gcf(num, den);
      const simpNum = num / common;
      const simpDen = den / common;
      const ansStr = simpDen === 1 ? `${simpNum}` : `${simpNum}/${simpDen}`;
      
      const wrong1 = `${b * c}/${a * d}`; // reciprocal
      const wrong2 = `${a * c}/${b * d}`; // multiplied instead
      const wrong3 = `${a * d}/${b * c + 1}`;
      
      const options = [ansStr, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
      return {
        id, topic, difficulty: 'Normal',
        question: { en: `Calculate: ${a}/${b} ÷ ${c}/${d}`, zh: `計算：${a}/${b} ÷ ${c}/${d}` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(ansStr),
        explanation: { en: `To divide fractions, multiply by the reciprocal: ${a}/${b} × ${d}/${c} = ${ansStr}.`, zh: `分數除法等於乘以它的倒數：${a}/${b} × ${d}/${c} = ${ansStr}。` }
      };
    }
    case 'U3_Algebra': {
      const x = randInt(2, 20);
      const add = randInt(1, 15);
      const sum = x + add;
      const ans = x;
      const wrong1 = sum + add;
      const wrong2 = sum;
      const wrong3 = Math.abs(x - add) || x + 2;
      const options = [ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => Math.random() - 0.5);
      return {
        id, topic, difficulty: 'Easy',
        question: { en: `If x + ${add} = ${sum}, what is x?`, zh: `如果 x + ${add} = ${sum}，請問 x 是多少？` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(ans.toString()),
        explanation: { en: `Subtract ${add} from both sides: x = ${sum} - ${add}, so x = ${ans}.`, zh: `等式兩邊減去${add}：x = ${sum} - ${add}，所以 x = ${ans}。` }
      };
    }
    case 'U4_Decimal_Division': {
      const a = randInt(2, 9);
      const b = randInt(2, 9);
      const product = a * b;
      // product / 10 / (a / 10) = b
      const dividend = product / 10;
      const divisor = a / 10;
      const ans = b;
      
      const wrong1 = b / 10;
      const wrong2 = b * 10;
      const wrong3 = b + 1;
      const options = [ans.toString(), wrong1.toString(), wrong2.toString(), wrong3.toString()].sort(() => Math.random() - 0.5);
      return {
        id, topic, difficulty: 'Normal',
        question: { en: `Calculate: ${dividend} ÷ ${divisor}`, zh: `計算：${dividend} ÷ ${divisor}` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(ans.toString()),
        explanation: { en: `Move the decimal point one place to the right for both numbers: ${product} ÷ ${a} = ${ans}.`, zh: `將兩個數字的小數點都向右移動一位：${product} ÷ ${a} = ${ans}。` }
      };
    }
    case 'U5_Ratio': {
      const multiplier = randInt(2, 6);
      const a = randInt(2, 7);
      let b = randInt(2, 7);
      if (a === b) b++;
      const num1 = a * multiplier;
      const num2 = b * multiplier;
      const ans = `${a}:${b}`;
      
      const wrong1 = `${b}:${a}`;
      const wrong2 = `${a * 2}:${b}`;
      const wrong3 = `${a}:${b * 2}`;
      const options = [ans, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
      
      return {
        id, topic, difficulty: 'Easy',
        question: { en: `Simplify the ratio ${num1}:${num2}`, zh: `化簡比例 ${num1}:${num2}` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(ans),
        explanation: { en: `Divide both numbers by their GCF, which is ${multiplier}. ${num1}÷${multiplier} = ${a}, ${num2}÷${multiplier} = ${b}. The simplified ratio is ${ans}.`, zh: `兩數同除以最大公因數${multiplier}。${num1}÷${multiplier} = ${a}，${num2}÷${multiplier} = ${b}。化簡後的比例為 ${ans}。` }
      };
    }
    case 'U6_Circle_Circumference': {
      const diameter = randInt(2, 12) * 2;
      const ans = (3.14 * diameter).toFixed(2);
      
      const wrong1 = (3.14 * (diameter / 2)).toFixed(2); // used radius
      const wrong2 = (3.14 * diameter * diameter / 4).toFixed(2); // used area
      const wrong3 = (3.14 * diameter * 2).toFixed(2);
      
      const options = [`${ans} cm`, `${wrong1} cm`, `${wrong2} cm`, `${wrong3} cm`].sort(() => Math.random() - 0.5);
      
      return {
        id, topic, difficulty: 'Normal',
        question: { en: `If a circle has a diameter of ${diameter}cm, what is its circumference? (Use π ≈ 3.14)`, zh: `一個直徑${diameter}公分的圓，其圓周長是多少？(使用 π ≈ 3.14)` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(`${ans} cm`),
        explanation: { en: `Circumference = π × diameter. 3.14 × ${diameter} = ${ans} cm.`, zh: `圓周長 = π × 直徑。 3.14 × ${diameter} = ${ans} cm。` }
      };
    }
    case 'U7_Circle_Area': {
      const radius = randInt(2, 10);
      const ans = (3.14 * radius * radius).toFixed(2);
      
      const wrong1 = (3.14 * radius * 2).toFixed(2); // circumference instead of area
      const wrong2 = (3.14 * radius * radius * 2).toFixed(2);
      const wrong3 = (3.14 * radius).toFixed(2);
      
      const options = [`${ans} cm²`, `${wrong1} cm²`, `${wrong2} cm²`, `${wrong3} cm²`].sort(() => Math.random() - 0.5);
      
      return {
        id, topic, difficulty: 'Hard',
        question: { en: `What is the area of a circle with a radius of ${radius}cm? (Use π ≈ 3.14)`, zh: `一個半徑${radius}公分的圓，其面積是多少？(使用 π ≈ 3.14)` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(`${ans} cm²`),
        explanation: { en: `Area = π × r². 3.14 × ${radius}² = 3.14 × ${radius * radius} = ${ans} cm².`, zh: `面積 = π × 半徑²。 3.14 × ${radius}² = 3.14 × ${radius * radius} = ${ans} cm²。` }
      };
    }
    case 'U8_Speed': {
      const speed = randInt(4, 12) * 10;
      const hours = randInt(2, 5);
      const distance = speed * hours;
      
      const ans = speed;
      const wrong1 = distance / (hours + 1);
      const wrong2 = distance / (hours - 1);
      const wrong3 = distance * hours;
      
      const options = [`${ans} km/h`, `${wrong1} km/h`, `${wrong2} km/h`, `${wrong3} km/h`].sort(() => Math.random() - 0.5);
      
      return {
        id, topic, difficulty: 'Easy',
        question: { en: `A car travels ${distance} km in ${hours} hours. What is its speed?`, zh: `一輛車在${hours}小時內行駛了${distance}公里。它的速率是多少？` },
        options: { en: options, zh: options },
        correctAnswer: options.indexOf(`${ans} km/h`),
        explanation: { en: `Speed = Distance ÷ Time. ${distance} km ÷ ${hours} hours = ${ans} km/h.`, zh: `速率 = 距離 ÷ 時間。 ${distance} km ÷ ${hours}小時 = ${ans} km/h。` }
      };
    }
    default:
      return QUESTIONS[0]; // fallback
  }
};

export const QUESTIONS: Question[] = [
  // U1
  {
    id: 'q1',
    topic: 'U1_GCF_LCM',
    question: { en: 'What is the Greatest Common Factor (GCF) of 12 and 18?', zh: '12和18的最大公因數(GCF)是多少？' },
    options: { en: ['2', '3', '6', '36'], zh: ['2', '3', '6', '36'] },
    correctAnswer: 2,
    explanation: { en: 'The factors of 12 are 1,2,3,4,6,12. The factors of 18 are 1,2,3,6,9,18. The greatest common factor is 6.', zh: '12的因數有1,2,3,4,6,12。18的因數有1,2,3,6,9,18。最大的公因數是6。' },
    difficulty: 'Easy'
  },
  {
    id: 'q2',
    topic: 'U1_GCF_LCM',
    question: { en: 'Find the Least Common Multiple (LCM) of 4 and 6.', zh: '找出4和6的最小公倍數(LCM)。' },
    options: { en: ['10', '12', '24', '2'], zh: ['10', '12', '24', '2'] },
    correctAnswer: 1,
    explanation: { en: 'Multiples of 4: 4, 8, 12, 16... Multiples of 6: 6, 12, 18... The smallest common multiple is 12.', zh: '4的倍數：4, 8, 12, 16... 6的倍數：6, 12, 18... 最小的公倍數是12。' },
    difficulty: 'Normal'
  },
  // U2
  {
    id: 'q3',
    topic: 'U2_Fraction_Division',
    question: { en: 'Calculate: 1/2 ÷ 1/4', zh: '計算：1/2 ÷ 1/4' },
    options: { en: ['1/8', '2', '1/2', '4'], zh: ['1/8', '2', '1/2', '4'] },
    correctAnswer: 1,
    explanation: { en: 'To divide fractions, multiply by the reciprocal: 1/2 × 4/1 = 4/2 = 2.', zh: '分數除法等於乘以它的倒數：1/2 × 4/1 = 4/2 = 2。' },
    difficulty: 'Normal'
  },
  // U3
  {
    id: 'q4',
    topic: 'U3_Algebra',
    question: { en: 'If x + 5 = 12, what is x?', zh: '如果 x + 5 = 12，請問 x 是多少？' },
    options: { en: ['7', '8', '17', '60'], zh: ['7', '8', '17', '60'] },
    correctAnswer: 0,
    explanation: { en: 'Subtract 5 from both sides: x = 12 - 5, so x = 7.', zh: '等式兩邊減去5：x = 12 - 5，所以 x = 7。' },
    difficulty: 'Easy'
  },
  // U4
  {
    id: 'q5',
    topic: 'U4_Decimal_Division',
    question: { en: 'Calculate: 3.6 ÷ 0.6', zh: '計算：3.6 ÷ 0.6' },
    options: { en: ['0.6', '6', '36', '0.06'], zh: ['0.6', '6', '36', '0.06'] },
    correctAnswer: 1,
    explanation: { en: 'Move the decimal point one place to the right for both numbers: 36 ÷ 6 = 6.', zh: '將兩個數字的小數點都向右移動一位：36 ÷ 6 = 6。' },
    difficulty: 'Normal'
  },
  // U5
  {
    id: 'q6',
    topic: 'U5_Ratio',
    question: { en: 'Simplify the ratio 15:25', zh: '化簡比例 15:25' },
    options: { en: ['3:5', '5:3', '1:2', '15:25'], zh: ['3:5', '5:3', '1:2', '15:25'] },
    correctAnswer: 0,
    explanation: { en: 'Divide both numbers by their GCF, which is 5. 15÷5 = 3, 25÷5 = 5. The simplified ratio is 3:5.', zh: '兩數同除以最大公因數5。15÷5 = 3，25÷5 = 5。化簡後的比例為 3:5。' },
    difficulty: 'Easy'
  },
  // U6
  {
    id: 'q7',
    topic: 'U6_Circle_Circumference',
    question: { en: 'If a circle has a diameter of 10cm, what is its circumference? (Use π ≈ 3.14)', zh: '一個直徑10公分的圓，其圓周長是多少？(使用 π ≈ 3.14)' },
    options: { en: ['15.7 cm', '31.4 cm', '314 cm', '62.8 cm'], zh: ['15.7 cm', '31.4 cm', '314 cm', '62.8 cm'] },
    correctAnswer: 1,
    explanation: { en: 'Circumference = π × diameter. 3.14 × 10 = 31.4 cm.', zh: '圓周長 = π × 直徑。 3.14 × 10 = 31.4 cm。' },
    difficulty: 'Normal'
  },
  // U7
  {
    id: 'q8',
    topic: 'U7_Circle_Area',
    question: { en: 'What is the area of a circle with a radius of 5cm? (Use π ≈ 3.14)', zh: '一個半徑5公分的圓，其面積是多少？(使用 π ≈ 3.14)' },
    options: { en: ['15.7 cm²', '31.4 cm²', '78.5 cm²', '100 cm²'], zh: ['15.7 cm²', '31.4 cm²', '78.5 cm²', '100 cm²'] },
    correctAnswer: 2,
    explanation: { en: 'Area = π × r². 3.14 × 5² = 3.14 × 25 = 78.5 cm².', zh: '面積 = π × 半徑²。 3.14 × 5² = 3.14 × 25 = 78.5 cm²。' },
    difficulty: 'Hard'
  },
  // U8
  {
    id: 'q9',
    topic: 'U8_Speed',
    question: { en: 'A car travels 120 km in 2 hours. What is its speed?', zh: '一輛車在2小時內行駛了120公里。它的速率是多少？' },
    options: { en: ['60 km/h', '120 km/h', '240 km/h', '30 km/h'], zh: ['60 km/h', '120 km/h', '240 km/h', '30 km/h'] },
    correctAnswer: 0,
    explanation: { en: 'Speed = Distance ÷ Time. 120 km ÷ 2 hours = 60 km/h.', zh: '速率 = 距離 ÷ 時間。 120 km ÷ 2小時 = 60 km/h。' },
    difficulty: 'Easy'
  }
];
