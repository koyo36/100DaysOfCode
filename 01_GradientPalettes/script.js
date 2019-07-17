var html = '';
const main = document.getElementById('main-content');

const colors = [
    {
        one: '#F9F871',
        two: '#FFC75F',
    },
    {
        one: '#FFC75F',
        two: '#FF9671',
    },
    {
        one: '#FF9671',
        two: '#FF6F91'
    },
    {
        one: '#FF6F91',
        two: '#D65DB1'
    },
    {
        one: '#D65DB1',
        two: '#2C73D2'
    },
    {
        one: '#2C73D2',
        two: '#008F7A'
    },
    {
        one: '#845EC2',
        two: '#B39CD0'
    },
    {
        one: '#00C9A7',
        two: '#F9F871'
    }

]

function createBox(one, two) {
    return `
        <div class="box shadow">
            <div class="box-color" style="background: linear-gradient(${one}, ${two});"></div>
            <div class="box-meta">
                <span data-color="${one}" class="one">${one}</span>
                <span><i class="fas fa-long-arrow-alt-right"></i></span>
                <span data-color="${two}" class="one">${two}</span>
            </div>
        </div>
    `;
}

colors.forEach( function(e) {
    html += createBox(e.one, e.two);
});


function render(data, where) {
    where.innerHTML = data
}


function copyText(data) {

    // HACK!!!!!
    let input = document.createElement('input');
    input.setAttribute('value', data);
    document.body.appendChild(input);
    input.select()

    document.execCommand('copy');

    document.body.removeChild(input)
}

function addEvents(el) {
    let boxes = el;

    boxes.forEach( function(e) {
        e.addEventListener('click', function() {
            //console.log('clicked: ' + e.style.background)
            //console.log(this);
            copyText(e.style.background);
            e.parentElement.classList.add('active')
            setTimeout(function () {  e.parentElement.classList.remove('active') }, 600 )
        } )
    })
}
render(html, main);
addEvents(document.querySelectorAll('.box-color'));
