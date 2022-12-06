var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var progressBar;
var Stat = Laya.Stat;
// var vw = $(window).width();//游戏界面的宽
// var vh = $(window).height();//游戏界面的高
var vw = document.documentElement.clientWidth;
var vh = document.documentElement.clientHeight;
web_url = "http://nc.dragonloo.co/";//http://nc.dragonloo.co/   http://nongchang.1dit.com
// 请求封装
function ajax(options) {
    //创建一个ajax对象
    var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
    //数据的处理 {a:1,b:2} a=1&b=2;
    var str = "";
    for (var key in options.data) {
        str += "&" + key + "=" + options.data[key];
    }
    str = str.slice(1)
    if (options.type == "get") {
        var url = options.url + "?" + str;
        xhr.open("get", url);
        xhr.send();
    } else if (options.type == "post") {
        xhr.open("post", options.url);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(str)
    }
    //监听
    xhr.onreadystatechange = function () {
        //当请求成功的时候
        if (xhr.readyState == 4 && xhr.status == 200) {
            var d = xhr.responseText;
            //将请求的数据传递给成功回调函数
            options.success && options.success(d)
        } else if (xhr.status != 200) {
            //当失败的时候将服务器的状态传递给失败的回调函数
            options.error && options.error(xhr.status);
        }
    }
}


dengluarr = localStorage.getItem('dengluarr');
isjizhu = 2;
if (dengluarr == null) {
    dengluarr = [];
} else {
    dengluarr = JSON.parse(dengluarr);
}
// console.log(dengluarr);
token = localStorage.getItem('token');


var user_id;
var denglu = false;
var iskejin = false;
if (token == null) {
    token = "";
} else {
    token = token.replace(/\"/g, "");
}


var params = {};


// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return decodeURI(r[2]); return null;
// }
// console.log(GetQueryString('token'))
// if (GetQueryString('token')!=""&&GetQueryString('token')!=null) {
//     token = GetQueryString('token');
// }




// console.log(vw, wh)

(function () {
    (function (LayaSample) {
        B = Laya.Browser;
        Laya.MiniAdpter.init();
        // Laya.init(1344, 750, Laya.WebGL);
        Laya.init(1344, 750);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//缩放宽 适应高
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;//缩放高 适应宽
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;//
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;//自动横屏

        Laya.stage.bgColor = "#fff";
        Laya.stage.loadImage("comp/loading/bg.png")
        //预加载loading条资源
        var proArr = [{ url: "res/progress_time.png" },
        { url: "res/progress_time$bar.png" },
        ];

        Laya.loader.load(proArr, Laya.Handler.create(this, onProLoaded), null, Laya.Loader.ATLAS);
        // Stat.show(0,0);
    })();
})(window.LayaSample || (window.LayaSample = {}));


function onProLoaded() {


    // 将进度条显示到舞台
    showProgress();

    //开始预加载游戏资源

    var arr = new Array;
    arr = [
        { url: "comp/xin2/bg.png" },
        { url: "comp/suo.png" },
        { url: "comp/loading/bg.png" },
        { url: "comp/caijin1.png" },
        { url: "comp/caijin2.png" },
        { url: "comp/caijin3.png" },
        { url: "comp/caijin4.png" },
        { url: "comp/gb.png" },
        { url: "comp/gou11.png" },
        { url: "comp/head1.png" },
        { url: "comp/sgj.png" },
        { url: "comp/sjh.png" },
        { url: "comp/tishikuang.png" },
        { url: "comp/touqudonghua.png" },
        { url: "comp/tudiying.png" },
        { url: "comp/lb1.png" },
        { url: "comp/lb2.png" },
        { url: "comp/lb3.png" },
        { url: "comp/chongzhimima/795@2x.png" },
        { url: "comp/chongzhimima/czdk@2x.png" },
        { url: "comp/chongzhimima/czmm@2x.png" },
        { url: "comp/chongzhimima/fsyzm@2x.png" },
        { url: "comp/chongzhimima/qdaniu@2x.png" },
        { url: "comp/chongzhimima/qrmm@2x.png" },
        { url: "comp/chongzhimima/tc@2x.png" },
        { url: "comp/chongzhimima/yzm@2x.png" },
        { url: "comp/chongzhimima/zh@2x.png" },
        { url: "comp/choujiang/bg.png" },
        { url: "comp/choujiang/biao.png" },
        { url: "comp/choujiang/gb.png" },
        { url: "comp/choujiang/jf.png" },
        { url: "comp/choujiang/ks.png" },
        { url: "comp/choujiang/pan.png" },
        { url: "comp/choujiang/zhizhen.png" },
        { url: "comp/denglu/duihao.png" },
        { url: "comp/denglu/gb.png" },
        { url: "comp/denglu/jzmm.png" },
        { url: "comp/denglu/kuang.png" },
        { url: "comp/denglu/ljdl.png" },
        { url: "comp/denglu/mmtxt.png" },
        { url: "comp/denglu/quan.png" },
        { url: "comp/denglu/tiao.png" },
        { url: "comp/denglu/wjmm.png" },
        { url: "comp/denglu/xzzh.png" },
        { url: "comp/denglu/zhtxt.png" },
        { url: "comp/gerenzhongxin/737@2x.png" },
        { url: "comp/gerenzhongxin/bangding.png" },
        { url: "comp/gerenzhongxin/bg.png" },
        { url: "comp/gerenzhongxin/bianji.png" },
        { url: "comp/gerenzhongxin/gbtxt.png" },
        { url: "comp/gerenzhongxin/id.png" },
        { url: "comp/gerenzhongxin/jifen.png" },
        { url: "comp/gerenzhongxin/jifen1.png" },
        { url: "comp/gerenzhongxin/jinbi.png" },
        { url: "comp/gerenzhongxin/jinbi1.png" },
        { url: "comp/gerenzhongxin/k1.png" },
        { url: "comp/gerenzhongxin/k2.png" },
        { url: "comp/gerenzhongxin/katxt.png" },
        { url: "comp/gerenzhongxin/kuang1.png" },
        { url: "comp/gerenzhongxin/name.png" },
        { url: "comp/gerenzhongxin/phone.png" },
        { url: "comp/gerenzhongxin/quan.png" },
        { url: "comp/gerenzhongxin/shezhi.png" },
        { url: "comp/gerenzhongxin/sjh.png" },
        { url: "comp/gerenzhongxin/tiao1.png" },
        { url: "comp/gerenzhongxin/yx1.png" },
        { url: "comp/gerenzhongxin/yx2.png" },
        { url: "comp/gerenzhongxin/yy1.png" },
        { url: "comp/gerenzhongxin/yy2.png" },
        { url: "comp/haoyou/468@2x.png" },
        { url: "comp/haoyou/bg.png" },
        { url: "comp/haoyou/cjpx.png" },
        { url: "comp/haoyou/dengjipai.png" },
        { url: "comp/haoyou/fanhui.png" },
        { url: "comp/haoyou/haoyou.png" },
        { url: "comp/haoyou/jiaoyi.png" },
        { url: "comp/haoyou/jiaoyi1.png" },
        { url: "comp/haoyou/jiaoyi@2x.png" },
        { url: "comp/haoyou/jilu.png" },
        { url: "comp/haoyou/jilu1.png" },
        { url: "comp/haoyou/jilu@2x.png" },
        { url: "comp/haoyou/k1.png" },
        { url: "comp/haoyou/k2.png" },
        { url: "comp/haoyou/k3.png" },
        { url: "comp/haoyou/k4.png" },
        { url: "comp/haoyou/k5.png" },
        { url: "comp/haoyou/kuang1.png" },
        { url: "comp/haoyou/kuang2.png" },
        { url: "comp/haoyou/kuang3.png" },
        { url: "comp/haoyou/queding.png" },
        { url: "comp/haoyou/srhyID@2x.png" },
        { url: "comp/haoyou/tc647kb@2x.png" },
        { url: "comp/haoyou/touqu.png" },
        { url: "comp/haoyou/touqu1.png" },
        { url: "comp/haoyou/tqjl@2x.png" },
        { url: "comp/haoyou/tqlb@2x_2.png" },
        { url: "comp/haoyou/txt1.png" },
        { url: "comp/haoyou/txt11.png" },
        { url: "comp/haoyou/txt2.png" },
        { url: "comp/haoyou/txt22.png" },
        { url: "comp/haoyou/xuxian.png" },
        { url: "comp/haoyou/zu102kb2@2x.png" },
        { url: "comp/haoyou/zu102kb4@2x.png" },
        { url: "comp/haoyou/zu102kb5@2x.png" },
        { url: "comp/haoyou/zu102kb@2x.png" },
        { url: "comp/head/head_1.jpg" },
        { url: "comp/head/head_2.jpg" },
        { url: "comp/head/head_3.jpg" },
        { url: "comp/head/head_4.jpg" },
        { url: "comp/head/head_5.jpg" },
        { url: "comp/head/head_6.jpg" },
        { url: "comp/head/head_7.jpg" },
        { url: "comp/head/head_8.jpg" },
        { url: "comp/head/head_9.jpg" },
        { url: "comp/head/head_10.jpg" },
        { url: "comp/head/head_11.jpg" },
        { url: "comp/head/head_12.jpg" },
        { url: "comp/qiandao/0.png" },
        { url: "comp/qiandao/1.png" },
        { url: "comp/qiandao/2.png" },
        { url: "comp/qiandao/3.png" },
        { url: "comp/qiandao/4.png" },
        { url: "comp/qiandao/5.png" },
        { url: "comp/qiandao/6.png" },
        { url: "comp/qiandao/7.png" },
        { url: "comp/qiandao/8.png" },
        { url: "comp/qiandao/9.png" },
        { url: "comp/qiandao/bg.png" },
        { url: "comp/qiandao/biao.png" },
        { url: "comp/qiandao/qdbtn.png" },
        { url: "comp/qiandao/quan1.png" },
        { url: "comp/qiandao/quan2.png" },
        { url: "comp/qiandao/txt1.png" },
        { url: "comp/qiandao/wqd@2x.png" },
        { url: "comp/qiandao/x@2x.png" },
        { url: "comp/qiandao/yqd@2x.png" },
        { url: "comp/qietu/1.png" },
        { url: "comp/qietu/2.png" },
        { url: "comp/qietu/3.png" },
        { url: "comp/qietu/4.png" },
        { url: "comp/qietu/5.png" },
        { url: "comp/qietu/6.png" },
        { url: "comp/qietu/7.png" },
        { url: "comp/qietu/8.png" },
        { url: "comp/qietu/9.png" },
        { url: "comp/qietu/10.png" },
        { url: "comp/qietu/11.png" },
        { url: "comp/qietu/12.png" },
        { url: "comp/qietu/13.png" },
        { url: "comp/qietu/14.png" },
        { url: "comp/qietu/15.png" },
        { url: "comp/qietu/16.png" },
        { url: "comp/qietu/17.png" },
        { url: "comp/qietu/18.png" },
        { url: "comp/qietu/19.png" },
        { url: "comp/qietu/shou.png" },
        { url: "comp/shangdian/chongwu.png" },
        { url: "comp/shangdian/chongwu1.png" },
        { url: "comp/shangdian/cszz.png" },
        { url: "comp/shangdian/dj1.png" },
        { url: "comp/shangdian/dj2.png" },
        { url: "comp/shangdian/erji.png" },
        { url: "comp/shangdian/erji1.png" },
        { url: "comp/shangdian/gb.png" },
        { url: "comp/shangdian/gb1.png" },
        { url: "comp/shangdian/gou.png" },
        { url: "comp/shangdian/goumai.png" },
        { url: "comp/shangdian/jinbi.png" },
        { url: "comp/shangdian/k1.png" },
        { url: "comp/shangdian/k2.png" },
        { url: "comp/shangdian/k3.png" },
        { url: "comp/shangdian/k4.png" },
        { url: "comp/shangdian/kuang1.png" },
        { url: "comp/shangdian/kuang2.png" },
        { url: "comp/shangdian/kuang3.png" },
        { url: "comp/shangdian/lsk2@2x.png" },
        { url: "comp/shangdian/sanji.png" },
        { url: "comp/shangdian/sanji1.png" },
        { url: "comp/shangdian/xuanzhong.png" },
        { url: "comp/shangdian/yiji.png" },
        { url: "comp/shangdian/yiji1.png" },
        { url: "comp/shangdian/zz1.png" },
        { url: "comp/shangdian/zz2.png" },
        { url: "comp/shuoming/bg.png" },
        { url: "comp/shuoming/fs.png" },
        { url: "comp/shuoming/fs1.png" },
        { url: "comp/shuoming/gb.png" },
        { url: "comp/shuoming/liuyan.png" },
        { url: "comp/shuoming/qd1.png" },
        { url: "comp/shuoming/shuru@2x.png" },
        { url: "comp/shuoming/smtxt.png" },
        { url: "comp/shuoming/tiao.png" },
        { url: "comp/shuoming/tiao1.png" },
        { url: "comp/shuoming/xftxt.png" },
        { url: "comp/shuoming/you.png" },
        { url: "comp/shuoming/zuo.png" },
        { url: "comp/tishikuang/qd.png" },
        { url: "comp/tishikuang/hero.png" },
        { url: "comp/tishikuang/kuang.png" },
        { url: "comp/tishikuang/kuang1.png" },
        { url: "comp/tishikuang/qbk@2x.png" },
        { url: "comp/tree/10.png" },
        { url: "comp/tree/11.png" },
        { url: "comp/tree/12.png" },
        { url: "comp/tree/13.png" },
        { url: "comp/tree/20.png" },
        { url: "comp/tree/21.png" },
        { url: "comp/tree/22.png" },
        { url: "comp/tree/23.png" },
        { url: "comp/tree/30.png" },
        { url: "comp/tree/31.png" },
        { url: "comp/tree/32.png" },
        { url: "comp/tree/33.png" },
        { url: "comp/tree/40.png" },
        { url: "comp/tree/41.png" },
        { url: "comp/tree/42.png" },
        { url: "comp/tree/43.png" },
        { url: "comp/tree/50.png" },
        { url: "comp/tree/51.png" },
        { url: "comp/tree/52.png" },
        { url: "comp/tree/53.png" },
        { url: "comp/tree/60.png" },
        { url: "comp/tree/61.png" },
        { url: "comp/tree/62.png" },
        { url: "comp/tree/63.png" },
        { url: "comp/tree/daoju/1.png" },
        { url: "comp/tree/daoju/2.png" },
        { url: "comp/tree/daoju/3.png" },
        { url: "comp/tree/daoju/4.png" },
        { url: "comp/tree/daoju/5.png" },
        { url: "comp/tree/daoju/6.png" },
        { url: "comp/tree/daoju/7.png" },
        { url: "comp/tree/daoju/8.png" },
        { url: "comp/tree/daoju/9.png" },
        { url: "comp/tree/daoju/10.png" },
        { url: "comp/tree/daoju/11.png" },
        { url: "comp/tree/daoju/12.png" },
        { url: "comp/tree/daoju/13.png" },
        { url: "comp/tree/daoju/14.png" },
        { url: "comp/tree/daoju/15.png" },
        { url: "comp/xintu/bg.jpg" },
        { url: "comp/xintu/buman.png" },
        { url: "comp/xintu/caijin.png" },
        { url: "comp/xintu/cang1.png" },
        { url: "comp/xintu/cang2.png" },
        { url: "comp/xintu/cang3.png" },
        { url: "comp/xintu/cangku.png" },
        { url: "comp/xintu/chanzi.png" },
        { url: "comp/xintu/choujiang.png" },
        { url: "comp/xintu/gou11.png" },
        { url: "comp/xintu/gou13.png" },
        { url: "comp/xintu/gouwo.png" },
        { url: "comp/xintu/gouwo1.png" },
        { url: "comp/xintu/haoyou.png" },
        { url: "comp/xintu/huijia.png" },
        { url: "comp/xintu/jbjf1.png" },
        { url: "comp/xintu/jbjf2.png" },
        { url: "comp/xintu/jbjf3.png" },
        { url: "comp/xintu/jbjf4.png" },
        { url: "comp/xintu/jbjf5.png" },
        { url: "comp/xintu/jia.png" },
        { url: "comp/xintu/jifentu.png" },
        { url: "comp/xintu/jiluce.png" },
        { url: "comp/xintu/jux.png" },
        { url: "comp/xintu/jy1.png" },
        { url: "comp/xintu/jy2.png" },
        { url: "comp/xintu/jy3.png" },
        { url: "comp/xintu/jy4.png" },
        { url: "comp/xintu/jy5.png" },
        { url: "comp/xintu/jy6.png" },
        { url: "comp/xintu/jyjl11.png" },
        { url: "comp/xintu/kefu1.png" },
        { url: "comp/xintu/kefu2.png" },
        { url: "comp/xintu/kefu3.png" },
        { url: "comp/xintu/kefu4.png" },
        { url: "comp/xintu/kefu5.png" },
        { url: "comp/xintu/kefu6.png" },
        { url: "comp/xintu/kefu7.png" },
        { url: "comp/xintu/qie1.png" },
        { url: "comp/xintu/qie2.png" },
        { url: "comp/xintu/qie3.png" },
        { url: "comp/xintu/shop.png" },
        { url: "comp/xintu/tip.png" },
        { url: "comp/xintu/tu11.png" },
        { url: "comp/xintu/zhedie.png" },
        { url: "comp/xintu/chongzhi/cz1.png" },
        { url: "comp/xintu/chongzhi/cz2.png" },
        { url: "comp/xintu/chongzhi/cz3.png" },
        { url: "comp/xintu/chongzhi/cz4.png" },
        { url: "comp/xintu/chongzhi/cz5.png" },
        { url: "comp/xintu/chongzhi/cztxt.png" },
        { url: "comp/xintu/chongzhi/cztxt1.png" },
        { url: "comp/xintu/chongzhi/cztxt2.png" },
        { url: "comp/xintu/chongzhi/tx1.png" },
        { url: "comp/xintu/chongzhi/tx2.png" },
        { url: "comp/xintu/chongzhi/tx3.png" },
        { url: "comp/xintu/chongzhi/tx4.png" },
        { url: "comp/xintu/chongzhi/tx5.png" },
        { url: "comp/xintu/chongzhi/tx6.png" },
        { url: "comp/xintu/chongzhi/txjr.png" },
        { url: "comp/xintu/chongzhi/txqd.png" },
        { url: "comp/xintu/chongzhi/txtxt.png" },
        { url: "comp/xintu/chongzhi/txtxt1.png" },
        { url: "comp/xintu/chongzhi/txtxt2.png" },
        { url: "comp/muyuchang/weilan.png" },
        { url: "comp/muyuchang/yutang.png" },
        { url: "comp/muyuchang/muchang/ji0.png" },
        { url: "comp/muyuchang/muchang/ezoulu.png" },
    ];
    for (var i = 0; i < 4; i++) {
        arr.push({
            url: "res/atlas/comp/muyuchang/yuchang/fish_" + i + ".atlas"
        })
    }

    //设置progress Handler的第4个参数为true，根据加载文件个数获取加载进度
    Laya.loader.load(arr, null, Laya.Handler.create(this, onProgress, null, false));
}
// 将进度条显示到舞台
function showProgress() {
    LogoLayer = new Laya.Sprite();
    Laya.stage.addChild(LogoLayer);
    progressBar = new Laya.ProgressBar("res/progress_time.png");
    progressBar.width = 500;
    progressBar.height = 36;
    progressBar.pos(420, 450);
    progressBar.sizeGrid = "5,5,5,5";
    //当progressBar的value值改变时触发
    progressBar.changeHandler = new Laya.Handler(this, onChange);
    LogoLayer.addChild(progressBar);
}
function onChange(value) {
    // console.log("进度: "+Math.floor(value*100)+"%");
    if (value == 1) {
        progressBar.value = 1;
        // console.log("加载完成");
        LogoLayer.visible = false;
        onAssetLoaded();
    }
}
//游戏资源加载进度函数
function onProgress(pro) {
    // console.log("加载了总文件的:"+Math.floor(pro*100)+"%");
    progressBar.value = Math.floor(pro * 100) / 100;
}

function onAssetLoaded() {
    var game = new Game();
    Laya.stage.addChild(game);
    socket = io("ws://156.236.67.103:5069", { "connect timeout": 5000 });//ws://156.236.67.103:5069   ws://47.242.205.18:5070
    node();
    socket.emit("加入");
    // 获取链接token初始化
    if (location.search) {
        let str = location.search.substring(1)
        let arr = str.split('&')
        for (let i = 0; i < arr.length; i++) {
            let key = arr[i].split('=')[0]
            let value = arr[i].split('=')[1]
            params[key] = value
        }
    }
    if (params.userId) {
        ajax({
            url: web_url + '/init',
            data: {
                userId: params.userId,
                token: params.token,
                wallet: params.wallet,
                pid: params.pid,
            },
            type: 'post',
            dataType: 'json',
            success: (res) => {
                res = JSON.parse(res)
                if (1 == res.status) {
                    token = res.token
                    // 登录之后
                    _this.wanjiafun();//玩家
                    _this.tudifun();//土地
                    _this.bbfun(2);//背包
                    _this.yinyue();//音乐
                    _this.dl_box.visible = false;//隐藏登录盒子
                    _this.home.visible = true;//显示页面
                }
            }
        })
    }
}

function node() {
    socket.on('connect', function (data) {
        console.log("链接成功");
    })

    socket.on('reconnect', function () {
        window.location.href = window.location.href;
    })

    socket.on("水果猜拳", function (data) {
        console.log(data, "++++++++")
        // return;
        localStorage.setItem('cainum', data.cainum);
        localStorage.setItem('roomid', data.roomid);
        window.location.href = web_url + "/caiquan/index.html";
    })

    socket.on("加入大房间", function (data) {
        sid = data.sid;
        socket.emit("加入大房间", { id: user_id, sid: sid })
    })

    socket.on("被邀请游戏", function (data) {
        console.log(data, "被邀请游戏")
        youxinum = data.cainum;
        localStorage.setItem('cainum', data.cainum);
        localStorage.setItem('roomid', data.roomid);
        _this.jiaru_box.visible = true;
        _this.jiaru_box.getChildByName("文字").text = "玩家" + data.name + "邀请您加入水果猜拳" + data.cainum + "金币场次的对战，点击确定加入";
    })
}

