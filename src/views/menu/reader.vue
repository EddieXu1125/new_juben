<template>
<el-container class="home-container" >
        <!--头部区域-->
  <el-header>
      <div>
          <span>阅读器</span>
      </div>
  </el-header>
  <!--页面主体区-->
  <el-container>
<!--侧边栏-->
      <!-- 通过宽度的调整控制展开和收缩 -->
    <el-aside :width="isCollapse ? '64px': '200px'">

        <!-- 展开和伸缩-->
    <div class="toggle-button" @click="toggleCollapse">|||</div>

<!-- 在左边栏展开和伸缩下面依次展示本剧集中的所有场 -->
    <div id="chang_item_board">
        <!-- 所有场的宽度也随着展开伸缩而变化 -->
        <div style="height:2px;width:isCollapse ? '64px': '180px';background:#ddd;margin:10px 10px;"></div>
        <div class="item" v-for="item in chang_list" :key="item.id">
            <div class='title' v-on:click="$router.push('/menu/e/' + encode(drama_id) + '/' + encode(episode_id) + '/' + encode(item.id))">
            {{item.scene_name}}
            </div>
        </div>
    </div>
    </el-aside>

    <!--右侧内容区-->
    <el-main>

    </el-main>
  </el-container>
</el-container>
</template>
<script>
import "../../assets/css/jeditor.css";
import "../../assets/css/base.css";
import { PullChangData} from '@/api/menu.js';
const $=require("jquery");
const Loadding = require("../../assets/js/loadding").default.Loadding;
const base = require("../../assets/js/base").default;

import { Collapse } from 'element-ui'
//控制展开和收缩的组件

export default {
    props:["encode_drama_id","encode_episode_id"],
    data(){
        return{
            isCollapse: false,
            searchcontent:"",
            ROOT_HOST:ROOT_HOST,
            drama_id:0,
            episode_id:0,
            chang_list:[],
        }; 
    },
    mounted:function(){
        base.reset_rightboard_width();
        var that = this;
        this.drama_id=window.atob(this.encode_drama_id);
        this.episode_id=window.atob(this.encode_episode_id);
        var first_loadding = new Loadding();
        first_loadding.add_title("初始化");
        first_loadding.__init__();
        first_loadding.add_process(
            "拉取数据",
            function(){                
                PullChangData(that.drama_id,'').then((returndata) => {
                    for(var i in returndata[0]){
                        that.chang_list.push(returndata[0][i])
                    }
                })                                  
            }
        );
        first_loadding.start();
    },
    methods:{
        //点击按钮，切换菜单的折叠与展开
        toggleCollapse()
        {
            this.isCollapse=!this.isCollapse;
        },

        encode:function(code){
            return window.btoa(code);
        }

    }
}
</script>
<style>
.home-container{
    height:672.4px;
}
.el-header{
    background-color: #009688;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #FFF;
    font-size: 20px;
    >div {
        display: flex;
        align-items: center;
    }
}
.el-aside{
    background-color: #B2DFDB;
}
.el-main{
    background-color: #EEEEEE;
}
.toggle-button{
    background-color:  #92c9c4;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>