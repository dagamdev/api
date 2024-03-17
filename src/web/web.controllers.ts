import type { Request, Response } from 'express'
import webValidations from '../validations/web'

const svgWorld = `<svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
fill="none"
stroke-linecap="round"
stroke-linejoin="round"
>
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
<path d="M3.6 9h16.8" />
<path d="M3.6 15h16.8" />
<path d="M11.5 3a17 17 0 0 0 0 18" />
<path d="M12.5 3a17 17 0 0 1 0 18" />
<style>
  svg {
    color-scheme: light dark;
  }
</style>
</svg>`

async function getWebIcon (req: Request, res: Response) {
  try {
    const { url } = webValidations.iconQueries.parse(req.query)

    if (url === undefined) {
      res.setHeader('content-type', 'image/svg+xml')
      res.send(svgWorld)
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

    const htmlText = await response.text()

    if (!(htmlText.includes('<link') && htmlText.includes('rel="icon'))) {
      res.setHeader('content-type', 'image/svg+xml')
      res.send(svgWorld)
      return
    }

    function iconIncludes (text: string, index?: number) {
      return text.includes('rel="icon', index) || text.includes('rel="apple-touch-icon', index)
    }

    let iconHref = ''
    let startPoint = 0
    let size = 0

    while (htmlText.includes('<link', startPoint) && iconIncludes(htmlText, startPoint)) {
      const startLink = htmlText.indexOf('<link', startPoint)
      const endLink = htmlText.indexOf('>', startLink)
      const linkTag = htmlText.slice(startLink, endLink)

      startPoint = endLink
      if (!iconIncludes(linkTag)) {
        continue
      }

      const startHref = htmlText.indexOf('href=', startLink) + 6
      const endHref = htmlText.indexOf('"', startHref)

      if (iconHref.length === 0) iconHref = htmlText.slice(startHref, endHref)

      if (linkTag.includes('sizes=')) {
        const startSizes = htmlText.indexOf('sizes=', startLink) + 7
        const endSizes = htmlText.indexOf('"', startSizes)
        const sizes = +htmlText.slice(startSizes, endSizes).split('x')[0]

        if (size < sizes) {
          iconHref = htmlText.slice(startHref, endHref)
          size = sizes
        }
      }
    }

    if (!iconHref.startsWith('http')) {
      iconHref = `${webUrl.origin}/${iconHref}`
    }

    const iconRes = await fetch(iconHref)
    const iconContentType = iconRes.headers.get('content-type')
    const buffer = Buffer.from(await iconRes.arrayBuffer())

    res.setHeader('content-type', iconContentType ?? 'image/x-icon')
    res.send(buffer)
  } catch (error) {
    console.log(req.query, error)
    res.json(error)
  }
}

async function getWebData (req: Request, res: Response) {
  try {
    const { url } = webValidations.iconQueries.parse(req.query)

    if (url === undefined) {
      res.setHeader('content-type', 'image/svg+xml')
      res.send(svgWorld)
      return
    }

    const response = await fetch(url)
    const contentType = response.headers.get('content-type')

    if (contentType !== null && !(contentType.includes('text') && contentType.includes('html'))) {
      res.json({
        error: 'The response content type is not text/html'
      })
      return
    }

    const htmlText = await response.text()

    const titleTag = 'title>'
    const startTitle = htmlText.indexOf(titleTag) + 6
    const endTitle = htmlText.indexOf(titleTag, startTitle)
    const title = htmlText.slice(startTitle, endTitle - 2)

    const startDescription = htmlText.indexOf('me="description')
    const startContent = htmlText.indexOf('tent="', startDescription) + 6
    const endContent = htmlText.indexOf('"', startContent)
    const description = htmlText.slice(startContent, endContent)

    res.json({
      title,
      description
    })
  } catch (error) {
    res.json(error)
  }
}

export default {
  getWebIcon,
  getWebData
}
