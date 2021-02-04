<template>
    <div id='app' class="main_board app-container">
        <div class="center_main">
            <!-- 搜索框 -->
            <div class="searchbar">
                <el-select
                        @keyup.enter.native="(searchcontent==''?null:to_edit(searchcontent))"
                        class="search_input"
                        v-model="searchcontent"
                        filterable
                        placeholder="请输入场名称"
                        >
                    <el-option
                            style="border-radius: 5px;margin: 5px;"
                            v-for="item in chang_data"
                            :key="item.id"
                            :label="item.scene_name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <div class="search_btn">
                    <div class="btn" @click="to_edit(searchcontent)">Search</div>
                </div>
            </div>
            <!-- 功能按钮 -->
            <el-row>
                <el-tooltip  effect="dark" content="新建场" placement="bottom">
                    <el-button type="primary" :icon="'el-icon-document-add'" circle @click="add_chang_show=true;"></el-button>
                </el-tooltip>
                <el-tooltip  effect="dark" content="编辑场" placement="bottom">
                    <el-button type="primary" :icon="is_edit?'el-icon-check':'el-icon-edit'" circle @click="is_edit=!is_edit"></el-button>
                </el-tooltip>
                <el-button type="primary" :icon="'el-icon-back'" @click="$router.push('/menu/e/'+encode(drama_id)+'/')">剧集管理</el-button>
             
                <el-button @click="select_episode(episode.id)" trigger="click" icon="el-icon-view">                         
                    本剧集中的所有场                  
                </el-button>
        
                <el-button type="primary" style="float:right;" icon="el-icon-folder-add" v-show="is_edit" @click="show_add_to=true;add_to_episode_id=null;">添加至</el-button>
            </el-row>


            <!-- 新建场 -->
            <div class="msgBox" id="add_new_chang_board" style="z-index:11;" v-show="add_chang_show">
                <div class="btn close_btn" id="close_new"  @click="add_chang_show=false;"></div>
                <div class="title">新建场</div>
                <div class="form" id="new_form">

                    <div class="item">
                        <div class="item_title">场名称</div>
                        <div class="item_content">
                            <input type="text" value="" name="scene_name" autocomplete="off">
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_title">场类型</div>
                        <div class="item_content">
                            <input type="text" value="" name="scene_type" autocomplete="off">
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_title">场时间</div>
                        <div class="item_content">
                            <input type="text" value="" name="scene_time" autocomplete="off">
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_title">场地点</div>
                        <div class="item_content">
                            <input type="text" value="" name="scene_location" autocomplete="off">
                        </div>
                    </div>
                </div>
                <div style="height:40px;margin:10px;margin-top:20px;">
                    <div class="left left_40"><div class="btn reset_btn" id="reset_btn" @click="reset_new_chang">reset</div></div>
                    <div class="right right_60"><div class="btn submit_btn" id="submit_btn"  @click="submit_new_chang">submit</div></div>
                </div>
            </div>
           
            <!-- 展示当前剧集里面的场 -->
            <div class="item_board" :class="is_edit?'active':''">
                <el-checkbox-group v-if="chang_data.length > 0" v-model="checkList" style="font-size:1em;width:100%;">
                <el-row :gutter="10" style="width:100%;">
                    <el-col :span="4" v-for="chang in selected_chang" :key="chang.id">
                        <el-card class="chang_card">
                            <el-row class="chang_card_title  textEllipsis">{{chang.scene_name}}</el-row>
                            <div class="content" @dblclick="to_edit(chang.id)">
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
                            <div class="cover_operations">
                                <el-checkbox class="card_checkbox" :label="chang.id" :disabled="chang.episode_id!=-1"></el-checkbox>
                                <el-row  v-if="chang.episode_id!=-1" class="card_checked">
                                    已放入剧集组：<el-link :href="'#/board/e/'+encode(drama_id)+'/'+encode(chang.episode_id)" target="_blank">{{episode_data[episode_data_map[chang.episode_id]].episode_name}}</el-link>
                                </el-row>
                                <el-row class="card_title">{{chang.scene_name}}</el-row>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                </el-checkbox-group>
                <el-row style="text-align:center;width:100%;" v-else><i style="color: #FF9800;margin-right:10px;" class="el-icon-warning"/> 这个剧本还没有任何场</el-row>
            </div>
            <!--  -->
            <el-card class="card_iframe" :class="show_faste?'show':''" v-loading="true">
                <el-button type="danger" icon="el-icon-close" circle style="
                position:absolute;top:10px;right:10px;z-index: 3001;
                "
                @click="show_faste=false;faste_url=''"
                ></el-button>
                <iframe :src="faste_url"></iframe>
            </el-card>
            <!-- 编辑场-->
            <el-dialog
                title="添加至..."
                :visible.sync="show_add_to"
                width="30%"
                :before-close="handleClose">
                <el-row v-if="checkList.length>0">
                    <el-tag style="margin-right:5px" v-for="changid in checkList" :key="changid">{{chang_data[chang_data_map[changid]].scene_name}}</el-tag>
                </el-row>
                <el-row v-else>
                    未选中任何场
                </el-row>
                <el-divider></el-divider>
                <el-row >
                    <el-radio-group v-model="add_to_episode_id">
                        <el-radio :label="episode.id"  v-for="episode in episode_data" :key="episode.id">{{episode.episode_name}}</el-radio>
                        <!-- <el-tag style="margin-right:5px" effect="dark" v-for="episode in episode_data" :key="episode.id">{{episode.episode_name}}</el-tag> -->
                    </el-radio-group>
                </el-row>
                <el-row style="margin-top:20px;">
                    <el-button type="primary" icon="el-icon-circle-plus" @click="add_episode_show=true;">新增剧集</el-button>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="show_add_to = false">取 消</el-button>
                    <el-button type="primary" @click="add_changs_to_episode">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <router-view></router-view>
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
            show_faste:false,
            show_add_to:false,
            faste_url:"",
            searchcontent:"",
            is_edit:false,
            checkList:[],
            add_chang_show:false,
            chang_data_map:{},
            chang_data:[],
            add_episode_show:false,

            episode_data_map:{},
            episode_data:[],
            add_to_episode_id:null,
            selected_episode:{
                episode_name:"",
                episode_id:"",
            },
            selected_chang:[],
        }
    },
    mounted:function(){
        base.reset_rightboard_width();
        var that=this;
        this.drama_id=window.atob(this.encode_drama_id);
        console.log(that);
        var first_loadding = new Loadding();
        first_loadding.add_title("初始化");
        first_loadding.__init__();
        first_loadding.add_process(
            "拉取场数据",
            function(){
                PullChangData(that.drama_id,"").then((returndata) => {
                    returndata=returndata[0];
                    console.log(returndata);
                    for(var j=0;j<returndata.length;j++){
                        that.chang_data.push(returndata[j]);
                        that.selected_chang.push(returndata[j]);
                        that.chang_data_map[returndata[j].id]=j;
                    }
                })
            }
        );
        
        first_loadding.add_process(
            "拉取剧集数据",
            function(){
                PullJiData(that.drama_id,'').then((returndata) => {
                    that.episode_data = returndata.episode;
                    that.characters = returndata.character;
                    for(var i=0;i<returndata.episode.length;i++)
                    {
                        that.episode_data_map[returndata.episode[i].id]=i;
                    }
                })                                  
            }
        );
        first_loadding.start();


     },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        to_edit:function(id){
            let chang = this.chang_data[this.chang_data_map[id]];
            this.show_faste=true;
            setTimeout(()=>{
                this.faste_url = "#/board/faste/"+this.encode(chang.drama_id)+"/"+this.encode(chang.episode_id)+"/"+this.encode(chang.id);
            },500)
        },
        reset_new_chang:function(){
            var new_form = $("#add_new_chang_board");
            var items = new_form.find(".item input");
            items.val('');
        },
        submit_new_chang:function(){
            var that = this;
            var new_form = $("#add_new_chang_board");
            var items = new_form.find(".item input");
            var form = {}
            for(var i = 0; i < items.length; i ++ ){
                if(items[i].value.length == 0){
                    items[i].style.border = "2px dashed #E57373";
                    setTimeout(function(){
                        items[i].style.border = "0px dashed transparent";
                    },1000);
                    return;
                }
                form[items[i].getAttribute("name")] = items[i].value;
            }

            var add_loadding=new Loadding();
            add_loadding.add_title("新建场");
            add_loadding.__init__();
            add_loadding.add_process(
                "新建",
                function(){
                    CreateChang(this.drama_id,form).then((returndata) => {
                            console.log(returndata)
                            that.chang_data.push(returndata[0]);
                            that.chang_data_map[returndata[0].id]=that.chang_data.length-1;
                    })
                }
            );

            add_loadding.start(
                function(){
                    that.add_chang_show=false;
                }
            );

        },
        reset_new_episode:function(){
            var new_form = $("#add_new_episode_board");
            var items = new_form.find(".item input");
            items.val('');
        },
        submit_new_episode:function(){
            var that = this;
            var new_form = $("#add_new_episode_board");
            var items = new_form.find(".item input");
            var form = {}
            for(var i = 0; i < items.length; i ++ ){
                if(items[i].value.length == 0){
                    items[i].style.border = "2px dashed #E57373";
                    setTimeout(function(){
                        items[i].style.border = "0px dashed transparent";
                    },1000);
                    return;
                }
                form[items[i].getAttribute("name")] = items[i].value;
            }

            var add_loadding=new Loadding();
            add_loadding.add_title("新建场");
            add_loadding.__init__();
            add_loadding.add_process(
                "新建",
                function(){
                    CreateJi(that.drama_id,form).then((returndata) => {
                            console.log(returndata)
                            that.episode_data.push(returndata);
                            that.episode_data_map[returndata.id]=that.episode_data.length-1;
                        })         
                }
            );

            add_loadding.start(
                function(){
                    that.add_episode_show=false;
                }
            );

        },

        add_changs_to_episode:function(){
            if(this.checkList.length==0){
                this.$alert('无选中场', '错误', {
                    confirmButtonText: '确定',
                    callback: action => {
                            this.show_add_to=false;
                        }
                    });
                return;
            }
            if(this.add_to_episode_id==null){
                this.$alert('无选中剧集', '错误', {
                    confirmButtonText: '确定',
                    callback: action => {
                            this.show_add_to=false;
                        }
                    });
                return;
            }
            let form={
                "drama_id":this.drama_id,
                "old_episode_id":-1,
                "new_episode_id":this.add_to_episode_id,
                "scene_list":this.checkList
            }
            var that = this;
            var update_loadding=new Loadding();
            update_loadding.add_title("更新场");
            update_loadding.__init__();
            update_loadding.add_process(
                "新建",
                function(){
                    UpdateChang(form).then((returndata) => {
                        console.log(returndata)
                    })                  
                }
            );

            update_loadding.start(
                function(){
                    that.checkList.forEach(id=>{
                        that.chang_data[that.chang_data_map[id]].episode_id=that.add_to_episode_id;
                    })
                    that.checkList.splice(0,that.checkList.length);
                    that.show_add_to=false;
                }
            );
        },
        encode:function(code){
            return window.btoa(code);
        },
        chang_filter(){
            // 筛选出某一剧集中的场
            this.selected_chang = this.chang_data.filter( chang => 
                    this.selected_episode.episode_id == chang.episode_id               
            );
        },
        // current_select(name,id){
        //     //将两个参数打包成一个对象
        //     return {
        //         ep_name:name,
        //         ep_id:id
        //     }
        // },
        select_episode(id){
                // this.selected_episode["episode_name"]=episode.name;
                this.selected_episode["episode_id"]=id;
                this.chang_filter()
            }
            
        },
    }

</script>

<style>
/* global styles */
.card_checkbox .el-checkbox__label{
    display: none;
}
.el-dropdown-link {
    cursor: pointer;
    color: #009688;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/theme.sass";
.chang_card{
    border-radius: 4px;
    position: relative;
    transition: ease .5s;
}
.chang_card:hover{
    box-shadow: 0px 2px 12px rgba(0,0,0,.3);
}
.chang_card_title{
    transition: ease .6s;
    font-weight: bold;
        font-size: 1em;
    line-height: 1.2em;
}
.content{
    height: 120px;
    background: rgba(0,0,0,.02);
    border-radius: 4px;
    transition: ease .6s;
    cursor: pointer;
}
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
.little-item-card{
        height: 15px;
    width: auto;
    padding: 0px 5px;
    background: #263238;
    float: left;
    line-height: 15px;
    border-radius: 10px;
    color: white;
    font-size: 10px;
    margin: 2px;
    position: relative;
}
.cover_operations{
    position: absolute;
    top:0px;
    left: 0px;
    z-index: -1;
    // background:rgba(0,0,0,.1);
    background:white;
    height: 100%;
    width: 100%;
    opacity: 0;
    // backdrop-filter: blur(10px);
    transition: ease .5s;
    transform: scale(.9);
    border-radius: 30px;
}
.active .cover_operations{
    z-index: 10;
    opacity: 1;
    transform: scale(1);
    border-radius: 0px;
}
.active .content{
    transform: scale(.9);
}

.active .chang_card_title{
    transform: scale(.9);
}

.cover_operations .card_checkbox{
    position: absolute;
    right: 10px;
    top: 20px;
    transform: scale(1.3);
}

.cover_operations .card_checked{
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
    font-size: 12px;
}
.cover_operations .card_title{
    position: absolute;
    top: 52px;
    text-align: center;
    width: 100%;
    font-size: 1.2em;
    font-weight: bold;
}


.card_iframe{
    position: absolute;
    top: 10px;
    left: 10px;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding: 0px;
    border-radius: 5px;
    transition:ease .5s;
    z-index:-1;
    transform: scale(.8);
    opacity: 0;
}
.card_iframe.show{
    z-index:1;
    transform: scale(1);
    opacity: 1;
}
.card_iframe iframe{
    position: absolute;
    top:0px;
    left:0px;
    height: 100%;
    width: 100%;
    border-radius: 0px;
    border:1px;
    z-index: 3000;
}

#add_new_episode_board{
    z-index: 2100;
    position: fixed;
}
#add_new_episode_board .cover{
        z-index: -1;
        position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background: transparent;
}

</style>
