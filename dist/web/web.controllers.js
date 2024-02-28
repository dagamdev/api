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
</svg>`;
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
            const htmlText = yield response.text();
            if (!(htmlText.includes('<link') && htmlText.includes('rel="icon'))) {
                res.setHeader('content-type', 'image/svg+xml');
                res.send(svgWorld);
                return;
            }
            const firstLinkIndex = htmlText.indexOf('<link');
            const startIcon = htmlText.indexOf('rel="icon"', firstLinkIndex);
            const startHref = htmlText.indexOf('href=', startIcon) + 6;
            let iconHref = htmlText.slice(startHref, htmlText.indexOf('"', startHref));
            if (!iconHref.startsWith('http')) {
                iconHref = `${webUrl.origin}/${iconHref}`;
            }
            const iconRes = yield fetch(iconHref);
            const iconContentType = iconRes.headers.get('content-type');
            const buffer = Buffer.from(yield iconRes.arrayBuffer());
            res.setHeader('content-type', iconContentType !== null && iconContentType !== void 0 ? iconContentType : 'image/x-icon');
            res.send(buffer);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.default = {
    getWebIcon
};
