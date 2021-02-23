<template>
<el-container class="home-container" >

 <!--头部区域-->
  <el-header>
      <div class="backto iconfont" @click="$router.push('/menu/index/')">&#xe6a8;</div>
      <div style='display: flex;
        align-items: center'>
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

<el-menu :collapse="isCollapse"
collapse-transition="false">
    <div id="chang_item_board">
        <!-- 所有场的宽度也随着展开伸缩而变化 -->      
        <div class="item" v-for="item in chang_list" :key="item.id">
            <div class='title' v-on:click="$router.push('/menu/e/' + encode(drama_id) + '/' + encode(episode_id) + '/content')">
            {{item.scene_name}}
            </div>
        </div>
    </div>
</el-menu>
    </el-aside>

    <!--右侧内容区-->
    <el-main>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import "../../assets/css/jeditor.css";
import "../../assets/css/chang.css";
import "../../assets/css/base.css";
import { pulldata } from '@/api/reader.js';
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
            drama_id:0,
            episode_id:0,
            chang_list:[],
            chang_id2idx:{},

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
                pulldata(that.drama_id,that.episode_id).then((returndata) => {
                    for(var i in returndata[0]){
                        that.chang_list.push(returndata[0][i])
                        that.chang_id2idx[returndata[0][i].id] = i;
                    }
                    console.log(that.chang_list)
                    console.log('这是chang_id2idx')
                    console.log(that.chang_id2idx)
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
html,body{width:100%;height:100%;}
span{
    text-align:center;
    display:inline-block
}
.home-container{
    height: 100vh;  
}
.el-header{
    background-color: #a1badb;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #FFF;
    font-size: 25px;
}
.el-aside{
    background-color: #EEEEEE;
    height: 100vh;
    overflow-y: scroll;
}
.el-main{
    background-color: #EEEEEE;
}
.toggle-button{
    background-color:  #87879c;
    font-size: 10px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>