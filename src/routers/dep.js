const express = require('express')
const router = new express.Router()
const { addDep } = require('../actions/deps/addDep')
const { changeDep } = require('../actions/deps/changeDep')
const { getDctDep } = require('../actions/deps/getDctDep')
const { getFctDep } = require('../actions/deps/getFctDep')
const { deleteDep } = require('../actions/deps/deleteDep')

//создать подразделение
router.post('/addDep', async (req, res) => {

    let body = req.body

    let r = await addDep(body)

    if(!r){
        res.status(400).send({
            error: 'Не получилось создать подразделение'
        })
        return

    }

    res.status(201).send(r.dataValues)

    }
)

//поменять подразделение
router.post('/changeDep', async (req, res) => {

    let body = req.body

    let r = await changeDep(body)

    if(!r){
        res.status(400).send({
            error: 'Не получилось поменять один или более атрибутов подразделения'
        })
        return

    }

    res.status(201).send(r.dataValues)

    }
)

//поменять название подразделения
router.post('/deleteDep', async (req, res) => {

    let body = req.body

    let r = await deleteDep(body)

    if(!r){
        res.status(400).send({
            error: 'Не получилось удалить подразделение'
        })
        return

    }

    res.status(201).send(r.dataValues)

    }
)

//получить справочник всех подразделений
router.get('/getDctDep', async (req, res) => {

    let r = await getDctDep()

    if(!r){
        res.status(400).send({
            error: 'Не удалось получить данные'
        })
        return

    }

    res.status(200).send(r)

    }
)

//получить таблицу изменений подразделений
router.get('/getFctDep', async (req, res) => {

    let r = await getFctDep()

    if(!r){
        res.status(400).send({
            error: 'Не удалось получить данные'
        })
        return

    }

    res.status(200).send(r)

    }
)

module.exports = router