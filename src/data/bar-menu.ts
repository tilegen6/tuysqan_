import type { MenuItem } from "@/types/domain";

export type BarCategoryRow = [
  id: string,
  slug: string,
  nameRu: string,
  nameKk: string,
];

export type BarMenuSeed = [
  categoryId: string,
  slug: string,
  nameRu: string,
  nameKk: string,
  price: number,
  descriptionRu?: string,
  descriptionKk?: string,
  imageUrl?: string,
  flags?: Partial<
    Pick<
      MenuItem,
      "isFeatured" | "isSpicy" | "needsReview" | "pieceCount" | "source"
    >
  >,
];

export const barCategoryRows: BarCategoryRow[] = [
  ["bar-coffee", "bar-coffee", "Кофейные напитки", "Кофе сусындары"],
  ["bar-signature", "bar-signature", "Авторские напитки", "Авторлық сусындар"],
  ["bar-tea", "bar-tea", "Авторские чаи", "Авторлық шайлар"],
  ["bar-lemonades", "bar-lemonades", "Лимонады", "Лимонадтар"],
  ["bar-milkshakes", "bar-milkshakes", "Милкшейки", "Милкшейктер"],
  ["bar-fresh", "bar-fresh", "Фреши", "Фрештер"],
  ["bar-smoothies", "bar-smoothies", "Смузи", "Смузи"],
  ["bar-soft-drinks", "bar-soft-drinks", "Другие напитки", "Басқа сусындар"],
];

function withVolume(text: string, volume?: string) {
  return volume ? `${text} Объём: ${volume}.` : text;
}

function withVolumeKk(text: string, volume?: string) {
  return volume ? `${text} Көлемі: ${volume}.` : text;
}

type CoffeeVariant = {
  slug: string;
  nameRu: string;
  nameKk: string;
  price: number;
  volume?: string;
  temperature?: "hot" | "ice";
};

const coffeeVariants: CoffeeVariant[] = [
  {
    slug: "espresso-hot",
    nameRu: "Эспрессо",
    nameKk: "Эспрессо",
    price: 890,
    temperature: "hot",
  },
  {
    slug: "americano-hot-02",
    nameRu: "Американо, 0,2 л",
    nameKk: "Американо, 0,2 л",
    price: 990,
    volume: "0,2 л",
    temperature: "hot",
  },
  {
    slug: "americano-hot-03",
    nameRu: "Американо, 0,3 л",
    nameKk: "Американо, 0,3 л",
    price: 1090,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "americano-ice-02",
    nameRu: "Айс американо, 0,2 л",
    nameKk: "Айс американо, 0,2 л",
    price: 990,
    volume: "0,2 л",
    temperature: "ice",
  },
  {
    slug: "americano-ice-03",
    nameRu: "Айс американо, 0,3 л",
    nameKk: "Айс американо, 0,3 л",
    price: 1090,
    volume: "0,3 л",
    temperature: "ice",
  },
  {
    slug: "latte-hot-03",
    nameRu: "Латте, 0,3 л",
    nameKk: "Латте, 0,3 л",
    price: 1190,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "latte-hot-04",
    nameRu: "Латте, 0,4 л",
    nameKk: "Латте, 0,4 л",
    price: 1290,
    volume: "0,4 л",
    temperature: "hot",
  },
  {
    slug: "latte-ice-03",
    nameRu: "Айс латте, 0,3 л",
    nameKk: "Айс латте, 0,3 л",
    price: 1190,
    volume: "0,3 л",
    temperature: "ice",
  },
  {
    slug: "latte-ice-04",
    nameRu: "Айс латте, 0,4 л",
    nameKk: "Айс латте, 0,4 л",
    price: 1290,
    volume: "0,4 л",
    temperature: "ice",
  },
  {
    slug: "cappuccino-hot-03",
    nameRu: "Капучино, 0,3 л",
    nameKk: "Капучино, 0,3 л",
    price: 1190,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "cappuccino-hot-04",
    nameRu: "Капучино, 0,4 л",
    nameKk: "Капучино, 0,4 л",
    price: 1290,
    volume: "0,4 л",
    temperature: "hot",
  },
  {
    slug: "cappuccino-ice-03",
    nameRu: "Айс капучино, 0,3 л",
    nameKk: "Айс капучино, 0,3 л",
    price: 1190,
    volume: "0,3 л",
    temperature: "ice",
  },
  {
    slug: "cappuccino-ice-04",
    nameRu: "Айс капучино, 0,4 л",
    nameKk: "Айс капучино, 0,4 л",
    price: 1190,
    volume: "0,4 л",
    temperature: "ice",
  },
  {
    slug: "flat-white-hot",
    nameRu: "Флэт уайт, 0,2 л",
    nameKk: "Флэт уайт, 0,2 л",
    price: 1190,
    volume: "0,2 л",
    temperature: "hot",
  },
  {
    slug: "flat-white-ice",
    nameRu: "Айс флэт уайт, 0,2 л",
    nameKk: "Айс флэт уайт, 0,2 л",
    price: 1190,
    volume: "0,2 л",
    temperature: "ice",
  },
  {
    slug: "raf-hot",
    nameRu: "Раф, 0,3 л",
    nameKk: "Раф, 0,3 л",
    price: 1490,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "raf-ice",
    nameRu: "Айс раф, 0,3 л",
    nameKk: "Айс раф, 0,3 л",
    price: 1490,
    volume: "0,3 л",
    temperature: "ice",
  },
  {
    slug: "espresso-tonic",
    nameRu: "Эспрессо-тоник, 0,4 л",
    nameKk: "Эспрессо-тоник, 0,4 л",
    price: 1690,
    volume: "0,4 л",
    temperature: "ice",
  },
  {
    slug: "glace",
    nameRu: "Гляссе, 0,3 л",
    nameKk: "Гляссе, 0,3 л",
    price: 1690,
    volume: "0,3 л",
    temperature: "ice",
  },
  {
    slug: "bumble-coffee",
    nameRu: "Бамбл кофе, 0,4 л",
    nameKk: "Бамбл кофе, 0,4 л",
    price: 1690,
    volume: "0,4 л",
    temperature: "ice",
  },
  {
    slug: "cocoa-hot",
    nameRu: "Какао, 0,3 л",
    nameKk: "Какао, 0,3 л",
    price: 1090,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "green-matcha-hot",
    nameRu: "Зелёная матча, 0,3 л",
    nameKk: "Жасыл матча, 0,3 л",
    price: 1490,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "green-matcha-ice",
    nameRu: "Айс зелёная матча, 0,3 л",
    nameKk: "Айс жасыл матча, 0,3 л",
    price: 1490,
    volume: "0,3 л",
    temperature: "ice",
  },
  {
    slug: "blue-matcha-hot",
    nameRu: "Голубая матча, 0,3 л",
    nameKk: "Көк матча, 0,3 л",
    price: 1490,
    volume: "0,3 л",
    temperature: "hot",
  },
  {
    slug: "blue-matcha-ice",
    nameRu: "Айс голубая матча, 0,3 л",
    nameKk: "Айс көк матча, 0,3 л",
    price: 1490,
    volume: "0,3 л",
    temperature: "ice",
  },
];

const coffeeMenuSeeds: BarMenuSeed[] = coffeeVariants.map((item) => {
  const isIce = item.temperature === "ice";
  const descriptionRu = isIce
    ? "Холодный кофейный напиток из барного меню."
    : "Горячий кофейный напиток из барного меню.";
  const descriptionKk = isIce
    ? "Бар мәзіріндегі салқын кофе сусыны."
    : "Бар мәзіріндегі ыстық кофе сусыны.";
  return [
    "bar-coffee",
    `bar-${item.slug}`,
    item.nameRu,
    item.nameKk,
    item.price,
    withVolume(descriptionRu, item.volume),
    withVolumeKk(descriptionKk, item.volume),
  ];
});

const signatureCoffee: Array<
  [slug: string, nameRu: string, nameKk: string, price: number]
> = [
  ["aerocano", "Аэрокано", "Аэрокано", 1090],
  ["irish-coffee", "Айриш кофе", "Айриш кофе", 1990],
  ["chericano", "Черикано", "Черикано", 1690],
  ["lavender-raf", "Лавандовый раф", "Лаванда рафы", 1690],
  ["frappuccino", "Фрапучино", "Фрапучино", 2190],
  ["talkan-latte", "Талкан латте", "Талқан латте", 1490],
  ["peanut-latte", "Арахисовый латте", "Жержаңғақ латте", 1590],
  ["popcorn-raf", "Попкорн раф", "Попкорн раф", 1490],
  ["matcha-orange", "Матча-апельсин", "Матча-апельсин", 1590],
  ["mocha", "Мокко", "Мокко", 1490],
  ["mochaccino", "Моккочино", "Моккочино", 1590],
];

const signatureCoffeeSeeds: BarMenuSeed[] = signatureCoffee.map(
  ([slug, nameRu, nameKk, price]) => [
    "bar-coffee",
    `bar-${slug}`,
    `${nameRu}, 0,4 л`,
    `${nameKk}, 0,4 л`,
    price,
    "Авторский кофейный напиток. Объём: 0,4 л.",
    "Авторлық кофе сусыны. Көлемі: 0,4 л.",
  ],
);

const signatureDrinkSeeds: BarMenuSeed[] = [
  [
    "bar-signature",
    "bar-bumble-bee-foam",
    "Бамбл Би с пеной, 0,4 л",
    "Көбікті Бамбл Би, 0,4 л",
    1590,
    "Освежающий цитрусовый кофе с яркой сладостью манго и лёгкой сливочной пеной.",
    "Манго дәмі мен жеңіл кілегейлі көбігі бар сергітетін цитрусты кофе.",
  ],
  [
    "bar-signature",
    "bar-ice-matcha-salted-foam",
    "Айс матча с ванильно-солёной пеной, 0,4 л",
    "Ванильді-тұзды көбікті айс матча, 0,4 л",
    1590,
    "Свежая матча с мягкой ванилью и тонким солёным акцентом.",
    "Жұмсақ ваниль хош иісі мен нәзік тұзды реңкі бар балғын матча.",
  ],
  [
    "bar-signature",
    "bar-ice-mocha-cherry-foam",
    "Айс мокко с вишнёво-сливочной пеной, 0,4 л",
    "Шие-кілегей көбікті айс мокко, 0,4 л",
    1590,
    "Холодный мокко с яркой вишнёвой ноткой и нежной пеной.",
    "Айқын шие нотасы және нәзік көбігі бар салқын мокко.",
  ],
  [
    "bar-signature",
    "bar-ice-latte-berry-foam",
    "Айс латте со смородинно-малиновой пеной, 0,4 л",
    "Қарақат-таңқурай көбікті айс латте, 0,4 л",
    1590,
    "Нежный латте с сочным ягодным ароматом и фруктовой лёгкостью.",
    "Жемісті хош иісі мен жеңіл дәмі бар жұмсақ латте.",
  ],
  [
    "bar-signature",
    "bar-thai-lemonade-coconut-foam",
    "Тайский лимонад с кокосовой пеной, 0,4 л",
    "Кокос көбікті тай лимонады, 0,4 л",
    1590,
    "Тропический лимонад с бархатной кокосовой пеной.",
    "Жұмсақ кокос көбігі бар тропикалық лимонад.",
  ],
  [
    "bar-signature",
    "bar-ice-urbech",
    "Айс урбеч",
    "Айс урбеч",
    2190,
    "Охлаждающий напиток с молоком, мороженым, кофе и урбечом.",
    "Сүт, балмұздақ, кофе және урбеч қосылған салқын сусын.",
  ],
  [
    "bar-signature",
    "bar-juice-ball-blue-lagoon",
    "Juice ball «Голубая лагуна»",
    "Juice ball «Көгілдір лагуна»",
    1790,
    "Освежающий напиток с фруктовыми шариками.",
    "Жеміс шариктері қосылған сергітетін сусын.",
  ],
  [
    "bar-signature",
    "bar-juice-ball-peach-cherry",
    "Juice ball «Персик-вишня»",
    "Juice ball «Шабдалы-шие»",
    1790,
    "Сочный напиток с фруктовыми шариками.",
    "Жеміс шариктері қосылған шырынды сусын.",
  ],
  [
    "bar-signature",
    "bar-juice-ball-mango-passionfruit",
    "Juice ball «Манго-маракуйя»",
    "Juice ball «Манго-маракуйя»",
    1790,
    "Яркий тропический напиток с фруктовыми шариками.",
    "Жеміс шариктері қосылған жарқын тропикалық сусын.",
  ],
];

type DualSizeDrink = {
  slug: string;
  nameRu: string;
  nameKk: string;
  largePrice: number;
  smallPrice: number;
  descriptionRu: string;
  descriptionKk: string;
};

function dualSizeSeeds(
  categoryId: string,
  drinks: DualSizeDrink[],
): BarMenuSeed[] {
  return drinks.flatMap(
    (drink) =>
      [
        [
          categoryId,
          `bar-${drink.slug}-1l`,
          `${drink.nameRu}, 1 л`,
          `${drink.nameKk}, 1 л`,
          drink.largePrice,
          withVolume(drink.descriptionRu, "1 л"),
          withVolumeKk(drink.descriptionKk, "1 л"),
        ],
        [
          categoryId,
          `bar-${drink.slug}-04l`,
          `${drink.nameRu}, 0,4 л`,
          `${drink.nameKk}, 0,4 л`,
          drink.smallPrice,
          withVolume(drink.descriptionRu, "0,4 л"),
          withVolumeKk(drink.descriptionKk, "0,4 л"),
        ],
      ] as BarMenuSeed[],
  );
}

const teas: DualSizeDrink[] = [
  {
    slug: "tea-bright",
    nameRu: "Ярче-чай",
    nameKk: "Жарқын шай",
    largePrice: 1890,
    smallPrice: 890,
    descriptionRu:
      "Насыщенный ягодный чай с ярким вкусом и лёгкой сладкой свежестью.",
    descriptionKk: "Айқын дәмі және жеңіл тәтті сергектігі бар жидекті шай.",
  },
  {
    slug: "tea-pear-cinnamon",
    nameRu: "Груша-корица",
    nameKk: "Алмұрт-даршын",
    largePrice: 1890,
    smallPrice: 890,
    descriptionRu: "Сладкая груша с лёгким ароматом корицы.",
    descriptionKk: "Жеңіл даршын иісі бар тәтті алмұрт шайы.",
  },
  {
    slug: "tea-kazakh",
    nameRu: "Казахский чай",
    nameKk: "Қазақ шайы",
    largePrice: 1890,
    smallPrice: 890,
    descriptionRu:
      "Традиционный тары-чай с молочной мягкостью и глубоким вкусом чёрного чая.",
    descriptionKk:
      "Сүттің жұмсақтығы мен қара шайдың терең дәмі үйлескен дәстүрлі тары-шай.",
  },
  {
    slug: "tea-seabuckthorn-orange",
    nameRu: "Облепиха-апельсин",
    nameKk: "Шырғанақ-апельсин",
    largePrice: 1890,
    smallPrice: 990,
    descriptionRu: "Тёплый цитрус с лёгкой облепиховой кислинкой.",
    descriptionKk: "Жылы цитрус пен шырғанақтың жеңіл қышқылдығы.",
  },
  {
    slug: "tea-tashkent",
    nameRu: "Ташкентский чай",
    nameKk: "Ташкент шайы",
    largePrice: 1890,
    smallPrice: 890,
    descriptionRu: "Цитрусовый чай с мягкой кислинкой и ароматной мятой.",
    descriptionKk: "Жеңіл қышқыл дәмі мен хош иісті жалбызы бар цитрусты шай.",
  },
  {
    slug: "tea-strawberry-thyme",
    nameRu: "Клубника-чабрец",
    nameKk: "Құлпынай-тимьян",
    largePrice: 1890,
    smallPrice: 890,
    descriptionRu: "Свежая клубника в тонкой травяной дымке.",
    descriptionKk: "Шөптің нәзік хош иісі бар жаңа піскен құлпынай шайы.",
  },
  {
    slug: "tea-green-bouquet",
    nameRu: "Зелёный букет",
    nameKk: "Жасыл гүл шоғы",
    largePrice: 1890,
    smallPrice: 890,
    descriptionRu: "Фруктово-травяной чай с киви, лаймом, базиликом и мятой.",
    descriptionKk: "Киви, лайм, базилик пен жалбыз қосылған жеміс-шөп шайы.",
  },
];

const lemonades: DualSizeDrink[] = [
  {
    slug: "lemonade-kiwi-lime",
    nameRu: "Киви-лайм",
    nameKk: "Киви-лайм",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Яркая кислинка лайма и освежающий киви.",
    descriptionKk: "Лаймның айқын қышқылдығы мен сергітетін киви дәмі.",
  },
  {
    slug: "lemonade-strawberry-pineapple",
    nameRu: "Клубнично-ананасовый",
    nameKk: "Құлпынай-ананас",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Сладкая клубника и тропический ананас в одном глотке.",
    descriptionKk: "Тәтті құлпынай мен тропикалық ананастың үйлесімі.",
  },
  {
    slug: "lemonade-forest-berries",
    nameRu: "Лесные ягоды",
    nameKk: "Орман жидектері",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Густой ягодный вкус с насыщенным ароматом.",
    descriptionKk: "Қою жидек дәмі мен қанық хош иісі.",
  },
  {
    slug: "lemonade-cherry-apricot",
    nameRu: "Вишнёво-абрикосовый",
    nameKk: "Шие-өрік",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Сочный дуэт вишни и абрикоса — ярко и освежающе.",
    descriptionKk: "Шие мен өріктің жарқын әрі сергітетін үйлесімі.",
  },
  {
    slug: "lemonade-almond-strawberry",
    nameRu: "Миндально-клубничный",
    nameKk: "Бадам-құлпынай",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Нежный миндаль и мягкая клубничная сладость.",
    descriptionKk: "Жұмсақ бадам мен нәзік құлпынай тәттілігі.",
  },
  {
    slug: "lemonade-rose-lychee",
    nameRu: "Роза-личи",
    nameKk: "Раушан-личи",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Лёгкий воздушный вкус с ароматом розовых лепестков.",
    descriptionKk: "Раушан күлтелерінің хош иісі бар жеңіл дәм.",
  },
  {
    slug: "lemonade-ginger-vanilla",
    nameRu: "Имбирно-ванильный",
    nameKk: "Зімбір-ваниль",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Тёплый имбирь в нежной ванильной мягкости.",
    descriptionKk: "Нәзік ваниль жұмсақтығымен үйлескен жылы зімбір.",
  },
  {
    slug: "lemonade-strawberry-basil",
    nameRu: "Клубнично-базиликовый",
    nameKk: "Құлпынай-базилик",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Свежая клубника с лёгким травяным акцентом.",
    descriptionKk: "Жеңіл шөп реңкі бар балғын құлпынай.",
  },
  {
    slug: "lemonade-orange-pomegranate",
    nameRu: "Апельсиново-гранатовый",
    nameKk: "Апельсин-анар",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Цитрусовая свежесть и насыщенный гранат.",
    descriptionKk: "Цитрус сергектігі мен қанық анар дәмі.",
  },
  {
    slug: "lemonade-rose-lavender",
    nameRu: "Роза-лаванда",
    nameKk: "Раушан-лаванда",
    largePrice: 1990,
    smallPrice: 990,
    descriptionRu: "Цветочный, нежный и очень ароматный лимонад.",
    descriptionKk: "Гүлді, нәзік және өте хош иісті лимонад.",
  },
];

const milkshakeSeeds: BarMenuSeed[] = [
  [
    "bar-milkshakes",
    "bar-milkshake-classic",
    "Классический милкшейк, 0,4 л",
    "Классикалық милкшейк, 0,4 л",
    1690,
    "Нежный сливочный коктейль с мягкой сладостью.",
    "Жұмсақ тәттілігі бар нәзік кілегейлі коктейль.",
  ],
  [
    "bar-milkshakes",
    "bar-milkshake-strawberry",
    "Клубничный милкшейк, 0,4 л",
    "Құлпынай милкшейкі, 0,4 л",
    1690,
    "Свежая клубника в густом молочном креме.",
    "Қою сүтті кремдегі балғын құлпынай.",
  ],
  [
    "bar-milkshakes",
    "bar-milkshake-raffaello",
    "Милкшейк «Рафаэлло», 0,4 л",
    "«Рафаэлло» милкшейкі, 0,4 л",
    1990,
    "Кокосово-сливочный, лёгкий и десертный вкус.",
    "Жеңіл әрі десерттік кокос-кілегей дәмі.",
  ],
  [
    "bar-milkshakes",
    "bar-milkshake-oreo",
    "Милкшейк «Орео», 0,4 л",
    "«Орео» милкшейкі, 0,4 л",
    1990,
    "Шоколадная крошка и сливочная мягкость.",
    "Шоколад түйіршіктері мен кілегейлі жұмсақтық.",
  ],
  [
    "bar-milkshakes",
    "bar-milkshake-popcorn-caramel",
    "Попкорн-солёная карамель, 0,4 л",
    "Попкорн-тұзды карамель, 0,4 л",
    1990,
    "Сладко-солёный микс с карамельной насыщенностью.",
    "Карамель дәмі қанық тәтті-тұзды үйлесім.",
  ],
  [
    "bar-milkshakes",
    "bar-milkshake-peanut",
    "Арахисовый милкшейк, 0,4 л",
    "Жержаңғақ милкшейкі, 0,4 л",
    1990,
    "Густой ореховый вкус с карамельным теплом.",
    "Карамель жылуы бар қою жаңғақ дәмі.",
  ],
  [
    "bar-milkshakes",
    "bar-bubble-shake-berry",
    "Bubble shake «Ягодный»",
    "Bubble shake «Жидекті»",
    1990,
    "Нежный молочный коктейль с шариками тапиоки и ярким вкусом ягод.",
    "Тапиока шариктері мен жарқын жидек дәмі бар нәзік сүтті коктейль.",
  ],
  [
    "bar-milkshakes",
    "bar-bubble-shake-raffaello",
    "Bubble shake «Рафаэлло»",
    "Bubble shake «Рафаэлло»",
    1990,
    "Нежный молочный коктейль с шариками тапиоки и вкусом Рафаэлло.",
    "Тапиока шариктері мен Рафаэлло дәмі бар нәзік сүтті коктейль.",
  ],
  [
    "bar-milkshakes",
    "bar-bubble-shake-kinder",
    "Bubble shake «Киндер»",
    "Bubble shake «Киндер»",
    1990,
    "Нежный молочный коктейль с шариками тапиоки и шоколадным вкусом.",
    "Тапиока шариктері мен шоколад дәмі бар нәзік сүтті коктейль.",
  ],
];

const freshSeeds: BarMenuSeed[] = [
  [
    "bar-fresh",
    "bar-fresh-orange",
    "Апельсиновый фреш, 0,4 л",
    "Апельсин фреші, 0,4 л",
    2390,
    "Чистая цитрусовая свежесть и солнечный вкус.",
    "Таза цитрус сергектігі мен шуақты дәм.",
  ],
  [
    "bar-fresh",
    "bar-fresh-apple",
    "Яблочный фреш, 0,4 л",
    "Алма фреші, 0,4 л",
    2190,
    "Лёгкий, сладкий, натуральный сок.",
    "Жеңіл, тәтті, табиғи шырын.",
  ],
  [
    "bar-fresh",
    "bar-fresh-pear",
    "Грушевый фреш, 0,4 л",
    "Алмұрт фреші, 0,4 л",
    2190,
    "Нежная сладость спелой груши.",
    "Піскен алмұрттың нәзік тәттілігі.",
  ],
];

const smoothieSeeds: BarMenuSeed[] = [
  [
    "bar-smoothies",
    "bar-smoothie-forest-berries",
    "Смузи «Лесные ягоды», 0,3 л",
    "«Орман жидектері» смузиі, 0,3 л",
    1790,
    "Густой ягодный смузи со вкусом вишни, малины и клубники.",
    "Шие, таңқурай және құлпынай дәмі бар қою жидек смузиі.",
  ],
  [
    "bar-smoothies",
    "bar-smoothie-fruit-green",
    "Фруктово-зелёный смузи, 0,3 л",
    "Жасыл жемісті смузи, 0,3 л",
    1790,
    "Свежий фруктовый смузи с яркой кислинкой и лёгкой зелёной прохладой.",
    "Жеміс қышқылдығы мен жеңіл жасыл салқындығы бар балғын смузи.",
  ],
  [
    "bar-smoothies",
    "bar-smoothie-tropical",
    "Тропический смузи, 0,3 л",
    "Тропикалық смузи, 0,3 л",
    1790,
    "Сладкий яркий смузи с клубничной нежностью и тропическим вкусом.",
    "Құлпынай нәзіктігі мен тропикалық дәмі бар жарқын тәтті смузи.",
  ],
  [
    "bar-smoothies",
    "bar-smoothie-green-vegetable",
    "Зелёный овощной смузи, 0,3 л",
    "Жасыл көкөністі смузи, 0,3 л",
    1790,
    "Освежающий смузи с чистой зелёной свежестью и тонкой травянистостью.",
    "Таза жасыл сергектігі мен нәзік шөп реңкі бар смузи.",
  ],
  [
    "bar-smoothies",
    "bar-smoothie-breakfast-one",
    "Смузи «Завтрак №1», 0,3 л",
    "«Таңғы ас №1» смузиі, 0,3 л",
    1790,
    "Нежный питательный смузи со сладостью спелого банана и кремовой текстурой.",
    "Піскен банан тәттілігі мен кремді құрылымы бар жұмсақ, қоректік смузи.",
  ],
];

const softDrinkSeeds: BarMenuSeed[] = [
  [
    "bar-soft-drinks",
    "bar-water-1l",
    "Вода, 1 л",
    "Су, 1 л",
    790,
    "Питьевая вода. Объём: 1 л.",
    "Ауыз су. Көлемі: 1 л.",
  ],
  [
    "bar-soft-drinks",
    "bar-natural-juice-1l",
    "Натуральный сок, 1 л",
    "Табиғи шырын, 1 л",
    1390,
    "Натуральный сок. Объём: 1 л.",
    "Табиғи шырын. Көлемі: 1 л.",
  ],
  [
    "bar-soft-drinks",
    "bar-juice-with-straw",
    "Сок с трубочкой",
    "Түтікшелі шырын",
    690,
    "Порционный сок с трубочкой.",
    "Түтікшесі бар порциялық шырын.",
  ],
  [
    "bar-soft-drinks",
    "bar-blackcurrant-mors-1l",
    "Морс из смородины, 1 л",
    "Қарақат морсы, 1 л",
    1390,
    "Ягодный морс из смородины. Объём: 1 л.",
    "Қарақаттан жасалған жидек морсы. Көлемі: 1 л.",
  ],
  [
    "bar-soft-drinks",
    "bar-cola-05l",
    "Кола, 0,5 л",
    "Кола, 0,5 л",
    890,
    "Газированный напиток. Объём: 0,5 л.",
    "Газдалған сусын. Көлемі: 0,5 л.",
  ],
  [
    "bar-soft-drinks",
    "bar-compote-1l",
    "Компот, 1 л",
    "Компот, 1 л",
    1190,
    "Домашний компот. Объём: 1 л.",
    "Үй компоты. Көлемі: 1 л.",
  ],
];

const barMenuImageKeys = new Set([
  "bar-bumble-bee-foam",
  "bar-ice-matcha-salted-foam",
  "bar-ice-mocha-cherry-foam",
  "bar-ice-latte-berry-foam",
  "bar-thai-lemonade-coconut-foam",
  "bar-tea-bright",
  "bar-tea-pear-cinnamon",
  "bar-tea-kazakh",
  "bar-tea-seabuckthorn-orange",
  "bar-lemonade-kiwi-lime",
  "bar-lemonade-strawberry-pineapple",
  "bar-lemonade-forest-berries",
  "bar-milkshake-classic",
  "bar-milkshake-strawberry",
  "bar-milkshake-raffaello",
  "bar-milkshake-oreo",
  "bar-milkshake-popcorn-caramel",
  "bar-fresh-orange",
  "bar-smoothie-forest-berries",
  "bar-smoothie-fruit-green",
  "bar-smoothie-tropical",
  "bar-water",
  "bar-natural-juice",
  "bar-blackcurrant-mors",
  "bar-compote",
  "bar-cola",
  "bar-ice-urbech",
  "bar-juice-ball-blue-lagoon",
  "bar-juice-ball-peach-cherry",
  "bar-juice-ball-mango-passionfruit",
  "bar-bubble-shake-berry",
  "bar-bubble-shake-raffaello",
  "bar-bubble-shake-kinder",
]);

function barMenuImageUrl(slug: string) {
  const key = slug.replace(/-(?:1l|04l|05l)$/i, "");
  if (!barMenuImageKeys.has(key)) return undefined;
  return `/bar-menu/${key}-black.webp`;
}

const rawBarMenuSeeds: BarMenuSeed[] = [
  ...coffeeMenuSeeds,
  ...signatureCoffeeSeeds,
  ...signatureDrinkSeeds,
  ...dualSizeSeeds("bar-tea", teas),
  ...dualSizeSeeds("bar-lemonades", lemonades),
  ...milkshakeSeeds,
  ...freshSeeds,
  ...smoothieSeeds,
  ...softDrinkSeeds,
];

export const barMenuSeeds: BarMenuSeed[] = rawBarMenuSeeds.map((seed) => {
  const imageUrl = barMenuImageUrl(seed[1]);
  if (!imageUrl) return seed;

  return [
    seed[0],
    seed[1],
    seed[2],
    seed[3],
    seed[4],
    seed[5],
    seed[6],
    imageUrl,
    seed[8],
  ];
});
