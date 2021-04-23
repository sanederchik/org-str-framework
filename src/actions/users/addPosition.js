const { dbObj } = require('../../db')
const { checkUserInDctUser } = require('./checkUserInDctUser')
const { checkDepInDctDep } = require('../deps/checkDepInDctDep')
const df = require('dateformat')

//создаем новую позицию
const addPosition = async(o) => {

    let newRow

    //проверяем, что все атрибуты o на месте
    if(
        !o.userId &&
        !o.depId &&
        o.isBossFlag === undefined &&
        o.isViceFlag === undefined &&
        !o.authorId
    ){
        return undefined
    }


    try {

        //проверяем, что если есть userId, то он существует в dct_users
        let check = await Promise.all([
            checkUserInDctUser(o.userId),
            checkDepInDctDep(o.depId)
            ]
        )

        check = await check.every(Boolean)

        if(!check){
            return undefined
        }

        let res = await dbObj.transaction( async(t) => 
        {

            //если есть, вставляем новый position_id в dct_positions
            let newPosition = await dbObj.models.dct_positions.create({
                user_id: o.userId,
                dtime_create: await new Date().toISOString(),
                dtime_update: await new Date().toISOString(),
                user_create: o.authorId,
                user_update: o.authorId,
                deleted_flag: false
            },
            {transaction: t}
            )

            //вставляем новый position_id в fct_positions_to_deps
            newRow = await dbObj.models.fct_positions_to_deps.create({

                position_id: await newPosition.getDataValue('position_id'),
                dep_id: o.depId,
                is_boss_flag: o.isBossFlag,
                is_vice_flag: o.isViceFlag,
                dt_start: o.dtStart || df(new Date(), 'yyyy-mm-dd'),
                dtime_create: await new Date().toISOString(),
                dtime_update: await new Date().toISOString(),
                user_create: o.authorId,
                user_update: o.authorId,
                deleted_flag: false
            },
            {transaction: t}
            )

        }
        )
    }
    catch(e)
    {
        return undefined
    }

    return newRow

}

exports.addPosition = addPosition
