document.addEventListener('deviceready', onDeviceReady, false);

//Menu options
const menu = document.getElementById('menuList');
let html = '<li class="active"><a href="index.html">Lista ogłoszeń</a></li>';
html += '<li><a href="addnotice.html">Dodaj ogłoszenie</a></li>';
html += '<li><a href="#">Ustawienia</a></li>';
html += '<li><a href="about.html">O Aplikacji</a></li>';
menu.innerHTML=html;



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
        if(!document.getElementsByClassName('overlay active')[0]) return true;
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