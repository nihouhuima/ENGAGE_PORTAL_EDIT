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
                <td>Modify</td><td>University</td>
            </tr>
            <tr class="edit_tr" v-for="element in partners" :key="element.shortName">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata(element)"></td>
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
            this.$router.push({
                name:"ChangeOnePartner",
                query:element
            })
        },
        routerto(){
            this.$router.push({
                name:"AddOnePartner",
                query: this.topic
                
            })
        }
    },
    created(){
        this.getdata()
    }
    
}
</script>