const url = "https://rhubarb-cobbler-84890.herokuapp.com/noticeFulls";

//Get notices list from server
if(window.location.pathname.substr(-10) === 'index.html'){
    const app = document.getElementById('notices');
    let notices;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        notices=data._embedded.noticeFulls;
        let html='';
        if (request.status >= 200 && request.status < 400) {
            notices.forEach(notice => {

                html+='<a href="notice.html" onclick="getNoticeId('+notice.id+')" class="list-group-item list-group-item-action flex-column align-items-start">';
                html+='<div class="d-flex w-100 justify-content-between">';
                html+='<h5 class="mb-1">' + notice.subject + '</h5>';

                let date = new Date(notice.timestamp);

                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let dt = date.getDate();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }

                html+='<small>dodano: '  + dt + '.' + month + '.' + year + '</small>';
                html+='</div>';

                date = new Date(notice.meeting_date);

                year = date.getFullYear();
                month = date.getMonth()+1;
                dt = date.getDate();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                
                if(notice.note.length > 250){
                    html+='<p class="mb-1">' + notice.note.substring(0,250) + "..." + '</p>';
                }
                else{
                    html+='<p class="mb-1">' + notice.note + '</p>';
                }
                html+='<div class="d-flex w-100 justify-content-between">';
                html+='<h6>Data spotkania: ' + dt + '.' + month + '.' + year + '</h6>' + '<h6>' + notice.meeting_place + '</h6>' + '<small>#' + notice.id + '</small>';
                html+='</div>';
                html+='</a>';
            });

        } else {
            console.log('error');
        }
        app.innerHTML=html;
    };
    request.send();
}

function getNoticeId(id_notice){
    var noticeID = id_notice;
    localStorage.setItem('noticeID',noticeID);
}

if(window.location.pathname.substr(-11) === 'notice.html'){
    let id_notice = localStorage.getItem("noticeID");
        console.log(id_notice);
        const notice_extended = document.getElementById('notice_extended');
        let html='';
        html+=id_notice;
        notice_extended.innerHTML=html;
}