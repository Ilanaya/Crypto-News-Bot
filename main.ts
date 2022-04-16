import { fetch } from  'undici' ;
import { ResponseType } from './types';
const API_KEY =  '088535a8670f925a47853a2ec672d91f9425240c0c3d2883b5cd40d57b9ef8d6' ;



async function fetchNews() {
    const res = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`);
    const news = await res.json();
    return news;
}
(async () => {
    try{
        const mainData = await fetchNews() as ResponseType;
        const neededNewsData = mainData.Data.map(({ published_on, url:rawUrl, title }) => {
            return {
                title,
                creationTime: new Date(published_on),
                url: new URL(rawUrl).href
            };
        });
        console.log(neededNewsData);
    }catch(error){
        console.error(error);
    }
    
})();
