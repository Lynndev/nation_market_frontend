import Server from './Server'

export default{
    storeMember(payload){
        const url  = 'member/store'

        return Server.post_data(url,payload)
    },
    updateMember(payload){
        const params = {id:payload.id}

        const url  = 'member/update'

        return Server.post_data(url,payload,params)
    },
    getMembers(){
        const url = 'member/get'

        return Server.get_data(url)
    }
}