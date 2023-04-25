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
                    <img class="change_part_logo" :src="srcImg(element.img)">
                    <img class="change_part_logo" src="../assets/2-L_UTC-AN_13_13_W.jpg"></td>
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
            <el-input ></el-input>
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
            element:{},
            dialogVisibleImg: false,
            newLogo:{ },
            showImg:'',

            fileList: [],
            dialogImageUrl: "",
            dialogVisibleB:false,
            fileParam: "",
            
        }
    },
    methods:{
        choosedata(key){
            if(key!='img'){
                console.log(key)
                console.log(this.element[key])
                this.target = key
                this.dialogVisible = true
            }else{
                this.dialogVisibleImg = true
            }
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisibleB = true;
        },
        handleChange(file, fileList) {
            this.fileParam = new window.FormData(); //create object -- form
            this.fileParam.append("file", file["raw"]); // file object 
            this.fileParam.append("fileName", file["name"]);
            this.fileParam.append("fileType", file["raw"]["type"])
            this.fileParam.append("partner", this.element.shortName);
            console.log(fileList)
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
                    console.log(response);
                    this.fileList = [];
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
        }
    
    },
    created(){
        this.element  = this.$route.query
    }
    
}
</script>,