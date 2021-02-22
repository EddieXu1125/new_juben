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
                <div class="jumu_item" v-for="drama in jumu_data" :key="drama.id" @dblclick="$router.push('/menu/e/'+encode(drama_id)+'/')">
                    <div v-on:click="$router.push('/menu/e/'+encode(drama.id)+'/')" class="title">{{drama.drama_name}}</div>
                    <div class="c_time">{{drama.c_time}}</div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import "../../assets/css/jeditor.css";
import "../../assets/css/base.css";
import { pulldata} from '@/api/menu.js'
const $=require("jquery");
const Loadding = require("../../assets/js/loadding").default.Loadding;
const base = require("../../assets/js/base").default;

export default {
    data(){
        return{
            message:"",
            searchcontent:"",
            jumu_data:[]
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

</style>
