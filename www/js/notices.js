const url = "https://rhubarb-cobbler-84890.herokuapp.com/noticeFulls";

//Get notices list from server
const app = document.getElementById('notices');
let notice_list;
let request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    notice_list = data._embedded.noticeFulls;
    if (window.location.pathname.substr(-10) === 'index.html') {
        let html = '';
        if (request.status >= 200 && request.status < 400) {
            notice_list.forEach(notice => {
                html += '<a href="notice.html" onclick="getNoticeId(' + notice.id + ')" class="list-group-item list-group-item-action flex-column align-items-start">';
                html += '<div class="d-flex w-100 justify-content-between">';
                html += '<h5 class="mb-1">' + notice.subject + '</h5>';

                let date = new Date(notice.timestamp);

                let year = date.getFullYear();
                let month = addZero(date.getMonth() + 1);
                let dt = addZero(date.getDate());

                html += '<small>dodano: ' + dt + '.' + month + '.' + year + '</small>';
                html += '</div>';

                date = new Date(notice.meeting_date);

                year = date.getFullYear();
                month = addZero(date.getMonth() + 1);
                dt = addZero(date.getDate());

                if (notice.note.length > 250) {
                    html += '<p class="mb-1">' + notice.note.substring(0, 250) + "..." + '</p>';
                } else {
                    html += '<p class="mb-1">' + notice.note + '</p>';
                }
                html += '<div class="d-flex w-100 justify-content-between">';
                html += '<h6>Data spotkania: ' + dt + '.' + month + '.' + year + '</h6>' + '<h6>' + notice.meeting_place + '</h6>' + '<small>#' + notice.id + '</small>';
                html += '</div>';
                html += '</a>';
            });

        } else {
            console.log('error');
        }
        app.innerHTML = html;
    }

    if (window.location.pathname.substr(-11) === 'notice.html') {
        let id_notice = localStorage.getItem("noticeID");
        for(var i=0; i<notice_list.length; i++)
        {
            if(id_notice==notice_list[i].id) break;
        }
        let notice=notice_list[i];
        const notice_extended = document.getElementById('notice_extended');
        let html = '';
        html += '<h4 class="card-header">'+ notice.subject +'</h4>';
        html += '<div class="card-body"> <p class="card-text">'+ notice.note+'</p></div>';
        html += '<ul class="list-group list-group-flush">';
        html += '<li class="list-group-item">Miejsce spotkania: ' + notice.meeting_place + '</li>';
        html += '<li class="list-group-item">Cena za godzinę: ' + notice.price + ' zł </li>';
        html += '<li class="list-group-item">Godzina: ' + notice.time_from+ ' - ' + notice.time_to + '</li>';
        date = new Date(notice.meeting_date);

                year = date.getFullYear();
                month = date.getMonth() + 1;
                dt = date.getDate();
                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }
        html += '<li class="list-group-item">Data spotkania: ' + dt + '.' + month + '.' + year +'</li>';
        notice_extended.innerHTML = html;
    }
};
request.send();

function getNoticeId(id_notice) {
    var noticeID = id_notice;
    localStorage.setItem('noticeID', noticeID);
}

function addZero(int){
    if(int < 10){
        int = '0' + int;
    }
    return int;
}

if (window.location.pathname.substr(-14) === 'addnotice.html'){
    
}