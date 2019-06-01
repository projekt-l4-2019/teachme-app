const noticesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/notices";
const citiesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/cities";
const voivodeshipsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/voivodeships";
const subjectsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/subjects";

class City {
    constructor(idCity, cityName, idVoivodeship, nameVoivodeship) {
        this.idCity = idCity;
        this.cityName = cityName;
        this.idVoivodeship = idVoivodeship;
        this.nameVoivodeship = nameVoivodeship;
    }
}

class Voivodeship {
    constructor(idVoivodeship, nameVoivodeship) {
        this.idVoivodeship = idVoivodeship;
        this.nameVoivodeship = nameVoivodeship;
    }
}

class Subject {
    constructor(idSubject, name, subjectParent) {
        this.idSubject = idSubject;
        this.name = name;
        this.subjectParent = subjectParent;
    }
}

class Notice {
    constructor(idNotice, lookOrOffer, note, meetingPlace, meetingDate, price, level, addDate, addedByUser, timeFrom, timeTo, subjectName) {
        this.idNotice = idNotice;
        this.lookOrOffer = lookOrOffer;
        this.note = note;
        this.meetingPlace = meetingPlace;
        this.meetingDate = meetingDate;
        this.price = price;
        this.level = level;
        this.addDate = addDate;
        this.addedByUser = addedByUser;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.subjectName = subjectName;
    }
}

function loadCities() {
    let cityArray = new Array();
    let cityList;
    let request = new XMLHttpRequest();
    request.open('GET', citiesUrl, true);
    request.onload = function () {
        // Begin accessing JSON data here
        cityList = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            cityList.forEach(city => {
                let newCity = new City(city.idCity, city.name, city.voivodeshipByVoivodeshipIdVoivodeship.idVoivodeship, city.voivodeshipByVoivodeshipIdVoivodeship.nameVoivodeship);
                cityArray.push(newCity);
            });

        } else {
            console.log('error');
        }
        const cityListHTML = document.getElementById('selectCity');
        html = '<option>Wszystkie</option>';
        for (let i = 0; i < cityArray.length; i++) {
            html += '<option>' + cityArray[i].cityName + '</option>';
        }
        cityListHTML.innerHTML = html;
    };
    request.send();
}

function loadVoivodeships() {
    let voivodeshipArray = new Array();
    let voivodeshipList;
    let request = new XMLHttpRequest();
    request.open('GET', voivodeshipsUrl, true);
    request.onload = function () {
        // Begin accessing JSON data here
        voivodeshipList = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            voivodeshipList.forEach(voivodeship => {
                let newVoivodeship = new Voivodeship(voivodeship.idVoivodeship, voivodeship.nameVoivodeship);
                voivodeshipArray.push(newVoivodeship);
            });

        } else {
            console.log('error');
        }
        const voivodeshipListHTML = document.getElementById('selectVoivodeship');
        html = '<option>Wszystkie</option>';
        for (let i = 0; i < voivodeshipArray.length; i++) {
            html += '<option>' + voivodeshipArray[i].nameVoivodeship + '</option>';
        }
        voivodeshipListHTML.innerHTML = html;
    };
    request.send();
}

function loadSubjects() {
    let subjectArray = new Array();
    let subjectList;
    let request = new XMLHttpRequest();
    request.open('GET', subjectsUrl, true);
    request.onload = function () {
        // Begin accessing JSON data here
        subjectList = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            subjectList.forEach(subject => {
                let newSubject = new Subject(subject.idSubject, subject.name, subject.subjectBySubjectIdSubjec);
                subjectArray.push(newSubject);
            });

        } else {
            console.log('error');
        }
        const subjectListHTML = document.getElementById('selectSubject');
        html = '<option>Wszystkie</option>';
        for (let i = 0; i < subjectArray.length; i++) {
            html += '<option>' + subjectArray[i].name + '</option>';
        }
        subjectListHTML.innerHTML = html;
    };
    request.send();
}

//Get notices list from server
function loadNotices() {
    let noticeArray = new Array();
    let noticeList;
    let request = new XMLHttpRequest();
    request.open('GET', noticesUrl, true);
    request.onload = function () {
        // Begin accessing JSON data here
        noticeList = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            noticeList.forEach(notice => {
                let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userIdUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
                noticeArray.push(newNotice);
            });

        } else {
            console.log('error');
        }
        const noticeListHTML = document.getElementById('notices');
        html = '';
        for (let i = 0; i < noticeArray.length; i++) {
            let notice = noticeArray[i];
            html += '<a href="notice.html" onclick="getNoticeId(' + notice.idNotice + ')" class="list-group-item list-group-item-action flex-column align-items-start">';
            html += '<div class="d-flex w-100 justify-content-between">';
            html += '<h5 class="mb-1">' + notice.subjectName + '</h5>';
            html += '<small>dodano: ' + getDate(notice.timestamp) + '</small>';
            html += '</div>';

            if (notice.note.length > 250) {
                html += '<p class="mb-1">' + notice.note.substring(0, 250) + "..." + '</p>';
            } else {
                html += '<p class="mb-1">' + notice.note + '</p>';
            }

            html += '<div class="d-flex w-100 justify-content-between">';
            html += '<h6>Termin spotkania: ' + getDate(notice.meetingDate) + '</h6>' + '<h6>' + notice.meetingPlace + '</h6>' + '<small>#' + notice.idNotice + '</small>';
            html += '</div>';
            html += '</a>';
        }
        noticeListHTML.innerHTML = html;
    };
    request.send();
}

function loadSelectedNotice() {
    let noticeArray = new Array();
    let notice;
    let request = new XMLHttpRequest();
    request.open('GET', noticesUrl + '/' + localStorage.getItem("noticeID"), true);
    request.onload = function () {
        // Begin accessing JSON data here
        notice = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userIdUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
            noticeArray.push(newNotice);

        } else {
            console.log('error');
        }
        const noticeListHTML = document.getElementById('notice_extended');
        html = '';
        for (let i = 0; i < noticeArray.length; i++) {
            let notice = noticeArray[i];
            html += '<h4 class="card-header">' + notice.subjectName + '</h4>';
            html += '<div class="card-body"> <p class="card-text">' + notice.note + '</p></div>';
            html += '<ul class="list-group list-group-flush">';
            html += '<li class="list-group-item">Miejsce spotkania: ' + notice.meetingPlace + '</li>';
            html += '<li class="list-group-item">Cena za godzinę: ' + notice.price + ' zł </li>';
            html += '<li class="list-group-item">Godzina: ' + getTime(notice.timeFrom) + ' - ' + getTime(notice.timeTo) + '</li>';
            html += '<li class="list-group-item">Termin spotkania: ' + getDate(notice.meetingDate) + '</li>';
            notice_extended.innerHTML = html;
        }
        noticeListHTML.innerHTML = html;
    };
    request.send();
}

if (window.location.pathname.substr(-10) === 'index.html') {
    loadCities();
    loadVoivodeships();
    loadSubjects();
    loadNotices();
}
if (window.location.pathname.substr(-14) === 'noticeadd.html') {
    loadCities();
    loadVoivodeships();
    loadSubjects();
}
if (window.location.pathname.substr(-11) === 'notice.html') {
    loadSelectedNotice();
}


function getNoticeId(id_notice) {
    var noticeID = id_notice;
    localStorage.setItem('noticeID', noticeID);
}

function addZero(int) {
    if (int < 10) {
        int = '0' + int;
    }
    return int;
}

function getTime(dateJSON) {
    let date = new Date(dateJSON);
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    return hours + ':' + minutes;
}

function getDate(dateJSON) {
    let date = new Date(dateJSON);
    let year = date.getFullYear();
    let month = addZero(date.getMonth());
    let day = addZero(date.getDate());
    return day + '.' + month + '.' + year;
}

// // Post notice to server
// if (window.location.pathname.substr(-14) === 'noticeadd.html') {
//     function postNotice() {
//         var data = {};
//         data.look_or_offer = document.getElementById("lookOrOffer").tabIndex;
//         // data.subject = document.getElementById("selectSubject").value;
//         data.subject = "Geografia";
//         // data.level = document.getElementById("selectLevel").value; //TEMP DISABLE
//         data.meeting_place = document.getElementById("meetingPlace").value;
//         data.price = document.getElementById("price").value;
//         // data.time_from = document.getElementById("timeFrom").value;
//         // data.time_to = document.getElementById("timeTo").value;
//         data.note = document.getElementById("noticeDescription").value;
//         data.active = 1;
//         // if(data[7]==='') alert("Nie podano wartosci!");
//         // else {
//         let json = JSON.stringify(data);
//         console.log(json);
//         let xhr = new XMLHttpRequest();
//         xhr.open("POST", url, true);
//         xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//         xhr.onload = function () {
//             let users = JSON.parse(xhr.responseText);
//             if (xhr.readyState === 4 && xhr.status === 201) {
//                 console.table(users);
//             } else {
//                 console.error(users);
//             }
//         };
//         xhr.send(json);
//         //TODO: Nie nie chce sie dodać przy odświeżeniu zaraz po xhr.send(json). Trzeba skombinować jakieś obejście lepsze niż alert.
//         alert('Dodano pomyslnie!');
//         // location.reload();
//         // }
//     }
// }