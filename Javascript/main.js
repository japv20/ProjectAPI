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

    })
})