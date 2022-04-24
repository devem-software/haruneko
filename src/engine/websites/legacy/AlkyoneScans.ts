// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './AlkyoneScans.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('alkyonescans', `Alkyone Scans`, 'https://alkyonescans.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class AlkyoneScans extends WordPressMangastream {

    constructor() {
        super();
        super.id = 'alkyonescans';
        super.label = 'Alkyone Scans';
        this.tags = [ 'webtoon', 'turkish', 'scanlation' ];
        this.url = 'https://alkyonescans.com';
        this.path = '/manga/list-mode/';
        this.requestOptions.headers.set('x-referer', this.url);
    }
}
*/