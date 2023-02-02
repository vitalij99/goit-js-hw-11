const gallery = document.getElementsByClassName("gallery")[0]

function createImgsToHtml(data) {
    console.log(data)
    
    const mass = data.reduce((markup, img) => createImg(img) + markup, "")
    gallery.insertAdjacentHTML("beforeend", mass) 
    
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
export {createImgsToHtml}