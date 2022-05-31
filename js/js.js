let burgerBtn= document.querySelector('.header__burger ');
let menu=  document.querySelector('.header__menu ');
let btnCloseMenu=  document.querySelector('.menu__close-btn ');



burgerBtn.addEventListener('click',e=>{
    menu.classList.add('open-menu')
   console.log(menu)
})

btnCloseMenu.addEventListener('click',e=>{
    menu.classList.remove('open-menu')
   console.log(menu)
})

window.addEventListener('resize',e=>{
    if(window.screen.width> 1024){
        menu.classList.remove('open-menu')
    }
})

window.addEventListener('scroll',e=>{
   
})