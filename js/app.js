/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
// let topValue = 0
// let interval = null
let isActive = ''
let MAX_ITEM = document.querySelectorAll('section').length
let menulist = document.getElementsByClassName('menu__link')
const nav = document.getElementsByClassName("navbar__menu")[0]

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

function getElementViewTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  let elementScrollTop = document.documentElement.scrollTop;

  return actualTop - elementScrollTop;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */


document.body.onload = onload

function onload() {
  addElement()
  nav.addEventListener('click', watchMenuClick)
  window.addEventListener("scroll", watchSectionScroll, false)
}

// build the nav
function addElement() {
  const ul = document.createElement('ul')
  ul.setAttribute('id', 'navbar__list')
  for (let i = 0; i < MAX_ITEM; i++) {
    let li = document.createElement('li')
    li.innerHTML = "Section " + (i + 1)
    li.setAttribute('class', 'menu__link')
    li.setAttribute('data-menunav', 'Section' + (i + 1))
    ul.appendChild(li)
  }

  document.getElementsByClassName("navbar__menu")[0].appendChild(ul);
}

// Scroll to anchor ID using scrollTO event

nav.addEventListener('click', (e) => {
  let attrName = e.target.getAttribute('data-menunav')
  let sectionSelect = document.querySelector("section[data-nav=" + attrName + "]")
  e.preventDefault();
  let scrollOptions = {
    top: getElementTop(sectionSelect),
    behavior: 'smooth'
  }
  window.scrollTo(scrollOptions);
});


// set menu item as active

function watchMenuClick(e) {
  for (let i = 0; i < MAX_ITEM; i++) {
    if (menulist[i] === e.target && e.target.tagName === 'LI') {
      e.target.classList.add('active')
    } else {
      menulist[i].classList.remove('active')
    }
  }
}

// Add class 'active' to section when near top of viewport

function watchSectionScroll(e) {
  let sectionList = document.getElementsByTagName('section')
  for (let i = 0; i < MAX_ITEM; i++) {
    let activeSection = sectionList[i]
    const sectionHeight = activeSection.offsetHeight
    if (getElementViewTop(sectionList[i]) < 120 && getElementViewTop(sectionList[i]) >-sectionHeight) {
      activeSection.classList.add('your-active-class')
      menulist[i].classList.add('active')
    } else {
      activeSection.classList.remove('your-active-class')
      menulist[i].classList.remove('active')
    }
  }
}

// back to top function
let btn = document.getElementsByClassName('button')[0]

function backToTop() {
  if (document.documentElement.scrollTop > 300) {
    btn.classList.add('active')
  } else {
    btn.classList.remove('active')
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */
window.addEventListener('scroll', backToTop, false)

btn.addEventListener('click', (e) => {
  document.documentElement.scrollTop = 0
})

// Build menu 

// Scroll to section on link click


// Set sections as active