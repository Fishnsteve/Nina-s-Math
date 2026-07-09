import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { OrbitingOrbs } from '../ZoneNodes';

export const ForestCampIslandNode = ({ unlocked, colors, duration = 6 }: any) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {unlocked && <OrbitingOrbs color={colors.orbColor} duration={duration * 2} />}
      <motion.div 
        animate={unlocked ? { y: [-6, 6, -6] } : {}}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className={cn("forest-scene-wrapper transition-all duration-700", unlocked ? "" : "grayscale opacity-50")}>
          <div className="forest-scene">
            <div className="forest">
              <div className="tree tree1">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
              </div>

              <div className="tree tree2">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
                <div className="branch branch-bottom"></div>
              </div>

              <div className="tree tree3">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
                <div className="branch branch-bottom"></div>
              </div>

              <div className="tree tree4">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
                <div className="branch branch-bottom"></div>
              </div>

              <div className="tree tree5">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
                <div className="branch branch-bottom"></div>
              </div>

              <div className="tree tree6">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
                <div className="branch branch-bottom"></div>
              </div>

              <div className="tree tree7">
                <div className="branch branch-top"></div>
                <div className="branch branch-middle"></div>
                <div className="branch branch-bottom"></div>
              </div>
            </div>
            
            <div className="tent">
              <div className="roof"></div>
              <div className="roof-border-left">
                <div className="roof-border roof-border1"></div>
                <div className="roof-border roof-border2"></div>
                <div className="roof-border roof-border3"></div>
              </div>
              <div className="entrance">
                <div className="door left-door">
                  <div className="left-door-inner"></div>
                </div>
                <div className="door right-door">
                  <div className="right-door-inner"></div>
                </div>
              </div>
            </div>

            <div className="floor">
              <div className="ground ground1"></div>
              <div className="ground ground2"></div>
            </div>
            
            <div className="fireplace">
              <div className="support"></div>
              <div className="support"></div>
              <div className="bar"></div>
              <div className="hanger"></div>
              <div className="smoke"></div>
              <div className="pan"></div>
              <div className="fire">
                <div className="line line1">
                  <div className="particle particle1"></div>
                  <div className="particle particle2"></div>
                  <div className="particle particle3"></div>
                  <div className="particle particle4"></div>
                </div>
                <div className="line line2">
                  <div className="particle particle1"></div>
                  <div className="particle particle2"></div>
                  <div className="particle particle3"></div>
                  <div className="particle particle4"></div>
                </div>
                <div className="line line3">
                  <div className="particle particle1"></div>
                  <div className="particle particle2"></div>
                  <div className="particle particle3"></div>
                  <div className="particle particle4"></div>
                </div>
              </div>
            </div>
            
            <div className="time-wrapper">
              <div className="time">
                <div className="day"></div>
                <div className="night">
                  <div className="moon"></div>
                  <div className="star star1 star-big"></div>
                  <div className="star star2 star-big"></div>
                  <div className="star star3 star-big"></div>
                  <div className="star star4"></div>
                  <div className="star star5"></div>
                  <div className="star star6"></div>
                  <div className="star star7"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
