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