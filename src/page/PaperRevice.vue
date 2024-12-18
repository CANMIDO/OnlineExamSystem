<template>
  <div class="pagebox">
    <div class="boxchild">
        <div class="header">
            <div class="header_left">
                <i class="el-icon-back"></i>
                <div class="header_title" @click="Return">返回</div>
            </div>
            <div class="header_content"></div>
            <div class="header_right">
              <div class="add">
                <i class="el-icon-circle-plus-outline" @click="ShowList"></i>
                <el-button class="add" type="text" @click="ShowList">点我添加试题</el-button>
              </div>
              <div class="search">
                <el-col :span="38">
                  <el-autocomplete
                    class="inline-input"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    clearable
                    placeholder="请输入查询试题内容"
                    suffix-icon="el-icon-zoom-in"
                    @select="handleSelect"
                  ></el-autocomplete>
                </el-col>
              </div>                  
            </div>
        </div>
        <el-dialog title="新增试题" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="form2" label-width="80px">
          <el-form-item label="试题题干">
            <el-input type="textarea" v-model="form2.stem"></el-input>
          </el-form-item>
        
        <el-form-item label="试题类型">
          <el-select v-model="form2.type" placeholder="请选择试题类型">
            <el-option label="多选" value="duoxuan"></el-option>
            <el-option label="单选" value="danxuan"></el-option>
            <el-option label="填空" value="tiankong"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题分值">
          <el-input v-model="form2.value"></el-input>
        </el-form-item>
        <el-form-item label="考试时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择开始时间" v-model="form2.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择开始时间" v-model="form2.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="选项A" v-show="form2.type === 'danxuan' || form.type === 'duoxuan'">
          <el-input v-model="form2.optionA"></el-input>
        </el-form-item>
        <el-form-item label="选项B" v-show="form2.type === 'danxuan' || form.type === 'duoxuan'">
          <el-input v-model="form2.optionB"></el-input>
        </el-form-item>
        <el-form-item label="选项C" v-show="form2.type === 'danxuan' || form.type === 'duoxuan'">
          <el-input v-model="form2.optionC"></el-input>
        </el-form-item>
        <el-form-item label="选项D" v-show="form2.type === 'danxuan' || form.type === 'duoxuan'">
          <el-input v-model="form2.optionD"></el-input>
        </el-form-item>
        <!-- <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item> -->
        <el-form-item label="答案设置" v-show="form2.type === 'duoxuan'">
          <el-checkbox-group v-model="form2.anwser">
            <el-checkbox label="A" name="type1"></el-checkbox>
            <el-checkbox label="B" name="type2"></el-checkbox>
            <el-checkbox label="C" name="type3"></el-checkbox>
            <el-checkbox label="D" name="type4"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="答案设置" v-show="form2.type === 'danxuan'">
          <el-radio-group v-model="form2.answer">
            <el-radio label="A" name="type" value='A'></el-radio>
            <el-radio label="B" name="type" value='B'></el-radio>
            <el-radio label="C" name="type" value='C'></el-radio>
            <el-radio label="D" name="type" value='D'></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="答案设置" v-show="form2.type === 'tiankong'">
          <el-input type="textarea" v-model="form2.answer"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="Create">立即创建</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>  
        </el-dialog>
        <div class="quesion-list">
            <div class="question_item" id=""
            v-for="(item,index) in Question.list" :key="item.number">
            
            <div class="stem">{{index + 1}}.{{item.stem}}</div>
            <div class="select_box">
              <div>
                <ul class="select">
                  <!-- 起定同一个name值就会变成单选框 -->
                    <li>
                      <input type="radio" name="" id="">
                      <label for="">A. {{item.optionA}}</label>
                    </li>
                    <li>
                      <input type="radio" name="" id="">
                      <label for="">B. {{item.optionB}}</label>
                    </li>
                    <li>
                      <input type="radio" name="" id="">
                      <label for="">C. {{item.optionC}}</label>
                    </li>
                    <li>
                      <input type="radio" name="" id="">
                      <label for="">D. {{item.optionD}}</label>
                    </li>
                    
                </ul>
                <div class="edit_button">
                  <el-button
                  size="mini"
                  :id="item.number"
                  @click="Edit($event)">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  :name="item.number"
                  @click="deleteQ($event)">删除</el-button>
              </div>  
              </div>
            </div>
            <hr>
            </div>    
        </div>
        <el-dialog title="试题修改" :visible.sync="dialogForEdit">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="试题题干">
                <el-input type="textarea" v-model="form.stem"></el-input>
              </el-form-item>
              
              <el-form-item label="试题类型">
                <el-select v-model="form.type" placeholder="请选择试题类型">
                  <el-option label="多选" value="duoxuan"></el-option>
                  <el-option label="单选" value="danxuan"></el-option>
                  <el-option label="填空" value="tiankong"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="试题分值">
                <el-input v-model="form.value"></el-input>
              </el-form-item>
              <el-form-item label="选项A" v-show="form.type !== 'tiankong'">
                <el-input v-model="form.optionA"></el-input>
              </el-form-item>
              <el-form-item label="选项B" v-show="form.type !== 'tiankong'">
                <el-input v-model="form.optionB"></el-input>
              </el-form-item>
              <el-form-item label="选项C" v-show="form.type !== 'tiankong'">
                <el-input v-model="form.optionC"></el-input>
              </el-form-item>
              <el-form-item label="选项D" v-show="form.type !== 'tiankong'">
                <el-input v-model="form.optionD"></el-input>
              </el-form-item>
              <el-form-item label="答案设置" v-show="form.type === 'duoxuan'">
                <el-checkbox-group v-model="form.answer">
                  <el-checkbox label="A" name="type1" value='A'></el-checkbox>
                  <el-checkbox label="B" name="type2" value='B'></el-checkbox>
                  <el-checkbox label="C" name="type3" value='C'></el-checkbox>
                  <el-checkbox label="D" name="type4" value='D'></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="答案设置" v-show="form.type === 'danxuan'">
                <el-radio-group v-model="form.answer">
                  <el-radio label="A" name="type1" value='A'></el-radio>
                  <el-radio label="B" name="type2" value='B'></el-radio>
                  <el-radio label="C" name="type3" value='C'></el-radio>
                  <el-radio label="D" name="type4" value='D'></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="答案设置" v-show="form.type === 'tiankong'">
                <el-input type="textarea" v-model="form.anwser"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="Edit2()">立即修改</el-button>
                <el-button @click="dialogForEdit = false">取消</el-button>
              </el-form-item>
            </el-form>  
            </el-dialog>      
        <div class="onSubmit">
            <el-button type="success" @click="open">更新表单</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'PaperRevice',
  created(){
    let temp = {};
    temp.courseid = this.id;
    axios.post("/api/online_ems/teacourselist/seetestpaper",temp).then(
      (res)=>{
        //this.$alert(res.data);
        //把试卷交给sessionStorage存储,
        sessionStorage.setItem('course',JSON.stringify(res.data));
        //再次更新页面数据
        this.Question.list = res.data;
        this.sum = res.data.length
      },
      (error)=>{
        console.log(error.message);
      }
    )
  },
  methods:{
    querySearch(queryString,cb){
      var list = this.Question.list;
      for(let i=0;i<this.sum;i++){
        list[i].value = list[i].stem
      }
      var results = queryString ? list.filter(this.createFilter(queryString)) : list;
      cb(results);
    },
    createFilter(queryString){
      return(item)=>{
        return(item.stem.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    handleSelect(item){
      document.getElementById(item.number).scrollIntoView({behavior:'smooth',block:'center'});
    },
    Return(){
      this.$router.push('/enter')
    },
    ShowList(){
        this.dialogFormVisible = true;
    },
    Create(){  
      delete this.form2.type;
      delete this.form2.data1;
      delete this.form2.data2;
      //提交一个试题对象
      this.form2.courseid = this.$route.query.courseid;
      console.log(this.form)
      axios.post("/api/online_ems/teacourselist/addquestion",this.form2).then(
        (res)=>{
          console.log(res.data);
          this.$message('试题提交成功');
          this.dialogFormVisible = false;
        },
        (error)=>{
          console.log(error.message);
        }
      )
      this.form2 = {
            courseid:'',
            value:'',
            stem:'',
            number:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            answer:'',
          }
    },
    open() {
        let temp = {};
        temp.courseid = this.id;
        axios.post("/api/online_ems/teacourselist/seetestpaper",temp).then(
        (res)=>{
          //this.$alert(res.data);
          //把试卷交给sessionStorage存储,
          sessionStorage.setItem('course',JSON.stringify(res.data));
          //再次更新页面数据
          this.Question.list = res.data;
          this.sum = res.data.length
        },
        (error)=>{
          console.log(error.message);
        }
      )
    },
    Edit(e){  
      //console.log(e.currentTarget.id)
      this.editing_id = e.currentTarget.id
      for(let i =0;i < this.sum;i++){
        if(this.Question.list[i].number === e.currentTarget.id){
          this.form = this.Question.list[i];
          break;
        }
      }
      this.dialogForEdit = true;
    },
    Edit2(){
      //表单修改提交
      this.form.number = this.editing_id
      this.form.courseid = this.$route.query.courseid;
      delete this.form.type;
      axios.post('api/online_ems/teacourselist/updatequestion',this.form).then(
        (res)=>{
          console.log(res);
        },
        (error)=>{
          console.log(error.message);
        }
      )
      this.dialogForEdit =false
      this.form = {
            courseid:this.$route.query.courseid,
            value:'',
            stem:'',
            number:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            anwser:''
          }
    },
    deleteQ(e){
      let id = e.currentTarget.name
      //console.log(e.currentTarget.name);
      this.$confirm('将删除该试题，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        //console.log(ee.currentTarget.name);
        let temp = {};
        temp.number = id
        console.log(temp)
        axios.post("/api/online_ems/teacourselist/deletequestion",temp).then(
        (res)=>{
          //console.log(res.data);
          this.$alert(res.data);
        },
        (error)=>{
          console.log(error.message);
        }
       )
      });
    }
  },
  data() {
      return {
          state:'',
          sum:0, //记录试题个数
          editing_id:'', //当前用户正在编辑的试题ID
          id:this.$route.query.courseid, //该页面的课程ID
          dialogForEdit:false,
          dialogFormVisible:false,
          Question:{
            list:[],
          },
          
          form:{
            courseid:this.id,
            value:'',
            number:'',
            stem:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            answer:''
          },
          form2:{
            courseid:this.id,
            value:'',
            number:'',
            stem:'',
            optionA:'',
            optionB:'',
            optionC:'',
            optionD:'',
            answer:''
          },
          
      }
  },
  beforeRouteEnter: (to, from, next) => {
    let type = localStorage.getItem('type')
    if(type === '1'){
        window.alert('不是老师，无法修改试卷')
        console.log(from,to)
        next((vm)=>{
            vm.$router.replace(from.path)
        })
    }else{
        next()
        // next((vm)=>{
        //   let qlist = JSON.parse(sessionStorage.getItem('course'));
        //   vm.Question.list = qlist;
        //   vm.sum = qlist.length
        // })
    }
  },
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
}
.header { 
  display: flex; 
  height: 60px;
  line-height: 60px;
  margin-bottom: 50px;
  /* background-color: aqua; */
}
.header_left { 
  display: flex; 
  /* margin-left: 10%; */
  margin-right: 500px;
  height: 100%;
  width: 200px;
  /* background-color: blue; */
}
.header_right{
    height: 100%;
    width: 100%;
    display: flex;
    /* background-color: antiquewhite; */
}
.search{
  margin-left: 60px;
  /* width: 100%;
  background-color: blueviolet; */
}
.el-autocomplete{
  width: 100%;
}
.el-icon-circle-plus-outline,.add{
  font-size: 15px;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
.el-icon-circle-plus-outline,.add:hover{
    cursor: pointer;
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
/* .header_content{
  background-color: blueviolet;
    font-size: 23px;
    color: #303133;
    font-weight: 400;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}  */
.question_item{
    /* background-color: antiquewhite; */
    margin-bottom: 10px;
    font-size: 16px;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
.select_box{
    /* background-color: rgb(75, 146, 122); */
    margin-top: 25px;
    position: relative;
}
.edit_button{
    width: 125px;
    position:absolute;
    bottom: 0;
    right: 0;
}
.el-button{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
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
</style>