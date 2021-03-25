var DateTime = luxon.DateTime;

const getSpringData = async() => {
    let data = await axios.get("https://api.jikan.moe/v3/season/2021/spring");
    return data;
}

const getSummerData = async() => {
    let summer = await axios.get("https://api.jikan.moe/v3/season/2021/summer");
    return summer;
}

document.addEventListener('DOMContentLoaded', async() => {
    console.log("Hello")
    const springData = await getSpringData();
    //console.log(springData);
    const summerData = await getSummerData();
    //console.log(summerData);

    const springAnimes = springData.data.anime; // spring array
    const summerAnimes = summerData.data.anime; // summer array
    const upcomingAnimes = [...springAnimes, ...summerAnimes]
    console.log(upcomingAnimes)

    upcomingAnimes.forEach(animeInList => {
        
        function dataByMALID(mal_id) {
            const foundMalID = upcomingAnimes.find(id => id.mal_id == mal_id);
            return foundMalID;
        }
    
        function dataWantedToDisplay(byMalID) {
            console.log(byMalID.genres);
            // byMalID.genres.forEach(genreInList => {
            //     console.log(genreInList.name);
            // }
            
            const formatedDate = DateTime.fromISO(byMalID.airing_start).toFormat('DDD');
            
            const dataContainer = document.querySelector('.text');
            dataContainer.innerHTML = ` 
            <h3> ${byMalID.title} </h3>
            <ul id="animeDetails">
            <li> Synopsis: ${byMalID.synopsis}. </li>
            <li> Start date: ${formatedDate} </li>
            <li> Type: ${byMalID.type} - Episodes: ${animeInList.episodes} </li>
            </ul>
            <p> Click <a href="${byMalID.url}" here </a> for more information. </p>`

            for (let i=0; i < byMalID.genres.length; ++i) {
                console.log(byMalID.genres);
                const dataListItem = document.querySelector('#animeDetails');
                dataListItem.innerHTML += `<li> Genre: ${byMalID.genres[i].name} </li>`
            }
        }

        const informationPrint = document.querySelector('.wallpaper');
        const animeWallpapers = animeInList.image_url;
        informationPrint.innerHTML += ` <img src="${animeWallpapers}" id="${animeInList.mal_id}"> `

        const animePictures = document.getElementsByTagName("img");
        for (i= 0; i < animePictures.length; i++) {
            //animePictures[i].className += "anime-pics"
        }
        //console.log(animePictures)
    
    const wallpaperAnime = [...animePictures]; // Array of Pictures.
    //console.log(wallpaperAnime);

    wallpaperAnime.forEach(pictureInPage => {
        const modal = document.querySelector('#myModal');
        const closeButton = document.querySelector('.close');

        pictureInPage.addEventListener('click', function (event) {
            console.log("You clicked me.")

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
    
})
})

