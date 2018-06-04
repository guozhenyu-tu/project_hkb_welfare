
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

