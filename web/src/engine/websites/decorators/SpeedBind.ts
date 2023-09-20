import { Fetch, FetchCSS, FetchJSON, FetchRequest, FetchWindowCSS } from '../../FetchProvider';
import { type MangaScraper, type Chapter, Page } from '../../providers/MangaPlugin';
import type { Priority } from '../../taskpool/TaskPool';
import * as Common from './Common';

type JSONPageData_v016452 = {
    items: Configuration_v016452[]
}

type Configuration_v016452 = {
    ContentID : string,
    ctbl: string[],
    ptbl: string[],
    ServerType: number,
    ContentsServer: string,
    p: string,
    ViewMode: number,
    ContentDate : string
}

type Params_v016452 = {
    cid: string,
    u0: string,
    u1: string,
    sharingKey: string
}

type JSONImageData_v016061 = {
    resources: {
        i: {
            src: string
        }
    }
    views: PageView_v016061[]
}
type PageView_v016061 = {
    coords: string[],
    width: number,
    height : number
}

type PageView_v016130 = {
    transfers: {
        coords: {
            height : number,
            width: number,
            xdest: number,
            xsrc: number,
            ydest: number,
            ysrc: number
        }[]
    }[],
    width: number,
    height: number
}

type SBCDATA = {
    ttx: string;
}

type DescrambleKP = {
    s: string,
    u: string
}

/**********************************************
 ******** Page List Extraction Methods ********
 **********************************************/

/**
 * An extension method for extracting all pages for the given {@link chapter} using the given CSS {@link query}.
 * The pages are extracted from the composed url based on the `Identifier` of the {@link chapter} and the `URI` of the website.
 * @param this - A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param chapter - A reference to the {@link Chapter} which shall be assigned as parent for the extracted pages
 * @param baseUrl - sdcqds
 */
export async function FetchPagesSinglePage(this: MangaScraper, chapter: Chapter, baseUrl = ''): Promise<Page[]> {
    const url = baseUrl ? new URL(baseUrl) : new URL(this.URI);
    const uri = new URL(chapter.Identifier, this.URI);
    const request = new FetchRequest(uri.href, {
        headers: {
            Referer: this.URI.href
        } });//referer needed for ManpaPlanet
    const data = await FetchCSS(request, 'div#content.pages');
    const el = data[0];

    if (el.dataset['ptbinb'] && el.dataset['ptbinbCid']) {
        const uri = new URL(chapter.Identifier, url);
        uri.searchParams.set('cid', el.dataset['ptbinbCid']);
        return await getPageList_v016113(this, uri.pathname + uri.search, el.dataset.ptbinb, url.href, chapter);
    }
    if (el.dataset['ptbinb'] && el.dataset.ptbinb.includes('bibGetCntntInfo') && uri.searchParams.get('u0') && uri.searchParams.get('u1')) {
        return await getPageList_v016452(this, chapter, el.dataset.ptbinb, url.href);
    }
    if (el.dataset['ptbinb'] && el.dataset.ptbinb.includes('bibGetCntntInfo') && uri.searchParams.get('u1')) {
        return await getPageList_v016201(this, chapter, el.dataset.ptbinb, url.href);
    }
    if (el.dataset['ptbinb'] && el.dataset.ptbinb.includes('bibGetCntntInfo')) {
        return await getPageList_v016130(this, chapter.Identifier, el.dataset.ptbinb, url.href, chapter);
    }
    const imageConfigurations = el.querySelectorAll<HTMLDivElement>('div[data-ptimg$="ptimg.json"]');
    if (imageConfigurations.length > 0) {
        // TODO: Use the response URL instead of the request URL (in case of redirection ...)
        return await _getPageList_v016061(this, [...imageConfigurations], request.url, chapter);
    }

    throw new Error('Unsupported version of SpeedBinb reader!');
}

/**
 * A class decorator that adds the ability to extract all pages for a given chapter using the given CSS {@link query}.
 * The pages are extracted from the composed url based on the `Identifier` of the chapter and the `URI` of the website.
 * @param baseUrl - sdcqds
 */
export function PagesSinglePage(baseUrl = '') {
    return function DecorateClass<T extends Common.Constructor>(ctor: T, context?: ClassDecoratorContext): T {
        if (context && context.kind !== 'class') {
            throw new Error(context.name);
        }
        return class extends ctor {
            public async FetchPages(this: MangaScraper, chapter: Chapter): Promise<Page[]> {
                return FetchPagesSinglePage.call(this, chapter, baseUrl);
            }
        };
    };
}

/**
*************************
*** SpeedBinb v01.6061 ***
* ** Comic Meteor, Comic Valkyrie, ZeroSum, DigitalMargaRet, ComicBrise
*************************
*/
async function _getPageList_v016061(scraper : MangaScraper, imageConfigurations: HTMLDivElement[], url: string, parent: Chapter): Promise<Page[]> {
    return imageConfigurations.map(element => {
        //Zerosum & digital margaret, 123hon fix (missing "/").. Other ending must have been filtered from the plugin itself (like "/index.html")
        const baseURI = new URL(url);

        if (!baseURI.href.endsWith('/') && !element.dataset.ptimg.startsWith('/')) {
            baseURI.href += '/';
        }

        return new Page(scraper, parent, new URL(element.dataset.ptimg, baseURI.href));
    });
}

/**
 *************************
 *** SpeedBinb v01.6113 ***
 * ** Ohtabooks, Futabanet***
 *************************
 */
async function getPageList_v016113(scraper: MangaScraper, chapterID: string, apiURL: string, baseURL: string, chapter: Chapter): Promise<Page[]> {
    return await getPageList_v016130(scraper, chapterID, apiURL, baseURL, chapter);
}

/**
 *************************
 *** SpeedBinb v01.6452 ***
 * ** Cmoa            ***
 *************************
 */
async function getPageList_v016452(scraper : MangaScraper, chapter: Chapter, apiURL: string, baseURL: string): Promise<Page[]> {
    const cid = new URL(chapter.Identifier, baseURL).searchParams.get('cid');
    const u0 = new URL(chapter.Identifier, baseURL).searchParams.get('u0');
    const u1 = new URL(chapter.Identifier, baseURL).searchParams.get('u1');
    const sharingKey = _tt(cid);
    const uri = new URL(apiURL, baseURL + '/');
    uri.searchParams.set('cid', cid);
    uri.searchParams.set('dmytime', String(Date.now()));
    uri.searchParams.set('k', sharingKey);
    uri.searchParams.set('u0', u0);
    uri.searchParams.set('u1', u1);
    const request = new FetchRequest(uri.href);
    const data: JSONPageData_v016452 = await FetchJSON(request);
    const params: Params_v016452 = { cid, sharingKey, u0, u1 };
    return await getPageLinks_v016452(scraper, data.items[0], params, baseURL, chapter);
}
async function getPageLinks_v016452(scraper: MangaScraper, configuration: Configuration_v016452, params: Params_v016452, baseURL: string, chapter: Chapter): Promise<Page[]> {
    configuration.ctbl = _pt(params.cid, params.sharingKey, configuration.ctbl);
    configuration.ptbl = _pt(params.cid, params.sharingKey, configuration.ptbl);
    //configuration.ServerType = parseInt(configuration.ServerType);
    if (configuration['ServerType'] === 0) {
        return await getPageLinksSBC_v016452(scraper, configuration, params, baseURL, chapter);
    }
    return Promise.reject(new Error('Content server type not supported!'));
}

async function getPageLinksSBC_v016452(scraper : MangaScraper, configuration: Configuration_v016452, params: Params_v016452, baseURL: string, chapter: Chapter) {
    const uri = new URL(configuration.ContentsServer + '/sbcGetCntnt.php', baseURL + '/');
    uri.searchParams.set('cid', params.cid);
    uri.searchParams.set('p', configuration.p);
    uri.searchParams.set('q', '1');
    uri.searchParams.set('vm', String(configuration.ViewMode));
    uri.searchParams.set('dmytime', configuration.ContentDate);
    uri.searchParams.set('u0', params.u0);
    uri.searchParams.set('u1', params.u1);
    return await fetchSBC(scraper, uri, configuration, chapter);
}

/**
*************************
*** SpeedBinb v01.6201 ***
* ** YoungJump         ***
*************************
*/

async function getPageList_v016201(scraper: MangaScraper,chapter: Chapter, apiURL: string, baseURL: string): Promise<Page[]> {
    const cid = new URL(chapter.Identifier, baseURL).searchParams.get('cid');
    const u = new URL(chapter.Identifier, baseURL).searchParams.get('u1');
    const sharingKey = _tt(cid);
    const uri = new URL(apiURL, baseURL + '/');
    uri.searchParams.set('cid', cid);
    uri.searchParams.set('dmytime', String(Date.now()));
    uri.searchParams.set('k', sharingKey);
    uri.searchParams.set('u1', u);
    const request = new FetchRequest(uri.href);
    const data: JSONPageData_v016452 = await FetchJSON(request);
    return await getPageLinks_v016201(scraper, data.items[0], sharingKey, u, chapter);
}

async function getPageLinks_v016201(scraper : MangaScraper, configuration: Configuration_v016452, sharingKey: string, u: string, chapter: Chapter): Promise<Page[]> {
    const cid = configuration.ContentID;
    configuration.ctbl = _pt(cid, sharingKey, configuration.ctbl);
    configuration.ptbl = _pt(cid, sharingKey, configuration.ptbl);
    //configuration.ServerType = parseInt(configuration.ServerType);

    if (configuration['ServerType'] === 2) {
        return await _getPageLinksContent_v016201(scraper, configuration, u, chapter);
    }
    return Promise.reject(new Error('Content server type not supported!'));
}
async function _getPageLinksContent_v016201(scraper: MangaScraper, configuration: Configuration_v016452, u: string, chapter: Chapter): Promise<Page[]> {
    const uri = new URL(configuration['ContentsServer']);
    uri.pathname += uri.pathname.endsWith('/') ? '' : '/';
    uri.pathname += 'content';
    uri.searchParams.set('dmytime', configuration['ContentDate']);
    uri.searchParams.set('u1', u);
    const data: SBCDATA = await FetchJSON(new FetchRequest(uri.href));
    const dom = new DOMParser().parseFromString(data.ttx, 'text/html');
    const pageLinks = [...dom.querySelectorAll<HTMLImageElement>('t-case:first-of-type t-img')].map(img => {
        const src = img.getAttribute('src');
        uri.hash = window.btoa(JSON.stringify(lt_001(src, configuration.ctbl, configuration.ptbl)));
        return new Page(scraper, chapter, new URL(uri.href.replace('/content', '/img/' + src)));
    });
    return pageLinks;
}

/**
 *****************************
 *** SpeedBinb v01.6130 ******
 * ** BookLive, MangaPlanet***
 *****************************
 */

async function getPageList_v016130(scraper: MangaScraper, chapterID: string, apiURL: string, baseURL: string, chapter: Chapter): Promise<Page[]> {
    const cid = new URL(chapterID, baseURL).searchParams.get('cid');
    const sharingKey = _tt(cid);
    const uri = new URL(apiURL, baseURL + '/');
    uri.href = uri.href.replace(/\/\//g, '/');
    uri.searchParams.set('cid', cid);
    uri.searchParams.set('dmytime', String(Date.now()));
    uri.searchParams.set('k', sharingKey);

    const request = new FetchRequest(uri.href);
    await FetchWindowCSS(request, 'body');//dummy request set cookies for mangaplanet

    const response = await fetch(new FetchRequest(uri.href));
    const data: JSONPageData_v016452 = await response.json();

    return await getPageLinks_v016130(scraper, data.items[0], sharingKey, baseURL, chapter);
}

async function getPageLinks_v016130(scraper: MangaScraper, configuration: Configuration_v016452, sharingKey, baseURL: string, chapter: Chapter): Promise<Page[]>{
    const cid = configuration.ContentID;
    /*
     *let stbl = this._pt( cid, sharingKey, configuration.stbl );
     *let ttbl = this._pt( cid, sharingKey, configuration.ttbl );
     */
    configuration.ctbl = _pt(cid, sharingKey, configuration.ctbl);
    configuration.ptbl = _pt(cid, sharingKey, configuration.ptbl);
    //configuration.ServerType = parseInt(configuration.ServerType);

    if (configuration['ServerType'] === 0) { //Booklive
        return await getPageLinksSBC_v016130(scraper, configuration, baseURL, chapter);
    }
    if (configuration['ServerType'] === 1) {//Futabanet
        return await getPageLinksContentJS_v016130(scraper, configuration, chapter);
    }
    if (configuration['ServerType'] === 2) {//MangaPlanet
        return await getPageLinksContent_v016130(scraper, configuration, chapter);
    }
    return Promise.reject(new Error('Content server type not supported!'));
}

async function getPageLinksSBC_v016130(scraper: MangaScraper, configuration: Configuration_v016452, baseURL: string, chapter: Chapter) {
    const uri = new URL(configuration.ContentsServer + '/sbcGetCntnt.php', baseURL + '/');
    uri.searchParams.set('cid', configuration.ContentID);
    uri.searchParams.set('dmytime', configuration.ContentDate);
    uri.searchParams.set('p', configuration.p);
    uri.searchParams.set('vm', String(configuration.ViewMode));
    return await fetchSBC(scraper, uri, configuration, chapter);
}

async function getPageLinksContent_v016130(scraper: MangaScraper, configuration: Configuration_v016452, chapter : Chapter) {
    const uri = new URL(configuration.ContentsServer);
    uri.pathname += uri.pathname.endsWith('/') ? '' : '/';
    uri.pathname += 'content';
    uri.searchParams.set('dmytime', configuration.ContentDate);
    const data: SBCDATA = await FetchJSON(new FetchRequest(uri.href, { headers: { Referer: scraper.URI.href } }));

    const dom = new DOMParser().parseFromString(data.ttx, 'text/html');
    const pageLinks = [...dom.querySelectorAll<HTMLImageElement>('t-case:first-of-type t-img')].map(img => {
        const src = img.getAttribute('src');
        uri.hash = window.btoa(JSON.stringify(lt_001(src, configuration.ctbl, configuration.ptbl)));
        return new Page(scraper, chapter, new URL(uri.href.replace('/content', '/img/' + src)));
    });
    return pageLinks;
}

async function getPageLinksContentJS_v016130(scraper: MangaScraper, configuration: Configuration_v016452, chapter: Chapter) {
    const uri = new URL(configuration.ContentsServer);
    uri.pathname += uri.pathname.endsWith('/') ? '' : '/';
    uri.pathname += 'content.js';
    if (configuration.ContentDate) uri.searchParams.set('dmytime', configuration.ContentDate);
    const response = await Fetch(new FetchRequest(uri.href));
    const data = await response.text();
    const jsonObj = JSON.parse(data.slice(16, -1));
    const dom = new DOMParser().parseFromString(jsonObj.ttx, 'text/html');
    const pageLinks = [...dom.querySelectorAll<HTMLImageElement>('t-case:first-of-type t-img')].map(img => {
        let src = img.getAttribute('src');
        uri.hash = window.btoa(JSON.stringify(lt_001(src, configuration.ctbl, configuration.ptbl)));
        if (!src.startsWith('/')) src = '/' + src;
        return new Page(scraper, chapter, new URL(uri.href.replace('/content.js', src + '/M_H.jpg')));
    });
    return pageLinks;
}

//****************
// COMMON
//****************

async function fetchSBC(scraper: MangaScraper, uri: URL, configuration: Configuration_v016452, chapter: Chapter) {
    const data: SBCDATA = await FetchJSON(new FetchRequest(uri.href));
    const dom = new DOMParser().parseFromString(data.ttx, 'text/html');
    const pageLinks = [...dom.querySelectorAll<HTMLImageElement>('t-case:first-of-type t-img')].map(img => {
        const src = img.getAttribute('src');
        uri.searchParams.set('src', src);
        uri.hash = window.btoa(JSON.stringify(lt_001(src, configuration.ctbl, configuration.ptbl)));
        return new Page(scraper, chapter, new URL(uri.href.replace('/sbcGetCntnt.php', '/sbcGetImg.php')));
    });
    return pageLinks;
}

/***********************************************
 ******** Image Data Extraction Methods ********
 ***********************************************/

/**
 * An extension method to get the image data for the given {@link page}.
 * @param this - A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param page - A reference to the {@link Page} containing the necessary information to acquire the image data
 * @param priority - The importance level for ordering the request for the image data within the internal task pool
 * @param signal - An abort signal that can be used to cancel the request for the image data
 * @param detectMimeType - Force a fingerprint check of the image data to detect its mime-type (instead of relying on the Content-Type header)
 */
async function FetchImage(this: MangaScraper, page: Page, priority: Priority, signal: AbortSignal, detectMimeType = false): Promise<Blob> {
    let promise;
    switch (true) {
        case page.Link.href.endsWith('ptimg.json'):
            promise = await process_v016061(this, page, priority, signal, detectMimeType);
            break;
        case page.Link.href.includes('sbcGetImg'):
            promise = await process_v016130(this, page, priority, signal, detectMimeType);
            break;
        case page.Link.href.includes('M_L.jpg'):
            promise = await process_v016130(this, page, priority, signal, detectMimeType);
            break;
        case page.Link.href.includes('M_H.jpg'):
            promise = await process_v016130(this, page, priority, signal, detectMimeType);
            break;
        case page.Link.href.includes('/img/'):
            promise = await process_v016130(this, page, priority, signal, detectMimeType);
            break;
        default:
            promise = Promise.reject('Unsupported version of SpeedBinb reader!');
            break;
    }
    return promise;
}

async function process_v016061(scraper: MangaScraper, page: Page, priority: Priority, signal: AbortSignal, detectMimeType = false): Promise<Blob> {
    const data: JSONImageData_v016061 = await FetchJSON(new FetchRequest(page.Link.href));
    const fakepage = new Page(scraper, page.Parent as Chapter, new URL(data.resources.i.src, page.Link.href));
    const views = data.views;
    const imagedata: Blob = await Common.FetchImage.call(scraper, fakepage, priority, signal, detectMimeType);
    const bmpdata = await createImageBitmap(imagedata);
    return await descramble_v016061(bmpdata, views);
}

async function descramble_v016061(bitmap: ImageBitmap, views: PageView_v016061[]): Promise<Blob> {
    return new Promise(resolve => {
        const view = views[0];
        const canvas = document.createElement('canvas');
        canvas.width = view.width;
        canvas.height = view.height;
        const ctx = canvas.getContext('2d');

        for (const part of view.coords) {
            // sample => 'i:119,4+107,150>428,900'
            const num = part.split(/[:,+>]/);
            const sourceX = parseInt(num[1]);
            const sourceY = parseInt(num[2]);
            const targetX = parseInt(num[5]);
            const targetY = parseInt(num[6]);
            const partWidth = parseInt(num[3]);
            const partHeight = parseInt(num[4]);
            ctx.drawImage(bitmap, sourceX, sourceY, partWidth, partHeight, targetX, targetY, partWidth, partHeight);
        }
        canvas.toBlob(data => {
            resolve(data);
        }, 'image/png', parseFloat('90') / 100);
    });
}

async function process_v016130(scraper: MangaScraper, page: Page, priority: Priority, signal: AbortSignal, detectMimeType: boolean): Promise<Blob> {
    const imagedata: Blob = await Common.FetchImage.call(scraper, page, priority, signal, detectMimeType);
    const descrambleKeyPair: DescrambleKP = JSON.parse(window.atob(page.Link.hash.slice(1)));
    const bmpdata = await createImageBitmap(imagedata);
    return await descramble_v016130(bmpdata, descrambleKeyPair);
}

async function descramble_v016130(bitmap: ImageBitmap, keys: DescrambleKP): Promise<Blob> {
    return new Promise(resolve => {
        const view: PageView_v016130 = _getImageDescrambleCoords(keys.s, keys.u, bitmap.width, bitmap.height);
        const canvas = document.createElement('canvas');
        canvas.width = view.width;
        canvas.height = view.height;
        const ctx = canvas.getContext('2d');

        for (const part of view.transfers[0].coords) {
            const sourceX = part.xsrc;
            const sourceY = part.ysrc;
            const targetX = part.xdest;
            const targetY = part.ydest;
            const partWidth = part.width;
            const partHeight = part.height;
            ctx.drawImage(bitmap, sourceX, sourceY, partWidth, partHeight, targetX, targetY, partWidth, partHeight);
        }
        canvas.toBlob(data => {
            resolve(data);
        }, 'image/png', parseFloat('90') / 100);
    });
}

/**
 * A class decorator that adds the ability to get the image data for a given page by loading the source asynchronous with the `Fetch API`.
 * @param detectMimeType - Force a fingerprint check of the image data to detect its mime-type (instead of relying on the Content-Type header)
 */
export function ImageDescrambler(detectMimeType = false) {
    return function DecorateClass<T extends Common.Constructor>(ctor: T, context?: ClassDecoratorContext): T {
        if (context && context.kind !== 'class') {
            throw new Error(context.name);
        }
        return class extends ctor {
            public async FetchImage(this: MangaScraper, page: Page, priority: Priority, signal: AbortSignal): Promise<Blob> {
                return FetchImage.call(this, page, priority, signal, detectMimeType);
            }
        };
    };
}

function _tt(t) : string {
    const n = Date.now().toString(16).padStart(16, 'x'); // w.getRandomString(16)
    const i = Array(Math.ceil(16 / t.length) + 1).join(t);
    const r = i.substring(0, 16);
    const e = i.substring(i.length - 16);
    /*
    const r = i.substr(0, 16);
    const e = i.substr(-16, 16);
    */
    let s = 0;
    let u = 0;
    let h = 0;
    return n.split("").map(function (t, i) {
        return s ^= n.charCodeAt(i),
        u ^= r.charCodeAt(i),
        h ^= e.charCodeAt(i),
        t + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[s + u + h & 63];
    }).join("");
}

function _pt(t, i, n) {
    const r = t + ':' + i;
    let e = 0;

    for (let s = 0; s < r.length; s++) {
        e += r.charCodeAt(s) << s % 16;
    }

    0 == (e &= 2147483647) && (e = 305419896);

    let u = '';
    let h = e;

    for (let s = 0; s < n.length; s++) {
        h = h >>> 1 ^ 1210056708 & -(1 & h);
        const o = (n.charCodeAt(s) - 32 + h) % 94 + 32;
        u += String.fromCharCode(o);
    }
    try {
        return JSON.parse(u);
    } catch (t) {
        return null;
    }
}

/**
 * Determine which descramble key pair from ctbl / ptbl shall be used
 * depending on the given image name  'pages/cu77gvXE.jpg'
 */
function lt_001(t, ctbl, ptbl) {
    const i = [0, 0];
    const n = t.lastIndexOf("/") + 1;
    const r = t.length - n;
    if (t) {
        for (let e = 0; e < r; e++)
            i[e % 2] += t.charCodeAt(e + n);
        i[0] %= 8,
        i[1] %= 8;
    }
    return { s: ptbl[i[0]], u: ctbl[i[1]] };
}

/**
 * Copied from official SpeedBinb library
 * t  imagecontext containing src property ('pages/cu77gvXE.jpg')
 * s, u descramble key pair, used to determine descrambler object
 * i  width of descrambled image
 * n height of descrambled image
 */
function _getImageDescrambleCoords(/*t*/s, u, i, n) {
    const r = _lt_002(s, u); // var r = this.lt(t.src);
    if (!r || !r.vt())
        return null;
    const e = r.dt({
        width: i,
        height: n
    });
    return {
        width: e.width,
        height: e.height,
        transfers: [{
            index: 0,
            coords: r.gt({
                width: i,
                height: n
            })
        }]
    };
}

/**
 * Get a descrambler based on the descramble key pair from ctbl / ptbl
 */
function _lt_002(s, u) {
    return "=" === u.charAt(0) && "=" === s.charAt(0) ? new _speedbinb_f(u, s) : u.match(/^[0-9]/) && s.match(/^[0-9]/) ? new _speedbinb_a(u, s) : "" === u && "" === s ? new _speedbinb_h : null;
}

/**
 * Copied from official SpeedBinb library
 * define prototype for f
 */
const _speedbinb_f = function () {
    function s(t, i) {
        this.Mt = null;
        const n = t.match(/^=([0-9]+)-([0-9]+)([-+])([0-9]+)-([-_0-9A-Za-z]+)$/)
            , r = i.match(/^=([0-9]+)-([0-9]+)([-+])([0-9]+)-([-_0-9A-Za-z]+)$/);

        if (null !== n && null !== r && n[1] === r[1] && n[2] === r[2] && n[4] === r[4] && "+" === n[3] && "-" === r[3] && (this.C = parseInt(n[1], 10),
        this.I = parseInt(n[2], 10),
        this.jt = parseInt(n[4], 10),
        !(8 < this.C || 8 < this.I || 64 < this.C * this.I))) {
            const e = this.C + this.I + this.C * this.I;
            if (n[5].length === e && r[5].length === e) {
                const s = this.yt(n[5])
                    , u = this.yt(r[5]);
                this.xt = s.n,
                this.Et = s.t,
                this.It = u.n,
                this.St = u.t,
                this.Mt = [];
                for (let h = 0; h < this.C * this.I; h++)
                    this.Mt.push(s.p[u.p[h]]);
            }
        }
    }
    return s.prototype.vt = function () {
        return null !== this.Mt;
    }
    ,
    s.prototype.bt = function (t) {
        const i = 2 * this.C * this.jt
            , n = 2 * this.I * this.jt;
        return t.width >= 64 + i && t.height >= 64 + n && t.width * t.height >= (320 + i) * (320 + n);
    }
    ,
    s.prototype.dt = function (t) {
        return this.bt(t) ? {
            width: t.width - 2 * this.C * this.jt,
            height: t.height - 2 * this.I * this.jt
        } : t;
    }
    ,
    s.prototype.gt = function (t) {
        if (!this.vt())
            return null;
        if (!this.bt(t))
            return [{
                xsrc: 0,
                ysrc: 0,
                width: t.width,
                height: t.height,
                xdest: 0,
                ydest: 0
            }];

        const h = [];
        const i = t.width - 2 * this.C * this.jt,
            n = t.height - 2 * this.I * this.jt,
            r = Math.floor((i + this.C - 1) / this.C),
            e = i - (this.C - 1) * r,
            s = Math.floor((n + this.I - 1) / this.I),
            u = n - (this.I - 1) * s;

        for (let o = 0; o < this.C * this.I; ++o) {
            const a = o % this.C
                , f = Math.floor(o / this.C)
                , c = this.jt + a * (r + 2 * this.jt) + (this.It[f] < a ? e - r : 0)
                , l = this.jt + f * (s + 2 * this.jt) + (this.St[a] < f ? u - s : 0)
                , v = this.Mt[o] % this.C
                , d = Math.floor(this.Mt[o] / this.C)
                , g = v * r + (this.xt[d] < v ? e - r : 0)
                , p = d * s + (this.Et[v] < d ? u - s : 0)
                , b = this.It[f] === a ? e : r
                , m = this.St[a] === f ? u : s;
            0 < i && 0 < n && h.push({
                xsrc: c,
                ysrc: l,
                width: b,
                height: m,
                xdest: g,
                ydest: p
            });
        }
        return h;
    }
    ,
    s.prototype.yt = function (t) {
        let i;
        const n = [], r = [], e = [];
        for (i = 0; i < this.C; i++)
            n.push(s.Tt[t.charCodeAt(i)]);
        for (i = 0; i < this.I; i++)
            r.push(s.Tt[t.charCodeAt(this.C + i)]);
        for (i = 0; i < this.C * this.I; i++)
            e.push(s.Tt[t.charCodeAt(this.C + this.I + i)]);
        return {
            t: n,
            n: r,
            p: e
        };
    }
    ,
    s.Tt = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, 63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1],
    s;
}();

/**
 * Copied from official SpeedBinb library
 * define prototype for a
 */
const _speedbinb_a = function () {
    function t(t, i) {
        this.mt = null,
        this.wt = null;
        const n = this.yt(t);
        const r = this.yt(i);
        n && r && n.ndx === r.ndx && n.ndy === r.ndy && (this.mt = n,
        this.wt = r);
    }
    return t.prototype.vt = function () {
        return null !== this.mt && null !== this.wt;
    }
    ,
    t.prototype.bt = function (t) {
        return 64 <= t.width && 64 <= t.height && 102400 <= t.width * t.height;
    }
    ,
    t.prototype.dt = function (t) {
        return t;
    }
    ,
    t.prototype.gt = function (t) {
        if (!this.vt())
            return null;
        const i = [];
        const n = t.width - t.width % 8,
            r = Math.floor((n - 1) / 7) - Math.floor((n - 1) / 7) % 8,
            e = n - 7 * r,
            s = t.height - t.height % 8,
            u = Math.floor((s - 1) / 7) - Math.floor((s - 1) / 7) % 8,
            h = s - 7 * u,
            o = this.mt.piece.length;
        if (!this.bt(t))
            return [{
                xsrc: 0,
                ysrc: 0,
                width: t.width,
                height: t.height,
                xdest: 0,
                ydest: 0
            }];
        for (let a = 0; a < o; a++) {
            const f = this.mt.piece[a]
                , c = this.wt.piece[a];
            i.push({
                xsrc: Math.floor(f.x / 2) * r + f.x % 2 * e,
                ysrc: Math.floor(f.y / 2) * u + f.y % 2 * h,
                width: Math.floor(f.w / 2) * r + f.w % 2 * e,
                height: Math.floor(f.h / 2) * u + f.h % 2 * h,
                xdest: Math.floor(c.x / 2) * r + c.x % 2 * e,
                ydest: Math.floor(c.y / 2) * u + c.y % 2 * h
            });
        }
        const l = r * (this.mt.ndx - 1) + e
            , v = u * (this.mt.ndy - 1) + h;
        return l < t.width && i.push({
            xsrc: l,
            ysrc: 0,
            width: t.width - l,
            height: v,
            xdest: l,
            ydest: 0
        }),
        v < t.height && i.push({
            xsrc: 0,
            ysrc: v,
            width: t.width,
            height: t.height - v,
            xdest: 0,
            ydest: v
        }),
        i;
    }
    ,
    t.prototype.yt = function (t) {
        if (!t)
            return null;
        const i = t.split("-");
        if (3 != i.length)
            return null;
        const n = parseInt(i[0], 10)
            , r = parseInt(i[1], 10)
            , e = i[2];
        if (e.length != n * r * 2)
            return null;
        const v = [];
        const a = (n - 1) * (r - 1) - 1;
        const f = a + (n - 1);
        const c = f + (r - 1);
        const l = c + 1;

        for (let s, u, h, o, d = 0;d < n * r;d++)
            s = this.Ot(e.charAt(2 * d)),
            u = this.Ot(e.charAt(2 * d + 1)),
            d <= a ? o = h = 2 : d <= f ? (h = 2,o = 1) : d <= c ? (h = 1,o = 2) : d <= l && (o = h = 1),
            v.push({
                x: s,
                y: u,
                w: h,
                h: o
            });
        return {
            ndx: n,
            ndy: r,
            piece: v
        };
    }
    ,
    t.prototype.Ot = function (t) {
        let i = 0;
        let n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(t);
        return n < 0 ? n = "abcdefghijklmnopqrstuvwxyz".indexOf(t) : i = 1,
        i + 2 * n;
    }
    ,
    t;
}();

/**
 * Copied from official SpeedBinb library
 * define prototype for h
 */
const _speedbinb_h = function () {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function t() { }
    return t.prototype.vt = function () {
        return !0;
    }
    ,
    t.prototype.bt = function () {
        return !1;
    }
    ,
    t.prototype.dt = function (t) {
        return t;
    }
    ,
    t.prototype.gt = function (t) {
        return [{
            xsrc: 0,
            ysrc: 0,
            width: t.width,
            height: t.height,
            xdest: 0,
            ydest: 0
        }];
    }
    ,
    t;
}();