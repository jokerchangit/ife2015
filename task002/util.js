/**
 * Created by Administrator on 2017/1/6 0006.
 */
function isArray(arr) {
/* if(typeof (arr)==="object"){
         console.log(arr+'is');
     }else {
         console.log(arr+'isn、t');
          // javascript有5大基本数据类型：Undefined，Null，Boolean，Number和String（双无BNS）
     }   //这个错误是object属于应用数据类型，  数组，对象，null ，typeof都会返回object
   所以这个方法不适合用*/

    return Object.prototype.toString.call(arr)==='[object Array]'
}

function isFunction(fn) {
    return (typeof (fn)==="function");
}

function cloneObject(src) {
    // your implement
    if(src==null||typeof (src)!="object"){
        return src;
    }
    if(isArray(src)){
        var clone=[];
        for(var i=0;i<src.length;i++){
            clone[i]=cloneObject(src[i]);     //这里用=cloneObject(src[i])是因为数组中的值如果为值类型可以独立保存进栈内存中，那么在该函数第一步就会执行赋值
        }
        return clone;
    }
    if(src instanceof Date){
        var clone=new Date(src.getDate());
        return clone;
    }
    if(src instanceof Object){
        var clone={};
        for(var key in src){
            if(src.hasOwnProperty(key)){    //用hasOwnProperty能判断属性是否为自身属性而非继承属性，所以用if语句忽略掉继承属性
                clone[key]=cloneObject(src[key]);  //重新赋予新的属性
            }
        }
        return clone;
    }
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

function uniqArray(arr) {
    if (arr.length<2) return arr;
    for (var i=0;i<arr.length-1;i++){
        for (var j=i+1;j<arr.length;j++){
            if (arr[i]==arr[j]){
                arr.splice(j,1);
            }
        }
    }
    return arr;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

function simpleTrim(str) {
    var head=0,tail=str.length-1;
    while (str[head]==" ") head++;
    while (str[tail]==" ") tail--;
    return str.substring(head,tail+1);//tail+1是因为 tail下标的字符在substring会被删除，所以加一位来保存字符
}
//尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // 对字符串的正则表达式处理通常用到replace方法
    // str.replace(re, newSub)：将字符串被re匹配到的部分，用newSub来代替。
    return str.replace(/^\s+|\s+$/g, '');
}
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

function each(arr, fn) {
    // var index=null;
    // for (var i=0;i<arr.length;i++){
    //     index=i;
    //     fn(arr[index],index);
    // }  这个遍历方法不够快，，，用for in更快
    for (var index in arr){
        fn(arr[index],index);
    }
}
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

function getObjectLength(obj) {
    var num=0
    for (var key in obj){
        if (key) num++;
    }
    return num;
}
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    },
    d: [0,1],
    e: undefined,
    f: null,
};
console.log(getObjectLength(obj)); // 3

// 正则表达式判断是不是邮件
function isEmail(emailStr) {
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}
// 正则表达式判断是不是手机号
function isMobilePhone(phone) {
    phone = phone + '';
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}
//判断有无样式名字
function hasClass(element, className) {
    return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(hasClass(element,newClassName))element.className += " " +newClassName; //获取element的className，然后添加新类名
}
// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // element.className -= (" " +oldClassName); //不能直接减，因为字符串能拼接但是不能这样直接删减，可以用替换
    if(hasClass(element,oldClassName)) {
        var reg = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode===siblingNode.parentNode;     //判断是不是一个父亲
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    var currentElement = element; // 从目标元素开始往上遍历

    while (currentElement !== null) {      //这里遍历是因为你不确定他的父集元素到底是谁时，可以不断往上遍历
        x += currentElement.offsetLeft;
        y += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
    }
    // 不断的遍历的话，可以不断的向上寻找父集，知道浏览器body，在向上寻找offsetParent时返回null,
    //  停止寻找，这个时候添加的xy不断增加直到他是完整的left和top值

    // 为了兼容，documentElement、body这两个值总会有一个恒为0
    var scrollLeft = document.documentElement.scrollLeft + document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;

    x -= scrollLeft;
    y -= scrollTop;

    return {
        x: x,
        y: y
    };
}

//实现一个简单的Query
// function $(selector) {
//     var head = selector.charAt(0);
//     var element = null;
//     switch (head) {
//         case '#':
//             element = document.getElementById(selector.substring(1));
//             break;
//         case '.':
//             element = document.getElementsByClassName(selector.substring(1));
//             break;
//         case '[':
//             element =
//         default:
//             element = document.getElementsByTagName(selector);
//     }
//     return element;
// }这样的方法只能实现简单的如果出现子节点等就不好弄了
//多个选择器有点难到我了，看了一些资料觉得思路应该如下：
//1.如果存在#，直接从#开始向后查
//2.如果存在tag直接找到所有的tag然后向后查
//3.样式类，属性，从后向前查，得到它所有的父节点名称，去筛选匹配
//以上的做法有点太复杂，我还是做一个简单的正向匹配吧。
function $(selector) {

    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    selector = selector.trim();
    if (selector.indexOf(" ") !== -1) { //若存在空格
        var selectorArr = selector.split(/\s+/); //拆成数组

        var rootScope = myQuery(selectorArr[0]); //第一次的查找范围
        var i = null;
        var j = null;
        var result = [];
        //循环选择器中的每一个元素
        for (i = 1; i < selectorArr.length; i++) {
            for (j = 0; j < rootScope.length; j++) {
                result.push(myQuery(selectorArr[i], rootScope[j]));
            }
            // rootScope = result;
            // 目前这个方法还有bug
        }
        return result[0][0];
    } else { //只有一个，直接查询
        return myQuery(selector, document)[0];
    }
}

/**
 * 针对一个内容查找结果 success
 * @param  {String} selector 选择器内容
 * @param  {Element} root    根节点元素
 * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
 */
function myQuery(selector, root) {
    var signal = selector[0]; //
    var allChildren = null;
    var content = selector.substr(1);
    var currAttr = null;
    var result = [];
    root = root || document; //若没有给root，赋值document
    switch (signal) {
        case "#":
            result.push(document.getElementById(content));
            break;
        case ".":
            allChildren = root.getElementsByTagName("*");
            // var pattern0 = new RegExp("\\b" + content + "\\b");
            for (i = 0; i < allChildren.length; i++) {
                currAttr = allChildren[i].getAttribute("class");
                if (currAttr !== null) {
                    var currAttrsArr = currAttr.split(/\s+/);
                    console.log(currAttr);
                    for (j = 0; j < currAttrsArr.length; j++) {
                        if (content === currAttrsArr[j]) {
                            result.push(allChildren[i]);
                            console.log(result);
                        }
                    }
                }
            }
            break;
        case "[": //属性选择
            if (content.search("=") == -1) { //只有属性，没有值
                allChildren = root.getElementsByTagName("*");
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        result.push(allChildren[i]);
                    }
                }
            } else { //既有属性，又有值
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                var cut = selector.match(pattern); //分离后的结果，为数组
                var key = cut[1]; //键
                var value = cut[2]; //值
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(key) == value) {
                        result.push(allChildren[i]);
                    }
                }
            }
            break;
        default: //tag
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event,listener);
    }else if(element.attachEvent) {
        element.attachEvent("on" + event, listener)
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event,listener);
    } else if(element.detachEvent){
        element.detachEvent("on"+event,listener);
    }
}
// IE8+ 支持 addEventListener()。IE8 以下的版本使用 attachEvent()。
//
// attachEvent() 不支持事件捕获。
// attachEvent() 第一个参数事件处理程序属性名使用前缀 on。
// attachEvent() 允许相同的事件处理程序函数注册多次。
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,"click",listener)
}
// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,"keydown",function (event) {
        if (event.keyCode == 13){
            listener();
        }
    })
}//enter 键的 keyCode 为 13
// - addEvent(element, event, listener) -> $.on(element, event, listener);
// - removeEvent(element, event, listener) -> $.un(element, event, listener);
// - addClickEvent(element, listener) -> $.click(element, listener);
// - addEnterEvent(element, listener) -> $.enter(element, listener);

//事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element,eventName,function (event) {
        var target=event.target||event.srcElement;          //兼容性写法后面是IE的，返回标签名
        if (target.tagName.toLocaleLowerCase() === tag) { //tagName返回的是大写的标签名，toLocoleLowerCase是转化成小写的方法
            listener.call(target,event)   //使用call方法修改执行函数中的this指向，现在this指向触发了事件的HTML节点（可直接使用this.innerHTML返回该节点内容
        }
    })
}
//封装改变
$.delegate  = function (selector, tag, event, listener) {
    return delegateEvent(selector, tag, event, listener)
};
$.on = function (element, event, listener) {
    return addEvent(element, event, listener);
};
$.un = function (element, event, listener) {
    return removeEvent(element, event, listener);
};
$.click = function (element, listener) {
    return addClickEvent(element, listener)
};
$.enter = function (element, listener) {
    return addEnterEvent(element, listener)
};

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var uUserAgent = navigator.userAgent; //保存浏览器的userAgent
    var ieAgent = uUserAgent.match(/msie (\d+.\d+)/i);
    if (ieAgent) {
        return ieAgent[1];
    } else {
        if (uUserAgent.match(/Trident\/7.0;/i)) { //处理到ie11.
            ieAgent = uUserAgent.match(/rv:(\d+.\d+)/i);
            return ieAgent[1];
        }
        return -1; //不是ie浏览器。
    }
}
/*
  设置cookie
  @param {String} cookieName  设置cookie名
  @param {String} cookieValue 对对应的cookie名
  @param {Number} expiredays  过期的时间(多少天后)
 */
function setCookie(cookieName, cookieValue, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + expiredays);
    document.cookie = cookieName + "=" + cookieValue + ";expires=" + oDate;
}
/*
 * 获取cookie
 * @param   {String} cookieName 待寻找的cookie名
 * @returns {String} 返回寻找到的cookie值,无时为空
 */
function getCookie(cookieName) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == cookieName) {
            return arr2[1];
        }
    }
    return "";
}
/*
 * 删除cookie
 * @param {String} cookieName 待删除的cookie名
 */
function removeCookie(cookieName) {
    setCookie(cookieName, "1", -1)
}

/**
 * AJAX函数封装
 * @param {string} url     请求地址（必须）
 * @param {object} options 发送请求的选项参数
 *   @config {string} [options.type] 请求发送的类型。默认为GET。
 *   @config {Object} [options.data] 需要发送的数据。
 *   @config {Function} [options.onsuccess] 请求成功时触发，function(oAjax.responseText, oAjax)。（必须）
 *   @config {Function} [options.onfail] 请求失败时触发，function(oAjax)。(oAJax为XMLHttpRequest对象)
 *
 *@returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
function ajax(url, options) {
    //1.创建ajax对象
    var oAjax = null;
    /**
     * 此处必须需要使用window.的方式,表示为window对象的一个属性.不存在时值为undefined,进入else
     * 若直接使用XMLHttpRequest,在不支持的情况下会报错
     **/
    if (window.XMLHttpRequest) {
        //IE6以上
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.连接服务器
    //open(方法,url,是否异步)
    var param = ""; //请求参数。
    //只有data存在，且为对象使才执行
    var data = options.data ? options.data : -1; //缓存data
    if (typeof (data) === "object") {
        for (var key in data) { //请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + "=" + data[key] + "&";
            }
        }
        param.replace(/&$/, "");
    } else {
        param = "timestamp=" + new Date().getTime(); //用来清除缓存
        //正常第一次加载没问题，但是第二次加载就会使用到缓存，所以用时间函数来解决这个问题
    }
    //3.发送请求
    var type = options.type ? options.type.toUpperCase() : "GET";
    if (type === "GET") {
        oAjax.open("GET", url + "?" + param, true);
        oAjax.send();
    } else {
        oAjax.open("POST", url, true);
        oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oAjax.send(param);
    }
    //4.接收返回
    //OnRedayStateChange事件
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                //请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(oAjax.responseText, oAjax);
            } else {
                //先判断是否存在请求失败函数
                //存在时，形参为XMLHttpRequest对象，便于进行错误进行处理
                if (options.onfail) {
                    options.onfail(oAjax);
                }
            }
        }
    };
    return oAjax;//发送请求的XMLHttpRequest对象
}
