import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { delateHtml } from "./gallery"

const infinityCheckBox = document.getElementsByClassName('js-allow-infinity')[0];
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
    
    try {
        if (data !== lastSearch) {
            page = 1 
            lastSearch = data  
            const arr = `${URL}?key=${KEY}&q=${data}&page=${page}`
            delateHtml()                 
            const ress = await axios.get(arr, { params }).then((res) => res.data)
            Notify.success(`Hooray! We found ${ress.totalHits} images.`)
            page += 1  
            infinityCheckBox.checked = false
            return ress}
        
        else {
            const arr = `${URL}?key=${KEY}&q=${data}&page=${page}`                        
            page += 1
            lastSearch = data  
            return await axios.get(arr, { params }).then((res) => res.data)
        }
        
       
        
    } catch (error) {
        Notify.failure(error.message)        
    }
        
    
}

export  {search}