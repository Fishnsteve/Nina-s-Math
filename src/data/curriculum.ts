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
    description: { en: 'The ultimate mathematical trail of terror! Do you dare enter?', zh: '驚悚的終極數理修羅場！你敢踏入嗎？' },
    icon: 'Flame',
    color: 'from-red-950 via-purple-900 to-black',
    requiredLevel: 12,
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

  // Optimized Helper to assemble and shuffle standard options without boilerplates
  const assembleQuestion = (
    qText: { en: string; zh: string },
    ans: any,
    wrongs: any[],
    unitEn: string,
    unitZh: string,
    exp: { en: string; zh: string },
    isCurrency = false
  ): Question => {
    const rawOptions = [ans, ...wrongs];
    const uniqueRaw = Array.from(new Set(rawOptions));
    while (uniqueRaw.length < 4) {
      if (typeof ans === 'number') {
        uniqueRaw.push((uniqueRaw[0] as number) + uniqueRaw.length);
      } else if (ans.toString().includes(':')) {
        uniqueRaw.push(`${uniqueRaw.length}:${uniqueRaw.length + 1}`);
      } else {
        uniqueRaw.push(`${uniqueRaw[0]}/${uniqueRaw.length + 1}`);
      }
    }
    const shuffled = uniqueRaw.slice(0, 4).sort(() => Math.random() - 0.5);
    const optionsEn = shuffled.map(v => isCurrency ? `$${v}` : v.toString() + unitEn);
    const optionsZh = shuffled.map(v => isCurrency ? `$${v}` : v.toString() + unitZh);
    return {
      id,
      topic: topic as any,
      difficulty: difficultyLevel as any,
      question: qText,
      options: { en: optionsEn, zh: optionsZh },
      correctAnswer: shuffled.indexOf(ans),
      explanation: exp
    };
  };

  switch (topic) {
    case 'U1_GCF_LCM': {
      const isGCF = Math.random() > 0.5;
      if (isGCF) {
        let a = 0, b = 0;
        if (difficultyLevel === 'Easy') { a = randInt(2, 5) * randInt(2, 3); b = randInt(2, 5) * randInt(2, 3); }
        else if (difficultyLevel === 'Normal') { a = randInt(2, 10) * randInt(2, 5); b = randInt(2, 10) * randInt(2, 5); }
        else if (difficultyLevel === 'Hard') { a = randInt(10, 20) * randInt(2, 5); b = randInt(10, 20) * randInt(2, 5); }
        else { a = randInt(15, 30) * randInt(3, 8); b = randInt(15, 30) * randInt(3, 8); }
        if (a === b) b += randInt(2, 5);
        
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const ans = gcf(a, b);
        
        const templates = [
          {
            q: { en: `What is the Greatest Common Factor (GCF) of ${a} and ${b}?`, zh: `${a} 和 ${b} 的最大公因數 (GCF) 是多少？` },
            unitEn: '', unitZh: '',
            exp: { en: `The GCF of ${a} and ${b} is ${ans}.`, zh: `${a} 和 ${b} 的最大公因數是 ${ans}。` }
          },
          {
            q: { en: `A florist has ${a} roses and ${b} tulips. They want to make identical bouquets with no leftover flowers. What is the greatest number of bouquets they can make?`, zh: `花店有 ${a} 朵玫瑰和 ${b} 朵鬱金香。他們想要製作相同的花束且不剩下任何花。他們最多能製作幾束花？` },
            unitEn: ' bouquets', unitZh: ' 束',
            exp: { en: `This GCF problem asks for the largest number dividing ${a} and ${b}, which is ${ans}.`, zh: `此最大公因數問題要求整除 ${a} 和 ${b} 的最大數，即 ${ans}。` }
          },
          {
            q: { en: `A dance coach organizes ${a} jazz dancers and ${b} ballet dancers into identical teams. What is the maximum number of teams they can create?`, zh: `舞蹈教練想將 ${a} 名爵士舞者和 ${b} 名芭蕾舞者分成相同的隊伍。他們最多可以分成幾隊？` },
            unitEn: ' teams', unitZh: ' 隊',
            exp: { en: `The GCF of ${a} and ${b} is ${ans}. Maximum teams = ${ans}.`, zh: `${a} 和 ${b} 的最大公因數是 ${ans}。最多可分 ${ans} 隊。` }
          },
          {
            q: { en: `Nina has ${a} glow sticks and ${b} light rings. She wants to create identical dance party packs. What is the largest number of packs she can make?`, zh: `妮娜有 ${a} 支螢光棒和 ${b} 個發光環。她想製作完全相同的舞會禮包。她最多可以製作多少個禮包？` },
            unitEn: ' packs', unitZh: ' 個禮物包',
            exp: { en: `GCF of ${a} and ${b} is ${ans}, meaning she can make ${ans} packs.`, zh: `${a} 和 ${b} 的最大公因數是 ${ans}，表示她最多能製作 ${ans} 個禮物包。` }
          }
        ];
        
        const temp = templates[Math.floor(Math.random() * templates.length)];
        return assembleQuestion(temp.q, ans, [ans + 1, ans > 1 ? ans - 1 : ans + 2, Math.max(a, b)], temp.unitEn, temp.unitZh, temp.exp);
      } else {
        let a = 0, b = 0;
        if (difficultyLevel === 'Easy') { a = randInt(2, 4); b = randInt(3, 5); }
        else if (difficultyLevel === 'Normal') { a = randInt(4, 8); b = randInt(5, 10); }
        else if (difficultyLevel === 'Hard') { a = randInt(6, 12); b = randInt(8, 15); }
        else { a = randInt(10, 18); b = randInt(12, 22); }
        if (a === b) b++;
        
        const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
        const ans = (a * b) / gcf(a, b);
        
        const templates = [
          {
            q: { en: `What is the Least Common Multiple (LCM) of ${a} and ${b}?`, zh: `${a} 和 ${b} 的最小公倍數 (LCM) 是多少？` },
            unitEn: '', unitZh: '',
            exp: { en: `The Least Common Multiple of ${a} and ${b} is ${ans}.`, zh: `${a} 和 ${b} 的最小公倍數是 ${ans}。` }
          },
          {
            q: { en: `Train A returns every ${a} minutes, and Train B returns every ${b} minutes. In how many minutes will they both meet at the station again?`, zh: `A列車每 ${a} 分鐘返回一次，B列車每 ${b} 分鐘返回一次。需要幾分鐘它們才會再次在車站相遇？` },
            unitEn: ' minutes', unitZh: ' 分鐘',
            exp: { en: `This LCM problem asks for the smallest common multiple of ${a} and ${b}, which is ${ans}.`, zh: `此最小公倍數問題要求 ${a} 和 ${b} 的最小公倍數，即 ${ans} 分鐘。` }
          },
          {
            q: { en: `Two stage lights are flashing. Light A flashes every ${a} seconds, and Light B every ${b} seconds. If they just flashed together, in how many seconds will they flash together again?`, zh: `兩個舞台燈正在閃爍。A燈每 ${a} 秒閃一次，B燈每 ${b} 秒閃一次。如果剛同時閃，過幾秒會再次同時閃？` },
            unitEn: ' seconds', unitZh: ' 秒',
            exp: { en: `The LCM of ${a} and ${b} is ${ans}. Lights flash together every ${ans} seconds.`, zh: `${a} 和 ${b} 的最小公倍數是 ${ans}。每 ${ans} 秒同時閃爍。` }
          },
          {
            q: { en: `A dance school runs Salsa classes every ${a} days and Hip-Hop classes every ${b} days. If both meet today, in how many days will they meet on the same day again?`, zh: `舞蹈學校每 ${a} 天上一次薩爾薩，每 ${b} 天上一次嘻哈。如果今天都有課，過幾天會再次在同一天上課？` },
            unitEn: ' days', unitZh: ' 天',
            exp: { en: `LCM of ${a} and ${b} is ${ans}. Classes co-occur in ${ans} days.`, zh: `${a} 和 ${b} 的最小公倍數是 ${ans}。課程將在 ${ans} 天後再次在同一天開設。` }
          }
        ];
        
        const temp = templates[Math.floor(Math.random() * templates.length)];
        return assembleQuestion(temp.q, ans, [a * b, ans * 2, ans + Math.min(a, b)], temp.unitEn, temp.unitZh, temp.exp);
      }
    }
    case 'U2_Fraction_Division': {
      let a = 0, b = 0, c = 0, d = 0;
      if (difficultyLevel === 'Easy') { a = randInt(1, 3); b = randInt(2, 4); c = randInt(1, 2); d = randInt(2, 4); }
      else if (difficultyLevel === 'Normal') { a = randInt(2, 5); b = randInt(3, 7); c = randInt(1, 4); d = randInt(2, 6); }
      else if (difficultyLevel === 'Hard') { a = randInt(3, 8); b = randInt(5, 10); c = randInt(2, 7); d = randInt(3, 9); }
      else { a = randInt(5, 12); b = randInt(8, 15); c = randInt(3, 10); d = randInt(4, 12); }
      if (b === 0) b = 2; if (d === 0) d = 3; if (c === 0) c = 1;
      
      const num = a * d;
      const den = b * c;
      const gcf = (x: number, y: number): number => y === 0 ? x : gcf(y, x % y);
      const divisor = gcf(num, den);
      const simpleNum = num / divisor;
      const simpleDen = den / divisor;
      const ansStr = simpleDen === 1 ? `${simpleNum}` : `${simpleNum}/${simpleDen}`;
      
      const templates = [
        {
          q: { en: `Calculate: ${a}/${b} ÷ ${c}/${d}`, zh: `計算：${a}/${b} ÷ ${c}/${d}` },
          unitEn: '', unitZh: '',
          exp: { en: `Multiply by reciprocal: ${a}/${b} × ${d}/${c} = ${num}/${den} = ${ansStr}.`, zh: `分數除法等於乘以倒數：${a}/${b} × ${d}/${c} = ${num}/${den}，化簡後為 ${ansStr}。` }
        },
        {
          q: { en: `A baker has ${a}/${b} kg of flour and splits it into small bags that each hold ${c}/${d} kg. How many bags can they fill?`, zh: `麵包師有 ${a}/${b} 公斤麵粉，分裝成每袋 ${c}/${d} 公斤。他們可以裝滿幾袋？` },
          unitEn: ' bags', unitZh: ' 袋',
          exp: { en: `Divide flour by bag size: ${a}/${b} ÷ ${c}/${d} = ${ansStr} bags.`, zh: `用總麵粉除以每袋容量：${a}/${b} ÷ ${c}/${d} = ${ansStr} 袋。` }
        },
        {
          q: { en: `A designer has ${a}/${b} meters of silk ribbon. If each dance hair-tie needs ${c}/${d} meters of ribbon, how many hair-ties can they make?`, zh: `設計師有 ${a}/${b} 公尺絲帶。如果每個舞蹈髮圈需要 ${c}/${d} 公尺絲帶，可以製作多少個？` },
          unitEn: ' hair-ties', unitZh: ' 個髮圈',
          exp: { en: `Divide total ribbon by requirements: ${a}/${b} ÷ ${c}/${d} = ${ansStr} hair-ties.`, zh: `絲帶長度除以髮圈所需長度：${a}/${b} ÷ ${c}/${d} = ${ansStr} 個髮圈。` }
        },
        {
          q: { en: `It takes ${c}/${d} hours to clean 1 square meter of a dance stage. If the crew has been cleaning for ${a}/${b} hours, how many square meters (m²) have they cleaned?`, zh: `清理 1 平方公尺舞台需要 ${c}/${d} 小時。如果清潔人員清理了 ${a}/${b} 小時，已清理了多少平方公尺 (m²)？` },
          unitEn: ' m²', unitZh: ' m²',
          exp: { en: `Divide cleaning hours by hourly rate per m²: ${a}/${b} ÷ ${c}/${d} = ${ansStr} m².`, zh: `用總清潔時間除以每平方公尺花費時間：${a}/${b} ÷ ${c}/${d} = ${ansStr} m²。` }
        }
      ];
      
      const temp = templates[Math.floor(Math.random() * templates.length)];
      return assembleQuestion(temp.q, ansStr, [`${a*c}/${b*d}`, `${b*c}/${a*d}`, `${simpleNum+1}/${simpleDen}`], temp.unitEn, temp.unitZh, temp.exp);
    }
    case 'U3_Algebra': {
      const type = Math.floor(Math.random() * 3);
      if (type === 0) {
        let x = randInt(2, 20); let a = randInt(1, 15);
        if (difficultyLevel === 'Hard') { x = randInt(20, 100); a = randInt(15, 50); }
        else if (difficultyLevel === 'Extra') { x = randInt(50, 200); a = randInt(30, 150); }
        const sum = x + a;
        
        const templates = [
          {
            q: { en: `Solve for x: x + ${a} = ${sum}`, zh: `求解 x：x + ${a} = ${sum}` },
            unitEn: '', unitZh: '', isCurrency: false,
            exp: { en: `Subtract ${a} from both sides: x = ${sum} - ${a} = ${x}.`, zh: `等式兩邊減去 ${a}：x = ${sum} - ${a}，所以 x = ${x}。` }
          },
          {
            q: { en: `Nina wants to complete ${sum} dance steps. If she has done ${a} steps, how many more steps (x) does she need to do?`, zh: `妮娜想要跳 ${sum} 步。如果她已經跳了 ${a} 步，她還需要跳多少步 (x)？` },
            unitEn: ' steps', unitZh: ' 步', isCurrency: false,
            exp: { en: `x + ${a} = ${sum}. x = ${sum} - ${a} = ${x}.`, zh: `x + ${a} = ${sum}。x = ${sum} - ${a} = ${x} 步。` }
          },
          {
            q: { en: `Sarah deposited $${a} into her bank account and now has $${sum}. How much money (x) did she start with?`, zh: `莎拉存入 $${a} 後，帳戶現在有 $${sum}。她一開始有多少錢 (x)？` },
            unitEn: ' dollars', unitZh: ' 元', isCurrency: true,
            exp: { en: `x + ${a} = ${sum}. x = ${x}.`, zh: `x + ${a} = ${sum}。x = ${x}。` }
          }
        ];
        
        const temp = templates[Math.floor(Math.random() * templates.length)];
        return assembleQuestion(temp.q, x, [sum + a, sum, Math.abs(x - a) || x + 2], temp.unitEn, temp.unitZh, temp.exp, temp.isCurrency);
      } else if (type === 1) {
        let x = randInt(2, 12); let a = randInt(2, 10);
        if (difficultyLevel === 'Hard') { x = randInt(10, 30); a = randInt(5, 15); }
        else if (difficultyLevel === 'Extra') { x = randInt(15, 50); a = randInt(12, 25); }
        const prod = x * a;
        
        const templates = [
          {
            q: { en: `Solve for x: ${a}x = ${prod}`, zh: `求解 x：${a}x = ${prod}` },
            unitEn: '', unitZh: '', isCurrency: false,
            exp: { en: `Divide both sides by ${a}: x = ${prod} ÷ ${a} = ${x}.`, zh: `等式兩邊同除以 ${a}：x = ${prod} ÷ ${a}，所以 x = ${x}。` }
          },
          {
            q: { en: `If ${a} identical boxes weigh a total of ${prod} kg, how much does one box (x) weigh?`, zh: `如果 ${a} 個相同的箱子總重 ${prod} 公斤，一個箱子 (x) 重多少公斤？` },
            unitEn: ' kg', unitZh: ' 公斤', isCurrency: false,
            exp: { en: `${a}x = ${prod}. x = ${prod} ÷ ${a} = ${x} kg.`, zh: `${a}x = ${prod}。x = ${prod} ÷ ${a} = ${x} 公斤。` }
          },
          {
            q: { en: `A group bought ${a} show tickets for $${prod}. How much did each ticket (x) cost?`, zh: `一組人買了 ${a} 張門票花了 $${prod}。每張門票 (x) 多少錢？` },
            unitEn: ' dollars', unitZh: ' 元', isCurrency: true,
            exp: { en: `${a}x = ${prod}. x = ${prod} ÷ ${a} = ${x}.`, zh: `${a}x = ${prod}。x = ${prod} ÷ ${a} = ${x}。` }
          }
        ];
        
        const temp = templates[Math.floor(Math.random() * templates.length)];
        return assembleQuestion(temp.q, x, [x + 2, Math.floor(prod / 2) || x + 4, prod + a], temp.unitEn, temp.unitZh, temp.exp, temp.isCurrency);
      } else {
        let x = randInt(2, 10); let a = randInt(2, 8); let b = randInt(1, 10);
        if (difficultyLevel === 'Hard') { x = randInt(5, 20); a = randInt(3, 12); b = randInt(5, 20); }
        else if (difficultyLevel === 'Extra') { x = randInt(10, 30); a = randInt(5, 15); b = randInt(15, 50); }
        const sum = (a * x) + b;
        
        const templates = [
          {
            q: { en: `Solve for x: ${a}x + ${b} = ${sum}`, zh: `求解 x：${a}x + ${b} = ${sum}` },
            unitEn: '', unitZh: '',
            exp: { en: `Subtract ${b} first: ${a}x = ${sum - b}. Divide by ${a}: x = ${x}.`, zh: `先減去 ${b}：${a}x = ${sum - b}。然後除以 ${a}：x = ${x}。` }
          },
          {
            q: { en: `A taxi charges a flat rate of $${b} plus $${a} per mile. If the total fare is $${sum}, how many miles (x) was the trip?`, zh: `計程車收取基本費 $${b} 加上每英里 $${a}。如果總車費是 $${sum}，請問這趟行程是多少英里 (x)？` },
            unitEn: ' miles', unitZh: ' 英里',
            exp: { en: `${a}x + ${b} = ${sum}. ${a}x = ${sum - b}. x = ${x} miles.`, zh: `${a}x + ${b} = ${sum}。${a}x = ${sum - b}。x = ${x} 英里。` }
          },
          {
            q: { en: `Renting a dance studio costs a flat fee of $${b} plus $${a} per hour. If Steven paid $${sum} in total, for how many hours (x) did he rent it?`, zh: `租用教室需要固定預約費 $${b} 加上每小時 $${a}。如果史蒂芬共支付了 $${sum}，他租了多少小時 (x)？` },
            unitEn: ' hours', unitZh: ' 小時',
            exp: { en: `${a}x + ${b} = ${sum}. x = ${x} hours.`, zh: `${a}x + ${b} = ${sum}。x = ${x} 小時。` }
          }
        ];
        
        const temp = templates[Math.floor(Math.random() * templates.length)];
        return assembleQuestion(temp.q, x, [x + 1, x - 1 || 5, x * 2], temp.unitEn, temp.unitZh, temp.exp);
      }
    }
    case 'U4_Decimal_Division': {
      let a = 0, b = 0;
      if (difficultyLevel === 'Easy') { a = randInt(2, 5); b = randInt(2, 5); }
      else if (difficultyLevel === 'Normal') { a = randInt(2, 9); b = randInt(2, 9); }
      else if (difficultyLevel === 'Hard') { a = randInt(5, 15); b = randInt(5, 15); }
      else { a = randInt(12, 25); b = randInt(8, 20); }
      const product = a * b;
      const dividend = product / 10;
      const divisor = a / 10;
      const ans = b;
      
      const templates = [
        {
          q: { en: `Calculate: ${dividend} ÷ ${divisor}`, zh: `計算：${dividend} ÷ ${divisor}` },
          unitEn: '', unitZh: '',
          exp: { en: `Shift decimal point one spot to the right: ${product} ÷ ${a} = ${ans}.`, zh: `將兩個數的小數點都向右移一位：${product} ÷ ${a} = ${ans}。` }
        },
        {
          q: { en: `A contractor has ${dividend} meters of copper wire. They cut it into pieces that are ${divisor} meters long each. How many pieces?`, zh: `承包商有 ${dividend} 公尺銅線。他們將其切成每段 ${divisor} 公尺。可以切成幾段？` },
          unitEn: ' pieces', unitZh: ' 段',
          exp: { en: `${dividend} ÷ ${divisor} = ${ans} pieces.`, zh: `${dividend} ÷ ${divisor} = ${ans} 段。` }
        },
        {
          q: { en: `A studio manager bought ${dividend} liters of juice. If each cup holds ${divisor} liters, how many cups can they fill?`, zh: `經理買了 ${dividend} 公升果汁。如果每個杯子可裝 ${divisor} 公升，可以裝滿幾杯？` },
          unitEn: ' cups', unitZh: ' 杯',
          exp: { en: `${dividend} ÷ ${divisor} = ${ans} cups.`, zh: `${dividend} ÷ ${divisor} = ${ans} 杯。` }
        }
      ];
      
      const temp = templates[Math.floor(Math.random() * templates.length)];
      return assembleQuestion(temp.q, ans, [b / 10, b * 10, b + 1], temp.unitEn, temp.unitZh, temp.exp);
    }
    case 'U5_Ratio': {
      let multiplier = 0, a = 0, b = 0;
      if (difficultyLevel === 'Easy') { multiplier = randInt(2, 4); a = randInt(2, 4); b = randInt(2, 4); }
      else if (difficultyLevel === 'Normal') { multiplier = randInt(3, 8); a = randInt(2, 7); b = randInt(2, 7); }
      else if (difficultyLevel === 'Hard') { multiplier = randInt(5, 15); a = randInt(4, 12); b = randInt(4, 12); }
      else { multiplier = randInt(10, 25); a = randInt(8, 18); b = randInt(5, 15); }
      if (a === b) b++;
      
      const num1 = a * multiplier;
      const num2 = b * multiplier;
      const calcGcf = (x: number, y: number): number => y === 0 ? x : calcGcf(y, x % y);
      const commonFactor = calcGcf(a, b);
      const simpleA = a / commonFactor;
      const simpleB = b / commonFactor;
      const totalMultiplier = commonFactor * multiplier;
      const ans = `${simpleA}:${simpleB}`;
      
      const optionSet = Array.from(new Set([ans, `${simpleB}:${simpleA}`, `${simpleA * 2}:${simpleB}`, `${simpleA}:${simpleB * 2}`]));
      while (optionSet.length < 4) optionSet.push(`${simpleA+1}:${simpleB}`);
      const wrongs = optionSet.filter(v => v !== ans);
      
      const templates = [
        {
          q: { en: `Simplify the ratio ${num1}:${num2}`, zh: `化簡比例 ${num1}:${num2}` },
          exp: { en: `Divide both by GCF (${totalMultiplier}): ${num1}÷${totalMultiplier}:${num2}÷${totalMultiplier} = ${ans}.`, zh: `同除以最大公因數 (${totalMultiplier})：${num1}÷${totalMultiplier} : ${num2}÷${totalMultiplier} = ${ans}。` }
        },
        {
          q: { en: `In a company, there are ${num1} developers and ${num2} designers. What is the simplified ratio of developers to designers?`, zh: `公司裡有 ${num1} 位開發人員和 ${num2} 位設計師。開發人員與設計師的化簡比例是多少？` },
          exp: { en: `Ratio is ${num1}:${num2}. Dividing both parts by ${totalMultiplier} yields ${ans}.`, zh: `比例是 ${num1}:${num2}。兩邊同除以 ${totalMultiplier} 得到最簡比 ${ans}。` }
        },
        {
          q: { en: `A song mix has ${num1} fast beats and ${num2} slow beats. What is the simplified ratio of fast to slow beats?`, zh: `混音中有 ${num1} 個快節奏和 ${num2} 個慢節奏。快節奏與慢節奏的簡化比例是多少？` },
          exp: { en: `${num1}:${num2} simplified is ${ans}.`, zh: `${num1}:${num2} 化簡後為 ${ans}。` }
        }
      ];
      
      const temp = templates[Math.floor(Math.random() * templates.length)];
      return assembleQuestion(temp.q, ans, wrongs, '', '', temp.exp);
    }
    case 'U6_Circle_Circumference': {
      let diameter = 0;
      if (difficultyLevel === 'Easy') diameter = randInt(2, 6) * 2;
      else if (difficultyLevel === 'Normal') diameter = randInt(2, 12) * 2;
      else if (difficultyLevel === 'Hard') diameter = randInt(10, 30) * 2;
      else diameter = randInt(25, 60) * 2;
      
      const piVal = 3.14;
      const ansNum = piVal * diameter;
      const ans = parseFloat(ansNum.toFixed(2)).toString();
      const unitEn = difficultyLevel === 'Extra' ? ' m' : ' cm';
      const unitZh = difficultyLevel === 'Extra' ? ' 公尺' : ' 公分';
      
      const wrong1 = parseFloat((piVal * (diameter / 2)).toFixed(2)).toString();
      const wrong2 = parseFloat((piVal * diameter * diameter / 4).toFixed(2)).toString();
      const wrong3 = parseFloat((piVal * diameter * 2).toFixed(2)).toString();
      
      const templates = [
        {
          q: { en: `If a circle has a diameter of ${diameter}${unitEn.trim()}, what is its circumference? (Use pi = 3.14)`, zh: `如果一個圓的直徑為 ${diameter}${unitZh.trim()}，其圓周長是多少？（使用 pi = 3.14）` }
        },
        {
          q: { en: `A circular dance stage has a diameter of ${diameter}${unitEn.trim()}. What is the outer perimeter of the stage? (Use pi = 3.14)`, zh: `一個圓形舞台的直徑為 ${diameter}${unitZh.trim()}。請問舞台的外圍周長是多少？（使用 pi = 3.14）` }
        },
        {
          q: { en: `A circular wheel has a diameter of ${diameter}${unitEn.trim()}. What distance does it cover in one rotation? (Use pi = 3.14)`, zh: `一個圓形車輪的直徑為 ${diameter}${unitZh.trim()}。它完整旋轉一圈的距離是多少？（使用 pi = 3.14）` }
        }
      ];
      
      const temp = templates[Math.floor(Math.random() * templates.length)];
      return assembleQuestion(temp.q, ans, [wrong1, wrong2, wrong3], unitEn, unitZh, {
        en: `Circumference = π × diameter = 3.14 × ${diameter} = ${ans}${unitEn}.`,
        zh: `圓周長 = π × 直徑 = 3.14 × ${diameter} = ${ans}${unitZh}。`
      });
    }
    case 'U7_Circle_Area': {
      let radius = 0;
      if (difficultyLevel === 'Easy') radius = randInt(2, 5);
      else if (difficultyLevel === 'Normal') radius = randInt(5, 12);
      else if (difficultyLevel === 'Hard') radius = randInt(10, 25);
      else radius = randInt(15, 40);
      
      const piVal = 3.14;
      const ansNum = piVal * radius * radius;
      const ans = parseFloat(ansNum.toFixed(2)).toString();
      const unitEn = difficultyLevel === 'Extra' ? ' m²' : ' cm²';
      const unitZh = difficultyLevel === 'Extra' ? ' m²' : ' cm²';
      
      const wrong1 = parseFloat((piVal * radius * 2).toFixed(2)).toString();
      const wrong2 = parseFloat((piVal * radius * radius * 2).toFixed(2)).toString();
      const wrong3 = parseFloat((piVal * radius).toFixed(2)).toString();
      
      const templates = [
        {
          q: { en: `What is the area of a circle with a radius of ${radius}${difficultyLevel === 'Extra' ? 'm' : 'cm'}? (Use pi = 3.14)`, zh: `一個半徑為 ${radius}${difficultyLevel === 'Extra' ? '公尺' : '公分'} 的圓，其面積是多少？（使用 pi = 3.14）` }
        },
        {
          q: { en: `A circular spotlight beam covers a stage with a radius of ${radius}m. What is the illuminated area? (Use pi = 3.14)`, zh: `圓形聚光燈光束覆蓋了一個半徑為 ${radius}公尺的舞台。請問被照亮的面積是多少？（使用 pi = 3.14）` }
        },
        {
          q: { en: `A circular pavilion has a radius of ${radius}m. What is the area of its floor? (Use pi = 3.14)`, zh: `圓形涼亭半徑為 ${radius}公尺。其地面面積是多少？（使用 pi = 3.14）` }
        }
      ];
      
      const temp = templates[Math.floor(Math.random() * templates.length)];
      return assembleQuestion(temp.q, ans, [wrong1, wrong2, wrong3], unitEn, unitZh, {
        en: `Area = π × r² = 3.14 × ${radius}² = ${ans}${unitEn}.`,
        zh: `面積 = π × 半徑² = 3.14 × ${radius}² = ${ans}${unitZh}。`
      });
    }
    case 'U8_Speed': {
      let speed = 0, hours = 0;
      if (difficultyLevel === 'Easy') { speed = randInt(4, 8) * 10; hours = randInt(2, 4); }
      else if (difficultyLevel === 'Normal') { speed = randInt(5, 12) * 10; hours = randInt(2, 6); }
      else if (difficultyLevel === 'Hard') { speed = randInt(8, 20) * 5; hours = randInt(3, 8); }
      else { speed = randInt(15, 30) * 10; hours = randInt(4, 12); }
      
      const distance = speed * hours;
      const ans = speed;
      let unitEn = ' km/h';
      let unitZh = ' km/h';
      
      const isMetersPerSecond = (difficultyLevel === 'Extra' && Math.random() > 0.5);
      if (isMetersPerSecond) {
        unitEn = ' m/s'; unitZh = ' m/s';
        const mSpeed = randInt(5, 25);
        const mDistance = mSpeed * hours * 60;
        const mAns = mSpeed;
        
        const qText = {
          en: `A runner covers ${mDistance} meters on a giant stage in ${hours * 60} seconds. What was their speed in m/s?`,
          zh: `舞者跑過巨型舞台，在 ${hours * 60} 秒內跑了 ${mDistance} 公尺。其速率是多少公尺每秒 (m/s)？`
        };
        return assembleQuestion(qText, mAns, [Math.floor(mDistance / hours), Math.floor(mDistance / (hours * 10)), mAns + 5], unitEn, unitZh, {
          en: `Speed = Distance ÷ Time = ${mDistance} m ÷ ${hours * 60} s = ${mAns} m/s.`,
          zh: `速率 = 距離 ÷ 時間 = ${mDistance} 公尺 ÷ ${hours * 60} 秒 = ${mAns} m/s。`
        });
      } else {
        const templates = [
          {
            q: { en: `A car travels ${distance} km in ${hours} hours. What is its speed?`, zh: `一輛車在 ${hours} 小時內行駛了 ${distance} 公里。它的速率是多少？` }
          },
          {
            q: { en: `A high-speed train travels ${distance} km in ${hours} hours. What is its average speed?`, zh: `一列高鐵在 ${hours} 小時內行駛了 ${distance} 公里。它的平均速率是多少？` }
          },
          {
            q: { en: `Nina drove a total distance of ${distance} km to reach the arena. If the drive took ${hours} hours, what was her average speed?`, zh: `妮娜開車行駛了 ${distance} 公里到達競技場。如果花了 ${hours} 小時，她的平均速率是多少？` }
          }
        ];
        const temp = templates[Math.floor(Math.random() * templates.length)];
        return assembleQuestion(temp.q, ans, [Math.floor(distance / (hours + 1)), Math.floor(distance / (hours - 1)) || speed + 10, distance * hours], unitEn, unitZh, {
          en: `Speed = Distance ÷ Time = ${distance} km ÷ ${hours} hours = ${ans} km/h.`,
          zh: `速率 = 距離 ÷ 時間 = ${distance} 公里 ÷ ${hours} 小時 = ${ans} km/h。`
        });
      }
    }
    default:
      return QUESTIONS[0];
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
