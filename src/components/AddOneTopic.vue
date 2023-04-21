<template>
    <div class="edit_change"> 
        
        <router-link :to="{name: 'EditTopic'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
       
        <div class="edit_add_engage_topic"> 
            <div class="edit_menu_text"> 
                <p class="edit_title"><b>Engage Topic</b> </p>
            </div>
            <table id="edit_add_topic_table"> 
                <tr> 
                    <td><p>*Short Name:</p></td><td><input v-model="wordlist.shortName" type="text" @change="nameexist(0)" required></td><td><p class="alert_name">{{ nameoks }}</p></td>
                </tr>
                <tr> 
                    <td><p>*Full Name :</p></td><td><input v-model="wordlist.FullName" type="text" @change="nameexist(1)" required></td><td><p class="alert_name">{{ nameokf }}</p></td>
                </tr>
            </table>
        </div>


        <div class="edit_add_keywords"> 
            <div class="edit_menu_text"> 
                <p class="edit_title"><b>Keywords</b> </p>
            </div>
            <table>
                <tr><td><p>Language :</p></td><td>
                    <!-- <select v-model="lang" >
                    <option v-for="lan in list_lang" :key="lan">{{lan}}</option></select> -->
                    English
                </td></tr>
            </table>
            <br>
        
            <div class="edit_new_words"> 

               
                    
                    <div>
                        <table><tr><td><p>Type : Single words</p></td>
                        </tr>
                        </table>
                        <p id="edit_espace"> Words<span>  (please separate the words by ",")</span></p>
                        <textarea v-model="wordlist.single_words" rows="4" cols="120"></textarea>
                    </div>  
                    <br>
                    <div>
                        <table><tr><td><p>Type : At least</p></td>
                        </tr>
                        </table>
                        <p id="edit_espace"> Words<span>  (please separate the words by ",")</span></p>
                        <textarea v-model="wordlist.at_least" rows="4" cols="120"></textarea>
                    </div>  
                    <br>
                    <div>
                        <table><tr><td><p>Type : Combined with</p></td>
                        </tr>
                        </table>
                        <p id="edit_espace"> Words<span>  (please separate the words by ",")</span></p>
                        <textarea v-model="wordlist.combined_with" rows="4" cols="120"></textarea>
                    </div>  
                    <!-- <img class="edit_delete_type" @click="deleteOne(index)" src="../assets/trash.svg" /> -->
                
                <!-- <p id="edit_add_set_keywords" @click="addOne()">+ Add a new set of keywords</p> -->
                <div class="addtopic_button_container"> 
                    <button class="addtopic_button" @click="clickConfirm()">Confirm</button>
                    <button class="addtopic_button" @click="cancel()">cancel</button>
                </div>
            
            </div>
        
        </div>








        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'AddOneTopic',
    data(){
        return{
            // topic_type:"",
            lang:"English",
            list_lang:["English","Bulgarian","Dutch","Finnish","French","Italian","German","Norwegian","Spanish"],
            wordlist:{
                shortName:"",
                FullName:"",
                single_words:"",
                at_least:"",
                combined_with:""
            },
            flag: false,
            topic:[],
            nameoks:"",
            nameokf:""

        }
    },
    methods:{
        // getRouterData() {
        //     this.topic_type = this.$route.query.topic_type
        // },
        // addOne(){
        //     this.keywords.push({type:"",text:""});
        //     this.TypesList();
        // },
        // deleteOne(index){
        //     this.keywords.splice(index, 1);
        //     this.TypesList();
        // },
       confirm(){

        if(this.wordlist.shortName!=""){
               // console.log(this.emailcontent)
            const path = `${this.GLOBAL.BASE_URL}addtopic`
            axios.post(path, this.wordlist, {headers:{"Content-Type" : "application/json"}})
            .then((res) => {
                // console.log(res.data);
                this.flag=res.data;
                if(res.data!=false){
                    console.log(res.data);   
                }
            })
            .catch((error)=>{
                console.log(error)
            }) 
            }
            else{
                alert("Complete your message ! ")
            }
        },
       cancel(){
            this.$router.push({
                name: "Edit"
            });
            setTimeout(function(){
                window.location.reload();
            }, 100)
       },
       clickConfirm(){
        if(this.wordlist.shortName!="" && this.wordlist.FullName!=""){
            var shortfound=false
            var fullfound=false
            for(var i =0; i<this.topic.length;i++){
                if( this.topic[i]["topic"]==this.wordlist.shortName){
                    shortfound=true
                }
                if( this.topic[i]["topicFullName"]==this.wordlist.FullName){
                    fullfound=true
                }
            }
            if(shortfound==true){
                alert("short name exists")
            }else if(fullfound==true){
                alert("full name exists")
            }else{
                this.$confirm( "Do you confirm the submission of information?","Confirmation of addition", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"})
                .then(this.confirm())
                .then(()=>{
                    if (this.flag){
                        this.$message("successfully added");
                        this.$router.push({
                        name:"Edit"});
                        setTimeout(function(){
                            window.location.reload();
                        }, 100)
                    }else{
                        this.$message("Failed, please try it later");
                        this.$router.push({
                            name: "Edit"
                        });
                        setTimeout(function(){
                            window.location.reload();
                        }, 100)
                    }
                    
                })
                .catch(function(err){
                    alert(err);
                })
                }
            
        }else{
            alert("Complete your message! Fields marked with an asterisk are required.")
        }
        
       },
       nameexist(x){
            var find=false
            if(x==0){
                
                for(var i=0; i<this.topic.length; i++){
                    if( this.topic[i]["topic"]==this.wordlist.shortName){
                    this.nameoks = "The topic name already exists"
                    find = true
                    }
                }
                if(find==false){
                            this.nameoks = ""}
            }else{
                for(var j=0; j<this.topic.length; j++){
                    if(this.topic[j]["topicFullName"]==this.wordlist.FullName){
                    this.nameokf = "The topic name already exists"
                    find = true
                }}
                if(find==false){
                            this.nameokf = ""}
            }

       }
    },
    created(){
        // this.getRouterData();
        for(var m in this.$route.query){
            this.topic.push(this.$route.query[m])
        }
    }, 
    computed:{
        
    }

    
}
</script>