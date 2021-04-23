const { dbObj } = require('../../db')

const checkUserInDctUser = async(userId) => {
    if(!!userId){
            
        let d = await dbObj.models.dct_users.findByPk(userId)
        
        //если нет, то возвратить false
        if(!d){
            return false
        }
    }

    return true

}

exports.checkUserInDctUser = checkUserInDctUser