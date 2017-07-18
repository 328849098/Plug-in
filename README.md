# Plug-in
------------------------
### tab.js -> 不限按钮个数的极简tab自定义组件
    tab({
        oNodeID:'tab',        //存放插件的父级id
        boxStyle:'box',  //tab的class
        aBtn:['教育','培训','招生','出国'],
        aBtnNode:'span',      //按钮的节点:button 、span。不能是div。
        aBtnClass:'on',       //按钮被激活的class
        aBox:['<h1>1111</h1>','<a href="1.html">2222222</a>','322222']    //显示内容
    });
    
### musicPlay.js -> mini Music plug-in
    musicPlay({
        //audioUrl:"music/smdqfhc.mp3",                               //单个音乐，只有按钮图标
        //audioUrl:{title:'水墨丹青凤凰城',source:"music/smdqfhc.mp3"}, //单个音乐，有按钮图标和菜单
        audioUrl:[                                                    //多个音乐
            {title:'水墨丹青凤凰城',source:"music/smdqfhc.mp3"},
            {title:'轮回',source:"music/lh.mp3"}
        ],
        nodeID:'music',                                              //存放插件的父级id，如果没有，则插入到body中
        boxStyle:'width:300px;height:100px;background:#ccc;padding:10px;margin:0 auto;',  //插件的css，如背景
        bottonSrc:'images/button.png'                                //按钮图标
    });
 
![image](https://raw.githubusercontent.com/328849098/Plug-in/master/musicPlay/images/musicPlay.jpg "musicPlay") 
