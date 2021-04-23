const database = require('mime-db');
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    {
    database: process.env['DB_NAME'],
    username: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    host: process.env['DB_HOST'],
    dialect: 'mysql'
  })

//справочник пользователей
const dctUsers = sequelize.define('dct_users', {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dtime_create: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dtime_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_create: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_update: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

  },
  {
    timestamps: false
  }
)

//справочник привязки штатных позиций к объекту users
const dctPositions = sequelize.define('dct_positions', {
    // Model attributes are defined here
    position_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dtime_create: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dtime_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_create: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_update: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

  },
  {
    timestamps: false
  }
)

//справочник подразделений для нахождения максимального
const dctDeps = sequelize.define('dct_deps', {
  // Model attributes are defined here
  dep_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dtime_create: {
      type: DataTypes.DATE,
      allowNull: false
  },
  dtime_update: {
      type: DataTypes.DATE,
      allowNull: false
  },
  user_create: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  user_update: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  deleted_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  }

},
{
  timestamps: false
}
)


//фактическая таблица подразделений
const fctDeps = sequelize.define('fct_deps', {
    // Model attributes are defined here
    record_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dep_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dep_parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true //null - это элемент 0 уровня, -1 - удаленный
    },
    dep_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dt_start: {
        type: DataTypes.DATE,
        allowNull: false
    },

    dtime_create: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dtime_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_create: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_update: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

  },
  {
    timestamps: false
  }
)

//фактическая таблица привязки сотрудников к подразделениям
const fctPositionsToDeps = sequelize.define('fct_positions_to_deps', {
    // Model attributes are defined here
    record_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dep_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    is_boss_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    is_vice_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    dt_start: {
        type: DataTypes.DATE,
        allowNull: false
    },

    dtime_create: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dtime_update: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_create: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_update: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

  },
  {
    timestamps: false
  }
)


const dbInit = async() => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        
        // await Promise.all([
        //     dctUsers.sync({force: true}),
        //     dctPositions.sync({force: true}),
        //     dctDeps.sync({force: true}),
        //     fctDeps.sync({force: true}),
        //     fctPositionsToDeps.sync({force: true})
        // ])
        
      } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    
}

exports.dbInit = dbInit
exports.dbObj = sequelize
