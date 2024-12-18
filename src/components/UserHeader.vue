<template>
  <div class="header">
    <div class="box">
      <span>在线考试管理系统</span>
    </div>
  </div>
</template>
<script>
export default {
    name:'UserHeader',
}
</script>

<style scoped>
.header{
  background-color:rgb(32, 124, 181);
  display: flex;
  width: 100%;
  height: 60px;
  /* margin-left: 220px; */
  /* background-color:rgb(38, 12, 171); */
}
.box{
  background-color:rgb(32, 124, 181);
  width: 100%;
  height: 45px;
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 15px;
}
span{
  font-family: "Microsoft YaHei","Arial","Hiragino Sans GB","Helvetica","sans-serif";
  font-size: 25px;
  font-weight: bold;
  color: whitesmoke;
}
</style>