import Server from './Server'

export default{
    storeTnc(payload){
        const url  = 'tnc/store'

        return Server.post_data(url,payload)
    },
    getTncs(){
        const url = '/tnc/get'

        return Server.get_data(url)
    }
}