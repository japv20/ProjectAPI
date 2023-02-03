var DateTime = luxon.DateTime;

const getData = async() => {
    let data = await axios.get("https://api.jikan.moe/v4/top/manga");
    return data;
}

document.addEventListener('DOMContentLoaded', async() => {
    console.log("Hello")
    const mangaData = await getData();
    console.log(mangaData) // console.log(mangaData.data.data) // array
    let topMangas = mangaData.data.data;

    topMangas.forEach(mangaInList => {

        function dataByMALID(mal_id) {
            const foundMalID = topMangas.find(id => id.mal_id == mal_id);
            return foundMalID;
        }

        function dataWantedToDisplay(byMalID) {
            const formatedDate = DateTime.fromISO(byMalID.published.from).toFormat('DDD');
            const dataContainer = document.querySelector('.info-container');
            dataContainer.innerHTML = ` 
            <h3> ${byMalID.title} </h3>
            <ul id="animeDetails">
            <li> ${byMalID.synopsis} </li>
            <li> Published date: ${formatedDate} </li>
            <li> Rank: ${byMalID.rank} - Score: ${byMalID.score}/10 </li>
            <li> Type: ${byMalID.type} - Volumes: ${byMalID.volumes} </li>
            </ul>
            <p> Click <a href="${byMalID.url}"> here </a> for more information. </p>`
        }

        const mangaCards = document.querySelector('.cards');
        // const mangaWalppapers = mangaInList.images.jpg 
        mangaCards.innerHTML += ` <img src="${mangaInList.images.jpg}" id="${mangaInList.mal_id}" alt="Manga ${mangaInList.title}"> `

        const mangaPictures = document.getElementsByTagName('img'); // console.log(mangaPictures)
        const wallpaperManga = [... mangaPictures]; // console.log(wallpaperManga);

        wallpaperManga.forEach(pictureInPage => {
            const modal = document.querySelector('#myModal');
            const closeButton = document.querySelector('.close');

            pictureInPage.addEventListener('click', function (event) {
                // console.log("You clicked me.")
                const getMalData = dataByMALID(event.target.id);
                dataWantedToDisplay(getMalData)

                modal.style.display = "block";

                closeButton.addEventListener('click', function (eventClose) {
                    modal.style.display = "none";
                })
    
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                }
            }
        })
    })
    const searchButton = document.querySelector('#search-button');
    // const searchInput = document.querySelector('#search');
    function searchBar() {
        introducedTitle = document.querySelector('#search').value;
        console.log(`You are looking for ${introducedTitle}`);

        for (i = 0; i < topMangas.length; i++) {
            if (topMangas[i].title.toLowerCase() == introducedTitle.toLowerCase()) {
                const printSearchedData = document.querySelector('#results');
                printSearchedData.innerHTML = `
                <h3> ${topMangas[i].title} </h3>
                <img src="${topMangas[i].image_url}" id="${topMangas[i].mal_id}" alt="Anime: ${topMangas[i].title}">
                <div class="dataResults">
                <ul>
                <li> Start date: ${topMangas[i].start_date} </li>
                <li> End date: ${topMangas[i].end_date} </li>
                <li> Rank: ${topMangas[i].rank} - Score: ${topMangas[i].score}/10 </li>
                <p> Type: ${topMangas[i].type} - Volumes: ${topMangas[i].volumes} </p>
                <p> Click <a href="${topMangas[i].url}"> here </a> for more information. </p>
                </ul>
                </div>`
        const errorMessage = document.querySelector('#error-results');
        errorMessage.style.display = "none"
            } 
            else {
                const errorMessage = document.querySelector('#error-results');
                errorMessage.innerHTML = (new Error ('Sorry! We are having trouble finding your search. Please restart your search before starting a new one :)'));
                }
        }
    }

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        searchBar();
    })
})
})