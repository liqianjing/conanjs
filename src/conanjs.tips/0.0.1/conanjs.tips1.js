/**
 * 信息提示（tips）
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-11-23
 * @version     0.0.1
 *
 * @depend      conanjs.base.js
 */
(function(){

    var Global = {};
    //定义默认的参数
    Global.defaultParam  = {
        /**
         *  窗口对象
         *
         *  @type   {Object}
         */
        target : null,
        /**
         *  提示窗口是否弹出显示（支持弹窗和在页面里直接显示两种方式）,默认弹出
         *
         *  @type   {Boolean}
         */
        isPopup : false,
        /**
         *  提示窗口是否会定时自动消失，默认不消失
         *
         *  @type   {Boolean}
         */
        isDisappear : false,
        /**
         *  提示窗口的显示方式（支持show/hide; 弹跳）
         *
         *  @type   {String}
         */
        displayMode : 'default',
        /**
         *  是否需要关闭窗口的按钮
         *  注：如果需要关闭的按钮，会默认提供一个class = ‘conanjs-tips-close’的带有关闭功能的span添加到target后面,默认的是不需要
         *
         *  @type   {Boolean}
         */
        isCloseIcon : false,
        /**
         *  弹窗的内容(默认为空)
         *
         *  @type   {String}
         */
        content : '',
        /**
         *  弹窗的显示时间，默认为2000毫秒，只有isDisappear = true 时这个才会解析
         *
         *  @type   {Number}
         */
        spacing : 2000
    };
    Global.Methods = {
        show : function(target){
            target.style.display = 'block';
        },
        hide : function(target){
            target.style.display = 'none';
        },
        reload : function(par){
            par.target.innerText = par.newCont;
        }
    };

    //这个方法用来控制提示窗口的显示与隐藏
    var showOrHide = function(tar,display,content){

        if(display === 'show'){
            tar.innerText = content;
            tar.style.display = 'block';
        }else if(display === 'hide'){
            tar.innerText = '';
            tar.style.display = 'none';
        }

    },
    domReader = function(paramObj){

        var $B = CONANJS.base;

        //是否为弹窗
        if(paramObj.isPopup){
            paramObj.target.style.position = 'absolute';
            paramObj.target.style.background = '#000';
            paramObj.target.style.color = '#fff';
            paramObj.target.style.opacity = '0.8';
        }

        //以下是是否带有关闭按钮的处理
        if(paramObj.isCloseIcon){ //如果需要关闭按钮
            var closeBtn = document.createElement('span');
            $B.addClass(closeBtn,'conanjs-tips-close');
            paramObj.target.appendChild(closeBtn);

            closeBtn.onclick = function(){
                showOrHide(paramObj.target,'hide');
            };
        }


        //以下是消失与否的处理
        var time;
        if(paramObj.isDisappear){ //如果需要一段时间后消失

            //定时器操作
            if(time) {
                clearTimeout(time);
            }

            //显示提示窗口
            showOrHide(paramObj.target,'show',paramObj.content);
            //一段时间后消失
            time = setTimeout(function(){
                showOrHide(paramObj.target,'hide');
            },paramObj.spacing);

        }else { //如果不需要默认消失的操作
            showOrHide(paramObj.target,'show',paramObj.content);
        }

    };

    //入口函数
    function tips(param, options){
        param = param || {};

//        var $el = this,
//            el = $el[0];

        if(typeof param === 'string'){

            var result = Global.Methods[param] ? Global.Methods[param](options) : '';
            return result;
        }else{
            var opts = CONANJS.base.extend(Global.defaultParam, param);
            domReader(opts);
        }
    }

    CONANJS.tips = tips;
})();