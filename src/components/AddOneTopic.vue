<template>
    <div class="edit_change"> 
        <div class="edit_add_engage_topic"> 
            <div class="edit_menu_text"> 
                <p class="edit_title"><b>Engage Topic</b> </p>
            </div>
            <table> 
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
                <tr><td><p>Language :</p></td><td><select v-model="lang"><option>English</option><option>Bulgarian</option><option>Dutch</option><option>Finnish</option><option>French</option><option>Italian</option><option>German</option><option>Norwegian</option><option>Spanish</option></select></td></tr>
            </table>
            
        
            <div class="edit_new_words"> 

                <div v-for="(key, index) in keywords" :key="index" class="edit_add_type">
                    <img class="edit_delete_type" @click="deleteOne(index)" src="../assets/POUBELLE3.png" />
                    <div></div>
                    <p>Type</p>
                    <select v-model="key.type">
                        <option disabled value="">Please select one type</option>
                        <option v-for="type_el in types" :key="type_el" :label="type_el" :value="type_el" :name="type_el"></option>
                    </select> 
                    <p>Text <span>  (*please separate the words by ",")</span></p><textarea v-model="key.text" rows="4" cols="100"></textarea>
                    
                </div>

                <p id="edit_add_set_keywords" @click="addOne()">+ Add a new set of keywords</p>
            
            </div>
        
        </div>








        <router-link :to="{name: 'EditTopic'}"><button>Return</button></router-link>
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
            keywords:[
                {
                    type:"",
                    text:""
                }
            ],
            types:[
                "Single words",
                "At least",
                "Combined with"
            ]
        }
    },
    methods:{
        getRouterData() {
            this.topic_type = this.$route.query.topic_type
        },
        addOne(){
            this.keywords.push({type:"",text:""});
        },
        deleteOne(index){
            this.keywords.splice(index, 1);
        }
    },
    created(){
        this.getRouterData();
    }

    
}
</script>