/**
 * 包含基本的查找以及class的操作
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-11-22
 * @version     0.0.1
 *
 * @depend      使用原生js来编写故不依赖任何组建
 */
(function(){
    var win = window,
        doc = win.document;

    //add by lixi 2014/11/24
    //判断类型

    //对象
    function isObject(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    //数组
    function isArray(arr){
        return (arr.constructor === Array && Object.prototype.toString.call(arr) === '[object Array]');
    }
    //空对象
    function isPlainObject(obj) {
        for (var n in obj) {
            return false;
        }
        return true;
    }

    //这个方法是所有的class操作的公共部分（抽出的公共方法）
    //Element.classList 返回元素的所有class，用数组的方式
    function argumentsCheck(ele,haveCallback,nohaveCallback){
        //如果传入的参数有误，则直接返回
        if(ele.length < 2) {
            return;
        }

        //拿到传入的参数
        var target = ele[0],
            className = ele[1];
        //对于有无传入的class做不同的操作
        if(target && typeof className === 'string'){
            if(target.classList.contains(className) && typeof haveCallback === 'function') { //如果包含传入的class
                haveCallback();
            }else if(typeof nohaveCallback === 'function'){ //如果不包含
                nohaveCallback();
            }
        }
    }

    win.CONANJS = {};

    //以下定义所有的base里面含有的方法
    CONANJS.base = {
        /**
         * 通过id来查找dom元素
         *
         * @param    id名称（string）
         * @return  {Object}
         */
        id : function(id){

            if(arguments.length < 1){return;}

            if(typeof id === 'string'){
                return doc.getElementById(id);
            }
        },
        /**
         * 通过class来查找dom元素
         *
         * @param    class名称（string）; 查找范围（object）
         * @return  {Array}
         */
        className : function(classname,confine){

            if(arguments.length < 1){return;}

            var tar = doc;
            if(confine && typeof confine === 'object'){
                tar = confine;
            }
            if(tar.getElementsByClassName(classname)){ //如果支持class查找
                return tar.getElementsByClassName(classname);
            }else {
                var children = context.getElementsByTagName('*'),
                    elements = [];

                for (var i = 0, l = children.length; i < l; i++) {
                    if (children[i].classList.contains(classname)) {
                        elements.push(children[i]);
                    }
                }
                return elements;
            }
        },
        /**
         * 通过tagName来查找dom元素
         *
         * @param    标签名称（string）; 查找范围（object）
         * @return  {Array}
         * @description
         */
        tagName : function(tagname,confine){

            if(arguments.length < 1){return;}

            var tar = doc;
            if(confine && typeof confine === 'object'){
                tar = confine;
            }
            return tar.getElementsByTagName(tagname);
        },
        /**
         * addClass方法用来添加class
         *
         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
         *
         * @description 如果传入的参数有误会直接返回，如果传入的class已经存在也会直接返回，只有dom元素正确，className为‘string’的时候才会加上class
         * Element.classList.add(""); 添加一个class(可以用逗号分割添加多个)
         */
        addClass : function(target,className){
            //把参数存储起来，传给publicPart
            var ele = arguments;

            //调用方法
            argumentsCheck(ele,function(){
                return;
            },function(){
                //如果class里面不包含新的class就添加一个
                target.classList.add(className);
            });

        },
        /**
         * removeClass方法用来删除class
         *
         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
         *
         * @description 如果传入的参数有误会直接返回，如果传入的class不存在也会直接返回，只有当前传入的dom元素含有这个class才会正常删除
         * 用到Element.classList.remove(""); 删除一个class
         */
        removeClass : function(target,className){
            var ele = arguments;
            argumentsCheck(ele,function(){
                target.classList.remove(className);
            },function(){
                return;
            });

        },
        /**
         * hasClass方法用来判断是否含有一个指定的class
         *
         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
         * @returns   {Boolean}
         * @description   如果传入的参数有误会直接返回，如果传入的class不存在也会直接返回，正常情况下会返回Boolean值
         * Element.classList.contains("") 判断是否含有某一class
         */
        hasClass : function(target,className){

            var ele = arguments,
                result = false;
            argumentsCheck(ele,function(){
                result = true;
            });
            return result;
        },
        /**
         * 合并对象的方法
         *
         * @param     要合并的对象（object）
         * @description   传入的对象从后面向前面合并，会放到最前面
         */
        extend : function (destination, source) {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;

            // 处理深拷贝的情况
            if (typeof target === "boolean") {
                deep = target;

                // 跳过布尔和目标
                target = arguments[ i ] || {};
                i++;
            }

            // 当目标是一个字符串或东西（可能在深副本）
            if (typeof target !== "object" && !typeof target === 'function') {
                target = {};
            }

            // 如果只有一个参数传递
            if (i === length) {
                target = this;
                i--;
            }

            for (; i < length; i++) {
                // 只处理非空/未定义值
                if ((options = arguments[ i ]) != null) {
                    // 扩展基本对象
                    for (name in options) {
                        src = target[ name ];
                        copy = options[ name ];

                        // 防止无限循环
                        if (target === copy) {
                            continue;
                        }

                        // 递归如果我们合并纯对象或数组
                        if (deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) )) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && $T.isArray(src) ? src : [];

                            } else {
                                clone = src && isPlainObject(src) ? src : {};
                            }

                            // 不移动原始对象，他们克隆
                            target[ name ] = CONANJS.extend(deep, clone, copy);

                        } else if (copy !== undefined) {
                            target[ name ] = copy;
                        }
                    }
                }
            }

            // 返回合并后的对象
            return target;
        }
    };
})();