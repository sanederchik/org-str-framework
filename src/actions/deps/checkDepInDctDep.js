const { dbObj } = require('../../db')

const checkDepInDctDep = async(depId) => {
    if(!!depId && depId !== -1){
            
        let d = await dbObj.models.dct_deps.findByPk(depId)
        
        //если нет, то возвратить false
        if(!d){
            return false
        }
    }

    return true

}

exports.checkDepInDctDep = checkDepInDctDep