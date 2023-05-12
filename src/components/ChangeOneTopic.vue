<template>
    <div class="edit_change">

        <div class="changet_top">
            <router-link :to="{name: 'EditTopic'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> Modify information: </p>
        </div>

        <div class="edit_content_container"> 
            <div class="edit_menu_text"> 
                <p class="changet_subtitle">General information</p>
            </div>  
        </div>

        <table id="edit_add_topic_table"> 
                <tr> 
                    <td><p>*Short Name :</p></td><td><el-input v-model="element.topic" type="text" @change="nameexist(0)" required>{{ element.topic }}</el-input></td><td><p class="alert_name">{{ nameoks }}</p></td>
                </tr>
                <tr> 
                    <td><p>topic short Explanation :</p></td><td><el-input v-model="element.topicshortname" type="text">{{ element.topicshortname }}</el-input></td><td></td>
                </tr>
                <tr> 
                    <td><p>topic Full Explanation :</p></td><td><el-input v-model="element.topicFullName" type="text"> {{ element.topicFullName }}</el-input></td><td><p class="alert_name"></p></td>
                </tr>
                <tr> 
                    <td><p>URL :</p></td><td><el-input v-model="element.url" type="text">{{ element.url }}</el-input></td><td></td>
                </tr>
                <tr><td><p>*Topic picture :</p></td>
                    <td>
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
                    </td>
                    <td></td>
                </tr>
        </table>

        <div class="edit_content_container"> 
            <div class="edit_menu_text"> 
                <p class="changet_subtitle">Keywords</p>
            </div>  
        </div>

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
                    <div v-for="(word, indexw) in returnWords(key, lan)" :key="word" class="changet_each_word">
                    <!-- <div v-for="word in lan[typew]" :key="word" class="changet_each_word"> -->
                        <div><p class="changet_word_it" @click="selectWord(word, index, key, indexw)">{{ word }}</p> </div>
                        <img src="../assets/croix1.png" alt="delete" @click="deletewords(word, index, key, indexw)" class="changet_img">
                    </div>
                    <div class="changet_each_word each_word_last">
                        <img class="edit_img each_img_add" src="../assets/plus2.png" alt="add" title="Add Keyword" @click="selectAddWord(index, key)">
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

        <!--button for submit form-->
        <div class="resource_buttons">
            <span slot="footer" class="dialog-footer ">
                <el-button @click="cancel()">cancel</el-button>
                <el-button type="primary" @click="changeTopic()">confirm</el-button>
            </span>
        </div>

        <!-- pop up for change one keyword -->
        <el-dialog
        title="Modification"
        :visible.sync="dialogVisible"
        width="30%">
            <p>Original keyword: </p>
            <p><b>{{ modif.word }}</b></p><br>
            <p>new keyword:  </p>
            <el-input v-model="modif.newWord"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">cancel</el-button>
                <el-button type="primary" @click="modifyWord()">confirm</el-button>
            </span>
        </el-dialog>

        <!-- pop up for add one keyword -->
        <el-dialog
        title="Modification"
        :visible.sync="dialogVisibleAdd"
        width="30%">
            <p>Please write down one keyword you want to add:  </p>
            <el-input v-model="modif.newWord"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleAdd = false">cancel</el-button>
                <el-button type="primary" @click="addWord()">confirm</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            element:{},
            topic: [],
            nameoks:"",
            showImg:false,
            fileList: [{url:''}],
            dialogVisibleB: false,
            dialogImageUrl:"",
            dialogVisible: false,
            dialogVisibleAdd: false,
            flag: false,
            formData:"",
            modif: {
                word: "",
                indexLang: "",
                type:  "",
                indexWord: "",
                newWord: ""},

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
        deletewords(word, index, key, indexw){
            this.element.terms[index][key].splice(indexw, 1)
            this.$notify({
                            type:"success",
                            message:"delete registered",
                            duration: 1500
                            })
        },
        selectWord(word, index, key, indexw){
            this.dialogVisible = true
            this.modif.word = word
            this.modif.indexLang = index
            this.modif.type = key
            this.modif.indexWord = indexw
            this.modif.newWord = ""
        },
        modifyWord(){
            if(this.modif.newWord==""){
                this.$message.error("The block can't be empty") 
            }else if(this.modif.newWord==this.modif.word){
                this.$message.error("Please fill in another word other than the original one") 
            }else if(this.Repet(this.modif.newWord, this.element.terms[this.modif.indexLang][this.modif.type])){
                this.$message.error("The keyword already exists") 
            }else{
                this.element.terms[this.modif.indexLang][this.modif.type][this.modif.indexWord] = this.modif.newWord
                this.dialogVisible = false
                this.$notify({
                            type:"success",
                            message:"change registered",
                            duration: 1500
                            })
            }
            
        },
        selectAddWord(index, key){
            this.dialogVisibleAdd = true
            this.modif.indexLang = index
            this.modif.type = key
            this.modif.newWord = ""
            
        },
        wordlist(){
            var list=Object.keys(this.element.terms[this.modif.indexLang])
            if(list.indexOf(this.modif.type)!=-1){
                this.flag = true
                return this.element.terms[this.modif.indexLang][this.modif.type]
            }else{
                this.flag = false
                return ['']
            }
        },
        addWord(){
            if(this.modif.newWord==""){
                this.$message.error("The block can't be empty") 
            }else if(this.Repet(this.modif.newWord, this.wordlist())){
                this.$message.error("The keyword already exists") 
            }else{
                if(this.flag == false){
                    this.element.terms[this.modif.indexLang][this.modif.type] = []
                }
                this.element.terms[this.modif.indexLang][this.modif.type].push(this.modif.newWord)
                this.dialogVisibleAdd = false
                this.$notify({
                            type:"success",
                            message:"Add registered",
                            duration: 1500
                            })
            }
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
                if( this.topic[i]==this.element.topic){
                this.nameoks = "The topic name already exists"
                find = true
                return true
                }
            }
            if(find==false){
                this.nameoks = ""
                return false}
        },
        srcImg(){
            //function for create src of logo
            //data:image/png;base64,{code base64 of image}
            //data:image/jpeg;base64,{code base64 of image}
            //data:image/x-icon;base64,{code base64 of image}
            return "data:"+this.element.pictype+";base64,"+this.element.pic
        },
        handleRemove() {
            this.showImg = !this.showImg
            this.postData.set('changePic', true)
            this.postData.set("file", ""); // file object 
            // this.postData.set("fileName", "");
            this.postData.set("fileType", "")
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file) {
            if(file.size<2000000){
                this.postData.set("changePic",true);
                this.postData.set("file", file["raw"]); // file object 
                this.postData.set("fileType", file["raw"]["type"])
                this.showImg = !this.showImg
            }
            else{
                this.$message.error("Size limit of your image : 2mb");
            }
        },
        cancel(){
            this.$router.push({
                name: "EditTopic"
            });
        },
        changeTopic(){
            if(this.element.topic == ""){
                this.$notify.error({
                            title: "failure",
                            message: "Please write the name of topic! ",
                            duration: 1500
                        })
            }else if(this.nameexist()){
                this.$notify.error({
                            title: "failure",
                            message: "Please choose another name for the topic! ",
                            duration: 1500
                        })
            }else if(this.showImg){
                this.$notify.error({
                            title: "failure",
                            message: "Please choose a photo! ",
                            duration: 1500
                        })
            }else if(this.constrainteTerms()){
                this.$notify.error({
                            title: "failure",
                            message: '"At Least" and "Combined with" should be filled in',
                            duration: 1500
                        })
            }
            else{
                this.$confirm(`Confirm your modification?`, "confirmation", {
                    iconClass : "el-icon-question",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    showClose: true, // Whether or not to display the top right hand corner close button
                    type: "warning"
                    })
                    .then(()=>{this.confirm()}) // to do : success ou failure based on return value
                    .catch((error)=>{
                        this.$notify.error({
                                    title: "failure",
                                    message: error,
                                    duration: 1500
                                })
                })
                
            }
            
        },
        confirm(){
                this.postData.set('topic', this.element.topic)
                this.postData.set('topicFullName', this.element.topicFullName)
                this.postData.set('topicshortname', this.element.topicshortname)
                const str = JSON.stringify(this.element.terms);
                this.postData.set('terms', str)
                this.postData.set('url', this.element.url)
                const path = `${this.GLOBAL.BASE_URL}changeTopic`
                axios.post(path, this.postData, {headers:{"Content-Type": "multipart/form-data"}})
                .then((res) => {
                        if(res.data==true || res.data=="true"){
                            sessionStorage.removeItem("element")
                            this.$router.push({
                                name:"EditTopic",
                            })
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
        getdata(topic){
            const path = `${this.GLOBAL.BASE_URL}keywords`;
            axios.get(path)
            .then((res) => {
                for(var i=0;i<res.data.length;i++){
                    // console.log(this.topic[i]['type']);
                    if (res.data[i]['topic']==topic.topic){
                        this.element = res.data[i]
                    }else{
                        this.topic.push(res.data[i]['topic'])
                    }
                }
            })
            .then(()=>{
                this.postData = new window.FormData(); //create object -- form
                this.postData.append('changePic', false)
                this.fileList[0].url = this.srcImg()
            })
            .catch((error) => {
            console.error(error);
            })
        },
        constrainteTerms(){
            for(var i =0 ; i<this.element.terms.length; i++){
                if(this.element.terms[i]["atLeast"].length == 0 && this.element.terms[i]["combinedWith"].length != 0){
                    return true
                }else if (this.element.terms[i]["atLeast"].length != 0 && this.element.terms[i]["combinedWith"].length == 0){
                    return true
                }
            }
            return false
            
        }

    },
    created(){
        this.getdata(this.$route.query)
       
    },
    
}
</script>