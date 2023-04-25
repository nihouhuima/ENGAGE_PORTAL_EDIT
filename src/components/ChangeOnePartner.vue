<template>
    <div class="edit_change">
        <div class="changet_top">
            <router-link :to="{name: 'EditPartner'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
            <p class="changetopic_title"> update information for {{ element.longName }}</p>
        </div>
        <table class="edit_table">
            <tr class="edit_tr"><td>Modify</td><td>Key</td><td>Value</td></tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('shortName')"></td>
                <td>Short Name</td>
                <td>{{ element.shortName }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('longName')"></td>
                <td>Full Name</td>
                <td>{{ element.longName }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('longName')"></td>
                <td>OAI URL</td>
                <td>{{ element.urlOAI }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('longName')"></td>
                <td>University URL</td>
                <td>{{ element.urlOARepository }}</td>
            </tr>
            <tr class="edit_tr">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata('img')"></td>
                <td>University Logo</td>
                <td>
                    <div v-if="haveimg(element)">
                    <img class="change_part_logo" :src="srcImg(element.img)"></div>
                    <div v-else>No img preview</div>
                    <!-- <img class="change_part_logo" src="../assets/2-L_UTC-AN_13_13_W.jpg"> -->
                </td>
            </tr>
        </table>
       
         <!-- pop up for modify one keyword -->
         <el-dialog
        title="Modification"
        :visible.sync="dialogVisible"
        width="30%">
            <p>Original {{target}}: </p>
            <p><b>{{ element[target] }}</b></p><br>
            <p>new {{target}}:  </p>
            <el-input v-model="modifiedinfo.content"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">cancel</el-button>
                <el-button type="primary" @click="modifyWord()">confirm</el-button>
            </span>
        </el-dialog>

        <el-dialog
        title="Modification"
        :visible.sync="dialogVisibleImg"
        width="30%">
        <p>Please choose the photo: </p>

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

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleImg = false">cancel</el-button>
                <!-- <el-button type="primary" @click="transferImg()">confirm</el-button> -->
                <el-button type="primary" @click="handleClick()">confirm</el-button>
            </span>
        </el-dialog>

    </div>
</template>
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
            dialogVisibleImg: false,
            newLogo:{ },
            showImg:true,
            modifiedinfo:{
                partner: "",
                tag:'',
                content:''},
            fileList: [],
            dialogImageUrl: "",
            dialogVisibleB:false,
            fileParam: "",
            
        }
    },
    methods:{
        choosedata(key){
            if(key!='img'){
                // console.log(key)
                // console.log(this.element[key])
                this.target = key
                this.dialogVisible = true
            }else{
                this.dialogVisibleImg = true
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
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file) {
            this.fileParam = new window.FormData(); //create object -- form
            this.fileParam.append("file", file["raw"]); // file object 
            this.fileParam.append("fileName", file["name"]);
            this.fileParam.append("fileType", file["raw"]["type"])
            this.fileParam.append("partner", this.element.shortName);
            // console.log(fileList)
            this.showImg=!this.showImg;
        },
        modifyWord(){
            this.modifiedinfo.tag=this.target;
            this.modifiedinfo.partner=this.element.shortName;
            // console.log(this.modifiedinfo)
            const path = `${this.GLOBAL.BASE_URL}changePartnerinfo`;

            axios({
                method: "post",
                url: path,
                data: this.modifiedinfo,
                headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    // console.log(response);
                    if(response.data==true){
                        this.dialogVisible = false;
                        this.getdata();
                        
                    }
                    
                })
                .catch((e) => {
                    console.log("error: ");
                    console.log(e);
                });
        },
        handleClick() {
            const path = `${this.GLOBAL.BASE_URL}changePartner`;

            axios({
                method: "post",
                url: path,
                data: this.fileParam,
                headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => {
                    // console.log(response);
                    if(response.data==true){
                        this.fileList = [];
                        this.getdata();
                        this.dialogVisibleImg = false;
                        this.showImg=true;
                    }
                    
                })
                .catch((e) => {
                    console.log("error: ");
                    console.log(e);
                });
        },
        srcImg(img){
            //function for create src of logo
            //data:image/png;base64,{code base64 of image}
            //data:image/jpeg;base64,{code base64 of image}
            //data:image/x-icon;base64,{code base64 of image}
            return "data:"+img.type+";base64,"+img.code
        },
        getdata(){
            const path = `${this.GLOBAL.BASE_URL}/partnerinfo`;
            axios.get(path)
            .then((res) => {
                
                // console.log("element"+this.element.shortName);
                for (var i=0; i<res.data.length; i++) {
                    if (res.data[i]['shortName'] ==this.element['shortName']) {
                        // console.log(res.data[i]['shortname']);
                        this.element = res.data[i];
                    }
                }
                
                
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        }
    
    },
    created(){
        this.element  = this.$route.query
        this.getdata();
    }
    
}
</script>
<style>
.hideUpload > div {
  display: none;
}
</style>