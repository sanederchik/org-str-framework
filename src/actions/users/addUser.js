const { dbObj } = require('../../db')

//создаем нового сотрудника
const addUser = async(o) => {

    let newRow

    //проверяем, что все атрибуты o на месте
    if(
        !o.userName && 
        !o.authorId
    ){
        return undefined
    }


    try {
        let res = await dbObj.transaction( async(t) => 
        {

            //вставляем новый user_id в dct_users
            newRow = await dbObj.models.dct_users.create({
                user_name: o.userName,
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

exports.addUser = addUser
