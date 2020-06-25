import Category from './../../services/Category'

const state = {
   categories:[]
}
const getters = {
   
}
const mutations = {
    SET_CATEGORIES(state,categories){
        state.categories = categories.data.data
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
    updateCategory({dispatch},payload){
        Category.updateCategory(payload)
            .then(() => {
                const notification = {
                    type:'success',
                    status:true,
                     message:'Update category Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getCategories')
                
            })
       
    },
    deleteCategory({dispatch},catId){
        Category.deleteCategory(catId)
            .then((response) => {
                console.log(response)

                const notification = {
                    type:'success',
                    status:true,
                     message:'delete category Successfully'
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