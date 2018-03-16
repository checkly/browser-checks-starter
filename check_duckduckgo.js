const assert = require('assert')
const puppeteer = require('puppeteer')

let browser
let page

before(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
})

describe('Duck Duck Go Search', () => {
  it('returns Chrome Puppeteer Github repo as first search result"', async () => {

    await page.goto('https://duckduckgo.com/', { waitUntil: 'networkidle2' })
    await page.type('input#search_form_input_homepage', 'chrome puppeteer', { delay: 50 })
    await page.click('input#search_button_homepage')
    await page.waitForSelector('.results--main #r1-0')
    
    const githubLink = await page.evaluate(() => document.querySelector('a.result__a').textContent.trim())
    assert(githubLink, 'https://github.com/GoogleChrome/puppeteer')
    await page.screenshot({ path: 'duckduckgo.png' })
  }).timeout(10000)
})

after(async () => {
  await browser.close()
})