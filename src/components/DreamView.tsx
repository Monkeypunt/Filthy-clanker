import React from 'react';

interface DreamViewProps {
  onSwitchToAbout?: () => void;
  isCompact?: boolean;
}

const JOB_WORK_THUMBNAIL = 'https://keydifferences.com/wp-content/uploads/2016/07/job-vs-work-thumbnail.jpg';
const DOG_IMG = '/assets/aistudio/image_2b3b9978.png';

export const DreamView: React.FC<DreamViewProps> = ({ isCompact = false }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-2">
      {/* Title */}
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white capitalize">
          dream
        </h1>
      </div>

      {/* Original Job vs Work Image Thumbnail */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 md:p-6 flex items-center justify-center">
        <img
          src={JOB_WORK_THUMBNAIL}
          alt="job vs work thumbnail"
          className="max-h-72 w-auto object-contain rounded-xl shadow-lg"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* The 3 Original Sections: My skills, My plans for the future, dog */}
      <div className={`grid grid-cols-1 ${isCompact ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-5`}>
        {/* Section 1: My skills */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-400/50 hover:bg-neutral-800/80">
          <div>
            <span className="text-xs font-mono text-neutral-500">01</span>
            <h2 className="text-xl font-bold text-white mt-1 mb-4">
              My skills
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-amber-300 font-semibold text-lg min-h-[70px] flex items-center justify-center text-center">
            &ldquo;Unknown to myself&rdquo;
          </div>
        </div>

        {/* Section 2: My plans for the future */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/50 hover:bg-neutral-800/80">
          <div>
            <span className="text-xs font-mono text-neutral-500">02</span>
            <h2 className="text-xl font-bold text-white mt-1 mb-4">
              My plans for the future
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-cyan-300 font-semibold text-lg min-h-[70px] flex items-center justify-center text-center">
            Get a stable source of income
          </div>
        </div>

        {/* Section 3: dog */}
        <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 flex flex-col justify-between transition-all duration-300 hover:border-rose-400/50 hover:bg-neutral-800/80">
          <div>
            <span className="text-xs font-mono text-neutral-500">03</span>
            <h2 className="text-xl font-bold text-white mt-1 mb-4">
              dog
            </h2>
          </div>

          <div className="relative aspect-[3/4] max-h-56 w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
            <img
              src={DOG_IMG}
              alt="dog"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
