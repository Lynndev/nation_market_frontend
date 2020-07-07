import Server from './Server'

export default{
    storeProperty(payload){
        const url = '/properties/store'

        return Server.post_data(url,payload)
    },
    updateProperty(payload){
        const url = '/properties/update'

        return Server.post_data(url,payload)
    },
    deleteProperty(proId){
        const url = '/properties/delete'

        return Server.post_data(url,proId)
    },
    getPropertiesByCatId(catId){
        const params = {category_id:catId}
        const url = 'properties/get?'

        return Server.get_data(url,params)
    }
}