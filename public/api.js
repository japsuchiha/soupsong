let getSearch = (song) => {
    fetch(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer BQDrGfjRgEqdICcf8u1dFrlvAP1GU1ZkClLPLCkcMRmfNSXqyJHXPaAX7O1do4K_GyCMh3obg4f5kB0EV4Z1p9ptFSH3wyPWrf0cgY0pLm3eV1-SyFrMaUN7qO_vbW8rVYaB2o-x1i5yirJJkD5FrDF2UGpHba9kxdt1Mnw_Etw-HbXp9OxkW3Gxs3ruaUuq6r3aO8BGnvO3KD-vNSwTxubIhq89O5IzXNwf'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        let disp = document.querySelector('#message-container')
        i = 0
        data.tracks.items.forEach(element => {
            let p = document.createElement('p')
            console.log(element)
            p.innerHTML = element.name
            p.className = `${element.uri}`
            p.id = `song${i}`
            console.log(p)
            disp.appendChild(p)
            document.querySelector(`#song${i}`).addEventListener('click', (e) => {
                console.log("aso")
                document.querySelector('#message').value = e.target.innerHTML
                document.querySelector('#message').className = e.target.className
                disp.innerHTML = ""
            })
            i++
        });
    })
}


let id = "5XUKkpKtjNRdgnmT0SwLzV"

let addtoplaylist = (e) => {
    fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?uris=${e.target.previousElementSibling.className}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQDrGfjRgEqdICcf8u1dFrlvAP1GU1ZkClLPLCkcMRmfNSXqyJHXPaAX7O1do4K_GyCMh3obg4f5kB0EV4Z1p9ptFSH3wyPWrf0cgY0pLm3eV1-SyFrMaUN7qO_vbW8rVYaB2o-x1i5yirJJkD5FrDF2UGpHba9kxdt1Mnw_Etw-HbXp9OxkW3Gxs3ruaUuq6r3aO8BGnvO3KD-vNSwTxubIhq89O5IzXNwf'
        }
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data))    
}

let play = (e) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=4172cbfcc290fd287032db191d2df5e0141ba3af`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQDrGfjRgEqdICcf8u1dFrlvAP1GU1ZkClLPLCkcMRmfNSXqyJHXPaAX7O1do4K_GyCMh3obg4f5kB0EV4Z1p9ptFSH3wyPWrf0cgY0pLm3eV1-SyFrMaUN7qO_vbW8rVYaB2o-x1i5yirJJkD5FrDF2UGpHba9kxdt1Mnw_Etw-HbXp9OxkW3Gxs3ruaUuq6r3aO8BGnvO3KD-vNSwTxubIhq89O5IzXNwf'
        },
        body: JSON.stringify({
            "context_uri": "spotify:playlist:5XUKkpKtjNRdgnmT0SwLzV"
        })
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    fetch("https://api.spotify.com/v1/me/player", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQDrGfjRgEqdICcf8u1dFrlvAP1GU1ZkClLPLCkcMRmfNSXqyJHXPaAX7O1do4K_GyCMh3obg4f5kB0EV4Z1p9ptFSH3wyPWrf0cgY0pLm3eV1-SyFrMaUN7qO_vbW8rVYaB2o-x1i5yirJJkD5FrDF2UGpHba9kxdt1Mnw_Etw-HbXp9OxkW3Gxs3ruaUuq6r3aO8BGnvO3KD-vNSwTxubIhq89O5IzXNwf'
        }
    })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
        document.querySelector('#message-container').innerHTML = data.item.name
    })  
}
document.querySelector('.bou').addEventListener('click', addtoplaylist)
document.querySelector('.play').addEventListener('click', play)


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
