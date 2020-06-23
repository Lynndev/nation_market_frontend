import MainCategory from './../../services/MainCategory'

const state = {
   mainCategories:[],
}
const getters = {
   
}
const mutations = {
    SET_MAIN_CATEGORIES(state,mainCategories){
        state.mainCategories = mainCategories.data.data
    },
}

const actions = {
    getMainCategories({commit}){
        MainCategory.getMainCategories()
            .then(mainCategories => {
                console.log(mainCategories);
                commit('SET_MAIN_CATEGORIES',mainCategories)
            })
    },
}


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}