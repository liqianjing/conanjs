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
    //这个方法为内部函数，用来克隆一个对象
    var _cloneObj = function(oldObj) { //复制对象方法
        if (typeof(oldObj) !== 'object' || oldObj === null) {
            return oldObj;
        };

        var newObj = new Object();
        for (var i in oldObj){
            newObj[i] = _cloneObj(oldObj[i]);
        }
        return newObj;
    },
    //这个方法为内部函数，用来合并多个对象
    _extendObj = function(){
        var args = arguments;
        if (args.length < 2) return;
        var temp = _cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    },
    //这个方法是所有的class操作的公共部分（抽出的公共方法）
    _publicPart = function(ele,haveCallback,nohaveCallback){
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

    //dom 查找
    var domFind = {
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
        }
    };


    //这个对象里面包含对class的操作，添加/删除/判断是否含有
    var classOperating = {
        /**
         * addClass方法用来添加class
         *
         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
         *
         * @description 如果传入的参数有误会直接返回，如果传入的class已经存在也会直接返回，只有dom元素正确，className为‘string’的时候才会加上class
         */
        addClass : function(target,className){
            //把参数存储起来，传给publicPart
            var ele = arguments;

            //调用方法
            _publicPart(ele,function(){
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
         */
        removeClass : function(target,className){
            var ele = arguments;
            _publicPart(ele,function(){
                target.classList.remove(className);
            },function(){
                return;
            });

        },
        /**
         * removeClass方法用来删除class
         *
         * @param     target（object） : 当前的操作对象；  className（string） ： 要添加或删除的class
         * @returns   {Boolean}
         * @description   如果传入的参数有误会直接返回，如果传入的class不存在也会直接返回，正常情况下会返回Boolean值
         */
        hasClass : function(target,className){

            var ele = arguments,
                result = false;
            _publicPart(ele,function(){
                result = true;
            });
            return result;
        }
    };

    //对象的合并
    var objExtend = {
        extendObj : function(){
            var args = arguments;
            if (args.length < 2) return;
            var temp = _cloneObj(args[0]); //调用复制对象方法
            for (var n = 1; n < args.length; n++) {
                for (var i in args[n]) {
                    temp[i] = args[n][i];
                }
            }
            return temp;
        }
    };

    win.CONANJS = {};
    CONANJS.base = _extendObj(classOperating,domFind,objExtend);
    //总结：
    //Element.classList 返回元素的所有class，用数组的方式
    //Element.classList.remove(""); 删除一个class
    //Element.classList.add(""); 添加一个class(可以用逗号分割添加多个)
    //Element.classList.toggle(""); 如果存在则移除它，否则添加它
    //Element.classList.contains("") 判断是否含有某一class
})();