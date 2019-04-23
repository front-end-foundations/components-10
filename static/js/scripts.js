const carouselLinks = document.querySelectorAll('.image-tn a');
const carousel = document.querySelector('figure img');
const carouselPara = document.querySelector('figcaption');

carouselLinks.forEach(carouselLink =>
  carouselLink.addEventListener('click', runCarousel),
);

function runCarousel() {
  const imageHref = event.target.parentNode.getAttribute('href');
  const titleText = event.target.title;
  carousel.setAttribute('src', imageHref);
  carouselPara.innerHTML = titleText;
  event.preventDefault();
}

//////

document.addEventListener('click', clickHandlers)

function clickHandlers(){
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')){
    videoSwitch()
    event.preventDefault();
  }
}

var videoSwitch = function () {
  const iFrame = document.querySelector('iframe');
    const videoLinks = document.querySelectorAll('.content-video a');
    videoLinks.forEach(videoLink => videoLink.classList.remove('active'));
    event.target.classList.add('active');
    const videoToPlay = event.target.getAttribute('href');
    iFrame.setAttribute('src', videoToPlay);
}

// Fetch data from NYTimes
var nyt = 'https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=OuQiMDj0xtgzO80mtbAa4phGCAJW7GKa'

var addContent = function(data){
  var looped = ''
  for(i=0; i<data.results.length; i++){
    looped += `
      <div class="item">
        <h3>${data.results[i].title}</h3>
        <p>${data.results[i].abstract}</p>
      </div>
      `
  }
  if (document.querySelector('.content .blog')) {
    document.querySelector('.content .blog').innerHTML = looped
  }
}

var getData = function () {
	fetch(nyt)
  .then(response => response.json())
  .then(json => addContent(json))
}

getData();