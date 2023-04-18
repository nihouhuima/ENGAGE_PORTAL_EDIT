<template>
    <div>
        <p> change topic</p>
        <p>{{this.$route.params.topic }}</p> 
        
        
        <div v-for="lan in terms" :key="lan.language">
            <h3>language : {{ lan.language }}</h3>
            <!-- {{ listexist('singleWord',lan) }} -->
            <!-- {{ readtypeword(lan)}} -->
            
                <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option v-for="typew in readtypeword(lan)" :key="typew" :value="typew">{{ typew }}</option>
                

                </select>
            
           <div v-if="affichewords(lan)">
                <h3>{{selected}}</h3>
                <table>
                <tr>
                    <th>Word</th>
                    <!-- <th>language</th> -->
                    <th>modifiy</th>
                    <th>delete</th>
                </tr> 
   
                <tr v-for="s in lan[selected]" :key="s">
                    <td>{{ s }}</td>
                    <!-- <td>{{ lan.language }}</td> -->
                    <td><img src="../assets/crayon.png" alt="add" class="edit_img"></td>
                    <td><img src="../assets/gomme.png" alt="delete" class="edit_img"></td>
                </tr>
                </table>    
            </div>
            <div v-else>no Word add one</div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            selected:'',
            terms:[],
            wordlist:[]
        }
    },
    methods:{
        readtypeword(lan){
            var list=Object.keys(lan)
            // console.log(list)
            var typeword1=[]
            for(var i=0; i<list.length;i++){
                if (list[i]!='language'){
                    typeword1.push(list[i])
                }
            }
            return typeword1
        },
        affichewords(lan){
            if(this.selected!="" && this.selected in lan){
                // console.log("affiche");
                return true
            }
            else{
                return false
            }
        }

        // listexist(name,lan){
        //     if (name in lan){
        //         console.log("exist");
        //     }
        // }

    },
    created(){
        this.terms=this.$route.params.terms
        console.log(this.$route.params.terms)
    }
    
}
</script>