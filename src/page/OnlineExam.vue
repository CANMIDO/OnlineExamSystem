<template>
  <div class="pagebox">
    <div class="boxchild">
        <div class="header">
            <div class="header_left">
                <i class="el-icon-back"></i>
                <div class="header_title">返回</div>
            </div>
            <div class="header_content">详情页面</div>
        </div>
        <div class="quesion-list">
            <div class="question_item"
            v-for="(item,index) in Question.list" :key="item.number">
            
            <div class="stem">{{index + 1}}.{{item.stem}}</div>
            <div class="select_box">
              <div>                
                  <ul class="select"> 
                    <li>
                      <input type="radio" :name="item.number" id="" value="A">
                      <label for="A">A. {{item.optionA}}</label>
                    </li>
                    <li>
                      <input type="radio" :name="item.number" id="" value="B">
                      <label for="B">B. {{item.optionB}}</label>
                    </li>
                    <li>
                      <input type="radio" :name="item.number" id="" value="C">
                      <label for="C">C. {{item.optionC}}</label>
                    </li>
                    <li>
                      <input type="radio" :name="item.number" id="" value="D">
                      <label for="D">D. {{item.optionD}}</label>
                    </li>
                    
                </ul>
              </div>

            </div>
            <hr>
            </div>
            
        </div>
        <div class="onSubmit">
            <el-button type="success" @click="open()">提交试卷</el-button>
        </div>
        <div class="count-box">
          <p>倒计时{{hour}}:{{minute}}:{{second}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'OnlineExam',
  beforeRouteEnter: (to, from, next) => {
      let type = localStorage.getItem('type')
      if(type === '0'){
          window.alert('您不是学生，无法进入考试')
          console.log(from,to)
          next((vm)=>{
              vm.$router.replace(from.path)
          })
      }else{
          next()
      }
  },
  beforeRouteLeave(to,from,next){
    if(!this.submit){
      // this.$confirm('尚未保存试题，确定离开？','提示',{
      //   confirmButtonText:'确定',
      //   cancelButtonText:'取消',
      //   type:'warning'
      // }).then(()=>{
      //   next()
      // }).catch(()=>{
      //   next(false)
      // })
      const answer = window.confirm('还未保存试题，确认离开？')
      if(answer){
        next()
      }else{
        next(false)
      }
    }
  },
  methods:{
    timeFormat(timeStamp){
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      return  year + "/" + month + "/" + date +" "+hh+":"+mm +":"+ss;

    },
    add(){
      this.timer = window.setInterval(()=>{
          if(this.hours !== 0 && this.minutes === 0 && this.seconds === 0){
              this.hours -= 1;
              this.minutes = 59;
              this.seconds = 59
          }else if (this.hours === 0 && this.minutes !== 0 && this.seconds ===0) {
              this.minutes -= 1;
              this.seconds = 59;
          }else if (this.hours === 0 && this.minutes === 0 && this.seconds ===
              0) {
              this.seconds = 0
              this.open()
              window.clearInterval(this.timer)
          }else if (this.hours !== 0 && this.minutes !== 0 && this.seconds ===
              0) {
              this.minutes -= 1;
              this.seconds = 59;
          }else{
              this.seconds -= 1;
          }

      },1000)
    },
    num(n){
      return n < 10 ? '0' + n : ''+ n;
    },
    open() {
        clearInterval(this.timer)
        this.submit = 1
        let time = this.timeFormat(new Date())
        this.$confirm('即将提交试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          this.result.time = time
          //收集表单数据
          for(let i = 0;i < this.sum;i++){
            this.flag = 1
            let temp = {}
            //取得试题编号
            let id = this.Question.list[i].number
            let radio = document.getElementsByName(id)
            //遍历按钮
            for(let j=0;j<4;j++){
              if(radio[j].checked){
                temp.number = id;
                temp.answer = radio[j].value;
                this.resultList.push(temp);
                this.flag = 0;
                break;
              }
            }
            if(this.flag){
              temp.number = id;
              temp.answer = 'Z';
              this.resultList.push(temp);
            }
          }
          this.result.answerList = this.resultList
          this.result.id = this.$route.query.id
          this.result.courseid = this.$route.query.courseid

          console.log(this.result)
          axios.post('/api/online_ems/stuexam/savescore',this.result).then(
            (res)=>{
              this.$alert(res.data)
              
            },
            (error)=>{
              console.log(error).message
            }
          )
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });          
         });
    }
  },
  created(){
     let ques = JSON.parse(sessionStorage.getItem('course'))
     this.Question.list = ques;
     this.sum = ques.length;
     this.submit = 0
  },
  data() {
      return {
          submit:0,
          flag:1,
          hours:1,
          minutes:0,
          seconds:10,
          result:{},
          resultList:[],
          sum:4,
          Question:{
              list:[],
          }
      }
  },
  watch:{  
    second: {
      handler(newVal) {
        this.num(newVal)
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal)
      }
    },
    hour: {
      handler(newVal) {
        this.num(newVal)
      }
    }
  },
  computed: {
    second(){
      return this.num(this.seconds)
    },
    minute(){
      return this.num(this.minutes)
    },
    hour(){
      return this.num(this.hours)
    }
  },
  mounted(){
    this.add();
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.pagebox{
    background-color: rgb(240, 240, 240);
    padding-top: 2%;
    padding: 0 10%;
}
.boxchild{
    background-color: white;
    padding-top: 20px;
    padding: 0 10%;
    position: relative;
}
.header { 
  display: flex; 
  height: 60px;
  line-height: 60px;
  margin-bottom: 50px;
}
.header_left { 
  display: flex; 
  /* margin-left: 10%; */
  margin-right: 30px;
  height: 100%;
  /* background-color: blue; */
}
.header_title,.el-icon-back{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  font-size: 18px;
  color: #303133;
  font-weight: 500;
  line-height: 60px;
  cursor: pointer;
}
.el-icon-back{
    padding-right: 4px;
}

.header_content{
    font-size: 23px;
    color: #303133;
    font-weight: 400;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
} 
.question_item{
    /* background-color: antiquewhite; */
    margin-bottom: 20px;
    font-size: 16px;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
.select_box{
    /* background-color: rgb(75, 146, 122); */
    margin-top: 25px;
}
.el-radio{
    margin:10px 20px 5px 8px;
    width: 15px;
    height: 15px;
}
input{
    margin:10px 20px 5px 8px;
    width: 15px;
    height: 15px;
}
hr{
    margin-top:13px;
    *margin: 0;
    border: 0;
    color:rgb(232,232,232);
    background-color:rgb(232,232,232); 
    height: 1px;
    
}
.onSubmit{
    display: flex;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 100px;
}
.count-box{
  display: flex;
  color: white;
  background-color: red;
  height: 25px;
  width: fit-content;
  border-radius: 8px;
  position: fixed;
  right: 20px;
  bottom: 10px;
}
</style>