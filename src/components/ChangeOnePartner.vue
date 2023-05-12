<template>
    <div class="edit_change">
        <div class="changet_top">
            <router-link :to="{name: 'EditPartner'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> update information for {{ element.longName }}</p>
        </div>
        <table class="edit_table">
            <tr class="edit_tr"><td>Modify</td><td>Value</td></tr>
            <tr class="edit_tr">
                <!-- <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('NameAffiche')"></td> -->
                <td>Short Name</td>
                <td><el-input type="text" v-model="modifiedpart.modified.NameAffiche"></el-input></td>
            </tr>
            
            <tr class="edit_tr">
                <!-- <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('longName')"></td> -->
                <td>Full Name</td>
                <td><el-input type="text" v-model="modifiedpart.modified.longName"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <!-- <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('urlhome')"></td> -->
                <td>University homepage URL</td>
                <td><el-input type="text" v-model="modifiedpart.modified.urlhome"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <!-- <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('urlOAI')"></td> -->
                <td>OAI URL</td>
                <td><el-input type="text" v-model="modifiedpart.modified.urlOAI"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <td>Home University publication repository URL</td>
                <td><el-input type="text" v-model="modifiedpart.modified.urlOARepository"></el-input></td>
            </tr>
            <tr class="edit_tr">
                <!-- <td class="edit_img_center"></td> -->
                <td>University Logo</td>
                <td>
                    <!-- <div v-if="haveimg(element)">
                    <img class="change_part_logo" :src="srcImg(element.img)"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('img')"></div>
                    <div v-else>No img preview</div> -->
                    <!-- <img class="change_part_logo" src="../assets/2-L_UTC-AN_13_13_W.jpg"> -->
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
            </tr>
        </table>
        <span slot="footer" class="dialog-footer ">
                <el-button @click="cancel()">cancel</el-button>
                <el-button type="primary" @click="changepart()">confirm</el-button>
        </span>

        

        
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleImg = false">cancel</el-button>
                
                <el-button type="primary" @click="handleClick()">confirm</el-button>
            </span> -->
        

    </div>
</template>

<style>
</style>

<script>

import axios from 'axios';
export default {
    data(){
        return{
            target:"",
            new:"",
            dialogVisible:false,
            element:{ 
            },
            shortNameList:[],
            dialogVisibleImg: false,
            newLogo:{ },
            showImg:false,
            modifiedpart:{
                modified:{
                    NameAffiche:""
                }
            },
            modifiedinfo:{
                partner: "",
                tag:'',
                content:''},
            fileList: [{url:''}],
            dialogImageUrl: "",
            dialogVisibleB:false,
            fileParam: ""
        }
    },
    methods:{
        choosedata(key){
            if(key!='img'){
                // console.log(key)
                // console.log(this.element[key])
                this.target = key
                this.dialogVisible = true
                this.modifiedinfo.content=""
            }else{
                this.dialogVisibleImg = true
            }
            
        },
        showKey(){
            if (this.target == "NameAffiche"){
                return "Short Name"
            }else if(this.target=="longName"){
                return "Full Name"
            }else if(this.target=="urlOAI"){
                return "OAI entre port URL"
            }else if(this.target == "urlOARepository"){
                return "University publication repository URL"
            }else if(this.target == "urlhome"){
                return "University Homepage URL"
            }else{
                return ""
            }
        },
        haveimg(element){
            if(typeof element.img !== 'undefined'){
                return true;
            }
            else{
                return false;
            }
        },
        handleRemove() {
            // console.log(file, fileList);
            this.showImg=!this.showImg;
            this.fileParam.set("iffile",false);
            this.fileParam.delete('file');
            this.fileParam.delete("fileType");
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file) {
            if(file.size<2000000){
                this.fileParam.set("iffile",true);
                // this.fileParam = new window.FormData(); //create object -- form
                this.fileParam.set("file", file["raw"]); // file object 
                // this.fileParam.set("fileName", file["name"]);
                this.fileParam.set("fileType", file["raw"]["type"])
                // this.fileParam.append("partner", this.element.shortName);
                // console.log(fileList)
                this.showImg=!this.showImg; 
            }
            else{
                this.$message.error("Size limit of your image : 2mb");
            }
            
        },
        modifyWord(){
            if(this.modifiedinfo.content==""){
                this.$message.error("The block can't be empty!")
            }else if(this.modifiedinfo.content==this.element[this.target]){
                this.$message.error("Please choose another one!") 
            }else{
                this.$confirm(`Do you want to change "${this.target}" from "${this.element[this.target]}" to "${this.modifiedinfo.content}"?`, "confirmation", {
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
        srcImg(img){
            //function for create src of logo
            //data:image/png;base64,{code base64 of image}
            //data:image/jpeg;base64,{code base64 of image}
            //data:image/x-icon;base64,{code base64 of image}
            return "data:"+img.type+";base64,"+img.code
        },
        getdata(partner){
            const path = `${this.GLOBAL.BASE_URL}/partnerinfo`;
            axios.get(path)
            .then((res) => {
                
                // console.log("element"+this.element.shortName);
                for (var i=0; i<res.data.length; i++) {
                    if (res.data[i]['shortName'] ==partner.partner) {
                        // console.log(res.data[i]['shortname']);
                        this.element = res.data[i];
                    }else{
                        this.shortNameList.push(res.data[i].shortName)
                    }
                }
                
                
            })
            .then(()=>{
                this.modifiedpart.modified=this.element;
                this.fileParam = new window.FormData();
                this.fileParam.append("shortName", this.element.shortName);
                this.fileList[0]['url'] = this.srcImg(this.element.img);
                this.fileParam.set("iffile",false);
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        changepart(){
            if(this.element.NameAffiche!=""&&this.element.longName!=""&&this.element.urlOAI!=""&&this.element.urlhome!=""&&this.element.urlOARepository!=""){
                this.fileParam.set('NameAffiche',this.element.NameAffiche);
                this.fileParam.set('longName',this.element.longName);
                this.fileParam.set('urlOAI',this.element.urlOAI);
                this.fileParam.set('urlhome',this.element.urlhome);
                this.fileParam.set('urlOARepository',this.element.urlOARepository);  
                const path = `${this.GLOBAL.BASE_URL}updatePartner`;
                axios({
                    method: "post",
                    url: path,
                    data: this.fileParam,
                    headers: { "Content-Type": "multipart/form-data" },
                    })
                    .then((res) => {
                        // console.log(response);
                        if(res.data==true || res.data=="true"){
                        this.$router.push({
                            name:"EditPartner",
                        })
                        this.$notify({
                            type:"success",
                            message:"successfully updated",
                            duration: 1500
                            })
                        }
                        
                    })
                    .catch((e) => {
                        this.$notify.error({
                                title: "failure",
                                message: e,
                                duration: 1500
                            })
                    });
            }
            else{
                this.$notify.error({
                            title: "failure",
                            message: "vide value not possible",
                            duration: 1500
                        })
            }
            
            // // updatePartner
            
            

        },
        cancel(){
            this.$router.push({name:"EditPartner"});
        }
    
    },
    created(){
        this.getdata(this.$route.query)
        // this.element  = JSON.parse(sessionStorage.getItem("element"))
    }
    
}
</script>
<style>
.hideUpload > div {
  display: none;
}
</style>