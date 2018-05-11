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