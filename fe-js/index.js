const postButton = document.getElementById('postButton')
const postAuthor = document.getElementById('postAuthor')
const postInput = document.getElementById('postInput')
const articleList = document.getElementById('articleList')
const apiUrl = 'http://localhost:1337/api'

function postArticle() {
  fetch(apiUrl, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        author: postAuthor.value,
        message: postInput.value
      })
  }).then((response)=>{
    return response.json()
  }).then((data)=>{
    fetchArticles()
  })
}

function fetchArticles() {
  fetch(apiUrl).then( response => {
    return response.json()
  }).then( data => {
    articleList.innerHTML = ''
    data.reverse()
    data.map( (article, index) => {
      let p = document.createElement('p')
      let span = document.createElement('span')
      let close = document.createElement('img')
      let articleContainer = document.createElement('div')
      p.innerHTML = article.message
      span.innerHTML = "Author: "+article.author
      close.innerHTML = 'x'

      p.className = 'post-text'
      span.className = 'post-author'

      close.src = './img/delete.png'
      close.className = 'post-delete'

      articleContainer.className = "post-container"

      close.addEventListener('click', deletePost)
      close.id = index

      articleContainer.appendChild(close)
      articleContainer.appendChild(p)
      articleContainer.appendChild(span)

      articleList.appendChild(articleContainer)
    })
  })
}


function deletePost(event) {
  fetch(apiUrl, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: event.target.id
      })
  }).then(()=>{
    fetchArticles()
  })
}

postButton.addEventListener('click', postArticle)
fetchArticles()
