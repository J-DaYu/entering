var TextInput = function(options){
	var cTextIndex 	= 0;
	var index 		= 0;
	var textArr		= options.texts;
	var writeSpeed 	= options.writeSpeed;
	var deleteSpeed = options.deleteSpeed;
	var interval	= options.interval;
	var timer 		= null;
	var rawText		= '';
	var newTexts	= '';
	var textLength	= 0;

	var split 		= '<span class="split'+(options.css3 ? ' css3-fade' : '')+'" id="split"></span>';

	function write(text, seconds){
		rawText 	= text;
		textLength 	= rawText.length;
		newTexts 	= [];
		index 		= 0;
		var w = function(){
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
				newTexts.push(rawText[index]);
				timer = setTimeout(function(){
					index++;
					w();
				}, seconds);
			}
		};
		return w();
	}
	function backspace(text, seconds){
		rawText 	= text;
		textLength 	= rawText.length;
		newTexts 	= rawText.split('');
		index 		= textLength - 1;
		var b = function(){
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
		return b();
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
};