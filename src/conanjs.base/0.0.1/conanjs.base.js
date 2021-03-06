/**
 * 包含基本的查找以及class的操作
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-11-22
 * @version     0.0.1
 *
 */
(function(){
    var win = this;
    win.conanjs = win.conanjs || {};
})();

//这部分是类型判断
//(function(){
//    var win = this;
//
//    //类型校验的公共部分
//    function isType(type) {
//        return function(obj) {
//            return Object.prototype.toString.call(obj) === "[object " + type + "]"
//        }
//    }
//
//    conanjs.type = {
//        /**
//         * 判断是否为数组
//         *
//         * @param    {Array}
//         * @return  {Boolean}
//         */
//        isArr : isType('Array'),
//        /**
//         * 判断是否为对象
//         *
//         * @param    {Object}
//         * @return  {Boolean}
//         */
//        isObject : isType('Object'),
//        /**
//         * 判断是不是字符串
//         *
//         * @param    {String}
//         * @return  {Boolean}
//         */
//        isString : isType('String'),
//        /**
//         * 判断是不是数字类型
//         *
//         * @param    {Number}
//         * @return  {Boolean}
//         */
//        isNumber : isType('Number'),
//        /**
//         * 判断是不是一个方法（function）
//         *
//         * @param    {Function}
//         * @return  {Boolean}
//         */
//        isFunction : isType('Function'),
//        /**
//         * 判断是不是空对象
//         *
//         * @param {Object}
//         * @return {Boolean}
//         */
//        isPlainObject : function(obj) {
//            if(isObject(obj)){
//                for (var n in obj) {
//                    return false;
//                }
//                return true;
//            }else {
//                return false;
//            }
//        },
//        /**
//         * 判断是否是布尔类型
//         *
//         * @param {Object}
//         * @return {Boolean}
//         */
//         isBoolean : isType('Boolean')
//    };
//})();

//这部分是dom查找
//(function(){
//    var doc = document,
//        $T = conanjs.type;
//
//    //这个方法用来控制class的公共部分
//    function classControl(ele,callback){
//        //console.log(ele);
//        //如果传入的参数有误，则直接返回
//        if(ele.length < 2) {
//            return;
//        }
//
//        //拿到传入的参数
//        var target = ele[0],
//            className = ele[1];
//
//        if(target && $T.isString(className)){
//            if($T.isFunction(callback)) { //如果包含传入的class
//                callback();
//            }
//        }
//    }
//    conanjs.dom = {
//        /**
//         * 通过id来查找dom元素
//         *
//         * @param    id名称（string）
//         * @return  {Object}
//         */
//        id : function(id){
//            if(arguments.length < 1){return;}
//
//            //修改类型判断的方式
//            if($T.isString(id)){
//                return doc.getElementById(id);
//            }
//        },
//        /**
//         * 通过class来查找dom元素
//         *
//         * @param    class名称（string）; 查找范围（object）
//         * @return  {Array}
//         */
//        className : function(classname,confine){
//
//            if(arguments.length < 1){return;}
//
//            var tar = doc;
//
//
//            if(confine && $T.isObject(confine)){
//                tar = confine;
//            }
//
//            if(doc.getElementsByClassName){ //如果支持class查找
//                return tar.getElementsByClassName(classname);
//            }else {
//                var children = tar.getElementsByTagName('*'),
//                    elements = [];
//
//                for (var i = 0, l = children.length; i < l; i++) {
//                    if (children[i].classList.contains(classname)) {
//                        elements.push(children[i]);
//                    }
//                }
//                return elements;
//            }
//        },
//        /**
//         * 通过tagName来查找dom元素
//         *
//         * @param    标签名称（string）; 查找范围（object）
//         * @return  {Array}
//         * @description
//         */
//
//        tagName : function(tagname,confine){
//
//            if(arguments.length < 1){return;}
//
//            var tar = doc;
//
//            if(confine && $T.isObject(confine)){
//                tar = confine;
//            }
//            return tar.getElementsByTagName(tagname);
//        },
//        /**
//         * addClass方法用来添加class
//         *
//         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
//         *
//         * @description 如果传入的参数有误会直接返回，如果传入的class已经存在也会直接返回，只有dom元素正确，className为‘string’的时候才会加上class
//         * Element.classList.add(""); 添加一个class(可以用逗号分割添加多个)
//         */
//        addClass : function(target,className){
//
//            //调用方法
//            classControl(arguments,function(){
//                //如果class里面不包含新的class就添加一个
//                target.classList.add(className);
//            });
//
//        },
//        /**
//         * removeClass方法用来删除class
//         *
//         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
//         *
//         * @description 如果传入的参数有误会直接返回，如果传入的class不存在也会直接返回，只有当前传入的dom元素含有这个class才会正常删除
//         * 用到Element.classList.remove(""); 删除一个class
//         */
//        removeClass : function(target,className){
//            classControl(arguments,function(){
//                target.classList.remove(className);
//            });
//
//        },
//        /**
//         * hasClass方法用来判断是否含有一个指定的class
//         *
//         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
//         * @returns   {Boolean}
//         * @description   如果传入的参数有误会直接返回，如果传入的class不存在也会直接返回，正常情况下会返回Boolean值
//         * Element.classList.contains("") 判断是否含有某一class
//         */
//        hasClass : function(target,className){
//
//            if(arguments.length < 2) {
//                return;
//            }
//
//            var result = false;
//            classControl(arguments,function(){
//                if(target.classList.contains(className)){
//                    result = true;
//                }
//            });
//            return result;
//        }
//    };
//})();

//这部分是工具方法
//(function(){
//    var $T = conanjs.type;
//    conanjs.tools = {
//        extend : function () {
//            var options, name, src, copy, copyIsArray, clone,
//                target = arguments[0] || {},
//                i = 1,
//                length = arguments.length,
//                deep = false;
//
//            // 处理深拷贝的情况（所有的部分全部拷贝一次）
//            if ($T.isBoolean(target)) {
//                deep = target;
//
//                // 跳过布尔和目标
//                target = arguments[ i ] || {};
//                i++;
//            }
//
//            // 当目标是一个字符串（可能在深副本）
//            if (!($T.isObject(target)) && !($T.isFunction(target))) {
//                target = {};
//            }
//
//            // 如果只有一个参数传递
//            if (i === length) {
//                target = this;
//                i--;
//            }
//
//            for (; i < length; i++) {
//                // 只处理非空/未定义值
//                if ((options = arguments[ i ]) != null) {
//                    // 扩展基本对象
//                    for (name in options) {
//                        src = target[ name ];
//                        copy = options[ name ];
//
//                        // 防止无限循环
//                        if (target === copy) {
//                            continue;
//                        }
//
//                        // 递归如果我们合并纯对象或数组
//                        if (deep && copy && ( $T.isPlainObject(copy) || (copyIsArray = $T.isArray(copy)) )) {
//                            if (copyIsArray) {
//                                copyIsArray = false;
//                                clone = src && $T.isArray(src) ? src : [];
//
//                            } else {
//                                clone = src && $T.isPlainObject(src) ? src : {};
//                            }
//
//                            // 不移动原始对象，他们克隆
//                            target[ name ] = conanjs.tools.extend(deep, clone, copy);
//
//                        } else if (copy !== undefined) {
//                            target[ name ] = copy;
//                        }
//                    }
//                }
//            }
//
//            // 返回合并后的对象
//            return target;
//        }
//    };
//})();

//fadeIn fadeOut
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

})();
