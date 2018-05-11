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