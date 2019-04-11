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
    mainElement: 'body',
    onRefresh: function(){
        // What do you want to do when the user does the pull-to-refresh gesture
        window.location.reload();
    },
    distThreshold : 50, // Minimum distance required to trigger the refresh.
    iconArrow: '<span class="fa fa-arrow-down"></span>', // The icon for both instructionsPullToRefresh and instructionsReleaseToRefresh
    instructionsPullToRefresh: "Pull down to DESTROY THE WORLD",
    instructionsReleaseToRefresh: "Release to ENABLE BOMB"
});