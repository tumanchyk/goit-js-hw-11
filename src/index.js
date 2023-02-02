import { fetchCard } from "./js/fetchPhotoCard";
import { makeCardMarkup} from "./js/makeMarkupCard";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { LoadMoreBtn } from "./js/loadMoreBtn";

const galleryEl = document.querySelector('.gallery')
const formEl = document.getElementById('search-form')
let gallery = new SimpleLightbox('.gallery a');
const btnLoadMore = new LoadMoreBtn({ selector: '.load-more',
isHidden: true})

formEl.addEventListener('submit', onFormSubmit);
btnLoadMore.button.addEventListener('click', onBtnLoadMore)

function onFormSubmit(e){
e.preventDefault();
const form = e.currentTarget;
const query = e.target.searchQuery.value.trim();
clearGallery();
if(query === '') return

fetchCard(query).then(({hits, totalHits}) =>{     
    hits.length === 0 ? Notify.failure('Sorry, there are no images matching your search query. Please try again.') :            Notify.success(`Hooray! We found ${totalHits} images.`)
        return hits
     }).then(makeCardMarkup).then(addMarkup)


}
function onBtnLoadMore(){
    btnLoadMore.disable()
console.log('yes')

}

function addMarkup(markup){
    galleryEl.innerHTML = markup
  }

  function updateMarkup(markup){
galleryEl.insertAdjacentHTML('beforeend', markup)
  }

  function clearGallery(){
    galleryEl.innerHTML = ''
  }
function onError(error){
    console.log(error)
    
}
