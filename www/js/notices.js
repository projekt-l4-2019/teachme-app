const noticesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/notices";
const citiesUrl = "https://rhubarb-cobbler-84890.herokuapp.com/cities";
const voivodeshipsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/voivodeships";
const subjectsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/subjects";
const apiUrl = 'https://rhubarb-cobbler-84890.herokuapp.com';
const opinionsUrl = "https://rhubarb-cobbler-84890.herokuapp.com/opinions";
const usersUrl = "https://rhubarb-cobbler-84890.herokuapp.com/users";
const currentUrl = "https://rhubarb-cobbler-84890.herokuapp.com/current";

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
    constructor(idOpinion, rating, comment, userTo, userFromName, userFromId) {
        this.idOpinion = idOpinion;
        this.rating = rating;
        this.comment = comment;
        this.userTo = userTo;
        this.userFromName = userFromName;
        this.userFromId = userFromId;
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
    constructor(idUser, login, name, surname, birthDate, avatar, phone, email, cityName, idCity, about) {
        this.idUser = idUser;
        this.login = login;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.avatar = avatar;
        this.phone = phone;
        this.email = email;
        this.cityName = cityName;
        this.about = about;
        this.idCity = idCity;
    }
}

///TEMP SETTINGS:
storeLoggedUserInfo();

function getNoticeId(id_notice) {
    var noticeID = id_notice;
    localStorage.setItem('noticeID', noticeID);
}

function storeUserId(userID) {
    localStorage.setItem('userID', userID);
    console.log(userID);
}

function getUserId() {
    return localStorage.getItem("userID");
}

function getLoggedUserId() {
    return localStorage.getItem("loggedID");
}

setProfileInfo();
if (window.location.pathname.substr(-10) === 'index.html') {
    loadNotices();
    loadVoivodeships();
    loadSubjects();
} else if (window.location.pathname.substr(-14) === 'noticeadd.html') {
    loadVoivodeships();
    loadSubjects();
} else if (window.location.pathname.substr(-11) === 'notice.html') {
    loadSelectedNotice(getUserId());
    loadUserProfile(getUserId());
    loadUserOpinions(getUserId());
} else if (window.location.pathname.substr(-12) === 'profile.html') {
    loadUserProfile(getUserId());
    loadUserOpinions(getUserId());
} else if (window.location.pathname.substr(-14) === 'profilemy.html') {
    loadUserProfile(getLoggedUserId());
    loadUserOpinions(getLoggedUserId());
} else if (window.location.pathname.substr(-16) === 'profileedit.html') {
    loadVoivodeships();
} else if (window.location.pathname.substr(-15) === 'addopinion.html') {
    loadUserNameAvatar(getUserId());
}


//////////////////////////////////////////Load user profile
function loadUserProfile(idUser) {
    let user;
    let request = new XMLHttpRequest();
    if (idUser != 0 && idUser != "undefined") {
        request.open('GET', usersUrl + '/' + idUser, false);
        request.onload = function () {
            // Begin accessing JSON data here
            user = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                user = new User(user.idUser, user.login, user.name, user.surname, user.birthDate, user.avatar, user.phone, user.email, user.cityByCityIdCity.name, user.cityByCityIdCity.idCity, user.about);

            } else {
                console.log('error');
            }
            const userHTML = document.getElementById('userProfile');
            html = '';
            html += '<div class="card-body">';
            html += '<h4 class="card-title profile-name">' + user.name + ' ' + user.surname + '</h4></div>';
            html += '<img class="avatar" src="' + user.avatar + '" alt="Card image">';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">O mnie:</h5>'
            html += '<p class="card-text">' + user.about + '</p>';
            html += '<span class="badge badge-info opinionsBtn" id="opinionAmount" onclick="scrollDown(); storeUserId(' + user.idUser + ');"></span>';
            html += '<span class="badge badge-warning opinionsBtn" id="ratingAvg"></span>';
            if (window.location.pathname.substr(-12) === 'profile.html' || window.location.pathname.substr(-14) === 'profilemy.html') {
                html += '<ul class="list-group list-group-flush" style="font-size: 20px;">';
                html += '<li class="list-group-item"><i class="material-icons">phone</i> ' + user.phone + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">email</i> ' + user.email + '</li>';
                html += '<li class="list-group-item"><i class="material-icons">location_city</i> ' + user.cityName + '</li>';
                // html += '<li class="list-group-item"><i class="material-icons">account_box</i> ' + getAgeFromBirthDate(user.birthDate) + ' lat(a)</li>';
                html += '</ul>';
                html += '</div>';
                html += '<button type="button" class="btn btn-success show-ann" id="showNoticesBtn" style="margin-bottom:5px" onclick="loadUserNotices(' + user.idUser + ')">Zobacz ogłoszenia</button>';
                html += '<button type="button" class="btn btn-success show-ann" id="showOpinionBtn" style="margin-bottom:5px" onclick="loadUserOpinions(' + user.idUser + ')">Zobacz opinie</button>';

                if (Number(localStorage.getItem("loggedID")) === user.idUser) {
                    html += '<a href="profileedit.html"><button class="circleButton editButton"><i class="material-icons">edit</i></button></a>'
                } else {
                    html += '<a href="addopinion.html"><button type="button" class="btn btn-success show-ann">Dodaj opinię</button></a>';
                }

            } else {
                html += '</div>';
                html += '<a href="profile.html"><button type="button" class="btn btn-success show-ann" id="btnShowProfile"">Zobacz Profil</button></a>';
            }
            userHTML.innerHTML = html;
        };
        request.send();
    }
}

/////////////////////////////////// Load user opinions
function loadUserOpinions(idUser) {
    let opinionArray = new Array();
    let opinionList;

    if (window.location.pathname.substr(-12) === 'profile.html' || window.location.pathname.substr(-12) === 'profilemy.html') {
        document.getElementById("showNoticesBtn").style.setProperty("display", "block");
        document.getElementById("showOpinionBtn").style.setProperty("display", "none");
    }

    let request = new XMLHttpRequest();
    if (idUser != 0 && idUser != "undefined") {
        request.open('GET', opinionsUrl, false);
        request.onload = function () {
            opinionList = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                opinionList.forEach(opinion => {
                    let newOpinion = new Opinion(opinion.idOpinion, opinion.rating, opinion.comment, opinion.userTo, opinion.userrByUserFrom.name, opinion.userrByUserFrom.idUser);
                    opinionArray.push(newOpinion);
                });
            } else {
                console.log('error');
            }
            let ratesSum = 0;
            let ratesAmount = 0;
            const opinionListHTML = document.getElementById('showUserOpinionsOrNotices');
            html = '';
            for (let i = opinionArray.length - 1; i >= 0; i--) {
                if (opinionArray[i].userTo === Number(idUser)) {
                    html += '<div class="card border-success opinionCard mb-3">';
                    html += '<div class="card-body">';
                    html += '<em style="font-size: 17px;">' + opinionArray[i].comment + '</em>'
                    html += '<h6 class="text-muted">' + opinionArray[i].userFromName + '</h6></div>';
                    html += '<div class="card-header opinionHeader">Ocena: ';
                    html += '<span class="badge badge-warning note">' + opinionArray[i].rating + '</span>';
                    html += '</div>';
                    if (Number(getLoggedUserId()) === opinionArray[i].userFromId) {
                        html += '<button type="button" class="btn btn-danger" onclick="deleteOpinion(' + opinionArray[i].idOpinion + ')">Usuń</button>';
                    }
                    html += '</div>';
                    ratesAmount++;
                    ratesSum += opinionArray[i].rating;
                }
            }
            document.getElementById("opinionAmount").innerText = 'Opinie: ' + ratesAmount;
            if (ratesAmount > 0) {
                document.getElementById("ratingAvg").innerText = 'Ocena: ' + (ratesSum / ratesAmount).toFixed(1) + '/5';
                html = '<h5 class="card-title" style="margin-bottom: 5px; margin-left: 5vw">Opinie o użytkowniku:</h5>' + html;
            }
            opinionListHTML.innerHTML = html;
        };
        request.send();
    }
}

/////////////////////////////////// Load user notices
function loadUserNotices(idUser) {
    let noticeArray = new Array();
    let noticeList;
    document.getElementById("showNoticesBtn").style.setProperty("display", "none");
    document.getElementById("showOpinionBtn").style.setProperty("display", "block");
    let request = new XMLHttpRequest();
    request.open('GET', usersUrl + '/' + idUser, true);
    request.onload = function () {
        // Begin accessing JSON data here
        noticeList = JSON.parse(this.response);
        noticeList = noticeList.noticesByIdUser;
        console.log(noticeList);
        if (request.status >= 200 && request.status < 400) {
            noticeList.forEach(notice => {
                console.log(notice);
                let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userIdUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
                noticeArray.push(newNotice);
            });
        } else {
            console.log('error');
        }
        const noticeListHTML = document.getElementById('showUserOpinionsOrNotices');
        html = '<h5 class="card-title" style="margin-bottom: 5px; margin-left: 5vw">Ogłoszenia użytkownika:</h5>';
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

            html += '<div class="d-flex w-100 justify-content-between">';
            html += '<h6 class="mb-1">' + ((notice.lookOrOffer == 1) ? 'uczeń' : 'korepetytor') + '</h6>';
            html += '<h6>' + getTime(notice.timeFrom) + ' - ' + getTime(notice.timeTo) + '</h6>';
            html += '</div>';

            html += '</a>';
        }
        noticeListHTML.innerHTML = html;
    };
    request.send();
}

function deleteOpinion(idOpinion) {
    let json = JSON.stringify('');
    let deleteOpinion = new XMLHttpRequest();
    deleteOpinion.open("DELETE", opinionsUrl + '/' + idOpinion, false);
    deleteOpinion.setRequestHeader('Content-Type', 'application/json');
    postOpinion.onload;
    console.log(deleteOpinion);
    deleteOpinion.send(json);
    deleteOpinion.onreadystatechange(window.location.reload());
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
        html = '<option disabled="disabled" selected="selected" value="0"></option>';
        // if (window.location.pathname.substr(-14) === 'noticeadd.html') html = '<option disabled="disabled" selected="selected"></option>'
        for (let i = 0; i < subjectArray.length; i++) {
            html += '<option value=' + subjectArray[i].idSubject + '>' + subjectArray[i].name + '</option>';
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
        html = '<option disabled="disabled" selected="selected" value="0"></option>';
        // if (window.location.pathname.substr(-14) === 'noticeadd.html') html = '<option disabled="disabled" selected="selected"></option>'
        for (let i = 0; i < voivodeshipArray.length; i++) {
            html += '<option value=' + voivodeshipArray[i].idVoivodeship + '>' + voivodeshipArray[i].nameVoivodeship + '</option>';
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
            html = '<option disabled="disabled" selected="selected" value="0"></option>';
            if (window.location.pathname.substr(-14) === 'noticeadd.html') html = '<option disabled="disabled" selected="selected"></option>'
            for (let i = 0; i < cityArray.length; i++) {
                html += '<option value=' + cityArray[i].idCity + '>' + cityArray[i].cityName + '</option>';
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
                let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userrByUserrIdUser.idUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
                noticeArray.push(newNotice);
            });

        } else {
            console.log('error');
        }
        const noticeListHTML = document.getElementById('notices');
        html = '';
        for (let i = noticeArray.length - 1; i >= 0; i--) {
            let notice = noticeArray[i];
            html += '<a href="notice.html" onclick="getNoticeId(' + notice.idNotice + '); storeUserId(' + notice.addedByUser + ');" class="list-group-item list-group-item-action flex-column align-items-start">';
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

            html += '<div class="d-flex w-100 justify-content-between">';
            let poziom='';
            if(notice.level===1) poziom='Szkoła podstawowa';
            if(notice.level===2) poziom='Gimnazjum';
            if(notice.level===3) poziom='Szkoła średnia';
            if(notice.level===4) poziom='Szkoła wyższa';
            html += '<h6 class="mb-1">' + ((notice.lookOrOffer == 1) ? 'uczeń' : 'korepetytor') + '</h6>';
            html += '<h6>' + poziom + '</h6>';
            html += '<h6>' + getTime(notice.timeFrom) + ' - ' + getTime(notice.timeTo) + '</h6>';
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
            let newNotice = new Notice(notice.idNotice, notice.lookOrOffer, notice.note, notice.meetingPlace, notice.meetingDate, notice.price, notice.level, notice.timestamp, notice.userrByUserrIdUser.idUser, notice.timeFrom, notice.timeTo, notice.subjectBySubjectIdSubject.name);
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
            let poziom='';
            if(notice.level===1) poziom='Szkoła podstawowa';
            if(notice.level===2) poziom='Gimnazjum';
            if(notice.level===3) poziom='Szkoła średnia';
            if(notice.level===4) poziom='Szkoła wyższa';
            html += '<li class="list-group-item">Poziom: ' + poziom + '</li>';
            html += '<li class="list-group-item">Miejsce spotkania: ' + notice.meetingPlace + '</li>';
            html += '<li class="list-group-item">Cena za godzinę: ' + notice.price + ' zł </li>';
            html += '<li class="list-group-item">Godzina: ' + getTime(notice.timeFrom) + ' - ' + getTime(notice.timeTo) + '</li>';
            html += '<li class="list-group-item">Termin spotkania: ' + getDate(notice.meetingDate) + '</li>';
            console.log(notice.addedByUser);
            if (notice.addedByUser === Number(getLoggedUserId())) {
                html += '<button type="button" class="btn btn-danger show-ann" onclick="deleteNotice(' + notice.idNotice + ')">Usuń</button>';
            }
        }
        noticeListHTML.innerHTML = html;
    };
    request.send();
}

function deleteNotice(idNotice) {
    let json = JSON.stringify('');
    let deleteNotice = new XMLHttpRequest();
    deleteNotice.open("DELETE", noticesUrl + '/' + idNotice, false);
    deleteNotice.setRequestHeader('Content-Type', 'application/json');
    deleteNotice.send(json);
    deleteNotice.onreadystatechange(window.history.back());
}

function storeLoggedUserInfo() {
    let req = new XMLHttpRequest();
    let user;
    req.open('GET', currentUrl, false);
    req.onreadystatechange = function () {
        user = JSON.parse(this.response);
        localStorage.setItem("loggedID", user.idUser);
        localStorage.setItem("loggedName", user.name);
        localStorage.setItem("loggedSurname", user.surname);
        localStorage.setItem("loggedEmail", user.email);
        localStorage.setItem("loggedAvatar", user.avatar);
    }
    req.send();
}

function setProfileInfo() {
    const userInfo = document.getElementById('userInfo');
    html = '<h5>' + localStorage.getItem('loggedName') + ' ' + localStorage.getItem('loggedSurname') + '</h5>';
    html += '<h6>' + localStorage.getItem('loggedEmail') + '</h6>';
    userInfo.innerHTML = html;

    if (window.location.pathname.substr(-16) === 'profileedit.html') {
        document.getElementById("nameSurname").innerText = localStorage.getItem('loggedName') + ' ' + localStorage.getItem('loggedSurname');
        $("#loggedUserAvatar").attr('src', localStorage.getItem("loggedAvatar"));
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
    let month = addZero(date.getMonth() + 1);
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
        data.lookOrOffer = "1";
    } else {
        data.lookOrOffer = "0";
    }
    data.note = document.getElementById("noticeDescription").value;
    data.meetingPlace = $("#selectCity option:selected").text();
    data.meetingDate = document.getElementById("date").value;

    data.price = Number(document.getElementById("price").value);
    dataIdSubject.idSubject = document.getElementById('selectSubject').value;

    data.active = "1";
    data.level = document.getElementById('selectLevel').value;

    data.timeFrom = timeToTimestamp(data.meetingDate, document.getElementById('timeFrom').value);
    data.timeTo = timeToTimestamp(data.meetingDate, document.getElementById('timeTo').value);
    data.subjectBySubjectIdSubject = dataIdSubject;
    dataIdUser.idUser = Number(getLoggedUserId());
    data.userrByUserrIdUser = dataIdUser;

    let json = JSON.stringify(data);
    let postNotice = new XMLHttpRequest();
    postNotice.open("POST", noticesUrl, false);
    postNotice.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    postNotice.send(json);

    postNotice.onreadystatechange(window.history.back());
}

function lookFor() {
    let lookForData = {};

    lookForData.subjectName = document.getElementById('selectSubject').value;
    lookForData.level = document.getElementById('selectLevel').value;
    lookForData.voivodeship = document.getElementById('selectVoivodeship').value;
    lookForData.city = $("#selectCity option:selected").text();
    lookForData.priceMin = document.getElementById("priceMin").value;
    lookForData.priceMax = document.getElementById("priceMax").value;

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

    let noticeArray = new Array();
    let noticeList;
    let request = new XMLHttpRequest();
    request.open('GET', noticesUrl + '/find/' + lookForData.subjectName + '/' + lookForData.level + '/' + lookForData.offerOrLookFor + '/' + lookForData.city + '/' + lookForData.priceMin + '/' + lookForData.priceMax + '/' + lookForData.ascOrDesc, true);
    request.onload = function () {
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

            html += '<div class="d-flex w-100 justify-content-between">';
            html += '<h6 class="mb-1">' + ((notice.lookOrOffer == 1) ? 'uczeń' : 'korepetytor') + '</h6>';
            html += '<h6>' + getTime(notice.timeFrom) + ' - ' + getTime(notice.timeTo) + '</h6>';
            html += '</div>';
            html += '</a>';
        }
        noticeListHTML.innerHTML = html;
    };
    request.send();

}

function editProfile() {
    let editData = {};
    let editData2 = {};
    let user;
    let request = new XMLHttpRequest();
    request.open('GET', usersUrl + '/' + getLoggedUserId(), false);
    request.onreadystatechange = function () {
        user = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            user = new User(user.idUser, user.login, user.name, user.surname, user.birthDate, user.avatar, user.phone, user.email, user.cityByCityIdCity.name, user.cityByCityIdCity.idCity, user.about);
        } else {
            console.log('error');
        }
    }
    request.send();

    editData.idUser = user.idUser;
    editData.name = document.getElementById("userName").value;
    editData.surname = document.getElementById("userSurname").value;
    editData.birthDate = user.birthDate;
    editData.avatar = user.avatar;
    editData.phone = document.getElementById("userPhone").value;
    editData.email = user.email;
    editData.about = document.getElementById("userAbout").value;
    editData2.idCity = document.getElementById('selectCity').value;
    editData.cityByCityIdCity = editData2;

    let data = JSON.stringify(editData);

    let editUser = new XMLHttpRequest();
    editUser.open('PUT', usersUrl + '/' + user.idUser, false);
    editUser.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    editUser.send(data);
    editUser.onreadystatechange(window.history.back());
}

function postOpinion() {
    var opinion = {};
    var opinion2 = {};
    var opinion3 = {};
    opinion.idOpinion = "";
    opinion.rating = document.getElementById("userAddOpinion").value;
    opinion.comment = document.getElementById("userAddOpinionDescription").value;
    opinion.userTo = getUserId();
    opinion.userFrom = getLoggedUserId()
    opinion2.idUser = getUserId();
    opinion3.idUser = getLoggedUserId()
    opinion.userrByUserTo = opinion2;
    opinion.userrByUserFrom = opinion3;

    let postOpinion = new XMLHttpRequest();
    let json = JSON.stringify(opinion);
    postOpinion.open("POST", opinionsUrl, false);
    postOpinion.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    postOpinion.onload;
    postOpinion.send(json);
    postOpinion.onreadystatechange(window.history.back());
}

function loadUserNameAvatar(idUser) {
    let request = new XMLHttpRequest();
    request.open('GET', usersUrl + '/' + idUser, false);
    request.onreadystatechange = function () {
        user = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            user = new User(user.idUser, user.login, user.name, user.surname, user.birthDate, user.avatar, user.phone, user.email, user.cityByCityIdCity.name, user.cityByCityIdCity.idCity, user.about);
        } else {
            console.log('error');
        }
        document.getElementById("nameSurname").innerText = user.name + ' ' + user.surname;
        $("#loggedUserAvatar").attr('src', user.avatar);
        console.log(user.avatar);
    }
    request.send();
}