document.addEventListener('deviceready', onDeviceReady, false);

//Menu options
const menu = document.getElementById('menuList');
let html = '<li class="active"><a href="index.html">Lista ogłoszeń</a></li>';
html += '<li><a href="noticeadd.html">Dodaj ogłoszenie</a></li>';
html += '<li><a href="profile.html">Profil</a></li>';
html += '<li><a href="contact.html">Kontakt</a></li>';
html += '<li><a href="about.html">O Aplikacji</a></li>';
menu.innerHTML=html;

const userInfo = document.getElementById('userInfo');
html = '<h5>Mateusz Kukla</h5>';
html += '<h6>mateuszkukla24680@gmail.com</h6>';
userInfo.innerHTML=html;

//Insert bg image
let bimg = document.createElement("img");
bimg.setAttribute('src', 'img/book.png');
bimg.setAttribute('id', 'bgimg');
document.body.appendChild(bimg);

function onDeviceReady(){
    console.log('ready');
    if (cordova.platformId === 'android') {
        StatusBar.backgroundColorByHexString("#00bc8c");
    }

    $(document).ready(function () {
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $('#dismiss, .overlay').on('click', hideSidebar);
        $('.overlay').on('swipeleft', hideSidebar);

        $('#sidebarCollapse').on('click', showSidebar); 
        $('html').on('swiperight', showSidebar);
        
        function showSidebar() {
            // open sidebar
            $('#sidebar').addClass('active');
            // fade in the overlay
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        };
     
        function hideSidebar() {
            // hide sidebar
            $('#sidebar').removeClass('active');
            // hide overlay
            $('.overlay').removeClass('active');
            
        };
    });
}

PullToRefresh.init({
    mainElement: '.mainWindow',

    shouldPullToRefresh: function(){
        if(!document.getElementsByClassName('overlay active')[0] && !document.body.scrollTop && window.location.pathname.substr(-10) === 'index.html') return true;
        else return false;
    },

    onRefresh: function(){
        window.location.reload();
    },
    distThreshold : 60, // Minimum distance required to trigger the refresh.
    iconArrow: '<i class="material-icons align-content-center">arrow_downward</i>', // The icon for both instructionsPullToRefresh and instructionsReleaseToRefresh
    instructionsPullToRefresh: "Pociągnij",
    instructionsReleaseToRefresh: "Puść aby odświeżyć",
    instructionsRefreshing: "Odświeżam"
});



if (window.location.pathname.substr(-14) === 'noticeadd.html'){
    setInputFilter(document.getElementById("price"), function(value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value); });

    function setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
        });
    }
}

function getListIndex(idHTML) {
    let ele = document.getElementById(idHTML);
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].childNodes[0].nodeValue === ele.value) {
            return i;
        }
    }
}

function lookFor(){
    let lookForData = {};
    lookForData.subjectName = getListIndex("selectSubject");
    lookForData.level = getListIndex("selectLevel");
    lookForData.voivodeship = getListIndex("selectVoivodeship");    
    lookForData.city = getListIndex("selectCity");
    //gdy offer jest zaznaczony to offer, else
    lookForData.offerOrLookFor = document.getElementById("ooffer").innerText;

    //gdy asc jest zaznaczony to aasc else
    lookForData.ascOrDesc = document.getElementById("aasc").innerText;
    var data = JSON.stringify(lookForData);
    console.log(data);
}