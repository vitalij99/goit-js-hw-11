import { search } from "./js/api"
import { createImgsToHtml } from "./js/gallery"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("form");
const moreBtn = document.getElementsByClassName("load-controls")[0];
const infinityCheckBox = document.getElementsByClassName('js-allow-infinity')[0];
let intervatToinfinity = null;

moreBtn.addEventListener("click",loadMore)
form.addEventListener("submit",sub)
infinityCheckBox.addEventListener('change', setInfinityLoad);


async function searchImg(data) {    
    const response = await search(data)
    if (response.totalHits === 0) {             
        Notify.failure("image not found")
        if (!moreBtn.classList.contains("ishidden")) moreBtn.classList.add("ishidden")
    } else {
        if (moreBtn.classList.contains("ishidden")) moreBtn.classList.remove("ishidden")        
        createImgsToHtml(response)
    }
}
async function loadMore() {
    const response = await search()      
    
    createImgsToHtml(response)
}



function sub(e) {
    
    if (!moreBtn.classList.contains("ishidden")) moreBtn.classList.add("ishidden")
    e.preventDefault()
    
    searchImg(e.target.elements.searchQuery.value)    
}

function setInfinityLoad() {
    intervatToinfinity = setInterval(startInterval, 2000) 
    if (!infinityCheckBox.checked  ) {
        clearInterval(intervatToinfinity)
        intervatToinfinity = null;
        console.log(intervatToinfinity)
    }  
}
function startInterval() {    
    
    const y = window.scrollY;
    if (document.body.scrollHeight <= y + 2000) {
        // loadMore()
        console.log(intervatToinfinity)
        
    }
};
function deletInfinityLoad() {
    intervatToinfinity = null;
    console.log("stop")
}



