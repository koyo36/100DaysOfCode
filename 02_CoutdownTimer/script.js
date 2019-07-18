// SEt the date we're counting down to
const date = new Date('Dec 31, 2019 00:00:00').getTime();

function calcTime( time )
{
    let seconds = time / 1000;

    const days = Math.floor(seconds / 86400);
    seconds = seconds % 86400;

    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;

    const minutes = Math.floor(seconds / 60);

    seconds = Math.floor(seconds % 60);

    return {
        day: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }

}

// console.log(calcTime(Math.floor( ) ));

let countDownFunction = setInterval( () => {

    let now = new Date().getTime();
    let remains = calcTime( date - now );

    document.getElementById('days').innerHTML = remains.day
    document.getElementById('hours').innerHTML = remains.hours
    document.getElementById('minutes').innerHTML = remains.minutes
    document.getElementById('seconds').innerHTML = remains.seconds

    console.log(remains);

}, 1000 )

countDownFunction;
