let youChoose = '';
let enemyChoose = '';

let clicked = false;
let winner = '';

const you = document.querySelector('.you');
const options = Array.from(document.querySelectorAll('.option'));



options.forEach(function(option) {

    option.addEventListener('click', function(e) {
        e.preventDefault();

        clickCheck(this);
        youChoose = this.dataset.key;

        enemyChoose = enemyPlays()
        renderEnemy(enemyChoose);

        compare( youChoose, enemyChoose )
        renderWinner();
    })

});

function enemyPlays() {
    let rand = Math.floor(Math.random() * 3);
    if( rand === 0) { enemyChoose = 'rock' }
    else if( rand === 1) { enemyChoose = 'scissors' }
    else { enemyChoose = 'paper' }

    return enemyChoose;
}

function clickCheck(e) {

    if ( !clicked ) {
        e.classList.add('active')
        clicked = true;
    }

}


function compare( youChoose, enemyChoose ) {

    if( youChoose == 'rock' && enemyChoose == 'scissor' ) {
        winner = 'You Won!';
    }
    else if( youChoose == 'paper' && enemyChoose == 'rock' ) {
        winner = 'You Won!';
    }
    else if( youChoose == 'scissors' && enemyChoose == 'paper' ) {
        winner = 'You Won!';
    }
    else if( youChoose == enemyChoose) {
        winner = 'Game was a DRAW!'
    }
    else {
        winner = 'Enemy Won!'
    }
    return winner;
}

function renderEnemy(enemyChoose) {
    document.querySelector('#enemy').innerHTML = enemyChoose
}

function renderWinner() {
    console.log(document.querySelector('#response').classList.add('active'))
    document.querySelector('.response-container').innerHTML = `<h1>🏆🏆🏆${winner}🏆🏆🏆</h1>`
}
