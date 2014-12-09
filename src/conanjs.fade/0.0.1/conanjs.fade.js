(function(){
    //原生js实现fadeIn fadeOut

    //这个方法用来设置opacity
    function setOpacity(ele, opacity) {
        if (ele.style.opacity != undefined) {
        //兼容FF和GG和新版本IE
            ele.style.opacity = opacity / 100;

        } else {
        //兼容老版本ie
            ele.style.filter = "alpha(opacity=" + opacity + ")";
        }
    }

    //这个方法用来获取css的值
    function getDefaultStyle(obj,attribute){
        var result = null;
        if(obj.currentStyle) {
            result = obj.currentStyle[attribute];
        }else {
            result = document.defaultView.getComputedStyle(obj,false)[attribute];
        }
        return result;
    }

    conanjs.fade = {
        //渐渐显示（fadeIn）
        fadein : function (ele, opacity, speed) {
            //第一个参数是执行操作的元素; 第二个参数是透明度; 第三个参数是时间

            //通过定时器来改变opacity
            if (ele) {
                //获取元素当前的opacity
                var eOpacity = getDefaultStyle(ele,'opacity');
                if (eOpacity < 1) {
                    //说明获取到的是opacity的属性值
                    eOpacity = eOpacity * 100;
                }

                //处理参数
                var count = speed / 1000,
                    avg = count < 2 ? (opacity / count) : (opacity / count - 1),
                    timer;

                //定义定时器渐变透明度
                timer = setInterval(function () {
                    if (eOpacity < opacity) {
                        eOpacity += avg;

                        setOpacity(ele,eOpacity);
                    } else {
                        clearInterval(timer);
                    }
                }, 100);
            }
        },

        //渐渐隐藏（fadeOut）
        fadeout : function (ele,opacity,speed){
            //第一个参数是执行操作的元素; 第二个参数是透明度; 第三个参数是时间
            if(ele){
                var eOpacity = getDefaultStyle(ele,'opacity');

                if (eOpacity <= 1) {
                    //说明获取到的是opacity的属性值
                    eOpacity = eOpacity * 100;
                }

                //处理参数
                var count = speed / 1000,
                    avg = count < 2 ? (eOpacity / count) : (eOpacity / count - 1),
                    timer;

                //定义定时器渐变透明度
                timer = setInterval(function () {
                    if (eOpacity > opacity) {
                        eOpacity -= avg;
                        setOpacity(ele,eOpacity);
                    } else {
                        clearInterval(timer);
                    }
                }, 100);
            }
        }
    }

})()