"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const web_1 = __importDefault(require("../validations/web"));
const puppeteer_1 = __importDefault(require("puppeteer"));
function getWebIcon(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { url } = web_1.default.iconQueries.parse(req.query);
            if (url === undefined) {
                res.sendFile(node_path_1.default.join(__dirname, '/world.svg'));
                return;
            }
            const webUrl = new URL(url);
            const response = yield fetch(url);
            const contentType = response.headers.get('content-type');
            if (contentType !== null && !(contentType.includes('text') && contentType.includes('html'))) {
                res.json({
                    error: 'The response content type is not text/html'
                });
                return;
            }
            // '<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">'
            const htmlText = yield response.text();
            // console.log(htmlText)
            if (!(htmlText.includes('<link') && htmlText.includes('rel="icon'))) {
                res.sendFile(node_path_1.default.join(__dirname, '/world.svg'));
                const browser = yield puppeteer_1.default.launch({
                    headless: false
                    // slowMo: 100
                });
                const page = yield browser.newPage();
                yield page.goto(url); // Espera a que la página termine de cargar
                // Ejecutar JavaScript en la página para obtener el enlace del icono
                const iconUrl = yield page.evaluate(() => {
                    var _a;
                    const iconElement = (_a = document.querySelector('link[rel="icon"]')) !== null && _a !== void 0 ? _a : document.querySelector('link[rel="shortcut icon"]');
                    return iconElement instanceof HTMLLinkElement ? iconElement.href : null;
                });
                yield browser.close();
                console.log(iconUrl);
                return;
            }
            const firstLinkIndex = htmlText.indexOf('<link');
            // console.log(htmlText.slice(firstLinkIndex))
            const startIcon = htmlText.indexOf('rel="icon"', firstLinkIndex);
            const startHref = htmlText.indexOf('href=', startIcon) + 6;
            let iconHref = htmlText.slice(startHref, htmlText.indexOf('"', startHref));
            if (!iconHref.startsWith('http')) {
                iconHref = webUrl.origin + iconHref;
            }
            console.log({ iconHref });
            const iconRes = yield fetch(iconHref);
            const iconContentType = iconRes.headers.get('content-type');
            const buffer = Buffer.from(yield iconRes.arrayBuffer());
            res.setHeader('content-type', iconContentType !== null && iconContentType !== void 0 ? iconContentType : 'image/x-icon');
            res.send(buffer);
            // res.json({ message: 'hello web icon', url, iconHref })
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.default = {
    getWebIcon
};
