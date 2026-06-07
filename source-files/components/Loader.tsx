import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-orange-50/90 backdrop-blur-xl">
      {/* Logo above the book animation - removed white background and increased size */}
      <div className="mb-6">
          <div className="w-60 h-auto p-0 flex items-center justify-center">
          <img src="/img/LOGO.png" alt="Dhruv Library Logo" className="w-full h-auto object-contain" />
        </div>
      </div>

      <div className="book-loader-container mb-12 scale-150">
        <div className="book-cover"></div>
        <div className="book-page"></div>
        <div className="book-page"></div>
        <div className="book-page"></div>
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-widest animate-pulse">
          DHRUV LIBRARY
        </h2>
        <div className="h-1 w-32 mx-auto bg-orange-100 rounded-full overflow-hidden">
          <div className="h-full bg-orange-600 animate-[width_2s_ease-in-out_infinite]" style={{width: '30%'}}></div>
        </div>
        <p className="text-xs font-sans text-orange-600 uppercase tracking-[0.3em] mt-2">
          Initializing Knowledge Base...
        </p>
      </div>

      <style>{`
        @keyframes width {
          0% { width: 0%; margin-left: 0; }
          50% { width: 100%; margin-left: 0; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;