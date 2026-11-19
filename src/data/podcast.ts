/**
 * "Ankakh podcast" episodes shown on the /podcast page, newest first (the first one is shown large).
 * Covers are the YouTube thumbnails (i.ytimg.com/vi/<id>/maxresdefault.jpg) saved in src/assets/podcast/.
 * To add an episode: save its cover there, import it below and add an entry at the top.
 */
import type { ImageMetadata } from 'astro';
import type { Language } from '@/i18n';
import ep8 from '@/assets/podcast/episode-08.jpg';
import ep7 from '@/assets/podcast/episode-07.jpg';
import ep6 from '@/assets/podcast/episode-06.jpg';
import ep5 from '@/assets/podcast/episode-05.jpg';
import ep4 from '@/assets/podcast/episode-04.jpg';

export type Episode = {
  number: number;
  /** YouTube video id: the link is https://www.youtube.com/watch?v=<id> */
  youtubeId: string;
  cover: ImageMetadata;
  /** Episode topics (the video is in Armenian; the other languages are translations of the title). */
  topic: Record<Language, string>;
};

export const episodes: Episode[] = [
  {
    number: 8,
    youtubeId: 'PmKoz59xIeA',
    cover: ep8,
    topic: { hy: 'Ուսուցիչ, կրթություն, աշակերտ', en: 'Teacher, education, student', ru: 'Учитель, образование, ученик' },
  },
  {
    number: 7,
    youtubeId: 'ymLujYq9HD4',
    cover: ep7,
    topic: { hy: 'Մարքեթինգ և սոցցանցեր', en: 'Marketing and social media', ru: 'Маркетинг и соцсети' },
  },
  {
    number: 6,
    youtubeId: '-_9PIWKBaJQ',
    cover: ep6,
    topic: { hy: 'Ազգագրություն, դպրոցներ, կրթություն', en: 'Ethnography, schools, education', ru: 'Этнография, школы, образование' },
  },
  {
    number: 5,
    youtubeId: 'TTLvgjc-uRA',
    cover: ep5,
    topic: { hy: 'Ռազմական բժշկություն, զինծառայություն', en: 'Military medicine, military service', ru: 'Военная медицина, военная служба' },
  },
  {
    number: 4,
    youtubeId: '5Qkt76K0BlM',
    cover: ep4,
    topic: { hy: 'Անձնանուններ, կոռուպցիա, ծայրահեղականություն', en: 'Personal names, corruption, extremism', ru: 'Имена, коррупция, экстремизм' },
  },
];

export const episodeUrl = (e: Episode) => `https://www.youtube.com/watch?v=${e.youtubeId}`;
