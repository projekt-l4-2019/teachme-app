document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady(){
    console.log('ready');
    if (cordova.platformId === 'android') {
        StatusBar.backgroundColorByHexString("#00bc8c");
    }

    $(document).ready(function () {
        $("#sidebar").mCustomScrollbar({
            theme: "minimal"
        });

        $('#dismiss, .overlay').on('click', function () {
            // hide sidebar
            $('#sidebar').removeClass('active');
            // hide overlay
            $('.overlay').removeClass('active');
        });

        $('#sidebarCollapse').on('click', function () {
            // open sidebar
            $('#sidebar').addClass('active');
            // fade in the overlay
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });
}

PullToRefresh.init({
    mainElement: '.mainWindow',
    onRefresh: function(){
        // What do you want to do when the user does the pull-to-refresh gesture
        window.location.reload();
    },
    distThreshold : 60, // Minimum distance required to trigger the refresh.
    iconArrow: '<i class="material-icons align-content-center">arrow_downward</i>', // The icon for both instructionsPullToRefresh and instructionsReleaseToRefresh
    instructionsPullToRefresh: "Pociągnij",
    instructionsReleaseToRefresh: "Puść aby odświeżyć",
    instructionsRefreshing: "Odświeżam..."
});