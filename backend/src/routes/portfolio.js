const Portfolio = require('../models/portfolio-model')
const PortfolioHistory = require('../models/portfolio-history-model')
const express = require('express')
const router = express.Router()

router.get('/get', (req, res) => {
  const userid = req.query.userid
  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      if (portfolio) {
        res.status(200).json({
          message: `getting portfolio of ${userid}`,
          portfolio,
        })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.post('/add', (req, res) => {
  const userid = req.body.userid
  const symbol = req.body.symbol
  const name = req.body.name
  const units = req.body.units
  const investedCapital = req.body.investedCapital
  const dividends = req.body.dividends
  const currentValue = req.body.currentValue

  const symbolObj = {
    symbol,
    name,
    units,
    investedCapital,
    dividends,
    currentValue,
  }

  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      if (portfolio) {
        const check = portfolio.symbols.find(elem => elem.symbol === symbol)
        if (!check) {
          Portfolio
            .findOneAndUpdate(
              { userid },
              { $push: { symbols: symbolObj } }
            )
            .then(portfolio => Portfolio.findOne({ userid }))
            .then(portfolio => res.status(200).json({
              message: `added ${symbol} to portfolio`,
              portfolio,
            }))
            .catch(err => res.sendStatus(500))
        } else {


          const userid = req.body.userid
          const symbol = req.body.symbol
          const req_name = req.body.name
          const req_units = req.body.units
          const req_investedCapital = req.body.investedCapital
          const req_dividends = req.body.dividends
          const req_currentValue = req.body.currentValue
          Portfolio
            .findOne({ userid })
            .then(portfolio => {
              if (portfolio) {
                const symbols = portfolio.symbols
                const elem = symbols.find(elem => elem.symbol === symbol)
                if (elem) {
                  elem.name = (req_name === undefined) ? elem.name : req_name
                  elem.units = (req_units === undefined) ? elem.units : req_units
                  elem.investedCapital = (req_investedCapital === undefined) ? elem.investedCapital : req_investedCapital
                  elem.dividends = (req_dividends === undefined) ? elem.dividends : req_dividends
                  elem.currentValue = (req_currentValue === undefined) ? elem.currentValue : req_currentValue
                  Portfolio
                    .findOneAndUpdate({ userid }, { symbols })
                    .then(portfolio => Portfolio.findOne({ userid }))
                    .then(portfolio => res.status(200).json({
                      message: `updated ${symbol} for ${userid}`,
                      portfolio,
                    }))
                    .catch(err => res.sendStatus(500))
                } else {
                  res.sendStatus(404)
                }
              } else {
                res.sendStatus(404)
              }
            })
            .catch(err => res.sendStatus(500))
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.post('/delete', (req, res) => {
  const userid = req.body.userid
  const symbol = req.body.symbol

  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      if (portfolio) {
        const check = portfolio.symbols.find(elem => elem.symbol === symbol)
        if (check) {
          Portfolio
            .findOneAndUpdate(
              { userid },
              { $pull: { symbols: check } }
            )
            .then(portfolio => Portfolio.findOne({ userid }))
            .then(portfolio => res.status(200).json({
              message: `deleted ${symbol} from portfolio`,
              portfolio,
            }))
            .catch(err => res.sendStatus(500))
        } else {
          res.sendStatus(400)
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.post('/update', (req, res) => {
  const userid = req.body.userid
  const symbol = req.body.symbol
  const req_name = req.body.name
  const req_units = req.body.units
  const req_investedCapital = req.body.investedCapital
  const req_dividends = req.body.dividends
  const req_currentValue = req.body.currentValue

  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      if (portfolio) {
        const symbols = portfolio.symbols
        const elem = symbols.find(elem => elem.symbol === symbol)
        if (elem) {
          elem.name = (req_name === undefined) ? elem.name : req_name
          elem.units = (req_units === undefined) ? elem.units : req_units
          elem.investedCapital = (req_investedCapital === undefined) ? elem.investedCapital : req_investedCapital
          elem.dividends = (req_dividends === undefined) ? elem.dividends : req_dividends
          elem.currentValue = (req_currentValue === undefined) ? elem.currentValue : req_currentValue
          Portfolio
            .findOneAndUpdate({ userid }, { symbols })
            .then(portfolio => Portfolio.findOne({ userid }))
            .then(portfolio => res.status(200).json({
              message: `updated ${symbol} for ${userid}`,
              portfolio,
            }))
            .catch(err => res.sendStatus(500))
        } else {
          res.sendStatus(404)
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.post('/save', (req, res) => {
  const userid = req.body.userid
  const req_totalCapital = req.body.totalCapital
  const req_totalValue = req.body.totalValue
  const req_realisedProfits = req.body.realisedProfits

  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      if (portfolio) {
        const totalCapital = (req_totalCapital === undefined) ? portfolio.totalCapital : req_totalCapital
        const totalValue = (req_totalValue === undefined) ? portfolio.totalValue : req_totalValue
        const realisedProfits = (req_realisedProfits === undefined) ? portfolio.realisedProfits : req_realisedProfits
        Portfolio
          .findOneAndUpdate(
            { userid },
            { totalCapital, totalValue, realisedProfits }
          )
          .then(portfolio => Portfolio.findOne({ userid }))
          .then(portfolio => res.status(200).json({
            message: `updated ${symbol}'s portfolio`,
            portfolio,
          }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.get('/logs', (req, res) => {
  const size = req.query.size
  const userid = req.query.userid
  PortfolioHistory
    .find({ userid })
    .sort({ year: -1 })
    .then(portfolios => {
      const logs = []
      portfolios.forEach(portfolio => portfolio.history.reduceRight((prev, next) => logs.push(next), null))
      logs.splice(size)
      res.status(200).json({
        message: `getting ${userid}'s logs, size: ${logs.length}`,
        logs,
      })
    })
    .catch(err => res.sendStatus(500))
})

router.post('symbol/units/:action', (req, res) => {
  const userid = req.body.userid
  const symbol = req.body.symbol
  const action = req.params.action
  const units = req.body.action
  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      const symbols = portfolio.symbols
      const obj = symbols.find(x => x.symbol === symbol)
      if (obj) {
        if (action !== 'add' || action !== 'sub') {
          res.sendStatus(404)
        } else {
          if (action === 'add') obj.units += units
          if (action === 'sub') obj.units -= units
          Portfolio
            .findOneAndUpdate({ userid }, symbols)
            .then(done => Portfolio.findOne({ userid }))
            .then(portfolio => res.status(200).json({
              message: `updated units`,
              portfolio,
            }))
            .catch(err => res.sendStatus(500))
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.post('symbol/investedCapital/:action', (req, res) => {
  const userid = req.body.userid
  const symbol = req.body.symbol
  const action = req.params.action
  const investedCapital = req.body.investedCapital
  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      const symbols = portfolio.symbols
      const obj = symbols.find(x => x.symbol === symbol)
      if (obj) {
        if (action !== 'add' || action !== 'sub') {
          res.sendStatus(404)
        } else {
          if (action === 'add') obj.investedCapital += investedCapital
          if (action === 'sub') obj.investedCapital -= investedCapital
          Portfolio
            .findOneAndUpdate({ userid }, symbols)
            .then(done => Portfolio.findOne({ userid }))
            .then(portfolio => res.status(200).json({
              message: `updated investedCapital`,
              portfolio,
            }))
            .catch(err => res.sendStatus(500))
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

router.post('/symbol/dividend/:action', (req, res) => {
  const userid = req.body.userid
  const symbol = req.body.symbol
  const action = req.params.action
  const dividends = req.body.dividend
  Portfolio
    .findOne({ userid })
    .then(portfolio => {
      const symbols = portfolio.symbols
      const obj = symbols.find(x => x.symbol === symbol)
      if (obj) {
        if (action !== 'add' || action !== 'sub') {
          res.sendStatus(400)
        } else {
          if (action === 'add') obj.dividends += dividends
          if (action === 'sub') obj.dividends -= dividends
          Portfolio
            .findOneAndUpdate({ userid }, symbols)
            .then(done => Portfolio.findOne({ userid }))
            .then(portfolio => res.status(200).json({
              message: `updated dividends`,
              portfolio,
            }))
            .catch(err => res.sendStatus(500))
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(err => res.sendStatus(500))
})

module.exports = router