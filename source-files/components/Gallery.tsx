import React, { lazy, Suspense } from 'react';

// Lazy-load the standalone dhruv-gallery app so the main bundle stays small.
// Cast the import to a component with any props so TypeScript allows passing embedded/fullWidth props.
const DhruvGalleryApp = lazy(() => import('../dhruv-gallery/App') as Promise<{ default: React.ComponentType<any> }>);

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-0 bg-slate-50">
      {/* full-bleed wrapper so embedded gallery can take the full viewport width */}
      <div className="w-full px-0">
        <Suspense fallback={<div className="p-12 text-center">Loading gallery…</div>}>
          {/* tell the embedded app it is embedded and should be full width */}
          <DhruvGalleryApp embedded={true} fullWidth={true} />
        </Suspense>
      </div>
    </section>
  );
};

export default Gallery;
