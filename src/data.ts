import { datas } from './data/datas';

interface News {
  id: number;
  image: string;
  alt: string;
  category: string;
  title: string;
}

interface Carousel {
  id: number;
  image: string;
  title: string;
  body: string;
}

type DataSource = () => Promise<{ newsArchive: News[]; carouselContent: Carousel[] }>;

// Define the displayData function
const displayData = async (dataSource: DataSource): Promise<void> => {
  // Get the data from the data source and render it as HTML elements
  const { newsArchive, carouselContent } = await dataSource();
  // The same code as before
  let newsArticle: string = newsArchive
    .map((news) => {
      return `<article class="news" data-id="${news.id}">
            <a href="#">
              <img
                src="${news.image}"
                alt="${news.alt}"
              />
            </a>
            <h5>${news.category}</h5>
            <p class="news-title">
              <a href="#"
                >${news.title}</a
              >
            </p>
          </article>`;
    })
    .join('');

  (document.querySelector('.news-articles') as HTMLDivElement).innerHTML = newsArticle;

  let cards: string = carouselContent
    .map((card) => {
      return `<article class="card" data-id="${card.id}">
            <img src="${card.image}" alt="" />
            <div class="card-text">
              <h3>${card.title}</h3>
              <p>${card.body}</p>
              <div class="read-article">
                <a href="#">Read Article</a>
              </div>
             </div>
          </article>`;
    })
    .join('');

  (document.querySelector('.carousel-container') as HTMLDivElement).innerHTML = cards;
};

const getDataSource = (): DataSource => {
  return async () => {
    return datas;
  };
};

export const displayElements = displayData(getDataSource());
