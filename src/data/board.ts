/**
 * Board members shown on the /board page.
 * Photos live in src/assets/board and are converted to WebP on the board page.
 */
import type { ImageMetadata } from 'astro';
import type { Language } from '@/i18n';
import artakPhoto from '@/assets/board/Artak_Melikyan.png';
import arayikPhoto from '@/assets/board/Arayik_Mkrtumyan.png';
import aregPhoto from '@/assets/board/Areg_Djaghatsparyan.png';

type Localized = Record<Language, string>;

export type BoardMember = {
  id: string;
  photo: ImageMetadata;
  name: Localized;
  /** Position on the board (Chair, Member …). */
  role: Localized;
  /** What they do outside the board. */
  occupation: Localized;
  bio?: Localized;
  /** Year they joined the board. */
  since?: number;
  /** The chair: shown in the large spotlight (with `quote`, if any). */
  chair?: boolean;
  quote?: Localized;
};

const historian: Localized = { hy: 'Պատմաբան', en: 'Historian', ru: 'Историк' };
const memberRole: Localized = { hy: 'Խորհրդի անդամ', en: 'Board member', ru: 'Член правления' };

export const board: BoardMember[] = [
  {
    id: 'artak-melikyan',
    chair: true,
    photo: artakPhoto,
    name: { hy: 'Արտակ Մելիքյան', en: 'Artak Melikyan', ru: 'Артак Меликян' },
    role: { hy: 'Խորհրդի նախագահ', en: 'Chair of the Board', ru: 'Председатель правления' },
    occupation: historian,
  },
  {
    id: 'arayik-mkrtumyan',
    photo: arayikPhoto,
    name: { hy: 'Արայիկ Մկրտումյան', en: 'Arayik Mkrtumyan', ru: 'Араик Мкртумян' },
    role: memberRole,
    occupation: historian,
  },
  {
    id: 'areg-djaghatsparyan',
    photo: aregPhoto,
    name: { hy: 'Արեգ Ջաղացբարյան', en: 'Areg Djaghatsparyan', ru: 'Арег Джагацпарян' },
    role: memberRole,
    occupation: historian,
  },
];

/** Plain, single-language version passed to the React island. */
export type BoardCard = Omit<BoardMember, 'photo' | 'name' | 'role' | 'occupation' | 'bio' | 'quote'> & {
  photo: string;
  name: string;
  role: string;
  occupation: string;
  bio?: string;
  quote?: string;
};

/** `photoSrc` turns the imported image into a URL (the page passes an optimized WebP). */
export const getBoard = async (lang: Language, photoSrc: (img: ImageMetadata) => Promise<string>): Promise<BoardCard[]> =>
  Promise.all(
    board.map(async (m) => ({
      ...m,
      photo: await photoSrc(m.photo),
      name: m.name[lang],
      role: m.role[lang],
      occupation: m.occupation[lang],
      bio: m.bio?.[lang],
      quote: m.quote?.[lang],
    })),
  );
