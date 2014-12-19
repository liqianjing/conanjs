(function(){
    //设置默认参数
    var $H = AM.extend,
        $T = AM.type,
        $D = AM.dom,
        $E = AM.event,
        counter = 1;

    var defaultParam = {
        /**
         *  窗口对象
         *
         *  @type   {Object}
         */
        target : null,
        /**
         *  显示的图片集合
         *
         *  @type   {Array}
         */
        imgArr : [],
        /**
         *  切换的方式,默认的是fade (支持三种方式的动画 animate-top : 上下滚动， animate-left : 左右滚动， animate-fade : 渐隐渐显)
         *
         *  @type   {String}
         */
        animate : 'animate-fade',
        /**
         *  动画的间隔时间
         *
         *  @type   {Number}
         */
        speed : 2000
    };

    function slider(option) {
        var interface = this.slider = {};
        $H(interface,defaultParam,option);

        domReady(interface);
    }

    function getStyle(obj,attribute){
        var result = null;
        if(obj.currentStyle) {
            result = obj.currentStyle[attribute];
        }else {
            result = document.defaultView.getComputedStyle(obj,false)[attribute];
        }
        return result;
    }

    function domReady(param) {
        //到这里参数已经ok; 但下面要判断参数的有效性
        var target = param.target;
        if(target){ //判断target的有效性

            var imgs = param.imgArr,
                len = imgs.length,
                lis = [],
                number = [],
                targetWidth = null,
                targetHeight = null,
                uls = null,
                html = null,
                animateParam = param.animate;

            //根据参数拼接dom结构
            for(var i = 0; i < len; i++){
                lis.push('<li><img src="'+ imgs[i] +'" /></li>');
                number.push('<li>'+ (i + 1) +'</li>');
            }

            html = '<div class="slider-wrap"><ul class="slider">'+ lis.join('') +'</ul></div><ol class="number">'+ number.join('') +'</ol>';

            target.innerHTML = html;


            //设置默认选中
            $D.addClass($D.tagName('li',$D.className('number')[0])[0],'on');

            if(param.animate === 'animate-fade'){
                var slider = $D.className('slider')[0],
                    imageLis = $D.tagName('li',slider);
                AM.each(imageLis,function(){
                    var opacity = getStyle(this,'opacity');
                    if(opacity > 0) {
                        this.style.opacity = 0;
                    }
                });
                imageLis[0].style.opacity = 1;
            }

            //根据动画改变css，通过不同的class控制
            //如果是纵向滚动--coanajs-y
            //如果是横向滚动--conanjs-x
            //如果是渐隐渐显--coanajs-fade
            if($T.isString(animateParam)) {
                uls = target.childNodes[0].childNodes[0];
                if(animateParam === 'animate-top') { //如果是要左右滚动
                    $D.addClass(target,'conanjs-top');
                    //得到外框的高度
                    targetHeight = getStyle(target,'height');
                    uls.style.height = (len * parseInt(targetHeight)) + 'px';
                    animate('top');
                }else if(animateParam === 'animate-left') { //如果是渐隐渐显
                    $D.addClass(target,'conanjs-left');
                    //得到外框的宽度
                    targetWidth = getStyle(target,'width');
                    //动态的设置宽度
                    uls.style.width = (len * parseInt(targetWidth)) + 'px';

                    animate('left');
                }else { //如果参数有问题就直接把动画定义为fade
                    $D.addClass(target,'conanjs-fade');
                    uls.style.width = getStyle(target,'width') + 'px';
                    uls.style.height = getStyle(target,'height') + 'px';

                    animate('fade',param.speed);
                }
            }
        }
    }
    //元素的索引值
    function index(current, obj){
        for (var i = 0;i < obj.length; i++) {
            if (obj[i] == current) {
                return i;
            }
        }
    }

    //trigger的实现
    function trigger(target,type,data){
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type,true,true);
        event.data = data || {};
        event.eventName = type;
        event.target = target;
        target.dispatchEvent(event);
        return target;
    }

    //动画
    function animate(path,speed){
        //点击下面的小方块出现对应的图片
        var numberLis = $D.tagName('li',$D.className('number')[0]),
            slider = $D.className('slider')[0],
            imageLis = $D.tagName('li',slider),
            speed = speed || 2000,
            scroll = path === 'left' ? 'width' : ('top' ? 'height' : 'fade'),
            len = numberLis.length;

        $E.on(numberLis,'click',function(){

            //现在的this指向每一个li（有循环）
            var $this = this,
                indexNum = index($this,numberLis);
            //当前选中的加一个class显示为当前的
            AM.each(numberLis,function(){
                $D.removeClass(this,'on');
            });
            $D.addClass($this,'on');
            //绑定索引值
            $this.setAttribute('data-index',indexNum);
            for(var i = 0,len = imageLis.length; i < len; i++){
                imageLis[i].setAttribute('data-index',index(imageLis[i],imageLis));
            }

            if(path === 'fade'){
                var current = parseInt($this.getAttribute('data-index'),10);
                AM.each(imageLis,function(){
                    var opacity = getStyle(this,'opacity');
                    if(opacity > 0) {
                        this.style.opacity = 0;
                    }
                });

                AM.fade.fadein(imageLis[current], 1, speed);

            }else {
                var imgWidth = getStyle(imageLis[0],scroll);
                slider.style[path] = -indexNum * parseInt(imgWidth) + 'px';
            }

        });
        var timer;

        function run(){
            //定义定时器自动滚动
            timer = setInterval(function(){
                trigger(numberLis[counter],'click');
                counter = counter === (len-1) ? 0 : (counter + 1);
            },2000);
        }

        run();

        //鼠标划过的时候停止定时器
        $E.on($D.className('slider-wrap')[0],'mouseover',function(){
            clearInterval(timer);
        });
        //划离的时候重启定时器
        $E.on($D.className('slider-wrap')[0],'mouseout',function(){
            run();
        });
    }

    conanjs.slider = slider;
})();