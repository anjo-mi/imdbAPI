require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Accessing the API key
const apiKey = process.env.COLL_API;
console.log(apiKey)

app.get('/', (req, res) => {
  res.send(`Your API key is: ${apiKey}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



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
            // let table = document.createElement()
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
getDeets()