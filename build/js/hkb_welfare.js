/**
 * Created by PC on 2018/2/1.
 */
var browser = {
    os: function () {
        var u = navigator.userAgent;
        return {// 操作系统
            linux: !!u.match(/\(X11;( U;)? Linux/i), // Linux
            windows: !!u.match(/Windows/i), // Windows
            android: !!u.match(/Android/i), // Android
            iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // iOS
        };
    }(),
    device: function () {
        var u = navigator.userAgent;
        return {// 设备
            mobile: !!u.match(/AppleWebKit/i), // mobile
            iPhone: !!u.match(/iPhone/i), // iPhone
            iPad: !!u.match(/iPad/i), // iPad
        };
    }(),
    supplier: function () {
        var u = navigator.userAgent;
        return {// 浏览器类型
            qq: !!u.match(/QQ\/\d+/i), // QQ
            wechat: !!u.match(/MicroMessenger/i), // WeChat
            weixin: u.match(/MicroMessenger/i) == 'MicroMessenger',
            ios: u.indexOf('_JFiOS') > -1,
            android: u.indexOf('_jfAndroid') > -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        };

    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),

    androidVersion: function () {//判断安卓版本
        var userAgent = navigator.userAgent;
        var index = userAgent.indexOf("Android")
        if (index >= 0) {
            return parseFloat(userAgent.slice(index + 8));

        }
    }(),

    IosVersion:function () {//ios版本
        var str= navigator.userAgent.toLowerCase();
        var ver=str.match(/cpu iphone os (.*?) like mac os/);
        if(!ver){

            return -1;

        }else{

            return ver[1].replace(/_/g,".");
        }
    }()
    //browser.supplier.wechat
};

var windowBanEvent = {

    bundling: function () {

        var _self = this;
        //$(window).bind('click touchstart touchmove touchend ', _self.Canceling);//绑定禁止事件

        var allEvent = ['click', 'touchstart', 'touchmove', 'touchend'];

        for (var i = 0; i < allEvent.length; i++) {

            document.body.addEventListener(allEvent[i], _self.Canceling, false);

            addEventListener(allEvent[i], _self.Canceling, false)

        }

    },

    unbundling: function () {

        var _self = this;

        var allEvent = ['click', 'touchstart', 'touchmove', 'touchend'];

        for (var i = 0; i < allEvent.length; i++) {

            document.body.removeEventListener(allEvent[i], _self.Canceling, false);

            removeEventListener(allEvent[i], _self.Canceling, false)

        }

        //$(window).unbind('click touchstart touchmove touchend ', _self.Canceling);//解除绑定事件


    },

    Canceling: function (evt) {

        var evt = evt || window.event; //阻止事件

        if (evt.preventDefault) {

            evt.preventDefault();

            evt.stopPropagation();

        }
        else {

            evt.returnValue = false;

            evt.cancelBubble = true;

        }

    }

};



/*嘉福平台UI通用JS*/
/*包括轻量级提示，loading,弹出框等等*/
var jfShowTips = {

    //弱提示toast出现的方法
    //谯丹
    //2017.1.17
    toastShow: function (details) {

        var _this = this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        var thisText = details.text || 'null';

        var thisInnerHtml = '<span>' + thisText + '</span>';//插入元素的主题内容

        _this.toastRemove();//插入元素前，先删除一次，防止多次添加

        var className='';


        if(browser.os.iOS){//如果当前是IOS系统

            var thisActiveEle=document.activeElement;//当前获取焦点的元素

            if(thisActiveEle.tagName=='INPUT') {//如果当前元素是input

                var thisActiveEleType=thisActiveEle.getAttribute('type');//获取当前元素的type属性

                var inputType=['checkbox','radio','button','image','range','reset','submit','week'];//定义type类型不会发生变化的数组

                if(inputType.indexOf(thisActiveEleType)==-1){//如果当前type类型不存在，则添加Class

                    className='tip_input';
                }

            }

        }

        var thisAddToast = this.addNode('div', thisInnerHtml, 'tip_toast',className);//添加元素

        setTimeout(function () {//延迟2s后，自动删除

            _this.remove(thisAddToast)

        }, 2000);

    },

    //弱提示toast删除的方法
    //谯丹
    //2017.1.17
    toastRemove: function () {

        if (document.getElementById('tip_toast')) {//删除之前，先判断当前元素是否存在

            this.remove(document.getElementById('tip_toast'))

        }

    },


    //loading方法
    //陈羽翔
    //2017.2.3
    loadingShow:function (details) {

        var _this=this;

        if(!details){//为空时初始化数据
            details={};
        }

        windowBanEvent.bundling();//页面禁止事件

        _this.loadingRemove();//先删除页面上loading元素

        var thisText = details.text || 'LOADING..';//初始值

        var overtimeFn= details.overtimeFn || function () {

                _this.toastShow({'text':'等待超时'})

            };

        var thisInnerHtml='<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div><i>'+thisText+'</i>';//html内容

        _this.addBlur();

        var thisBg=_this.addBg('loading_bg');

        var thisAddEle=_this.addNode('div',thisInnerHtml,'tip_loading');//增加节点

        document.activeElement.blur();//页面控件失焦

        thisAddEle.focus();//loading元素获得焦点

        setTimeout(function () {

            if(thisAddEle){

                overtimeFn();

                _this.remove(thisAddEle);//删除该元素

                windowBanEvent.unbundling();//解绑页面禁止事件

                _this.removeBlur();

                _this.transitionEndFn(thisBg,function () {

                    _this.removeBg('loading_bg');

                });

                thisBg.style.opacity='0';

            }

        },10000);//30秒



    },

    //loading删除方法
    //陈羽翔
    //2017.2.3
    loadingRemove:function () {//卸载loading

        var _this=this;

        if (document.getElementById('tip_loading')) {//删除之前，先判断当前元素是否存在

            windowBanEvent.unbundling();//解绑页面禁止事件

            _this.remove(document.getElementById('tip_loading'))//删除该元素

            _this.removeBlur();

            _this.removeBg('loading_bg');

        }

    },
    //新建元素的方法
    addNode: function (tag, innerHtml, id, className) {

        var obj = document.createElement(tag);

        if (id) {

            obj.id = id;

        }

        if(className){

            obj.className=className

        }

        obj.innerHTML = innerHtml;

        document.body.appendChild(obj);

        return obj;


    },


    //模糊增加方法
    //陈羽翔
    //2017.2.4
    addBlur:function () {
        /*
         var thisEle=this.returnAllBodyChildNode();

         var addClass='';

         if(browser.os.iOS){

         addClass=' body_blur_transition_ios';

         }
         else{

         addClass=' body_blur_transition_other';

         }

         for(var i=0;i<thisEle.length;i++){

         thisEle[i].className+=addClass;
         }
         */
    },

    removeBlur:function () {
        /*
         var addClass='';

         if(browser.os.iOS){

         addClass='body_blur_transition_ios';

         }
         else{

         addClass='body_blur_transition_other';

         }

         var thisEle=document.getElementsByClassName(addClass);

         for(var i=thisEle.length-1;i>=0;i--){

         thisEle[i].className=thisEle[i].className.replace(addClass,'');
         }
         */
    },

    dialogShow:function (details) {

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        var mainText = details.mainText || 'null';

        var minText = details.minText || 'null';

        var hasCheck = details.noCheck|| false;

        var hasCancel = details.noCancel || false;

        var checkFn = details.checkFn || null;

        var checkBtnText=details.checkBtnText ||'确认';

        var cancleBtnText=details.cancleBtnText ||'取消';

        var checkthisUrl=details.thisUrl||'javascript:void(0)';

        var canclethisUrl=details.cancelUrl||'javascript:void(0)';


        var _this=this;

        _this.addBlur();

        var thisBg=_this.addBg('dialog_bg');

        var thisInnerHtml='<div class="text_dialog_container"><div class="text_big">'+mainText+'</div><div class="text_small">'+minText+'</div><div class="dialog_button">';

        if(!hasCheck){

            thisInnerHtml+='<a class="dialog_check" href='+ checkthisUrl+'>'+checkBtnText+'</a>'

        }

        if(!hasCancel){

            thisInnerHtml+='<a class="dialog_cancel" href='+canclethisUrl+'>'+cancleBtnText+'</a>'

        }

        thisInnerHtml+='</div></div>';

        var thisAddDialog = _this.addNode('div', thisInnerHtml, 'tip_dialog');//添加元素


        if(thisAddDialog.getElementsByClassName('dialog_cancel')[0]) {

            thisAddDialog.getElementsByClassName('dialog_cancel')[0].addEventListener('click', _this.dialogRemove.bind(_this), false);

        }
        if(checkFn) {

            thisAddDialog.getElementsByClassName('dialog_check')[0].addEventListener('click',checkFn,false);

        }


    },

    dialogRemove:function () {

        var _this=this;

        var thisDialogEle= document.getElementById('tip_dialog');

        _this.removeBlur();

        thisDialogEle.style.opacity='0';
        _this.settimeoutFn(function(){

            _this.remove(thisDialogEle);//删除该元素

        })


        var thisBgEle=document.getElementById('dialog_bg');


        _this.settimeoutFn(function(){

            _this.removeBg('dialog_bg');//删除背景
        })


        thisBgEle.style.opacity='0';

    },

    //增加背景
    //陈羽翔
    //2017.2.4
    addBg:function (thisId) {

        var _this=this;

        _this.removeBg();

        return _this.addNode('div','',thisId,'tip_bg');//增加节点

    },

    removeBg:function (thisId) {

        if(document.getElementById(thisId)){

            // document.getElementById(thisId).click();

            this.remove(document.getElementById(thisId));

        }

    },

    //自动删除的方法
    remove: function (_element) {

        var _parentElement = _element.parentNode;//找到父元素，然后删除

        if (_parentElement) {

            _parentElement.removeChild(_element);

        }

    },

    //批量增加平滑过渡后监听方法
    transitionEndFn:function (thisEle,myFn) {

        thisEle.addEventListener("webkitTransitionEnd", myFn);

        thisEle.addEventListener("transitionend", myFn);




    },

    settimeoutFn:function(myFn){

        setTimeout(myFn,500);

    }

};

/*通用UIjs结束*/

var bankCard={

    actionCard:function () {

        var showDeltet=document.getElementsByClassName('bank_card_plate'); //点击银行卡

        var hideDelete=document.getElementsByClassName('hide_btn'); //点击取消

        //点击银行卡显示
        for (var i=0;i<showDeltet.length;i++) {

            showDeltet[i].addEventListener('click',function () {

                var showHide=this.parentNode;

                showHide.className = 'bank_card_main none_card_btn';

                var cardDiv=document.getElementsByClassName('bank_card_main'); //共有的父级元素

                for (var i=0;i<cardDiv.length;i++) {

                    //所有的父级元素循环，只要有显示的先隐藏，再显示当前点击的
                    if (cardDiv[i].className.indexOf('none_card_btn')>-1) {

                        cardDiv[i].className = 'bank_card_main';

                        showHide.className = 'bank_card_main none_card_btn';

                    }

                }

            },false)

        }

        //点击取消隐藏
        for (var i=0;i<hideDelete.length;i++) {

            hideDelete[i].addEventListener('click',function () {

                var hideShow=this.parentNode.parentNode;

                hideShow.className = 'bank_card_main';

            },false)

        }

    }

}
//点击展开，收起
var hideDetail= {

    blockDetail:function () {

        var clickThings = document.getElementsByClassName('list_text');

        var closeDetail = document.getElementsByClassName('list_line');

        for (var i=0;i<clickThings.length;i++) {

            clickThings[i].addEventListener('click',function () {

                var thisEle=this;

                var rightIndex = test();

                function test() {

                    for (var j=0;j<clickThings.length;j++) {

                        if (thisEle==clickThings[j]) {

                            return j;
                        }

                    }

                }


                if (document.getElementsByClassName('block_claims_things_detail')[0]) { //自己有这个样式的时候显示

                    if (closeDetail[rightIndex].className.indexOf('block_claims_things_detail')>-1){

                        //closeDetail[rightIndex].className = 'list_line';

                        document.getElementsByClassName('block_claims_things_detail')[0].className=document.getElementsByClassName('block_claims_things_detail')[0].className.replace('block_claims_things_detail','');//自己移除这个样式不显示

                    }else {

                        document.getElementsByClassName('block_claims_things_detail')[0].className=document.getElementsByClassName('block_claims_things_detail')[0].className.replace('block_claims_things_detail','');//移除自己这个样式不显示

                        closeDetail[rightIndex].className = 'list_line block_claims_things_detail';//当前点击的事件增加这个样式显示

                    }


                }else {

                    closeDetail[rightIndex].className = 'list_line block_claims_things_detail';//加载时没有的时候，自己增加这个样式显示

                }

                var rightIcon = icon();

                function icon() {

                    for (var j=0;j<clickThings.length;j++) {

                        if (thisEle==clickThings[j]) {

                            return j;
                        }

                    }

                }

                if (document.getElementsByClassName('list_text_r')[0]) { //自己有这个样式的时候显示

                    if (clickThings[rightIcon].className.indexOf('list_text_r')>-1){

                        //clickThings[rightIcon].className = 'list_text';//当前点击的事件增加这个样式显示

                        document.getElementsByClassName('list_text_r')[0].className=document.getElementsByClassName('list_text_r')[0].className.replace('list_text_r','');//自己移除这个样式不显示

                    }else {

                        document.getElementsByClassName('list_text_r')[0].className=document.getElementsByClassName('list_text_r')[0].className.replace('list_text_r','');//移除自己这个样式不显示

                        clickThings[rightIcon].className = 'list_text list_text_r';//当前点击的事件增加这个样式显示

                    }


                }else {

                    clickThings[rightIcon].className = 'list_text list_text_r';//加载时没有的时候，自己增加这个样式显示

                }




            },false)

        }

    }

}

//同意服务协议
function checkedService() {

    //window.onload=function () {

    // document.getElementsByClassName('bottom_btn')[0].className = 'bottom_btn gray_button_background';

    var clickText=document.getElementsByClassName('agreement')[0].getElementsByTagName('label')[0];

    clickText.addEventListener('click',function () {

        var checkedBorrow=document.getElementsByClassName('tate_y')[0];

        if (checkedBorrow.checked ==true) {

            document.getElementsByClassName('gray_check_buy')[0].className = 'gray_check_buy check_buy';

        }else {

            document.getElementsByClassName('gray_check_buy')[0].className = 'gray_check_buy ';

        }
    },false)

    // }

}

//------购物车加减按钮

var jfProductDetails = {

    volumeChange: function (isProduct) {  //如果是详情页的话为true，不是的话为false

        var volumeBox = document.getElementsByClassName('volume_btn');

        var lastScrollTop;

        for (var i = 0; i < volumeBox.length; i++) {   //找到当前的父元素

            volumeBox[i].getElementsByClassName('reduce')[0].addEventListener('touchstart', reduceEle, false);          //对 加&减

            volumeBox[i].getElementsByClassName('add')[0].addEventListener('touchstart', reduceEle, false);

            volumeBox[i].getElementsByClassName('volume_input')[0].addEventListener('blur', valueOne, false);          //对 加&减

            if (browser.os.iOS && isProduct) {

                var inputEle = volumeBox[i].getElementsByClassName('volume_input')[0];

                inputEle.addEventListener('focus', focusScrollPosition, false);

                inputEle.addEventListener('blur', blurScrollPosition, false);
            }
            /*            else {

                            var inputEle = volumeBox[i].getElementsByClassName('volume_input')[0];

                            inputEle.addEventListener('focus', focusAndroidTab, false);

                            inputEle.addEventListener('blur', blurAndroidTab, false);



                        }*/

        }

        function focusAndroidTab() {

            document.getElementById('settlementTab').style.display = 'none';

            document.getElementById('deleteTab').style.display = 'none';

            document.getElementsByClassName('bottom_tabbar')[0].style.display = 'none'


        }

        function blurAndroidTab() {

            document.getElementById('settlementTab').style.display = '';

            document.getElementById('deleteTab').style.display = '';

            document.getElementsByClassName('bottom_tabbar')[0].style.display = ''

        }

        function reduceEle() {


            var eleInput = this.parentNode.getElementsByClassName('volume_input')[0];

            var thisValue = parseInt(eleInput.value);

            if (this.className.indexOf('reduce') > -1) {


                eleInput.value = changeValue(thisValue - 1);


            }
            else {

                eleInput.value = changeValue(thisValue + 1);

            }


        }

        function changeValue(num) { //循环 小于等于1的时候永远为1，反之为他本身的值


            if (num <= 1 || !num) {

                return 1;
            }
            else {

                return num;
            }

        }


        function blurScrollPosition() {

            window.scrollTo(0, lastScrollTop);

            valueOne();


        }

        function valueOne() {

            this.value = changeValue(this.value); //如果输入的内容为0或者空时,value为1

        }

        function focusScrollPosition() {

            lastScrollTop = document.body.scrollTop;

            setTimeout(function () {

                window.scrollTo(0, document.body.scrollHeight);

            }, 300)

        }


    },

    //sku选择

  /*
        skuBoxChange: function () {

        var skuBox = document.getElementById('main_sku').getElementsByClassName('sku_contain');

        for (var i = 0; i < skuBox.length; i++) {

            jfProductDetails.clickTabChange(skuBox[i], 'choose_tab', 'sku_box');
        }

    },

    */

    //------点击切换class

    clickTabChange: function (fatherEle, changeClass, className) {


        var allEle = fatherEle.getElementsByClassName(className);


        for (var i = 0; i < allEle.length; i++) {

            allEle[i].addEventListener('click', function () {

                fatherEle.getElementsByClassName(changeClass)[0].className = fatherEle.getElementsByClassName(changeClass)[0].className.replace(changeClass, '');

                this.className += ' ' + changeClass;

            }, false);

        }


    },

}


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

/**
 * Created by PC on 2017/12/5.
 */
/**
 * Created by Administrator on 2017/6/7.
 */
var shoppingCart = {

    changeX:1,

    changeY:1,
    /*加载方法*/
    xhr: function (details) {

        var _this = this;

        var api = details.api || 0;

        var type = details.type || 'get';

        var xhr = function () {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                return new ActiveObject('Micrsorf.XMLHttp');
            }
        }();

        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 0 :
                    // console.log(0, '未初始化....');
                    break;
                case 1 :
                    /*console.log(1, '请求参数已准备，尚未发送请求...');*/
                    break;
                case 2 :
                    /*console.log(2, '已经发送请求,尚未接收响应');*/
                    break;
                case 3 :
                    /*console.log(3, '正在接受部分响应.....');*/
                    break;
                case 4 :
                    /*console.log(4, '响应全部接受完毕');*/
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                        _this.fn(xhr.responseText,details)

                    }

                    else {

                        console.log('读取失败');

                    }
                    break;
            }
        };

        xhr.open(type, api);

        xhr.send(null);

    },

    run: function (details) {

        this.xhr(details);

        this.changeClass(details)

    },

    //切换样式名称
    changeClass: function () {

        var allEle = document.getElementById('jd_address_select');

        var firstEle = allEle.getElementsByClassName('top_address')[0].getElementsByTagName('div');

        if(allEle.getElementsByClassName('show')[0]){

            clearClass(1)
        }

        firstEle[0].innerHTML='请选择';

        if(firstEle[0].className.indexOf('show')==-1) {

            firstEle[0].className = 'show';

        }

        if(allEle.getElementsByClassName('address')[0].className.indexOf('show')==-1) {

            allEle.getElementsByClassName('address')[0].className += ' show';

        }

        if(this.changeX) {

            for (var i = 0; i < firstEle.length; i++) {

                firstEle[i].addEventListener('click', clickEle, false)

            }

            this.changeX=0;

        }

        function clickEle() {

            clearClass(2);

            for (var j = 0; j < firstEle.length; j++) {

                if (this == firstEle[j]) {

                    break

                }

            }

            this.className = 'show';

            allEle.getElementsByClassName('address')[j].className += ' show';


        }

        function clearClass(num) {

            for (var i = 0; i < num; i++) {

                allEle.getElementsByClassName('show')[0].className = allEle.getElementsByClassName('show')[0].className.replace('show', '');

            }

        }

    },

    /*渲染地址列表*/
    fn: function (thisJson,details) {

        var thisWrightHtml = details.targetDom;

        var thisFn = details.fn;

        var ele = document.getElementById('jd_address_select');

        var data = JSON.parse(thisJson).data;

        var tabCity = ele.getElementsByClassName('top_address')[0].getElementsByTagName('div');

        for(var i=1;i<tabCity.length;i++){

            tabCity[i].innerHTML=""

        }

        addLi(ele.getElementsByClassName('address')[0], data);

        function addLi(faEle, allData) {

            var thisDomH = '<p data-li="';

            var thisDomM = '">';

            var thisDomB = '</p>';

            var writeDom = '';


            for (var i = 0; i < allData.length; i++) {

                writeDom += thisDomH + i + thisDomM + allData[i].name + thisDomB

            }

            faEle.innerHTML = writeDom;

            var allP = faEle.getElementsByTagName('p');

            for (var j = 0; j < allP.length; j++) {

                allP[j].addEventListener('click', clickFn, false)

            }

        }

        /*每个元素点击事件*/
        function clickFn() {

            if (this.parentNode.getElementsByClassName('p_show')[0]) {

                this.parentNode.getElementsByClassName('p_show')[0].removeAttribute('class');

            }

            this.className = 'p_show'

        }


        var allTab = ele.getElementsByClassName('address');

        if(this.changeY) {

            for (var i = 0; i < allTab.length; i++) {

                allTab[i].addEventListener('click', fatherEleClick)

            }

            this.changeY=0;

        }

        var allCityPoint = [];

        var thisCityAll = [];

        //chooseAdressId=[];

        /*每个父切换元素*/
        function fatherEleClick(evt) {

            if (this.className.indexOf('show') > -1) {

                for (var j = 0; j < allTab.length; j++) {

                    if (this == allTab[j]) {

                        break

                    }

                }

                /*渲染下一个列表*/

                var thisNum = evt.target.getAttribute('data-li');

                allCityPoint[j] = thisNum;

                allCityPoint=allCityPoint.slice(0,j+1);

                var thisData = data;

                var thisCity;

                for (var z = 0; z <= j; z++) {

                    thisCity = thisData[allCityPoint[z]];

                    thisData = thisCity.child;

                    if(!thisData)break

                }



                /*修改tab*/

                var tabCity = ele.getElementsByClassName('top_address')[0].getElementsByTagName('div');

                thisCityAll[j] = thisCity.name;

                thisCityAll=thisCityAll.slice(0,j+1);

                tabCity[j].innerHTML = thisCity.name;

                tabCity[j].removeAttribute('class');


                if (thisData) {

                    tabCity[j + 1].innerHTML = '请选择';

                    tabCity[j + 1].className = 'show';

                    allTab[j + 1].className += ' show';

                    this.className = this.className.replace(' show', '');

                    addLi(allTab[j + 1], thisData);

                }

                else {

                    var thisInnerHtml='';

                    for (var x = 0; x < thisCityAll.length; x++) {

                        thisInnerHtml += thisCityAll[x];

                        if(x!=thisCityAll.length-1) {

                            thisInnerHtml += ','

                        }



                    }

                    thisWrightHtml.innerHTML=thisInnerHtml;


                    chooseAdressId=(function(){


                        var allNum=[];

                        var thisData=data;


                        for(var i=0;i<allCityPoint.length;i++) {

                            allNum[i]=thisData[allCityPoint[i]].id;

                            thisData=thisData[allCityPoint[i]].child;

                        }

                        return allNum;

                        //地址数据data;


                    })();


                    setTimeout(function () {

                        thisFn();




                    },300)



                }
                //切换tab


            }

        }

    },


};



/**
 * Created by PC on 2017/12/5.
 */

var jfShowPop = function (details) {

    if(!details){

        details ={}

    }

    this.details = details;

    var thisEle = document.getElementById(this.details.ele);

    //var thisfatherEle = this.details.fatherId || 0;

    var thishasScrollEle = this.details.scrollClassname || 0;


    thisEle.getElementsByClassName('pop_cancel')[0].addEventListener('click', clickEven.bind(this), false);

    thisEle.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('click', clickEven.bind(this), false);


    if(thishasScrollEle){

        clickThought(thishasScrollEle);

    }


    function clickThought(thishasScrollEle) {


        var thisScrollEle = thisEle.getElementsByClassName(thishasScrollEle)[0];

        var thisVolum = thisEle.getElementsByClassName('sku_volume_purchased')[0];

        var popTop = thisEle.getElementsByClassName('pop_top')[0];

        var thisAddress = thisEle.getElementsByClassName('top_address')[0];

        var startY, endY, distance;//开始距离、移动距离

        thisScrollEle.addEventListener('touchstart', touchStartEle, false);

        thisScrollEle.addEventListener('touchmove', reachEdge, false);


        //如果有这个元素 就绑定禁止事件
        if(thisVolum){

            thisVolum.addEventListener('touchmove',windowBanEvent.Canceling,false);
        }

        if(thisAddress){

            thisAddress.addEventListener('touchmove',windowBanEvent.Canceling,false);

        }

        popTop.addEventListener('touchmove',windowBanEvent.Canceling,false);

        //thisScrollEle.addEventListener('touchmove', reachEdge, false);


        function touchStartEle(e) {

            //touchstart 获取位置startY

            startY = e.touches[0].pageY;

        }


        function reachEdge(event) {

            var _this = this;

            var eleScrollHeight = _this.scrollTop;//获取滚动条的位置 206

            var eleHeight = _this.scrollHeight;//元素实际高度 506

            var containerHeight = _this.offsetHeight;//容器高度 300

            var eleClientHeight = _this.clientHeight ;//可视区域的高度 243

            //console.log(eleClientHeight);

            //touchmove 获取位置 endY

            endY = event.touches[0].pageY;

            //两者之减的距离用来判断是向上活动还是向下滑动
            distance = startY - endY;

            //此时touchmove的值等于touchstart的值 循环
            endY = startY;

            //如果滚动条不存在  禁止事件

            if(Math.abs(parseFloat(eleHeight)- parseFloat(eleClientHeight) )<3){

                event.preventDefault()

            }

            //滚动条到达底部

            if (Math.abs(parseFloat(eleHeight) - parseFloat(eleScrollHeight + containerHeight)) <= 2) {


                //如果距离为正数 则向上滑动是 禁止浏览器事件

                if (distance > 0) {

                    event.preventDefault();


                }

            }

            else if (Math.abs(parseFloat(eleScrollHeight)) == 0) {

                //如果距离为负数 则向下滑动

                if (distance < 0) {

                    event.preventDefault();

                }


            }



        }


    }

    function clickEven() {

        this.hide();

    }

    /*this.ban=function (e) {

     window.event? window.event.cancelBubble = true : e.stopPropagation();//阻止冒泡

     };*/

    if(thisEle.getElementsByClassName('jf_pop_up_bg')[0]) {

        if(browser.os.android){

            thisEle.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('touchmove',windowBanEvent.Canceling,false);



        }
        else {

            addEvent(thisEle.getElementsByClassName('jf_pop_up_bg')[0]);
        }



    }

    // if(thisEle.getElementsByClassName('pop_top')[0]) {
    //
    //     addEvent(thisEle.getElementsByClassName('pop_top')[0]);
    //
    // }


    function addEvent(ele) {

        var allEvent=['touchstart','touchmove','touchend'];

        for(var i=0;i<allEvent.length;i++) {

            ele.addEventListener(allEvent[i],eventBan,false)

        }

    }

    function eventBan(e) {

        // window.event? window.event.cancelBubble = true : e.stopPropagation();

        window.event ? window.event.returnValue = false : e.preventDefault();


    }

};

jfShowPop.prototype.show = function (details) {


    if(details){

        details.fn();

    }


    /* this.ban();*/

    /*document.body.addEventListener('touchmove', this.ban, true);*/

    var thisEle = document.getElementById(this.details.ele);


    thisEle.style.display = 'block';

    /*document.getElementsByTagName("body")[0].className = "ovfHiden";//页面禁止滚动

     document.getElementsByTagName("html")[0].className = "ovfHiden";//页面禁止滚动*/

    setTimeout(function () {

        if (thisEle.className.indexOf('show') == -1) {

            thisEle.className += ' show'

        }

    }, 1);

    document.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('touchmove',windowBanEvent.Canceling,false);//给阴影绑定冒泡事件


};

jfShowPop.prototype.hide = function () {

    var thisEle = document.getElementById(this.details.ele);

    /*document.body.removeEventListener('touchmove', this.ban, true);*/


    if (thisEle.className.indexOf('show') > -1) {


        transitionMove(thisEle);

        thisEle.className = thisEle.className.replace(' show', '')

    }

    windowBanEvent.unbundling();//解绑页面禁止事件

    /*document.getElementsByTagName("body")[0].className = "";//页面禁止滚动

     document.getElementsByTagName("html")[0].className = "";//页面禁止滚动*/



    function transitionMove(ele) {

        // Safari 3.1 到 6.0 代码
        ele.addEventListener("webkitTransitionEnd", MFunction);
        // 标准语法
        ele.addEventListener("transitionend", MFunction);

        function MFunction() {

            ele.style.display = 'none';
            // Safari 3.1 到 6.0 代码
            ele.removeEventListener("webkitTransitionEnd", MFunction);
            // 标准语法
            ele.removeEventListener("transitionend", MFunction);


        }


    }


};