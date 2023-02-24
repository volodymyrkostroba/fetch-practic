const ref = document.querySelector('.list');
console.log(ref);

const apiKey = '0cd596ebf4ff480896f2c7f5290732ae';

const fetchSetings = {
    name:'',
    page: 1,
  
    fetchItems(){
      const url = `https://newsapi.org/v2/everything?q=${this.name}&language=en&pageSize=5&page=${this.page}`;
      const options = {
        headers: { Authorization: apiKey },
      };
    

     fetch(url,options)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        this.incrementPage()

        this.updateArticleMarkup(res.articles)
    })

},

resetPage() {
    this.page = 1;
  },

  incrementPage() {
    this.page += 1;
  },

//   get query() {
//     return this.name;
//   },
//   set query(value) {
//     this.name = value;
//   },

updateArticleMarkup(arr){
    arr.forEach(e => {
        let item = `
        <li>
    <a href="${e.url}" target="_blank" rel="noopener noreferrer">
      <article>
        <img src="${e.urlToImage}" alt="" width="480">
        <h2>${e.title}</h2>
        <p>Posted by: {{author}}</p>
        <p>${e.description}</p>
      </article>
    </a>
  </li>`;

  ref.insertAdjacentHTML('beforeend',item)
    });
}
}


fetchSetings.name = 'html';
fetchSetings.fetchItems();

// /////////////////////////////////////

// function updateArticleMarkup(arr){
//     arr.forEach(e => {
//         let item = `
//         <li>
//     <a href="${e.url}" target="_blank" rel="noopener noreferrer">
//       <article>
//         <img src="${e.urlToImage}" alt="" width="480">
//         <h2>${e.title}</h2>
//         <p>Posted by: {{author}}</p>
//         <p>${e.description}</p>
//       </article>
//     </a>
//   </li>`

//   listRef.insertAdjacentHTML('beforeend',item)
//     });
// }

// console.log(fetchSetings.fetchItems());