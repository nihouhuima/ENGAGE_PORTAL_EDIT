<template>
  <div class="edit_change">
    <!-- {{ myinfo() }} -->
        <div class="changet_top">
            
            <router-link :to="{name: 'EditResource'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> update information for {{ modifiedinfo.modified.name }}</p>
        </div>
        <table class="edit_table">

            <tr class="edit_tr">
                <td>Name</td>
                <td>
                    <el-input type="text" v-model="modifiedinfo.modified.name"></el-input>
                    <span  v-if="!this.uniquename" class="alert_name">Resource name exists</span>
                </td>
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
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Access</td>
                <td>
                    <div v-for="ac in filter.access" :key="ac.Access">
                    <input  type="radio" :id="ac.Access" :value="ac.Access" v-model="modifiedinfo.modified.access">
                    <label :for="ac.Access">{{ac.Access}}</label>
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Audience</td>
                <td>
                    <div v-for="au in filter.audience" :key="au">
                    <input name="audience" type="checkbox" :value="au" v-model="modifiedinfo.modified.audience"> {{ au}}
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Contact</td>
                <td><p v-for="(cont,index) in modifiedinfo.modified.contact" :key="index">{{ cont.detail }} : {{ cont.email }} {{ cont.url }}</p></td>
            </tr>
            <tr class="edit_tr">
                <td>Language</td>
                <td><p v-for="lang in modifiedinfo.modified.language" :key="lang">{{ lang }} </p></td>
            </tr>
        </table>
       <!-- {{ modifiedinfo.modified }} -->
         <!-- pop up for modify one keyword -->
         
        <span slot="footer" class="dialog-footer">
            <router-link :to="{name: 'EditResource'}"><el-button>cancel</el-button></router-link>
            <el-button type="primary" @click="changeRe()">confirm</el-button>
        </span>
        


    
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
            
            dialogVisible:false,
            attri:'',
            uniquename:true,
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
                        this.modifiedinfo.modified.name = this.resources[i].name
                        this.modifiedinfo.modified.university = this.resources[i].university
                        this.modifiedinfo.modified.description = this.resources[i].description
                        this.modifiedinfo.modified.url = this.resources[i].url
                        this.modifiedinfo.modified.type = this.resources[i].type
                        this.modifiedinfo.modified.language = this.resources[i].language
                        this.modifiedinfo.modified.contact = this.resources[i].contact
                        this.modifiedinfo.modified.audience = this.resources[i].audience
                        this.modifiedinfo.modified.access = this.resources[i].access
                        console.log(this.modifiedinfo.modified)
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
            if(this.modifiedinfo.modified.name!=this.$route.query.name){
                const path = `${this.GLOBAL.BASE_URL}resources_name/${this.modifiedinfo.modified.name}`;
                axios.get(path)
                .then((res) => {
                    console.log(res.data.has);
                    if(res.data.has=="true" || res.data.has==true){
                        this.uniquename=false;
                    }else{
                        this.uniquename=true;
                    }
                })
                .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
                });
            }
        },
        changeRe(){
            if(this.uniquename==true){
                this.$confirm(`Do you confirm your modification?`, "confirmation", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"
                })
                .then(()=>{this.change();}) 
                .catch((error)=>{
                    this.$notify.error({
                                title: "failure",
                                message: error,
                                duration: 1500
                            })    
                    })
            }else{
                this.$notify.error({
                                title: "failure",
                                message: "Resource name exists",
                                duration: 1500
                            })
            }
            
            
            
        },
        change(){
            const path = `${this.GLOBAL.BASE_URL}modifyresources`;
            axios.post(path, this.modifiedinfo, {headers:{"Content-Type" : "application/json"}})
            .then((res) => {
                // console.log(res.data);
                if(res.data.insert){
                    this.$router.push({
                            name:"EditResource",
                        })
                    this.$notify({
                            type:"success",
                            message:"successfully changed",
                            duration: 1500
                            })
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
    },
    watch:{
        'modifiedinfo.modified.name': {
            handler(){
                if(this.modifiedinfo.modified.name!=""){
                    this.existname()
                }
                
            }
        }
    }
}
</script>

<style>

</style>