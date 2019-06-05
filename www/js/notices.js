const noticesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/notices";
const citiesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/cities";
const voivodeshipsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/voivodeships";
const subjectsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/subjects";
const apiUrl = 'https://rhubarb-cobbler-84890.herokuapp.com';
const opinionsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/opinions";
const usersUrl = "https://rhubarb-cobbler-84890.herokuapp.com/users";


///TEMP SETTINGS:
storeUserId(1);


class City {
    constructor(idCity, cityName) {
        this.idCity = idCity;
        this.cityName = cityName;
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

class Opinion {
    constructor(idOpinion, rating, comment, userTo, userFromName) {
        this.idOpinion = idOpinion;
        this.rating = rating;
        this.comment = comment;
        this.userTo = userTo;
        this.userFromName = userFromName;
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

class User {
    constructor(name, surname, avatar, phone, email, cityName, about, birthDate, ) {
        this.name = name;
        this.surname = surname;
        this.avatar = avatar;
        this.phone = phone;
        this.email = email;
        this.cityName = cityName;
        this.about = about;
        this.birthDate = birthDate;
    }
}



if (window.location.pathname.substr(-10) === 'index.html') {
    loadNotices();
    loadVoivodeships();
    loadSubjects();
} else if (window.location.pathname.substr(-14) === 'noticeadd.html') {
    loadVoivodeships();
    loadSubjects();
} else if (window.location.pathname.substr(-11) === 'notice.html') {
    loadSelectedNotice();
    loadUserProfile();
    loadUserOpinions();
} else if (window.location.pathname.substr(-12) === 'profile.html') {
    loadUserProfile();
    loadUserOpinions();
}

//////////////////////////////////////////Load user profile
function loadUserProfile() {
    let user;
    let request = new XMLHttpRequest();
    if (localStorage.getItem("userID") != 0 && localStorage.getItem("userID") != "undefined") {
        request.open('GET', usersUrl + '/' + localStorage.getItem("userID"), false);
        request.onload = function () {
            // Begin accessing JSON data here
            user = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                user = new User(user.name, user.surname, user.avatar, user.phone, user.email, user.cityByCityIdCity.name, user.about, user.birthDate);
            } else {
                console.log('error');
            }
            const userHTML = document.getElementById('userProfile');
            html = '';
            html += '<div class="card-body">';
            html += '<h4 class="card-title profile-name">' + user.name + ' ' + user.surname + '</h4></div>';
            html += '<img class="avatar" src="img/avatars/default.PNG" alt="Card image">';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">O mnie:</h5>'
            html += '<p class="card-text">' + user.about + '</p>';
            html += '<span class="badge badge-info opinionsBtn" id="opinionAmount" onclick="scrollDown()"></span>';
            html += '<span class="badge badge-warning opinionsBtn" id="ratingAvg"></span>';
            if (window.location.pathname.substr(-12) === 'profile.html') {
                html += '<ul class="list-group list-group-flush" style="font-size: 20px;">';
                html += '<li class="list-group-item"><i class="material-icons">phone</i> ' + user.phone + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">email</i> ' + user.email + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">location_city</i> ' + user.cityName + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">account_box</i> ' + getAgeFromBirthDate(user.birthDate) + ' lat(a)</li>';
                html += '</ul>';
                html += '</div>';
                html += '<a href="noticesuser.html"><button type="button" class="btn btn-success show-ann" style="margin-bottom:5px">Zobacz ogłoszenia</button></a>';
                html += '<a href="addopinion.html"><button type="button" class="btn btn-success show-ann">Dodaj opinię</button></a>';
                html += '<a href="profileedit.html"><button class="circleButton editButton"><i class="material-icons">edit</i></button></a>'
            } else {
                html += '</div>';
                html += '<a href="profile.html"><button type="button" class="btn btn-success show-ann" id="btnShowProfile">Zobacz Profil</button></a>';
            }
            userHTML.innerHTML = html;
        };
        request.send();
    }
}

/////////////////////////////////// Load user opinions
function loadUserOpinions() {
    let opinionArray = new Array();
    let opinionList;
    let request = new XMLHttpRequest();
    var idUser = localStorage.getItem("userID");
    if (idUser != 0 && idUser != "undefined") {
        request.open('GET', opinionsUrl, false);
        request.onload = function () {
            opinionList = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                opinionList.forEach(opinion => {
                    let newOpinion = new Opinion(opinion.idOpinion, opinion.rating, opinion.comment, opinion.userTo, opinion.userrByUserFrom.name);
                    opinionArray.push(newOpinion);
                });
            } else {
                console.log('error');
            }
            let ratesSum = 0;
            let ratesAmount = 0;
            const opinionListHTML = document.getElementById('showOpinions');
            html = '';
            for (let i = opinionArray.length-1; i>=0; i--) {
                if (opinionArray[i].userTo === Number(idUser)) {
                    console.log(opinionArray[i].idOpinion);
                    html += '<div class="card border-success mb-3 opinionCard" style="max-width: 20rem;">';
                    html += '<div class="card-body">';
                    html += '<em style="font-size: 17px;">' + opinionArray[i].comment + '</em>'
                    html += '<h6 class="text-muted">' + opinionArray[i].userFromName + '</h6></div>';
                    html += '<div class="card-header opinionHeader">Ocena: ';
                    html += '<span class="badge badge-warning note">' + opinionArray[i].rating + '</span>';
                    html += '</div>';
                    html += '<button type="button" class="btn btn-danger" onclick="deleteOpinion(' + opinionArray[i].idOpinion + ')">Usuń</button></div>';
                    ratesAmount++;
                    ratesSum += opinionArray[i].rating;
                }
            }
            document.getElementById("opinionAmount").innerText = 'Opinie: ' + ratesAmount;
            if (ratesAmount > 0) {
                document.getElementById("ratingAvg").innerText = 'Ocena: ' + (ratesSum / ratesAmount).toFixed(1) + '/5';
                html = '<h4 class="card-title" style="margin-bottom: 5px; margin-left: 5vw">Opinie:</h4>' + html;
            }
            opinionListHTML.innerHTML = html;
        };
        request.send();
    }
}

function deleteOpinion(idOpinion) {
    let json = JSON.stringify('');
    let deleteOpinion = new XMLHttpRequest();
    deleteOpinion.open("DELETE", opinionsUrl + '/' + idOpinion, false);
    deleteOpinion.setRequestHeader('Content-Type', 'application/json');
    postOpinion.onload;
    console.log(deleteOpinion);
    deleteOpinion.send(json);
    
    // alert("Usunięto komentarz");
    deleteOpinion.onreadystatechange(window.location.reload());
}

function loadSubjects() {
    let subjectArray = new Array();
    let subjectList;
    let request = new XMLHttpRequest();
    request.open('GET', subjectsUrl, false);
    request.onload = function () {
        // Begin accessing JSON data here
        subjectList = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            subjectList.forEach(subject => {
                let newSubject = new Subject(subject.idSubject, subject.name, subject.subjectBySubjectIdSubject);
                subjectArray.push(newSubject);
            });

        } else {
            console.log('error');
        }
        const subjectListHTML = document.getElementById('selectSubject');
        html = '<option>Wszystkie</option>';
        if (window.location.pathname.substr(-14) === 'noticeadd.html') html = '<option disabled="disabled" selected="selected"></option>'
        for (let i = 0; i < subjectArray.length; i++) {
            html += '<option>' + subjectArray[i].name + '</option>';
        }
        subjectListHTML.innerHTML = html;
    };
    request.send();
}

function loadVoivodeships() {
    let voivodeshipArray = new Array();
    let voivodeshipList;
    let request = new XMLHttpRequest();
    request.open('GET', voivodeshipsUrl, false);
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
        if (window.location.pathname.substr(-14) === 'noticeadd.html') html = '<option disabled="disabled" selected="selected"></option>'
        for (let i = 0; i < voivodeshipArray.length; i++) {
            html += '<option>' + voivodeshipArray[i].nameVoivodeship + '</option>';
        }
        voivodeshipListHTML.innerHTML = html;
    };
    request.send();
}

function loadCities(id) {
    let cityArray = new Array();
    let cityList;
    let request = new XMLHttpRequest();
    if (id != 0 && id != "undefined") {
        request.open('GET', voivodeshipsUrl + '/' + id, false);
        request.onload = function () {
            // Begin accessing JSON data here
            cityList = JSON.parse(this.response);
            cityList = cityList.citiesByIdVoivodeship;
            if (request.status >= 200 && request.status < 400) {
                cityList.forEach(city => {
                    let newCity = new City(city.idCity, city.name);
                    cityArray.push(newCity);
                });
            } else {
                console.log('error');
            }
            const cityListHTML = document.getElementById('selectCity');
            html = '<option>Wszystkie</option>';
            if (window.location.pathname.substr(-14) === 'noticeadd.html') html = '<option disabled="disabled" selected="selected"></option>'
            for (let i = 0; i < cityArray.length; i++) {
                html += '<option>' + cityArray[i].cityName + '</option>';
            }
            cityListHTML.innerHTML = html;

        };
        request.send();
    }
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
                console.log(notice);
                let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userIdUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
                noticeArray.push(newNotice);
            });

        } else {
            console.log('error');
        }
        const noticeListHTML = document.getElementById('notices');
        html = '';
        for (let i = noticeArray.length - 1; i >= 0; i--) {
            let notice = noticeArray[i];
            html += '<a href="notice.html" onclick="getNoticeId(' + notice.idNotice + ')" class="list-group-item list-group-item-action flex-column align-items-start">';
            html += '<div class="d-flex w-100 justify-content-between">';
            html += '<h5 class="mb-1">' + notice.subjectName + '</h5>';
            html += '<small>dodano: ' + getDate(notice.addDate) + '</small>';
            html += '</div>';

            if (notice.note.length > 250) {
                html += '<p class="mb-1">' + notice.note.substring(0, 250) + "..." + '</p>';
            } else {
                html += '<p class="mb-1">' + notice.note + '</p>';
            }

            html += '<div class="d-flex w-100 justify-content-between">';
            html += '<h6>Termin spotkania: ' + getDate(notice.meetingDate) + '</h6>' + '<h6>' + notice.meetingPlace + '</h6>' + '<small>' + notice.price + ' zł/h</small>';
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
    request.open('GET', noticesUrl + '/' + localStorage.getItem("noticeID"), false);
    request.onload = function () {
        // Begin accessing JSON data here
        notice = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userIdUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
            noticeArray.push(newNotice);
            console.log(notice);

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
        }
        noticeListHTML.innerHTML = html;
    };
    request.send();
}

function getNoticeId(id_notice) {
    var noticeID = id_notice;
    localStorage.setItem('noticeID', noticeID);
}

function storeUserId(userID) {
    localStorage.setItem('userID', userID);
}

function storeUserEmail(userEmail) {
    localStorage.setItem('userEmail', userEmail);
}

function getViovideshipIndex() {
    let ele = document.getElementById("selectVoivodeship");
    for (var i = 1; i < ele.length; i++) {
        if (ele[i].childNodes[0].nodeValue === ele.value) {
            loadCities(i);
        }
    }
}

function getListIndex(idHTML) {
    let ele = document.getElementById(idHTML);
    for (var i = 1; i < ele.length; i++) {
        if (ele[i].childNodes[0].nodeValue === ele.value) {
            return i;
        }
    }
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

function timeToTimestamp(date, time) {
    date = date.split(':');
    let newTime = new Date(date[1] + '/' + date[2] + '/' + date[0] + ' ' + time);
    return newTime;
}

function getAgeFromBirthDate(birthDate) {
    let date = new Date();
    let bYear = new Date(birthDate);
    return date.getFullYear() - bYear.getFullYear();
}

function postNotice() {
    let data = {};
    let dataIdUser = {};
    let dataIdSubject = {};

    data.idNotice = "";
    if (document.getElementById('offer').classList.contains('active')) {
        data.lookOrOffer = "0";
    } else {
        data.lookOrOffer = "1";
    }
    data.note = document.getElementById("noticeDescription").value;
    data.meetingPlace = document.getElementById("selectCity").value;
    data.meetingDate = document.getElementById("date").value;

    data.price = Number(document.getElementById("price").value);
    dataIdSubject.idSubject = getListIndex('selectSubject');

    data.active = "1";
    data.level = getListIndex('selectLevel');
    data.timestamp = "";
    data.timeFrom = timeToTimestamp(data.meetingDate, document.getElementById('timeFrom').value);
    data.timeTo = timeToTimestamp(data.meetingDate, document.getElementById('timeTo').value);
    data.subjectBySubjectIdSubject = dataIdSubject;
    dataIdUser.idUser = 1;
    data.userrByUserrIdUser = dataIdUser;

    let json = JSON.stringify(data);
    let postNotice = new XMLHttpRequest();
    postNotice.open("POST", noticesUrl, true);
    postNotice.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    postNotice.onload;
    postNotice.send(json);
    alert('Dodano pomyslnie!');
    // TODO: Nie nie chce sie dodać przy odświeżeniu zaraz po xhr.send(json).Trzeba skombinować jakieś obejście lepsze niż alert.

    // window.location.pathname = '/index.html';
}

function lookFor() {
    let lookForData = {};

    lookForData.subjectName = getListIndex("selectSubject");
    lookForData.level = getListIndex("selectLevel");
    lookForData.voivodeship = getListIndex("selectVoivodeship");
    lookForData.city = getListIndex("selectCity");
    lookForData.timeFrom = document.getElementById("timeFrom").value;
    lookForData.timeTo = document.getElementById("timeTo").value;

    if (document.getElementById('offer').classList.contains('active')) {
        lookForData.offerOrLookFor = 0;
    } else {
        lookForData.offerOrLookFor = 1;
    }
    if (document.getElementById('asc').classList.contains('active')) {
        lookForData.ascOrDesc = 0;
    } else {
        lookForData.ascOrDesc = 1;
    }

    var data = JSON.stringify(lookForData);
    console.log(data);
}

function postOpinion() {
    var opinion = {};
    var opinion2 = {};
    var opinion3 = {};
    opinion.idOpinion = "";
    opinion.rating = document.getElementById("userAddOpinion").value;
    opinion.comment = document.getElementById("userAddOpinionDescription").value;
    opinion.userTo = 1;
    opinion.userFrom = 2;
    opinion2.idUser = 1;
    opinion3.idUser = 2;
    opinion.userrByUserTo = opinion2;
    opinion.userrByUserFrom = opinion3;

    let postOpinion = new XMLHttpRequest();
    let json = JSON.stringify(opinion);
    postOpinion.open("POST", opinionsUrl, true);
    postOpinion.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    postOpinion.onload;
    postOpinion.send(json);
}