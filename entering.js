
"use strict";
(function (factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        window.TextInput = factory;
    }
})(function (options) {
	var cTextIndex 	= 0;
	var index 		= 0;
	var textArr		= options.texts;
	var writeSpeed 	= options.writeSpeed;
	var deleteSpeed = options.deleteSpeed;
	var interval	= options.interval;
	var timer 		= null;
	var newTexts	= '';
	var textLength	= 0;

	var split 		= '<span class="split'+(options.css3 ? ' css3-fade' : '')+'" id="split"></span>';

	function write(text, seconds){
		textLength 	= text.length;
		newTexts 	= [];
		index 		= 0;
		function w(){
			writeToDom(newTexts.join(''));
			if(index > textLength - 1){
				clearTimer();
				cTextIndex++;
				if(cTextIndex < textArr.length){
					next(function(){
						backspace(textArr[cTextIndex-1], deleteSpeed);
					});
				}
			}else{
				newTexts.push(text[index]);
				timer = setTimeout(function(){
					index++;
					w();
				}, seconds);
			}
		};
		w();
	}
	function backspace(text, seconds){
		textLength 	= text.length;
		newTexts 	= text.split('');
		index 		= textLength - 1;
		function b(){
			writeToDom(newTexts.join(''));
			if(index < 0){
				clearTimer();
				next(function(){
					write(textArr[cTextIndex], writeSpeed);
				});
			}else{
				newTexts.pop();
				timer = setTimeout(function(){
					index--;
					b();
				}, seconds);
			}
		};
		b();
	}

	function clearTimer(){
		clearTimeout(timer);
	}
	function next(fn){
		setTimeout(fn, interval);
	}
	function writeToDom(text){
		options.box.innerHTML = '&gt;' + text + split;
	}

	return {
		begin: function(){
			write(textArr[cTextIndex], writeSpeed);
			if(!options.css3){
				setInterval(function(){
					document.getElementById('split').style.opacity = document.getElementById('split').style.opacity === '1' ? '0' : '1';
				}, 350);
			}
		}
	}
});
