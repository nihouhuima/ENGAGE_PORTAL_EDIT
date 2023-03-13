<template>
    <div class="edit_component"> 
        <!-- <div class="edit_title">
            <p> Please choose one topic </p>
        </div> -->
        
        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Topic Engage</p>
            </div>
            <router-link :to="{name: 'AddOneTopic'}"><img src="../assets/plus.png" alt="add" class="edit_img"></router-link>
            <router-link :to="{name: 'ChangeOneTopic'}"><img src="../assets/crayon.png" alt="add" class="edit_img"></router-link>
        </div>
        <ul> 
            <div v-for="element in topic" :key="element.topicname">
                <li v-if="belongEngage(element.topicname)" class="edit-text">{{element.topicname}}</li>
            </div>
        </ul>

        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Topic SDG</p>
            </div>
            <router-link :to="{name: 'AddOneTopic'}"><img src="../assets/plus.png" alt="add" class="edit_img"></router-link>
            <router-link :to="{name: 'ChangeOneTopic'}"><img src="../assets/crayon.png" alt="add" class="edit_img"></router-link>
        </div>
        
                    <ul>
                        <div v-for="element in topic" :key="element.topicname">
                            <li v-if="belongSDG(element.topicname)" class="edit-text">{{element.topicname}} {{ element.text }}</li>
                        </div>
                    </ul>

                <!-- <div class="edit-button"> 
                    <button class="edit-button-add">add topic</button>
                </div> -->
            
    </div>
</template>
<script>
export default {
    data(){
        return{
            topic:[{
                topicname: "SDG-1",
                text: "NO POVERTY"
            },
            {
                topicname: "SDG-2",
                text: "ZERO HUNGER"
            },
            {
                topicname: "SDG-3",
                text: "GOOD HEALTH AND WELL-BEING"
            },
            {
                topicname: "SDG-4",
                text: "QUALITY EDUCATION"
            },
            {
                topicname: "SDG-5",
                text: "GENDER EQUALITY"
            },
            {
                topicname: "SDG-6",
                text: "CLEAN WATER AND SANITATION"
            },
            {
                topicname: "SDG-7",
                text: "AFFORDABLE AND CLEAN ENERGY"
            },
            {
                topicname: "SDG-8",
                text: "DECENT WORK AND ECONOMIC GROWTH"
            },
            {
                topicname: "SDG-9",
                text: "INDUSTRY, INNOVATION AND INFRASTRUCTURE"
            },
            {
                topicname: "SDG-10",
                text: "REDUCED INEQUALITIES"
            },
            {
                topicname: "SDG-11",
                text: "SUSTAINABLE CITIES AND COMMUNITIES"
            },
            {
                topicname: "SDG-12",
                text: "RESPONSIBLE CONSUMPTION AND PRODUCTION"
            },
            {
                topicname: "SDG-13",
                text: "CLIMATE ACTION"
            },
            {
                topicname: "SDG-14",
                text: "LIFE BELOW WATER"
            },
            {
                topicname: "SDG-15",
                text: "LIFE ON LAND"
            },
            {
                topicname: "SDG-16",
                text: "PEACE, JUSTICE AND STRONG INSTITUTIONS"
            },
            {
                topicname: "digital",
                text: ""
            }
        ]
        }
    },
    methods: {
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
        }
    }
    
}
</script>