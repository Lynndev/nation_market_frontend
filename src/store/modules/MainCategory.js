import MainCategory from './../../services/MainCategory'

const state = {
   mainCategories:[],
}
const getters = {
   sortMainCategories(state){
        const sortMainCats = state.mainCategories.sort((a,b) => {
            const unitA = a.id
            const unitB = b.id

            let comparison = 0
            if(unitA > unitB ){
                comparison = 1
            }else if(unitB > unitA){
                comparison = -1
            }
            return comparison * 1;
            })
        return sortMainCats
   }
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