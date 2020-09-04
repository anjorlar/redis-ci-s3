// require('dotenv').config()
// const puppeteer = require('puppeteer')
// const { Buffer } = require('safe-buffer')
// const Keygrip = require('keygrip')
// const keys = process.env.COOKIE_KEY
// const keygrip = new Keygrip([keys])

// let browser, page;

// beforeEach(async () => {
//     browser = await puppeteer.launch({
//         headless: false
//     })
//     page = await browser.newPage()
//     await page.goto('http://localhost:3000')
// })

// afterEach(async () => {
//     // await browser.close()
// })

// test('header has correct text', async () => {
//     const text = await page.$eval('a.brand-logo', el => el.innerHTML)

//     expect(text).toBe('Blogster')
// }, 30000)

// test('clicking login strats oauth flow', async () => {
//     await page.click('.right a')

//     const url = await page.url()
//     expect(url).toMatch(/accounts\.google\.com/)
// })

// test.only('When signed in shows logout button', async () => {
//     // Take the session id to generate a fake session
//     const id = '5f4d0f622b3b244336848cb8';
//     // create a fake session object
//     const sessionObject = {
//         passport: {
//             user: id
//         }
//     }
//     //turn it into a string
//     const sessionString = Buffer.from(
//         JSON.stringify(sessionObject)
//     ).toString('base64');

//     // generate the session.sig
//     const sig = keygrip.sign('session=' + sessionString)
//     await page.setCookie({ name: 'session', value: sessionString })
//     await page.setCookie({ name: 'sess.sig', value: sig })
//     await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
//     // await page.waitFor('a[href="/auth/logout"]')


//     const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML)
//     console.log('text', text)
//     expect(text).toBe('Logout')
// }, 30000)