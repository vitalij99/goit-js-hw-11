import { search } from "./js/api"
import { createImgsToHtml } from "./js/gallery"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("form");
const moreBtn = document.getElementsByClassName("load-controls")[0];
const infinityCheckBox = document.getElementsByClassName('js-allow-infinity')[0];


moreBtn.addEventListener("click",loadMore)
form.addEventListener("submit",sub)

infinityCheckBox.addEventListener('change', setInfinityLoad);


async function searchImg(data) {
    const response = await search(data)
    console.log( response)
    if (response.totalHits === 0) {             
        Notify.failure("image not found")
        if (!moreBtn.classList.contains("ishidden")) moreBtn.classList.add("ishidden")
    } else {
        if (moreBtn.classList.contains("ishidden")) moreBtn.classList.remove("ishidden")
        
        createImgsToHtml(response.hits)
        }
}
async function loadMore() {
    const response = await search() 
    
    
    
    createImgsToHtml(response.hits)
}



function sub(e) {
    
    if (!moreBtn.classList.contains("ishidden")) moreBtn.classList.add("ishidden")
    e.preventDefault()
    
    searchImg(e.target.elements.searchQuery.value)    
}

function setInfinityLoad(event) {
  isInfinityLoad = event.currentTarget.checked;
  isInfinityLoad
    ? intersectionObserver.observe(observerGuard)
        : intersectionObserver.unobserve(observerGuard);
};




const lightbox = new SimpleLightbox('.gallery a', {    /* options */
    
});