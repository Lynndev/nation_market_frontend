import Server from './Server'

export default{
    storeState(state){
        const url = '/state/store'

        return Server.post_data(url,state)
    },
    updateState(payload){
        const url = '/state/update'

        return Server.post_data(url,payload)
    },
    deleteState(stateId){
        const url = '/state/delete'

        return Server.post_data(url,stateId)
    },
    getStates(){
        const url = '/state/get'

        return Server.get_data(url)
    }
}