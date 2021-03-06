function Slider(opts) {
	this.container = document.getElementById(opts.wrap)
    this.list = opts.list;
    this.init()
    this.renderUI()
    this.bindUI()
}
Slider.prototype = {
    init: function() {
        var winWidth = window.innerWidth,
            winHeight = window.innerHeight;
        //窗口长宽比
        this.ratio = winHeight / winWidth;
        this.scaleW = winWidth;
        this.idx = 0
    },
    renderUI: function() {
        var data = this.list;
        var len = data.length;
        var container = this.container;
        for (var i = 0; i < len; i++) {
            var li = document.createElement('li');
            var item = data[i];
            li.style.width = this.scaleW+'px';
            li.style.transform = 'translate3d(' + i * this.scaleW + 'px,0,0)';
            if (item) {
                if (item['height'] / item['width'] > this.ratio) {
                	li.innerHTML = '<img src="'+item['img']+'" height="100%">'
                }else{
                	li.innerHTML = '<img src="'+item['img']+'" width="100%">'
                }
            }
            container.appendChild(li);
        }
    },
    bindUI: function() {
    	var self = this;
    	var scale = this.scaleW;
    	var container = this.container;
    	var len =this.list.length;
    	var startHandler = function(e){
    		self.startX = e.touches[0].clientX;
    		self.offsetX = 0;
    		self.startTime = new Date() * 1;
    	}
    	var moveHandler = function(e){
    		e.preventDefault();
    		self.offsetX = e.touches[0].clientX - self.startX;
    		var lis = container.getElementsByTagName('li');
    		var i = self.idx - 1;
    		var m = i+3;
    		console.log(self.offsetX)
    		for( i; i < m; i++){
    			lis[i] && (lis[i].style.transform = 'translate3d('+((i-self.idx)*scale+self.offsetX)+'px,0,0)');
    			lis[i] && (lis[i].style.transiton = 'none');
    		}
    	}
    	var endHandler = function(e){
    		var boundary = self.scaleW/6;
    		var endTime = new Date() * 1;
    		var lis = container.getElementsByTagName('li');
    		if(endTime - self.startTime > 800){
        		if(self.offsetX >= boundary){
        			self.goIndex('-1')
        		}else if(self.offsetX < -boundary){
        			self.goIndex('1')
        		}else{
        			self.goIndex('0')
        		}
    		}else{
    			if(self.offsetX > 50){
    				self.goIndex('-1')
    			}else if(self.offsetX < -50){
    				self.goIndex('1')
    			}else{
    				self.goIndex('0')
    			}
    		}
    	}
    	container.addEventListener('touchstart',startHandler)
    	container.addEventListener('touchmove',moveHandler)
    	container.addEventListener('touchend', endHandler)
    },
    goIndex: function(n){
    	var idx = this.idx;
    	var cidx;
    	var lis = this.container.getElementsByTagName('li');
    	var len = lis.length;
    	var scale =this.scaleW;
    	if(typeof n == 'number'){
    		cidx = idx;
    	}else if(typeof n == 'string'){
    		cidx = idx + n*1
    	}
    	if(cidx > len - 1){
    		cidx = len -1;
    	}else if(cidx < 0){
    		cidx = 0
    	}
    	this.idx = cidx;
    	lis[cidx].style.transition = 'transform .3s ease-out';
    	lis[cidx+1] && (lis[cidx+1].style.transition = 'transform .3s ease-out');
    	lis[cidx-1] && (lis[cidx-1].style.transition = 'transform .3s ease-out');
    	lis[cidx].style.transform = 'translate3d(0,0,0)';
    	lis[cidx-1] && (lis[cidx-1].style.transform = 'translate3d(-'+scale+'px,0,0)');
    	lis[cidx+1] && (lis[cidx+1].style.transform = 'translate3d('+scale+'px,0,0)');
    }
}
   