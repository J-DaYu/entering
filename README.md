#entering

实现简单的输入和修改文本的动画效果
```
    var input = new TextInput({
        box             : document.getElementById('input'),  
        interval        : 1000, //输入和删除文本之间的间隔
        writeSpeed      : 100,  //输入文本的速度
        deleteSpeed	    : 80,   //删除文本的速度
        css3		    : true, //使用CSS3动画
        texts 		    : [
	        'PHP是最牛逼的开发语言！',
	        'C语言是最牛逼的开发语言！',
	        '萝卜白菜各有所爱，只要你用的好，什么语言都牛逼！'
        ]
    });
    input.begin();	
```	    
![输入图片说明](http://git.oschina.net/uploads/images/2015/1229/135820_c2b055fc_131214.gif "在这里输入图片标题")