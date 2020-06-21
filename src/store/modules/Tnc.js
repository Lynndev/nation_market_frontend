import Tnc from './../../services/Tnc'

const state = {
   tncs:{}
}
const getters = {
   
}
const mutations = {
    SET_TNC(state,tncs){
        console.log(tncs.data);
        state.tncs = tncs.data
       
    }
}

const actions = {
    updateTnc({dispatch},payload){

        Tnc.storeTnc(payload).then(() => {

                const notification = {
                    type:'success',
                    status:true,
                     message:'terms and condition store Successfully'
                }
                    
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getTncs')
                
            })
       
    },
    getTncs({commit}){
       Tnc.getTncs()
            .then(tncs => {
                commit('SET_TNC',tncs)
                console.log(tncs);
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