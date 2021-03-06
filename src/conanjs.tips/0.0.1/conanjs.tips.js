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
    var $B = conanjs.dom,
        $TOOLS = conanjs.tools;
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
        content : null,
        /**
         *  弹窗的显示时间，默认为2000毫秒，只有isDisappear = true 时这个才会解析
         *
         *  @type   {Number}
         */
        spacing : 2000
    },
    HIDE = 'hidding',
    interface = null; //这个变量用来存储接口方法 {Object}

    function Tips(option){
        var tipsDepot = this.tips = {};

        //注意
        //所有的私有属性（不能被修改的部分）都必须要存储到this的一个私有属性里面
        //updata 2014-12-18

        $TOOLS.extend(tipsDepot,param,option);

        //解析参数,初始化提示窗口
        domReader(tipsDepot);
    }
    //接口
    interface = {

        /**
         *  控制窗口的显示和隐藏
         */
        tipsControl : function(){
            var tar = this.tips.target;
            if($B.hasClass(HIDE)){
                showOrHide(tar);
            }else {
                if(this.isDisappear){
                    //自动消失的
                    autoHide(this);
                }else {
                    showOrHide(tar);
                }
            }
        },

        /**
         *  替换提示窗口的内容
         *
         *  @type   {String}
         */
        reload : function(content){
            this.tips.target.innerText = content;
        }
    };

    //注意
    //xxx.prototype = {} 这种方式会改变他的指向，所以禁止使用
    //updata 2014-12-18

    $TOOLS.extend(Tips.prototype,interface);

    //这个方法用来控制提示窗口的显示与隐藏
    function showOrHide(tar){
        var control = 'addClass';
        if($B.hasClass(tar,HIDE)){
            control = 'removeClass';
        }
        $B[control](tar,HIDE);
    }
    //这个方法来控制定时器，自动消失
    function autoHide(paramObj,target){
        var time,
            target = target || paramObj.target;
        if(paramObj.isDisappear){ //如果需要一段时间后消失

            //定时器操作
            if(time) {
                clearTimeout(time);
            }

            //显示提示窗口
            $B.removeClass(target,HIDE);

            //一段时间后消失
            time = setTimeout(function(){
                showOrHide(target);
            },paramObj.spacing);

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
                showOrHide(target);
            };
        }

        autoHide(paramObj,target);
    }
    conanjs.tips = Tips;
})();