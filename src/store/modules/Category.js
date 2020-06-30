import Category from './../../services/Category'

const state = {
   categories:[]
}
const getters = {
   
}
const mutations = {
    SET_CATEGORIES(state,categories){
        state.categories = categories.data.data
    },
    REMOVE_CATEGORY(state,catId){
        state.categories.filter((value) => value.id == catId)
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
                
                dispatch('getCategoriesByMainId',payload.main_category_id)
                
            })
       
    },
    deleteCategory({dispatch},payload){
        Category.deleteCategory({id:payload.id})
            .then((response) => {
                console.log(response)

                const notification = {
                    type:'success',
                    status:true,
                     message:'delete category Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getCategoriesByMainId',payload.main_category_id)
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