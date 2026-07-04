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
    type: 'training'
  },
  {
    id: 'zone_2',
    name: { en: 'Fraction Castle', zh: '分數城堡' },
    topic: 'U2_Fraction_Division',
    description: { en: 'Conquer fraction division and mixed numbers!', zh: '征服分數除法與帶分數！' },
    icon: 'Castle',
    color: 'from-blue-400 to-indigo-600',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'zone_3',
    name: { en: 'Algebra Factory', zh: '代數工廠' },
    topic: 'U3_Algebra',
    description: { en: 'Solve equations and find unknown numbers!', zh: '解方程式並找出未知數！' },
    icon: 'Settings',
    color: 'from-orange-400 to-red-600',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'zone_4',
    name: { en: 'Decimal Ocean', zh: '小數海洋' },
    topic: 'U4_Decimal_Division',
    description: { en: 'Dive deep into decimal division!', zh: '潛入深海學習小數除法！' },
    icon: 'Waves',
    color: 'from-cyan-400 to-blue-600',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'zone_5',
    name: { en: 'Ratio Peak', zh: '比例山峰' },
    topic: 'U5_Ratio',
    description: { en: 'Balance ratios and find equivalent proportions!', zh: '平衡比例並找出相等的比例！' },
    icon: 'Scale',
    color: 'from-purple-400 to-fuchsia-600',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'zone_6',
    name: { en: 'Circle Temple', zh: '圓之神殿' },
    topic: 'U6_Circle_Circumference',
    description: { en: 'Explore the mysteries of Pi and circumference!', zh: '探索圓周率與圓周長的奧秘！' },
    icon: 'CircleDashed',
    color: 'from-pink-400 to-rose-600',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'zone_7',
    name: { en: 'Area Arena', zh: '面積競技場' },
    topic: 'U7_Circle_Area',
    description: { en: 'Calculate areas of circles and composite figures!', zh: '計算圓形與複合圖形的面積！' },
    icon: 'SquareDashedBottom',
    color: 'from-yellow-400 to-orange-600',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'zone_8',
    name: { en: 'Speed Highway', zh: '速度公路' },
    topic: 'U8_Speed',
    description: { en: 'Race through speed, distance, and time problems!', zh: '在速率、距離與時間的問題中奔馳！' },
    icon: 'Zap',
    color: 'from-red-400 to-rose-700',
    requiredLevel: 1,
    type: 'training'
  },
  {
    id: 'kingdom_1',
    name: { en: 'Star Kingdom: Number Sense', zh: '星辰王國：數感' },
    topic: ['U1_GCF_LCM', 'U2_Fraction_Division', 'U4_Decimal_Division'],
    description: { en: 'Test your mastery of numbers! Rewards gems and coins.', zh: '測試你對數字的掌握度！獎勵寶石與金幣。' },
    icon: 'Star',
    color: 'from-amber-300 to-yellow-600',
    requiredLevel: 3,
    type: 'kingdom'
  },
  {
    id: 'kingdom_2',
    name: { en: 'Star Kingdom: Logic & Algebra', zh: '星辰王國：邏輯與代數' },
    topic: ['U3_Algebra', 'U5_Ratio'],
    description: { en: 'A kingdom of balance and logic. Prove your skills!', zh: '平衡與邏輯的王國。證明你的實力！' },
    icon: 'Star',
    color: 'from-orange-400 to-red-600',
    requiredLevel: 6,
    type: 'kingdom'
  },
  {
    id: 'kingdom_3',
    name: { en: 'Star Kingdom: Geometry & Motion', zh: '星辰王國：幾何與運動' },
    topic: ['U6_Circle_Circumference', 'U7_Circle_Area', 'U8_Speed'],
    description: { en: 'The ultimate kingdom of shapes and speed!', zh: '形狀與速度的終極王國！' },
    icon: 'Star',
    color: 'from-purple-400 to-indigo-600',
    requiredLevel: 9,
    type: 'kingdom'
  },
  {
    id: 'hell_1',
    name: { en: 'The Infernal Gateway: Ultimate Trial', zh: '地獄之門：終極試煉' },
    topic: ['U1_GCF_LCM', 'U2_Fraction_Division', 'U3_Algebra', 'U4_Decimal_Division', 'U5_Ratio', 'U6_Circle_Circumference', 'U7_Circle_Area', 'U8_Speed'],
    description: { en: '10 QUESTIONS • NO MULTIPLE CHOICE! Solve the ultimate challenges with units. Reward: 1,000 Coins!', zh: '10 道極限挑戰 • 無單選題！填空輸入答案與單位。通關獎勵：1000金幣！' },
    icon: 'Skull',
    color: 'from-red-600 via-rose-950 to-slate-950',
    requiredLevel: 5,
    type: 'hell'
  }
];

export const generateQuestion = (topic: string, forcedDifficulty?: 'Easy' | 'Normal' | 'Hard' | 'Extra'): Question => {
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
        
        let ansUnitEn = '';
        let ansUnitZh = '';
        let qText;
        
        if (difficultyLevel === 'Extra') {
          const subType = randInt(1, 3);
          if (subType === 1) {
            ansUnitEn = ' bouquets';
            ansUnitZh = ' 束';
            qText = { 
              en: `A florist has ${a} roses and ${b} tulips. They want to make identical bouquets without any leftover flowers. What is the greatest number of bouquets they can make?`, 
              zh: `花店有 ${a} 朵玫瑰和 ${b} 朵鬱金香。他們想要製作相同的花束且不剩下任何花朵。他們最多能製作幾束花？` 
            };
          } else if (subType === 2) {
            ansUnitEn = ' groups';
            ansUnitZh = ' 隊';
            qText = {
              en: `A dance teacher wants to organize ${a} hip-hop dancers and ${b} ballet dancers into identical groups with the same number of dancers from each style. What is the maximum number of groups they can create?`,
              zh: `舞蹈老師想要將 ${a} 名嘻哈舞者和 ${b} 名芭蕾舞者分成多個完全相同的隊伍，每隊的各舞風人數相同。他們最多可以分成幾隊？`
            };
          } else {
            ansUnitEn = ' packages';
            ansUnitZh = ' 個禮物包';
            qText = {
              en: `Nina is preparing gift packages with ${a} glow sticks and ${b} wristbands. Each package must have the same contents. What is the largest number of packages she can make?`,
              zh: `妮娜正在準備包含 ${a} 支螢光棒和 ${b} 個手環的禮物包。每個禮物包的內容物必須完全相同。她最多可以製作多少個禮物包？`
            };
          }
        } else {
          const wording = randInt(1, 2);
          if (wording === 1) {
            qText = { en: `What is the Greatest Common Factor (GCF) of ${a} and ${b}?`, zh: `${a} 和 ${b} 的最大公因數 (GCF) 是多少？` };
          } else {
            qText = { en: `Find the GCF of ${a} and ${b}.`, zh: `求 ${a} 和 ${b} 的最大公因數。` };
          }
        }
        
        const rawOptions = [ans, wrong1, wrong2, wrong3];
        const uniqueRaw = Array.from(new Set(rawOptions));
        while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
        const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
        
        const optionsEn = shuffled.map(v => v.toString() + ansUnitEn);
        const optionsZh = shuffled.map(v => v.toString() + ansUnitZh);
        
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: optionsEn, zh: optionsZh },
          correctAnswer: shuffled.indexOf(ans),
          explanation: { en: `The largest number that divides both ${a} and ${b} without a remainder is ${ans}.`, zh: `能同時整除 ${a} 和 ${b} 的最大的數是 ${ans}。` }
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
        if (a === b) b++;
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const lcm = (a * b) / gcf(a, b);
        const ans = lcm;
        const wrong1 = a * b;
        const wrong2 = lcm * 2;
        const wrong3 = lcm + Math.min(a, b);
        
        let ansUnitEn = '';
        let ansUnitZh = '';
        let qText;
        
        if (difficultyLevel === 'Extra') {
          const subType = randInt(1, 3);
          if (subType === 1) {
            ansUnitEn = ' minutes';
            ansUnitZh = ' 分鐘';
            qText = {
              en: `Two trains leave the station at the same time. Train A returns every ${a} minutes, and Train B returns every ${b} minutes. How many minutes until they both meet at the station again?`,
              zh: `兩列火車同時離開車站。A列車每 ${a} 分鐘返回一次，B列車每 ${b} 分鐘返回一次。需要幾分鐘它們才會再次在車站相遇？`
            };
          } else if (subType === 2) {
            ansUnitEn = ' seconds';
            ansUnitZh = ' 秒';
            qText = {
              en: `Two stage lights are flashing. Light A flashes every ${a} seconds, and Light B flashes every ${b} seconds. If they just flashed together, how many seconds until they flash at the same time again?`,
              zh: `兩個舞台燈正在閃爍。A燈每 ${a} 秒閃一次，B燈每 ${b} 秒閃一次。如果它們剛剛同時閃爍，需要過幾秒它們才會再次同時閃爍？`
            };
          } else {
            ansUnitEn = ' days';
            ansUnitZh = ' 天';
            qText = {
              en: `A dance academy runs Salsa classes every ${a} days and K-Pop classes every ${b} days. If both classes are held today, in how many days will they both be held on the same day again?`,
              zh: `舞蹈學院每 ${a} 天開設一次薩爾薩課，每 ${b} 天開設一次 K-Pop 課。如果今天兩門課都上，那麼過幾天兩門課才會再次在同一天開設？`
            };
          }
        } else {
          const wording = randInt(1, 2);
          if (wording === 1) {
            qText = { en: `What is the Least Common Multiple (LCM) of ${a} and ${b}?`, zh: `${a} 和 ${b} 的最小公倍數 (LCM) 是多少？` };
          } else {
            qText = { en: `Find the LCM of ${a} and ${b}.`, zh: `找出 ${a} 和 ${b} 的最小公倍數。` };
          }
        }
        
        const rawOptions = [ans, wrong1, wrong2, wrong3];
        const uniqueRaw = Array.from(new Set(rawOptions));
        while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
        const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
        
        const optionsEn = shuffled.map(v => v.toString() + ansUnitEn);
        const optionsZh = shuffled.map(v => v.toString() + ansUnitZh);
        
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: optionsEn, zh: optionsZh },
          correctAnswer: shuffled.indexOf(ans),
          explanation: { en: `The smallest number that is a multiple of both ${a} and ${b} is ${ans}.`, zh: `${a} 和 ${b} 的最小公倍數是 ${ans}。` }
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
      if (b === 0) b = 2;
      if (d === 0) d = 3;
      if (c === 0) c = 1;
      
      const num = a * d;
      const den = b * c;
      const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
      const divisor = gcf(num, den);
      const simpleNum = num / divisor;
      const simpleDen = den / divisor;
      
      const ansStr = simpleDen === 1 ? `${simpleNum}` : `${simpleNum}/${simpleDen}`;
      
      let ansUnitEn = '';
      let ansUnitZh = '';
      let qText;
      
      if (difficultyLevel === 'Extra') {
        const subType = randInt(1, 3);
        if (subType === 1) {
          ansUnitEn = ' bags';
          ansUnitZh = ' 袋';
          qText = { 
            en: `A baker has ${a}/${b} kg of flour and needs to split it into small bags that each hold ${c}/${d} kg. How many bags can they fill?`, 
            zh: `麵包師傅有 ${a}/${b} 公斤的麵粉，需要將其分裝成每袋 ${c}/${d} 公斤的小袋。他們可以裝滿幾袋？` 
          };
        } else if (subType === 2) {
          ansUnitEn = ' hair-ties';
          ansUnitZh = ' 個髮圈';
          qText = {
            en: `A costume designer has ${a}/${b} meters of silk ribbon. If each dance hair-tie requires ${c}/${d} meters of ribbon, how many hair-ties can they make?`,
            zh: `服裝設計師有 ${a}/${b} 公尺的絲帶。如果每個舞蹈髮圈需要 ${c}/${d} 公尺的絲帶，他們可以製作多少個髮圈？`
          };
        } else {
          ansUnitEn = ' m²';
          ansUnitZh = ' m²';
          qText = {
            en: `It takes ${c}/${d} hours to clean 1 square meter of a dance stage. If the crew has been cleaning for ${a}/${b} hours, how many square meters (m²) have they cleaned?`,
            zh: `清理 1 平方公尺的舞台需要 ${c}/${d} 小時。如果清潔人員已經清理了 ${a}/${b} 小時，他們清理了多少平方公尺 (m²)？`
          };
        }
      } else {
        const wording = randInt(1, 2);
        if (wording === 1) {
          qText = { en: `Calculate: ${a}/${b} ÷ ${c}/${d}`, zh: `計算：${a}/${b} ÷ ${c}/${d}` };
        } else {
          qText = { en: `Divide ${a}/${b} by ${c}/${d}.`, zh: `將 ${a}/${b} 除以 ${c}/${d}。` };
        }
      }
      
      const wrong1 = `${a*c}/${b*d}`; 
      const wrong2 = `${b*c}/${a*d}`;
      const wrong3 = `${simpleNum+1}/${simpleDen}`;
      const optionSet = Array.from(new Set([ansStr, wrong1, wrong2, wrong3]));
      while(optionSet.length < 4) optionSet.push(`${simpleNum}/${simpleDen+1}`);
      const shuffled = optionSet.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const optionsEn = shuffled.map(v => v + ansUnitEn);
      const optionsZh = shuffled.map(v => v + ansUnitZh);
      
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: optionsEn, zh: optionsZh },
        correctAnswer: shuffled.indexOf(ansStr),
        explanation: { en: `Multiply by the reciprocal: ${a}/${b} × ${d}/${c} = ${num}/${den}, which simplifies to ${ansStr}.`, zh: `乘以倒數：${a}/${b} × ${d}/${c} = ${num}/${den}，化簡後為 ${ansStr}。` }
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
        let ansUnitEn = '';
        let ansUnitZh = '';
        let qText;
        
        if (difficultyLevel === 'Extra') {
          const subType = randInt(1, 2);
          if (subType === 1) {
            ansUnitEn = ' steps';
            ansUnitZh = ' 步';
            qText = {
              en: `Nina needs to complete ${sum} dance steps today. If she has already performed ${a} steps, how many more steps (x) does she need to do?`,
              zh: `妮娜今天需要完成 ${sum} 個舞蹈步伐。如果她已經跳了 ${a} 步，她還需要跳多少步 (x)？`
            };
          } else {
            ansUnitEn = ' dollars';
            ansUnitZh = ' 元';
            qText = { 
              en: `Sarah had some money in her bank. She deposited $${a} and now has $${sum}. How much money (x) did she start with? (Include currency or dollars)`, 
              zh: `莎拉銀行裡有一些錢。她存入了 $${a} 後，現在有 $${sum}。她一開始有多少錢 (x)？` 
            };
          }
        } else {
          const wording = randInt(1, 2);
          if (wording === 1) {
            qText = { en: `If x + ${a} = ${sum}, what is x?`, zh: `如果 x + ${a} = ${sum}，請問 x 是多少？` };
          } else {
            qText = { en: `Solve for x: x + ${a} = ${sum}`, zh: `求解 x：x + ${a} = ${sum}` };
          }
        }
        
        const rawOptions = [x, sum + a, sum, Math.abs(x - a) || x + 2];
        const uniqueRaw = Array.from(new Set(rawOptions));
        while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
        const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
        
        const optionsEn = shuffled.map(v => {
          if (ansUnitEn === ' dollars') return `$${v}`;
          return v.toString() + ansUnitEn;
        });
        const optionsZh = shuffled.map(v => {
          if (ansUnitZh === ' 元') return `$${v}`;
          return v.toString() + ansUnitZh;
        });
        
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: optionsEn, zh: optionsZh },
          correctAnswer: shuffled.indexOf(x),
          explanation: { en: `Subtract ${a} from both sides: x = ${sum} - ${a}, so x = ${x}.`, zh: `等式兩邊減去 ${a}：x = ${sum} - ${a}，所以 x = ${x}。` }
        };
      } else if (type === 1) {
        let x = randInt(2, 12);
        let a = randInt(2, 10);
        if (difficultyLevel === 'Hard') { x = randInt(10, 30); a = randInt(5, 15); }
        else if (difficultyLevel === 'Extra') { x = randInt(15, 50); a = randInt(12, 25); }
        
        const prod = x * a;
        let ansUnitEn = '';
        let ansUnitZh = '';
        let qText;
        
        if (difficultyLevel === 'Extra') {
          const subType = randInt(1, 2);
          if (subType === 1) {
            ansUnitEn = ' kg';
            ansUnitZh = ' 公斤';
            qText = { 
              en: `A factory produces identical boxes. If ${a} boxes weigh a total of ${prod} kg, how much does one box (x) weigh?`, 
              zh: `一家工廠生產相同的箱子。如果 ${a} 個箱子總重 ${prod} 公斤，一個箱子 (x) 重多少公斤？` 
            };
          } else {
            ansUnitEn = ' dollars';
            ansUnitZh = ' 元';
            qText = {
              en: `A group of friends bought ${a} VIP dance show tickets. If the total cost was $${prod}, how much did each ticket (x) cost?`,
              zh: `一群朋友買了 ${a} 張 VIP 舞展門票。如果總花費是 $${prod}，每張門票 (x) 多少錢？`
            };
          }
        } else {
          const wording = randInt(1, 2);
          if (wording === 1) {
            qText = { en: `If ${a}x = ${prod}, what is x?`, zh: `如果 ${a}x = ${prod}，請問 x 是多少？` };
          } else {
            qText = { en: `Solve for x: ${a}x = ${prod}`, zh: `求解 x：${a}x = ${prod}` };
          }
        }
        
        const rawOptions = [x, x + 2, Math.floor(prod / 2) || x + 4, prod + a];
        const uniqueRaw = Array.from(new Set(rawOptions));
        while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
        const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
        
        const optionsEn = shuffled.map(v => {
          if (ansUnitEn === ' dollars') return `$${v}`;
          return v.toString() + ansUnitEn;
        });
        const optionsZh = shuffled.map(v => {
          if (ansUnitZh === ' 元') return `$${v}`;
          return v.toString() + ansUnitZh;
        });
        
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: optionsEn, zh: optionsZh },
          correctAnswer: shuffled.indexOf(x),
          explanation: { en: `Divide both sides by ${a}: x = ${prod} ÷ ${a}, so x = ${x}.`, zh: `等式兩邊同除以 ${a}：x = ${prod} ÷ ${a}，所以 x = ${x}。` }
        };
      } else {
        let x = randInt(2, 10);
        let a = randInt(2, 8);
        let b = randInt(1, 10);
        if (difficultyLevel === 'Hard') { x = randInt(5, 20); a = randInt(3, 12); b = randInt(5, 20); }
        else if (difficultyLevel === 'Extra') { x = randInt(10, 30); a = randInt(5, 15); b = randInt(15, 50); }
        
        const sum = (a * x) + b;
        let ansUnitEn = '';
        let ansUnitZh = '';
        let qText;
        
        if (difficultyLevel === 'Extra') {
          const subType = randInt(1, 2);
          if (subType === 1) {
            ansUnitEn = ' miles';
            ansUnitZh = ' 英里';
            qText = { 
              en: `A taxi charges a flat rate of $${b} plus $${a} per mile. If the total fare is $${sum}, how many miles (x) was the trip?`, 
              zh: `計程車收取基本費 $${b} 加上每英里 $${a}。如果總車費是 $${sum}，請問這趟行程是多少英里 (x)？` 
            };
          } else {
            ansUnitEn = ' hours';
            ansUnitZh = ' 小時';
            qText = {
              en: `Renting a dance studio costs a flat reservation fee of $${b} plus $${a} per hour. If Steven paid $${sum} in total, for how many hours (x) did he rent the studio?`,
              zh: `租用舞蹈教室需要固定預約費 $${b} 加上每小時 $${a}。如果史蒂芬總共支付了 $${sum}，他租了多少小時 (x)？`
            };
          }
        } else {
          const wording = randInt(1, 2);
          if (wording === 1) {
            qText = { en: `If ${a}x + ${b} = ${sum}, what is x?`, zh: `如果 ${a}x + ${b} = ${sum}，請問 x 是多少？` };
          } else {
            qText = { en: `Solve for x: ${a}x + ${b} = ${sum}`, zh: `求解 x：${a}x + ${b} = ${sum}` };
          }
        }
        
        const rawOptions = [x, x + 1, x - 1 || 5, x * 2];
        const uniqueRaw = Array.from(new Set(rawOptions));
        while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
        const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
        
        const optionsEn = shuffled.map(v => v.toString() + ansUnitEn);
        const optionsZh = shuffled.map(v => v.toString() + ansUnitZh);
        
        return {
          id, topic, difficulty: difficultyLevel,
          question: qText,
          options: { en: optionsEn, zh: optionsZh },
          correctAnswer: shuffled.indexOf(x),
          explanation: { en: `First subtract ${b}: ${a}x = ${sum - b}. Then divide by ${a}: x = ${x}.`, zh: `先減去 ${b}：${a}x = ${sum - b}。然後除以 ${a}：x = ${x}。` }
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
      
      let ansUnitEn = '';
      let ansUnitZh = '';
      let qText;
      
      if (difficultyLevel === 'Extra') {
        const subType = randInt(1, 3);
        if (subType === 1) {
          ansUnitEn = ' pieces';
          ansUnitZh = ' 段';
          qText = { 
            en: `A contractor bought ${dividend} meters of copper wire. They need to cut it into pieces that are ${divisor} meters long each. How many pieces can they make?`, 
            zh: `承包商買了 ${dividend} 公尺的銅線。他們需要將其切成每段 ${divisor} 公尺長的銅線。他們可以切成幾段？` 
          };
        } else if (subType === 2) {
          ansUnitEn = ' cups';
          ansUnitZh = ' 杯';
          qText = {
            en: `A dance studio manager bought ${dividend} liters of electrolyte water for the team. If each cup holds ${divisor} liters, how many cups can they fill?`,
            zh: `舞蹈教室經理為隊伍買了 ${dividend} 公升的電解質水。如果每個杯子可裝 ${divisor} 公升，他們可以裝滿幾杯？`
          };
        } else {
          ansUnitEn = ' laps';
          ansUnitZh = ' 圈';
          qText = {
            en: `A runner travels a total distance of ${dividend} km on a short track. If one lap around the track is ${divisor} km, how many laps did they run?`,
            zh: `跑者在短跑道上共跑了 ${dividend} 公里。如果跑道一圈是 ${divisor} 公里，他們跑了幾圈？`
          };
        }
      } else {
        const wording = randInt(1, 2);
        if (wording === 1) {
          qText = { en: `Calculate: ${dividend} ÷ ${divisor}`, zh: `計算：${dividend} ÷ ${divisor}` };
        } else {
          qText = { en: `Divide ${dividend} by ${divisor}.`, zh: `將 ${dividend} 除以 ${divisor}。` };
        }
      }
      
      const wrong1 = b / 10;
      const wrong2 = b * 10;
      const wrong3 = b + 1;
      const rawOptions = [ans, wrong1, wrong2, wrong3];
      const uniqueRaw = Array.from(new Set(rawOptions));
      while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
      const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const optionsEn = shuffled.map(v => v.toString() + ansUnitEn);
      const optionsZh = shuffled.map(v => v.toString() + ansUnitZh);
      
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: optionsEn, zh: optionsZh },
        correctAnswer: shuffled.indexOf(ans),
        explanation: { en: `Move the decimal point one place to the right for both numbers: ${product} ÷ ${a} = ${ans}.`, zh: `將兩個數字的小數點都向右移動一位：${product} ÷ ${a} = ${ans}。` }
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
      
      const calcGcf = (x: number, y: number): number => y === 0 ? x : calcGcf(y, x % y);
      const commonFactor = calcGcf(a, b);
      const simpleA = a / commonFactor;
      const simpleB = b / commonFactor;
      const totalMultiplier = commonFactor * multiplier;
      
      const ans = `${simpleA}:${simpleB}`;
      
      const wrong1 = `${simpleB}:${simpleA}`;
      const wrong2 = `${simpleA * 2}:${simpleB}`;
      const wrong3 = `${simpleA}:${simpleB * 2}`;
      const optionSet = Array.from(new Set([ans, wrong1, wrong2, wrong3]));
      while(optionSet.length < 4) optionSet.push(`${simpleA+1}:${simpleB}`);
      const finalOptions = optionSet.slice(0, 4).sort(() => Math.random() - 0.5);
      
      let qText;
      if (difficultyLevel === 'Extra') {
        const subType = randInt(1, 3);
        if (subType === 1) {
          qText = { 
            en: `In a large company, there are ${num1} developers and ${num2} designers. What is the simplified ratio of developers to designers?`, 
            zh: `一家大公司裡有 ${num1} 位開發人員和 ${num2} 位設計師。開發人員與設計師的化簡比例是多少？` 
          };
        } else if (subType === 2) {
          qText = {
            en: `In a song mix, there are ${num1} fast beats and ${num2} slow beats. What is the simplified ratio of fast beats to slow beats?`,
            zh: `在一段混音中，有 ${num1} 個快節拍和 ${num2} 個慢節拍。快節拍與慢節拍的簡化比例是多少？`
          };
        } else {
          qText = {
            en: `A designer uses ${num1} meters of blue fabric and ${num2} meters of pink fabric for dance costumes. What is the simplified ratio of blue to pink fabric?`,
            zh: `設計師在製作舞蹈服裝時使用了 ${num1} 公尺的藍色布料和 ${num2} 公尺的粉色布料。藍色與粉色布料的簡化比例是多少？`
          };
        }
      } else {
        const wording = randInt(1, 2);
        if (wording === 1) {
          qText = { en: `Simplify the ratio ${num1}:${num2}`, zh: `化簡比例 ${num1}:${num2}` };
        } else {
          qText = { en: `Express the ratio ${num1} to ${num2} in its simplest form.`, zh: `將比例 ${num1} 比 ${num2} 化至最簡。` };
        }
      }
      
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: finalOptions, zh: finalOptions },
        correctAnswer: finalOptions.indexOf(ans),
        explanation: { en: `Divide both numbers by their GCF, which is ${totalMultiplier}. ${num1}÷${totalMultiplier} = ${simpleA}, ${num2}÷${totalMultiplier} = ${simpleB}. The simplified ratio is ${ans}.`, zh: `兩數同除以最大公因數 ${totalMultiplier}。${num1}÷${totalMultiplier} = ${simpleA}，${num2}÷${totalMultiplier} = ${simpleB}。化簡後的比例為 ${ans}。` }
      };
    }
    case 'U6_Circle_Circumference': {
      let diameter;
      if (difficultyLevel === 'Easy') diameter = randInt(2, 6) * 2;
      else if (difficultyLevel === 'Normal') diameter = randInt(2, 12) * 2;
      else if (difficultyLevel === 'Hard') diameter = randInt(10, 30) * 2;
      else diameter = randInt(25, 60) * 2;
      
      const piVal = 3.14;
      const ansNum = piVal * diameter;
      const ans = parseFloat(ansNum.toFixed(2)).toString();
      
      const wrong1 = parseFloat((piVal * (diameter / 2)).toFixed(2)).toString(); // used radius
      const wrong2 = parseFloat((piVal * diameter * diameter / 4).toFixed(2)).toString(); // used area
      const wrong3 = parseFloat((piVal * diameter * 2).toFixed(2)).toString();
      
      const unitEn = difficultyLevel === 'Extra' ? ' m' : ' cm';
      const unitZh = difficultyLevel === 'Extra' ? ' 公尺' : ' 公分';
      
      const rawOptions = [ans, wrong1, wrong2, wrong3];
      const uniqueRaw = Array.from(new Set(rawOptions));
      while (uniqueRaw.length < 4) {
        const fallbackVal = parseFloat((parseFloat(uniqueRaw[0]) + uniqueRaw.length * 1.1).toFixed(2)).toString();
        uniqueRaw.push(fallbackVal);
      }
      const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const optionsEn = shuffled.map(v => v + unitEn);
      const optionsZh = shuffled.map(v => v + unitZh);
      
      let qText;
      if (difficultyLevel === 'Extra') {
        const subType = randInt(1, 2);
        if (subType === 1) {
          qText = {
            en: `A circular dance stage has a diameter of ${diameter}m. If we use pi = 3.14, what is the outer perimeter of the stage?`,
            zh: `一個圓形舞台的直徑為 ${diameter}公尺。如果使用 pi = 3.14，請問舞台的外圍周長是多少？`
          };
        } else {
          qText = {
            en: `A circular hoop used in a rhythm dance performance has a diameter of ${diameter}m. If we use pi = 3.14, what is the circumference of the hoop?`,
            zh: `節奏舞蹈表演中使用的圓形環直徑為 ${diameter}公尺。如果使用 pi = 3.14，請問此圓環的周長是多少？`
          };
        }
      } else {
        const wording = randInt(1, 2);
        if (wording === 1) {
          qText = {
            en: `If a circle has a diameter of ${diameter}cm, what is its circumference? (Use pi = 3.14)`,
            zh: `如果一個圓的直徑為 ${diameter}公分，其圓周長是多少？（使用 pi = 3.14）`
          };
        } else {
          qText = {
            en: `Calculate the circumference of a circle with a diameter of ${diameter}cm. (Use pi = 3.14)`,
            zh: `計算直徑為 ${diameter}公分的圓的周長。（使用 pi = 3.14）`
          };
        }
      }
      
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: optionsEn, zh: optionsZh },
        correctAnswer: shuffled.indexOf(ans),
        explanation: {
          en: `Circumference = π × diameter = 3.14 × ${diameter} = ${ans}${unitEn}.`,
          zh: `圓周長 = π × 直徑 = 3.14 × ${diameter} = ${ans}${unitZh}。`
        }
      };
    }
    case 'U7_Circle_Area': {
      let radius;
      if (difficultyLevel === 'Easy') radius = randInt(2, 5);
      else if (difficultyLevel === 'Normal') radius = randInt(5, 12);
      else if (difficultyLevel === 'Hard') radius = randInt(10, 25);
      else radius = randInt(15, 40);
      
      const piVal = 3.14;
      const ansNum = piVal * radius * radius;
      const ans = parseFloat(ansNum.toFixed(2)).toString();
      
      const wrong1 = parseFloat((piVal * radius * 2).toFixed(2)).toString(); // circumference instead of area
      const wrong2 = parseFloat((piVal * radius * radius * 2).toFixed(2)).toString();
      const wrong3 = parseFloat((piVal * radius).toFixed(2)).toString();
      
      const unitEn = difficultyLevel === 'Extra' ? ' m²' : ' cm²';
      const unitZh = difficultyLevel === 'Extra' ? ' m²' : ' cm²';
      
      const rawOptions = [ans, wrong1, wrong2, wrong3];
      const uniqueRaw = Array.from(new Set(rawOptions));
      while (uniqueRaw.length < 4) {
        const fallbackVal = parseFloat((parseFloat(uniqueRaw[0]) + uniqueRaw.length * 2.3).toFixed(2)).toString();
        uniqueRaw.push(fallbackVal);
      }
      const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const optionsEn = shuffled.map(v => v + unitEn);
      const optionsZh = shuffled.map(v => v + unitZh);
      
      let qText;
      if (difficultyLevel === 'Extra') {
        const subType = randInt(1, 2);
        if (subType === 1) {
          qText = {
            en: `A city dance pavilion is a perfect circle with a radius of ${radius}m. If we use pi = 3.14, what is the area of the pavilion floor?`,
            zh: `市區舞蹈廣場是一個半徑為 ${radius}公尺的完美圓形。如果使用 pi = 3.14，請問廣場地面的面積是多少？`
          };
        } else {
          qText = {
            en: `A circular spotlight beam covers a stage with a radius of ${radius}m. If we use pi = 3.14, what is the illuminated area?`,
            zh: `圓形聚光燈光束覆蓋了一個半徑為 ${radius}公尺的舞台。如果使用 pi = 3.14，請問被照亮的面積是多少？`
          };
        }
      } else {
        const wording = randInt(1, 2);
        if (wording === 1) {
          qText = {
            en: `What is the area of a circle with a radius of ${radius}cm? (Use pi = 3.14)`,
            zh: `一個半徑為 ${radius}公分的圓，其面積是多少？（使用 pi = 3.14）`
          };
        } else {
          qText = {
            en: `Calculate the area of a circle with a radius of ${radius}cm. (Use pi = 3.14)`,
            zh: `計算半徑為 ${radius}公分的圓的面積。（使用 pi = 3.14）`
          };
        }
      }
      
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: optionsEn, zh: optionsZh },
        correctAnswer: shuffled.indexOf(ans),
        explanation: {
          en: `Area = π × r² = 3.14 × ${radius}² = 3.14 × ${radius * radius} = ${ans}${unitEn}.`,
          zh: `面積 = π × 半徑² = 3.14 × ${radius}² = 3.14 × ${radius * radius} = ${ans}${unitZh}。`
        }
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
      
      let unitEn = ' km/h';
      let unitZh = ' km/h';
      let qText;
      
      if (difficultyLevel === 'Extra') {
        const subType = randInt(1, 3);
        if (subType === 1) {
          qText = {
            en: `A high-speed train travels ${distance} km across provinces in ${hours} hours without stopping. What is the average speed of the train?`,
            zh: `一列高鐵在 ${hours} 小時內不停站地跨省行駛了 ${distance} 公里。這列高鐵的平均速率是多少？`
          };
        } else if (subType === 2) {
          qText = {
            en: `Nina took a road trip and drove a total distance of ${distance} km to reach the dance arena. If the trip took her ${hours} hours of driving, what was her average speed?`,
            zh: `妮娜進行了一趟公路旅行，開車總共行駛了 ${distance} 公里到達舞蹈競技場。如果這趟行程花了她 ${hours} 小時的駕駛時間，她的平均速率是多少？`
          };
        } else {
          unitEn = ' m/s';
          unitZh = ' m/s';
          // Convert to m/s
          const mSpeed = randInt(5, 25);
          const mDistance = mSpeed * hours * 60; // hours is now minutes
          const mAns = mSpeed;
          
          qText = {
            en: `A professional dancer runs across a giant stage, covering ${mDistance} meters in ${hours * 60} seconds. What was their speed in meters per second (m/s)?`,
            zh: `一位專業舞者跑過巨型舞台，在 ${hours * 60} 秒內跑了 ${mDistance} 公尺。他們的速率是多少公尺每秒 (m/s)？`
          };
          
          const wrong1 = Math.floor(mDistance / hours);
          const wrong2 = Math.floor(mDistance / (hours * 10));
          const wrong3 = mAns + 5;
          const rawOptions = [mAns, wrong1, wrong2, wrong3];
          const uniqueRaw = Array.from(new Set(rawOptions));
          while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
          const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
          
          const optionsEn = shuffled.map(v => v.toString() + unitEn);
          const optionsZh = shuffled.map(v => v.toString() + unitZh);
          
          return {
            id, topic, difficulty: difficultyLevel,
            question: qText,
            options: { en: optionsEn, zh: optionsZh },
            correctAnswer: shuffled.indexOf(mAns),
            explanation: {
              en: `Speed = Distance ÷ Time. ${mDistance} m ÷ ${hours * 60} seconds = ${mAns} m/s.`,
              zh: `速率 = 距離 ÷ 時間。 ${mDistance} 公尺 ÷ ${hours * 60} 秒 = ${mAns} m/s。`
            }
          };
        }
      } else {
        const wording = randInt(1, 2);
        if (wording === 1) {
          qText = { en: `A car travels ${distance} km in ${hours} hours. What is its speed?`, zh: `一輛車在 ${hours} 小時內行駛了 ${distance} 公里。它的速率是多少？` };
        } else {
          qText = { en: `Find the speed of a vehicle that travels a distance of ${distance} km in ${hours} hours.`, zh: `求一輛在 ${hours} 小時內行駛 ${distance} 公里距離的車輛的速率。` };
        }
      }
      
      const wrong1 = Math.floor(distance / (hours + 1));
      const wrong2 = Math.floor(distance / (hours - 1)) || speed + 10;
      const wrong3 = distance * hours;
      
      const rawOptions = [ans, wrong1, wrong2, wrong3];
      const uniqueRaw = Array.from(new Set(rawOptions));
      while (uniqueRaw.length < 4) uniqueRaw.push(uniqueRaw[0] + uniqueRaw.length);
      const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
      
      const optionsEn = shuffled.map(v => v.toString() + unitEn);
      const optionsZh = shuffled.map(v => v.toString() + unitZh);
      
      return {
        id, topic, difficulty: difficultyLevel,
        question: qText,
        options: { en: optionsEn, zh: optionsZh },
        correctAnswer: shuffled.indexOf(ans),
        explanation: { en: `Speed = Distance ÷ Time. ${distance} km ÷ ${hours} hours = ${ans} km/h.`, zh: `速率 = 距離 ÷ 時間。 ${distance} km ÷ ${hours} 小時 = ${ans} km/h。` }
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
