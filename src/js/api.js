import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const URL = "https://pixabay.com/api/"
const KEY = "33315220-d20fa579ea7477e98c433b81c"


const params = new URLSearchParams({
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 10,
})

async function search(data, page = 1) {
    
    const arr = `${URL}?key=${KEY}&q=${data}&page=${page}`
    try {        
        return await axios.get(arr, { params }).then((res) => res.data)
    } catch (error) {
        Notify.failure(error.message)        
    }
    
}
export  {search}