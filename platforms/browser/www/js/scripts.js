const url = "https://rhubarb-cobbler-84890.herokuapp.com/persons";

//Get user list from server
const app = document.getElementById('root');
let persons;
let request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    persons=data._embedded.persons;

    let html = '<table class="table table-striped"><tr><td>Id:</td><td>Imie:</td><td>Nazwisko:</td></tr>';

    if (request.status >= 200 && request.status < 400) {
        persons.forEach(user => {
            html+='<tr>';
            html+='<td>'+user.id+'</td>';
            html+='<td>'+user.name+'</td>';
            html+='<td>'+user.surname+'</td>';
            html+='</tr>';
        });
    } else {
        console.log('error');
    }
    app.innerHTML=html;
};
request.send();

// Post a user
function sendData() {

    var data = {};
    data.name = document.getElementById("inputName").value;
    data.surname = document.getElementById("inputSurname").value;

    if(data.name==='') alert("Nie podano wartosci!");
    else {
        let json = JSON.stringify(data);
        console.log(data);
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
        location.reload();
    }
}

function deleteAllUsers(){
    let last_id=persons[persons.length-1].id;
    let first_id=persons[0].id;

    // for(last_id;last_id>=first_id;last_id--){
    //     let del = new XMLHttpRequest();
    //
    //     del.open("DELETE",url + "/" + last_id.toString(), true);
    //     del.setRequestHeader('Content-type','application/json; charset=utf-8');
    //     del.send();
    // }
    var data = {};
    let json = JSON.stringify(data);
    console.log(data);
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE",url + "/" + last_id.toString(), true);
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
}