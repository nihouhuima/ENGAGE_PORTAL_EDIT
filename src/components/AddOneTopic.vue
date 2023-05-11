<template>
    <div class="edit_change"> 
        
        <router-link :to="{name: 'EditTopic'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
       
        <div class="edit_add_engage_topic"> 
            <div class="edit_menu_text"> 
                <p class="edit_title"><b>Engage Topic</b> </p>
            </div>
            <table id="edit_add_topic_table"> 
                <tr> 
                    <td><p>*Short Name:</p></td><td><el-input v-model="wordlist.shortName" type="text" @change="nameexist(0)" required></el-input></td><td><p class="alert_name">{{ nameoks }}</p></td>
                </tr>
                <tr> 
                    <td><p>topic Full Explanation :</p></td><td><el-input v-model="wordlist.FullName" type="text"></el-input></td><td><p class="alert_name"></p></td>
                </tr>
                <tr> 
                    <td><p>topic short Explanation :</p></td><td><el-input v-model="wordlist.shortex" type="text"></el-input></td><td></td>
                </tr>
                <tr> 
                    <td><p>URL :</p></td><td><el-input v-model="wordlist.url" type="text"></el-input></td><td></td>
                </tr>
                <tr><td><p>*Topic picture :</p></td><td>
                    <el-upload
                    v-model="fileList"
                    ref="uploadref"
                    action="#"
                    :auto-upload="false"
                    list-type="picture-card"
                    :file-list="fileList"
                    :limit="1"
                    :on-change="handleChange"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :class="{hideUpload:!showImg}"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisibleB">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog></td>
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
                        <table><tr><td><p>Single Term</p></td>
                        </tr>
                        </table>
                        <p id="edit_espace"> <span class="add_topic_notif">  (please separate the words by commas, e.g. "access to basic services, aporophobia")</span>:</p>
                        <el-input type="textarea" v-model="wordlist.single_words" rows="4" cols="120" class="add_topix_textarea">example</el-input>
                    </div>  
                    <br>
                    <div>
                        <table>
                            <tr><td><p>Multiple Terms</p></td>
                        </tr>
                            <tr><td><p>At least</p></td>
                        </tr>
                        </table>
                        <p id="edit_espace"> <span class="add_topic_notif">  (please separate the words by commas, e.g. "access to basic services, aporophobia")</span>:</p>
                        <el-input type="textarea" v-model="wordlist.at_least" rows="4" cols="120" class="add_topix_textarea"></el-input>
                    </div>  
                    <br>
                    <div>
                        <table><tr><td><p>Combined with</p></td>
                        </tr>
                        </table>
                        <p id="edit_espace"> <span class="add_topic_notif">  (please separate the words by commas, e.g. "access to basic services, aporophobia")</span>:</p>
                        <el-input type="textarea" v-model="wordlist.combined_with" rows="4" cols="120" class="add_topix_textarea"></el-input>
                    </div>  
                    <!-- <img class="edit_delete_type" @click="deleteOne(index)" src="../assets/trash.svg" /> -->
                
                <!-- <p id="edit_add_set_keywords" @click="addOne()">+ Add a new set of keywords</p> -->
                <div class="addtopic_button_container"> 
                    <el-button @click="cancel()">cancel</el-button> <!--  -->
                    <el-button  type="primary" @click="clickConfirm()">Confirm</el-button> <!-- class="addtopic_button" -->
                    
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
            dialogVisibleB: false,
            dialogImageUrl:"",
            fileList: [],
            lang:"English",
            wordlist:{
                shortName:"",
                shortex:"",
                FullName:"",
                url:"",
                single_words:"",
                at_least:"",
                combined_with:""
            },
            formData:"",
            flag: false,
            topic:[],
            nameoks:"",
            showImg:true

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
        handleRemove() {
            // console.log(file, fileList);
            this.showImg=!this.showImg;
            this.postData="";
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file) {
            this.postData = new window.FormData(); //create object -- form
            this.postData.append("file", file["raw"]); // file object 
            this.postData.append("fileName", file["name"]);
            this.postData.append("fileType", file["raw"]["type"])
            
            // console.log(fileList)
            // console.log(file)
            this.showImg=!this.showImg;
        },
       confirm(){

        if(this.wordlist.shortName!=""){
               // console.log(this.emailcontent)
            const path = `${this.GLOBAL.BASE_URL}addtopic`
            axios.post(path, this.postData, {headers:{"Content-Type": "multipart/form-data"}})
            .then((res) => {
                // console.log(res.data);
                this.flag=res.data;
                // if(res.data!=false){
                //     console.log(res.data);   
                // }
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
                this.$message.error("short name exists") 
            }else if(fullfound==true){
                this.$message.error("full name exists")
            }else if(this.postData==""){
                this.$message.error("Please fill in all necessary information")
            }
            else{
            
                this.postData.set("shortName", this.wordlist.shortName)
                this.postData.set("shortex", this.wordlist.shortex)
                this.postData.set("FullName", this.wordlist.FullName)
                this.postData.set("url", this.wordlist.url)
                this.postData.set("at_least", this.wordlist.at_least)
                this.postData.set("single_words", this.wordlist.single_words)
                this.postData.set("combined_with", this.wordlist.combined_with)
                this.$confirm( "Do you confirm the submission of information?","Confirmation of addition", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"})
                .then(this.confirm())
                .then(()=>{
                    if (this.flag){
                        this.$notify({
                            type:"success",
                            message:"successfully added",
                            duration: 1500
                            })
                        this.$router.push({
                        name:"Edit"});
                    }else{
                        this.$message.error("Failed, please try it later");
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
            alert("Please complete your message! Fields marked with an asterisk are required.")
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