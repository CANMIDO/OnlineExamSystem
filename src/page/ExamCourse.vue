<template>
  <div class="page">
    <div class="box">
        <div class="title">
          <span>在线考试课程信息</span>
          <hr>
        </div>
        <div class="boxchild">
            <!-- 设计一个表单呈现各个考试科目及历史分数，含进入考试按钮 -->
          <el-table
            :data="ExamData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            stripe
            border
            size="medium"
            >
            <el-table-column
              prop="date"
              label="考试截止日期"
              sortable
              width="300">
            </el-table-column>
            <el-table-column
              prop="coursename"
              label="考试科目"
              width="300">
            </el-table-column>
            <el-table-column
              prop="courseid"
              label="课程编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="lastgrade"
              label="最新考试分数"
              width="200">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <!-- 补一个实现功能，点击重考按钮以后若有成绩，提示框：将重新开始考试，且点击按钮以后页面跳转，考试组件开始挂载 -->
                  <el-button
                  size="mini"
                  type="danger"
                  @click="EnterExam(scope.$index, scope.row)">立即考试</el-button>
              </template>
              <!-- @click="EnterExam(scope.$index, scope.row)">删除</el-button> -->
            </el-table-column>
          </el-table>
        </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name:'ExamCourse',
  methods:{
    EnterExam(index,rowObj){
      console.log(rowObj);
      //拿到课程ID(rowObj.id）申请试卷
      if(rowObj.examnumber === 3){
        this.$alert('已经参加过三次考试！')
        return;
      }
      let temp = {};
      temp.courseid = rowObj.courseid;
      console.log(temp)
      axios.post('/api/online_ems/teacourselist/seetestpaper',temp).then(
        (res)=>{
          //希望res中包含试卷信息
          console.log(res.data);
          sessionStorage.setItem('course',JSON.stringify(res.data))
        },
        (error)=>{
          console.log(error.message)
        }
      )
      let id = localStorage.getItem('id');
      this.$router.push({path:'/examing',query:{courseid:rowObj.courseid,id:id}});
    }
  },
  created(){
    let id = localStorage.getItem('id')
    let temp = {}
    temp.id = id
    axios.post('api/online_ems/stuexam/seeexamlist',temp).then(
      (res)=>{
        sessionStorage.setItem('StuExamData',JSON.stringify(res.data))
        this.ExamData = res.data;
        //若examnumber = 0，则topgrade显示字符串
        for(let i = 0;i < (res.data).length;i++){
          if(this.ExamData[i].examnumber === 0){
            this.ExamData[i].lastgrade = '暂无考试成绩'
          }
        }
      },
      (error)=>{
        console.log(error.message)
      }
    )
  },
  data() {
      return {
        ExamData:[]
      }
  },

}
</script>

<style scoped>
.page{
    position: relative;
    width: 100%;
    background-color: rgb(240, 240, 240);
    padding: 0 30px;
    margin: 0;
}
.box{
  width: 100%;
  /* background-color: aquamarine; */

}
.title{
    width: 100%;
    /* background-color: rgb(63, 74, 71);   */
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
    background-color:rgb(166, 41, 41);
    /* margin-left: 30px; */
    border-radius: 5px;
    /* padding-left: 70px;
    padding-top: 30px; */
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-table{
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 15px;
    text-align: center;
}
/* .el-table-columu label{
  font-weight: bold;
} */
span{
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 13px;
}
</style>