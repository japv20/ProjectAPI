var DateTime = luxon.DateTime;

const getSpringData = async() => {
    let data = await axios.get("https://api.jikan.moe/v3/season");
    //let winter = await axios.get("https://api.jikan.moe/v3/season/2021/summer");
    return data;
}
console.log(getSpringData())

const getSummerData = async() => {
    let summer = await axios.get("https://api.jikan.moe/v3/season/2021/summer");
    return summer;
}
console.log(getSummerData())

document.addEventListener('DOMContentLoaded', async() => {
    console.log("Hello")
    const springData = await getSpringData();
    console.log(springData);
    const summerData = await getSummerData();
    console.log(summerData);

    //console.log(springData.data.anime) // spring array
    const springAnimes = springData.data.anime;
    //console.log(springAnimes);
    //console.log(summerData.data.anime) //summer array
    const summerAnimes = summerData.data.anime;
    //console.log(summerAnimes)
    
    const upcomingAnimes = [...springAnimes, ...summerAnimes]
    console.log(upcomingAnimes)
    console.log(upcomingAnimes[0].genres)
    console.log(upcomingAnimes[0].genres[0].name)

    upcomingAnimes.forEach(animeInList => {
        //console.log(animeInList.genres)
    
        const informationPrint = document.querySelector('.wallpaper');
        /*informationPrint.innerHTML += `<ul> 
        <h3> ${animeInList.title} </h3>
        <img src="${animeInList.image_url}">
        <p> Synopsis: ${animeInList.synopsis}. </p>
        <p> Start date: ${animeInList.airing_start} </p>
        <p> Type: ${animeInList.type} - Episodes: ${animeInList.episodes} </p>
        <p> Click <a href="${animeInList.url}" here </a> for more information. </p>
        </ul>` */
        //<p> Genres: ${animeInList.genres.name} </p>

        const animeWallpapers = animeInList.image_url;
        informationPrint.innerHTML += ` <img src="${animeWallpapers}"> `

        /*function dataWantedFromAPI() {
            let textPrint = document.querySelector('.text')
            textPrint += ` <ul> 
        <h3> ${animeInList.title} </h3>
        <p> Synopsis: ${animeInList.synopsis}. </p>
        <p> Start date: ${animeInList.airing_start} </p>
        <p> Type: ${animeInList.type} - Episodes: ${animeInList.episodes} </p>
        <p> Click <a href="${animeInList.url}" here </a> for more information. </p>
        </ul> `
        } */
        //console.log(informationPrint)
        let pictureSpaces = document.getElementsByClassName('wallpapers')
        //console.log(pictureSpaces)
        const pictureField = [...pictureSpaces]
        console.log(pictureField)

        // informationPrint.addEventListener('click', function() {
        //     console.log("Hello there")
        //     dataWantedFromAPI()
        // })
    })
})