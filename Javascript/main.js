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
    
        const informationPrint = document.querySelector('.information');
        informationPrint.innerHTML += `<ul> 
        <h3> ${animeInList.title} </h3>
        <img src="${animeInList.image_url}">
        <p> Synopsis: ${animeInList.synopsis}. </p>
        <p> Start date: ${animeInList.airing_start} </p>
        <p> Type: ${animeInList.type} - Episodes: ${animeInList.episodes} </p>
        <p> Click <a href="${animeInList.url}" here </a> for more information. </p>
        </ul>`
    }) //<p> Genres: ${animeInList.genres.name} </p>
})