const displayData = ({ newsArchive, carouselContent }) => {
  let newsArticle = newsArchive.map((news) => {
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
  });

  newsArticle = newsArticle.join('');
  document.querySelector('.news-articles').innerHTML = newsArticle;

  let cards = carouselContent.map((card) => {
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
  });

  cards = cards.join('');
  document.querySelector('.carousel-container').innerHTML = cards;
};

export const getData = () => {
  return fetch('/src/data/data.json')
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
      return data;
    })
    .catch((err) => console.log('Error: ', err));
};
