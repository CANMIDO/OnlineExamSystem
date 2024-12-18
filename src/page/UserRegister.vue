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

      <el-form v-model="users">
        <el-input
          placeholder="请输入您的姓名"
          prefix-icon="el-icon-user"
          v-model="users.name"
          type="text"
        >
        </el-input>
        <el-input
          placeholder="请输入您的学号/工号"
          prefix-icon="el-icon-sunrise"
          v-model="users.id"
          type="text"
          clearable
        >
        </el-input>
        <el-input
          placeholder="请输入您的联系方式"
          prefix-icon="el-icon-phone-outline"
          v-model="users.phone"
          type="text"
          clearable
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-key"
          v-model="users.password"
          type="password"
          clearable
        >
        </el-input>
        <el-select v-model="users.type" placeholder="请选择您的身份">
          <el-option
            v-for="item in type_options"
            :key="item.label"
            :label='item.msg'
            :value="item.label">
          </el-option>
        </el-select>
        <el-select v-model="users.college" placeholder="请选择您所在的学院">
          <el-option
            v-for="item in college_options"
            :key="item.label"
            :label='item.msg'
            :value="item.msg">
          </el-option>
        </el-select>
        <!-- <el-input
          placeholder="请输入您所教授的课程"
          prefix-icon="el-icon-user-solid"
          v-model="users.sex"
          v-show="!users.type"
          type="text"
        >
        </el-input> -->
        <!-- <el-input
          placeholder="请输入您的性别"
          prefix-icon="el-icon-user-solid"
          v-model="users.sex"
          type="text"
        >
        </el-input> -->
        
        <el-select v-model="users.sex" placeholder="请选择您的性别">
          <el-option label="女" value="女"></el-option>
          <el-option label="男" value="男"></el-option>
        </el-select>
      
      </el-form>
      <!-- 可以动态绑定一个loading属性更加美观 -->
      <el-button type="primary"  plain @click="userRegister">注册</el-button>
    </div>
  </div>
</template>
<script>
// import picture from '../assets/background.jpg'
import axios from 'axios';
export default {
  name: "UserRegister",
  data() {
    return {
        // picture:picture,
        users: {
        name: '',
        password: '',
        id:'',
        phone:'',
        college:'',
        sex:'',
        type:'',
      },
      college_options:[
        {msg:'理学院',label:1},
        {msg:'工学院',label:2},
        {msg:'信息学院',label:3},
        {msg:'生命与科学技术学院',label:4},
        {msg:'水产学院',label:5},
        {msg:'植物科学技术学院',label:6},
        {msg:'动物科学技术学院',label:7}
      ],
      type_options:[
        {msg:'学生',label:1},
        {msg:'教师',label:0},
      ]
    };
  },
  methods:{
    userRegister(){
      for(let i in this.users){
        if(this.users[i] === ''){
          window.alert('请输入完整信息！');
          break;
        }
      }
      axios.post("/api/online_ems/login/register",this.users).then(
        (Response)=>{
          //这里要修改完善一下
          window.alert(Response.data);
          this.$router.push("/login")
          //console.log(Response);
        },
        (error)=>{
          console.log(error.message);
        }
      );
    }
  },
}
</script>

<style scoped>
#app {
  background: #606266;
}
/* .radio-group{
  width: 80%;
  margin: 3% 9%;
  height: 50px;
} */
.el-input,.el-select {
  width: 80%;
  margin: 0.5% 9%;
  height: 50px;
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
  width: 100%;
  height: 717px;
  margin: 0% auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.boxchild {
  width: 350px;
  height: 560px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #f9fbfd;
}
.Logintitle {
  font-size: 40px;
  font-weight: 600;
  margin: 10% 27%;
  color: #606266;
}
span{
  position: relative;
  padding: 10px 50px;
  margin: 0px 10px 5px 0px;
  float: left;
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
