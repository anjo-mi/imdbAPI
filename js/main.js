import API_KEY from './index.js';


let apiKey = API_KEY



// let url = "https://api.collectapi.com/imdb/imdbSearchByName?query=inception"

let url2 = `https://api.collectapi.com/imdb/imdbSearchById?movieId=tt1375666`


if (!localStorage.getItem('history')){
    localStorage.setItem('history', '')
}
let results = Array.from(document.querySelectorAll('.item'))

let handlers = []

let running = false


function createHandler(data, i){
    return function secondFetch(event){
        event.preventDefault()
        titleId = data.result[i]['imdbID']
        getDeets()

        results.forEach((el,i) => {
            el.removeEventListener('click', handlers[i])
        })
        handlers = []
    }
}

let search = ''

document.querySelector('button').addEventListener('click', () => {
    search = document.getElementById('title').value.toLowerCase()
    let history = localStorage.getItem('history')
    let historyArr = history ? history.split(',') : []
    
    if (!historyArr.includes(search)){
        historyArr.unshift(search)
    }
    

    localStorage.setItem('history', historyArr.join(','))
    getTitles()
    document.getElementById('title').value = ''
})


function getTitles(){
    document.getElementById('details').classList.add('hidden')
    document.getElementById('results').classList.remove('hidden')
    fetch(`https://api.collectapi.com/imdb/imdbSearchByName?query=${search}`, {
        method : 'GET',
        headers: {
            'content-type' : 'application/json',
            'authorization' : apiKey
        }
    })
        .then(res => res.json())
        .then(data => {
            handlers = []
            console.log(data.result)
            console.log(data.result.length)
            let results = document.querySelectorAll('.item')
            results = Array.from(results)
            results.forEach((el, i) => {
                el.classList.add('hidden')
                if (i < data.result.length){
                    let img = el.querySelector('img')
                    let title = el.querySelector('h2.title')
                    let type = el.querySelector('span.type')
                    let year = el.querySelector('span.year')

                    if(data.result[i]['Poster'] === 'N/A'){
                        img.src = 'img/arrDev.jpg'
                    }else{
                        img.src = data.result[i]['Poster']
                    }
                    title.textContent = data.result[i]['Title']
                    type.textContent = data.result[i]['Type'].slice(0,1).toUpperCase() + data.result[i]['Type'].slice(1)
                    
                    year.textContent = data.result[i]['Year']
                    el.classList.toggle('hidden')


                    const handler = createHandler(data, i)
                    handlers.push(handler)

                    el.addEventListener('click', handler)
                }
            })
        })
        .catch(err => {
            console.log(`the error: ${err} occurred`)
        })
}

let titleId = ''
function getDeets(){
    if (running) return
    running = true
    document.getElementById('results').classList.add('hidden')
    document.getElementById('details').classList.remove('hidden')
    fetch(`https://api.collectapi.com/imdb/imdbSearchById?movieId=${titleId}`, {
        method : 'GET',
        headers: {
            'content-type' : 'application/json',
            'authorization' : apiKey
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.result)
            let clicked = data.result
            let body = document.body
            if(clicked['Poster'] === 'N/A'){
                body.style.backgroundImage = 'img/arrDev.jpg'
            }else{
                body.style.backgroundImage = `url(${clicked['Poster']})`
            }
            let details = document.getElementById('details')
            if (clicked['Type'] === 'series'){
                details.querySelector('.title').textContent = clicked['Title']
                if (clicked['Award'] !== 'N/A'){
                    details.querySelector('.awards').classList.toggle('hidden')
                    details.querySelector('.awards').textContent = clicked['Awards']
                }
                details.querySelector('.rating').textContent = `${clicked['imdbRating']}/10 from ${clicked['imdbVotes']} votes`
                details.querySelector('.rated').textContent = clicked['Rated']
                details.querySelector('.genre').textContent = clicked['Genre']
                details.querySelector('.runtime').textContent = clicked['Runtime']
                details.querySelector('.seasons').textContent = `${clicked['totalSeasons']} Seasons`
                details.querySelector('.actors').textContent = clicked['Actors']
                details.querySelector('.plot').textContent = clicked['Plot']
            }
            if (clicked['Type'] === 'movie'){
                details.querySelector('.title').textContent = clicked['Title']
                if (clicked['Award'] !== 'N/A'){
                    details.querySelector('.awards').classList.toggle('hidden')
                    details.querySelector('.awards').textContent = clicked['Awards']
                }
                details.querySelector('.rating').textContent = `${clicked['imdbRating']}/10 from ${clicked['imdbVotes']} votes`
                details.querySelector('.rated').textContent = clicked['Rated']
                details.querySelector('.genre').textContent = clicked['Genre']
                details.querySelector('.runtime').textContent = clicked['Runtime']
                details.querySelector('.seasons').textContent = `${clicked['Year']}`
                details.querySelector('.actors').textContent = clicked['Actors']
                details.querySelector('.plot').textContent = clicked['Plot']
            }

        })
        .catch(err => {
            console.log(`the error: ${err} occurred`)
        })
        .finally(() => {
            running = false
        })
}
