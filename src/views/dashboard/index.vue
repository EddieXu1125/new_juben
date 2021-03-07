<template>
  <!-- 展示最近阅读的场 -->
          <div class="item_board">
                <el-row :gutter="10" style="width:100%;">
                    <el-col :span="4" v-for="chang in selected_chang" :key="chang.id">
                        <el-card class="chang_card">
                            <el-row class="chang_card_title  textEllipsis">{{chang.scene_name}}</el-row>
                            <div class="content" @dblclick="to_showcontent(chang.id)">
                                    <div class="item">
                                        <div class="item_title iconfont">&#xe79e;</div>
                                        <div class="item_content textEllipsis">
                                            {{chang.scene_type}}
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item_title iconfont">&#xe8ae;</div>
                                        <div class="item_content textEllipsis">
                                        {{chang.weather}}
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item_title iconfont">&#xe601;</div>
                                        <div class="item_content textEllipsis">
                                        {{chang.scene_time}}
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item_title iconfont">&#xe632; </div>
                                        <div class="item_content textEllipsis">
                                        {{chang.scene_location}}
                                        </div>
                                    </div>
                            </div> 
                        </el-card>
                    </el-col>
                </el-row>
          </div>
</template>

<script>
import '../../assets/css/jeditor.css'
const Storage = window.localStorage
var time = new Date()
export default {
  props: ['encode_drama_id', 'encode_episode_id'],
  data(){
    return{
       selected_chang:[],
    }
  },
  mounted: function(){
    
  },

  methods:{
    to_showcontent(item){
      
    }

  }
}
</script>

<style lang="scss" scoped>
.item_board .item{
    width: 100%;
    height: 20px;
    padding: 5px 0px;
    box-sizing: border-box;
    margin:5px 0px;
}
.item_board .item_title{
        float: left;
    height: 20px;
    line-height: 20px;
    width: 20px;
}

.item_board .item_content{
        background: rgb(245, 245, 245);
    border-radius: 10px;
    padding: 0px 5px;
    float: left;
    height: 20px;
    text-align: justify;
    line-height: 20px;
    width: calc(100% - 30px);
}
</style>
