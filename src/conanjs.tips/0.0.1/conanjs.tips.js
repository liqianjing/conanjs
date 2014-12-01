/**
 * 信息提示（tips/toast）
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-11-23
 * @version     0.0.1
 *
 * @depend      conanjs.base.js
 */
(function(){
    var $B = CONANJS.base;
    //定义默认的参数
    var param  = {
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
    },
    HIDE = 'hidding';

    //option 为要传入的配置参数
    function Toast(option){

        CONANJS.base.extend(this,param,option);

        /**
         *  显示窗口
         */
        this.show = function(){
            $B.removeClass(this.target,HIDE);
        };

        /**
         *  隐藏窗口
         */
        this.hide = function(){
            $B.addClass(this.target,HIDE);
        };

        /**
         *  替换提示窗口的内容
         *
         *  @type   {String}
         */
        this.reload = function(content){
            this.target.innerText = content;
        };

        //解析参数,初始化提示窗口
        domReader(this);
    }
    //这个方法用来控制提示窗口的显示与隐藏
    function showOrHide(tar,display,content){

        if(display === 'show'){
            tar.innerText = content;
            $B.removeClass(tar,HIDE);
        }else if(display === 'hide'){
            tar.innerText = '';
            $B.addClass(tar,HIDE);
        }

    }
    function domReader(paramObj){
        //所有的参数已经ok
        var target = paramObj.target,
            hideStr = 'hide',
            showStr = 'show';
        //是否为弹窗
        if(paramObj.isPopup){

            // updata 2014-12-01 把js修改css属性的部分抽离出来，用一个class来控制

            $B.addClass(target,'pop');
        }

        //以下是是否带有关闭按钮的处理
        if(paramObj.isCloseIcon){ //如果需要关闭按钮
            var closeBtn = document.createElement('span');
            $B.addClass(closeBtn,'conanjs-tips-close');
            target.appendChild(closeBtn);

            closeBtn.onclick = function(){
                showOrHide(target,hideStr);
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
            showOrHide(target,showStr,paramObj.content);

            //一段时间后消失
            time = setTimeout(function(){
                showOrHide(target,hideStr);
            },paramObj.spacing);

        }else { //如果不需要默认消失的操作
            showOrHide(target,showStr,paramObj.content);
        }

    }
    CONANJS.tips = Toast;
})();