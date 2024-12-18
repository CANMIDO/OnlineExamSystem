<template>
  <div class="enterbox">
    <div class="boxchild" :style="styles">
        <button>立即登录/注册</button>
    </div>
  </div>
</template>

<script>
// import picture from '../assets/backgroud.png'
export default {
  name:'UserEnter',
}
</script>

<style>
.boxchild{
    width:'100%';
    height: 90vh;
    background-color:rgb(170, 207, 223);
}
button{
    border: none;
    text-align: center;
    background-color: rgb(198, 151, 243);
    color: white;
    text-decoration: none;
    font-size: 20px;
    padding: 15px 32px;
    display: inline-block;
    border-radius: 15px;
}
</style>