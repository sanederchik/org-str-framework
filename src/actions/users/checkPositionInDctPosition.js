const { dbObj } = require('../../db')

const checkPositionInDctPosition = async(positionId) => {
    if(!positionId){
        return undefined 
    }
            
    let d = await dbObj.models.dct_positions.findByPk(positionId)
    
    //если нет, то возвратить false
    if(!d){
        return false
    }

    return true

}

exports.checkPositionInDctPosition = checkPositionInDctPosition