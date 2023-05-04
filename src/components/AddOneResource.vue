<template>
  <div>
    <el-button type="primary" @click="addRes()">confirm</el-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'AddOneResource',
    data(){
        return{
            resources:{
                modified:{}
            }
        }
    },
    methods:{
        addRes(){
            const path = `${this.GLOBAL.BASE_URL}modifyresources`;
            axios.post(path, this.resources, {headers:{"Content-Type" : "application/json"}})
            .then((res) => {
                // console.log(res.data);
                if(res.data.insert){
                    alert("New resource added successfully");
                }
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    }
}
</script>

<style>

</style>