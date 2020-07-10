import Township from './../../services/Township'

const state = {
   townships:[]
}
const getters = {
   
}
const mutations = {
    SET_TOWNSHIPS(state,townships){
        state.townships = townships.data.data
    },
    // REMOVE_CATEGORY(state,catId){
    //     state.categories.filter((value) => value.id == catId)
    // }
}

const actions = {
    storeTownship({dispatch},payload){
        Township.storeTownship(payload)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'township create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getTownshipByStateId',payload.state_id)
            })
       
    },
    updateTownship({dispatch},payload){
        Township.updateTownship(payload)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'Update township Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getTownshipByStateId',payload.state_id)
                
            })
       
    },
    deleteTownship({dispatch},payload){
        Township.deleteTownship({id:payload.id})
            .then((response) => {
                console.log(response)

                const notification = {
                    type:'success',
                    status:true,
                     message:'delete state Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getTownshipByStateId',payload.state_id)
            })
       
    },
    getTownshipByStateId({commit},stateId){
        Township.getTownshipByStateId(stateId)
            .then(townships => {
                commit('SET_TOWNSHIPS',townships)
                console.log(townships);
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