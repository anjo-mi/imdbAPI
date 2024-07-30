let url = "https://api.collectapi.com/imdb/imdbSearchByName?query=inception"

fetch('https://api.collectapi.com/imdb/imdbSearchByName?query=inception', {
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