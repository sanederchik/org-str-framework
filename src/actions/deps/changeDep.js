const { dbObj } = require('../../db')
const { QueryTypes } = dbObj
const {checkDepInDctDep} = require('./checkDepInDctDep')
const df = require('dateformat')


//переименовать подразделение с определенной даты
//перемещение подразделения куда-то
const changeDep = async(o) => {

    let newRow

    //проверяем, что все атрибуты o на месте
    if(
        !o.depId &&
        !o.authorId
    ){
        return undefined
    }

    try {
        //проверяем наличие dep_id и dep_parent_id в dct_deps
        let check = await Promise.all([
            checkDepInDctDep(o.depId),
            checkDepInDctDep(o.depParentId)
        ])

        check = await check.every(Boolean)

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
                fct_deps
                WHERE 1=1
                    AND deleted_flag = false
                    AND dep_id = :depId
                order by 
                    dt_start desc,
                    dtime_update desc
                limit 1`, 
            { 
            replacements: {depId: o.depId},
            type: QueryTypes.SELECT 
            })

            row = row[0]

            //вставляем новую запись в fct_deps
            newRow = await dbObj.models.fct_deps.create({
                dep_id: row.dep_id,
                dep_parent_id: o.depParentId || row.dep_parent_id,
                dep_name: o.depName || row.dep_name,
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

exports.changeDep = changeDep