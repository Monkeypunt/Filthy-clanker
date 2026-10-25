import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface AboutViewProps {
  onSwitchToDream?: () => void;
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

export const AboutView: React.FC<AboutViewProps> = ({ isCompact = false }) => {
  const [showDogModal, setShowDogModal] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 py-2">
      {/* Bio Card */}
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-6 md:p-8 backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
          About me:
        </h1>

        <div className="space-y-3 text-base md:text-lg text-neutral-200 leading-relaxed font-normal">
          <p>
            My name is <span className="font-semibold text-white">Ochbadrakh</span> and i just like playing games
          </p>

          <p>I am 17 years old</p>

          <p>
            And I got a doggo named{' '}
            <button
              onClick={() => setShowDogModal(true)}
              className="text-amber-400 font-medium underline underline-offset-4 decoration-amber-500/50 hover:text-amber-300 hover:decoration-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              &ldquo;Peanut&rdquo;
            </button>{' '}
            who is just a bundle of joy and whimsy
          </p>

          <p>
            I sometimes read Manga or Manhwa, usually on my bed in the middle of the night
          </p>

          <p className="text-neutral-400">
            I don&apos;t have much to say about myself--
          </p>

          <div className="pt-2">
            <a
              href="#games"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>so here are some games i like playing &darr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Games I Like Playing
        </h2>

        <div className={`grid grid-cols-2 ${isCompact ? 'sm:grid-cols-2' : 'sm:grid-cols-4'} gap-4 md:gap-5`}>
          {GAMES.map((game) => (
            <a
              key={game.id}
              href={game.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden hover:border-neutral-600 hover:bg-neutral-800/80 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-3.5 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {game.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-400 shrink-0 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Peanut Image Lightbox / Modal */}
      {showDogModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowDogModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-sm font-semibold text-white">Peanut</span>
              <button
                onClick={() => setShowDogModal(false)}
                className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-neutral-800"
              >
                Close
              </button>
            </div>

            <div className="relative aspect-[3/4] max-h-[70vh] w-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
              <img
                src={DOG_IMG}
                alt="Peanut"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs text-neutral-400 text-center">
              &ldquo;who is just a bundle of joy and whimsy&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
