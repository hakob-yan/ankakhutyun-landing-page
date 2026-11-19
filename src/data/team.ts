/**
 * Team members shown on the /team page.
 * Photos live in src/assets/members and are converted to WebP on the team page.
 */
import type { ImageMetadata } from 'astro';
import type { Language } from '@/i18n';
import narePhoto from '@/assets/members/Nare_Manukyan.png';
import meriPhoto from '@/assets/members/Meri_Honvhannisyan.png';
import nonaPhoto from '@/assets/members/Nona_Tigranyan.png';

type Localized = Record<Language, string>;

export type TeamMember = {
  id: string;
  photo: ImageMetadata;
  name: Localized;
  role: Localized;
  /** When present, the card opens a detail dialog with the bio. */
  bio?: Localized;
  /** Shown larger in the top "leadership" row. */
  lead?: boolean;
  /** Optional links shown in the detail view. */
  email?: string;
  facebook?: string;
  instagram?: string;
};

export const team: TeamMember[] = [
  {
    id: 'nare-manukyan',
    photo: narePhoto,
    name: { hy: 'Նարե Մանուկյան', en: 'Nare Manukyan', ru: 'Наре Манукян' },
    role: { hy: 'Իրավաբան', en: 'Lawyer', ru: 'Юрист' },
  },
  {
    id: 'meri-hovhannisyan',
    photo: meriPhoto,
    name: { hy: 'Մերի Հովհաննիսյան', en: 'Meri Hovhannisyan', ru: 'Мери Ованнисян' },
    role: { hy: 'Ֆինանսիստ', en: 'Financier', ru: 'Финансист' },
  },
  {
    id: 'nona-tigranyan',
    photo: nonaPhoto,
    name: { hy: 'Նոնա Տիգրանյան', en: 'Nona Tigranyan', ru: 'Нона Тигранян' },
    role: { hy: 'Մարքեթոլոգ', en: 'Marketing Specialist', ru: 'Маркетолог' },
  },
];

/** Plain, single-language version passed to the React island. */
export type TeamCard = Omit<TeamMember, 'photo' | 'name' | 'role' | 'bio'> & { photo: string; name: string; role: string; bio?: string };

/** `photoSrc` turns the imported image into a URL (the page passes an optimized WebP). */
export const getTeam = async (lang: Language, photoSrc: (img: ImageMetadata) => Promise<string>): Promise<TeamCard[]> =>
  Promise.all(
    team.map(async (m) => ({ ...m, photo: await photoSrc(m.photo), name: m.name[lang], role: m.role[lang], bio: m.bio?.[lang] })),
  );
