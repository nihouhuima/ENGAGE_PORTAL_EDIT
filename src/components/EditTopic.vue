<template>
    <div class="edit_component"> 
        
        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Topic Engage</p>
            </div>
            <router-link :to="{name: 'AddOneTopic'}"><img src="../assets/plus.png" alt="add" class="edit_img"></router-link>
        </div>

            <div v-for="element in topic" :key="element.topic">
                <div v-if="belongEngage(element.topic)" class="edit-text">
                    <img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata(element)">
                    <img src="../assets/gomme.png" alt="delete" class="edit_img">
                    <span>{{element.topic}}</span><span> {{ element.topicFullName }}</span>
                </div>
            </div>


        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Topic SDG</p>
            </div>
            <router-link :to="{name: 'AddOneTopic'}"><img src="../assets/plus.png" alt="add" class="edit_img"></router-link>
        </div>
        
   
                        <div v-for="element in topic" :key="element.topic">
                            <div v-if="belongSDG(element.topic)" class="edit-text">
                                <img src="../assets/crayon.png" alt="add" class="edit_img" @click="choosedata(element)">
                                <img src="../assets/gomme.png" alt="delete" class="edit_img">
                                <span class="edit_topicname">{{element.topic}}</span><span> {{ element.topicFullName }}</span>
                            </div>
                        </div>

            
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            topicinfo:{},
            topic:[
            // {
            //     topicname: "SDG-1",
            //     text: "NO POVERTY"
            // },
            // {
            //     topicname: "SDG-2",
            //     text: "ZERO HUNGER"
            // },
            // {
            //     topicname: "SDG-3",
            //     text: "GOOD HEALTH AND WELL-BEING"
            // },
            // {
            //     topicname: "SDG-4",
            //     text: "QUALITY EDUCATION"
            // },
            // {
            //     topicname: "SDG-5",
            //     text: "GENDER EQUALITY"
            // },
            // {
            //     topicname: "SDG-6",
            //     text: "CLEAN WATER AND SANITATION"
            // },
            // {
            //     topicname: "SDG-7",
            //     text: "AFFORDABLE AND CLEAN ENERGY"
            // },
            // {
            //     topicname: "SDG-8",
            //     text: "DECENT WORK AND ECONOMIC GROWTH"
            // },
            // {
            //     topicname: "SDG-9",
            //     text: "INDUSTRY, INNOVATION AND INFRASTRUCTURE"
            // },
            // {
            //     topicname: "SDG-10",
            //     text: "REDUCED INEQUALITIES"
            // },
            // {
            //     topicname: "SDG-11",
            //     text: "SUSTAINABLE CITIES AND COMMUNITIES"
            // },
            // {
            //     topicname: "SDG-12",
            //     text: "RESPONSIBLE CONSUMPTION AND PRODUCTION"
            // },
            // {
            //     topicname: "SDG-13",
            //     text: "CLIMATE ACTION"
            // },
            // {
            //     topicname: "SDG-14",
            //     text: "LIFE BELOW WATER"
            // },
            // {
            //     topicname: "SDG-15",
            //     text: "LIFE ON LAND"
            // },
            // {
            //     topicname: "SDG-16",
            //     text: "PEACE, JUSTICE AND STRONG INSTITUTIONS"
            // },
            // {
            //     topicname: "digital",
            //     text: ""
            // }
        ]
        }
    },
    methods: {
        getList(){
            const path = `${this.GLOBAL.BASE_URL}keywords`;
            axios.get(path)
            .then((res) => {
                console.log(res.data);
                this.topic = res.data;
            })
            .catch((error) => {
            console.error(error);
            })
        },
        belongEngage(topic){
            if(topic.indexOf("SDG")==-1){
                return true
            }else{
                return false
            }
        },
        belongSDG(topic){
            if(topic.indexOf("SDG")!=-1){
                return true
            }else{
                return false
            }
        },
        choosedata(element){
            this.$router.push({
                name:"ChangeOneTopic",
                params: element
            })
        }
    },
    created(){
        this.getList();
    }
    
}
</script>