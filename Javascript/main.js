var DateTime = luxon.DateTime;

const getSpringData = async() => {
    let spring = await axios.get("https://api.jikan.moe/v3/season/2021/spring");
    return spring;
}

const getSummerData = async() => {
    let summer = await axios.get("https://api.jikan.moe/v3/season/2021/summer");
    return summer;
}

document.addEventListener('DOMContentLoaded', async() => {
    // console.log("Hello")
    const springData = await getSpringData(); //console.log(springData);
    const summerData = await getSummerData(); //console.log(summerData);

    const springAnimes = springData.data.anime; // spring array
    const summerAnimes = summerData.data.anime; // summer array
    const upcomingAnimes = [...springAnimes, ...summerAnimes]
    console.log(upcomingAnimes)

    let randomAnime = upcomingAnimes[Math.floor(Math.random() * upcomingAnimes.length)]; // console.log(randomAnime)

    for (let i=0; i < 4; i++) {
        let randomPicked = upcomingAnimes[Math.floor(Math.random()*upcomingAnimes.length)]
        // console.log(randomPicked)
        const imagesContainer = document.getElementById('gallery-pics')
        imagesContainer.innerHTML += `
        <div class="slides">
        <img src="${randomPicked.image_url}" id="${randomPicked.mal_id}" alt="${randomPicked.title}" class="pics-gallery">
        <div class="caption"> <caption class="text"> ${randomPicked.title} </caption> </div>
        </div>
        `;
    }

    let myIndex = 0;
    carousel();

    function carousel() {
        let i;
        let images = document.getElementsByClassName("pics-gallery");
        let caption = document.getElementsByClassName('caption');
        for (i = 0; i < images.length; i++) {
            images[i].style.display = "none";
            caption[i].style.display = "none";
        }
        
        myIndex++;
        if (myIndex > images.length) {myIndex = 1}    
        images[myIndex-1].style.display = "block";
        caption[myIndex-1].style.display = "block";  
        let timer = setTimeout(carousel, 1500); // Change image every 3.5 seconds
    
        const pauseCarousel = document.getElementById('pause');
        pauseCarousel.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Pause")
            clearTimeout(timer);
        })
    }

    const playCarousel = document.getElementById('play');
    playCarousel.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Play");
        setTimeout(carousel, 1500);
    })

    upcomingAnimes.forEach(animeInList => {
        
        function dataByMALID(mal_id) {
            const foundMalID = upcomingAnimes.find(id => id.mal_id == mal_id);
            return foundMalID;
        }
    
        function dataWantedToDisplay(byMalID) {
            const formatedDate = DateTime.fromISO(byMalID.airing_start).toFormat('DDD');
            const dataContainer = document.querySelector('.info-container');
            dataContainer.innerHTML = ` 
            <h3> ${byMalID.title} </h3>
            <ul id="animeDetails">
            <li> Synopsis: ${byMalID.synopsis}. </li>
            <li> Start date: ${formatedDate} </li>
            <li> Type: ${byMalID.type} - Episodes: ${animeInList.episodes} </li>
            <p> Genres: </p>
            </ul>
            <p> Click <a href="${byMalID.url}"> here </a> for more information. </p>`

            for (let i=0; i < byMalID.genres.length; ++i) {
                // console.log(byMalID.genres);
                const dataListItem = document.querySelector('#animeDetails');
                dataListItem.innerHTML += `
                <button type="button" class="genre-buttons" id="${byMalID.genres[i].mal_id}"> ${byMalID.genres[i].name} </button>`
            }
        }

        const informationPrint = document.querySelector('.wallpaper');
        const animeWallpapers = animeInList.image_url;
        informationPrint.innerHTML += ` <img src="${animeWallpapers}" id="${animeInList.mal_id}" alt="Anime: ${animeInList.title}"> `

        const animePictures = document.getElementsByTagName("img"); //console.log(animePictures)
        const wallpaperAnime = [...animePictures]; // Array of Pictures. //console.log(wallpaperAnime);

        wallpaperAnime.forEach(pictureInPage => {
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

            for (i = 0; i < upcomingAnimes.length; i++) {
                if (upcomingAnimes[i].title.toLowerCase() == introducedTitle.toLowerCase()) {
                    const printSearchedData = document.querySelector('#results');
                    printSearchedData.innerHTML = `
                    <h3> ${upcomingAnimes[i].title} </h3>
                    <img src="${upcomingAnimes[i].image_url}" id="${upcomingAnimes[i].mal_id}" alt="Anime: ${upcomingAnimes[i].title}">
                    <div class="dataResults">
                    <p> Synopsis: ${upcomingAnimes[i].synopsis}. </p>
                    <p> Type: ${upcomingAnimes[i].type} - Episodes: ${upcomingAnimes[i].episodes} </p>
                    <p> Click <a href="${upcomingAnimes[i].url}"> here </a> for more information. </p>
                </div> `
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