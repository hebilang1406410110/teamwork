window.onload = function (){

var p=document.getElementById('login');

var q=document.getElementById('screen');

var left=(document.documentElement.clientWidth - 300)/2;
var top=(document.documentElement.clientHeight - 450)/2;

p.style.top=top+'px';
p.style.left=left+'px';

q.style.width=document.documentElement.clientWidth+'px';
q.style.height=document.documentElement.clientHeight+'px';


}


window.onresize = function (){
	var p=document.getElementById('login');

	var left=(document.documentElement.clientWidth - 300)/2;
	var top=(document.documentElement.clientHeight - 450)/2;

	p.style.top=top+'px';
	p.style.left=left+'px';
}


function x(){
	document.getElementById('login').style.display="none";
	document.getElementById('screen').style.display="none";
}

function show(){
	document.getElementById('login').style.display="block";
	document.getElementById('screen').style.display="block";
}