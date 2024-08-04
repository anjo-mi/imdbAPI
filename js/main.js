import API_KEY from './index.js';


let apiKey = API_KEY



// let url = "https://api.collectapi.com/imdb/imdbSearchByName?query=inception"

let url2 = `https://api.collectapi.com/imdb/imdbSearchById?movieId=tt1375666`


if (!localStorage.getItem('history')){
    localStorage.setItem('history', '')
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
    fetch(`https://api.collectapi.com/imdb/imdbSearchByName?query=${search}`, {
        method : 'GET',
        headers: {
            'content-type' : 'application/json',
            'authorization' : apiKey
        }
    })
        .then(res => res.json())
        .then(data => {
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
                    
                }
            })
        })
        .catch(err => {
            console.log(`the error: ${err} occurred`)
        })
}

let titleId = 'tt0994314'
function getDeets(){
    fetch(`https://api.collectapi.com/imdb/imdbSearchById?movieId=${titleId}`, {
        method : 'GET',
        headers: {
            'content-type' : 'application/json',
            'authorization' : apiKey
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(`the error: ${err} occurred`)
        })
}
