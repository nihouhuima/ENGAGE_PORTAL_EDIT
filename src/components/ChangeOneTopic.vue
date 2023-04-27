<template>
    <div class="edit_change">

        <div class="changet_top">
            <router-link :to="{name: 'EditTopic'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> Modify information for the topic: {{this.topic }} ({{ this.fullTopic }})</p>
        </div>

        <div v-for="(lan, index) in terms" :key="index">

            <div class="edit_content_container"> 
                <div class="edit_menu_text"> 
                    <p class="changet_subtitle">language : {{ lan.language }}</p>
                </div>  
            </div>
            <div v-for="(typew, key) in typeList" :key="key" class="changet_words_div">
            <!-- <div v-for="typew in readtypeword(lan)" :key="typew" class="changet_words_div"> -->
                <div class="edit_content_container"> 
                    <p class="change_topic_type">{{ typew }}</p>
                </div>
                 
                <div class="changet_words">
                    <div v-for="word in returnWords(key, lan)" :key="word" class="changet_each_word">
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

        <div class="edit_content_container"> 
            <div class="edit_menu_text"> 
                <p class="changet_subtitle changet_addlan" @click="addLan()">Add another language<b> + </b></p> 
            </div>  
        </div>

        <!-- pop up for modify one keyword -->
        <el-dialog
        title="Modification"
        :visible.sync="dialogVisible"
        width="30%">
            <p>Original keyword: </p>
            <p><b>{{ modif.changed }}</b></p><br>
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
            selected:'',
            terms:{},
            wordlist:[],
            dialogVisible:false,
            dialogVisibleAdd:false,
            dialogVisibleType: false,
            flag: false,
            topic:"",
            fullTopic:"",
            modif:{
                lanTarget:"",
                type:"",
                changed:"", //word replaced
                newWord:"", //word to change
                wordlist:[]
            },
            newType:{
                lanTarget:"",
                type:"",
                listType:[]
            },
            // typeList:["singleWord","atLeast","combinedWith"],
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
        addtypeword(lan){
            var list=Object.keys(lan)
            console.log(list)
            var typeword=[]
            const list1 = ["atLeast", "singleWord", "combinedWith"]
            for(var i=0; i<list1.length;i++){
                if (list.indexOf(list1[i])==-1){
                    typeword.push(list1[i])
                }
            }
            return typeword
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
        refreshPage(){
            setTimeout(function(){
                        window.location.reload();
                    }, 1500)
            return true
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
    }

    },
    created(){
        this.terms = JSON.parse(sessionStorage.getItem("element")).terms
        this.topic = JSON.parse(sessionStorage.getItem("element")).topic
        this.fullTopic = JSON.parse(sessionStorage.getItem("element")).topicFullName
        // console.log(Object.entries(this.typeList)) 
    },
    watch:{
        dialogVisible: {
            immediate:true,
            handler(){
                this.modif.newWord=""
            }
        },
        dialogVisibleAdd: {
            immediate:true,
            handler(){
                this.modif.newWord=""
            }
        }
    }
    
}
</script>