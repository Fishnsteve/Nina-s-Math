import { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Trash2, Undo } from 'lucide-react';
import { cn } from '../lib/utils';
import { translations } from '../i18n';
import { useGame } from '../context/GameContext';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; color: string; width: number };

export function Notepad() {
  const { language } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  
  // Drawing state
  const [color, setColor] = useState('#ffffff');
  const [isEraser, setIsEraser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Resize canvas to fit container
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      redraw();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isOpen, strokes]);

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    const allStrokes = [...strokes, ...(currentStroke ? [currentStroke] : [])];
    
    allStrokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      stroke.points.forEach(p => {
        ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      if (stroke.color === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.stroke();
    });
    ctx.globalCompositeOperation = 'source-over';
  };

  useEffect(() => {
    redraw();
  }, [currentStroke]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const point = getCoordinates(e);
    if (!point) return;
    setIsDrawing(true);
    setCurrentStroke({ points: [point], color: isEraser ? 'eraser' : color, width: isEraser ? 20 : 3 });
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !currentStroke) return;
    const point = getCoordinates(e);
    if (!point) return;
    setCurrentStroke(prev => {
      if (!prev) return null;
      return { ...prev, points: [...prev.points, point] };
    });
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke) {
      setStrokes(prev => [...prev, currentStroke]);
    }
    setIsDrawing(false);
    setCurrentStroke(null);
  };
  
  const handleUndo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };
  
  const handleClear = () => {
    setStrokes([]);
  };

  if (!isOpen) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-4 flex justify-end px-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-white/20 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm font-bold shadow-lg backdrop-blur-md"
        >
          <Pencil className="w-4 h-4" />
          {language === 'en' ? 'Open Notepad' : '打開草稿紙'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative" style={{ height: '300px' }}>
      
      {/* Toolbar */}
      <div className="bg-black/40 p-2 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEraser(false)}
            className={cn("p-2 rounded-xl transition-all", !isEraser ? "bg-pink-500 text-white shadow-md scale-105" : "text-white/60 hover:bg-white/10")}
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsEraser(true)}
            className={cn("p-2 rounded-xl transition-all", isEraser ? "bg-white text-black shadow-md scale-105" : "text-white/60 hover:bg-white/10")}
          >
            <Eraser className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-white/20 mx-1 self-center" />
          
          <button 
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-2 rounded-xl text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button 
            onClick={handleClear}
            className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold text-white hover:bg-white/20 transition-all"
        >
          {language === 'en' ? 'Close' : '關閉'}
        </button>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef} 
        className="flex-1 w-full bg-slate-900/60 relative cursor-crosshair"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          className="absolute inset-0 w-full h-full touch-none"
        />
        {strokes.length === 0 && !currentStroke && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <p className="text-xl font-bold font-mono tracking-widest text-white/80">
              {language === 'en' ? 'DOODLE HERE' : '在這裡塗鴉'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
