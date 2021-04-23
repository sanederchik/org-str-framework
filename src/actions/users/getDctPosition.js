const { dbObj } = require('../../db')
const { QueryTypes } = dbObj

//переименовать подразделение с определенной даты
//перемещение подразделения куда-то
const getDctPosition = async() => {

    let newRow

    try {

        //создаем запись

        let res = await dbObj.transaction( async(t) => 
        {

            //получаем все записи с определенным userId
            newRow = await dbObj.query(`
                Select
                *
                FROM 
                dct_positions
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

exports.getDctPosition = getDctPosition