/**
 * 按钮控制模块
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-11-21
 * @version     0.0.1
 *
 * @depend      Archmage
 */
(function(){
    var $D = AM.dom,
        $T = AM.type,
        win = this;

    clickButton = function(tar,callback){
        var DISABLE = 'conanjs-disabled';
        if(tar && $T.isFunction(callback)){ //如果callback传入一个方法就会执行函数

            if($D.hasClass(tar,DISABLE)){ //如果含有disabled的class就直接返回
                return;
            }else { //否则的话加上一个class
                $D.addClass(tar,DISABLE);
                if($T.isFunction(callback)){
                    callback();
                };
            }

        }else{ //否则的话我们就会认为是放开按钮的锁定
            $D.removeClass(tar,DISABLE);
        }
    };
    win.conanjs = win.conanjs ? win.conanjs : {};
    win.conanjs.button = clickButton;
})();