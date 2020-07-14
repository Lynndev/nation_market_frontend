import Server from './Server'

export default{
    storeShopPurchase(payload){
        const url = '/package/purchasing/shop/add'

        return Server.post_data(url,payload)
    },
    storeMarketPurchase(payload){
        const url ='/package/purchasing/market/add'

        return Server.post_data(url,payload)
    },
    storeMemberPurchase(payload){
        const url = '/member/packages/purchasing/store'

        return Server.post_data(url,payload)
    },
    deletePackage(packageId){
        const url = '/package/delete'

        return Server.post_data(url,packageId)
    },
    getPurPackagesByShop(shopId){
        const params = {shop_id:shopId}
        const url = 'package/purchasing/shop?'

        return Server.get_data(url,params)
    },
    getPurPackagesByMarket(memberId){
        const params = {member_id:memberId}
        const url = 'package/purchasing/market?'

        return Server.get_data(url,params)
    },
    getPurPackagesByMember(memberId){
        const params = {member_id:memberId}
        const url = 'member/packages/purchasing/get?'

        return Server.get_data(url,params)
    },
}