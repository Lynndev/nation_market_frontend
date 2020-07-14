import PackagePurchase from './../../services/PackagePurchase'

const state = {
   shopPurchases:[],
   marketPurchases:[],
   memberPurchases:[]
}
const getters = {
   
}
const mutations = {
    SET_SHOP_PURCHASES(state,shopPurchases){
        state.shopPurchases = shopPurchases.data.data
    },
    SET_MARKET_PURCHASES(state,marketPurchases){
        state.marketPurchases = marketPurchases.data.data
    },
    SET_MEMBER_PURCHASES(state,memberPurchases){
        state.memberPurchases = memberPurchases.data.data
    },
}

const actions = {
    storeShopPurchase({dispatch},payload){
        PackagePurchase.storeShopPurchase(payload)
            .then((response) => {
                console.log(response)
                const notification = {
                    type:'success',
                    status:true,
                     message:'shop package purchase Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

            })
       
    },
    storeMarketPurchase({dispatch},payload){
        PackagePurchase.storeMarketPurchase(payload)
            .then((response) => {
                console.log(response)
                const notification = {
                    type:'success',
                    status:true,
                     message:'market package purchase Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

            })
       
    },
    storeMemberPurchase({dispatch},payload){
        PackagePurchase.storeMemberPurchase(payload)
            .then((response) => {
                console.log(response)
                const notification = {
                    type:'success',
                    status:true,
                     message:'member package purchase Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

            })
       
    },
    getPurPackagesByShop({commit},shopId){
        PackagePurchase.getPurPackagesByShop(shopId)
            .then((purchases) => {
                commit('SET_SHOP_PURCHASES',purchases)
                console.log(purchases);
            })
    },
    getPurPackagesByMarket({commit},memberId){
        PackagePurchase.getPurPackagesByMarket(memberId)
            .then((purchases) => {
                commit('SET_MARKET_PURCHASES',purchases)
                console.log(purchases);
            })
    },
    getPurPackagesByMember({commit},memberId){
        PackagePurchase.getPurPackagesByMember(memberId)
            .then((purchases) => {
                commit('SET_MEMBER_PURCHASES',purchases)
                console.log(purchases);
            })
    }
    // deletePackage({dispatch},payload){
    //     Package.deletePackage({id:payload.id})
    //         .then((response) => {
    //             console.log(response)

    //             const notification = {
    //                 type:'success',
    //                 status:true,
    //                  message:'delete package Successfully'
    //             }
    //             dispatch('Notification/add',notification,{ root: true })
                
    //             dispatch('getPackagesByMainId',payload.main_category_id)
    //         })
       
    // },

}


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}