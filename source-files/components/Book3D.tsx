import React, { useState } from 'react';
import { Book as BookType } from '../types';

interface Book3DProps {
  book: BookType;
  onClick: (book: BookType) => void;
}

const Book3D: React.FC<Book3DProps> = ({ book, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative w-48 h-64 cursor-pointer perspective-1000 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(book)}
    >
      <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ease-out ${isHovered ? 'rotate-y-[-30deg] translate-x-4' : 'rotate-y-0'}`}>
        
        {/* Front Cover */}
        <div 
          className="absolute inset-0 backface-hidden rounded-r-sm shadow-xl z-20 flex flex-col justify-between p-4 border-l-4 border-white/20"
          style={{ backgroundColor: book.coverColor, transform: 'translateZ(25px)' }}
        >
          <div className="text-white/80 text-xs font-serif uppercase tracking-widest border-b border-white/20 pb-1">Dhruv Lib</div>
          <div className="text-white font-serif font-bold text-lg leading-tight drop-shadow-md mt-2">{book.title}</div>
          
          <div className="mt-auto">
             <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center mb-2">
               <div className="w-6 h-6 rounded-full bg-white/10"></div>
             </div>
             <div className="text-white/90 text-sm font-light">{book.author}</div>
          </div>
          
          {/* Subtle sheen effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </div>

        {/* Spine */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-[50px] origin-left transform-style-3d bg-slate-100 flex items-center justify-center shadow-inner border-r border-slate-300"
          style={{ transform: 'rotateY(90deg) translateZ(-25px) translateX(-25px)' }}
        >
          <span className="text-slate-800 text-xs tracking-widest font-serif rotate-90 whitespace-nowrap font-bold opacity-70">{book.title.substring(0, 20)}...</span>
        </div>

        {/* Back Cover */}
        <div 
          className="absolute inset-0 backface-hidden rounded-l-sm bg-slate-100 border-2 border-slate-200"
          style={{ transform: 'rotateY(180deg) translateZ(25px)' }}
        >
          <div className="h-full w-full flex items-center justify-center p-4">
             <div className="text-justify text-[8px] text-slate-500 overflow-hidden h-32 leading-relaxed font-mono">
               LIBRARY PROPERTY<br/>
               DHRUV SYSTEM<br/>
               MEERUT, 2022<br/><br/>
               {book.summary}
             </div>
          </div>
        </div>

        {/* Pages (Right Side) */}
        <div 
          className="absolute right-0 top-1 bottom-1 w-[48px] bg-[#fffbf0] transform-style-3d origin-left shadow-inner"
          style={{ transform: 'rotateY(90deg) translateZ(165px)' }}
        >
            <div className="h-full w-full border-r border-gray-300 bg-[linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:4px_100%]"></div>
        </div>

        {/* Pages (Top) */}
        <div 
            className="absolute top-0 left-0 w-full h-[50px] bg-[#fffbf0] origin-top transform-style-3d"
            style={{ transform: 'rotateX(-90deg) translateZ(-25px)' }}
        ></div>

        {/* Pages (Bottom) */}
        <div 
            className="absolute bottom-0 left-0 w-full h-[50px] bg-[#fffbf0] origin-bottom transform-style-3d"
            style={{ transform: 'rotateX(90deg) translateZ(-25px)' }}
        ></div>

      </div>
      
      {/* Floating Shadow - Lighter for Light Mode */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-900/20 blur-xl rounded-[100%] group-hover:scale-75 group-hover:opacity-60 transition-all duration-500"></div>
    </div>
  );
};

export default Book3D;