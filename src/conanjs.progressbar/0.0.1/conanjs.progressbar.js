/**
 * 进度条
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-12-29
 * @version     0.0.1
 *
 * @depend      Archmage-1.0.0.js
 */
(function(){
    //设置默认参数
    var win = this,
        $H = AM.extend,
        $T = AM.type,
        $D = AM.dom,
        $E = AM.event,
        barDepot = win.bar = {};

    var defaultParam = {
        /**
         * 放进度条的盒子
         *
         * @type    {Object}
         */
        target : null,
        /**
         *  所占的比例（进度）
         *
         *  @type   {Number}  (0-100的数字)
         */
        proportion : 0,
        /**
         *  进度条的高度
         *
         *  @type   {Number/String}  (20/'20px')
         */
        height : 20,
        /**
         *  进度条的宽度
         *
         *  @type   {Number/String}
         */
        width : 5,
        /**
         *  进度条的样式
         *
         *  @type   {String}
         */
        style : 'default'
    };

    function progressbar(option){
        //参数合并处理
        $H(barDepot,defaultParam,option);
        //把参数传给domReady
        domReady(barDepot);
    }

    function domReady(param){
        var tar = param.target;

        if(tar){
            //第一步：拼接dom结构在里面
            var domArr = [
                '<div class="bg">',
                    '<div class="progress">',
                        '<div class="bar"></div>',
                    '</div>',
                '</div>',
                '<div class="progress-number"></div>'
            ].join('');
            $D.addClass(tar,'conanjs-progressbar');
            tar.innerHTML = domArr;

            //第二步 ： 给予基本样式
            $D.setStyle([tar,$D.className('bg')[0]],{'height':param.height,'width':param.width});

            //第三步 ： 按比例设置progressbar的高度
            if($T.isNumber(param.proportion)) {
                $D.setStyle($D.className('progress')[0],'height',parseInt(param.height) * (param.proportion/100) + 'px');
            }

            //第四步 ： 显示进度的数字
            $D.className('progress-number')[0].innerHTML = (param.proportion / parseInt(param.height)) * 100 + '%';

            //第五步 ： 实现拖动小球改变进度
            changeProgress(param);
        }
    }

    //这个方法用来获取鼠标的位置
    function mousePos(e){
        var x, y,
            e = e||window.event;
        return {
            x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
            y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop
        };
    }

    //这个方法用来拖动小球改变进度
    function changeProgress(param){
        var $progress = $D.className('progress')[0],
            $bar = $D.className('bar')[0],
            $bg = $D.className('bg')[0];
        function change(){
            //第一步获取鼠标的位置
            var result = mousePos(),
                hei = parseInt(param.height) - result.y;
            //第二步改变bar的位置
            $D.setStyle($progress,'height', hei + 'px');
            //第三步改变进度值
            $D.className('progress-number')[0].innerHTML = (hei / parseInt(param.height)) * 100 + '%';
        }
        $E.on($bar,'mousedown',function(){
            $E.on($bg,'mousemove',change);
            $E.on($bg,'mouseup',function(){
                //注：这里的off利用的removeEventListener，后面必须接事件
                //即change必须要提出来
                $E.off($bg,'mousemove',change);
            });
        });
    }

    win.conanjs = win.conanjs ? win.conanjs : {};
    conanjs.progressbar = progressbar;
})();