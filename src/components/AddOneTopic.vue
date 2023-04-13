<template>
    <div class="edit_change"> 
        <router-link :to="{name: 'EditTopic'}"><img id="edit_return" src="../assets/return.png" alt="Return"/></router-link>
        
        <div class="edit_add_engage_topic"> 
            <div class="edit_menu_text"> 
                <p class="edit_title"><b>Engage Topic</b> </p>
            </div>
            <table id="edit_add_topic_table"> 
                <tr> 
                    <td><p>Short Name :</p></td><td><input v-model="shortName" type="text"></td>
                </tr>
                <tr> 
                    <td><p>Full Name :</p></td><td><input v-model="FullName" type="text"></td>
                </tr>
            </table>
        </div>


        <div class="edit_add_keywords"> 
            <div class="edit_menu_text"> 
                <p class="edit_title"><b>Keywords</b> </p>
            </div>
            <table>
                <tr><td><p>Language :</p></td><td><select v-model="lang" >
                    <option v-for="lan in list_lang" :key="lan">{{lan}}</option></select></td></tr>
            </table>
            
        
            <div class="edit_new_words"> 

               
                    
                    <div>
                        <table><tr><td><p>Type : Single words</p></td>
                        </tr>
                        </table><br>
                        <p id="edit_espace"> Words<span>  (*please separate the words by ",")</span></p>
                        <textarea v-model="single_words" rows="4" cols="100"></textarea>
                    </div>  
                    <div>
                        <table><tr><td><p>Type : At least</p></td>
                        </tr>
                        </table><br>
                        <p id="edit_espace"> Words<span>  (*please separate the words by ",")</span></p>
                        <textarea v-model="at_least" rows="4" cols="100"></textarea>
                    </div>  
                    <div>
                        <table><tr><td><p>Type : Combined with</p></td>
                        </tr>
                        </table><br>
                        <p id="edit_espace"> Words<span>  (*please separate the words by ",")</span></p>
                        <textarea v-model="combined_with" rows="4" cols="100"></textarea>
                    </div>  
                    <!-- <img class="edit_delete_type" @click="deleteOne(index)" src="../assets/trash.svg" /> -->
                
                <!-- <p id="edit_add_set_keywords" @click="addOne()">+ Add a new set of keywords</p> -->
            <button @click="confirm()">Confirm</button>
            <button @click="cancel()">cancel</button>
            </div>
        
        </div>








        
    </div>
</template>
<script>

export default {
    name: 'AddOneTopic',
    data(){
        return{
            topic_type:"",
            shortName:"",
            FullName:"",
            lang:"English",
            list_lang:["English","Bulgarian","Dutch","Finnish","French","Italian","German","Norwegian","Spanish"],
            single_words:"",
            at_least:"",
            combined_with:""

        }
    },
    methods:{
        getRouterData() {
            this.topic_type = this.$route.query.topic_type
        },
        // addOne(){
        //     this.keywords.push({type:"",text:""});
        //     this.TypesList();
        // },
        // deleteOne(index){
        //     this.keywords.splice(index, 1);
        //     this.TypesList();
        // },
       confirm(){

       },
       cancel(){
        
       }
    },
    created(){
        this.getRouterData();
    }, 
    computed:{
        
    }

    
}
</script>