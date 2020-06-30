import Server from './Server'

export default{
    getProductsByMarket(){
        const url = 'markets/products/get'

        return Server.get_data(url)
    },
    getProductsByShopId(shopId){
        const url = 'shops/products/get?'

        const params = { shop_id:shopId}

        return Server.get_data(url,params)
    }
}