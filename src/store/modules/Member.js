import Member from './../../services/Member'
import router from './../../router/index'

const state = {
   members:[]
}
const getters = {
   
}
const mutations = {
    SET_MEMBERS(state,members){
        console.log(members);
        state.members = members.data.data
       
    }
}

const actions = {
    storeMember({dispatch},payload){

        Member.storeMember(payload)
            .then(() => {

                const notification = {
                    type:'success',
                    status:true,
                     message:'Member store Successfully'
                }
                    
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getMembers')
                
                router.push('/member/',()=>{})
            })
       
    },
    updateMember({dispatch},payload){

        Member.updateMember(payload)
            .then(() => {

                const notification = {
                    type:'success',
                    status:true,
                     message:'Update Member Successfully'
                }
                    
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getMembers')
                
                router.push('/member/',()=>{})
            })
       
    },
    getMembers({commit}){
        Member.getMembers().then(members => {
                console.log(members);
                commit('SET_MEMBERS',members)
            })
    }

}


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}