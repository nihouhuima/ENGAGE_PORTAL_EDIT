<template>
  <div class="edit_change">
    <!-- {{ myinfo() }} -->
        <div class="changet_top">
            
            <router-link :to="{name: 'EditResource'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> update information for {{ myresourceinfo.name }}</p>
        </div>
        <table class="edit_table">

            <tr class="edit_tr">
                <td>Name</td>
                <td><el-input type="text" v-model="modifiedinfo.modified.name"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <td>University</td>
                <td><div v-for="un in filter.university" :key="un.shortName">
                    <input  type="radio" :id="un.shortName" :value="un.shortName" v-model="modifiedinfo.modified.university">
                    <label :for="un.shortName">{{un.longName}}</label>
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Description</td>
                <td><el-input type="text" v-model="modifiedinfo.modified.description"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <td>URL</td>
                <td><el-input type="text" v-model="modifiedinfo.modified.url"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <td>Type</td>
                <td><div v-for="ty in filter.type" :key="ty.Type_normalise">
                    <input name="type" type="checkbox" :value="ty.Type_normalise" v-model="modifiedinfo.modified.type"> {{ty.Type_normalise}}
                    </div>
                    <!-- <p v-for="ty in myresourceinfo.type" :key="ty">{{ ty }} </p> -->
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Access</td>
                <td>
                    {{ myresourceinfo.access }}
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Audience</td>
                <td><p v-for="au in myresourceinfo.audience" :key="au">{{ au }} </p></td>
            </tr>
            <tr class="edit_tr">
                <td>Contact<el-button round @click="addcontact()">+</el-button></td>
                <td><div v-for="(cont,index) in modifiedinfo.modified.contact" :key="index">
                    <p>{{ index+1 }}<el-button round @click="removecontact(index)">x</el-button></p>
                    Detail : <el-input type="text" v-model="modifiedinfo.modified.contact[index].detail"></el-input>
                    Email : <el-input type="text" v-model="modifiedinfo.modified.contact[index].email"></el-input>
                    URL : <el-input type="text" v-model="modifiedinfo.modified.contact[index].url"></el-input>
                </div></td>
            </tr>
            <tr class="edit_tr">
                <td>Language</td>
                <td><p v-for="lang in langs" :key="lang">
                    {{ lang }}<input name="type" type="checkbox" :value="lang" v-model="modifiedinfo.modified.language"> </p></td>
            </tr>
        </table>
        <el-button type="primary" @click="addRes()">confirm</el-button>
       
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
            langs:['English', 'French', 'German', 'Italian', 'Spanish', 'Dutch','Bulgarian','Norwegian','Swedish','Latin'],
            modifiedinfo:{
                oldname: this.$route.query.name,
                modified:{
                    name: "",
                    university:"",
                    description:"",
                    url:"",
                    type:[],
                    access:"",
                    audience:[],
                    contact:[
                    ],
                    language:[]
                }},
            filter:{}
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
                        this.modifiedinfo.modified.name = this.resources[i].name
                        this.modifiedinfo.modified.university = this.resources[i].university
                        this.modifiedinfo.modified.description = this.resources[i].description
                        this.modifiedinfo.modified.url = this.resources[i].url
                        this.modifiedinfo.modified.type = this.resources[i].type
                        this.modifiedinfo.modified.language = this.resources[i].language
                        this.modifiedinfo.modified.contact = this.resources[i].contact
                        this.modifiedinfo.modified.audience = this.resources[i].audience
                        this.modifiedinfo.modified.access = this.resources[i].access
                        
                    }
                }
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        getFilter(){
            const path = `${this.GLOBAL.BASE_URL}resources_filter`;
            axios.get(path)
            .then((res) => {
                // console.log(res.data);
                this.filter = res.data;
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
        },
        addcontact(){
            this.modifiedinfo.modified.contact.push({'email': null,'url':null,'detail':null})
        },
        removecontact(index){
            if(index!=0){
                this.$delete(this.modifiedinfo.modified.contact, index)
            }
        },
        addRes(){
            const path = `${this.GLOBAL.BASE_URL}modifyresources`;
            axios.post(path, this.modifiedinfo, {headers:{"Content-Type" : "application/json"}})
            .then((res) => {
                // console.log(res.data);
                if(res.data.modify){
                    alert("New resource added successfully");
                }
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    },
    created(){
        this.getdata();
        this.getFilter();
        // this.myinfo();
        // console.log(this.resources)
    }
}
</script>

<style>

</style>