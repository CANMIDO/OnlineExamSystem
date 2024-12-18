<template>
<!-- 该组件用于老师查看学生的所有考试成绩 -->
<div class="page">
    <div class="box">
      <div class="title">
        <span>学生考试结果查询</span>
        <hr>
      </div>
      <span class="tip">可点击行首查看学生历次成绩</span>
      <div class="boxchild">
          <el-table
            :data="StudentExamData"
            style="width: 100%"
            stripe
            border
            size="medium"
            highlight-current-row>
            <!-- v-show ，props.row是一个对象，包含所有信息-->
            <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="right" inline class="demo-table-expand">
                <el-form-item label="第一次考试时间" v-show="props.row.n !== 0">
                    <span>{{ props.row.time1 }}</span>
                </el-form-item>
                <el-form-item label="第一次考试分数" v-show="props.row.n !== 0">
                    <span>{{ props.row.score1 }}</span>
                </el-form-item>
                <el-form-item label="第二次考试时间" v-show="props.row.n === 2 || props.row.n === 3">
                    <span>{{ props.row.time2 }}</span>
                </el-form-item>
                <el-form-item label="第二次考试分数" v-show="props.row.n === 2 || props.row.n === 3">
                    <span>{{ props.row.score2 }}</span>
                </el-form-item>
                <el-form-item label="第三次考试时间" v-show="props.row.n === 3">
                    <span>{{ props.row.time3 }}</span>
                </el-form-item>
                <el-form-item label="第三次考试分数" v-show="props.row.n === 3">
                    <span>{{ props.row.score3 }}</span>
                </el-form-item>
                <el-form-item label="提示" v-show="props.row.n === 0">
                    <span>{{ props.row.tip }}</span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column
            label="学生姓名"
            label-class-name="label"
            prop="name"
            width="300">
            </el-table-column>
            <el-table-column
            label="考试科目"
            label-class-name="label"
            prop="coursename"
            width="300">
            </el-table-column>
            <el-table-column
            label="最高成绩"
            label-class-name="label"
            prop="topgrade"
            width="300">
            </el-table-column>
            <el-table-column 
            label="是否合格"
            label-class-name="label"
            prop="hege"
            width="300">
            </el-table-column>
        </el-table>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'ExamResult',
  data() {
      return {        
        StudentExamData: []
      }
  },
  created(){
    //挂载以后请求数据
    let shuju = {courseid:this.$route.query.courseid}
    axios.post('/api/online_ems/gradelist/seegradelist',shuju).then(
    (res)=>{
      console.log(res.data);
      let data = res.data; //做一个中转变量
      for(let i = 0;i < data.length;i++){
        data[i].topgrade = 0;
        data[i].n = data[i].list.length;
        if(data[i].n){
          for(let j = 0;j < data[i].n;j++){
            if(data[i].list[j].score > data[i].topgrade){
              data[i].topgrade = data[i].list[j].score
            }
          }
          if(data[i].topgrade >= 60){
            data[i].hege = '合格'
          }else{
            data[i].hege = '不合格'
          }
        }else{
          data[i].hege = '暂无考试成绩'
          data[i].topgrade = '暂无考试成绩'
        }
        //完成对象的渲染处理
        if(data[i].n === 0){
          data[i].tip = '该考生暂未参加考试'
        }else if(data[i].n === 1){  
          data[i].score1 = data[i].list[0].score;
          data[i].time1 = data[i].list[0].time;
        }else if(data[i].n === 2){        
          data[i].score1 = data[i].list[0].score;
          data[i].time1 = data[i].list[0].time;
          data[i].score2 = data[i].list[1].score;
          data[i].time2 = data[i].list[1].time;
        }else{
          data[i].score1 = data[i].list[0].score;
          data[i].time1 = data[i].list[0].time;
          data[i].score2 = data[i].list[1].score;
          data[i].time2 = data[i].list[1].time;
          data[i].score3 = data[i].list[2].score;
          data[i].time3 = data[i].list[2].time;
        }
      } 
      //把处理好的对象上传到会话存储
      sessionStorage.setItem('StudentResult',JSON.stringify(data));
      this.StudentExamData = data;
    },
    (error)=>{
      console.log(error.message)
    }
    )
    
  },
  beforeRouteEnter: (to, from, next) => {
    let type = localStorage.getItem('type')
    if(type === '1'){
        window.alert('不是老师，无法查看所有学生信息')
        console.log(from,to)
        next((vm)=>{
            vm.$router.replace(from.path)
        })
    }else{
        next()
    }
  },
}
</script>

<style scoped>
.page{
    width: 100%;
    background-color: rgb(240, 240, 240);
    padding: 0 30px;
    margin: 0;
    position: relative;
}
.box{
  width: 100%; 
  /* background-color: antiquewhite; */
}
.tip{
  color: #999999;
  display: block;
  padding-left: 8px;
  margin-bottom: 3px;
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

.demo-table-expand {
    font-size: 0;
  }
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    margin-left:60px;
    width: 30%;
}
.lable{
    font-weight: bolder;
    font-size: 20px;
} 
.el-table{
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
}
span{
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 13px;
}
</style>