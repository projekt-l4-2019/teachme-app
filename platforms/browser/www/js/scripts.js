var url = "https://rhubarb-cobbler-84890.herokuapp.com/persons";
const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

let html = '<table class="table table-striped">';
let request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function() {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response);

    // console.log(request);

    let persons=data._embedded.persons;

    if (request.status >= 200 && request.status < 400) {
        persons.forEach(info => {
            console.log(info.name);

            html+='<tr>';
            html+='<td>'+info.name+'</td>';
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

    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(json);

}