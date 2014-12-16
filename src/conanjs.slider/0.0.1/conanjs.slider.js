(function(){
    //设置默认参数
    var $T = AM.type,
        $D = AM.dom,
        $E = AM.event;
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
         *  切换的方式,默认的是滚动
         *
         *  @type   {String}
         */
        animate : 'default',
        /**
         *  切换的方向(滚动支持上下和左右两种方式)
         *  如果需要上下滚动 ： top ; 如果需要左右滚动 ： left
         *
         *  @type   {String}
         */
        path : 'top',
        /**
         *  动画的间隔时间
         *
         *  @type   {Number}
         */
        speed : 1000
    };

    function slider(option) {
        conanjs.tools.extend(this,defaultParam,option);

        domReady(this);
    }

    function getDefaultStyle(obj,attribute){
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
                html = null;

            for(var i = 0; i < len; i++){
                lis.push('<li><img src="'+ imgs[i] +'" /></li>');
                number.push('<li>'+ (i + 1) +'</li>');
            }

            html = '<div class="slider-wrap"><ul class="slider">'+ lis.join('') +'</ul></div><ol class="number">'+ number.join('') +'</ol>';

            target.innerHTML = html;

            //根据动画改变css，通过不同的class控制
            //如果是纵向滚动--coanajs-y
            //如果是横向滚动--conanjs-x
            //如果是渐隐渐显--coanajs-fade
            if($T.isString(param.animate)) {
                uls = target.childNodes[0].childNodes[0];
                if(param.animate === 'default' && $T.isString(param.path)) { //如果是要左右滚动
                    if(param.path === 'top'){ //如果是要上下滚动
                        $D.addClass(target,'conanjs-y');
                        //得到外框的高度
                        targetHeight = getDefaultStyle(target,'height');
                        //动态的设置高度
                        uls.style.height = (len * parseInt(targetHeight)) + 'px';
                    }else { //如果要左右滚动
                        $D.addClass(target,'conanjs-x');
                        //得到外框的宽度
                        targetWidth = getDefaultStyle(target,'width');
                        //动态的设置宽度
                        uls.style.width = (len * parseInt(targetWidth)) + 'px';
                    }
                }else if(param.animate === 'fade') { //如果是渐隐渐显
                    $D.addClass(target,'conanjs-fade');
                }
            }
            animate(param.path);
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
    //动画
    function animate(path){
        //点击下面的小方块出现对应的图片
        var numberLis = $D.tagName('li',$D.className('number')[0]),
            slider = $D.className('slider')[0],
            imageLis = $D.tagName('li',slider),
            scroll = path === 'left' ? 'width' : 'height',
            imgWidth = getDefaultStyle(imageLis[0],scroll);

        $E.on(numberLis,'click',function(){
            //现在的this指向每一个li（有循环）
            var $this = this,
                indexNum = index($this,numberLis);
            //绑定索引值
            $this.setAttribute('data-index',indexNum);
            for(var i = 0,len = imageLis.length; i < len; i++){
                imageLis[i].setAttribute('data-index',index(imageLis[i],imageLis));
            }

            slider.style[path] = -indexNum * parseInt(imgWidth) + 'px';

        });
        //定义定时器自动滚动

        //鼠标划过的时候停止定时器
    }

    conanjs.slider = slider;
})();