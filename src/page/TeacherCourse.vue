<template>
  <div class="page">
    <div class="box">
        <div class="title">
            <span>您的课程列表</span>
            <hr>
        </div>
        <div class="coursebox">
          <h5>选择课程</h5>
          <hr>
          <div class="course_item"
          v-for="(item,index) in list" :key="item.courseid">
          <span class="badge">{{index + 1}}</span>
          <strong><a class="course_name" @click="Revice(item.courseid,item.coursename)">{{item.coursename}}</a></strong>
          <hr>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name:'TeacherCourse',
  data() {
    return {
      list:[
        {
          id:'001',
          stem:'微积分'
        },
        {
          id:'002',
          stem:'数据结构'
        },
        {
          id:'003',
          stem:'离散数学'
        },
      ]
    }
  },
  methods:{
    Revice(cid,cname){
      let temp = {}
      temp.courseid = cid
      if(this.$route.query.from === 'edit'){
        //想要进入编辑页面，给课程ID拿到试卷
        axios.post("/api/online_ems/teacourselist/seetestpaper",temp).then(
          (res)=>{
            console.log(res.data);
            //把试卷交给sessionStorage存储,
            sessionStorage.setItem('course',JSON.stringify(res.data));
          },
          (error)=>{
            console.log(error.message);
          }
        )
        this.$router.push({path:'/paperedit',query:{courseid:cid,coursename:cname}});
      }else if(this.$route.query.from === 'result'){
        this.$router.push({path:'/enter/result',query:{courseid:cid}})
      }
    }
  },
  created(){
    //拿到用户的课程列表
    let clist = JSON.parse(localStorage.getItem('courses'));
    this.list = clist;
  },
  // beforeRouteEnter: (to, from, next) => {
  //   let type = localStorage.getItem('type')
  //   if(type === '1'){
  //       window.alert('您不是老师，无法进入课程查看')
  //       console.log(from,to)
  //       next((vm)=>{
  //           vm.$router.replace('/enter')
  //       })
  //   }else{
  //       next()
  //   }
  // },
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
    margin-bottom: 40px;
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
span{
    font-family: "Microsoft YaHei",微软雅黑,"Arial","Hiragino Sans GB","Helvetica","sans-serif";
    font-size: 13px;
}
.coursebox{
  /* background-color: blueviolet; */
  margin: 0 14%;
  
}
.course_item{
  /* background-color: bisque; */
  padding-top: 14px;
  height: 36px;
  line-height: 36px;
}
h5{
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 25px;
}
.badge{
  display: inline-block;
    padding: .25em .4em;
    margin-right: 5px;
    color: #fff;
    background-color: #007bff;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
strong{
    font-size: 17px;
    text-decoration: none;
    background-color: transparent;
    /* background-color: aqua; */
}
.course_name{
 color:#366392;
}
strong:hover{
  text-decoration: underline;
  cursor: pointer;
}
.coursebox hr{
   /* margin-top:10px; */
    *margin: 0;
    border: 0;
    color:rgb(222,226,230);
    background-color:rgb(222,226,230); 
    height: 1px;
}
</style>