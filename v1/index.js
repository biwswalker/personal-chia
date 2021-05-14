const express = require('express')
const _ = require('lodash')
const wallet_query = require('../querys/wallet')
const harvester_draw_query = require('../querys/harvester_draw')
const logs = require('../functions/tail')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ status: 'API V1.' })
})

router.get('/me', async (req, res) => {
    try {
        const wallet = await wallet_query.get_wallet()
        const harvester_draw = await harvester_draw_query.get_harvester_draw(10)
        const challenge = await harvester_draw_query.get_challenge_per_day(3)
        const plots = _.max(harvester_draw.map(item => item.draw_plots))
        const response = {
            status: 200,
            plots,
            wallet,
            challenge_count: challenge.map(challenge => ({ count: challenge.total_plot, date: moment(harvester_date.harvester_date, 'DD-MM-YYYY').format()})),
            harvester_draw,
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ status: 400, error })
    }
})

router.get('/unlisten', (req, res) => {
    console.log('unwatch.')
    logs.unwatch()
    res.status(200).json({ status: 'Unlistened.' })
})

router.get('/listen', (req, res) => {
    console.log('watch.')
    logs.watch()
    res.status(200).json({ status: 'Listened.' })
})

module.exports = router