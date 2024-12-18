
<template>
  <div class="Editbox">
    <div class="title">
        <span>个人信息</span>
        <hr>
    </div>
    <div class="boxchild">
      
      <el-form ref="form" 
      :model="users" 
      label-width="120px"
      label-position="left">
        <el-form-item>
            <span slot="label">
                <span>姓名</span>
            </span>
            <el-input v-model="users.name"></el-input>
        </el-form-item>

        <el-form-item>
        <span slot="label">
                <span>学号/工号</span>
            </span>
            <el-input v-model="users.id" :disabled='true'></el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>联系方式</span>
            </span>
            <el-input v-model="users.phone"></el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>是否修改密码</span>
            </span>
            <el-switch v-model="ChangePassword"></el-switch>
        </el-form-item>

        <el-form-item v-show="ChangePassword" >
            <span slot="label">
                <span>输入原密码</span>
            </span>
            <el-input 
              placeholder="输入原密码" 
              v-model="OldPassword" 
              show-password>
            </el-input>
        </el-form-item>
        <el-form-item v-show="ChangePassword" >
            <span slot="label">
                <span>输入新密码</span>
            </span>
            <el-input 
              placeholder="输入新密码" 
              v-model="NewPassword" 
              show-password>
            </el-input>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>身份</span>
            </span>
            <el-radio-group v-model="users.type" :disabled='true'>
            <el-radio :label = 0>教师</el-radio>
            <el-radio :label = 1>学生</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>性别</span>
            </span>
            <el-radio-group v-model="users.sex">
            <el-radio label='男'>男</el-radio>
            <el-radio label='女'>女</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>所在学院</span>
            </span>
            <el-radio-group v-model="users.college">
            <el-radio label='理学院'>理学院</el-radio>
            <el-radio label='工学院'>工学院</el-radio>
            <el-radio label='信息学院'>信息学院</el-radio>
            <el-radio label='生命与科学技术学院'>生命与科学技术学院</el-radio>
            <el-radio label='水产学院'>水产学院</el-radio>
            <el-radio label='植物科学技术学院'>植物科学技术学院</el-radio>
            <el-radio label='动物科学技术学院'>动物科学技术学院</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item>
            <span slot="label">
                <span>课程列表</span>
            </span>
            <!-- <el-input v-model="course" type="textarea" class="text_input"></el-input> -->
            <el-checkbox-group 
            v-model="checked"
            >
              <el-checkbox v-for="city in courseList" :label="city" :key="city.courseid" :checked = "courseIdList.includes(city.courseid)">{{city.coursename}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item class="button">
            <el-button type="primary" @click="onSubmit">
                <span>修改并保存</span>
            </el-button>
            <!-- <el-button>
                <span>取消</span>
            </el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
//用户登录以后要拿到一份用户初始化注册的信息对象,有保存信息的应该在修改网页进行呈现
export default {
    name:'UserMessage',
    data() {
        return {
            courseIdList:[],
            checked:[],
            courseList:[],
            users:{},
            ChangePassword:0,
            OldPassword:'',
            NewPassword:'',
            course:''
        }
    },
    created(){
        if(JSON.parse(sessionStorage.getItem('TotalCourseList'))){
            this.courseList = JSON.parse(sessionStorage.getItem('TotalCourseList'))
        }else{
            axios.get('/api/online_ems/userinfo/allcourselist').then(
                (res)=>{
                    console.log(res.data)
                    sessionStorage.setItem('TotalCourseList',JSON.stringify(res.data))
                    this.courseList = res.data
                }
            ),
            (error)=>{
                console.log(error.message)
            }
        }
        let user = JSON.parse(localStorage.getItem('user'));
        this.users = user;
        for(let i in user.courses){
        //   this.course += user.courses[i].coursename;
        //   this.course += '；' ;
          this.courseIdList.push(user.courses[i].courseid)
        }
        // this.course = this.course.slice(0,-1);
    },
    methods:{
      onSubmit(){
          if(this.ChangePassword){          
              if(this.OldPassword !== this.users.password){
                this.$alert('原密码输入错误，请再次检查！','提示',{
                    confirmButtonText:'确定',
                })
                return;
              }
              if(this.OldPassword === this.NewPassword){
                this.$alert('新密码与原密码一致！请再次检查','提示',{
                    confirmButtonText:'确定',
                })
                return;
              }
              this.users.password = this.NewPassword;
          }
           this.users.courses = this.checked;
           axios.post("/api/online_ems/userinfo/userupdate",this.users).then(
            (res)=>{    
                console.log(res.data);
                if(this.ChangePassword){
                    this.$alert('修改密码成功，请重新登录！','提示',{
                        confirmButtonText:'确定',
                        callback:()=>{
                            this.$router.push('/login');
                            this.$store.commit('LogOut',"");
                        }
                    })
                }else{
                    localStorage.setItem('user',JSON.stringify(this.users))
                    localStorage.setItem('courses',JSON.stringify(this.users.courses))
                    window.alert(res.data);
                }
            },
            (error)=>{
                console.log(error.message);
            }
            
        )
      },
    },
}
</script>

<style scoped>
.Editbox {
    background-color: rgb(240, 240, 240);
    width: 100%;
    padding: 0 30px;
    margin: 0;
    position: relative;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */
}
.title{
    /* background-color: aquamarine; */
    width: 100%;
    margin-top: 0;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    margin-bottom: 35px;
}
.title span{
    font-size: 20px;
}
hr{
    margin-top:3px;
    *margin: 0;
    border: 0;
    color:rgb(60,140,189);
    background-color:rgb(60,140,189); 
    height: 2.5px
}
.boxchild{
    background-color:white;
    width: 700px;
    /* height: 90vh; */
    margin-left: 15%;
    border-radius: 5px;
    padding-left: 70px;
    padding-top: 30px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-input,.el-select,.el-checkbox-group {
  width: 80%;
  height: 50px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-checkbox-group{
    height: 100%;
}
.text_input{
    width: 80%;
}
span {
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
}
.el-radio{
    margin-bottom: 10px;
}
.el-button{
    margin-top: 30px;
    margin-bottom: 40px;
}
</style>