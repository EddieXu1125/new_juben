<template>
    <div  class="main_board app-container">
        <div class="center_main">
            <!-- 搜索框 -->
            <div class="searchbar">
                <el-select
                        @keyup.enter.native="(searchcontent==''?null:$router.push('/menu/e/'+encode(searchcontent)))"
                        class="search_input"
                        v-model="searchcontent"
                        filterable
                        placeholder="请输入剧本名称"
                        >
                    <el-option
                            style="width: 100%;border-radius: 5px;margin: 5px;"
                            v-for="item in jumu_data"
                            :key="item.id"
                            :label="item.drama_name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <div class="search_btn">
                    <div class="btn" @click="(searchcontent==''?null:$router.push('/menu/e/'+encode(searchcontent)))">Search</div>
                </div>
            </div>
            <!-- 剧目板 -->
            <div class="item_board">
                <div class="jumu_item" id="new_add_jumu_item">
                    <div class="title" id="new_jumu" style="cursor:pointer;" v-on:click="add_new_show=true;">新建剧目</div>
                </div>
                <div style="height:180px;width:2px;background:#ddd;margin:20px 10px;"></div>
                <div class="jumu_item" v-for="drama in jumu_data" :key="drama.id" @dblclick="$router.push('/menu/e/'+encode(drama.id)+'/allCards')">
                    <div v-on:click="$router.push('/menu/e/'+encode(drama.id)+'/allCards')" class="title">{{drama.drama_name}}</div>
                    <div class="c_time">{{drama.c_time}}</div>
                </div>
            </div>
            <!-- 增加新剧目 -->
            <div class="msgBox" id="add_new_jumu_board" v-show="add_new_show">
                <div class="btn close_btn"  v-on:click="add_new_show=false;"></div>
                <div class="title">新建剧目</div>
                <div class="form" id="new_form">
                    <div class="item">
                        <div class="item_title">剧目名称</div>
                        <div class="item_content">
                            <input type="text" v-model="new_drama.drama_name" name="drama_name">
                        </div>
                    </div>
                <div class="item">
                        <div class="item_title">剧目题材</div>
                        <div class="item_content">
                            <input type="text" v-model="new_drama.drama_theme" name="drama_theme">
                        </div>
                    </div>
                <div class="item">
                        <div class="item_title">剧目类型</div>
                        <div class="item_content">
                            <input type="text" v-model="new_drama.drama_type" name="drama_type">
                        </div>
                    </div>
                <div class="item">
                        <div class="item_title">剧目年代</div>
                        <div class="item_content">
                            <input type="text" v-model="new_drama.drama_time" name="drama_time">
                        </div>
                    </div>
                </div>

                <div style="height:40px;margin:10px;margin-top:20px;">
                    <div class="left left_40"><div class="btn reset_btn" v-on:click="reset(new_drama)">reset</div></div>
                    <div class="right right_60"><div class="btn submit_btn"  v-on:click="add_new">submit</div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../../assets/css/jeditor.css";
import "../../assets/css/base.css";
import { pulldata , createdata } from '@/api/menu.js'
const $=require("jquery");
const Loadding = require("../../assets/js/loadding").default.Loadding;
const base = require("../../assets/js/base").default;

export default {
    data(){
        return{
            message:"",
            searchcontent:"",
            jumu_data:[],
            jumu_data_map:{},
            add_new_show:false,
            delete_show:false,
            edit_show:false,
            form_cover:false,
            need_to_delete_id:-1,
            new_drama:{
                "drama_name":"",
                "main_roles":"",
                "drama_theme":"",
                "drama_type":"",
                "drama_time":""
            },
            edit_drama:{
                "id":"",
                "drama_name":"",
                "main_roles":"",
                "drama_theme":"",
                "drama_type":"",
                "drama_time":""
            }
        }
    },
    mounted:function(){
        base.reset_rightboard_width();
        var that=this;
        console.log(that);
        var first_loadding = new Loadding();
        first_loadding.add_title("初始化");
        first_loadding.__init__();
        first_loadding.add_process(
            "拉取数据",
            function(){
                pulldata('').then((returndata) => {
                    console.log(returndata);
                    that.jumu_data=returndata;
                    for(var i=0;i<returndata.length;i++){
                        that.jumu_data_map[returndata[i].id]=i;
                    }
                })
            }
        );
        first_loadding.start();
    },
    methods:{
        reset:function(item){
            for(let i in item){item[i]=""}
        },
        add_new:function(){
            var that = this;
            var new_form = $("#new_form");
            var items = new_form.find(".item input");
            for(var i = 0; i < items.length; i ++ ){
                if(items[i].value.length == 0){
                    items[i].style.border = "2px dashed #E57373";
                    setTimeout(function(){
                        items[i].style.border = "0px dashed transparent";
                    },1000);
                    return;
                }
            }
            var add_loadding=new Loadding();
            const param =  that.new_drama;
            add_loadding.add_title("新建剧目");
            add_loadding.__init__();
            add_loadding.add_process(
                "新建",
                function () {
                    createdata(param).then(returndata => {
                        that.jumu_data.push(returndata);
                        that.jumu_data_map[returndata.id]=that.jumu_data.length-1;
                        that.reset(that.new_drama);
                    }).catch( () => {
                        throw "wrong create drama";
                    })
                }
            );
            add_loadding.start(function(){that.add_new_show=false;});
        },
        encode:function(code){
            return window.btoa(code);
        }
    }
}
</script>

<style scoped>

</style>
