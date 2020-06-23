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
    blockMember(memberId){
        const params = {id:memberId}

        const url  = 'member/block'


        return Server.post_data_params(url,params)
    },
    getMembers(){
        const url = 'member/get'

        return Server.get_data(url)
    }
}