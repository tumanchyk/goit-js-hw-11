import { PhotoAPI } from "./js/fetchPhotoCard";
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
const newApi = new PhotoAPI()


formEl.addEventListener('submit', onFormSubmit);
btnLoadMore.button.addEventListener('click', onBtnLoadMore)

async function onFormSubmit(e){
  e.preventDefault();
  newApi.resetPage()
  btnLoadMore.hide()
  const form = e.currentTarget;
  const query = e.target.searchQuery.value.trim()  
  newApi.queryItem = query
  clearGallery();
  if(query === '') return
  try{
    const data = await newApi.fetchCard();
    const hits = data.hits;
    const totalHits = data.totalHits;
    if(hits.length === 0)   throw new Error('error'); 
    Notify.success(`Hooray! We found ${totalHits} images.`)
    addMarkup(hits)
  } catch{
    onError()
  } finally{
    form.reset()
  }
}

async function onBtnLoadMore(){ 
  btnLoadMore.disable()
  try{
    const data = await newApi.fetchCard()
    const hits = data.hits
    addMarkup(hits)
  } catch(error) {
    onError()
  } 
}

 async function addMarkup(hits){
  const hitsLength = hits.length
  if(hitsLength < 40){
    Notify.info('We are sorry, but you have reached the end of search results.')
    const markup = await makeCardMarkup(hits)
    updateMarkup(markup)
    gallery.refresh();
    btnLoadMore.hide()
    return
  }
  const markup = await makeCardMarkup(hits)
  updateMarkup(markup)
  gallery.refresh();
  btnLoadMore.show()
  btnLoadMore.enable()
}


function updateMarkup(markup){
  galleryEl.insertAdjacentHTML('beforeend', markup)
}

function clearGallery(){
  galleryEl.innerHTML = ''
}

function onError(){
  Notify.failure('Sorry, there are no images matching your search query. Please try again.')    
}
