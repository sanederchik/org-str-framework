const { dbObj } = require('../../db')
const { QueryTypes } = dbObj

//переименовать подразделение с определенной даты
//перемещение подразделения куда-то
const getDctDep = async() => {

    let newRow

    try {

        //создаем запись

        let res = await dbObj.transaction( async(t) => 
        {

            //получаем последнюю известную запись из fct_deps
            newRow = await dbObj.query(`
                Select
                *
                FROM 
                dct_deps
                WHERE 1=1
                    AND deleted_flag = false
                order by 
                    dtime_update desc`, 
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

exports.getDctDep = getDctDep