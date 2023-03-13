<template>
    <div class="edit_component"> 
        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Topic Engage</p>
            </div>
            <router-link :to="{name: 'AddOneTopic'}"><img src="../assets/plus.png" alt="add" class="edit_img"></router-link>
            <router-link :to="{name: 'ChangeOneTopic'}"><img src="../assets/crayon.png" alt="add" class="edit_img"></router-link>
        </div>
        <ul> 
            <div v-for="element in partner" :key="element.shortname">
                <li class="edit-text">{{element.text}}</li>
            </div>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            partner:[{
                shortname: "TU",
                text: "Tilburg University"
            },
            {
                topicname: "UMA",
                text: "Universität Mannheim"
            },
            {
                topicname: "LUISS",
                text: "Libera Università Internazionale degli Studi Sociali"
            },
            {
                topicname: "UTC",
                text: "Université Toulouse 1 Capitole"
            },
            {
                topicname: "UNWE",
                text: "University of National and World Economy"
            },
            {
                topicname: "WU",
                text: "Wirtschaftsuniversität Wien"
            }
        ]
        }
    },
    methods: {
    }
    
}
</script>