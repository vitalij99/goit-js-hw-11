
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { search } from "./js/api"
import { createImgsToHtml } from "./js/gallery"

const form = document.querySelector("form");
const moreBtn = document.getElementsByClassName("load-controls")[0];
const infinityCheckBox = document.getElementsByClassName('js-allow-infinity')[0];
let intervatToinfinity = null;

moreBtn.addEventListener("click",loadMoreAndScroll)
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

async function loadMoreAndScroll() {
   await loadMore()
    const { height: cardHeight } = document.querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({top: cardHeight * 2, behavior: "smooth",});
}

function sub(e) {
    
    if (!moreBtn.classList.contains("ishidden")) moreBtn.classList.add("ishidden")
    e.preventDefault()
    
    searchImg(e.target.elements.searchQuery.value)    
}

function setInfinityLoad() {


    if (!infinityCheckBox.checked  ) {
        clearInterval(intervatToinfinity)

    } else {
         intervatToinfinity = setInterval(startInterval, 1000) 
    }
}
function startInterval() {    
    if (!infinityCheckBox.checked) { clearInterval(intervatToinfinity)
    }
    const y = window.scrollY;
    if (document.body.scrollHeight <= y + 2000) {
        loadMore()      
    }
};


