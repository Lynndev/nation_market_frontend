import Server from './Server'

export default{
    storePackage(payload){
        const url = '/package/store'

        return Server.post_data(url,payload)
    },
    storeMemberPackage(payload){
        const url = '/member/packages/store'

        return Server.post_data(url,payload)
    },
    updatePackage(payload){
        const url = '/package/update'

        return Server.post_data(url,payload)
    },
    deletePackage(packageId){
        const url = '/package/delete'

        return Server.post_data(url,packageId)
    },
    getPackagesByMainId(mainId){
        const params = {main_category_id:mainId}
        const url = 'package/get?'

        return Server.get_data(url,params)
    },
    getMemberPackages(){
        const url = '/member/packages/get'

        return Server.get_data(url)
    }
}