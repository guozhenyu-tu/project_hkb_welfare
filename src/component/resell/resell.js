var jfFrameDrag = {

    dragEleshow: function (details) {/*出现方法*/

        var _this = this;

        _this.moveDistance = details.moveDistance || 0;//向上移动的距离

        _this.initDistance=details.initDistance || '100%';//初始状态的位置,默认向上-100%或者向下移动100%

        _this.targetButton=details.targetButton || 0;//点击的目标元素。ID选择器

        _this.targetDragName = details.targetDragName || 0;//出现的目标元素；calss选择器

        _this.hideButton = details.hideButton || 'check_btn';//关闭的按钮,class选择器

        _this.showFn = details.showFn || 0;//同时出现的函数

        _this.hideFn = details.hideFn || 0;//同时关闭的函数




        var $main = document.getElementsByClassName('frame-main')[0];//主体

        var $drag = document.getElementsByClassName('mask_drag')[0];//阴影


        if (_this.targetDragName) {//如果当前页面有多个上拉框，则选择器需要的哪个

            var $main = document.getElementsByClassName(_this.targetDragName)[0].getElementsByClassName('frame-main')[0];//主体

            var $drag = document.getElementsByClassName(_this.targetDragName)[0].getElementsByClassName('mask_drag')[0]; //阴影

        }

        /*出现的方法*/
        _this.run=function(){


            if ($main.style.display = "none") {//如果为隐藏，下拉框收起中

                document.getElementsByTagName("body")[0].className = "ovfHiden";//页面禁止滚动
                document.getElementsByTagName("html")[0].className = "ovfHiden";//页面禁止滚动

                $drag.style.display = "block";
                $main.style.display = 'block';

                setTimeout(function () {

                    $drag.style.opacity = "0.6";

                    $main.style.transform = "translate3d(0," + _this.moveDistance + ",0)";//到指定展现位置
                    $main.style.webkitTransform = "translate3d(0," + _this.moveDistance + ",0)";


                }, 10);


                if (_this.showFn) {
                    _this.showFn(); //执行 弹出时加入的函数参数
                }

            }

        };
        /*出现的方法*/
        _this.stop=function(){

            if ($main.style.display = "block") {

                $main.style.transform = "translate3d(0,"+ _this.initDistance + ",0)";//到达平滑过渡开始位置
                $main.style.webkitTransform = "translate3d(0,"+ _this.initDistance + ",0)";

                //阴影透明度变化之后再发生效果
                $drag.style.opacity = "0";


                document.getElementsByTagName("body")[0].className = "";//页面可以滚动
                document.getElementsByTagName("html")[0].className = "";//页面可以滚动


                if (_this.hideFn) {
                    _this.hideFn(); //执行 关闭时加入的函数参数
                }

            }

            $drag.addEventListener('webkitTransitionEnd', opacityChange, false);
            $drag.addEventListener('transitionend', opacityChange, false);

            function opacityChange() {

                $drag.style.display = "none";

                $drag.removeEventListener('webkitTransitionEnd', opacityChange, false);
                $drag.removeEventListener('transitionend', opacityChange, false); //取消平滑过渡后的绑定事件

            } //事件解绑


            $main.addEventListener('webkitTransitionEnd', listChange, false);
            $main.addEventListener('transitionend', listChange, false); //主体的过渡事件


            function listChange() {

                $main.style.display = "none";

                $main.removeEventListener('webkitTransitionEnd', listChange, false);
                $main.removeEventListener('transitionend', listChange, false); //事件解绑

            }
        };


        if(_this.targetButton){//如果点击元素存在
            /*目标按钮点击出现*/
            document.getElementById(_this.targetButton).onclick=function(){

                _this.run();
            };
        }



        /*阴影点击关闭*/
        $drag.addEventListener("click",function(){
            _this.stop()
        },false);

        /*关闭按钮点击关闭*/
        $main.getElementsByClassName( _this.hideButton)[0].onclick=function(){
            _this.stop()
        }
    }

};
