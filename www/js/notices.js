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

    let html = '<table class="table table-striped"><tr><td>Id:</td><td>Miejsce spotkania:</td><td>Przedmiot:</td><td>Data spotkania:</td></tr>';

    if (request.status >= 200 && request.status < 400) {
        notices.forEach(notice => {
            html+='<tr>';
            html+='<td>'+notice.id+'</td>';
            html+='<td>'+notice.meeting_place+'</td>';
            html+='<td>'+notice.subject+'</td>';

            let date = new Date(notice.meeting_date);

            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();
            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            html+='<td>'+ dt + '.' + month + '.' + year +'</td>';
            html+='</tr>';
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