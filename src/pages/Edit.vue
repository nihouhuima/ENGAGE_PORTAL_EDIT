<template>
    <div class="body_container"> 
    <div class="edit-body"> 
        <div class="edit_top"> 
            <p id="edit_title"> You can edit the information here</p>
        </div>
        <div class="edit_content"> 
            <div class="edit_menu">
                <div class="edit_menu_text">
                    <router-link :to="{name: 'EditTopic'}"><h2> TOPICS </h2></router-link>
                </div>
                <div class="edit_menu_text">
                    <router-link :to="{name: 'EditPartner'}"> <h2>  PARTNERS </h2></router-link>
                </div>
                <div class="edit_menu_text">
                    <router-link :to="{name: 'EditResource'}"> <h2>  RESOURCES </h2></router-link>
                </div>
            </div>
            <div class="edit_right">
                <keep-alive include="AddOneTopic" exclude="ChangeOneTopic">
                    <router-view></router-view>
                </keep-alive>
            </div>    
            
   
        </div>
    </div>
    </div>
    
</template>

<script>

export default {

}
</script>

<style>

</style>
