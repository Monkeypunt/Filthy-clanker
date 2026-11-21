import React, { useState } from 'react';
import { ExternalLink, PawPrint } from 'lucide-react';
import { ServicesSection } from './ServicesSection';

interface AboutViewProps {
  onSwitchToDream?: () => void;
  onOrderService?: (serviceName: string) => void;
  isCompact?: boolean;
}

const DOG_IMG = '/assets/aistudio/image_2b3b9978.png';

const GAMES = [
  {
    id: 'marvel-rivals',
    title: 'Marvel Rivals',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE0_zeqkZ0iGJvHGPoxnHKx8Zf4j8f5eKuyoR9BwGH8w&s',
    link: 'https://www.marvelrivals.com/',
  },
  {
    id: 'overwatch',
    title: 'Overwatch',
    imageUrl: 'https://thumb.wikimedia.org/wikipedia/en/thumb/5/51/Overwatch_cover_art.jpg/250px-Overwatch_cover_art.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
    link: 'https://overwatch.blizzard.com/en-us/',
  },
  {
    id: 'hsr',
    title: 'Honkai: Star Rail',
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNTZhOTAzNWMtNzE5NS00MzRlLWE4ZjItNzM3N2JlMDA5MTczXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    link: 'https://hsr.hoyoverse.com/en-us/',
  },
  {
    id: 'genshin',
    title: 'Genshin Impact',
    imageUrl: 'https://cdn1.epicgames.com/spt-assets/99dc46c68ea14324964a856d18dcac5b/genshin-impact-hqdph.jpg',
    link: 'https://genshin.hoyoverse.com/en/',
  },
];

export const AboutView: React.FC<AboutViewProps> = ({
  onOrderService,
  isCompact = false,
}) => {
  const [showDogModal, setShowDogModal] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-2">
      {/* Bio Card */}
      <section className="rounded-2xl border border-[#e7dfd5] bg-white p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <PawPrint className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#231a14]">
            About me:
          </h1>
        </div>

        <div className="space-y-3 text-base md:text-lg text-[#4a3c32] leading-relaxed font-normal">
          <p>
            My name is <span className="font-semibold text-[#231a14]">Ochbadrakh</span> and i just like playing games
          </p>

          <p>I am 17 years old</p>

          <p>
            And I got a doggo named{' '}
            <button
              type="button"
              onClick={() => setShowDogModal(true)}
              className="text-amber-700 font-semibold underline underline-offset-4 decoration-amber-500/60 hover:text-amber-600 hover:decoration-amber-600 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              &ldquo;Peanut&rdquo;
            </button>{' '}
            who is just a bundle of joy and whimsy
          </p>

          <p>
            I sometimes read Manga or Manhwa, usually on my bed in the middle of the night
          </p>

          <p className="text-[#7d6c5e]">
            I don&apos;t have much to say about myself--
          </p>

          <div className="pt-2">
            <a
              href="#games"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-600 transition-colors"
            >
              <span>so here are some games i like playing &darr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="space-y-6">
        <div className="flex items-center gap-2.5">
          <PawPrint className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight text-[#231a14]">
            Games I Like Playing
          </h2>
        </div>

        <div className={`grid grid-cols-2 ${isCompact ? 'sm:grid-cols-2' : 'sm:grid-cols-4'} gap-4 md:gap-5`}>
          {GAMES.map((game) => (
            <a
              key={game.id}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-[#e7dfd5] bg-white overflow-hidden shadow-sm hover:border-amber-400 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f1ebe1]">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-3.5 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#231a14] group-hover:text-amber-700 transition-colors truncate">
                  {game.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8c7a6b] group-hover:text-amber-600 shrink-0 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* My Projects Section */}
      <section id="projects" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <PawPrint className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
          <h2 className="text-2xl font-bold tracking-tight text-[#231a14]">
            My projects
          </h2>
        </div>

        <div className={`grid grid-cols-1 ${isCompact ? 'sm:grid-cols-1' : 'sm:grid-cols-2'} gap-5`}>
          <div className="rounded-2xl border border-[#e7dfd5] bg-white overflow-hidden flex flex-col shadow-sm hover:border-amber-400/80 transition-colors">
            <div className="px-3.5 py-2.5 border-b border-[#e7dfd5] bg-[#faf7f2] flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#4a3c32] truncate">
                ochbadrakh1.netlify.app
              </span>
              <a
                href="https://ochbadrakh1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open ochbadrakh1.netlify.app"
                className="text-[#7d6c5e] hover:text-amber-700 transition-colors shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full h-64 bg-black">
              <iframe
                src="https://ochbadrakh1.netlify.app/"
                title="ochbadrakh1.netlify.app preview"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#e7dfd5] bg-white overflow-hidden flex flex-col shadow-sm hover:border-amber-400/80 transition-colors">
            <div className="px-3.5 py-2.5 border-b border-[#e7dfd5] bg-[#faf7f2] flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#4a3c32] truncate">
                gorgeous-rolypoly-b0c9c7.netlify.app
              </span>
              <a
                href="https://gorgeous-rolypoly-b0c9c7.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open gorgeous-rolypoly-b0c9c7.netlify.app"
                className="text-[#7d6c5e] hover:text-amber-700 transition-colors shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative w-full h-64 bg-black">
              <iframe
                src="https://gorgeous-rolypoly-b0c9c7.netlify.app/"
                title="gorgeous-rolypoly-b0c9c7.netlify.app preview"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection
        onOrderService={(serviceName) => onOrderService?.(serviceName)}
        isCompact={isCompact}
      />

      {/* Peanut Image Lightbox / Modal */}
      {showDogModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231a14]/60 backdrop-blur-sm"
          onClick={() => setShowDogModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#fffdf9] border border-[#e7dfd5] rounded-2xl overflow-hidden p-4 space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-[#e7dfd5]">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#231a14]">
                <PawPrint className="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>Peanut</span>
              </span>
              <button
                type="button"
                onClick={() => setShowDogModal(false)}
                className="text-[#66574c] hover:text-[#231a14] text-xs px-2.5 py-1 rounded-lg bg-[#f1ebe1] hover:bg-[#e7dfd5] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-[3/4] max-h-[70vh] w-full rounded-xl overflow-hidden bg-[#f1ebe1] flex items-center justify-center">
              <img
                src={DOG_IMG}
                alt="Peanut"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-[#66574c] text-center">
              &ldquo;who is just a bundle of joy and whimsy&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
