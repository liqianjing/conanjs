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
    //用来校验要合并的参数

    var _isObject = function(o){
        return Object.prototype.toString.call(o) === '[object Object]';
    },

    _extend = function(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                };


                source[property] = destination[property];

            }
        }
    },

    //这个方法是所有的class操作的公共部分（抽出的公共方法）
    //Element.classList 返回元素的所有class，用数组的方式
    _argumentsCheck = function(ele,haveCallback,nohaveCallback){
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
    };

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
            _argumentsCheck(ele,function(){
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
            _argumentsCheck(ele,function(){
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
            _argumentsCheck(ele,function(){
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
        extend : function(){
            var arr = arguments,
                result = {},
                i;

            if (!arr.length) return {};

            for (i = arr.length - 1; i >= 0; i--) {
                if (_isObject(arr[i])) {
                    _extend(arr[i], result);
                };
            }

            arr[0] = result;
            return result;
        }
    };
})();