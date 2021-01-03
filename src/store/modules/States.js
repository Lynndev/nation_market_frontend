import States from './../../services/States'

const state = {
   states:[]
}
const getters = {
   
}
const mutations = {
    SET_STATES(state,states){
        state.states = states.data.data
    },
    REMOVE_CATEGORY(state,catId){
        state.categories.filter((value) => value.id == catId)
    }
}

const actions = {
    storeState({dispatch},payload){
        States.storeState(payload)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'state create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getStates')
            })
       
    },
    updateState({dispatch},payload){
        States.updateState(payload)
            .then((response) => {
                console.log(response);
                const notification = {
                    type:'success',
                    status:true,
                     message:'Update state Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getStates')
            })
       
    },
    deleteState({dispatch},payload){
        States.deleteState({id:payload.id})
            .then((response) => {
                console.log(response)

                const notification = {
                    type:'success',
                    status:true,
                     message:'delete state Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getStates')
            })
       
    },
    getStates({commit}){
        States.getStates()
            .then(states => {
                commit('SET_STATES',states)
                console.log(states);
            })
    },
    getStatesByID({commit},payload)
    {
        States.getStatesByID(payload)
        .then(states => {
            commit('SET_STATES',states)
            console.log(states);
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