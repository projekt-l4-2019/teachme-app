const noticesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/notices";
const citiesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/cities";
const voivodeshipsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/voivodeships";
const subjectsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/subjects";
const apiUrl = 'https://rhubarb-cobbler-84890.herokuapp.com';
const opinionsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/opinions";
const usersUrl = "https://rhubarb-cobbler-84890.herokuapp.com/users";

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
} else if (window.location.pathname.substr(-12) === 'profile.html') {
    loadUserProfile();
    loadUserOpinions();
}


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

function loadCities(id) {
    let cityArray = new Array();
    let cityList;
    let request = new XMLHttpRequest();
    if (id != 0 && id != "undefined") {
        request.open('GET', voivodeshipsUrl + '/' + id, true);
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
            html = '';
            if (window.location.pathname.substr(-10) === 'index.html') html = 'Wszystkie';
            for (let i = 0; i < cityArray.length; i++) {
                html += '<option>' + cityArray[i].cityName + '</option>';
            }
            cityListHTML.innerHTML = html;

        };
        request.send();
    }
}

storeUserId(1);

function loadUserProfile() {
    let user;
    let request = new XMLHttpRequest();
    if (localStorage.getItem("userID") != 0 && localStorage.getItem("userID") != "undefined") {
        request.open('GET', usersUrl + '/' + localStorage.getItem("userID"), true);
        request.onload = function () {
            // Begin accessing JSON data here
            user = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                user = new User(user.name, user.surname, user.avatar, user.phone, user.email, user.cityByCityIdCity.name, user.about, user.birthDate);
                console.log(user);
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
            // html += '<p class="card-text">' + user.about + '</p>';
            html += '<p class="card-text">Pasjonat matematyki, od dziecka startowałem w olimpiadach. Nie ma dla mnie rzeczy niemożliwych.</p>';
            html += '<span class="badge badge-info opinionsBtn">Opinie: 1</span>';
            html += '<span class="badge badge-warning opinionsBtn">Ocena: 5/5</span>';
            if (window.location.pathname.substr(-12) === 'profile.html') {
                html += '<ul class="list-group list-group-flush" style="font-size: 20px;">';
                html += '<li class="list-group-item"><i class="material-icons">phone</i>' + user.phone + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">email</i>' + user.email + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">location_city</i>' + user.cityName + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">account_box</i>' + getAgeFromBirthDate(user.birthDate) + ' lat(a)</li>';
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

function loadUserOpinions(idUser) {
    let opinionArray = new Array();
    let opinionList;
    let request = new XMLHttpRequest();
    idUser = 1;
    if (idUser != 0 && idUser != "undefined") {
        request.open('GET', opinionsUrl, true);
        request.onload = function () {
            // Begin accessing JSON data here
            opinionList = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                opinionList.forEach(opinion => {
                    // console.log(opinion);
                    let newOpinion = new Opinion(opinion.idOpinion, opinion.rating, opinion.comment, opinion.userTo, opinion.userByUserFrom.name);
                    opinionArray.push(newOpinion);
                });
            } else {
                console.log('error');
            }
            const opinionListHTML = document.getElementById('showOpinions');
            html = '';
            for (let i = 0; i < opinionArray.length; i++) {
                if (opinionArray[i].userTo === idUser) {
                    html += '<div class="card border-success mb-3 opinionCard" style="max-width: 20rem;">';
                    html += '<div class="card-body">';
                    html += '<em style="font-size: 17px;">Bardzo dobry korepetytor, świetnie tłumaczy. Matematyka staje się prosta :)</em>'
                    // html += '<em style="font-size: 17px;">' + opinionArray[i].comment + '</em>'
                    html += '<h6 class="text-muted">Marek</h6></div>';
                    // html += '<h6 class="text-muted">' + opinionArray[i].userFromName + '</h6></div>';
                    html += '<div class="card-header opinionHeader">Ocena:';
                    // html += '<span class="badge badge-warning note">' + opinionArray[i].rating + '</span>';
                    html += '<span class="badge badge-warning note"> 5 </span>';
                    html += '</div></div>';
                }
            }
            opinionListHTML.innerHTML = html;

        };
        request.send();
    }
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
                let newSubject = new Subject(subject.idSubject, subject.name, subject.subjectBySubjectIdSubject);
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
    request.open('GET', noticesUrl + '/' + localStorage.getItem("noticeID"), true);
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

function getViovideshipIndex() {
    let ele = document.getElementById("selectVoivodeship");
    for (var i = 0; i < ele.length; i++) {
        if (ele[i].childNodes[0].nodeValue === ele.value) {
            loadCities(i);
        }
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
    var data = {};
    var dataIdUser = {};
    var dataIdSubject = {};

    if (document.getElementById('offer').classList.contains('active')) {
        data.lookOrOffer = 0;
    } else {
        data.lookOrOffer = 1;
    }

    dataIdSubject.idSubject = getListIndex('selectSubject');
    data.subjectBySubjectIdSubject = dataIdSubject;
    data.level = getListIndex('selectLevel');
    data.meetingPlace = document.getElementById("selectCity").value;
    data.price = document.getElementById("price").value;
    data.date = document.getElementById("date").value;
    data.timeFrom = timeToTimestamp(data.date, document.getElementById('timeFrom').value);
    data.timeTo = timeToTimestamp(data.date, document.getElementById('timeTo').value);
    data.note = document.getElementById("noticeDescription").value;
    dataIdUser.idUser = 1;
    data.userByUserIdUser = dataIdUser;
    // data.meetingByMeetingIdMeetin
    // if(data[7]==='') alert("Nie podano wartosci!");
    // else {
    let json = JSON.stringify(data);
    console.log(json);

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", noticesUrl, true);
    // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // xhr.onload = function () {
    //     let users = JSON.parse(xhr.responseText);
    //     if (xhr.readyState === 4 && xhr.status === 201) {
    //         console.table(users);
    //     } else {
    //         console.error(users);
    //     }
    // };
    // xhr.send(json);
    alert('Dodano pomyslnie!');
    // TODO: Nie nie chce sie dodać przy odświeżeniu zaraz po xhr.send(json).Trzeba skombinować jakieś obejście lepsze niż alert.

    window.location.pathname = '/index.html';
}