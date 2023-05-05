<template>
  <div class="about_container">
    <div class="edit_component">

        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Resources</p> 
            </div>
            <router-link to="/edit/AddOneResource"><img src="../assets/plus.png" alt="add" class="edit_img"></router-link>
        </div>

        <table class="edit_table"> 

            <tr><td>Modify</td><td>Delete</td><td>Name</td><td>University</td></tr>

            <tr  v-for="element in resources" :key="element.name" class="edit_tr">
                <td class="edit_img_center"><router-link :to="`/edit/ChangeOneResource?name=${element.name}`">
                    <!-- <router-link :to="{name:'ChangeOneResource'}"> -->
                    <img src="../assets/crayon.png" alt="edit" class="edit_img"></router-link></td> 
                <td class="edit_img_center"><img src="../assets/gomme.png" alt="delete" class="edit_img" @click="deleteRes(element.name)"> </td>
                <td>{{ element.name }}</td>
                <td>{{element.uniinfo.NameAffiche}} - {{element.uniinfo.longName}} </td>
            </tr>
        </table>    
        
        
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"EditResource",
    data(){
        return {
            resources:[]
        }
    },
    methods:{
        getdata(){
            const path = `${this.GLOBAL.BASE_URL}resources`;
            axios.get(path)
            .then((res) => {
                // console.log(res.data);
                this.resources = res.data;
            })
            .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            });
        },
        deleteRes(name){
            const path = `${this.GLOBAL.BASE_URL}modifyresources`;
            axios.post(path, {'oldname':name}, {headers:{"Content-Type" : "application/json"}})
            .then((res) => {
                // console.log(res.data);
                if(res.data.delete){
                    this.getdata();
                    this.$notify({
                            type:"success",
                            message:"successfully deleted",
                            duration: 1500
                            })
                }
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    },
    created(){
        this.getdata()
    }

}
</script>

<style>

</style>