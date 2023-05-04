<template>
  <div class="about_container">
        <p class="Resources">Resources</p>
        <div v-for="element in resources" :key="element.name">
        <div class="publication-element">
            
            <div class="publication-main" > 
              <table class="edit_table"> 
                    <tr><td class="edit_img_center">
                        <router-link :to="`/edit/ChangeOneResource?name=${element.name}`">
                            <!-- <router-link :to="{name:'ChangeOneResource'}"> -->
                            <img src="../assets/crayon.png" alt="edit" class="edit_img">
                        </router-link></td>
                <td class="edit_img_center"><img src="../assets/gomme.png" alt="delete" class="edit_img" @click="deletePartner(element)"> </td>
                <td>Name</td><td><a target="_blank" :href="element.url">{{ element.name }}</a></td></tr>
                    <!-- <tr><td>URL</td><td>{{ element.url }}</td></tr> -->
                    <tr><td></td><td></td>
                        <td>University</td><td> <a target="_blank" :href="element.uniinfo.urlOARepository">{{element.uniinfo.longName}} ({{element.uniinfo.NameAffiche}})</a></td></tr>
                </table>    
            </div>
        </div>
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