var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

var showContent = function() {
  $('.hide-content').addClass('show-content');
}

var hideContent = function() {
  $('.hide-content').removeClass('show-content');
}

var triggerIntro = function() {
  window.setTimeout(function(){$('.layer img').addClass('pan-out');},1);
  window.setTimeout(function(){showContent();},1200);
}

triggerIntro();

let seeBtn = document.querySelector('.see');

seeBtn.addEventListener('click', function(){
    alert("Telefoningizni ochib kalendarga qarang!");
})

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        openModal()
    }
  });
  

let modal = document.querySelector('.modal');
function openModal(){
    modal.classList.toggle('open');
}





const loginForm = document.getElementById('loginForm');
const passwordInput = document.querySelector('.password');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const password = passwordInput.value;

  
  if (password === '31') {
    window.open('../form-page.html')
  } else {
    
    alert('Kiritilgan password hato rasimga qayta qarang! Yoki Password hint dan foydalaning!');
  }
});
