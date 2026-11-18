/**
 * Team members shown on the /team page.
 *
 * PHOTOS: mock portraits from randomuser.me, placeholders only.
 * Replace each `photo` with a real photo (e.g. put it in src/assets/team/ and import it) before going public.
 * NAMES / ROLES / BIOS: mock content as well.
 */
import type { Language } from '@/i18n';

type Localized = Record<Language, string>;

export type TeamMember = {
  id: string;
  photo: string;
  name: Localized;
  role: Localized;
  bio: Localized;
  /** Shown larger in the top "leadership" row. */
  lead?: boolean;
  /** Optional links shown in the detail view. */
  email?: string;
  facebook?: string;
  instagram?: string;
};

const photo = (path: string) => `https://randomuser.me/api/portraits/${path}.jpg`;

export const team: TeamMember[] = [
  {
    id: 'anna',
    lead: true,
    photo: photo('women/44'),
    name: { hy: 'Աննա Գրիգորյան', en: 'Anna Grigoryan', ru: 'Анна Григорян' },
    role: { hy: 'Հիմնադիր, խորհրդի նախագահ', en: 'Founder, Chair of the Board', ru: 'Основатель, председатель правления' },
    bio: {
      hy: 'Աննան հիմնադրել է «Անկախության սերունդը»՝ համոզված լինելով, որ յուրաքանչյուր սերնդի պատմություն արժանի է պահպանվելու։ Նա ավելի քան տասը տարի աշխատել է կրթական և քաղաքացիական ծրագրերում։',
      en: 'Anna founded Ankakhutyan Serund believing that every generation’s story deserves to be kept. She has spent over ten years working on education and civic programs.',
      ru: 'Анна основала «Поколение независимости», веря, что история каждого поколения заслуживает сохранения. Более десяти лет она работает в образовательных и гражданских программах.',
    },
  },
  {
    id: 'davit',
    lead: true,
    photo: photo('men/32'),
    name: { hy: 'Դավիթ Հովհաննիսյան', en: 'Davit Hovhannisyan', ru: 'Давит Ованнисян' },
    role: { hy: 'Գործադիր տնօրեն', en: 'Executive Director', ru: 'Исполнительный директор' },
    bio: {
      hy: 'Դավիթը ղեկավարում է կազմակերպության առօրյա աշխատանքը և համակարգում բոլոր ծրագրերը։ Նախկինում աշխատել է միջազգային զարգացման կազմակերպություններում։',
      en: 'Davit runs the organization day to day and coordinates all programs. He previously worked for international development organizations.',
      ru: 'Давит руководит повседневной работой организации и координирует все программы. Ранее работал в международных организациях развития.',
    },
  },
  {
    id: 'mariam',
    photo: photo('women/68'),
    name: { hy: 'Մարիամ Սարգսյան', en: 'Mariam Sargsyan', ru: 'Мариам Саргсян' },
    role: { hy: 'Ծրագրերի համակարգող', en: 'Program Coordinator', ru: 'Координатор программ' },
    bio: {
      hy: 'Մարիամը համակարգում է «Անկախության Քաղաքացի» ծրագիրը և աշխատում է մարզերի երիտասարդական խմբերի հետ։',
      en: 'Mariam coordinates the Citizen of Independence program and works with youth groups across the regions.',
      ru: 'Мариам координирует программу «Гражданин независимости» и работает с молодёжными группами в регионах.',
    },
  },
  {
    id: 'aram',
    photo: photo('men/75'),
    name: { hy: 'Արամ Պետրոսյան', en: 'Aram Petrosyan', ru: 'Арам Петросян' },
    role: { hy: 'Փոդքաստի պրոդյուսեր', en: 'Podcast Producer', ru: 'Продюсер подкаста' },
    bio: {
      hy: 'Արամը պատասխանատու է «Անկախ փոդքաստի» համար՝ հյուրերի ընտրությունից մինչև ձայնագրություն և մոնտաժ։',
      en: 'Aram is in charge of the Ankakh podcast, from choosing guests to recording and editing.',
      ru: 'Арам отвечает за подкаст «Анках»: от выбора гостей до записи и монтажа.',
    },
  },
  {
    id: 'lilit',
    photo: photo('women/65'),
    name: { hy: 'Լիլիթ Ավետիսյան', en: 'Lilit Avetisyan', ru: 'Лилит Аветисян' },
    role: { hy: 'Հաղորդակցության մենեջեր', en: 'Communications Manager', ru: 'Менеджер по коммуникациям' },
    bio: {
      hy: 'Լիլիթը վարում է մեր սոցիալական ցանցերը և պատմում մեր աշխատանքի մասին լայն հանրությանը։',
      en: 'Lilit runs our social media and tells the wider public about our work.',
      ru: 'Лилит ведёт наши социальные сети и рассказывает широкой аудитории о нашей работе.',
    },
  },
  {
    id: 'hayk',
    photo: photo('men/46'),
    name: { hy: 'Հայկ Մկրտչյան', en: 'Hayk Mkrtchyan', ru: 'Айк Мкртчян' },
    role: { hy: 'Կամավորների համակարգող', en: 'Volunteer Coordinator', ru: 'Координатор волонтёров' },
    bio: {
      hy: 'Հայկը հավաքագրում և ուղեկցում է մեր կամավորներին՝ օգնելով յուրաքանչյուրին գտնել իր տեղը թիմում։',
      en: 'Hayk recruits and supports our volunteers, helping each of them find their place on the team.',
      ru: 'Айк набирает и сопровождает наших волонтёров, помогая каждому найти своё место в команде.',
    },
  },
  {
    id: 'nare',
    photo: photo('women/90'),
    name: { hy: 'Նարե Համբարձումյան', en: 'Nare Hambardzumyan', ru: 'Наре Амбарцумян' },
    role: { hy: 'Բովանդակության խմբագիր', en: 'Content Editor', ru: 'Редактор контента' },
    bio: {
      hy: 'Նարեն խմբագրում է մեր հոդվածներն ու հուշերը և օգնում հեղինակներին պատմել իրենց պատմությունները։',
      en: 'Nare edits our articles and memoirs and helps authors tell their stories.',
      ru: 'Наре редактирует наши статьи и воспоминания и помогает авторам рассказывать свои истории.',
    },
  },
  {
    id: 'tigran',
    photo: photo('men/22'),
    name: { hy: 'Տիգրան Վարդանյան', en: 'Tigran Vardanyan', ru: 'Тигран Варданян' },
    role: { hy: 'Դիզայներ', en: 'Designer', ru: 'Дизайнер' },
    bio: {
      hy: 'Տիգրանը ստեղծում է մեր տեսողական ինքնությունը՝ պաստառներից մինչև տարեկան հաշվետվություններ։',
      en: 'Tigran shapes our visual identity, from posters to annual reports.',
      ru: 'Тигран создаёт наш визуальный стиль — от афиш до годовых отчётов.',
    },
  },
];

/** Plain, single-language version passed to the React island. */
export type TeamCard = Omit<TeamMember, 'name' | 'role' | 'bio'> & { name: string; role: string; bio: string };

export const getTeam = (lang: Language): TeamCard[] =>
  team.map((m) => ({ ...m, name: m.name[lang], role: m.role[lang], bio: m.bio[lang] }));
