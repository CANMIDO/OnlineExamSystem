<template>
  <!-- 整个底部容器 -->
  <div class="foot">
  <div class="footer">
    <!-- 内部包裹内容的容器 -->
    <div class="footerinner">
        <!-- 单个块切分容器 -->
        <div class="footbox">
            <!-- 块容器的内容容器 -->
            <div class="footstep">
                <h4>关于我们</h4>
                <div class="a">
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                </div>
            </div>
        </div>
        <div class="footbox">
            <div class="footstep">
                <h4>关注我们</h4>
                <div class="a">
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                </div>
            </div>
        </div>
        <div class="footbox">
            <div class="footstep">
                <h4>友情连接</h4>
                <div class="a">
                    <a href="javascript:;">测试网站</a>
                    <a href="javascript:;">测试网站</a>
                </div>
            </div>
        </div>
    </div>
    <div class="footstep2">
            <p>
                <a href="javascript:;">关于我们</a>|<a href="javascript:;">About us</a
                >|<a href="javascript:;">服务条款</a>|<a href="javascript:;"
                >用户服务协议</a
                >|<a href="javascript:;">隐私政策</a>|<a href="javascript:;">权利声明</a
                >|<a href="javascript:;">广告服务</a>|<a href="javascript:;">招新声明</a
                >|<a href="javascript:;">客服中心</a>|<a href="javascript:;"
                >网站导航</a
                >
            </p>
            <p>
                Copyright © 2021 - 2022 TopMusic.
                <a href="javascript:;">All Rights Reserved.</a>
            </p>
            <p>
                沸点工作室 <a href="javascript:;">版权所有</a>｜<a href="javascript:;"
                >营业执照</a>｜网络文化经营许可证：鄂网文xxxxxxxxxxxxxx号
            </p>
            </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.foot{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
}
.footer{
    width: 100%;
    background-color: #333333;
   ;
}
.footerinner{
    /* background-color: #bfa; */
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: 15px;
}
.footbox{
    width: 150px;
    /* background-color: aquamarine; */
    margin-right: 30px;
}
.footbox a{
    display: block;
    margin: 0 10px 5px 0;
    /* background-color: rebeccapurple; */
    text-decoration: none;
    font-size: 13px;
    font-family: Arial, "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Helvetica, "sans-serif";
    line-height: 1.4;
    color:#999;
}
.footbox a:hover{
    color: rgb(64,158,255);
}
h4{
    font-family: Arial, "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Helvetica, "sans-serif";
    line-height: 1.5;
    font-weight: normal;
    display: block;
    color: #cccccc;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
/* 放置测试网站的a标签 */
.a{
    display: flex;
    flex-wrap: wrap;
}
.footstep2{
    text-align: center;   
}
.footstep2 p{
    text-align: center;
    color: #7f7f7f;
    font-size: 11px;
    font-family: Arial, "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Helvetica, "sans-serif";
}
.footstep2 a{
    text-decoration: none;
    font-size: 11px;
    font-family: Arial, "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, Helvetica, "sans-serif";
    line-height: 1.4;
    color: #7f7f7f;
}
.footstep2 a:hover{
    color:rgb(64,158,255)
}
</style>