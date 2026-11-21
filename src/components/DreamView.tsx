import React from 'react';
import { PawPrint } from 'lucide-react';

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
      <div className="border-b border-[#e7dfd5] pb-4 flex items-center gap-2.5">
        <PawPrint className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#231a14] capitalize">
          dream
        </h1>
      </div>

      {/* Original Job vs Work Image Thumbnail */}
      <div className="rounded-2xl border border-[#e7dfd5] bg-white p-4 md:p-6 flex items-center justify-center shadow-sm">
        <img
          src={JOB_WORK_THUMBNAIL}
          alt="job vs work thumbnail"
          className="max-h-72 w-auto object-contain rounded-xl shadow-sm"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* The 3 Original Sections: My skills, My plans for the future, dog */}
      <div className={`grid grid-cols-1 ${isCompact ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-5`}>
        {/* Section 1: My skills */}
        <div className="group rounded-2xl border border-[#e7dfd5] bg-white p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-amber-400">
          <div>
            <span className="text-xs font-mono text-[#8c7a6b]">01</span>
            <h2 className="text-xl font-bold text-[#231a14] mt-1 mb-4">
              My skills
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-amber-800 font-semibold text-lg min-h-[70px] flex items-center justify-center text-center">
            &ldquo;Unknown to myself&rdquo;
          </div>
        </div>

        {/* Section 2: My plans for the future */}
        <div className="group rounded-2xl border border-[#e7dfd5] bg-white p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-amber-400">
          <div>
            <span className="text-xs font-mono text-[#8c7a6b]">02</span>
            <h2 className="text-xl font-bold text-[#231a14] mt-1 mb-4">
              My plans for the future
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e7dfd5] text-emerald-800 font-semibold text-lg min-h-[70px] flex items-center justify-center text-center">
            Get a stable source of income
          </div>
        </div>

        {/* Section 3: dog */}
        <div className="group rounded-2xl border border-[#e7dfd5] bg-white p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-amber-400">
          <div>
            <span className="text-xs font-mono text-[#8c7a6b]">03</span>
            <h2 className="text-xl font-bold text-[#231a14] mt-1 mb-4 flex items-center gap-1.5">
              <span>dog</span>
              <PawPrint className="w-4 h-4 text-amber-600" aria-hidden="true" />
            </h2>
          </div>

          <div className="relative aspect-[3/4] max-h-56 w-full rounded-xl overflow-hidden bg-[#f1ebe1] border border-[#e7dfd5]">
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
