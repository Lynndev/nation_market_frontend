import Property from './../../services/Property'

const state = {
  properties:[]
}
const getters = {
   
}
const mutations = {
    SET_PROPERTIES(state,properties){
        state.properties = properties.data.data
    }
}

const actions = {
    storeProperty({dispatch},payload){
        Property.storeProperty(payload)
            .then((response) => {
                console.log(response);
                const notification = {
                    type:'success',
                    status:true,
                     message:'property create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getPropertiesByCatId',payload.category_id)
                
            })
       
    },
    updateProperty({dispatch},payload){
        Property.updateProperty(payload)
            .then((response) => {
                console.log(response);
                const notification = {
                    type:'success',
                    status:true,
                     message:'Update property Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getPropertiesByCatId',payload.category_id)
                
            })
       
    },
    deleteProperty({dispatch},payload){
        Property.deleteProperty({id:payload.id})
            .then((response) => {
                console.log(response)

                const notification = {
                    type:'success',
                    status:true,
                     message:'delete property Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getPropertiesByCatId',payload.category_id)
                
            })
       
    },
    getPropertiesByCatId({commit},catId){
        Property.getPropertiesByCatId(catId)
            .then(properties => {
                console.log(properties);
                commit('SET_PROPERTIES',properties)
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