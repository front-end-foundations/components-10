# X - Components and Forms

The Master branch of this repo is where we left off in session 9. The dev branch is being deployed to Netlify.

## Exercise continued - Site Redesign

Here is where we left off in session 10 - https://session10.netlify.com

Log in to Github ** _Download the zip file_ ** 
Create a new empty repo.

`cd` into `component-inclass-master` and initialize a repository:

```sh
$ git init
$ git add .
$ git commit -m 'initial commit'
$ git remote add origin <your-github-repo>
$ git push -u origin master
```

Install dependencies and run the application.

```sh
npm i
npm start
```

## Deployment

We'll use [Netlify](https://www.netlify.com/). 

Log in to [app.netlify.com](https://app.netlify.com), click "New site from Git" and create a new site.

Set up Netlify to allow continuous deployment on the Master branch of your Github repo.

* use the terminal to create and checkout a new branch

```sh
$ git status 
$ git branch dev
$ git checkout dev
```

In the future you will be able to merge your dev branch into the master branch to have your site deployed.

E.g. from the dev branch:

```sh
$ git status 
$ git add .
$ git commit -m 'commit message'
$ git checkout master
$ git merge dev
$ git push -u origin master
```

Be sure to run `git status` before switching or merging branches.

## Refactoring Components

Review the interdependencies between content (the pages folder) and layouts.

## JavaScript

Here is the script fro the image viewer page:

```js
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
```

We will refactor it to use event delegation.

First - comment out the script above.

Let's see what we are clicking on when we click on a thumbnail.

```js
function clickHandlers() {
  console.log(event.target);
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')){
    videoSwitch()
    event.preventDefault();
  } 
  event.preventDefault();
}
```

We are getting the image node.


Block the default event on the click:

```js
function clickHandlers() {
  if (event.target.matches('#pull')){
    document.querySelector('body').classList.toggle('show-nav');
    event.preventDefault();
  }
  if (event.target.matches('.content-video a')){
    videoSwitch()
    event.preventDefault();
  } else if (event.target.matches('.image-tn img')) {
    event.preventDefault();
  }
}
```

Add a function:

```js
function runCarousel() {
  const imageHref = event.target.parentNode.getAttribute('href');
  console.log(imageHref);
}
```

and a call to that function

```js
else if (event.target.matches('.image-tn img')) {
  runCarousel()
  event.preventDefault();
}
```

Our clicks now capture the href value of the linked thumbnails.

Capture the title text:

```js
function runCarousel() {
  const imageHref = event.target.parentNode.getAttribute('href');
  const titleText = event.target.title;
  console.log(titleText)
}
```

Finallly, use those two variables to set the large image and caption:

```js
function runCarousel() {
  const imageHref = event.target.parentNode.getAttribute('href');
  const titleText = event.target.title;
  document.querySelector('figure img').setAttribute('src', imageHref);
  document.querySelector('figcaption').innerHTML = titleText;
}
```

Compare the commented out function. Note how simpler and maintainable the event delegation sysstem is.

## Forms

Use the following in the `contact.html` component:

```html
<form name="contact" method="POST" action="/" autocomplete="true">
  <fieldset>
    
    <label for="name">Your name</label>
    <input type="text" name="name" id="name" placeholder="Name" required autocomplete = "off" autofocus />
    
    <label for="email">Email address</label>
    <input type="email" name="email" id="email" placeholder="Email" required autocomplete = "off"   />

    <label for="website">Website</label> 
		<input type="url" name="website" required placeholder="http://www.example.com" />

		<label for="number">Number</label> 
		<input type="number" name="number" min="0" max="10" step="2" required placeholder="Even num < 10">

		<label for="range">Range</label> 
		<input type="range" name="range" min="0" max="10" step="2" />
    
    <label for="message">Your message</label>
    <textarea name="message" id="message" placeholder="Your message" rows="7"></textarea>
    
    <button type="submit" name="submit">Send Message</button>
    
  </fieldset>
</form>
```

Let's get the form onto our page before we examine it.

Create a layout which includes the form, `layouts/contact.html`:

```yml
---
layout: layouts/layout.html
---

<article>
  {% include components/contact.html %}
</article>
```

Edit the content `contact.md`:

```yml
---
layout: layouts/contact.html
pageTitle: Contact Us
navTitle: Contact
date: 2019-04-01
---

## Why contact us?

Not certain if we'll ever get back to you but its worth a try.
```

Add a content block to the template:

`{{ content }}`

### Form Elements

`<form>`:
* action - specifies where to send the user when a form is submitted
* autocomplete - specifies whether a form should have autocomplete on or off
* method - specifies the HTTP method to use when sending form-data
* name - specifies the name of a form
* novalidate - turns validation off, typically used when you provide your own custom validations routines

`<fieldset>`:  
* allows the form to be split into multiple sections (e.g. shipping, billing)
* not really needed here

`<label>`:
* identifies the field's purpose to the user
* the `for` attribute of the `<label>` tag should be the same as the id attribute of the related input to bind them together

`<input>`: 
* specifies an input field where the user can enter data. 
* can accept autocomplete and autofocus
* is empty (`/>`) and consists of attributes only

`<input>` attributes:
* `name` - Specifies the name of an `<input>` element used to reference form data after a form is submitted
* `type` - the [most complex](https://www.w3schools.com/tags/att_input_type.asp) attribute, determines the nature of the input
* `required` - works with native HTML5 validation
* `placeholder` - the text the user sees before typing

Additional input attributes we will be using:
* `pattern` - uses a [regular expression](https://www.w3schools.com/TAGS/att_input_pattern.asp) that the `<input>` element's value is checked against on form submission
* `title` - use with pattern to specify extra information about an element, not form specific, often shown as a tooltip text, here - describes the pattern to help the user

### Form CSS

Create and link a new sass partial called `_form.scss`:

```css
form {
  padding: 2em 0;
}

form label {
  /* display: none; */
}

input,
textarea,
button {
  width: 100%;
  padding: 1em;
  margin-bottom: 1em;
  font-size: 1rem;
}

input,
textarea {
  border: 1px solid $med-gray;
  border-radius: 5px;
}

button {
  border: 1px solid $link;
  background-color: $link;
  color: #fff;
  cursor: pointer;
}
```

There are a number of css pseudo selectors and techniques that can be used with forms:

```css
input:focus, textarea:focus {
  box-shadow:0 0 15px lighten( $link, 40% );
}

input:not(:focus), textarea:not(:focus) {
  opacity:0.35;
}

input:required, textarea:required {
  background-color: lighten( $link, 60% );					
}

input:valid, textarea:valid {
  background-color: lighten( green, 60% );			
}

input:invalid, textarea:invalid {
  background-color: lighten( red, 40% );					
}

input:focus:invalid, textarea:focus:invalid {
  background-color: lighten( red, 40% );					
}
```

DELETE THE FORM FIELDS LEAVING ONLY THE BUTTON.

Edit the first field:

```html
<input type="text" name="name" id="name" required autocomplete="name" title="Please enter your name" />
<label for="name">Name</label>
```

Note the tooltip and autocomplete action.

Note that I have placed the labels after the inputs. Placing them before would be more common.

Edit the second field:


```html
<input type="email" name="email" id="email" autocomplete="email" title="The domain portion of the email address is invalid (the portion after the @)." pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$" required />
  <label for="email">Email</label>
```

Edit the textarea:

```html
<textarea name="message" id="message" placeholder="Write your message here" rows="7" required></textarea>
<label for="message">Message</label>
```

Add a data attribute to allow Netlify to process the posting:

```html
<form name="contact" method="POST" data-netlify="true" action="/">
```

Note: the form will not function correctly on localhost. 

In order to run the form locally we might try installing [Netlify Dev](https://www.netlify.com/products/dev/) but for today we'll deploy and test the deployed form.

End form:

```html
<form name="contact" method="POST" data-netlify="true" action="/">
<fieldset>
  
  <input type="text" name="name" id="name" autocomplete="name" title="Please enter your name" required />
  <label for="name">Name</label>

  <input type="email" name="email" id="email" autocomplete="email" title="The domain portion of the email address is invalid (the portion after the @)." pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$" required />
    <label for="email">Email</label>

  <textarea name="message" id="message" placeholder="Write your message here" rows="7" required></textarea>
  <label for="message">Message</label>
  
  <button type="submit" name="submit">Send Message</button>
  </fieldset>
</form>
```

### CSS for Material Design Form

Label effect:

```css
form {
  display: grid;
  padding: 2em 0;
  display: block;
  position: relative;
}

form label {
  display: block;
  position: relative;
  top: -42px;
  left: 16px;
  font-size: 16px;
  z-index: 1;
  transition: all 0.3s ease-out;
}

input:focus + label, input:valid + label{
  top: -80px;
  font-size: 0.875rem;
  color: #00aced;
}

input,
textarea,
button {
  width: 100%;
  padding: 1em;
  margin-bottom: 1em;
  font-size: 1rem;
}

input {
  display: block;
  position: relative;
  background: none;
  border: none;
  border-bottom: 1px solid $link;
  font-weight: bold;
  font-size: 16px;
  z-index: 2;
}

textarea {
  border: 1px solid $link;
}
textarea + label {
  display: none;
}
textarea:focus {
  outline: none;
}

input:focus, input:valid{
  outline: none;
  border-bottom: 1px solid $link;
}

button {
  border: 1px solid $link;
  background-color: $link;
  color: #fff;
  cursor: pointer;
}
```

## Content Management

[Headless CMS](https://en.wikipedia.org/wiki/Headless_content_management_system) - a back-end only content management system built from the ground up as a content repository that makes content accessible via a RESTful API for display on any device.

[Netlify CMS](https://www.netlifycms.org/). Another choice might be [Forestry.io](Forestry.io)

Here's a [tutorial](https://css-tricks.com/jamstack-comments/) on CSS-Tricks.

https://www.netlifycms.org/docs/add-to-your-site/

https://templates.netlify.com/template/eleventy-netlify-boilerplate/#about-deploy-to-netlify
https://github.com/danurbanowicz/eleventy-netlify-boilerplate/blob/master/admin/preview-templates/index.js

## Notes

localstorage




