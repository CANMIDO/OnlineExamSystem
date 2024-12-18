<template>
<div class="page">
    <div class="Sidebox">
    <div class="boxchild">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          >
        <el-menu-item index="1" route="/enter/edit" active-text-color="#178EF1">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息设置</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
            <i class="el-icon-bell"></i>
            <span>考试信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" route="/enter/examindex" v-show="!isTeacher">在线考试</el-menu-item>
              <el-menu-item index="2-2" @click="toResult" v-show="isTeacher">学生考试结果信息</el-menu-item>
              <el-menu-item index="2-3" @click="toEdit" v-show="isTeacher">试卷修改</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item active-text-color="#178EF1" @click="quit">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">退出登录 </span>
        </el-menu-item>
        </el-menu>
    </el-col>
    </div>    
    </div>
    <router-view></router-view>
</div>
  
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  name:"SideBar",
  data() {
    return {
        isTeacher:true,
    }
  },
  created(){
    const UserType = localStorage.getItem('type');
    UserType === '0' ? this.isTeacher = true : this.isTeacher = false;
  },
  methods:{
    ...mapMutations(["LogOut"]),
    quit(){
        this.$confirm('确定退出登录？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          this.LogOut('');
          this.$router.push('/login');
        });
    },
    toResult(){
      this.$router.push({
        path:'/enter/courseList',
        query:{
          from:'result'
        }
      })
    },
    toEdit(){
      this.$router.push({
        path:'/enter/courseList',
        query:{
          from:'edit'
        }
      })
    }
  }
}
</script>

<style scoped>
/* 需要做样式调整，二级列表高亮会超出边界区域 */
.page{
    display: flex;
    justify-content: space-between;
}
.Sidebox{
    /* background-color: rgb(232, 25, 91); */
    width: 220px;
}
.boxchild{
    width: 220px;
    display: flex;
    background-color: rgb(174, 209, 253);
}
/* h5{
    text-align: center;
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
} */
.el-menu{
  /* background-color:blueviolet; */
    text-align: left;
    width: 220px;
    height: 150vh;
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 18px;
}
.el-menu-item-group{
    padding-left: 0;
    margin-left: 0;
}
</style>