import React from 'react';

const TrophyWinners: React.FC = () => {
  return (
    <section id="trophy-winners" className="py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <div className="w-[32rem] h-[24rem] rounded-xl overflow-hidden shadow-2xl bg-white p-4 flex items-center justify-center float">
              <img
                src="/img/trophy.jpeg"
                alt="Dhruv Library Star Trophy Winners Large"
                className="w-full h-full object-contain"
                style={{ maxHeight: '22rem', maxWidth: '100%' }}
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Trophy Winners</h2>
            <p className="text-slate-700 mb-3 leading-snug text-base">
              Each year Dhruv Library recognizes exceptional learners and achievers who have used our resources to reach important milestones.
              The "Trophy" is a symbol we award to students who have demonstrated outstanding academic performance or who have secured employment
              as a direct result of their disciplined study and preparation at our library. This recognition celebrates hard work, persistence, and
              the transformative power of a focused study environment.
            </p>

            <p className="text-slate-700 mb-3 leading-snug text-base">
              Winners are chosen based on verifiable results — top grades, awards, published work, or confirmed job placements that cite the
              library's materials, mentorship, or study spaces as a contributing factor. We believe small recognitions like this reinforce positive
              study habits and encourage other students to aim higher. The trophy presentation is accompanied by a short profile of the winner,
              documenting their journey, the study strategies they followed, and practical tips they share for peers.
            </p>

            <p className="text-slate-700 mb-3 leading-snug text-base">
              We celebrate every success — big or small — because each one adds
              to the learning culture at Dhruv Library.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#contact" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700">Learn how to qualify</a>
              <button
                type="button"
                className="inline-block px-5 py-2 border border-orange-200 text-orange-600 rounded-md font-semibold hover:bg-orange-50"
                onClick={() => {
                  const el = document.getElementById('dhruv-library-star');
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 50;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                See past winners
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrophyWinners;
