<template>
     <div class="content">
       <div class="container">
      <h4>优化算联盟会员基础权益</h4>
      <div class="table-responsive">
        <table class="table">
        <thead>
    <tr>
      <th>卡种</th>
      <th>黑金卡</th>
      <th>钻石卡</th>
      <th>铂金卡</th>
      <th>金卡</th>
      <th>银卡</th>
      <th>普卡</th>
      <th>适用范围</th>
    </tr>
  </thead>
     <tbody>
        <tr v-for="(item,index) of qylist" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.zhe1}}</td>
             <td>{{item.zhe2}}</td>
             <td>{{item.zhe3}}</td>
            <td>{{item.zhe4}}</td>
              <td>{{item.zhe5}}</td>
               <td>{{item.zhe6}}</td>
                 <td>{{item.address}}</td>
              </tr>
             
        </tbody>

        </table>
        </div>
      </div> 

     </div>
</template>

<script>
export default {
    data(){
     return{
         qylist:[
            {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
             {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
              {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
               {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                 {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                  {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                   {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                    {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                     {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                      {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                       {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                        {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
                         {"name":"消费折扣","zhe1":"8折","zhe2":"8折","zhe3":"8折","zhe4":"8折","zhe5":"8折","zhe6":"9折","address":"酒店ktv"},
             
   ]

     }
    }
}
</script>

<style scoped>
.content{
    width:100%;
    background:#fff;
    text-align:center;
    margin:2rem 0 3rem 0;
}
table th,table td{
     text-align:center;
}
 .table-responsive{
 border-radius:0.8rem;
  margin-top:2rem;  
}
thead{
    background:#ffb61f;
    color:#fff;
}
 tbody tr td:first-child{
     font-weight:bold;
 }
 tbody tr{
     background:#f4f4f4;
 }
 tbody tr:nth-child(2n){
   background: #eaeaea; 
 }
</style>