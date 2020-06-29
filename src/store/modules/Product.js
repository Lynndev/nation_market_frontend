import Product from '../../services/Product'

const state = {
   products:[],
}
const getters = {
   
}
const mutations = {
    SET_PRODUCTS(state,products){
        state.products = products.data.data
    },
}

const actions = {
    getProductsByMarket({commit}){
        Product.getProductsByMarket()
            .then(products => {
                commit('SET_PRODUCTS',products)
                console.log(products);
            })
    },
    getProductsByShopId({commit},shopId){
        Product.getProductsByShopId(shopId)
            .then(products => {
                commit('SET_PRODUCTS',products)
                console.log(products);
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