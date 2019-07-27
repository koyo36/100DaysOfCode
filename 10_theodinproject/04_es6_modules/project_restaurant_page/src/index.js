console.log('fuck me daddy');
import { navigation } from './navigation'
import { banner } from './banner'
import { content } from './content'

let img = banner();

document.getElementById('content').innerHTML = navigation();
document.getElementById('content').innerHTML += content(banner()) ;
