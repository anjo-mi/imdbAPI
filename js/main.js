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
            'authorization' : 'apikey 4w2SNXofae9kR2qbQ4nztb:5ELeaTekWJ1om9OC2morSD'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.result)
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
            'authorization' : 'apikey 4w2SNXofae9kR2qbQ4nztb:5ELeaTekWJ1om9OC2morSD'
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

getDeets()