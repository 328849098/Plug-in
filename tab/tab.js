/**
 * Created by guohanshuang on 2017/7/18.
 */
(function (global) {
    var _INFO_ = {
        plug:"tab",
        version:"1.0.1",
        author:"guohanshuang"
    };
    var defaults={    //定义默认值
        oNodeID:'',          //存放插件的父级id
        boxStyle:'',  //tab的class
        aBtn:[],
        aBtnNode:'',      //按钮的节点:button 、span。不能是div。
        aBtnClass:'',      //按钮被激活的class
        aBox:[]    //显示内容
    };
    var PlugCode = function(option){  //定义插件
        var settings=Object.assign({},defaults,option);    //绑定默认值  浅拷贝

        var tabDOM=document.getElementById(settings.oNodeID); //获取tab
        tabDOM.className=settings.boxStyle;  //tab的class
        aBtnLength=settings.aBtn.length;     //获得按钮个数

        function addNode(node,type) {
            for(var i=0;i<aBtnLength;i++){   //创建子节点
                var aNode=new Array;
                aNode[i]=document.createElement(node);
                aNode[i].innerHTML=type[i];
                tabDOM.appendChild(aNode[i]);

            }
        }

        addNode(settings.aBtnNode,settings.aBtn); //添加按钮节点
        addNode('div',settings.aBox);             //添加div节点

        //创建按钮节点 和 div节点的解析
        /*for(var i=0;i<aBtnLength;i++){   //添加按钮节点
            var aBtnNode=new Array;
            aBtnNode[i]=document.createElement(settings.aBtnNode);
            aBtnNode[i].innerHTML=settings.aBtn[i];
            tabDOM.appendChild(aBtnNode[i]);

        }
        for(var i=0;i<aBtnLength;i++){  //添加div节点
            var aBox=new Array;
            aBox[i]=document.createElement('div');
            aBox[i].innerHTML=settings.aBox[i];
            tabDOM.appendChild(aBox[i]);

        }*/

        var btnDOM=tabDOM.getElementsByTagName(settings.aBtnNode);
        var boxDOM=tabDOM.getElementsByTagName('div');
        btnDOM[0].className=settings.aBtnClass;
        boxDOM[0].style.display='block';



        for(let i=0;i<aBtnLength;i++){

            if(boxDOM[i].innerHTML=='undefined'){
                boxDOM[i].innerHTML='还未定义';
            }

            btnDOM[i].onclick=function () {
                for(let i=0;i<aBtnLength;i++){
                    btnDOM[i].className='';
                    boxDOM[i].style.display='none';
                }
                this.className=settings.aBtnClass;
                boxDOM[i].style.display='block';
            };

        }

    };

    global[_INFO_.plug]=PlugCode;   //window使用


})(typeof window !=="undefined"?window:this);  //有的浏览器不兼容window