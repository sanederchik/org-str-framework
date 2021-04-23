//скрипт для получения списка актуальных позиций

const { dbObj } = require('../../db')
const { QueryTypes } = dbObj

const getCurrentFctPositionToDep = async() => {

    let newRow

    try {

        //создаем запись

        let res = await dbObj.transaction( async(t) => 
        {

            newRow = await dbObj.query(`
            Select 
            *
            from 
            (
                Select
                    *,
                    ROW_NUMBER() over (
                        partition by position_id
                        order by dt_start desc, dtime_update desc 
                    ) as rn
                    
                FROM 
                    fct_positions_to_deps
                where 1=1
                    and deleted_flag = false
            ) t1
            where 1=1
                and rn = 1`, 
            { 
            type: QueryTypes.SELECT 
            })
                
            }
        )
    }
    catch(e)
    {
        return undefined
    }

    return newRow


}

exports.getCurrentFctPositionToDep = getCurrentFctPositionToDep