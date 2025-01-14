// Auto-Generated export from HakuNeko Legacy
import { Tags } from '../Tags';
import icon from './NeoxScan.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^{origin}\/manga\/[^/]+\/$/)
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv1()
@Madara.PagesSinglePageCSS()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('neoxscan', 'Neox Scanlator', 'https://neoxscans.net', Tags.Media.Manga, Tags.Media.Manhua, Tags.Media.Manhwa, Tags.Language.Portuguese, Tags.Accessibility.RegionLocked);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class NeoxScan extends WordPressMadara {

    constructor() {
        super();
        super.id = 'neoxscan';
        super.label = 'Neox Scanlator';
        this.tags = [ 'manga', 'webtoon', 'portuguese', 'scanlation' ];
        this.url = 'https://neoxscans.net';
        this.queryTitleForURI = '.post-title';
    }
    canHandleURI(uri) {
        return /https?:\/\/neoxscans\.(com|net)/.test(uri.origin);
    }
}
*/