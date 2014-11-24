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

    //option 为要传入的配置参数
    var ConanjsTips = function (option){

        //后面的为默认的参数

        var paramObj = {};

        /**
         *  窗口对象
         *
         *  @type   {Object}
         */
        paramObj.target = this.target = option.target || null;
        /**
         *  提示窗口是否弹出显示（支持弹窗和在页面里直接显示两种方式）,默认弹出
         *
         *  @type   {Boolean}
         */
        paramObj.isPopup = this.isPopup = option.isPopup || false;
        /**
         *  提示窗口是否会定时自动消失，默认不消失
         *
         *  @type   {Boolean}
         */
        paramObj.isDisappear = this.isDisappear = option.isDisappear || false;
        /**
         *  提示窗口的显示方式（支持show/hide; 弹跳）
         *
         *  @type   {String}
         */
        paramObj.displayMode = this.displayMode = option.displayMode || 'default';
        /**
         *  是否需要关闭窗口的按钮
         *  注：如果需要关闭的按钮，会默认提供一个class = ‘conanjs-tips-close’的带有关闭功能的span添加到target后面,默认的是不需要
         *
         *  @type   {Boolean}
         */
        paramObj.isCloseIcon = this.isCloseIcon = option.isCloseIcon || false;
        /**
         *  弹窗的内容(默认为空)
         *
         *  @type   {String}
         */
        paramObj.content = this.content = option.content || '';
        /**
         *  弹窗的显示时间，默认为2000毫秒，只有isDisappear = true 时这个才会解析
         *
         *  @type   {Number}
         */
        paramObj.spacing = this.spacing = option.spacing || 2000;

        /**
         *  显示窗口
         */
        this.show = function(){
            paramObj.target.style.display = 'block';
        };

        /**
         *  隐藏窗口
         */
        this.hide = function(){
            paramObj.target.style.display = 'none';
        };

        /**
         *  替换提示窗口的内容
         *
         *  @type   {String}
         */
        this.reload = function(content){
            paramObj.target.innerText = content;
        };

        //解析参数,初始化提示窗口
        domReader(paramObj);
    },
    //这个方法用来控制提示窗口的显示与隐藏
    showOrHide = function(tar,display,content){

        console.log(content);
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
        //所有的参数已经ok

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
    CONANJS.tips = ConanjsTips;
})();