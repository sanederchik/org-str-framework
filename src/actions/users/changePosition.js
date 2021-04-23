const { dbObj } = require('../../db')
const { QueryTypes } = dbObj
const {checkPositionInDctPosition} = require('./checkPositionInDctPosition')
const df = require('dateformat')


//добавление записи в fct_positions_to_deps
const changePosition = async(o) => {

    let newRow

    //проверяем, что все атрибуты o на месте
    if(
        !o.positionId &&
        !o.authorId
    ){
        return undefined
    }

    try {

        //находим сотрудника через пользователя
        let check = await checkPositionInDctPosition(o.positionId)

        if(!check){
            return undefined
        }

        //создаем запись

        let res = await dbObj.transaction( async(t) => 
        {

            //получаем последнюю известную запись из fct_deps
            let row = await dbObj.query(`
                Select
                *
                FROM 
                fct_positions_to_deps
                WHERE 1=1
                    AND deleted_flag = false
                    AND position_id = :positionId
                order by 
                    dt_start desc,
                    dtime_update desc
                limit 1`, 
            { 
            replacements: {positionId: o.positionId},
            type: QueryTypes.SELECT 
            })

            row = row[0]

            //вставляем новую запись в fct_deps
            newRow = await dbObj.models.fct_positions_to_deps.create({
                position_id: o.positionId,
                dep_id: o.depId || row.dep_id,
                is_boss_flag: o.isBossFlag || row.is_boss_flag,
                is_vice_flag: o.isViceFlag || row.is_vice_flag,
                dt_start: o.dtStart || df(new Date(), 'yyyy-mm-dd'),
                dtime_create: row.dtime_create,
                dtime_update: await new Date().toISOString(),
                user_create: row.user_create,
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

exports.changePosition = changePosition