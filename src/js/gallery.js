
 import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let simpleLightBox

const moreBtn = document.getElementsByClassName("load-controls")[0];
const gallery = document.getElementsByClassName("gallery")[0]  

function createImgsToHtml(data) {  
   
    const mass = data.hits.reduce((markup, img) => createImg(img) + markup, "")
    gallery.insertAdjacentHTML("beforeend", mass)   
    if (gallery.children.length === data.totalHits) {
      gallery.insertAdjacentHTML("beforeend", "<p>We're sorry, but you've reached the end of search results.</p>")
       if (!moreBtn.classList.contains("ishidden")) moreBtn.classList.add("ishidden")
  }
  simpleLightBox = new SimpleLightbox('.gallery a').refresh();
  
}
function delateHtml() {
   gallery.innerHTML = ""
}
function createImg({webformatURL,largeImageURL,tags,likes ,views ,comments ,downloads }) {
    return `<a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
              <ul class="info-list">
                <li class="info-item">
                  <p>Likes: ${likes}</p>            
                  <p>Views: ${views}</p>
                </li>
                <li class="info-item">
                  <p>Comments: ${comments}</p>                                
                  <p>Downloads: ${downloads}</p>
                </li>
              </ul>
              </div>
          </a>`
        ;
}
export {createImgsToHtml,delateHtml}