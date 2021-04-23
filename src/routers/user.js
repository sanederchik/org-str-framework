const express = require('express')
const router = new express.Router()

const { addUser } = require('../actions/users/addUser')
const { addPosition } = require('../actions/users/addPosition')
const { changePosition } = require('../actions/users/changePosition')

const { getDctUser } = require('../actions/users/getDctUser')
const { getDctPosition } = require('../actions/users/getDctPosition')
const { getFctPositionToDep } = require('../actions/users/getFctPositionToDep')

//создать сотрудника
router.post('/addUser', async (req, res) => {

    let body = req.body

    let r = await addUser(body)

    if(!r){
        res.status(400).send({
            error: 'Не получилось создать сотрудника'
        })
        return

    }

    res.status(201).send(r.dataValues)

    }
)

//создать позицию
router.post('/addPosition', async (req, res) => {

    let body = req.body

    let r = await addPosition(body)

    if(!r){
        res.status(400).send({
            error: 'Не получилось создать позицию'
        })
        return

    }

    res.status(201).send(r.dataValues)

    }
)


//поменять привязанность позиции
router.post('/changePosition', async (req, res) => {

    let body = req.body

    let r = await changePosition(body)

    if(!r){
        res.status(400).send({
            error: 'Не получилось поменять позицию'
        })
        return

    }

    res.status(201).send(r.dataValues)

    }
)

//получить список сотрудников
router.get('/getDctUser', async (req, res) => {

    let r = await getDctUser()

    if(!r){
        res.status(400).send({
            error: 'Не получилось поменять позицию'
        })
        return

    }

    res.status(200).send(r)

    }
)

//получить список позиций
router.get('/getDctPosition', async (req, res) => {

    let r = await getDctPosition()

    if(!r){
        res.status(400).send({
            error: 'Не получилось поменять позицию'
        })
        return

    }

    res.status(200).send(r)

    }
)

//получить таблицу fct_positions_to_deps
router.get('/getFctPositionToDep', async (req, res) => {

    let r = await getFctPositionToDep()

    if(!r){
        res.status(400).send({
            error: 'Не получилось поменять позицию'
        })
        return

    }

    res.status(200).send(r)

    }
)

module.exports = router