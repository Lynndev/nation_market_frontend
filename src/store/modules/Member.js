import Member from './../../services/Member'
import router from './../../router/index'

const state = {
   members:[],
   blockMembers:[]
}
const getters = {
   
}
const mutations = {
    SET_MEMBERS(state,members){
        state.members = members.data.data
    },
    SET__BLOCK_MEMBERS(state,blockMembers){
        state.blockMembers = blockMembers.data.data
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
    blockMember({dispatch},memberId){
        Member.blockMember(memberId)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'Block Member Successfully'
                }
                    
                dispatch('Notification/add',notification,{ root: true })
            })
    },
    unblockMember({dispatch},memberId){
        Member.unblockMember(memberId)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'Member unblock Successfully'
                }
                    
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getBlockMembers')
            })
    },
    getMembers({commit}){
        Member.getMembers()
            .then(members => {
                console.log(members);
                commit('SET_MEMBERS',members)
            })
    },
    getBlockMembers({commit}){
        Member.getBlockMembers()
            .then(blockMembers => {
                console.log(blockMembers);
                commit('SET__BLOCK_MEMBERS',blockMembers)
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