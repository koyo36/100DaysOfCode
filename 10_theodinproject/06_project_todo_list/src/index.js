import { Task } from './Task.js';
import { Controller } from './Controller.js';


var task = new Task('Taks ONE', 'This is first task', 'DD:MM:YYY', 'high', 1);
var task2 = new Task('Taks TWO', 'This is first task', 'DD:MM:YYY', 'high', 1);


let listCtrl = new Controller();
let one = listCtrl.create(task);
listCtrl.addTask(one);
let two = listCtrl.create(task2);
listCtrl.addTask(two);

console.log(listCtrl.taskList[0]);
document.getElementById('app').innerHTML = listCtrl.taskList[0];
document.getElementById('app').innerHTML += listCtrl.taskList[1];
