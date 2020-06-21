import Category from './../../services/Category'

const state = {
   categories:[]
}
const getters = {
   
}
const mutations = {
    SET_CATEGORIES(state,categories){
        state.categories = categories.data.data.data
    }
}

const actions = {
    storeCategory({dispatch},payload){
        Category.storeCategory(payload)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'Category create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getCategories')
                
            })
       
    },
    getCategories({commit}){
        Category.getCategories()
            .then(categories => {
                console.log(categories);
                commit('SET_CATEGORIES',categories)
            })
    },
    getCategoriesByMainId({commit},mainCategoryId){
        Category.getCategoriesByMainId(mainCategoryId)
            .then(categories => {
                commit('SET_CATEGORIES',categories)
                console.log(categories);
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