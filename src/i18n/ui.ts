/**
 * All interface text, per language.
 * `hy` is the source; `en` and `ru` must have exactly the same shape (TypeScript checks this).
 * Placeholders like {year} or {q} are filled with `fill()` from '@/i18n'.
 */

const hy = {
  siteName: 'Անկախության սերունդ',
  logoLines: ['Անկախության', 'սերունդ'],
  tagline: 'Երիտասարդների ձայնը, պատմությունը և ապագան',
  description:
    'Անկախության սերունդ — հոդվածներ, պատմություններ և նախաձեռնություններ Հայաստանի անկախության տարիներին ծնված և մեծացած սերնդի մասին։',

  common: {
    skipToContent: 'Անցնել բովանդակությանը',
    mainMenu: 'Գլխավոր մենյու',
    language: 'Լեզու',
    donate: 'Նվիրաբերել',
    openMenu: 'Բացել մենյուն',
    closeMenu: 'Փակել',
    siteNavigation: 'Կայքի նավիգացիա',
    readMore: 'Կարդալ ավելին',
    previous: 'Նախորդը',
    next: 'Հաջորդը',
  },

  nav: {
    about: 'Մեր մասին',
    team: 'Մեր թիմը',
    board: 'Խորհրդի կազմ',
    mission: 'Առաքելություն',
    history: 'Մեր պատմությունը',
    programs: 'Ծրագրեր',
    citizen: 'Անկախության Քաղաքացի',
    power: 'Անկախության ուժը',
    resources: 'Ռեսուրսներ',
    articles: 'Հոդվածներ',
    annualReports: 'Տարեկան հաշվետվություններ',
    faq: 'Հաճախ տրվող հարցեր',
    podcast: 'Անկախ փոդքաստ',
    join: 'Միացիր մեզ',
    donate: 'Նվիրաբերել',
    volunteer: 'Դառնալ կամավոր',
    contact: 'Կապ',
  },

  categories: {
    history: 'Պատմություն',
    education: 'Կրթություն',
    culture: 'Մշակույթ',
    society: 'Հասարակություն',
  },

  hero: {
    /** one entry per line */
    title: ['Անկախության', 'սերունդ'],
    subtitle: 'Միասին կերտենք ուժեղ և անկախ Հայաստան',
    ctaArticles: 'Կարդալ հոդվածները',
    ctaVolunteer: 'Դառնալ կամավոր',
    slideLabel: 'Սլայդ {n}՝ {total}-ից',
    pause: 'Դադարեցնել սլայդները',
    play: 'Միացնել սլայդները',
    slides: [
      'Ծրագրի մասնակիցները հավաստագրերով այգում',
      'Երիտասարդների խումբը հայկական դրոշով դիտակետում',
      'Թիմի անդամները ձյունապատ լեռների ֆոնին',
      'Խումբը հայկական դրոշով լեռան գագաթին',
      'Աշակերտները հավաստագրերով դպրոցի մոտ',
    ],
  },

  stats: [
    'թվականից սկսվում է մեր սերնդի պատմությունը',
    'հրապարակված հոդված և հարցազրույց',
    'երիտասարդ ընթերցող ամեն ամիս',
  ],

  support: {
    eyebrow: 'նվիրատվություն',
    title: 'Ուզո՞ւմ եք օգնել',
    text: 'Ձեր նվիրատվությունն օգնում է շարունակել կրթական ծրագրերը, հրատարակել նոր հոդվածներ և կազմակերպել միջոցառումներ երիտասարդների համար։',
  },

  donate: {
    raised: 'Հավաքվել է',
    goal: 'Նպատակ՝',
    chooseAmount: 'Ընտրեք գումարը',
    otherAmount: 'Այլ գումար',
    name: 'Անուն *',
    email: 'Էլ. հասցե *',
    total: 'Ընդամենը՝',
    submit: 'Նվիրաբերել',
    thanks: 'Շնորհակալություն 💛',
    demoNote: 'Սա ցուցադրական ձև է․ վճարային համակարգը դեռ միացված չէ։',
    back: 'Վերադառնալ',
  },

  involved: {
    eyebrow: 'միացիր մեզ',
    title: 'Յուրաքանչյուր պատմություն կարևոր է․ օգնիր մեզ պահպանել դրանք',
    volunteer: 'Կամավորություն',
    write: 'Գրիր մեզ համար',
    attend: 'Մասնակցիր միջոցառման',
  },

  about: {
    years: 'տարի անկախություն',
    eyebrow: 'ովքեր ենք մենք',
    title: 'Միավորվենք՝ պատմելու մեր սերնդի պատմությունը',
    text: '«Անկախության սերունդ»-ը հասարակական նախաձեռնություն է, որի առաքելությունն է հավաքել, պահպանել և տարածել անկախության տարիներին ծնված սերնդի պատմությունները, ինչպես նաև աջակցել երիտասարդների կրթական և քաղաքացիական նախաձեռնություններին։',
    more: 'Ավելին մեր մասին',
  },

  programs: {
    eyebrow: 'ինչ ենք անում',
    title: 'Ինչով ենք օգնում',
    items: [
      { title: 'Պատմության էջեր', text: 'Վերհիշում ենք անկախության առաջին տարիները՝ մարդկանց պատմությունների միջոցով։' },
      { title: 'Կրթական ծրագրեր', text: 'Դասախոսություններ և դասընթացներ դպրոցականների ու ուսանողների համար։' },
      { title: 'Մշակութային կյանք', text: 'Գրականություն, երաժշտություն և արվեստ՝ նոր սերնդի աչքերով։' },
      { title: 'Քաղաքացիական ակտիվություն', text: 'Աջակցում ենք երիտասարդական նախաձեռնություններին ամբողջ Հայաստանում։' },
    ],
  },

  events: {
    all: 'Բոլոր միջոցառումները →',
    eyebrow: 'միջոցառումներ',
    title: 'Առաջիկա միջոցառումներ',
    items: [
      { day: '21', month: 'Սեպ', title: 'Անկախության օրվա երիտասարդական հավաք', place: 'Երևան' },
      { day: '16', month: 'Նոյ', title: 'Բանավոր պատմության աշխատարան ուսանողների համար', place: 'Գյումրի' },
      { day: '05', month: 'Դեկ', title: '«Իմ սերնդի պատմությունը» շարադրությունների մրցույթ', place: 'Առցանց' },
    ],
  },

  latest: {
    all: 'Բոլոր հոդվածները',
    eyebrow: 'հոդվածներ',
    title: 'Վերջին հոդվածները',
  },

  faq: {
    eyebrow: 'հարցեր',
    title: 'Հաճախ տրվող հարցեր',
    text: 'Չգտա՞ք պատասխանը։ Գրեք մեզ, և մենք սիրով կպատասխանենք։',
    contact: 'Կապվել մեզ հետ',
    items: [
      {
        q: 'Ի՞նչ է «Անկախության սերունդ» նախաձեռնությունը',
        a: 'Դա հարթակ է, որտեղ հավաքում և հրապարակում ենք Հայաստանի անկախության տարիներին ծնված ու մեծացած սերնդի պատմությունները, մտքերը և նախաձեռնությունները։',
      },
      {
        q: 'Կարո՞ղ եմ ես էլ հոդված գրել',
        a: 'Այո։ Ուղարկեք ձեր հոդվածը կամ գաղափարը մեր էլ. հասցեին, և խմբագրական թիմը կկապվի ձեզ հետ մեկ շաբաթվա ընթացքում։',
      },
      {
        q: 'Ինչպե՞ս դառնալ կամավոր',
        a: 'Լրացրեք կամավորի հայտը «Միացիր մեզ» բաժնում։ Մենք ներգրավում ենք կամավորների միջոցառումների, թարգմանությունների և լուսանկարչության մեջ։',
      },
      {
        q: 'Ինչպե՞ս են օգտագործվում նվիրատվությունները',
        a: 'Բոլոր նվիրատվություններն ուղղվում են կրթական ծրագրերին, միջոցառումների կազմակերպմանը և կայքի զարգացմանը։ Տարեկան հաշվետվությունը հրապարակվում է կայքում։',
      },
    ],
  },

  partners: {
    eyebrow: 'գործընկերներ',
    title: 'Շնորհակալություն մեր գործընկերներին',
    text: 'Մենք երախտապարտ ենք բոլոր անհատներին, կազմակերպություններին և ընկերներին, ովքեր մեզ հետ են։ Միասին մենք պահպանում ենք մի ամբողջ սերնդի հիշողությունը։',
    logoAlt: 'Գործընկերոջ լոգո',
  },

  footer: {
    ctaEyebrow: 'միացիր մեզ',
    ctaTitle: 'Ստեղծենք տարբերություն միասին',
    navigation: 'Նավիգացիա',
    articles: 'Հոդվածներ',
    contact: 'Կապ',
    copyright: '© {year} {name}։ Բոլոր իրավունքները պաշտպանված են։',
  },

  team: {
    eyebrow: 'մեր թիմը',
    title: 'Մարդիկ, ովքեր պահում են պատմությունը',
    subtitle: 'Մենք երիտասարդների, մանկավարժների և ստեղծագործողների թիմ ենք, որոնց միավորում է մեկ նպատակ՝ պահպանել ու տարածել անկախության սերնդի պատմությունները։',
    description: 'Ծանոթացեք «Անկախության սերունդ» նախաձեռնության թիմին։',
    leadership: 'Ղեկավարություն',
    members: 'Թիմ',
    more: 'Ավելին',
    close: 'Փակել',
    joinTitle: 'Ուզո՞ւմ եք միանալ մեր թիմին',
    joinText: 'Մենք միշտ փնտրում ենք նոր մարդկանց, ովքեր պատրաստ են իրենց ժամանակն ու գաղափարները նվիրել ընդհանուր գործին։',
    joinButton: 'Դառնալ կամավոր',
  },

  board: {
    eyebrow: 'խորհրդի կազմ',
    title: 'Նրանք, ովքեր ուղղություն են տալիս',
    subtitle: 'Խորհուրդը սահմանում է կազմակերպության ռազմավարությունը, հետևում է ֆինանսների թափանցիկությանը և օգնում է թիմին հավատարիմ մնալ մեր առաքելությանը։',
    description: 'Ծանոթացեք «Անկախության սերունդ» նախաձեռնության խորհրդի կազմին։',
    membersTitle: 'Խորհրդի անդամներ',
    since: 'Խորհրդում՝ {year}-ից',
    more: 'Ավելին',
    less: 'Թաքցնել',
    howTitle: 'Ինչպես է աշխատում խորհուրդը',
    facts: [
      { value: '7', label: 'անդամ՝ տարբեր մասնագիտություններից' },
      { value: '4', label: 'նիստ տարեկան, որոնց որոշումները հրապարակվում են' },
      { value: '3', label: 'տարի՝ անդամակցության ժամկետը' },
      { value: '0', label: 'վարձատրություն. անդամները կամավոր են' },
    ],
  },

  blog: {
    eyebrow: 'բլոգ',
    title: 'Հոդվածներ',
    subtitle: 'Պատմություններ, հարցազրույցներ և մտքեր անկախության սերնդի մասին',
    description: 'Հոդվածներ, հուշեր և հարցազրույցներ անկախության սերնդի մասին։',
    searchTitle: 'Որոնում',
    searchLabel: 'Որոնում',
    searchPlaceholder: 'Որոնել հոդվածներ…',
    searchButton: 'Որոնել',
    results: '«{q}» որոնման արդյունքներ՝ {n}',
    pagination: 'Էջավորում',
    notFound: 'Հոդվածներ չեն գտնվել',
    seeAll: 'Տեսնել բոլորը',
  },

  article: {
    share: 'Կիսվել',
    copyLink: 'Պատճենել հղումը',
    linkCopied: 'Հղումը պատճենվեց',
    minRead: '{n} րոպե ընթերցանություն',
    allArticles: '← Բոլոր հոդվածները',
  },

  notFound: {
    title: 'Էջը չի գտնվել',
    text: 'Հնարավոր է՝ էջը տեղափոխվել է կամ այլևս գոյություն չունի։',
    home: 'Գլխավոր էջ',
    articles: 'Հոդվածներ',
  },
};

export type Dictionary = typeof hy;

const en: Dictionary = {
  siteName: 'Generation of Independence',
  logoLines: ['Generation of', 'Independence'],
  tagline: 'The voice, history, and future of young people',
  description:
    'Generation of Independence: articles, stories, and initiatives about the generation born and raised during the years of Armenia’s independence.',

  common: {
    skipToContent: 'Skip to content',
    mainMenu: 'Main menu',
    language: 'Language',
    donate: 'Donate',
    openMenu: 'Open menu',
    closeMenu: 'Close',
    siteNavigation: 'Site navigation',
    readMore: 'Read more',
    previous: 'Previous',
    next: 'Next',
  },

  nav: {
    about: 'About us',
    team: 'Our team',
    board: 'Board',
    mission: 'Mission',
    history: 'Our story',
    programs: 'Programs',
    citizen: 'Citizen of Independence',
    power: 'The Power of Independence',
    resources: 'Resources',
    articles: 'Articles',
    annualReports: 'Annual reports',
    faq: 'FAQ',
    podcast: 'Ankakh podcast',
    join: 'Join us',
    donate: 'Donate',
    volunteer: 'Become a volunteer',
    contact: 'Contact',
  },

  categories: {
    history: 'History',
    education: 'Education',
    culture: 'Culture',
    society: 'Society',
  },

  hero: {
    /** one entry per line */
    title: ['Generation of', 'Independence'],
    subtitle: 'Together, let’s build a strong and independent Armenia',
    ctaArticles: 'Read articles',
    ctaVolunteer: 'Become a volunteer',
    slideLabel: 'Slide {n} of {total}',
    pause: 'Pause slideshow',
    play: 'Play slideshow',
    slides: [
      'Programme participants holding their certificates in a park',
      'A group of young people with the Armenian flag at a viewpoint',
      'Team members in front of snowy mountains',
      'A group with the Armenian flag on a mountain top',
      'Students with their certificates outside a school',
    ],
  },

  stats: [
    'the year our generation’s story begins',
    'published articles and interviews',
    'young readers every month',
  ],

  support: {
    eyebrow: 'support',
    title: 'Would you like to help?',
    text: 'Your donation helps us continue our educational programs, publish new articles, and organize events for young people.',
  },

  donate: {
    raised: 'Raised',
    goal: 'Goal:',
    chooseAmount: 'Choose an amount',
    otherAmount: 'Other amount',
    name: 'Name *',
    email: 'Email *',
    total: 'Total:',
    submit: 'Donate',
    thanks: 'Thank you 💛',
    demoNote: 'This is a demo form. No payment system is connected yet.',
    back: 'Go back',
  },

  involved: {
    eyebrow: 'join us',
    title: 'Every story matters. Help us preserve them',
    volunteer: 'Volunteer',
    write: 'Write for us',
    attend: 'Attend an event',
  },

  about: {
    years: 'years of independence',
    eyebrow: 'who we are',
    title: 'Let’s come together to tell our generation’s story',
    text: 'Generation of Independence is a civic initiative whose mission is to collect, preserve, and share the stories of the generation born during the years of independence, and to support young people’s educational and civic initiatives.',
    more: 'More about us',
  },

  programs: {
    eyebrow: 'what we do',
    title: 'How we help',
    items: [
      { title: 'Pages of history', text: 'We revisit the first years of independence through people’s stories.' },
      { title: 'Education programs', text: 'Lectures and courses for school and university students.' },
      { title: 'Cultural life', text: 'Literature, music, and art through the eyes of a new generation.' },
      { title: 'Civic engagement', text: 'We support youth initiatives all across Armenia.' },
    ],
  },

  events: {
    all: 'All events →',
    eyebrow: 'events',
    title: 'Upcoming events',
    items: [
      { day: '21', month: 'Sep', title: 'Independence Day youth gathering', place: 'Yerevan' },
      { day: '16', month: 'Nov', title: 'Oral history workshop for students', place: 'Gyumri' },
      { day: '05', month: 'Dec', title: '“My Generation’s Story” essay contest', place: 'Online' },
    ],
  },

  latest: {
    all: 'All articles',
    eyebrow: 'articles',
    title: 'Latest articles',
  },

  faq: {
    eyebrow: 'questions',
    title: 'Frequently asked questions',
    text: 'Didn’t find the answer? Write to us and we’ll be happy to reply.',
    contact: 'Contact us',
    items: [
      {
        q: 'What is the Generation of Independence initiative?',
        a: 'It is a platform where we collect and publish the stories, thoughts, and initiatives of the generation born and raised during the years of Armenia’s independence.',
      },
      {
        q: 'Can I write an article too?',
        a: 'Yes. Send your article or idea to our email address, and the editorial team will get back to you within a week.',
      },
      {
        q: 'How do I become a volunteer?',
        a: 'Fill out the volunteer application in the “Join us” section. Our volunteers help with events, translations, and photography.',
      },
      {
        q: 'How are donations used?',
        a: 'All donations go to educational programs, organizing events, and developing the website. An annual report is published on the site.',
      },
    ],
  },

  partners: {
    eyebrow: 'partners',
    title: 'Thank you to our partners',
    text: 'We are grateful to all the individuals, organizations, and friends who stand with us. Together we preserve the memory of an entire generation.',
    logoAlt: 'Partner logo',
  },

  footer: {
    ctaEyebrow: 'join us',
    ctaTitle: 'Let’s make a difference together',
    navigation: 'Navigation',
    articles: 'Articles',
    contact: 'Contact',
    copyright: '© {year} {name}. All rights reserved.',
  },

  team: {
    eyebrow: 'our team',
    title: 'The people who keep the story',
    subtitle: 'We are a team of young people, educators and creators united by one goal: to keep and share the stories of the independence generation.',
    description: 'Meet the team behind Ankakhutyan Serund.',
    leadership: 'Leadership',
    members: 'Team',
    more: 'More',
    close: 'Close',
    joinTitle: 'Want to join our team?',
    joinText: 'We are always looking for people ready to give their time and ideas to a shared cause.',
    joinButton: 'Become a volunteer',
  },

  board: {
    eyebrow: 'board',
    title: 'The people who set the direction',
    subtitle: 'The board sets the organization’s strategy, keeps its finances transparent and helps the team stay true to our mission.',
    description: 'Meet the board of Ankakhutyan Serund.',
    membersTitle: 'Board members',
    since: 'On the board since {year}',
    more: 'More',
    less: 'Less',
    howTitle: 'How the board works',
    facts: [
      { value: '7', label: 'members from different professions' },
      { value: '4', label: 'meetings a year, with published decisions' },
      { value: '3', label: 'year term for each member' },
      { value: '0', label: 'pay: board members are volunteers' },
    ],
  },

  blog: {
    eyebrow: 'blog',
    title: 'Articles',
    subtitle: 'Stories, interviews, and reflections about the generation of independence',
    description: 'Articles, memories, and interviews about the generation of independence.',
    searchTitle: 'Search',
    searchLabel: 'Search',
    searchPlaceholder: 'Search articles…',
    searchButton: 'Search',
    results: 'Results for “{q}”: {n}',
    pagination: 'Pagination',
    notFound: 'No articles found',
    seeAll: 'See all',
  },

  article: {
    share: 'Share',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    minRead: '{n} min read',
    allArticles: '← All articles',
  },

  notFound: {
    title: 'Page not found',
    text: 'The page may have been moved or no longer exists.',
    home: 'Home page',
    articles: 'Articles',
  },
};

const ru: Dictionary = {
  siteName: 'Поколение независимости',
  logoLines: ['Поколение', 'независимости'],
  tagline: 'Голос, история и будущее молодёжи',
  description:
    'Поколение независимости: статьи, истории и инициативы о поколении, родившемся и выросшем в годы независимости Армении.',

  common: {
    skipToContent: 'Перейти к содержимому',
    mainMenu: 'Главное меню',
    language: 'Язык',
    donate: 'Поддержать',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть',
    siteNavigation: 'Навигация по сайту',
    readMore: 'Читать далее',
    previous: 'Назад',
    next: 'Вперёд',
  },

  nav: {
    about: 'О нас',
    team: 'Наша команда',
    board: 'Состав правления',
    mission: 'Миссия',
    history: 'Наша история',
    programs: 'Программы',
    citizen: 'Гражданин независимости',
    power: 'Сила независимости',
    resources: 'Ресурсы',
    articles: 'Статьи',
    annualReports: 'Годовые отчёты',
    faq: 'Частые вопросы',
    podcast: 'Подкаст «Анках»',
    join: 'Присоединяйтесь',
    donate: 'Пожертвовать',
    volunteer: 'Стать волонтёром',
    contact: 'Контакты',
  },

  categories: {
    history: 'История',
    education: 'Образование',
    culture: 'Культура',
    society: 'Общество',
  },

  hero: {
    /** one entry per line */
    title: ['Поколение', 'независимости'],
    subtitle: 'Вместе построим сильную и независимую Армению',
    ctaArticles: 'Читать статьи',
    ctaVolunteer: 'Стать волонтёром',
    slideLabel: 'Слайд {n} из {total}',
    pause: 'Остановить слайд-шоу',
    play: 'Запустить слайд-шоу',
    slides: [
      'Участники программы с сертификатами в парке',
      'Группа молодёжи с армянским флагом на смотровой площадке',
      'Члены команды на фоне заснеженных гор',
      'Группа с армянским флагом на вершине горы',
      'Школьники с сертификатами у школы',
    ],
  },

  stats: [
    'год, с которого начинается история нашего поколения',
    'опубликованных статей и интервью',
    'молодых читателей ежемесячно',
  ],

  support: {
    eyebrow: 'поддержка',
    title: 'Хотите помочь?',
    text: 'Ваше пожертвование помогает продолжать образовательные программы, публиковать новые статьи и проводить мероприятия для молодёжи.',
  },

  donate: {
    raised: 'Собрано',
    goal: 'Цель:',
    chooseAmount: 'Выберите сумму',
    otherAmount: 'Другая сумма',
    name: 'Имя *',
    email: 'Эл. почта *',
    total: 'Итого:',
    submit: 'Пожертвовать',
    thanks: 'Спасибо 💛',
    demoNote: 'Это демонстрационная форма: платёжная система ещё не подключена.',
    back: 'Вернуться',
  },

  involved: {
    eyebrow: 'присоединяйтесь',
    title: 'Каждая история важна. Помогите нам сохранить их',
    volunteer: 'Волонтёрство',
    write: 'Пишите для нас',
    attend: 'Придите на мероприятие',
  },

  about: {
    years: 'лет независимости',
    eyebrow: 'кто мы',
    title: 'Объединимся, чтобы рассказать историю нашего поколения',
    text: '«Поколение независимости» — общественная инициатива, миссия которой — собирать, сохранять и распространять истории поколения, родившегося в годы независимости, а также поддерживать образовательные и гражданские инициативы молодёжи.',
    more: 'Подробнее о нас',
  },

  programs: {
    eyebrow: 'что мы делаем',
    title: 'Чем мы помогаем',
    items: [
      { title: 'Страницы истории', text: 'Вспоминаем первые годы независимости через истории людей.' },
      { title: 'Образовательные программы', text: 'Лекции и курсы для школьников и студентов.' },
      { title: 'Культурная жизнь', text: 'Литература, музыка и искусство глазами нового поколения.' },
      { title: 'Гражданская активность', text: 'Поддерживаем молодёжные инициативы по всей Армении.' },
    ],
  },

  events: {
    all: 'Все мероприятия →',
    eyebrow: 'мероприятия',
    title: 'Предстоящие мероприятия',
    items: [
      { day: '21', month: 'сен', title: 'Молодёжная встреча ко Дню независимости', place: 'Ереван' },
      { day: '16', month: 'ноя', title: 'Мастерская устной истории для студентов', place: 'Гюмри' },
      { day: '05', month: 'дек', title: 'Конкурс сочинений «История моего поколения»', place: 'Онлайн' },
    ],
  },

  latest: {
    all: 'Все статьи',
    eyebrow: 'статьи',
    title: 'Последние статьи',
  },

  faq: {
    eyebrow: 'вопросы',
    title: 'Часто задаваемые вопросы',
    text: 'Не нашли ответа? Напишите нам, и мы с радостью ответим.',
    contact: 'Связаться с нами',
    items: [
      {
        q: 'Что такое инициатива «Поколение независимости»?',
        a: 'Это платформа, на которой мы собираем и публикуем истории, мысли и инициативы поколения, родившегося и выросшего в годы независимости Армении.',
      },
      {
        q: 'Могу ли я тоже написать статью?',
        a: 'Да. Отправьте свою статью или идею на нашу электронную почту, и редакция свяжется с вами в течение недели.',
      },
      {
        q: 'Как стать волонтёром?',
        a: 'Заполните анкету волонтёра в разделе «Присоединяйтесь». Мы привлекаем волонтёров к проведению мероприятий, переводам и фотосъёмке.',
      },
      {
        q: 'Как используются пожертвования?',
        a: 'Все пожертвования направляются на образовательные программы, организацию мероприятий и развитие сайта. Годовой отчёт публикуется на сайте.',
      },
    ],
  },

  partners: {
    eyebrow: 'партнёры',
    title: 'Спасибо нашим партнёрам',
    text: 'Мы благодарны всем людям, организациям и друзьям, которые с нами. Вместе мы сохраняем память целого поколения.',
    logoAlt: 'Логотип партнёра',
  },

  footer: {
    ctaEyebrow: 'присоединяйтесь',
    ctaTitle: 'Изменим мир к лучшему вместе',
    navigation: 'Навигация',
    articles: 'Статьи',
    contact: 'Контакты',
    copyright: '© {year} {name}. Все права защищены.',
  },

  team: {
    eyebrow: 'наша команда',
    title: 'Люди, которые хранят историю',
    subtitle: 'Мы — команда молодых людей, педагогов и авторов, которых объединяет одна цель: сохранять и рассказывать истории поколения независимости.',
    description: 'Познакомьтесь с командой «Поколения независимости».',
    leadership: 'Руководство',
    members: 'Команда',
    more: 'Подробнее',
    close: 'Закрыть',
    joinTitle: 'Хотите присоединиться к команде?',
    joinText: 'Мы всегда ищем людей, готовых посвятить своё время и идеи общему делу.',
    joinButton: 'Стать волонтёром',
  },

  board: {
    eyebrow: 'правление',
    title: 'Люди, которые задают направление',
    subtitle: 'Правление определяет стратегию организации, следит за прозрачностью финансов и помогает команде оставаться верной нашей миссии.',
    description: 'Познакомьтесь с составом правления «Поколения независимости».',
    membersTitle: 'Члены правления',
    since: 'В правлении с {year} года',
    more: 'Подробнее',
    less: 'Скрыть',
    howTitle: 'Как работает правление',
    facts: [
      { value: '7', label: 'членов разных профессий' },
      { value: '4', label: 'заседания в год с публикацией решений' },
      { value: '3', label: 'года — срок полномочий' },
      { value: '0', label: 'оплаты: члены правления — волонтёры' },
    ],
  },

  blog: {
    eyebrow: 'блог',
    title: 'Статьи',
    subtitle: 'Истории, интервью и размышления о поколении независимости',
    description: 'Статьи, воспоминания и интервью о поколении независимости.',
    searchTitle: 'Поиск',
    searchLabel: 'Поиск',
    searchPlaceholder: 'Искать статьи…',
    searchButton: 'Найти',
    results: 'Результаты поиска «{q}»: {n}',
    pagination: 'Страницы',
    notFound: 'Статьи не найдены',
    seeAll: 'Показать все',
  },

  article: {
    share: 'Поделиться',
    copyLink: 'Копировать ссылку',
    linkCopied: 'Ссылка скопирована',
    minRead: '{n} мин. чтения',
    allArticles: '← Все статьи',
  },

  notFound: {
    title: 'Страница не найдена',
    text: 'Возможно, страница была перемещена или больше не существует.',
    home: 'На главную',
    articles: 'Статьи',
  },
};

export const ui = { hy, en, ru } as const;
