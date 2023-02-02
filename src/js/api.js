import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { delateHtml } from "./gallery"

const URL = "https://pixabay.com/api/"
const KEY = "33315220-d20fa579ea7477e98c433b81c"
let lastSearch = " "
let page = 1


const params = new URLSearchParams({
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
})

async function search( data = lastSearch) {
    
    
    
    const arr = `${URL}?key=${KEY}&q=${data}&page=${page}`
    try {
        if (page === 1) {
            const ress = await axios.get(arr, { params }).then((res) => res.data)
            Notify.success(`Hooray! We found ${ress.totalHits} images.`)
            page += 1
            lastSearch = data  
            return ress
        }
        else if (data !== lastSearch) {            
            delateHtml()
            page = 1 
            const ress = await axios.get(arr, { params }).then((res) => res.data)
            Notify.success(`Hooray! We found ${ress.totalHits} images.`)
            return ress
        }
        lastSearch = data     
        page += 1    

        return await axios.get(arr, { params }).then((res) => res.data)
    } catch (error) {
        Notify.failure(error.message)        
    }
    
}
export  {search}