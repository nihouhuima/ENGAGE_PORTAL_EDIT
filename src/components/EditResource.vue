<template>
  <div class="about_container">
    <div class="edit_component">

        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Resources</p>
            </div>
            <a @click="routerto()"><img src="../assets/plus.png" alt="add" class="edit_img"></a>
        </div>

        <table class="edit_table"> 

            <tr><td>Modify</td><td>Delete</td><td>Name</td><td>University</td></tr>

            <tr  v-for="element in resources" :key="element.name" class="edit_tr">
                <td class="edit_img_center"><router-link :to="`/edit/ChangeOneResource?name=${element.name}`">
                    <!-- <router-link :to="{name:'ChangeOneResource'}"> -->
                    <img src="../assets/crayon.png" alt="edit" class="edit_img"></router-link></td> 
                <td class="edit_img_center"><img src="../assets/gomme.png" alt="delete" class="edit_img" @click="deletePartner(element)"> </td>
                <td>{{ element.name }}</td>
                <td>{{element.uniinfo.longName}} ({{element.uniinfo.NameAffiche}})</td>
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
        }
    },
    created(){
        this.getdata()
    }

}
</script>

<style>

</style>