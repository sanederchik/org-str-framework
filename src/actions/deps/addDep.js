const { dbObj } = require('../../db')
const df = require('dateformat')

//создать новое подразделение
const addDep = async(o) => {

    let newRow

    //проверяем, что все атрибуты o на месте
    if(
        !o.depParentId === undefined &&
        !o.depName &&
        !o.authorId
    ){
        return undefined
    }


    try {
        let res = await dbObj.transaction( async(t) => 
        {

            //вставляем новый dep_id в dct_deps
            let newDep = await dbObj.models.dct_deps.create({
                dtime_create: await new Date().toISOString(),
                dtime_update: await new Date().toISOString(),
                user_create: o.authorId,
                user_update: o.authorId,
                deleted_flag: false
            },
            {transaction: t}
            )

            //вставляем новый dep_id в fct_deps
            newRow = await dbObj.models.fct_deps.create({
                dep_id: await newDep.getDataValue('dep_id'),
                dep_parent_id: o.depParentId,
                dep_name: o.depName,
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

exports.addDep = addDep 
