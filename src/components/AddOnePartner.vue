<template>
    <div class="edit_change"> 
        <div class="changet_top">
            <router-link :to="{name: 'EditPartner'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> Please add a new partner</p>
        </div>
        
        <table class="edit_table">
            <tr class="edit_tr">
                <td>Short Name</td>
                <td>
                    <el-input v-model="newPartner.shortName"></el-input>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>Full Name</td>
                <td>
                    <el-input v-model="newPartner.longName"></el-input>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>University homepage URL</td>
                <td>
                    <el-input v-model="newPartner.urlhome"></el-input>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>OAI URL</td>
                <td>
                    <el-input v-model="newPartner.urlOAI"></el-input>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>University publication repository URL</td>
                <td>
                    <el-input v-model="newPartner.urlOARepository"></el-input>
                </td>
            </tr>
            <tr class="edit_tr">
                <td>University Logo</td>
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
                <el-dialog v-model="dialogVisibleB">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
                </td>
            </tr>
        </table>
        <span slot="footer" class="dialog-footer">
            <router-link :to="{name: 'EditPartner'}"><el-button>cancel</el-button></router-link>
            <el-button type="primary" @click="addPartner()">confirm</el-button>
        </span>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            partners:[],
            shorts:[], // short names of all the partners
            dialogVisibleB: false,
            dialogImageUrl:"",
            fileList: [],
            showImg:true,
            newPartner:{
                shortName:"",
                longName:"",
                urlOAI:"",
                urlOARepository:"",
                urlhome:""
            },
            postData:""
        }
    },
    methods:{
        handleRemove() {
            // console.log(file, fileList);
            this.showImg=!this.showImg;
            this.postData.set("file", ""); // file object 
            this.postData.set("fileName", "");
            this.postData.set("fileType", "")
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file) {
            this.postData.set("file", file["raw"]); // file object 
            this.postData.set("fileName", file["name"]);
            this.postData.set("fileType", file["raw"]["type"])
            this.showImg=!this.showImg;
        },
        addPartner(){
            // dialog for confirmation
            if(this.newPartner.shortName == "" || this.newPartner.longName == "" || this.newPartner.urlOAI == "" || this.newPartner.urlOARepository == "" || this.newPartner.urlhome == "" || this.postData.get("file")==""){
                this.$notify.error({
                            title: "failure",
                            message: "Please fill in all information! ",
                            duration: 1500
                        })
            }else if(this.shorts.indexOf(this.newPartner.shortName)!=-1){
                this.$notify.error({
                            title: "failure",
                            message: "Short name exists already, please change another one! ",
                            duration: 1500
                        })
            }else{
                this.postData.set("shortName", this.newPartner.shortName)
                this.postData.set("longName", this.newPartner.longName)
                this.postData.set("urlOAI", this.newPartner.urlOAI)
                this.postData.set('urlOARepository', this.newPartner.urlOARepository)
                this.postData.set('urlhome', this.newPartner.urlhome)
                this.$confirm(`Confirm your modification?`, "confirmation", {
                    iconClass : "el-icon-question",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    showClose: true, // Whether or not to display the top right hand corner close button
                    type: "warning"
                    })
                    .then(()=>{this.add()}) // to do : success ou failure based on return value
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
            const path = `${this.GLOBAL.BASE_URL}addPartner`
            axios({
                method: "post",
                url: path,
                data: this.postData,
                headers: { "Content-Type": "multipart/form-data" },
                })
            .then((res) => {
                this.flag=res.data;
                    if(res.data==true || res.data=="true"){
                        this.$router.push({
                            name:"EditPartner",
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


        }
    },
    created(){
        this.partners  = JSON.parse(sessionStorage.getItem("element"))
        this.partners.forEach(element => {
            this.shorts.push(element['shortName'])
        });
        this.postData = new window.FormData(); //create object -- form
        this.postData.append("file", ""); // file object 
        this.postData.append("fileName", "");
        this.postData.append("fileType", "")
        this.postData.append('shortName', "")
        this.postData.append('longName', "")
        this.postData.append('urlOAI', "")
        this.postData.append('urlOARepository', "")
        this.postData.append('urlhome', "")

    }
    
}
</script>