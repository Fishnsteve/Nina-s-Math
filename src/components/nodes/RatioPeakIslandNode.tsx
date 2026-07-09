import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const RatioPeakIslandNode = ({ unlocked, colors, duration = 6 }: any) => (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && <OrbitingOrbs color={colors.orbColor} duration={duration * 2} />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg viewBox="-50 -50 1200 1000" className={cn("w-[220%] h-[220%] max-w-none transition-all duration-700", unlocked ? `drop-shadow-[0_15px_30px_${colors.dropShadow}]` : "grayscale opacity-50")}>
           <g id="islandtower" transform="translate(0, 0)">
              <g id="mountain1-copy-2" transform="translate(29.801418, 138.468605)">
                  <polygon id="Path-37" fill={colors.mountainLight} points="294.574468 194.377877 372.021277 248.963446 332.375887 288.238428"></polygon>
                  <path d="M0,683.65096 L106.950355,453.992166 L198.22695,398.075242 L294.574468,194.377877 L332.836879,288.238428 L453.156028,0 C453.156028,0 546.276596,277.587585 580.851064,300.220626 L809.964539,683.65096 L0,683.65096 Z" id="Path-34" fill={colors.mountainDark}></path>
                  <path d="M477.12766,683.65096 L506.631206,643.044622 L382.624113,585.130665 L303.333333,292.232494 L431.028369,166.419416 L453.156028,0 C453.156028,0 546.276596,277.587585 580.851064,300.220626 L809.964539,683.65096 L477.12766,683.65096 Z" id="Path-34" fill={colors.mountainLight}></path>
                  <path d="M34.1134752,682.985282 L116.170213,591.787442 L199.609929,540.530262 L245.70922,437.350224 L302.87234,291.566816 C302.87234,291.566816 378.014184,539.864584 412.588652,562.497625 L650.921986,682.985282 L34.1134752,682.985282 Z" id="Path-34" fill={colors.mountainMid}></path>
              </g>
              <g id="mountain2-copy-2" transform="translate(13.283688, 223.675345)">
                  <polygon id="Path-41" fill={colors.mountainDark} points="855.06383 1.33135533 713.078014 227.661761 631.48227 478.622239 584.460993 595.781508 831.102969 595.781508"></polygon>
                  <polyline id="Path-42" fill={colors.mountainDark} transform="translate(486.960998, 388.544587) rotate(5.000000) translate(-486.960998, -388.544587) " points="695.049423 153.102868 597.992773 264.6343 514.092064 318.071913 441.255185 364.829824 379.943128 480.601277 278.872572 623.986305 499.359652 597.760546 642.248092 300.704689"></polyline>
                  <polyline id="Path-42" fill={colors.mountainMid} points="730.134752 154.437218 635.631206 264.652295 551.730496 318.089908 478.893617 364.84782 417.58156 480.619272 314.319149 597.778541 536.998085 597.778541 679.886525 300.722684"></polyline>
                  <polygon id="Path-44" fill={colors.mountainLight} points="481.198582 539.864584 539.283688 418.045572 679.886525 287.57275 526.836879 396.078209 470.595745 505.915024 468.29078 587.127698"></polygon>
                  <path d="M469.947839,597.778541 L589.345002,597.778541 L937.394647,597.778541 L837.820179,364.791359 L730.869811,154.437218 L680.621598,287.57275 L528.493938,405.397697 C528.493938,405.397697 456.579044,597.778541 469.947839,597.778541 Z" id="Path-38-Copy" fill={colors.mountainDark}></path>
                  <path d="M693.834732,597.778541 L650.843972,534.539163 L597.368794,330.841798 L794.212766,281.581651 L855.524823,0 L901.624113,198.371943 C901.624113,198.371943 931.897483,374.220811 964.319149,446.669712 C983.880371,490.380885 1057.7078,575.688069 1077.15398,597.778541 L693.834732,597.778541 Z" id="Combined-Shape" fill={colors.mountainLight}></path>
                  <polygon id="Path-38" fill={colors.mountainMid} points="449.851064 597.778541 762.404255 597.778541 681.730496 527.882386 597.829787 331.507476 582.156028 464.643009 542.510638 501.920958"></polygon>
                  <g id="rock-bottom-copy" transform="translate(0.716312, 648.324655)">
                      <path d="M856.676553,-2.77555756e-16 L1083.84888,1.67516308 L1022.87065,281.642632 L938.96829,357.189409 L844.980069,530.50409 L707.892925,264.755705 L560.429524,722.806128 L317.724007,252.312707 L187.94915,359.808843 L2.34062247,-4.67403893e-14 L856.676553,0 Z" id="Combined-Shape" fill={colors.crystalLight}></path>
                      <path d="M0.551930762,3.33066907e-16 L188.756429,360.019476 L141.036518,-1.60982339e-14 L0.551930762,0 Z" id="Combined-Shape" fill={colors.crystalDark}></path>
                      <path d="M243.089576,-2.22044605e-16 L317.912976,253.31752 L561.619853,724.584494 L438.386994,-1.4321877e-14 L243.089576,0 Z" id="Combined-Shape" fill={colors.crystalDark}></path>
                      <path d="M770.853258,5.55111512e-15 L708.210456,265.766081 L845.639146,530.742606 L938.174464,358.24111 L1024.29644,281.771375 L1092.41896,-2.55351296e-15 L770.853258,7.10542736e-15 Z" id="Combined-Shape" fill={colors.crystalDark}></path>
                      <path d="M734.546275,4.6629367e-15 C665.796596,11.959768 590.183849,44.4017679 557.043095,125.499601 C546.479142,151.350363 630.338399,422.486727 630.338399,422.486727 L845.64334,532.745385 L871.174836,-5.55111512e-15 L734.546275,7.10542736e-15 Z" id="Combined-Shape" fill={colors.crystalLight}></path>
                      <path d="M551.283085,8.4043883e-14 L654.155171,432.93248 L723.343476,4.00790512e-14 L551.283085,3.55271368e-14 Z" id="Combined-Shape" fill={colors.crystalDark}></path>
                      <path d="M966.730257,-5.21804822e-15 L939.090655,358.24111 L1046.1027,1.01030295e-14 L966.730257,-7.10542736e-15 Z" id="Combined-Shape" fill={colors.crystalLight}></path>
                  </g>
              </g>
              <rect id="Rectangle-6-Copy-5" fill={colors.crystalLight} x="0" y="814" width="1121" height="32" rx="8"></rect>
              <g id="Group-4-Copy-2" transform="translate(199.500000, 407.000000) scale(-1, 1) translate(-199.500000, -407.000000) translate(93.000000, 0.000000)">
                  <g id="Group-Copy">
                      <polygon id="Triangle-1" fill={colors.castleDark} points="106.254042 0 213 244.889094 106.254042 244.889094"></polygon>
                      <polygon id="Triangle-1-Copy" fill={colors.castleLight} transform="translate(53.372979, 122.444547) scale(-1, 1) translate(-53.372979, -122.444547) " points="-2.7000624e-13 0 106.745958 244.889094 -2.7000624e-13 244.889094"></polygon>
                  </g>
                  <g id="Group-3-Copy-3" transform="translate(21.647913, 258.021947)">
                      <rect id="Rectangle-11" fill={colors.castleLight} x="0" y="0" width="84.6096998" height="165.319451"></rect>
                      <rect id="Rectangle-11-Copy-3" fill={colors.castleDark} x="84.6096998" y="0" width="84.6096998" height="165.319451"></rect>
                  </g>
                  <g id="Group-3-Copy-4" transform="translate(21.172649, 647.758691)">
                      <rect id="Rectangle-11" fill={colors.castleLight} x="0" y="0" width="84.6096998" height="165.319451"></rect>
                      <rect id="Rectangle-11-Copy-3" fill={colors.castleDark} x="84.6096998" y="0" width="84.6096998" height="165.319451"></rect>
                  </g>
                  <g id="Group-3-Copy-5" transform="translate(40.501143, 436.860513)">
                      <rect id="Rectangle-11" fill={colors.castleLight} x="0" y="0" width="65.2924167" height="198.537846"></rect>
                      <rect id="Rectangle-11-Copy-3" fill={colors.castleDark} x="65" y="0" width="65.2924167" height="198.537846"></rect>
                  </g>
                  <g id="Group-2-Copy-2" opacity="0.700909515" style={{ mixBlendMode: 'darken' }} transform="translate(21.647913, 246.820396)">
                      <path d="M53.4261193,0 L8.00831317,0 C3.58806356,0 0,3.58014116 0,7.99646909 L0,18.6554985 C0,23.0714025 3.58544394,26.6519676 8.00831317,26.6519676 L53.4261193,26.6519676 L84.8051032,26.6519676 L84.8051032,0 L53.4261193,0 Z" id="Combined-Shape" fill={colors.castleDark}></path>
                      <path d="M137.840416,0 L92.4226095,0 C88.0023599,0 84.4142963,3.58014116 84.4142963,7.99646909 L84.4142963,18.6554985 C84.4142963,23.0714025 87.9997402,26.6519676 92.4226095,26.6519676 L137.840416,26.6519676 L169.2194,26.6519676 L169.2194,0 L137.840416,0 Z" id="Combined-Shape-Copy-3" fill="#1A1E3E" style={{ mixBlendMode: 'darken' }} transform="translate(126.816848, 13.325984) scale(-1, 1) translate(-126.816848, -13.325984) "></path>
                  </g>
                  <g id="Group-2-Copy-3" transform="translate(0.000000, 231.756240)">
                      <path d="M68.2861635,0 L8.0050535,0 C3.58546653,0 0,3.58014116 0,7.99646909 L0,18.6554985 C0,23.0714025 3.58398453,26.6519676 8.0050535,26.6519676 L68.2861635,26.6519676 L106.745958,26.6519676 L106.745958,0 L68.2861635,0 Z" id="Combined-Shape" fill={colors.castleLight}></path>
                      <path d="M174.540205,0 L114.259095,0 C109.839508,0 106.254042,3.58014116 106.254042,7.99646909 L106.254042,18.6554985 C106.254042,23.0714025 109.838026,26.6519676 114.259095,26.6519676 L174.540205,26.6519676 L213,26.6519676 L213,0 L174.540205,0 Z" id="Combined-Shape-Copy-3" fill={colors.castleDark} transform="translate(159.627021, 13.325984) scale(-1, 1) translate(-159.627021, -13.325984) "></path>
                  </g>
                  <polyline id="Path-70-Copy-4" fill={colors.mountainMid} points="21.6479129 423.534536 35.1232141 436.999049 106.320632 436.999049 106.320632 423.341399 21.6479129 423.341399"></polyline>
                  <polyline id="Path-70-Copy-5" fill={colors.mountainMid} transform="translate(63.509009, 641.454663) scale(1, -1) translate(-63.509009, -641.454663) " points="21.1726495 634.818975 34.6479507 648.283488 105.845368 648.283488 105.845368 634.625838 21.1726495 634.625838"></polyline>
                  <polyline id="Path-70-Copy-6" fill={colors.mountainDark} transform="translate(148.643074, 430.170224) scale(-1, 1) translate(-148.643074, -430.170224) " points="106.306715 423.534536 119.782016 436.999049 190.979434 436.999049 190.979434 423.341399 106.306715 423.341399"></polyline>
                  <polyline id="Path-70-Copy-7" fill={colors.mountainDark} transform="translate(148.167811, 641.454663) scale(-1, -1) translate(-148.167811, -641.454663) " points="105.831452 634.818975 119.306753 648.283488 190.50417 648.283488 190.50417 634.625838 105.831452 634.625838"></polyline>
              </g>
           </g>
        </svg>
      </motion.div>
    </div>
);
