let getSearch = (song) => {
    fetch(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer BQBcerjTgnO7ZQnfIehg-8L8hip4qCRB8JP3oLY7WnuOmw9mK0MGmWjuKUVoZbkiTeNMsJg1D-6Cueun21AoZIhQWaVJoMiwvGm-PfXoOXBLqryEdYSmni7FiubJCwEhlHhCjtj0-JJzurdzhmwXLtkVGdxZt72oMUzudIY9J0YsTo59'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        let disp = document.querySelector('#message-container')
        i = 0
        data.tracks.items.forEach(element => {
            let p = document.createElement('p')
            p.innerHTML = element.name
            p.id = `song${i}`
            console.log(p)
            disp.appendChild(p)
            document.querySelector(`#song${i}`).addEventListener('click', (e) => {
                console.log("aso")
                document.querySelector('#message').value = e.target.innerHTML
                disp.innerHTML = ""
            })
            i++
        });
    })
}
// let in = document.querySelector("#message")
document.querySelector('#message').oninput = () => {
    console.log(document.querySelector('#message').value)
    let query = document.querySelector('#message').value
    document.querySelector('#message-container').innerHTML = ""
    getSearch(query)
}
// document.querySelector(".bou").addEventListener('click', () => {
//     console.log("heyao")
// })
