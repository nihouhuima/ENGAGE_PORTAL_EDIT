<template>
  <div class="edit_change">
    <!-- {{ myinfo() }} -->
        <div class="changet_top">
            
            <router-link :to="{name: 'EditResource'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> update information for {{ myresourceinfo.name }}</p>
        </div>
        <table class="edit_table">
            <tr><td>Modify</td><td>Key</td><td>Value</td></tr>
            
            <tr class="edit_tr">
                <td class="edit_img_center"></td>
                <td>Name</td>
                <td>{{ myresourceinfo.name }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"></td>
                <td>University</td>
                <td>{{ myresourceinfo.university }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='description';dialogVisible=true;"></td>
                <td>Description</td>
                <td>{{ myresourceinfo.description }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='url';dialogVisible=true;"></td>
                <td>URL</td>
                <td>{{ myresourceinfo.url }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='type';dialogVisible=true;"></td>
                <td>Type</td>
                <td><p v-for="ty in myresourceinfo.type" :key="ty">{{ ty }} </p></td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='access';dialogVisible=true;"></td>
                <td>Access</td>
                <td>
                    {{ myresourceinfo.access }}
                </td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='audience';dialogVisible=true;"></td>
                <td>Audience</td>
                <td><p v-for="au in myresourceinfo.audience" :key="au">{{ au }} </p></td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='contact';dialogVisible=true;"></td>
                <td>Contact</td>
                <td><p v-for="(cont,index) in myresourceinfo.contact" :key="index">{{ cont.detail }} : {{ cont.email }} {{ cont.url }}</p></td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="attri='language';dialogVisible=true;"></td>
                <td>Language</td>
                <td><p v-for="lang in myresourceinfo.language" :key="lang">{{ lang }} </p></td>
            </tr>
        </table>
       
         <!-- pop up for modify one keyword -->
         
         <el-dialog
        title="Modification"
        :visible.sync="dialogVisible"
        width="30%">
            <p>Name: <el-input v-model="myresourceinfo.name" @change="existname()"></el-input></p>
            <p>University: </p>
            <p>Description: <el-input v-model="myresourceinfo.description"></el-input></p>
            <p>URL: <el-input v-model="myresourceinfo.url"></el-input></p>
            <p>Audience: </p>
            <p>Type: </p>
            <p>Access: </p>
            <p>Contact: </p>
            <p>Language: </p>
            
            <el-input v-model="modifiedinfo.content"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;getdata();">Cancel</el-button>
                <el-button type="primary" @click="modifyWord()">Confirm</el-button>
            </span>
        </el-dialog>
        


    
    <!-- {{ this.$route.query.name }} -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'ChangeOneResource',
    data(){
        return{
            resources:[],
            myresourceinfo:{},
            
            dialogVisible:false,
            attri:'',
            uniquename:true,
            modifiedinfo:{
                name: this.$route.query.name,
                tag:'',
                content:''}
        }
    },
    methods:{
        getdata(){
            const path = `${this.GLOBAL.BASE_URL}resources`;
            axios.get(path)
            .then((res) => {
                // console.log(res.data);
                this.resources = res.data;
                // console.log(this.resources);
                // return res.data;
                for(var i = 0; i <this.resources.length; i++) {
                // console.log(this.resources[i].name)
                    if(this.resources[i].name==this.$route.query.name){
                        this.myresourceinfo=this.resources[i];
                        // console.log(this.myresourceinfo)
                    }
                }
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        modifyWord(){
            console.log(this.uniquename);
        },
        existname(){
            if(this.myresourceinfo.name!=this.$route.query.name){
                const path = `${this.GLOBAL.BASE_URL}resources_name/${this.myresourceinfo.name}`;
                axios.get(path)
                .then((res) => {
                    console.log(res.data);
                    if(res.data.has){
                        // console.log(res.data);
                        this.uniquename=false;
                    }
                })
                .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
                });
            }
        }
    },
    created(){
        this.getdata();
        // this.myinfo();
        // console.log(this.resources)
    }
}
</script>

<style>

</style>