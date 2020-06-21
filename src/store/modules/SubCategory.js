import SubCategory from './../../services/SubCategory'

const state = {
  subCategories:[]
}
const getters = {
   
}
const mutations = {
    SET_SUB_CATEGORIES(state,subCategories){
        state.subCategories = subCategories.data.data.data
    }
}

const actions = {
    storeSubCategory({dispatch},payload){
        SubCategory.storeSubCategory(payload)
            .then((response) => {
                console.log(response);
                const notification = {
                    type:'success',
                    status:true,
                     message:'Sub Category create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getSubCategories')
                
            })
       
    },
    getSubCategories({commit}){
        SubCategory.getSubCategories()
            .then(subCategories => {
                console.log(subCategories);
                commit('SET_SUB_CATEGORIES',subCategories)
            })
    },
    getSubCategoriesByCatId({commit},catId){
        SubCategory.getSubCategoriesByCatId(catId)
            .then(subCategories => {
                commit('SET_SUB_CATEGORIES',subCategories)
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