const url = "https://rhubarb-cobbler-84890.herokuapp.com/noticeFulls";

//Get notices list from server
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

            html+='<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">';
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

            html+='dodano: '  + dt + '.' + month + '.' + year;
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
            html+='<small> Data spotkania: ' + dt + '.' + month + '.' + year + ' #' + notice.id + '</small>';
            html+='</a>';
        });

    } else {
        console.log('error');
    }
    app.innerHTML=html;
};
request.send();

// Post a user
// function sendData() {
//
//     var data = {};
//     data.name = document.getElementById("inputName").value;
//     data.surname = document.getElementById("inputSurname").value;
//
//     if(data.name==='') alert("Nie podano wartosci!");
//     else {
//         let json = JSON.stringify(data);
//         console.log(data);
//         let xhr = new XMLHttpRequest();
//         xhr.open("POST", url, true);
//         xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
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
//         location.reload();
//     }
// }