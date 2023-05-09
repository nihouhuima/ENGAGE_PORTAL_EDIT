<template>
  <div class="edit_change">
    <!-- {{ myinfo() }} -->
        <div class="changet_top">
            
            <router-link :to="{name: 'EditResource'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> Please add a new resource</p>
        </div>

        <table class="edit_table">

            <tr class="edit_tr">
                <td valign="top">Name</td>
                <td><el-input type="text" v-model="modifiedinfo.modified.name" required></el-input> <span  v-if="!this.uniquename" class="alert_name">Resource name exists</span></td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">University</td>
                <td>
                    <div v-for="un in filter.university" :key="un.shortName">
                    <input  type="radio" :id="un.shortName" :value="un.shortName" v-model="modifiedinfo.modified.university" required>
                    <label :for="un.shortName">{{ un.NameAffiche }} - {{un.longName}}</label>
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">Description</td>
                <td><el-input type="textarea" rows="3" v-model="modifiedinfo.modified.description"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">URL</td>
                <td><el-input type="text" v-model="modifiedinfo.modified.url"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">Type</td>
                <td>
                    <div class="resource_card_container">
                        <div v-for="ty in filter.type" :key="ty.Type_normalise" >
                            <div v-if="ty.Type_normalise!='Other'" class="resource_card">
                                <input  name="type" type="checkbox" :value="ty.Type_normalise" v-model="modifiedinfo.modified.type"> {{ty.Type_normalise}}
                            </div>
                        </div>

                        <div class="resource_card">
                            <input name="type" type="checkbox" value="Other" v-model="modifiedinfo.modified.type"> Other
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">Access</td>
                <td>
                    <div v-for="ac in filter.access" :key="ac.Access">
                    <input  type="radio" :id="ac.Access" :value="ac.Access" v-model="modifiedinfo.modified.access">
                    <label :for="ac.Access">{{ac.Access}}</label>
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">Audience</td>
                <td>
                    <div class="resource_card_container">
                        <div v-for="au in filter.audience" :key="au" class="resource_card">
                        <input name="audience" type="checkbox" :value="au" v-model="modifiedinfo.modified.audience"> {{ au}}
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">Contact</td>
                <td>
                    <div  v-if="modifiedinfo.modified.contact.length>0">
                        <div v-for="(cont,index) in modifiedinfo.modified.contact" :key="index" class="resource_card">
                        <table class="ChangeRe_table"> 
                            <tr> 
                                <td>
                                    Detail : 
                                </td>
                                <td> 
                                    <el-input type="text" v-model="modifiedinfo.modified.contact[index].detail"></el-input>
                                </td>
                                <td rowspan="3">
                                    <p><el-button round @click="removecontact(index)">Delete</el-button></p>
                                </td>
                            </tr>
                            <tr> 
                                <td>
                                    Email : 
                                </td>
                                <td> 
                                    <el-input type="text" v-model="modifiedinfo.modified.contact[index].email"></el-input>   
                                </td>
                            </tr>
                            <tr> 
                                <td>
                                    URL : 
                                </td>
                                <td> 
                                    <el-input type="text" v-model="modifiedinfo.modified.contact[index].url"></el-input>   
                                </td>
                            </tr>
                        </table>
                    </div>    
                </div>
                <el-button round @click="addcontact()">Add</el-button>
                </td>
            </tr>
            <tr class="edit_tr">
                <td valign="top">Language</td>
                <td>
                    <div class="resource_card_container">
                        <div v-for="lang in langs" :key="lang" class="resource_card">
                        <input name="type" type="checkbox" :value="lang" v-model="modifiedinfo.modified.language">{{ lang }} 
                        </div>
                    </div>
                </td>
            </tr>
        </table> 
       <!-- {{ modifiedinfo.modified }} -->
         <!-- pop up for modify one keyword -->
         
        <div class="resource_buttons">
            <span slot="footer" class="dialog-footer resource_buttons">
                <el-button @click="cancel()">cancel</el-button>
                <el-button type="primary" @click="addRes()">Confirm</el-button>
            </span>
        </div>
    <!-- {{ this.$route.query.name }} -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'AddOneResource',
    data(){
        return{
            filter: {},
            uniquename:true,
            langs:['English', 'French', 'German', 'Italian', 'Spanish', 'Dutch','Bulgarian','Norwegian','Swedish','Latin', 'Other'],

            modifiedinfo:{
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
                }
            }
        }
    },
    methods:{
        addRes(){
            if(this.uniquename==true){
                this.$confirm(`Do you want to add resource "${this.modifiedinfo.modified.name}"?`, "confirmation", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"
                })
                .then(()=>{this.add()}) 
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
        add(){
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
                            message:"successfully added",
                            duration: 1500
                            })
                }
            })
            .catch((error)=>{
                console.log(error)
            });
        },
        cancel(){
            this.$router.push({
                name: "EditResource"
            });
        },
        getFilter(){
            const path = `${this.GLOBAL.BASE_URL}resources_filter`;
            axios.get(path)
            .then((res) => {
                console.log(res.data);
                this.filter = res.data;
                console.log(this.filter)
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        existname(){
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
            
        },
        addcontact(){
            this.modifiedinfo.modified.contact.push({'email': null,'url':null,'detail':null})
        },
        removecontact(index){
            if(index!=0){
                this.$delete(this.modifiedinfo.modified.contact, index)
            }
        },
    },
    created(){
        this.getFilter();
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