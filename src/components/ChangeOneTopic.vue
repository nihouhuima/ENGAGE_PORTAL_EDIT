<template>
    <div class="edit_change">

        <div class="changet_top">
            <router-link :to="{name: 'EditTopic'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> Modify information for the topic: {{this.element.topic }} ({{ this.element.fullTopic }})</p>
        </div>
        <table id="edit_add_topic_table"> 
                <tr> 
                    <td><p>*Short Name:</p></td><td><el-input v-model="element.topic" type="text" @change="nameexist(0)" required>{{ element.topic }}</el-input></td><td><p class="alert_name">{{ nameoks }}</p></td>
                </tr>
                <tr> 
                    <td><p>topic Full Explanation :</p></td><td><el-input v-model="element.topicFullName" type="text"> {{ element.topicFullName }}</el-input></td><td><p class="alert_name"></p></td>
                </tr>
                <tr> 
                    <td><p>topic short Explanation :</p></td><td><el-input v-model="element.topicshortname" type="text">{{ element.topicshortname }}</el-input></td><td></td>
                </tr>
                <tr> 
                    <td><p>URL :</p></td><td><el-input v-model="element.url" type="text">{{ element.url }}</el-input></td><td></td>
                </tr>
                <tr><td><p>*Topic picture :</p></td>
                    <td>
                        <!-- <img class="change_part_logo" :src="srcImg()"> -->

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
                    <el-dialog :visible.sync="dialogVisibleB">
                        <img class="avatar" width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>

            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleImg = false">cancel</el-button>
                <el-button type="primary" @click="handleClick()">confirm</el-button>
            </span> -->
                </td>
                </tr>
        </table>
        <div v-for="(lan, index) in element.terms" :key="index">

            <div class="edit_content_container"> 
                <div class="edit_menu_text"> 
                    <p class="changet_subtitle">language : {{ lan.language }}</p>
                </div>  
            </div>
            <div v-for="(typew, key) in typeList" :key="key" class="changet_words_div">
            <!-- <div v-for="typew in readtypeword(lan)" :key="typew" class="changet_words_div"> -->
                <div v-if="typew == 'At Least'" class="edit_content_container"> 
                    <p class="change_topic_type">Multiple Terms</p>
                </div>
                <div class="edit_content_container"> 
                    <p class="change_topic_type">{{ typew }}</p>
                </div>
                 
                <div class="changet_words">
                    <div v-for="(word) in returnWords(key, lan)" :key="word" class="changet_each_word">
                    <!-- <div v-for="word in lan[typew]" :key="word" class="changet_each_word"> -->
                        <div><p class="changet_word_it" @click="selectWord(word, lan.language, key, lan[key])">{{ word }}</p> </div>
                        <img src="../assets/croix1.png" alt="delete" @click="deletewords(word, lan.language, key)" class="changet_img">
                    </div>
                    <div class="changet_each_word each_word_last">
                        <img class="edit_img each_img_add" src="../assets/plus2.png" alt="add" title="Add Keyword" @click="selectAddWord(key, lan)">
                    </div>
                </div>
            </div>
       
            
        </div>

        <!-- bloc for add another language -->
        <div class="edit_content_container"> 
            <div class="edit_menu_text"> 
                <!-- <p class="changet_subtitle changet_addlan" @click="addLan()">Add another language<b> + </b></p>  -->
            </div>  
        </div>

        

        

    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            element:{},
            nameoks:"",
            showImg:false,
            fileList: [{url:''}],
            dialogVisibleB: false,
            dialogImageUrl:"",
            formData:"",

            typeList:
                {singleWord: "Single Term",
                 atLeast: "At Least",
                 combinedWith: "Combined With"}
            
            
        }
    },
    methods:{
        returnWords(type, lan){
            var list=Object.keys(lan)
            if(list.indexOf(type)!=-1){
                return lan[type]
            }else{
                return null
            }
        },
        refreshData(){ //refresh the data on this page
            const path = `${this.GLOBAL.BASE_URL}keywords`;
            axios.get(path)
            .then((res) => {
                for(var i=0;i<res.data.length;i++){
                    if (res.data[i]['topic']==this.topic){
                        var str = JSON.stringify(res.data[i]);
                        window.sessionStorage.setItem("element", str)
                        this.terms = res.data[i]['terms']
                    }

                }
            })
            .catch((error) => {
            console.error(error);
            })
        },
        deletewords(word, lan, type){
            this.$confirm(`Do you want to delete the keyword "${word}"?`, "confirmation", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"
            })
            .then(()=>{this.delete(word, lan, type)}) 
            .catch((error)=>{
                this.$notify.error({
                            title: "failure",
                            message: error,
                            duration: 1500
                        })    
                })
        },
        delete(word, lan, type){
            //transfer the word to back-end and then delete it
            const path = `${this.GLOBAL.BASE_URL}deletekeyword/${this.topic}/${word}/${lan}/${type}`
            axios.post(path)
            .then((res) => {
                this.flag=res.data;
                    if(res.data==true || res.data=="true"){
                        this.refreshData()
                        this.$notify({
                            type:"success",
                            message:"successfully deleted",
                            duration: 1500
                            })
                    }else{
                        this.$notify.error({
                            title: "failure",
                            message: "operation failed",
                            duration: 1500
                        })
                    } 
            })
            .catch((error)=>{
                this.$notify.error({
                            title: "failure",
                            message: error,
                            duration: 1500
                        })
            }) 


        },
        selectWord(word, lan, type, wordlist){
            this.dialogVisible = true
            this.modif.changed = word
            this.modif.lanTarget = lan
            this.modif.type = type
            this.modif.wordlist = wordlist
        },
        modifyWord(){
            if(this.modif.newWord==""){
                this.$message.error("The block can't be empty") 
            }else if(this.modif.newWord==this.modif.changed){
                this.$message.error("Please fill in another word other than the original one") 
            }else if(this.Repet(this.modif.newWord, this.modif.wordlist)){
                this.$message.error("The keyword already exists") 
            }else{
                this.$confirm(`Do you want to change keyword "${this.modif.changed}" to "${this.modif.newWord}" for the type "${this.typeList[this.modif.type]}" in ${this.modif.lanTarget}?`, "confirmation", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"
                })
                .then(()=>{this.modify()}) // to do : success ou failure based on return value
                .catch((error)=>{
                    this.$notify.error({
                                title: "failure",
                                message: error,
                                duration: 1500
                            })
            })
            }
            
        },
        modify(){
            const path = `${this.GLOBAL.BASE_URL}editkeyword/${this.topic}/${this.modif.lanTarget}/${this.modif.type}/${this.modif.changed}/${this.modif.newWord}`
            console.log(path)
            axios.post(path)
            .then((res) => {
                this.flag=res.data;
                    if(res.data==true || res.data=="true"){
                        this.dialogVisible=false
                        this.refreshData()
                        this.$notify({
                            type:"success",
                            message:"successfully modified",
                            duration: 1500
                            })
                    }else{
                        this.$notify.error({
                            title: "failure",
                            message: "operation failed",
                            duration: 1500
                        })
                    } 
            })
            .catch((error)=>{
                this.$notify.error({
                            title: "failure",
                            message: error,
                            duration: 1500
                        })
            }) 

            
        },
        selectAddWord(type, lan){
            console.log("lan:"+lan+" type:"+type)
            this.dialogVisibleAdd = true
            this.modif.lanTarget = lan.language
            this.modif.type = type

            var list=Object.keys(lan)
            if(list.indexOf(type)!=-1){
                this.modif.wordlist = lan[type]
            }else{
                return this.modif.wordlist=['']
            }
            
        },
        addWord(){
            if(this.modif.newWord==""){
                this.$message.error("The block can't be empty") 
            }else if(this.Repet(this.modif.newWord, this.modif.wordlist)){
                this.$message.error("The keyword already exists") 
            }else{
                this.$confirm(`Do you want to add keyword "${this.modif.newWord}" for the type "${this.typeList[this.modif.type]}" in ${this.modif.lanTarget}?`, "confirmation", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"
                })
                .then(()=>{this.add()}) 
                .then(()=>{
                    
                })
                .catch((error)=>{
                    this.$notify.error({
                                title: "failure",
                                message: error,
                                duration: 1500
                            })
            })
            }
        },
        add(){
            console.log(this.modif.type)
            const path = `${this.GLOBAL.BASE_URL}keywordslist/${this.topic}/${this.modif.lanTarget}/${this.modif.type}/${this.modif.newWord}`
            console.log(path)
            axios.post(path)
            .then((res) => {
                    if(res.data==true || res.data=="true"){
                        this.dialogVisibleAdd=false
                        this.refreshData()
                        this.$notify({
                            type:"success",
                            message:"successfully added",
                            duration: 1500
                            })
                    }else{
                        this.$notify.error({
                            title: "failure",
                            message: "operation failed",
                            duration: 1500
                        })
                    } 
            })
            .catch((error)=>{
                this.$notify.error({
                            title: "failure",
                            message: error,
                            duration: 1500
                        })
            }) 
        },
        addLan(){

        },
        Repet(target, list){ 
            for (var i=0; i<list.length; i++){
                if(list[i]==target){
                    return true
                }
            }
            return false
        },
        nameexist(){
            var find=false  
            for(var i=0; i<this.topic.length; i++){
                if( this.topic[i]["topic"]==this.wordlist.shortName){
                this.nameoks = "The topic name already exists"
                find = true
                }
            }
            if(find==false){
                        this.nameoks = ""}
        },
        srcImg(){
            //function for create src of logo
            //data:image/png;base64,{code base64 of image}
            //data:image/jpeg;base64,{code base64 of image}
            //data:image/x-icon;base64,{code base64 of image}
            return "data:"+this.element.pictype+";base64,"+this.element.pic
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            // this.showImg=!this.showImg;
            console.log(file)
            this.showImg = fileList.length <1
            this.postData.set('changePic', true)
            this.postData.set("file", ""); // file object 
            this.postData.set("fileName", "");
            this.postData.set("fileType", "")
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file, fileList) {
            this.postData.set('changePic', true)
            this.postData.set("file", file["raw"]); // file object 
            this.postData.set("fileName", file["name"]);
            this.postData.set("fileType", file["raw"]["type"])
            
            // console.log(this.fileList)
            // console.log(file)

            // this.showImg=!this.showImg;
            this.showImg = fileList.length <1

        },

    },
    created(){
        this.element = JSON.parse(sessionStorage.getItem("element"))
        // prepare data structure
        this.postData = new window.FormData(); //create object -- form
        this.postData.append('topic', this.element.topic)
        this.postData.append('topicFullName', this.element.topicFullName)
        this.postData.append('topicshortname', this.element.topicshortname)
        this.postData.append('terms', this.element.terms)
        this.postData.append('changePic', false)
        this.postData.append('url', this.element.url)
        this.fileList[0].url = this.srcImg();

        console.log(this.element)

    },
    watch:{
        
    }
    
}
</script>