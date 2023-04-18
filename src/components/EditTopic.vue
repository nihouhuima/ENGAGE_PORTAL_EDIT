<template>
    <div class="edit_component"> 
        
        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">Engage Topic </p>
            </div>
            <a @click="routerto()"><img src="../assets/plus.png" alt="add" class="edit_img"></a>
        </div>
        <table class="edit_table">
            <tr>
                <td>Modify</td><td>Delete</td><td class="edit_short_name">Short Name</td><td>Full Name</td>
            </tr>

                
                    <tr class="edit_tr" v-for="element in topicEngage" :key="element.topic">
                        <td class="edit_img_center"><img src="../assets/crayon.png" alt="edit" class="edit_img" @click="choosedata(element)"></td>
                        <td class="edit_img_center"><img src="../assets/gomme.png" alt="delete" class="edit_img"> </td>
                        <td><span>{{element.topic}}</span></td>
                        <td><span> {{ element.topicFullName }}</span> </td>
                    </tr>
                

        </table>

        <div class="edit_content_container">
            <div class="edit_menu_text"> 
                <p class="edit_title">SDG Topic </p>
            </div>
        </div>
        
        <table class="edit_table">
            <tr >
                <td>Modify</td><td>Delete</td><td class="edit_short_name">Short Name</td><td>Full Name</td>
            </tr>
                        

            <tr class="edit_tr" v-for="element1 in this.topicSDG" :key="element1.topic">
                <td class="edit_img_center"><img src="../assets/crayon.png" alt="add" class="edit_img" @click="choosedata(element1)"> </td>
                <td class="edit_img_center"><img src="../assets/gomme.png" alt="delete" class="edit_img"> </td>
                <td><span class="edit_topicname">{{element1.topic}}</span></td>
                <td><span> {{ element1.topicFullName }}</span> </td>
            </tr>

 
        </table>
            
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            topicSDG:[],
            topicEngage:[],
            topic:[]
        }
    },
    methods: {
        getList(){
            const path = `${this.GLOBAL.BASE_URL}keywords`;
            axios.get(path)
            .then((res) => {
                // console.log(res.data);
                this.topic = res.data;
                // console.log(this.topic);
                for(var i=0;i<this.topic.length;i++){
                    // console.log(this.topic[i]['type']);
                    if (this.topic[i]['type']==true){
                        this.topicSDG.push(this.topic[i]);
                    }
                    else{
                        this.topicEngage.push(this.topic[i]);
                    }

                }
                // console.log(this.topic)
                //  console.log(this.topicSDG);
                //  console.log(this.topicEngage);
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
        },
        routerto(){
            this.$router.push({
                name:"AddOneTopic",
                params: this.topic
                
            })
        }
    },
    created(){
        this.getList();
    }
    
}
</script>