const { dbObj } = require('../../db')
const { QueryTypes } = dbObj

//получить таблицу фактических значений
const getFctPositionToDep = async(depId) => {

    let newRow
    let queryStr

    try {

        //создаем запись

        let res = await dbObj.transaction( async(t) => 
        {

            //получаем последнюю известную запись из fct_deps

            if(!depId){

                newRow = await dbObj.query(`
                    Select
                    *
                    FROM 
                    fct_positions_to_deps
                    WHERE 1=1
                        AND deleted_flag = false
                    order by 
                        dt_start desc,
                        dtime_update desc`, 
                { 
                type: QueryTypes.SELECT 
                })
                
            }
            //если есть dep_id, возвращаем только по нему
            else
            {

                newRow = await dbObj.query(`
                    Select
                    *
                    FROM 
                    fct_positions_to_deps
                    WHERE 1=1
                        AND deleted_flag = false
                        AND dep_id = :depId
                    order by 
                        dt_start desc,
                        dtime_update desc`, 
                { 
                type: QueryTypes.SELECT,
                replacements: {depId: o.depId}
                })

            }

        }
        )
    }
    catch(e)
    {
        return undefined
    }

    return newRow


}

exports.getFctPositionToDep = getFctPositionToDep