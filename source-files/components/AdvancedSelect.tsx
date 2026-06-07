import React, { useState, useRef, useEffect } from 'react';

type Option = { value: string; label?: string } | string;

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}

const normalizeOpt = (o: Option) => (typeof o === 'string' ? { value: o, label: o } : { value: o.value, label: o.label ?? o.value });

const AdvancedSelect: React.FC<Props> = ({ options, value, onChange, placeholder = 'Select…', searchable = true, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const opts = options.map(normalizeOpt);
  const filtered = query.trim() === '' ? opts : opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  const selectedLabel = opts.find((o) => o.value === value)?.label ?? '';

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => setHighlight(0), [query]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      e.preventDefault();
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlight((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const opt = filtered[highlight];
      if (opt) onChange(opt.value);
      setOpen(false);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
      e.preventDefault();
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div className="w-full">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleKey}
          className="w-full text-left px-4 py-3 border rounded-md bg-white flex items-center justify-between"
        >
          <span className={`truncate ${selectedLabel ? 'text-slate-900' : 'text-slate-400'}`}>{selectedLabel || placeholder}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-md shadow-lg">
          {searchable && (
            <div className="p-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Search…"
                className="w-full px-3 py-2 border rounded focus:outline-none"
              />
            </div>
          )}

          <ul role="listbox" aria-activedescendant={String(highlight)} tabIndex={-1} className="max-h-56 overflow-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate-500">No results</li>
            )}
            {filtered.map((o, i) => (
              <li
                key={o.value}
                id={String(i)}
                role="option"
                aria-selected={o.value === value}
                onMouseDown={(e) => { e.preventDefault(); onChange(o.value); setOpen(false); }}
                onMouseEnter={() => setHighlight(i)}
                className={`px-4 py-3 cursor-pointer ${i === highlight ? 'bg-orange-50' : ''} ${o.value === value ? 'font-semibold' : ''}`}
              >
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvancedSelect;
