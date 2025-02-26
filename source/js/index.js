/************* RESPONSYVE NAVBAR *************/
const naveMenu = document.getElementById('nave-menu');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');

closeMenu.style.display = 'none';

openMenu.addEventListener('click', () =>{
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    naveMenu.classList.toggle('show');
});

closeMenu.addEventListener('click', () =>{
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
    naveMenu.classList.toggle('show');
});

/************* CHANGE IMAGE BANNER *************/
let currentIndex = 0;
const homeImage = document.querySelectorAll('.homeImage');
const intervalTime = 5 * 1000;

function switchDivs() {
    homeImage[currentIndex].classList.remove('show');
    currentIndex = (currentIndex + 1) % homeImage.length;
    homeImage[currentIndex].classList.add('show');
}
setInterval(switchDivs, intervalTime);

/********** Modal Reserv **********/
var ModalReserv = document.querySelector('.modal-reserv');
var OpenModal = document.getElementById('reserv-btn');
var CloseModal = document.getElementById('close-modal');

var body = document.querySelector('.Body-app');

OpenModal.addEventListener('click', () =>{
    ModalReserv.classList.toggle('show');
    body.classList.toggle('show');
});

CloseModal.addEventListener('click', () =>{
    body.classList.toggle('show');
    ModalReserv.classList.toggle('show');
});

/********** LINKS OF NEWS DETAILS **********/
document.querySelectorAll('.goDetails').forEach(goLink =>{
    goLink.addEventListener('click', () =>{
        window.location.href = 'news.html';
    });
});

/********** BUTTON LINKS **********/
document.getElementById('GoNews').addEventListener('click', () =>{
    window.location.href = 'news.html';
});

document.getElementById('GoMenu').addEventListener('click', () =>{
    window.location.href = 'menu.html';
});

/********** PROCESSING LATTER ACTIONS **********/
let SendLatter = document.getElementById('SendLatter');
SendLatter.addEventListener('click', () =>{

    let LoadingLatter = document.getElementById('LoadingLatter');
    let ChekLatter = document.getElementById('ChekLatter');
    let EmailLatter = document.getElementById('EmailLatter').value.trim();
    let latterError = document.getElementById('latterError');
    let validLatter = true;

    latterError.textContent = "";
    
    if(EmailLatter === ""){
        latterError.textContent = "Insira um email, por favor!";
        validLatter = false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailLatter)){
        latterError.textContent = "Insira um email válido!";
        validLatter = false;
    }else{
        latterError.textContent = "";
        validLatter = true;
    }

    if(validLatter){
        LoadingLatter.classList.add('show'); 

        setTimeout( () =>{
            LoadingLatter.classList.remove('show');
        }, 5000);
    
        setTimeout( () =>{
            ChekLatter.classList.add('show');
        }, 6500);
    
        setTimeout( () =>{
            ChekLatter.classList.remove('show');
        }, 10000);
    }
    
});

/************* VALIDATION FORM CONTACT *************/
document.getElementById('FormContact').addEventListener('submit', (event) =>{
    event.preventDefault();

    let ContatINput = document.querySelectorAll('.ContatINput');
    let ErrorContact = document.querySelectorAll('.ErrorContact');
    let ThisSend = true;

    if(ContatINput[0].value === ''){
        ThisSend = false;
        ErrorContact[0].textContent = "Insira seu nome!";
    }
});