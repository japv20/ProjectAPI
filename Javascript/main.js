var DateTime = luxon.DateTime;

const getSpringData = async() => {
    let data = await axios.get("https://api.jikan.moe/v3/season");
    //let winter = await axios.get("https://api.jikan.moe/v3/season/2021/summer");
    return data;
}

const getSummerData = async() => {
    let summer = await axios.get("https://api.jikan.moe/v3/season/2021/summer");
    return summer;
}

document.addEventListener('DOMContentLoaded', async() => {
    console.log("Hello")
    const springData = await getSpringData();
    console.log(springData);
    const summerData = await getSummerData();
    console.log(summerData);

    const springAnimes = springData.data.anime; // spring array
    const summerAnimes = summerData.data.anime; // summer array
    const upcomingAnimes = [...springAnimes, ...summerAnimes]
    console.log(upcomingAnimes)

    upcomingAnimes.forEach(animeInList => {  
        const informationPrint = document.querySelector('.wallpaper');
        const animeWallpapers = animeInList.image_url;
        informationPrint.innerHTML += ` <img src="${animeWallpapers}"> `

    // function displayDesiredInformation() {
    //     const dataContainer = document.querySelector('.text')
    //     dataContainer.innerHTML = ` <ul> 
    //     <h3> ${animeInList.title} </h3>
    //     <p> Synopsis: ${animeInList.synopsis}. </p>
    //     <p> Start date: ${animeInList.airing_start} </p>
    //     <p> Type: ${animeInList.type} - Episodes: ${animeInList.episodes} </p>
    //     <p> Click <a href="${animeInList.url}" here </a> for more information. </p>
    //     </ul> `
    //     }
    })

    const animePictures = document.getElementsByTagName("img");
    for (i= 0; i < animePictures.length; i++) {
        animePictures[i].className += "anime-pics"
    }

    //console.log(animePictures)
    const wallpaperAnime = [...animePictures]; // Array of Pictures.
    console.log(wallpaperAnime);

    wallpaperAnime.forEach(pictureInPage => {
        pictureInPage.addEventListener('click', function (event) {
            console.log("You clicked me.")
            //displayDesiredInformation();
        const dataContainer = document.querySelector('.text')
        dataContainer.innerHTML = `<ul> Hello </ul>`
        })
    })
})