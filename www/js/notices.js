const url = "https://rhubarb-cobbler-84890.herokuapp.com/notices";

//Get notices list from server
const app = document.getElementById('notices');
let notice_list;
let request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function () {
    // Begin accessing JSON data here
    var notice_list = JSON.parse(this.response);
    if (window.location.pathname.substr(-10) === 'index.html') {
        let html = '';
        if (request.status >= 200 && request.status < 400) {
            notice_list.forEach(notice => {
                html += '<a href="notice.html" onclick="getNoticeId(' + notice.idNotice + ')" class="list-group-item list-group-item-action flex-column align-items-start">';
                html += '<div class="d-flex w-100 justify-content-between">';
                html += '<h5 class="mb-1">' + notice.subjectBySubjectIdSubject.name + '</h5>';

                let date = new Date(notice.timestamp);

                let year = date.getFullYear();
                let month = addZero(date.getMonth() + 1);
                let dt = addZero(date.getDate());

                html += '<small>dodano: ' + dt + '.' + month + '.' + year + '</small>';
                html += '</div>';

                date = new Date(notice.meetingDate);

                year = date.getFullYear();
                month = addZero(date.getMonth() + 1);
                dt = addZero(date.getDate());

                if (notice.note.length > 250) {
                    html += '<p class="mb-1">' + notice.note.substring(0, 250) + "..." + '</p>';
                } else {
                    html += '<p class="mb-1">' + notice.note + '</p>';
                }
                html += '<div class="d-flex w-100 justify-content-between">';
                html += '<h6>Termin spotkania: ' + dt + '.' + month + '.' + year + '</h6>' + '<h6>' + notice.meetingByMeetingIdMeeting.meetingPlace + '</h6>' + '<small>#' + notice.idNotice + '</small>';
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
            if(id_notice==notice_list[i].idNotice) break;
        }
        let notice=notice_list[i];
        console.log(notice);
        const notice_extended = document.getElementById('notice_extended');
        let html = '';
        html += '<h4 class="card-header">'+ notice.subjectBySubjectIdSubject.name +'</h4>';
        html += '<div class="card-body"> <p class="card-text">'+ notice.note+'</p></div>';
        html += '<ul class="list-group list-group-flush">';
        html += '<li class="list-group-item">Miejsce spotkania: ' + notice.meeting_place + '</li>';
        html += '<li class="list-group-item">Cena za godzinę: ' + notice.price + ' zł </li>';
        html += '<li class="list-group-item">Godzina: ' + notice.timeFrom+ ' - ' + notice.timeTo + '</li>';
       
        date = new Date(notice.meetingDate);
        year = date.getFullYear();
        month = addZero(date.getMonth() + 1);
        dt = addZero(date.getDate());

        html += '<li class="list-group-item">Termin spotkania: ' + dt + '.' + month + '.' + year +'</li>';
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


// Post notice to server
if (window.location.pathname.substr(-14) === 'noticeadd.html'){
    function postNotice() {
        var data = {};
        data.look_or_offer = document.getElementById("lookOrOffer").tabIndex;
        // data.subject = document.getElementById("selectSubject").value;
        data.subject = "Geografia";
        // data.level = document.getElementById("selectLevel").value; //TEMP DISABLE
        data.meeting_place = document.getElementById("meetingPlace").value;
        data.price = document.getElementById("price").value;
        // data.time_from = document.getElementById("timeFrom").value;
        // data.time_to = document.getElementById("timeTo").value;
        data.note = document.getElementById("noticeDescription").value;
        data.active = 1;
        // if(data[7]==='') alert("Nie podano wartosci!");
        // else {
            let json = JSON.stringify(data);
            console.log(json);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
                let users = JSON.parse(xhr.responseText);
                if (xhr.readyState === 4 && xhr.status === 201) {
                    console.table(users);
                } else {
                    console.error(users);
                }
            };
            xhr.send(json);
            //TODO: Nie nie chce sie dodać przy odświeżeniu zaraz po xhr.send(json). Trzeba skombinować jakieś obejście lepsze niż alert.
            alert('Dodano pomyslnie!');
            // location.reload();
        // }
    }
}