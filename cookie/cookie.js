/**
 * Created by guohanshuang on 2017/7/24.
 */
function setCookie(name,value,iDay) {    //设置cookie
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);  //设置过期时间:iDay天后

    document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie(name) {    //读取cookie
    var arr=document.cookie.split('; ');

    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');

        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}

function removeCookie(name) {   //删除cookie
    setCookie(name,1,-1);  //-1天过期,删除
}