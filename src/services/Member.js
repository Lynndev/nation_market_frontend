import Server from './Server'

export default{
    storeMember(payload){
        const url  = 'member/store'

        return Server.post_data(url,payload)
    },
    updateMember(payload){
        let memberId = payload.get('id')
        const params = {id:memberId}

        const url  = 'member/update?'

        return Server.post_data(url,payload,params)
    },
    blockMember(memberId){
        const params = {id:memberId}

        const url  = 'member/block?'

        const payload = null
        return Server.post_data(url,payload,params)
    },
    unblockMember(memberId){
        const params = {id:memberId}

        const url  = 'member/unblock?'

        const payload = null
        return Server.post_data(url,payload,params)
    },
    getBlockMembers(){
        const url = 'member/block'

        return Server.get_data(url)
    },
    getMembers(){
        const url = 'member/get'

        return Server.get_data(url)
    }
}