/**
 * Created by guohanshuang on 2017/7/14.
 */
/*
jquery的做法
-----------------------------------------------
(function ($) {
    var defaults={};
    $.fn.xxx=function(){    //定义插件
        $.extend({},defaults,options);  //绑定默认值
    }

})(jQuery);
 */
(function (global) {
    var _INFO_ = {
        plug:"musicPlay",
        version:"1.0.2",
        author:"guo"
    };
    var defaults={    //定义默认值
        audioUrl:'',      //地址
        nodeID:'',        //节点id
        boxStyle:'',      //css
        bottonSrc:'',     //自定义图标按钮
        htmls:`<audio autoplay loop style="width:0px;">
                    <source src="" type="audio/mpeg">
                </audio>
                <a style="width:50px;height:50px;display:block;float:left;"></a>
                <select style="vertical-align:top;height:30px;margin:10px 7px;">
                </select>
                `
    };
    var PlugCode = function(option){  //定义插件
        var settings=Object.assign({},defaults,option);    //绑定默认值  浅拷贝

        var audioDOM=document.getElementById(settings.nodeID); //获取节点
        if(!audioDOM){
            audioDOM=document.body;                   //判断如果节点为空，插入到body中
        }

        //$(document.body).append(settings.htmls);   //jquery 插入节点
        //$(settings.htmls).appendTo(document.body);   //jquery 插入节点
        var audioBox=document.createElement('div');
        audioBox.id="musiccontrol";
        audioBox.style="opacity:0.5;overflow:hidden;"+settings.boxStyle;  //boxStyle可以覆盖前面的
        audioBox.innerHTML=settings.htmls;
        audioDOM.appendChild(audioBox);


        var audioBotton=audioBox.querySelectorAll("a")[0]; //找到a
        var audioList=audioBox.querySelectorAll("select")[0]; //找到select
        var audioTag=audioBox.querySelectorAll("audio")[0]; //找到audio
        //console.log(audioBotton);

        if(settings.bottonSrc){
            audioBotton.style.backgroundImage="url("+settings.bottonSrc+")";
        }
        audioBotton.state=true;  //播放的初始状态

        var _urlType=toString.apply(settings.audioUrl);
        //console.log(_urlType);  //把[object Object]变成[object String]
        if(_urlType==='[object Object]'){   //变成多个音乐的模式
            var _temp=[];
            _temp.push(settings.audioUrl);
            settings.audioUrl=_temp;
        }
        if(!settings.audioUrl.length){
            console.log(_INFO_.plug+"因无音乐资源启动失败，请添加音乐资源 audioUrl:");
            return;
        }
        if(typeof settings.audioUrl==='object'){   //多首音乐时
            console.log("数组对象自动播放");
            audioTag.src=settings.audioUrl[0].source;
            for(var i=0;i<settings.audioUrl.length;i++){
                var _option=new Option(settings.audioUrl[i].title,settings.audioUrl[i].source);  //Option为select的属性
                audioList.add(_option);
            }
        }else{   //单首音乐时
            audioTag.src=settings.audioUrl;
            audioList.style.display='none';
        }

        var audioFN={
            play:function (url) {
                if(url){
                    audioTag.src=url;
                }
                audioBotton.style.backgroundPosition='0 0';  //图标
                audioTag.play();   //mp3播放
            },
            stop:function () {
                audioBotton.style.backgroundPosition='100% 0px';
                audioTag.pause();  //mp3暂停
            }
        };

        //判断是否移动端
        var _device=(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(navigator.userAgent.toLowerCase()));
        var clickEvtName=_device?"touchstart":"mousedown";  //是移动端用touchstart

        audioBotton.addEventListener(clickEvtName,function (e) {
            //console.log(e.type);   //用gg浏览器分别测试，手机时显示touchstart，PC时显示mousedown
            console.log(this.state);
            if(this.state){
                this.state=false;
                audioFN.stop();
            }else{
                this.state=true;
                audioFN.play();
            }
        });
        audioList.addEventListener('change',function (e) {
            var musicName=this.options[this.selectedIndex].value;
            audioFN.play(musicName);
            audioBotton.state=true;  //播放状态
        });

        //微信播放
        if(navigator.userAgent.toLowerCase().match(/micromessenger/i)){   //判断微信
            document.addEventListener("WeixinJSBridgeReady",function onBridgeReady() {
                WeixinJSBridge.invoke("getNetworkType",{},function (e) {
                    audioFN.play();
                })
            })
        }

    };

    global[_INFO_.plug]=PlugCode;   //window使用


})(typeof window !=="undefined"?window:this);  //有的浏览器不兼容window