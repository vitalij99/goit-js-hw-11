import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { search } from "./js/api"
import { createImgsToHtml } from "./js/gallery"


const lightbox = new SimpleLightbox('.gallery a', {
    
    captionsData: "alt",
    captionDelay:250,
});

async function searchImg() {
    const response = await search("cat")
    createImgsToHtml(response.hits)
}

searchImg()



