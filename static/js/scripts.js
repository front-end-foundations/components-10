document.addEventListener('click', clickHandlers)

function clickHandlers(){
  console.log(event.target)
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')){
    videoSwitch()
    event.preventDefault();
  }
  else if (event.target.matches('.image-tn img')) {
    runCarousel()
    event.preventDefault();
  }
}

function runCarousel(){
  const imageHref = event.target.parentNode.getAttribute('href');
  const titleText = event.target.title;
  document.querySelector('figure img').setAttribute('src', imageHref);
  document.querySelector('figcaption').innerHTML = titleText;
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