export const getNewsData = () => {
  return fetch('/src/data/news-archives.json')
    .then((response) => response.json())
    .then((data) => displayNews(data))
    .catch((err) => console.log('Error: ', err));
};

getNewsData();
const displayNews = (data) => {
  let articles = data.map((news) => {
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

  articles = articles.join('');
  document.querySelector('.news-articles').innerHTML = articles;
};
