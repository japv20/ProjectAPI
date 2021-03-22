const getData = async() => {
    let data = await axios.get("https://api.jikan.moe/v3/top/manga");
    return data;
}

document.addEventListener('DOMContentLoaded', async() => {
    console.log("Hello")
    const mangaData = await getData();
    console.log(mangaData)
    console.log(mangaData.data.top) // array

    mangaData.data.top.forEach(mangaInList => {
        const mangaCards = document.querySelector('.cards');
        // mangaCards.innerHTML += `<ul>
        // <h3> ${mangaInList.title} </h3>
        // <p> Type: ${mangaInList.type} </p>
        // <img src="${mangaInList.image_url}">
        // <p> Rank: ${mangaInList.rank} - Score: ${mangaInList.score}/10 </p>
        // <p> Click <a href="${mangaInList.url}"> here </a> for more information </p>
        // </ul>`
        mangaCards.innerHTML += `
        <img src="${mangaInList.image_url}">
        `
    })

})