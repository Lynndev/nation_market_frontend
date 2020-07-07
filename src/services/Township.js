import Server from './Server'

export default{
    storeTownship(payload){
        const url = '/township/store'

        return Server.post_data(url,payload)
    },
    updateTownship(payload){
        const url = '/township/update'

        return Server.post_data(url,payload)
    },
    deleteTownship(townshipId){
        const url = '/township/delete'

        return Server.post_data(url,townshipId)
    },
    getTownshipByStateId(stateId){
        const params = {state_id:stateId}
        const url = 'township/get?'

        return Server.get_data(url,params)
    }
}