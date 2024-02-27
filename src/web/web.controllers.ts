import path from 'node:path'
import type { Request, Response } from 'express'
import webValidations from '../validations/web'
import puppeteer from 'puppeteer'

async function getWebIcon (req: Request, res: Response) {
  try {
    const { url } = webValidations.iconQueries.parse(req.query)

    if (url === undefined) {
      res.sendFile(path.join(__dirname, '/world.svg'))
      return
    }

    const webUrl = new URL(url)
    const response = await fetch(url)
    const contentType = response.headers.get('content-type')

    if (contentType !== null && !(contentType.includes('text') && contentType.includes('html'))) {
      res.json({
        error: 'The response content type is not text/html'
      })
      return
    }

    // '<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">'
    const htmlText = await response.text()
    // console.log(htmlText)
    if (!(htmlText.includes('<link') && htmlText.includes('rel="icon'))) {
      res.sendFile(path.join(__dirname, '/world.svg'))
      const browser = await puppeteer.launch({
        headless: false
        // slowMo: 100
      })
      const page = await browser.newPage()
      await page.goto(url) // Espera a que la página termine de cargar

      // Ejecutar JavaScript en la página para obtener el enlace del icono
      const iconUrl = await page.evaluate(() => {
        const iconElement = document.querySelector('link[rel="icon"]') ?? document.querySelector('link[rel="shortcut icon"]')
        return iconElement instanceof HTMLLinkElement ? iconElement.href : null
      })
      await browser.close()
      console.log(iconUrl)

      return
    }
    const firstLinkIndex = htmlText.indexOf('<link')
    // console.log(htmlText.slice(firstLinkIndex))
    const startIcon = htmlText.indexOf('rel="icon"', firstLinkIndex)
    const startHref = htmlText.indexOf('href=', startIcon) + 6
    let iconHref = htmlText.slice(startHref, htmlText.indexOf('"', startHref))

    if (!iconHref.startsWith('http')) {
      iconHref = webUrl.origin + iconHref
    }

    console.log({ iconHref })
    const iconRes = await fetch(iconHref)
    const iconContentType = iconRes.headers.get('content-type')

    const buffer = Buffer.from(await iconRes.arrayBuffer())

    res.setHeader('content-type', iconContentType ?? 'image/x-icon')
    res.send(buffer)

    // res.json({ message: 'hello web icon', url, iconHref })
  } catch (error) {
    res.json(error)
  }
}

export default {
  getWebIcon
}
