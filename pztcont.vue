<template>
      <div class="pztcont">
          <div id="mountNode"></div> 
      </div>
</template>


<script>
import G2 from '@antv/g2';
export default {
    data(){
        return{
    pieData: [
        { value: 335, name: '0-19/岁' },
        { value: 310, name: '20-29/岁' },
        { value: 234, name: '30-39/岁' },
        { value: 135, name: '40-49/岁' },
        { value: 1548, name: '50-59/岁' },
        { value: 1548, name: '60-69/岁' },
        { value: 1548, name: '70-200/岁' },
      ],
      valuecount:"",
        }

    },
    created(){
     var that=this;
     var count=0;
     for(var i=0;i<that.pieData.length;i++){
         count+=parseInt(that.pieData[i].value);
     }
     that.valuecount=count;
    },
    mounted(){
     this.getDrawing();
    },
    methods:{
          getDrawing(){
          var that=this; 
          
   var chart = new G2.Chart({
    container: 'mountNode',
    forceFit: true,
    height:500,/*宽高 */
    width:500,
    field:true,
    count:that.valuecount,
  });
  /* var sumCount=0;
   for(var i=0;i<that.pieData.length;i++){
       sumCount+=parseInt(that.pieData[i].value);
   };
   console.log(that.sumCount);*/
   chart.source(that.pieData,{
    
    value: {
      formatter: function formatter(val) {
       
        val = val/5658*100;
       val=val.toFixed(2)+"%";
        return val;
      }
    }
  });
  chart.coord('theta', {
    radius: 0.75
  });
  chart.tooltip({
    showTitle: false,
    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    
  });
  chart.intervalStack().position('value').color('name').label('value', {
    formatter: function formatter(val, name) {
      return name.point.name;
    }
  }).tooltip('name*value', function(name, value) {
       value= value/5658*100;
        value=value.toFixed(2)+"%";
    return {
      name: name,
      value: value
    };
  }).style({
    lineWidth: 1,
    stroke: '#fff'
  });
  chart.legend('field', {
      position:"right"
});
  chart.render();
          }
    }

}
</script>

<style>

</style>