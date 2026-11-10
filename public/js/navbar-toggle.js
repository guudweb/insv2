// CAMBIO INSESO FINAL: navegación nativa para escritorio, móvil y teclado.
(function(){
 function bind(){
  const nav=document.querySelector('.top-nav');if(!nav||nav.dataset.bound)return;nav.dataset.bound='true';
  const toggler=nav.querySelector('[data-nav-toggle]'),collapse=nav.querySelector('#navbarResponsive');
  const buttons=[...nav.querySelectorAll('[data-nav-dropdown]')];
  function close(except){buttons.forEach(button=>{if(button===except)return;button.setAttribute('aria-expanded','false');button.parentElement.querySelector('.dropdown-menu')?.classList.remove('show');});}
  toggler?.addEventListener('click',()=>{const expanded=toggler.getAttribute('aria-expanded')!=='true';toggler.setAttribute('aria-expanded',String(expanded));collapse?.classList.toggle('show',expanded);if(!expanded)close();});
  buttons.forEach(button=>{
   const menu=button.parentElement.querySelector('.dropdown-menu');
   button.addEventListener('click',event=>{event.preventDefault();const expanded=button.getAttribute('aria-expanded')!=='true';close(button);button.setAttribute('aria-expanded',String(expanded));menu?.classList.toggle('show',expanded);});
   button.addEventListener('keydown',event=>{if(event.key===' '){event.preventDefault();button.click();}if(event.key==='ArrowDown'){event.preventDefault();close(button);button.setAttribute('aria-expanded','true');menu?.classList.add('show');menu?.querySelector('a')?.focus();}});
   menu?.addEventListener('keydown',event=>{const links=[...menu.querySelectorAll('a[href]')],index=links.indexOf(document.activeElement);if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();links[(index+(event.key==='ArrowDown'?1:-1)+links.length)%links.length]?.focus();}if(event.key==='Escape'){close();button.focus();}});
  });
  document.addEventListener('click',event=>{if(!event.target.closest('.top-nav .dropdown'))close();});
  nav.addEventListener('keydown',event=>{if(event.key==='Escape'){close();if(window.innerWidth<992){collapse?.classList.remove('show');toggler?.setAttribute('aria-expanded','false');}}});
  nav.querySelectorAll('a[href]').forEach(link=>{if(link.hasAttribute('data-nav-dropdown'))return;link.addEventListener('click',()=>{close();if(window.innerWidth<992){collapse?.classList.remove('show');toggler?.setAttribute('aria-expanded','false');}});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();document.addEventListener('astro:page-load',bind);
})();
