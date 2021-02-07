<template>
    <div class="main_board">
        <div class="center_main">
            <div class="backto iconfont" @click="$router.push('/menu/')">&#xe6a8;</div>        
            <div class="searchbar">
                <el-select
                    @keyup.enter.native="(searchcontent==''?null:$router.push('/board/e/'+encode(drama_id) + '/'+encode(searchcontent)))"
                    class="search_input"
                    v-model="searchcontent"
                    filterable
                    placeholder="请输入剧本名称"
                >
                    <el-option
                        style="width: 100%;"
                        v-for="item in episode_data"
                        :key="item.id"
                        :label="item.episode_name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <div class="search_btn">
                    <div class="btn" @click="(searchcontent==''?null:$router.push('/board/e/'+encode(drama_id) + '/'+encode(searchcontent)))">Search</div>
                </div>
            </div>
            <div class="item_board">
                <div class="jumu_item" v-for="episode in episode_data" :key="episode.id" 
                @dblclick="">
                <!-- $router.push('/menu/e/'+encode(drama.id)+'/allCards') -->
                    <div v-on:click="" class="title">{{episode.episode_name}}</div>
                    <!-- $router.push('/menu/e/'+encode(drama_id)+'/allCards') -->
                    <div class="c_time">{{episode.c_time}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import "../../assets/css/jeditor.css";
import "../../assets/css/base.css";
import { PullChangData , PullJiData , CreateJi , UpdateChang } from '@/api/menu.js';
const $=require("jquery");
const Loadding = require("../../assets/js/loadding").default.Loadding;
const base = require("../../assets/js/base").default;
export default {
    props:["encode_drama_id"],
    data(){
        return{
            drama_id:0,
            searchcontent:"",
            episode_data:[],
            episode_data_map:{},
            add_new_show:false,
            form_cover:false,
            delete_show:false,
            edit_show:false,
            need_to_delete:-1,
            new_episode:{
                "episode_name":"",
                "main_roles":"",
                "episode_rank":"",
            },
            edit_episode:{
                "id":"",
                "episode_name":"",
                "main_roles":"",
                "episode_rank":"",
            }
        }
    },
    mounted:function(){
        base.reset_rightboard_width();
        var that = this;
        this.drama_id=window.atob(this.encode_drama_id);
        var first_loadding = new Loadding();
        first_loadding.add_title("初始化");
        first_loadding.__init__();
        first_loadding.add_process(
            "拉取数据",
            function(){                
                PullJiData(that.drama_id,'').then((returndata) => {
                    that.episode_data = returndata.episode;
                    that.characters = returndata.character;
                    for(var i=0;i<returndata.episode.length;i++){
                        that.episode_data_map[returndata.episode[i].id]=i;
                    }
                })                                  
            }
        );
        first_loadding.start();
    },
    methods:{
        encode:function(code){
            return window.btoa(code);
        }
    }
}
</script>
<style scoped>
.el-button--primary,.el-button--primary:focus,.el-button--primary.is-active, .el-button--primary:active{background:  #009688;}

.el-button--primary:hover {
    background:  #009688;
    border-color: #009688;
    color: #FFF;
}

</style>
