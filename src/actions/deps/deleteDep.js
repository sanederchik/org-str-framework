const { dbObj } = require('../../db')
const df = require('dateformat')
const { getCurrentFctPositionToDep } = require('../users/getCurrentFctPositionToDep')
const { changeDep } = require('../deps/changeDep')
const { checkDepInDctDep } = require('./checkDepInDctDep')


//удалить подразделение
const deleteDep = async(o) => {

    let newRow

    //проверяем, что все атрибуты o на месте
    if(
        !o.depId && 
        !o.authorId
    ){
        return undefined
    }

    try {

        //проверяем наличие dep_id в dct_deps

        let check = await checkDepInDctDep(o.depId)

        if(!check){
            return undefined
        }


        //проверяем, что в это подразделении нет сотрудников
        //если есть, выдаем ошибку

        ////все актуальные записи
        let fctPositionsToDeps = await getCurrentFctPositionToDep()

        ////фильтруем, оставляя только те, где dep_id = :depId
        let positions = fctPositionsToDeps.filter( (x) => {
            x.dep_id == o.depId
        })

        ////если присутствуют, вернуть пустоту
        if(positions.length > 0){
            return undefined 
        }

        //поставить dep_parent_id = -1 для этого dep
        newRow = await changeDep({
            depId: o.depId,
            depParentId: -1,
            authorId: o.authorId
        })

    }
    catch(e)
    {
        return undefined
    }

    return newRow

}

exports.deleteDep = deleteDep 
