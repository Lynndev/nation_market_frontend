import Shop from './../../services/Shop'
import router from './../../router/index'


const state = {
   shops:[],
   shop:{}
}
const getters = {
   
}
const mutations = {
    SET_SHOPS(state,shops){
        state.shops = shops.data.data
    },
    SET_SHOP(state,shop){
        state.shop = shop
    }
}

const actions = {
    storeShop({dispatch},payload){
        Shop.storeShop(payload)
            .then((response) => {
                console.log(response);
                const notification = {
                    type:'success',
                    status:true,
                     message:'shop create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getShopByMainCatId',payload.main_category_id)
                
            })
       
    },
    getShopDetail({commit},shop){
        if(shop.length != 0){
            commit('SET_SHOP',shop)
            router.push('/shop/detail',()=>{})
        }
        
    },
    changeStatus({dispatch},payload){
        Shop.changeStatus(payload)
            .then(response => {

            })
    },
    getShopByMainCatId({commit},mainCatId){
        Shop.getShopByMainCatId(mainCatId)
            .then(shops => {
                commit('SET_SHOPS',shops)
                console.log(shops);
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