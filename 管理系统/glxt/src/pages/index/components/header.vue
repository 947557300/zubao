<template>
   
     <nav class="navbar navbar-default navbar-myself">
                <div class="cont">
                  <!-- Brand and toggle get grouped for better mobile display -->
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <img src="../../../../static/logo.jpg" alt="">
                    </a>
                  </div>
              
                  <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="#">首页</a></li>
                        <li><a href="#">帮助中心</a></li>
                        <li><a href="#">会员联盟</a></li>
                        <li><a href="#">连锁版</a></li>
                    </ul>
                    <div class="nav navbar-nav navbar-right navbar-myright  hidden-sm hidden-xs"><span>申请试用</span></div>
                  </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
              </nav>
            
</template>

<script>
export default {
    data()
    {return{}}
}
</script>

<style scoped>
 .cont{
   width:85%;
  margin:0 auto;
  font-size:1.5rem;
  }
  .navbar{
    margin-bottom:0;
  }
 .navbar-myself{
     width:99%;
     background:#fff;

 }
 .nav > li{
  margin-right:8rem;
 }
 .navbar-default{
  box-shadow:2px 3px 5px #e3e3e3;
   border-color:#fff;
 }
 .navbar-myself .navbar-brand{
    height:7rem;
 }
 .navbar-myself .navbar-brand img{ 
     width:18rem;
    height:5rem;
    }
 #bs-example-navbar-collapse-1 li a{
   height:7rem;
   line-height:5rem;
   color:#000;
 }
 .navbar-right li a{
   background:#00c3d5;
   color:#fff;
   height:2rem !important;
 }
 .navbar-myright{
   height:7rem;
   line-height:8rem;
 }
 .navbar-myright span{
   background:#00c3d5;
   padding:0.6rem 1rem;
   color:#fff;
 }
 .navbar-toggle{
   margin-top:2rem;
 } 
</style>