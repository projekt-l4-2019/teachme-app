const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

let html = '<table class="table table-striped">';
let request = new XMLHttpRequest();
request.open('GET', 'https://rhubarb-cobbler-84890.herokuapp.com/persons', true);
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