/**
 * 按钮控制模块
 *
 * @author      liqianjing(j935194120@gmail.com)
 * @version     2014-11-21
 * @version     0.0.1
 *
 * @depend      无
 * 本模块用来控制按钮的可点击与不可点击，通过一个class（disabled）来控制，使用原生js来编写故不依赖任何组建
 */
(function(){
    clickButton = function(){
        alert('aaaa');
    };
    CONANJS.button = clickButton;
})();