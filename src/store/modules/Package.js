import Package from './../../services/Package'

const state = {
   packages:[],
   memberPackages:[]
}
const getters = {
   
}
const mutations = {
    SET_PACKAGES(state,packages){
        state.packages = packages.data.data
    },
    SET_MEMBER_PACKAGES(state,memberPackages){
        state.memberPackages = memberPackages.data.data
    }
}

const actions = {
    storePackage({dispatch},payload){
        Package.storePackage(payload)
            .then(() => {
                console.log(payload)
                const notification = {
                    type:'success',
                    status:true,
                     message:'package create Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })

                dispatch('getPackagesByMainId',payload.main_category_id)
            })
       
    },
    storeMemberPackage({dispatch},payload){
        Package.storeMemberPackage(payload)
            .then((response) => {
                console.log(response)
                const notification = {
                    type:'success',
                    status:true,
                     message:'member package create Successfully'
                }

                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getMemberPackages')
            })
       
    },
    updatePackage({dispatch},payload){
        Package.updatePackage(payload)
            .then((response) => {
                console.log(response)
                const notification = {
                    type:'success',
                    status:true,
                     message:'Update package Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getPackagesByMainId',payload.main_category_id)
                
            })
       
    },
    deletePackage({dispatch},payload){
        Package.deletePackage({id:payload.id})
            .then((response) => {
                console.log(response)

                const notification = {
                    type:'success',
                    status:true,
                     message:'delete package Successfully'
                }
                dispatch('Notification/add',notification,{ root: true })
                
                dispatch('getPackagesByMainId',payload.main_category_id)
            })
       
    },
    getPackagesByMainId({commit},mainCategoryId){
        Package.getPackagesByMainId(mainCategoryId)
            .then(packages => {
                commit('SET_PACKAGES',packages)
                console.log(packages);
            })
    },
    getMemberPackages({commit}){
        Package.getMemberPackages()
            .then(memberPackages => {
                commit('SET_MEMBER_PACKAGES',memberPackages)
                console.log(memberPackages);
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