const cheerio = require('cheerio')
const cheerioTableParser = require('cheerio-tableparser')
const axios = require('axios')

const url = symbol => `https://www.dividends.sg/view/${symbol}`

const parse = dividendString => {
  if (dividendString === '-') {
    return 0
  }
  return parseFloat(dividendString.split('SGD')[1])
}

module.exports = async symbol => {
  try {
    const data = []
    const link = url(symbol)
    const result = await axios.get(link)
    const $ = cheerio.load(result.data)
    cheerioTableParser($)
    const tableRows = $('table').parsetable(true, true, true)
    const dividends = tableRows[3]
    const dates = tableRows[4]
    if (!(dividends && dates)) {
      return data
    }
    for (let i = 1; i < dividends.length && i < dates.length; ++i) {
      const dividend = parse(dividends[i])
      const date = new Date(dates[i])
      data.push({ dividend, date })
    }
    return data
  } catch (err) {
    console.log(err)
  }
}