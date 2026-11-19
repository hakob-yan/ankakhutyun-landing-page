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
    history: 'Մեր պատմությունը',
    programs: 'Ծրագրեր',
    citizen: 'Անկախության Քաղաքացի',
    power: 'Անկախության ուժը',
    resources: 'Ռեսուրսներ',
    blog: 'Բլոգ',
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
    ctaBlog: 'Կարդալ բլոգը',
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
    description: 'Աջակցեք «Անկախության սերունդ»-ին․ ձեր նվիրատվությունն օգնում է կրթական ծրագրերին, նոր հոդվածներին և երիտասարդական միջոցառումներին։',
    impactEyebrow: 'ձեր աջակցությունը',
    impactTitle: 'Ինչի՞ն է ուղղվում ձեր նվիրատվությունը',
    impact: [
      { title: 'Կրթական ծրագրեր', text: 'Դասընթացներ, քննարկումներ և աշխատաժողովներ դպրոցականների ու ուսանողների համար։' },
      { title: 'Նոր հոդվածներ', text: 'Անկախության սերնդի պատմությունների, հարցազրույցների և հետազոտությունների հրապարակում։' },
      { title: 'Միջոցառումներ', text: 'Հանդիպումներ, ցուցահանդեսներ և երիտասարդական միջոցառումներ ամբողջ Հայաստանում։' },
    ],
    transparency: 'Մենք թափանցիկ ենք․ նվիրատվությունների մասին տարեկան հաշվետվությունը հրապարակվում է կայքում։',
    otherTitle: 'Աջակցելու այլ ուղիներ',
    otherText: 'Կարող եք օգնել ոչ միայն գումարով․ միացեք մեզ որպես կամավոր կամ գրեք մեզ ձեր գաղափարների մասին։',
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

  power: {
    eyebrow: 'ճամբար',
    title: 'Անկախության ուժը',
    intro: '«Անկախության ուժը» «Անկախության սերունդ»-ի ամառային ուսանողական-երիտասարդական ճամբարն է։ Այն ծնվեց 2020 թվականի պատերազմից հետո՝ որպես պատասխան հուսահատությանը, և այսօր համախմբում է երիտասարդներին հայրենիքի, պետության և անկախության գաղափարի շուրջ։',
    description: '«Անկախության ուժը»՝ «Անկախության սերունդ»-ի ամառային ուսանողական-երիտասարդական ճամբարը։',
    campsHeld: 'ճամբար',
    campsHeldText: 'անցկացրել ենք արդեն',
    camp: 'Անկախության ուժը {n}',
    infoTitle: 'Ինչպես է անցնում ճամբարը',
    info: [
      { title: 'Ամեն ամառ', text: 'Մի քանի օր քաղաքից հեռու՝ ամառային արձակուրդի ընթացքում։' },
      { title: 'Հայաստանի բնության գրկում', text: 'Ճամբարն անցկացվում է Հայաստանի գեղատեսիլ վայրերում, օրինակ՝ Հանքավանում։' },
      { title: 'Երիտասարդներ ամենուրեքից', text: 'Ուսանողներ և երիտասարդներ Հայաստանից, Արցախից և Սփյուռքից։' },
      { title: 'Գաղափարներ և ընկերություն', text: 'Դասախոսություններ, քննարկումներ, գործնական աշխատանք և ժամանց։' },
    ],
    free: 'Մասնակցությունն անվճար է',
    joinTitle: 'Ուզո՞ւմ եք մասնակցել հաջորդ ճամբարին',
    joinText: 'Հետևեք մեզ Instagram-ում, որպեսզի առաջինը իմանաք հաջորդ ճամբարի մասին, կամ գրեք մեզ ձեր հարցերով։',
    follow: 'Հետևել Instagram-ում',
    write: 'Գրել մեզ',
  },

  podcast: {
    eyebrow: 'փոդքաստ',
    title: 'Անկախ փոդքաստ',
    intro: '«Անկախ փոդքաստ»-ը «Անկախության սերունդ»-ի զրույցների շարքն է։ Ամեն թողարկման ընթացքում հյուրի հետ անկեղծ խոսում ենք կրթության, մշակույթի, հասարակության և տեխնոլոգիաների մասին՝ այն հարցերի, որոնք հուզում են մեր սերնդին։',
    description: '«Անկախ փոդքաստ»՝ զրույցներ կրթության, մշակույթի և հասարակության մասին «Անկախության սերունդ»-ից։',
    watchChannel: 'Դիտել YouTube-ում',
    latest: 'Վերջին թողարկումները',
    episode: 'Թողարկում',
    watch: 'Դիտել',
    subscribeTitle: 'Բաժանորդագրվեք մեր ալիքին',
    subscribeText: 'Բաժանորդագրվեք «Անկախ փոդքաստ»-ի YouTube ալիքին, որպեսզի առաջինը տեսնեք նոր թողարկումները։',
    subscribe: 'Բաժանորդագրվել',
    allEpisodes: 'Բոլոր թողարկումները',
  },

  reports: {
    eyebrow: 'թափանցիկություն',
    title: 'Տարեկան հաշվետվություններ',
    intro: 'Մենք հրապարակում ենք մեր տարեկան հաշվետվությունները, որպեսզի յուրաքանչյուր նվիրատու տեսնի, թե ինչպես են օգտագործվում իր միջոցները։',
    description: '«Անկախության սերունդ»-ի տարեկան հաշվետվությունները՝ մեր ծրագրերի և ֆինանսների մասին։',
    reportFor: 'Տարեկան հաշվետվություն',
    download: 'Ներբեռնել PDF',
    empty: 'Առաջին տարեկան հաշվետվությունը շուտով կհրապարակվի այստեղ։',
    questionsTitle: 'Հարցեր ունե՞ք',
    questionsText: 'Եթե ունեք հարցեր մեր ֆինանսների կամ ծրագրերի մասին, գրեք մեզ, և մենք սիրով կպատասխանենք։',
    write: 'Գրել մեզ',
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


  latest: {
    all: 'Բոլոր հրապարակումները',
    eyebrow: 'բլոգ',
    title: 'Վերջին հրապարակումները',
  },

  faq: {
    eyebrow: 'հարցեր',
    title: 'Հաճախ տրվող հարցեր',
    text: 'Չգտա՞ք պատասխանը։ Գրեք մեզ, և մենք սիրով կպատասխանենք։',
    contact: 'Կապվել մեզ հետ',
    items: [
      {
        q: 'Արդյո՞ք «Անկախության սերունդ»-ի ծրագրերն անվճար են',
        a: 'Այո, մեր բոլոր նախաձեռնություններին մասնակցությունն անվճար է։',
      },
      {
        q: 'Կարո՞ղ եմ կամավոր լինել «Անկախության սերունդ»-ում',
        a: 'Այո։ Ուրախ ենք, որ ցանկանում եք որպես կամավոր միանալ մեր թիմին և դրական ազդեցություն ունենալ Հայաստանի գյուղերի վրա։ Խնդրում ենք լրացնել կամավորի հայտադիմումը։',
        // optional link under the answer: linkTo 'volunteer' = volunteer form, 'email' = our email (see FaqSection.astro)
        linkLabel: 'Լրացնել հայտադիմումը',
        linkTo: 'volunteer',
      },
      {
        q: 'Կարո՞ղ են անհատները կամ կազմակերպությունները համագործակցել «Անկախության սերունդ»-ի հետ',
        a: 'Այո, մենք բաց ենք համագործակցության համար։ Եթե ունեք գաղափար կամ առաջարկ, գրեք մեզ, և մենք սիրով կքննարկենք այն։',
        linkLabel: 'Գրել մեզ',
        linkTo: 'email',
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
    blog: 'Բլոգ',
    contact: 'Կապ',
    copyright: '© {year} {name}։ Բոլոր իրավունքները պաշտպանված են։',
    faq: 'ՀՏՀ',
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
      { value: '3', label: 'անդամ, բոլորը՝ պատմաբաններ' },
      { value: '4', label: 'նիստ տարեկան, որոնց որոշումները հրապարակվում են' },
      { value: '3', label: 'տարի՝ անդամակցության ժամկետը' },
      { value: '0', label: 'վարձատրություն. անդամները կամավոր են' },
    ],
  },

  blog: {
    eyebrow: 'բլոգ',
    title: 'Բլոգ',
    subtitle: 'Պատմություններ, հարցազրույցներ և մտքեր անկախության սերնդի մասին',
    description: 'Հոդվածներ, հուշեր և հարցազրույցներ անկախության սերնդի մասին։',
    searchTitle: 'Որոնում',
    searchLabel: 'Որոնում',
    searchPlaceholder: 'Որոնել բլոգում…',
    searchButton: 'Որոնել',
    results: '«{q}» որոնման արդյունքներ՝ {n}',
    pagination: 'Էջավորում',
    notFound: 'Հրապարակումներ չեն գտնվել',
    seeAll: 'Տեսնել բոլորը',
  },

  article: {
    share: 'Կիսվել',
    copyLink: 'Պատճենել հղումը',
    linkCopied: 'Հղումը պատճենվեց',
    minRead: '{n} րոպե ընթերցանություն',
    allPosts: '← Բոլոր հրապարակումները',
  },

  notFound: {
    title: 'Էջը չի գտնվել',
    text: 'Հնարավոր է՝ էջը տեղափոխվել է կամ այլևս գոյություն չունի։',
    home: 'Գլխավոր էջ',
    blog: 'Բլոգ',
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
    history: 'Our story',
    programs: 'Programs',
    citizen: 'Citizen of Independence',
    power: 'The Power of Independence',
    resources: 'Resources',
    blog: 'Blog',
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
    ctaBlog: 'Read the blog',
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
    description: 'Support Generation of Independence: your donation funds educational programs, new articles and events for young people.',
    impactEyebrow: 'your support',
    impactTitle: 'Where your donation goes',
    impact: [
      { title: 'Educational programs', text: 'Courses, discussions and workshops for school and university students.' },
      { title: 'New articles', text: 'Publishing stories, interviews and research about the independence generation.' },
      { title: 'Events', text: 'Meetups, exhibitions and youth events across Armenia.' },
    ],
    transparency: 'We are transparent: an annual report on all donations is published on the site.',
    otherTitle: 'Other ways to help',
    otherText: 'Money is not the only way to help: join us as a volunteer or write to us with your ideas.',
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

  power: {
    eyebrow: 'camp',
    title: 'The Power of Independence',
    intro: 'The Power of Independence is the summer student and youth camp of Generation of Independence. It was born after the 2020 war as a response to despair, and today it brings young people together around the idea of homeland, state and independence.',
    description: 'The Power of Independence: the summer student and youth camp of Generation of Independence.',
    campsHeld: 'camps',
    campsHeldText: 'held so far',
    camp: 'The Power of Independence {n}',
    infoTitle: 'What the camp is like',
    info: [
      { title: 'Every summer', text: 'A few days away from the city during the summer holidays.' },
      { title: 'In Armenia’s nature', text: 'The camp takes place in beautiful parts of Armenia, such as Hankavan.' },
      { title: 'Young people from everywhere', text: 'Students and young people from Armenia, Artsakh and the Diaspora.' },
      { title: 'Ideas and friendship', text: 'Lectures, discussions, hands-on work and fun.' },
    ],
    free: 'Taking part is free',
    joinTitle: 'Want to join the next camp?',
    joinText: 'Follow us on Instagram to be the first to hear about the next camp, or write to us with your questions.',
    follow: 'Follow on Instagram',
    write: 'Write to us',
  },

  podcast: {
    eyebrow: 'podcast',
    title: 'Ankakh podcast',
    intro: 'Ankakh podcast is a series of conversations from Generation of Independence. In every episode we talk openly with a guest about education, culture, society and technology: the questions that matter to our generation.',
    description: 'Ankakh podcast: conversations about education, culture and society from Generation of Independence.',
    watchChannel: 'Watch on YouTube',
    latest: 'Latest episodes',
    episode: 'Episode',
    watch: 'Watch',
    subscribeTitle: 'Subscribe to our channel',
    subscribeText: 'Subscribe to the Ankakh podcast YouTube channel to be the first to see new episodes.',
    subscribe: 'Subscribe',
    allEpisodes: 'All episodes',
  },

  reports: {
    eyebrow: 'transparency',
    title: 'Annual reports',
    intro: 'We publish our annual reports so that every donor can see how their support is used.',
    description: 'Annual reports of Generation of Independence: our programs and finances.',
    reportFor: 'Annual report',
    download: 'Download PDF',
    empty: 'Our first annual report will be published here soon.',
    questionsTitle: 'Have questions?',
    questionsText: 'If you have questions about our finances or programs, write to us and we will be happy to answer.',
    write: 'Write to us',
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


  latest: {
    all: 'All posts',
    eyebrow: 'blog',
    title: 'Latest posts',
  },

  faq: {
    eyebrow: 'questions',
    title: 'Frequently asked questions',
    text: 'Didn’t find the answer? Write to us and we’ll be happy to reply.',
    contact: 'Contact us',
    items: [
      {
        q: 'Are the Generation of Independence programs free?',
        a: 'Yes, taking part in all of our initiatives is free of charge.',
      },
      {
        q: 'Can I volunteer with Generation of Independence?',
        a: 'Yes! We are glad you want to join our team as a volunteer and make a positive impact on the villages of Armenia. Please fill out the volunteer application form.',
        linkLabel: 'Fill out the application',
        linkTo: 'volunteer',
      },
      {
        q: 'Can individuals or organizations partner with Generation of Independence?',
        a: 'Yes, we are open to partnerships. If you have an idea or a proposal, write to us and we will be happy to discuss it.',
        linkLabel: 'Write to us',
        linkTo: 'email',
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
    blog: 'Blog',
    contact: 'Contact',
    copyright: '© {year} {name}. All rights reserved.',
    faq: 'FAQ',
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
      { value: '3', label: 'members, all of them historians' },
      { value: '4', label: 'meetings a year, with published decisions' },
      { value: '3', label: 'year term for each member' },
      { value: '0', label: 'pay: board members are volunteers' },
    ],
  },

  blog: {
    eyebrow: 'blog',
    title: 'Blog',
    subtitle: 'Stories, interviews, and reflections about the generation of independence',
    description: 'Articles, memories, and interviews about the generation of independence.',
    searchTitle: 'Search',
    searchLabel: 'Search',
    searchPlaceholder: 'Search the blog…',
    searchButton: 'Search',
    results: 'Results for “{q}”: {n}',
    pagination: 'Pagination',
    notFound: 'No posts found',
    seeAll: 'See all',
  },

  article: {
    share: 'Share',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    minRead: '{n} min read',
    allPosts: '← All posts',
  },

  notFound: {
    title: 'Page not found',
    text: 'The page may have been moved or no longer exists.',
    home: 'Home page',
    blog: 'Blog',
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
    history: 'Наша история',
    programs: 'Программы',
    citizen: 'Гражданин независимости',
    power: 'Сила независимости',
    resources: 'Ресурсы',
    blog: 'Блог',
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
    ctaBlog: 'Читать блог',
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
    description: 'Поддержите «Поколение независимости»: ваше пожертвование помогает образовательным программам, новым статьям и мероприятиям для молодёжи.',
    impactEyebrow: 'ваша поддержка',
    impactTitle: 'На что идут пожертвования',
    impact: [
      { title: 'Образовательные программы', text: 'Курсы, дискуссии и мастер-классы для школьников и студентов.' },
      { title: 'Новые статьи', text: 'Публикация историй, интервью и исследований о поколении независимости.' },
      { title: 'Мероприятия', text: 'Встречи, выставки и молодёжные мероприятия по всей Армении.' },
    ],
    transparency: 'Мы открыты: годовой отчёт обо всех пожертвованиях публикуется на сайте.',
    otherTitle: 'Другие способы помочь',
    otherText: 'Помочь можно не только деньгами: присоединяйтесь к нам как волонтёр или напишите нам о своих идеях.',
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

  power: {
    eyebrow: 'лагерь',
    title: 'Сила независимости',
    intro: '«Сила независимости» — летний студенческо-молодёжный лагерь «Поколения независимости». Он появился после войны 2020 года как ответ на отчаяние и сегодня объединяет молодёжь вокруг идеи родины, государства и независимости.',
    description: '«Сила независимости»: летний студенческо-молодёжный лагерь «Поколения независимости».',
    campsHeld: 'лагерей',
    campsHeldText: 'уже провели',
    camp: 'Сила независимости {n}',
    infoTitle: 'Как проходит лагерь',
    info: [
      { title: 'Каждое лето', text: 'Несколько дней вдали от города во время летних каникул.' },
      { title: 'На природе Армении', text: 'Лагерь проходит в живописных местах Армении, например в Анкаване.' },
      { title: 'Молодёжь отовсюду', text: 'Студенты и молодёжь из Армении, Арцаха и диаспоры.' },
      { title: 'Идеи и дружба', text: 'Лекции, дискуссии, практическая работа и отдых.' },
    ],
    free: 'Участие бесплатное',
    joinTitle: 'Хотите попасть в следующий лагерь?',
    joinText: 'Подпишитесь на нас в Instagram, чтобы первыми узнать о следующем лагере, или напишите нам.',
    follow: 'Подписаться в Instagram',
    write: 'Написать нам',
  },

  podcast: {
    eyebrow: 'подкаст',
    title: 'Подкаст «Анках»',
    intro: '«Анках» — серия бесед от «Поколения независимости». В каждом выпуске мы открыто говорим с гостем об образовании, культуре, обществе и технологиях — о вопросах, которые волнуют наше поколение.',
    description: 'Подкаст «Анках»: беседы об образовании, культуре и обществе от «Поколения независимости».',
    watchChannel: 'Смотреть на YouTube',
    latest: 'Последние выпуски',
    episode: 'Выпуск',
    watch: 'Смотреть',
    subscribeTitle: 'Подпишитесь на наш канал',
    subscribeText: 'Подпишитесь на YouTube-канал подкаста «Анках», чтобы первыми смотреть новые выпуски.',
    subscribe: 'Подписаться',
    allEpisodes: 'Все выпуски',
  },

  reports: {
    eyebrow: 'прозрачность',
    title: 'Годовые отчёты',
    intro: 'Мы публикуем годовые отчёты, чтобы каждый жертвователь видел, как используется его поддержка.',
    description: 'Годовые отчёты «Поколения независимости»: наши программы и финансы.',
    reportFor: 'Годовой отчёт',
    download: 'Скачать PDF',
    empty: 'Первый годовой отчёт скоро будет опубликован здесь.',
    questionsTitle: 'Есть вопросы?',
    questionsText: 'Если у вас есть вопросы о наших финансах или программах, напишите нам — мы с радостью ответим.',
    write: 'Написать нам',
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


  latest: {
    all: 'Все публикации',
    eyebrow: 'блог',
    title: 'Последние публикации',
  },

  faq: {
    eyebrow: 'вопросы',
    title: 'Часто задаваемые вопросы',
    text: 'Не нашли ответа? Напишите нам, и мы с радостью ответим.',
    contact: 'Связаться с нами',
    items: [
      {
        q: 'Бесплатны ли программы «Поколения независимости»?',
        a: 'Да, участие во всех наших инициативах бесплатное.',
      },
      {
        q: 'Могу ли я стать волонтёром «Поколения независимости»?',
        a: 'Да! Мы рады, что вы хотите присоединиться к нашей команде как волонтёр и внести позитивный вклад в жизнь сёл Армении. Пожалуйста, заполните анкету волонтёра.',
        linkLabel: 'Заполнить анкету',
        linkTo: 'volunteer',
      },
      {
        q: 'Могут ли частные лица или организации сотрудничать с «Поколением независимости»?',
        a: 'Да, мы открыты к сотрудничеству. Если у вас есть идея или предложение, напишите нам — мы с радостью его обсудим.',
        linkLabel: 'Написать нам',
        linkTo: 'email',
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
    blog: 'Блог',
    contact: 'Контакты',
    copyright: '© {year} {name}. Все права защищены.',
    faq: 'FAQ',
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
      { value: '3', label: 'члена правления, все — историки' },
      { value: '4', label: 'заседания в год с публикацией решений' },
      { value: '3', label: 'года — срок полномочий' },
      { value: '0', label: 'оплаты: члены правления — волонтёры' },
    ],
  },

  blog: {
    eyebrow: 'блог',
    title: 'Блог',
    subtitle: 'Истории, интервью и размышления о поколении независимости',
    description: 'Статьи, воспоминания и интервью о поколении независимости.',
    searchTitle: 'Поиск',
    searchLabel: 'Поиск',
    searchPlaceholder: 'Поиск по блогу…',
    searchButton: 'Найти',
    results: 'Результаты поиска «{q}»: {n}',
    pagination: 'Страницы',
    notFound: 'Публикации не найдены',
    seeAll: 'Показать все',
  },

  article: {
    share: 'Поделиться',
    copyLink: 'Копировать ссылку',
    linkCopied: 'Ссылка скопирована',
    minRead: '{n} мин. чтения',
    allPosts: '← Все публикации',
  },

  notFound: {
    title: 'Страница не найдена',
    text: 'Возможно, страница была перемещена или больше не существует.',
    home: 'На главную',
    blog: 'Блог',
  },
};

export const ui = { hy, en, ru } as const;
