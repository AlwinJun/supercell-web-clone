interface NewsArchiveItem {
  id: number;
  image: string;
  alt: string;
  category: string;
  title: string;
}

interface CarouselContentItem {
  id: number;
  image: string;
  title: string;
  body: string;
}

// Define the datas variable
export const datas = {
  newsArchive: [] as NewsArchiveItem[],
  carouselContent: [] as CarouselContentItem[],
};

datas.newsArchive = [
  {
    id: 1,
    image: 'assets/images/pride-blog-thumbnail.webp',
    alt: 'pride image',
    category: 'News',
    title: 'Better Games Together: One Year On And Going Strong',
  },
  {
    id: 2,
    image: 'assets/images/news_thumbnail_gdc.webp',
    alt: 'gdc thumbnail',
    category: 'News',
    title: 'Looking Forward to Meeting You',
  },
  {
    id: 3,
    image: 'assets/images/meet-clash-thumbnail.webp',
    alt: 'coc team thumbnail',
    category: 'Career',
    title: 'The Clash of Clans Team Welcomes You',
  },
  {
    id: 4,
    image: 'assets/images/ilkka2023_chapter_clashhorizon_thumb.webp',
    alt: 'ilkka thumbnail',
    category: "Ilkka's",
    title: 'The Next Chapter of Supercell',
  },
  {
    id: 5,
    image: 'assets/images/article_thumb_everdale_metacore_1.webp',
    alt: 'everlade thumbanial',
    category: 'News',
    title: 'Everdale’s story continues, thanks to Metacore',
  },
  {
    id: 6,
    image: 'assets/images/article_thumb_brawlwc2022.webp',
    alt: 'brawl supercell',
    category: 'News',
    title: 'The Brawl Stars World Finals Are Over, and We Have a Winner!',
  },
];
datas.carouselContent = [
  {
    id: 1,
    image: 'assets/images/news_mobilegamer.webp',
    title: 'Supercell dodged ‘the great resignation’, but it’sdoubling down on staff wellbeing anyway',
    body: '‘The great resignation’ has not troubled Supercell, says co-chief people officer Lesley Mansford. And yet the company is still working extra hard to keep its staff happy post-pandemic.',
  },
  {
    id: 2,
    image: 'assets/images/news_pocketgamer.webp',
    title: 'Supercell talks breaking the mould of puzzle games with Clash Quest',
    body: 'In my experience, whenever you change some design fundamentals,the whole game needs to be budifferent way. I don’t think many players will notidifferences, but they can have a big impact on how the gato be built.',
  },
  {
    id: 3,
    image: 'assets/images/news_mobilegamer.webp',
    title: 'Supercell dodged ‘the great resignation’, but it’sdoubling down on staff wellbeing anyway',
    body: '‘The great resignation’ has not troubled Supercell, says co-chief people officer Lesley Mansford. And yet the company is still working extra hard to keep its staff happy post-pandemic.',
  },
  {
    id: 4,
    image: 'assets/images/news_mobilegamer.webp',
    title: 'Supercell dodged ‘the great resignation’, but it’sdoubling down on staff wellbeing anyway',
    body: '‘The great resignation’ has not troubled Supercell, says co-chief people officer Lesley Mansford. And yet the company is still working extra hard to keep its staff happy post-pandemic.',
  },
  {
    id: 5,
    image: 'assets/images/news_pocketgamer.webp',
    title: 'Supercell talks breaking the mould of puzzle games with Clash Quest',
    body: 'In my experience, whenever you change some design fundamentals,the whole game needs to be budifferent way. I don’t think many players will notidifferences, but they can have a big impact on how the gato be built.',
  },
  {
    id: 6,
    image: 'assets/images/news_pocketgamer.webp',
    title: 'Supercell talks breaking the mould of puzzle games with Clash Quest',
    body: 'In my experience, whenever you change some design fundamentals,the whole game needs to be budifferent way. I don’t think many players will notidifferences, but they can have a big impact on how the gato be built.',
  },
  {
    id: 7,
    image: 'assets/images/news_mobilegamer.webp',
    title: 'Supercell dodged ‘the great resignation’, but it’sdoubling down on staff wellbeing anyway',
    body: '‘The great resignation’ has not troubled Supercell, says co-chief people officer Lesley Mansford. And yet the company is still working extra hard to keep its staff happy post-pandemic.',
  },
  {
    id: 8,
    image: 'assets/images/news_pocketgamer.webp',
    title: 'Supercell talks breaking the mould of puzzle games with Clash Quest',
    body: 'In my experience, whenever you change some design fundamentals,the whole game needs to be budifferent way. I don’t think many players will notidifferences, but they can have a big impact on how the gato be built.',
  },
  {
    id: 9,
    image: 'assets/images/news_pocketgamer.webp',
    title: 'Supercell talks breaking the mould of puzzle games with Clash Quest',
    body: 'In my experience, whenever you change some design fundamentals,the whole game needs to be budifferent way. I don’t think many players will notidifferences, but they can have a big impact on how the gato be built.',
  },
];
