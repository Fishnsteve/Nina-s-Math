import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'motion/react';

export function NinaAvatar({ className, interactive }: { className?: string, interactive?: boolean }) {
  const { equippedAvatar, equippedPet, equippedBackground } = useGame();

  return (
    <div className={`relative w-full aspect-square ${className || ''} flex items-center justify-center`}>
      {/* Background Stage/Glow based on equippedBackground */}
      {equippedBackground === 'bg_stage' && (
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/40 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      )}
      {equippedBackground === 'bg_street' && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 to-cyan-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      )}

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl max-w-lg">
        <defs>
          <radialGradient id="skin" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#ffe6cc" />
            <stop offset="70%" stopColor="#fcdbb3" />
            <stop offset="100%" stopColor="#eab896" />
          </radialGradient>
          <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2314" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </linearGradient>
          <radialGradient id="blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8080" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff8080" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sulanDress" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#cc0000" />
          </linearGradient>
          <linearGradient id="sishuPink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd1dc" />
            <stop offset="100%" stopColor="#fca5a5" />
          </linearGradient>
          <linearGradient id="sishuBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="kimonoPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb3d9" />
            <stop offset="100%" stopColor="#ff66b2" />
          </linearGradient>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe600" />
            <stop offset="100%" stopColor="#cc9900" />
          </linearGradient>
          <linearGradient id="princessGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fae8ff" />
            <stop offset="40%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>

        {/* --- BASE GIRL --- */}
        {/* Back Hair */}
        <path d="M 70 30 Q 35 30 45 185 Q 100 200 155 185 Q 165 30 130 30 Q 100 0 70 30 Z" fill="url(#hairDark)" />
        
        {/* Body / Legs (Base) */}
        {/* Left Leg */}
        <path d="M 85 140 L 85 180 Q 85 185 92 185 L 95 185 L 95 140 Z" fill="url(#skin)" />
        {/* Right Leg */}
        <path d="M 105 140 L 105 185 L 108 185 Q 115 185 115 180 L 115 140 Z" fill="url(#skin)" />
        
        {/* Base dress (if flower is equipped or no outfit, she needs a base dress) */}
        {(equippedAvatar === 'hero_flower' || !equippedAvatar) && (
          <path d="M 70 95 Q 100 105 130 95 L 140 145 Q 100 155 60 145 Z" fill="#4fa8d1" />
        )}

        {/* Neck */}
        <rect x="92" y="90" width="16" height="15" fill="url(#skin)" />

        {/* Head */}
        <path d="M 70 65 Q 70 30 100 30 Q 130 30 130 65 Q 130 100 100 105 Q 70 100 70 65 Z" fill="url(#skin)" />
        
        {/* Face Details */}
        {/* Eyes (Cute Anime Style) */}
        <ellipse cx="85" cy="68" rx="5" ry="8" fill="#2d1b19" />
        <circle cx="87" cy="65" r="2" fill="#fff" />
        <circle cx="84" cy="71" r="1" fill="#fff" />
        
        <ellipse cx="115" cy="68" rx="5" ry="8" fill="#2d1b19" />
        <circle cx="113" cy="65" r="2" fill="#fff" />
        <circle cx="116" cy="71" r="1" fill="#fff" />

        {/* Eyelashes */}
        <path d="M 79 64 Q 85 58 91 64" fill="none" stroke="#2d1b19" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 109 64 Q 115 58 121 64" fill="none" stroke="#2d1b19" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mouth */}
        <path d="M 96 84 Q 100 89 104 84" fill="none" stroke="#aa5555" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Blush */}
        <circle cx="78" cy="78" r="6" fill="url(#blush)" />
        <circle cx="122" cy="78" r="6" fill="url(#blush)" />

        {/* Front Hair / Bangs */}
        {/* Beautiful, organic, feathered bangs with cute sharp fringes/individual strands */}
        <path d="M 60 54 Q 72 20 100 18 Q 128 20 140 54 Q 134 52 130 56 Q 127 50 124 57 Q 121 49 118 58 Q 114 50 110 59 Q 106 51 102 61 Q 98 51 94 61 Q 90 51 86 59 Q 82 50 78 58 Q 75 49 72 56 Q 66 52 60 54 Z" fill="url(#hairDark)" />
        
        {/* Cute individual front hair wisps/strands overlay for natural depth */}
        <path d="M 74 46 Q 78 58 76 60 Q 75 52 72 48" fill="none" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M 96 44 Q 100 59 101 62 Q 98 53 95 47" fill="none" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M 104 44 Q 101 59 100 62 Q 102 53 105 47" fill="none" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path d="M 122 46 Q 118 58 120 60 Q 121 52 124 48" fill="none" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        
        {/* Side strands framing the face nicely */}
        <path d="M 60 55 Q 55 90 60 130 Q 75 90 70 50 Z" fill="url(#hairDark)" />
        <path d="M 140 55 Q 145 90 140 130 Q 125 90 130 50 Z" fill="url(#hairDark)" />

        {/* --- HAIRSTYLES & ACCESSORIES (conditional) --- */}
        {equippedAvatar === 'hero_pink_kimono' ? (
          <g>
            {/* Traditional Sulan Elaborate Bun & Updo */}
            <path d="M 60 25 Q 100 -5 140 25 Q 150 -10 100 -20 Q 50 -10 60 25 Z" fill="url(#hairDark)" />
            <circle cx="100" cy="5" r="28" fill="url(#hairDark)" />
            <circle cx="82" cy="10" r="20" fill="url(#hairDark)" />
            <circle cx="118" cy="10" r="20" fill="url(#hairDark)" />
            
            {/* Hair Accessories (Flowers in Bun) */}
            <circle cx="100" cy="-5" r="8" fill="#dda0dd" />
            <circle cx="92" cy="-2" r="7" fill="#ffb6c1" />
            <circle cx="108" cy="-2" r="7" fill="#ffb6c1" />
            <circle cx="100" cy="4" r="7" fill="#ffb6c1" />
            <circle cx="100" cy="-2" r="3" fill="url(#gold)" />
            <circle cx="75" cy="15" r="6" fill="#ffb6c1" />
            <circle cx="125" cy="15" r="6" fill="#dda0dd" />
            
            {/* Dangling Gold Ornaments */}
            <path d="M 75 20 L 70 45 M 78 20 L 74 40 M 125 20 L 130 45 M 122 20 L 126 40" stroke="url(#gold)" strokeWidth="1.5" strokeDasharray="3,2" />

            {/* Face Paint / Gems */}
            <circle cx="72" cy="73" r="1.5" fill="#fff" opacity="0.8" />
            <circle cx="68" cy="72" r="1.5" fill="#ffb6c1" opacity="0.8" />
            <circle cx="128" cy="73" r="1.5" fill="#fff" opacity="0.8" />
            <circle cx="132" cy="72" r="1.5" fill="#ffb6c1" opacity="0.8" />
          </g>
        ) : equippedAvatar === 'hero_ninja' ? (
          <g>
            {/* Ninja Sleek Headband wrapping around the forehead */}
            <path d="M 64 45 Q 100 40 136 45 L 134 52 Q 100 47 66 52 Z" fill="#0f172a" />
            {/* Metal Plate */}
            <rect x="90" y="42" width="20" height="8" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="0.5" />
            {/* Engraving on metal plate */}
            <circle cx="95" cy="46" r="1" fill="#475569" />
            <circle cx="105" cy="46" r="1" fill="#475569" />
            <path d="M 98 46 L 102 46" stroke="#475569" strokeWidth="1" />
            {/* Headband knot ribbons at the side */}
            <path d="M 64 48 Q 50 52 45 62 L 53 62 Z" fill="#0f172a" />
          </g>
        ) : equippedAvatar === 'hero_princess' ? (
          <g>
            {/* Elegant Princess Updo Bun (no traditional Chinese elements) */}
            <circle cx="100" cy="15" r="22" fill="url(#hairDark)" />
          </g>
        ) : equippedAvatar === 'hero_cyber' ? (
          <g>
            {/* Cyberpunk Neon Highlights / Hair Clips */}
            <path d="M 72 40 L 85 36" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
            <path d="M 128 40 L 115 36" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
            <circle cx="70" cy="38" r="2" fill="#ec4899" />
            <circle cx="130" cy="38" r="2" fill="#ec4899" />
          </g>
        ) : equippedAvatar === 'hero_flower' ? (
          <g>
            {/* Simple sweet single flower pinned behind her ear */}
            <g transform="translate(126, 45)">
              <circle cx="-5" cy="-5" r="5" fill="#fef08a" />
              <circle cx="5" cy="-5" r="5" fill="#fef08a" />
              <circle cx="-5" cy="5" r="5" fill="#fef08a" />
              <circle cx="5" cy="5" r="5" fill="#fef08a" />
              <circle cx="0" cy="0" r="4.5" fill="#facc15" />
            </g>
          </g>
        ) : (
          <g>
            {/* Plain pretty girl Nina hairstyle (Sishu & default) with a cute little side pink bow ribbon clip */}
            <g transform="translate(68, 42)">
              <path d="M -6 -4 Q -12 -8 -6 -12 Q -2 -10 -2 -6 Z M 6 -4 Q 12 -8 6 -12 Q 2 -10 2 -6 Z" fill="#f43f5e" />
              <circle cx="0" cy="-5" r="2.5" fill="#fff" />
            </g>
          </g>
        )}


        {/* --- OUTFITS (equippedAvatar) --- */}
        {equippedAvatar === 'hero_sulan' && (
          <g>
            {/* Sishu PE Uniform (Pink & Royal Blue) */}
            {/* Blue Shorts peeking out */}
            <path d="M 83 140 L 97 140 L 97 172 Q 90 174 83 172 Z" fill="url(#sishuBlue)" />
            <path d="M 103 140 L 117 140 L 117 172 Q 110 174 103 172 Z" fill="url(#sishuBlue)" />
            
            {/* White sneakers / shoes */}
            <path d="M 81 172 Q 81 169 88 169 L 92 169 Q 99 169 99 172 L 97 186 L 83 186 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <path d="M 101 172 Q 101 169 108 169 L 112 169 Q 119 169 119 172 L 117 186 L 103 186 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <path d="M 84 182 L 96 182" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 104 182 L 116 182" stroke="#cbd5e1" strokeWidth="1" />

            {/* Sishu Pink T-Shirt Base */}
            <path d="M 70 95 L 130 95 L 145 160 Q 100 170 55 160 Z" fill="url(#sishuPink)" />
            
            {/* Sishu Royal Blue lower part with wave boundary */}
            <path d="M 65 120 Q 95 102 135 120 L 145 160 Q 100 170 55 160 Z" fill="url(#sishuBlue)" />

            {/* White "喜樹" Chinese text printed vertically on the chest (Viewer's Right / Nina's Left) */}
            <g transform="translate(116, 128)" style={{ userSelect: 'none' }}>
              <text x="0" y="0" fontSize="7" fontWeight="900" fill="#ffffff" fontFamily="system-ui, sans-serif" textAnchor="middle">喜</text>
              <text x="0" y="7.5" fontSize="7" fontWeight="900" fill="#ffffff" fontFamily="system-ui, sans-serif" textAnchor="middle">樹</text>
            </g>

            {/* Round collar neckband */}
            <path d="M 90 95 Q 100 102 110 95" fill="none" stroke="#fbcfe8" strokeWidth="2.5" />
          </g>
        )}

        {equippedAvatar === 'hero_pink_kimono' && (
          <g>
            {/* Pink Sulan Details */}
            <path d="M 65 95 Q 100 105 135 95 L 150 170 Q 100 175 50 170 Z" fill="url(#kimonoPink)" />
            {/* Obi (Belt) */}
            <path d="M 70 115 Q 100 125 130 115 L 132 135 Q 100 145 68 135 Z" fill="#cc0066" />
            <circle cx="100" cy="128" r="4" fill="url(#gold)" />
            <path d="M 68 128 Q 100 138 132 128" fill="none" stroke="url(#gold)" strokeWidth="2" />
            
            {/* Sulan Collar */}
            <path d="M 80 95 L 100 115 L 120 95" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" />
            <path d="M 80 95 L 100 115 L 120 95" fill="none" stroke="#ff3377" strokeWidth="2" strokeLinejoin="round" />
          </g>
        )}

        {equippedAvatar === 'hero_ninja' && (
          <g>
            {/* Ninja Suit */}
            <path d="M 70 95 Q 100 105 130 95 L 140 160 Q 100 165 60 160 Z" fill="#1e293b" />
            <path d="M 85 95 L 100 115 L 115 95" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinejoin="round" />
            <path d="M 65 130 Q 100 135 135 130 L 135 140 Q 100 145 65 140 Z" fill="#dc2626" />
            <path d="M 90 130 L 110 140 M 110 130 L 90 140" stroke="#000" strokeWidth="2" />
          </g>
        )}

        {equippedAvatar === 'hero_princess' && (
          <g>
            {/* Elegant Sheer / Lace Bell Sleeves draped under arms */}
            {/* Left drape */}
            <path d="M 75 95 Q 45 120 40 155 Q 60 145 70 115 Z" fill="#ffffff" opacity="0.4" />
            {/* Right drape */}
            <path d="M 125 95 Q 155 120 160 155 Q 140 145 130 115 Z" fill="#ffffff" opacity="0.4" />

            {/* A delicate pearl necklace */}
            <path d="M 90 92 Q 100 100 110 92" fill="none" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="100" cy="101" r="3" fill="#f43f5e" stroke="#ffe600" strokeWidth="0.5" />

            {/* Slender flowy A-line cascading underskirt */}
            <path d="M 82 130 Q 100 138 118 130 L 142 185 Q 100 190 58 185 Z" fill="url(#princessGrad)" />

            {/* Sparkling vertical central front dress panel (adds vertical line for slender appearance) */}
            <path d="M 94 133 L 88 185 L 112 185 L 106 133 Z" fill="#ffffff" opacity="0.65" />
            {/* Little sparkles on the central panel */}
            <circle cx="100" cy="145" r="1.5" fill="#fdf4ff" className="animate-pulse" />
            <circle cx="100" cy="160" r="1.5" fill="#fdf4ff" className="animate-pulse" />
            <circle cx="100" cy="175" r="1.5" fill="#fdf4ff" className="animate-pulse" />

            {/* Elegant high-waisted slender bodice */}
            <path d="M 72 95 Q 100 102 128 95 L 118 130 Q 100 138 82 130 Z" fill="url(#princessGrad)" stroke="#fae8ff" strokeWidth="0.5" />

            {/* Sweetheart neckline corset lace */}
            <path d="M 72 95 Q 100 112 128 95" fill="none" stroke="#fbcfe8" strokeWidth="3" />
            <path d="M 85 99 L 100 115 L 115 99" fill="none" stroke="url(#gold)" strokeWidth="1.5" />

            {/* Gold Waistband/V-belt accentuating the slender waist */}
            <path d="M 82 130 Q 100 138 118 130 L 118 133 Q 100 141 82 133 Z" fill="url(#gold)" />

            {/* Floating side overskirts / peplum drapery (adds movement and flow) */}
            <path d="M 82 130 Q 64 145 70 162 Q 90 152 100 135 Z" fill="#f472b6" opacity="0.75" />
            <path d="M 118 130 Q 136 145 130 162 Q 110 152 100 135 Z" fill="#f472b6" opacity="0.75" />

            {/* Crown (Tiara) */}
            <g transform="translate(82, 10)">
              {/* Tiara Base */}
              <path d="M 2 15 Q 18 10 34 15 L 34 18 Q 18 13 2 18 Z" fill="url(#gold)" />
              {/* Tiara Peaks */}
              <path d="M 4 15 L 8 2 L 14 12 L 18 -2 L 22 12 L 28 2 L 32 15 Z" fill="url(#gold)" stroke="#b45309" strokeWidth="0.5" />
              {/* Jewels */}
              <circle cx="8" cy="2" r="2" fill="#38bdf8" />
              <circle cx="18" cy="-2" r="2.5" fill="#f43f5e" />
              <circle cx="28" cy="2" r="2" fill="#38bdf8" />
              <circle cx="18" cy="7" r="1.5" fill="#ffffff" className="animate-pulse" />
            </g>
          </g>
        )}

        {equippedAvatar === 'hero_cyber' && (
          <g>
            {/* Cyberpunk Suit */}
            <path d="M 65 95 Q 100 105 135 95 L 145 160 Q 100 165 55 160 Z" fill="#0f172a" />
            <path d="M 80 95 L 90 130 L 110 130 L 120 95" fill="none" stroke="#06b6d4" strokeWidth="4" />
            <path d="M 70 110 L 130 110" fill="none" stroke="#eab308" strokeWidth="2" />
            <circle cx="100" cy="115" r="8" fill="#0ea5e9" />
            <circle cx="100" cy="115" r="4" fill="#fff" />
            {/* Cyber Glasses */}
            <path d="M 80 55 L 120 55 L 115 65 L 85 65 Z" fill="#0ea5e9" opacity="0.8" />
            <path d="M 80 55 L 120 55 L 115 65 L 85 65 Z" fill="none" stroke="#fff" strokeWidth="1" />
          </g>
        )}

        {equippedAvatar === 'hero_flower' && (
          <g>
            <path d="M 65 95 Q 100 105 135 95 L 145 165 Q 100 170 55 165 Z" fill="#bbf7d0" />
            {/* Flowers on dress */}
            <circle cx="80" cy="120" r="6" fill="#f472b6" />
            <circle cx="80" cy="120" r="2" fill="#fff" />
            <circle cx="120" cy="140" r="6" fill="#f472b6" />
            <circle cx="120" cy="140" r="2" fill="#fff" />
            <circle cx="100" cy="150" r="8" fill="#fb7185" />
            <circle cx="100" cy="150" r="3" fill="#fff" />
            {/* Elaborate Flower on head */}
            <g transform="translate(65, 35)">
              <circle cx="0" cy="-12" r="8" fill="#ff66b2" />
              <circle cx="11" cy="-4" r="8" fill="#ff66b2" />
              <circle cx="7" cy="9" r="8" fill="#ff66b2" />
              <circle cx="-7" cy="9" r="8" fill="#ff66b2" />
              <circle cx="-11" cy="-4" r="8" fill="#ff66b2" />
              <circle cx="0" cy="0" r="6" fill="url(#gold)" />
            </g>
          </g>
        )}

        {/* Arms */}
        {/* Left Arm */}
        <path d="M 75 98 Q 50 115 45 140" fill="none" stroke="url(#skin)" strokeWidth="10" strokeLinecap="round" />
        {/* Right Arm */}
        <path d="M 125 98 Q 150 115 155 140" fill="none" stroke="url(#skin)" strokeWidth="10" strokeLinecap="round" />
        
        {/* Sleeves depending on outfit */}
        {equippedAvatar === 'hero_sulan' && (
          <g>
            <path d="M 75 95 Q 60 110 55 120 L 70 120 Z" fill="url(#sishuPink)" />
            <path d="M 125 95 Q 140 110 145 120 L 130 120 Z" fill="url(#sishuPink)" />
          </g>
        )}
        {equippedAvatar === 'hero_pink_kimono' && (
          <g>
            <path d="M 70 95 Q 40 120 45 145 L 65 140 Z" fill="url(#kimonoPink)" />
            <path d="M 130 95 Q 160 120 155 145 L 135 140 Z" fill="url(#kimonoPink)" />
          </g>
        )}
        {equippedAvatar === 'hero_ninja' && (
          <g>
            <path d="M 75 95 Q 50 110 40 125 L 55 130 Z" fill="#1e293b" />
            <path d="M 125 95 Q 150 110 160 125 L 145 130 Z" fill="#1e293b" />
          </g>
        )}
        {equippedAvatar === 'hero_princess' && (
          <g>
            {/* Elegant sheer off-the-shoulder ruffle cuffs */}
            <path d="M 72 95 Q 60 102 52 107 L 62 114 Z" fill="#ffffff" opacity="0.6" />
            <path d="M 128 95 Q 140 102 148 107 L 138 114 Z" fill="#ffffff" opacity="0.6" />
            
            {/* Tiny gold arm bands */}
            <path d="M 72 95 L 68 97" stroke="url(#gold)" strokeWidth="1.5" />
            <path d="M 128 95 L 132 97" stroke="url(#gold)" strokeWidth="1.5" />
          </g>
        )}
        {equippedAvatar === 'hero_cyber' && (
          <g>
            <path d="M 75 95 Q 60 110 55 120 L 70 120 Z" fill="#0f172a" />
            <path d="M 125 95 Q 140 110 145 120 L 130 120 Z" fill="#0f172a" />
            <path d="M 45 130 L 45 140" fill="none" stroke="#0ea5e9" strokeWidth="10" strokeLinecap="round" />
            <path d="M 155 130 L 155 140" fill="none" stroke="#0ea5e9" strokeWidth="10" strokeLinecap="round" />
          </g>
        )}
        {equippedAvatar === 'hero_flower' && (
          <g>
            <path d="M 75 95 Q 60 110 55 120 L 70 120 Z" fill="#bbf7d0" />
            <path d="M 125 95 Q 140 110 145 120 L 130 120 Z" fill="#bbf7d0" />
          </g>
        )}

        {/* --- PETS / ACCESSORIES (equippedPet) --- */}
        {equippedPet === 'pet_fan' && (
          <g transform="translate(155, 120)">
            {/* Green Fan in Right Hand, illustrative */}
            <path d="M 0 20 L 30 -10 A 30 30 0 0 1 45 15 Z" fill="#2ecc71" />
            <path d="M 0 20 L 40 5 A 25 25 0 0 1 42 22 Z" fill="#a8e6cf" />
            <path d="M 0 20 L 30 -10" stroke="#f1c40f" strokeWidth="1" />
            <path d="M 0 20 L 45 15" stroke="#f1c40f" strokeWidth="1" />
            <circle cx="0" cy="20" r="3" fill="url(#gold)" />
          </g>
        )}

        {equippedPet === 'pet_lantern' && (
          <g transform="translate(45, 130)">
            {/* Red Lantern hanging from Left Hand */}
            <rect x="-1" y="0" width="2" height="15" fill="#333" />
            <ellipse cx="0" cy="30" rx="14" ry="20" fill="url(#sulanDress)" />
            <path d="M -14 30 Q 0 35 14 30" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            <path d="M -10 20 Q 0 25 10 20" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            <path d="M -10 40 Q 0 45 10 40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.4" />
            <rect x="-8" y="10" width="16" height="4" fill="url(#gold)" />
            <rect x="-8" y="46" width="16" height="4" fill="url(#gold)" />
            {/* Tassel */}
            <path d="M 0 50 L -3 65 M 0 50 L 0 68 M 0 50 L 3 65" stroke="#cc0000" strokeWidth="1.5" />
          </g>
        )}

        {equippedPet === 'pet_cat' && (
          <g transform="translate(0, 175)">
            <motion.g 
              animate={{ 
                x: [20, 160, 160, 20, 20],
                scaleX: [1, 1, -1, -1, 1] 
              }} 
              transition={{ repeat: Infinity, duration: 8, ease: "linear", times: [0, 0.45, 0.5, 0.95, 1] }}
            >
              {/* Body */}
              <ellipse cx="0" cy="0" rx="14" ry="10" fill="#f59e0b" />
              {/* Tail */}
              <motion.path 
                d="M -12 -5 Q -25 -20 -15 -25" 
                fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              />
              {/* Legs */}
              <motion.line x1="-8" y1="8" x2="-8" y2="15" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" animate={{ y2: [15, 12, 15] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="-3" y1="9" x2="-3" y2="15" stroke="#d97706" strokeWidth="3" strokeLinecap="round" animate={{ y2: [12, 15, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="5" y1="9" x2="5" y2="15" stroke="#d97706" strokeWidth="3" strokeLinecap="round" animate={{ y2: [15, 12, 15] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="10" y1="8" x2="10" y2="15" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" animate={{ y2: [12, 15, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              {/* Head */}
              <circle cx="12" cy="-8" r="9" fill="#f59e0b" />
              {/* Ears */}
              <path d="M 6 -13 L 4 -22 L 12 -15 Z" fill="#f59e0b" />
              <path d="M 18 -13 L 20 -22 L 14 -16 Z" fill="#f59e0b" />
              {/* Face */}
              <circle cx="15" cy="-9" r="1.5" fill="#000" />
              <circle cx="9" cy="-9" r="1.5" fill="#000" />
              <path d="M 11 -6 L 12 -5 L 13 -6" fill="none" stroke="#000" strokeWidth="1" />
            </motion.g>
          </g>
        )}

        {equippedPet === 'pet_dog' && (
          <g transform="translate(0, 175)">
            <motion.g 
              animate={{ 
                x: [160, 20, 20, 160, 160],
                scaleX: [-1, -1, 1, 1, -1] 
              }} 
              transition={{ repeat: Infinity, duration: 7, ease: "linear", times: [0, 0.45, 0.5, 0.95, 1] }}
            >
              {/* Body */}
              <ellipse cx="0" cy="0" rx="16" ry="11" fill="#8b5a2b" />
              {/* Tail */}
              <motion.path 
                d="M -15 -2 Q -25 5 -22 -10" 
                fill="none" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round"
                animate={{ rotate: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
                style={{ transformOrigin: '-15px -2px' }}
              />
              {/* Legs */}
              <motion.line x1="-10" y1="8" x2="-10" y2="16" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round" animate={{ y2: [16, 12, 16] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="-4" y1="9" x2="-4" y2="16" stroke="#5c3a21" strokeWidth="4" strokeLinecap="round" animate={{ y2: [12, 16, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="6" y1="9" x2="6" y2="16" stroke="#5c3a21" strokeWidth="4" strokeLinecap="round" animate={{ y2: [16, 12, 16] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              <motion.line x1="12" y1="8" x2="12" y2="16" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round" animate={{ y2: [12, 16, 12] }} transition={{ repeat: Infinity, duration: 0.4 }} />
              {/* Head */}
              <ellipse cx="14" cy="-8" rx="11" ry="10" fill="#8b5a2b" />
              {/* Ears */}
              <path d="M 6 -12 Q -2 -15 2 -3 Z" fill="#5c3a21" />
              <path d="M 22 -12 Q 30 -15 26 -3 Z" fill="#5c3a21" />
              {/* Face */}
              <circle cx="17" cy="-10" r="1.5" fill="#000" />
              <circle cx="11" cy="-10" r="1.5" fill="#000" />
              <circle cx="14" cy="-6" r="2.5" fill="#000" />
              <path d="M 14 -4 Q 14 -1 17 -2" fill="none" stroke="#ffb6c1" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </g>
        )}

        {equippedPet === 'pet_dragon' && (
          <g transform="translate(150, 40)">
            <motion.g
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {/* Cute floating dragon */}
              <path d="M 10 20 Q 30 -10 45 15 Q 20 40 5 25 Z" fill="#2ecc71" />
              <path d="M 15 22 Q 30 -5 40 15 Q 25 35 10 25 Z" fill="#a8e6cf" />
              <circle cx="35" cy="12" r="8" fill="#27ae60" />
              <ellipse cx="37" cy="10" rx="2" ry="3" fill="#000" />
              <circle cx="38" cy="9" r="0.8" fill="#fff" />
              {/* Dragon tail */}
              <path d="M 15 25 Q -10 40 5 55" fill="none" stroke="#2ecc71" strokeWidth="5" strokeLinecap="round" />
              <path d="M 5 55 L 0 50 L 10 50 Z" fill="#27ae60" />
              {/* Dragon Horns */}
              <path d="M 30 6 L 25 0 L 32 4 Z" fill="url(#gold)" />
              <path d="M 38 4 L 38 -2 L 40 2 Z" fill="url(#gold)" />
            </motion.g>
          </g>
        )}

        {equippedPet === 'pet_phoenix' && (
          <g transform="translate(40, 40)">
            <motion.g animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
              <path d="M 10 20 Q 20 0 35 15 Q 20 30 5 25 Z" fill="#ef4444" />
              <path d="M 15 22 Q 25 5 30 15 Q 20 25 10 25 Z" fill="#f59e0b" />
              <circle cx="25" cy="12" r="6" fill="#dc2626" />
              <circle cx="27" cy="10" r="1.5" fill="#000" />
              <path d="M 30 12 L 35 10 L 30 15 Z" fill="#fbbf24" />
              <path d="M 5 25 Q -15 35 0 50" fill="none" stroke="#ef4444" strokeWidth="3" />
              <path d="M 0 50 Q -5 45 5 35" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <path d="M 20 5 Q 15 -10 25 -15 Q 30 -5 25 5 Z" fill="#ef4444" />
              <path d="M 22 5 Q 18 -5 25 -8 Q 28 0 25 5 Z" fill="#f59e0b" />
            </motion.g>
          </g>
        )}

      </svg>
    </div>
  );
}
