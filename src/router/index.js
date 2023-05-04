import VueRouter from "vue-router"
import Edit from '../pages/Edit'
import EditTopic from '../components/EditTopic'
import EditPartner from '../components/EditPartner'
import AddOneTopic from '../components/AddOneTopic'
import AddOnePartner from '../components/AddOnePartner'
import ChangeOneTopic from '../components/ChangeOneTopic'
import ChangeOnePartner from '../components/ChangeOnePartner'
import EditResource from '../components/EditResource'
import ChangeOneResource from '../components/ChangeOneResource'
import AddOneResource from '../components/AddOneResource'

export default new VueRouter({
    routes: [

        {
            path: '/edit',
            component: Edit,
            name:'Edit',
            redirect: '/edit/EditTopic',
            children:[
                {
                path: 'EditTopic',
                component: EditTopic,
                name: 'EditTopic'
                },
                {
                path: 'EditPartner',
                component: EditPartner,
                name:'EditPartner'
                },
                {
                path: 'AddOneTopic',
                component: AddOneTopic,
                name:'AddOneTopic'
                },
                {
                path: 'AddOnePartner',
                component: AddOnePartner,
                name:'AddOnePartner'
                },
                {
                path: 'ChangeOnePartner',
                component: ChangeOnePartner,
                name:'ChangeOnePartner'
                },
                {
                path: 'ChangeOneTopic',
                component: ChangeOneTopic,
                name:'ChangeOneTopic'
                },
                {
                path:'EditResource',
                component:EditResource,
                name:'EditResource'
                },
                {
                path:'ChangeOneResource',
                component:ChangeOneResource,
                name:'ChangeOneResource'
                },
                {
                path:'AddOneResource',
                component:AddOneResource,
                name:'AddOneResource'
                }

                
            ]},
            {
                path: '/',
                
                redirect:'/edit'}
            
    ]
})