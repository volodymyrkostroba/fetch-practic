const listRef = document.querySelector('.list');


const apiKey = '0cd596ebf4ff480896f2c7f5290732ae';

const fetchSetings = {
    name:'',
    page: 1,
  
    fetchItems(){
      const url = `https://newsapi.org/v2/everything?q=${this.name}&language=en&pageSize=3&page=${this.page}`;
      const options = {
        headers: { Authorization: apiKey },
      };
    

     fetch(url,options)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        this.incrementPage()

        updateArticleMarkup(res.articles)
    })

},

resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

  get query() {
    return this.name;
  },
  set query(value) {
    this.name = value;
  },


}


// form ////////////////////////////////////////

const formRef = document.querySelector('.js-search-form');

formRef.addEventListener('submit', function (e) {
  e.preventDefault();
  
  resetForm(listRef);
  fetchSetings.query = e.currentTarget.query.value;
  fetchSetings.fetchItems();
  showBtn();

});

//  markap /////////////////////////////////////

function updateArticleMarkup(arr){
    arr.forEach(e => {
        let item = `
        <li class="list__item">
    <a href="${e.url}" target="_blank" rel="noopener noreferrer">
      <article class="list__article">
        <img class="list__img" src="${e.urlToImage}" alt="" width="480">
        <h2 class="list__title">${e.title}</h2>
        <p class="list__author-name">Posted by: ${e.author}</p>
        <p class="list__description">${e.description}</p>
      </article>
    </a>
  </li>`

  listRef.insertAdjacentHTML('beforeend',item)
    });
}

// ///////////  button

const loadMoreRef = document.querySelector('.load-more');

loadMoreRef.addEventListener('click', function (e) {
  fetchSetings.fetchItems();
});

// ////////////////////

function showBtn(){
  loadMoreRef.classList.remove('is-visible')
}

// reset-form /// 

function resetForm(element){
    element.innerHTML = '';
}