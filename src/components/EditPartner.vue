<template>
    <div class="edit_component"> 
        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Partners</p>
            </div>
            <a @click="routerto()"><img src="../assets/plus.png" alt="add" class="edit_img"></a>
        </div>
<!-- {{ partners }} -->
        <table class="edit_table">
            <tr>
                <td>Modify</td><td>Delete</td><td>University</td>
            </tr>
            <tr class="edit_tr" v-for="element in partners" :key="element.shortName">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata(element)"></td>
                <td class="edit_img_center"><img src="../assets/gomme.png" alt="delete" class="edit_img" @click="deletePartner(element)"> </td>
                <td><span>{{element.longName}}</span></td>
            </tr>
                

        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
        partners:[],
        }
    },
    methods: {
        getdata(){
            const path = `${this.GLOBAL.BASE_URL}/partnerinfo`;
            axios.get(path)
            .then((res) => {
                // console.log(res.data);
                this.partners = res.data;
                
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        choosedata(element){
            // console.log(element)
            var str = JSON.stringify(element)
            window.sessionStorage.setItem("element", str)
            this.$router.push({
                name:"ChangeOnePartner"
            })
        },
        routerto(){
            this.$router.push({
                name:"AddOnePartner",
                query: this.topic
                
            })
        },
        deletePartner(element){
            this.$confirm(`Do you want to delete the university "${element.longName}"?`, "confirmation", {
                iconClass : "el-icon-question",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showClose: true, // Whether or not to display the top right hand corner close button
                type: "warning"
                })
                .then(()=>{this.delete(element)}) // to do : success ou failure based on return value
                .catch((error)=>{
                    this.$notify.error({
                                title: "failure",
                                message: error,
                                duration: 1500
                            })
            })

        },
        delete(element){
            const path=`${this.GLOBAL.BASE_URL}deletePartner/${element.shortName}`
            axios.post(path)
            .then((res) => {
                this.flag=res.data;
                    if(res.data==true || res.data=="true"){
                        this.getdata()
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
        }
    },
    created(){
        this.getdata()
    }
    
}
</script>