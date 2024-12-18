<template>
  <div class="Loginbox">
    <div class="boxchild">
      <el-row>
          <router-link to="/login" active-class="active">
          <span>登录</span>
          </router-link>
          <router-link to="/register" active-class="active">
          <span>注册</span>
          </router-link>
        </el-row>

      <el-form v-model="user">
        <el-input
          placeholder="请输入您的学号/工号"
          prefix-icon="el-icon-user"
          v-model="user.id"
          type="text"
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-key"
          v-model="user.password"
          type="password"
          clearable
        >
        </el-input>

        <el-form-item label="" class="radio">
          <el-radio-group v-model="user.type">
            <el-radio label=0>教师</el-radio>
            <el-radio label=1>学生</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" plain @click="userLogin">登录</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {mapMutations} from'vuex'
export default {
  name: "UserLogin",
  data() {
    return {
      user:{
        id:'',
        password:'',
        type:0,
      }
    }
  },
  methods:{
    ...mapMutations(['setInfo']),
    userLogin(){
      if(this.user.id === '' || this.user.password === ''){
        this.$message('账号或密码为空');
      }else{
        if(this.$store.state.state){
          this.$router.push('/');
          window.alert('请勿重复登录！')
          this.$router.push('/enter')
          return;
        }
        //返回给我一个data对象，其中包裹了用户的全部信息+是否匹配成功
        axios.post("/api/online_ems/login/login",this.user).then(
          (Response)=>{
            //console.log(Response);
            window.alert(Response.data.msg);
            //如果匹配失败
            if(Response.data.state === false){
              this.$router.push("/login");
            }else{
              //如果匹配成功，将data交给store存储
              this.setInfo(Response.data);
              this.$router.push("/enter");
            }
          },
          (error)=>{
            console.log(error.message);
          }
        );
      }
    }
  }
}
</script>

<style scoped>
/* #app {
  background: #606266;
} */
.el-input{
  width: 80%;
  margin: 2% 10%;
  height: 50px;
  font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
  font-size: 14px;
  color: #606266;
}
.radio{
  width: 80%;
  margin: 3% 25%;
}
.el-row {
  margin: 5% 6%;
  padding: 0 15px;
  width: 333px;
  font-family: "Helvetica Neue", "Hiragino Sans GB", "Segoe UI", "Microsoft Yahei", "微软雅黑", Tahoma, Arial, STHeiti, sans-serif;
  font-size: 18px;
}

.el-button{
  width: 50%;
  margin: 4%  25%;
}
.Loginbox {
  background: url('~@/assets/background.jpg');
  /* background-color:rgb(129,195,243); */
  width: 100%;
  height: 100vh;
  margin: 0% auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.boxchild {
  width: 350px;
  height: 360px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #f9fbfd;
}
.Logintitle {
  font-size: 40px;
  font-weight: 600;
  margin: 10% 27%;
  color: #606266;
}
.el-form-item label,label{
  font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
  font-size: 15px;
}
span{
  position: relative;
  padding: 10px 50px;
  margin: 0px 10px 5px 0px;
  float: left;
  font-weight: bold;
  /* background-color: gray; */
}

/* span {
  position: relative;
  padding: 10px 40px;
  margin: 0px 10px 10px 0px;
  float: left;
  border-radius: 3px;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  background-color: #2ecc71;
  border: none;
  border-bottom: 5px solid #27ae60;
  text-shadow: 0px -2px #27ae60;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
} */

span:hover,

.active {
  -webkit-transform: translate(0px, 1px);
  -ms-transform: translate(0px, 1px);
  transform: translate(0px, 1px);
  border-bottom: 2px solid rgb(64,158,255);
}
</style>