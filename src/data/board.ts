/**
 * Board members shown on the /board page.
 *
 * PHOTOS: mock portraits from randomuser.me, placeholders only.
 * Replace each `photo` with a real photo before going public.
 * NAMES / ROLES / BIOS / QUOTE: mock content as well.
 */
import type { Language } from '@/i18n';

type Localized = Record<Language, string>;

export type BoardMember = {
  id: string;
  photo: string;
  name: Localized;
  /** Position on the board (Chair, Secretary, Member …). */
  role: Localized;
  /** What they do outside the board. */
  occupation: Localized;
  bio: Localized;
  /** Year they joined the board. */
  since: number;
  /** The chair: shown in the large spotlight with `quote`. */
  chair?: boolean;
  quote?: Localized;
};

const photo = (path: string) => `https://randomuser.me/api/portraits/${path}.jpg`;

export const board: BoardMember[] = [
  {
    id: 'armen',
    chair: true,
    photo: photo('men/52'),
    since: 2019,
    name: { hy: 'Արմեն Սահակյան', en: 'Armen Sahakyan', ru: 'Армен Саакян' },
    role: { hy: 'Խորհրդի նախագահ', en: 'Chair of the Board', ru: 'Председатель правления' },
    occupation: { hy: 'Պատմաբան, դասախոս', en: 'Historian, lecturer', ru: 'Историк, преподаватель' },
    bio: {
      hy: 'Արմենը քսան տարի դասավանդում է Հայաստանի նորագույն պատմություն և հեղինակ է անկախության առաջին տարիների մասին մի շարք հետազոտությունների։',
      en: 'Armen has taught modern Armenian history for twenty years and has written several studies on the first years of independence.',
      ru: 'Армен двадцать лет преподаёт новейшую историю Армении и является автором ряда исследований о первых годах независимости.',
    },
    quote: {
      hy: 'Մեր խնդիրն է, որ անկախության սերնդի պատմությունը պատմեն հենց իրենք՝ այդ սերնդի մարդիկ։',
      en: 'Our job is to make sure the story of the independence generation is told by the people who lived it.',
      ru: 'Наша задача — чтобы историю поколения независимости рассказали сами люди этого поколения.',
    },
  },
  {
    id: 'gayane',
    photo: photo('women/12'),
    since: 2019,
    name: { hy: 'Գայանե Մանուկյան', en: 'Gayane Manukyan', ru: 'Гаяне Манукян' },
    role: { hy: 'Փոխնախագահ', en: 'Vice-chair', ru: 'Заместитель председателя' },
    occupation: { hy: 'Կրթական փորձագետ', en: 'Education expert', ru: 'Эксперт по образованию' },
    bio: {
      hy: 'Գայանեն մշակում է դպրոցական ծրագրեր և խորհրդում պատասխանատու է կրթական ուղղության համար։',
      en: 'Gayane designs school curricula and leads the education direction on the board.',
      ru: 'Гаяне разрабатывает школьные программы и отвечает в правлении за образовательное направление.',
    },
  },
  {
    id: 'vahe',
    photo: photo('men/61'),
    since: 2020,
    name: { hy: 'Վահե Ղազարյան', en: 'Vahe Ghazaryan', ru: 'Ваге Казарян' },
    role: { hy: 'Գանձապահ', en: 'Treasurer', ru: 'Казначей' },
    occupation: { hy: 'Ֆինանսիստ', en: 'Financial analyst', ru: 'Финансовый аналитик' },
    bio: {
      hy: 'Վահեն վերահսկում է կազմակերպության բյուջեն և ապահովում է, որ յուրաքանչյուր նվիրատվություն օգտագործվի թափանցիկ։',
      en: 'Vahe oversees the budget and makes sure every donation is used transparently.',
      ru: 'Ваге контролирует бюджет организации и следит за тем, чтобы каждое пожертвование использовалось прозрачно.',
    },
  },
  {
    id: 'ani',
    photo: photo('women/33'),
    since: 2021,
    name: { hy: 'Անի Բաղդասարյան', en: 'Ani Baghdasaryan', ru: 'Ани Багдасарян' },
    role: { hy: 'Քարտուղար', en: 'Secretary', ru: 'Секретарь' },
    occupation: { hy: 'Իրավաբան', en: 'Lawyer', ru: 'Юрист' },
    bio: {
      hy: 'Անին հետևում է խորհրդի որոշումների իրավական կողմին և վարում նիստերի արձանագրությունները։',
      en: 'Ani looks after the legal side of the board’s decisions and keeps the minutes of its meetings.',
      ru: 'Ани следит за юридической стороной решений правления и ведёт протоколы заседаний.',
    },
  },
  {
    id: 'karen',
    photo: photo('men/85'),
    since: 2022,
    name: { hy: 'Կարեն Մելքոնյան', en: 'Karen Melkonyan', ru: 'Карен Мелконян' },
    role: { hy: 'Խորհրդի անդամ', en: 'Board member', ru: 'Член правления' },
    occupation: { hy: 'Լրագրող', en: 'Journalist', ru: 'Журналист' },
    bio: {
      hy: 'Կարենը օգնում է մեր հոդվածներին ու փոդքաստին հասնել ավելի լայն լսարանի։',
      en: 'Karen helps our articles and podcast reach a wider audience.',
      ru: 'Карен помогает нашим статьям и подкасту найти более широкую аудиторию.',
    },
  },
  {
    id: 'sona',
    photo: photo('women/21'),
    since: 2023,
    name: { hy: 'Սոնա Խաչատրյան', en: 'Sona Khachatryan', ru: 'Сона Хачатрян' },
    role: { hy: 'Խորհրդի անդամ', en: 'Board member', ru: 'Член правления' },
    occupation: { hy: 'Սոցիալական ձեռներեց', en: 'Social entrepreneur', ru: 'Социальный предприниматель' },
    bio: {
      hy: 'Սոնան մարզերում հիմնել է մի քանի երիտասարդական կենտրոն և կիսվում է այդ փորձով։',
      en: 'Sona has founded several youth centers in the regions and shares that experience with us.',
      ru: 'Сона основала несколько молодёжных центров в регионах и делится этим опытом.',
    },
  },
  {
    id: 'levon',
    photo: photo('men/12'),
    since: 2024,
    name: { hy: 'Լևոն Զաքարյան', en: 'Levon Zakaryan', ru: 'Левон Закарян' },
    role: { hy: 'Խորհրդի անդամ', en: 'Board member', ru: 'Член правления' },
    occupation: { hy: 'Ծրագրավորող', en: 'Software engineer', ru: 'Программист' },
    bio: {
      hy: 'Լևոնը խորհրդատվություն է տալիս թվային գործիքների և մեր կայքի զարգացման հարցերում։',
      en: 'Levon advises on digital tools and the development of our website.',
      ru: 'Левон консультирует по цифровым инструментам и развитию нашего сайта.',
    },
  },
];

/** Plain, single-language version passed to the React island. */
export type BoardCard = Omit<BoardMember, 'name' | 'role' | 'occupation' | 'bio' | 'quote'> & {
  name: string;
  role: string;
  occupation: string;
  bio: string;
  quote?: string;
};

export const getBoard = (lang: Language): BoardCard[] =>
  board.map((m) => ({
    ...m,
    name: m.name[lang],
    role: m.role[lang],
    occupation: m.occupation[lang],
    bio: m.bio[lang],
    quote: m.quote?.[lang],
  }));
