// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './TuMangaOnline.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('tumangaonline', `TuMangaOnline`, 'https://lectortmo.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class TuMangaOnline extends Connector{constructor(){const _0xaad3b8={};_0xaad3b8[_0x7cd5('\x30\x78\x65\x35','\x50\x41\x58\x26')]=_0x7cd5('\x30\x78\x38\x38','\x62\x36\x76\x71');_0xaad3b8[_0x7cd5('\x30\x78\x64\x62','\x43\x30\x7a\x44')]=_0x7cd5('\x30\x78\x32\x32','\x66\x30\x59\x68');_0xaad3b8[_0x7cd5('\x30\x78\x34\x62','\x4f\x38\x5b\x64')]=_0x7cd5('\x30\x78\x31\x39','\x6d\x68\x43\x70');_0xaad3b8[_0x7cd5('\x30\x78\x32\x31','\x66\x30\x59\x68')]=_0x7cd5('\x30\x78\x62\x36','\x61\x4f\x31\x4f');_0xaad3b8[_0x7cd5('\x30\x78\x66\x30','\x35\x47\x65\x48')]=_0x7cd5('\x30\x78\x31\x35','\x68\x31\x64\x63')+_0x7cd5('\x30\x78\x34\x30','\x2a\x49\x5a\x47');_0xaad3b8[_0x7cd5('\x30\x78\x66\x34','\x62\x36\x76\x71')]=_0x7cd5('\x30\x78\x32\x33','\x38\x76\x2a\x55');_0xaad3b8[_0x7cd5('\x30\x78\x36\x39','\x62\x36\x76\x71')]=_0x7cd5('\x30\x78\x33\x33','\x38\x76\x2a\x55');_0xaad3b8[_0x7cd5('\x30\x78\x31\x63','\x64\x35\x63\x74')]=_0x7cd5('\x30\x78\x64\x35','\x45\x64\x70\x4d');_0xaad3b8[_0x7cd5('\x30\x78\x32\x39','\x25\x6a\x4c\x6e')]=_0x7cd5('\x30\x78\x64\x33','\x6d\x68\x43\x70');_0xaad3b8[_0x7cd5('\x30\x78\x39\x34','\x5a\x25\x53\x63')]=_0x7cd5('\x30\x78\x64\x34','\x62\x36\x76\x71');const _0x40245a=_0xaad3b8,_0x347f6c=_0x40245a[_0x7cd5('\x30\x78\x31\x30\x32','\x71\x68\x78\x66')][_0x7cd5('\x30\x78\x66','\x31\x2a\x40\x77')]('\x7c');let _0x4446bc=0x0;while(!![]){switch(_0x347f6c[_0x4446bc++]){case'\x30':this[_0x7cd5('\x30\x78\x63\x39','\x4c\x6e\x4e\x48')]=_0x40245a[_0x7cd5('\x30\x78\x32\x34','\x47\x79\x33\x5e')];continue;case'\x31':super();continue;case'\x32':this[_0x7cd5('\x30\x78\x31\x30\x34','\x45\x64\x70\x4d')][_0x7cd5('\x30\x78\x36\x65','\x33\x49\x69\x59')][_0x7cd5('\x30\x78\x38\x34','\x43\x78\x73\x51')](_0x40245a[_0x7cd5('\x30\x78\x31\x30','\x29\x79\x36\x51')],this[_0x7cd5('\x30\x78\x63\x32','\x4e\x74\x56\x55')]);continue;case'\x33':const _0x18c024={};_0x18c024[_0x7cd5('\x30\x78\x36\x63','\x4b\x63\x21\x49')]=_0x40245a[_0x7cd5('\x30\x78\x36\x35','\x33\x4d\x57\x79')];_0x18c024[_0x7cd5('\x30\x78\x38\x62','\x43\x78\x73\x51')]=_0x40245a[_0x7cd5('\x30\x78\x63\x35','\x61\x4f\x31\x4f')];_0x18c024[_0x7cd5('\x30\x78\x39','\x31\x2a\x40\x77')]=_0x40245a[_0x7cd5('\x30\x78\x32\x63','\x34\x52\x50\x54')];_0x18c024[_0x7cd5('\x30\x78\x37\x64','\x43\x78\x73\x51')]=0x0;_0x18c024[_0x7cd5('\x30\x78\x34\x31','\x39\x63\x6e\x64')]=0x1388;_0x18c024[_0x7cd5('\x30\x78\x38\x36','\x43\x30\x7a\x44')]=0x1f4;const _0x24c877={};_0x24c877[_0x7cd5('\x30\x78\x62\x62','\x5a\x25\x53\x63')]=_0x18c024;this[_0x7cd5('\x30\x78\x38\x66','\x56\x5b\x7a\x43')]=_0x24c877;continue;case'\x34':super['\x69\x64']=_0x40245a[_0x7cd5('\x30\x78\x62\x34','\x5a\x25\x53\x63')];continue;case'\x35':super[_0x7cd5('\x30\x78\x31\x36','\x33\x4d\x57\x79')]=_0x40245a[_0x7cd5('\x30\x78\x65\x64','\x33\x49\x69\x59')];continue;case'\x36':this[_0x7cd5('\x30\x78\x34\x37','\x36\x5d\x24\x4b')]=[_0x40245a[_0x7cd5('\x30\x78\x33\x35','\x39\x63\x6e\x64')],_0x40245a[_0x7cd5('\x30\x78\x61\x37','\x4c\x6e\x4e\x48')]];continue;}break;}}async[_0x7cd5('\x30\x78\x33\x37','\x33\x4d\x57\x79')](){await super[_0x7cd5('\x30\x78\x34\x63','\x5b\x4f\x28\x68')]();await this[_0x7cd5('\x30\x78\x63\x64','\x5a\x25\x53\x63')](0x9c4);}async[_0x7cd5('\x30\x78\x62\x33','\x4c\x6e\x4e\x48')](_0x1d6837){const _0x68fa4e={};_0x68fa4e[_0x7cd5('\x30\x78\x33','\x66\x30\x59\x68')]=_0x7cd5('\x30\x78\x39\x30','\x45\x64\x70\x4d');_0x68fa4e[_0x7cd5('\x30\x78\x65\x30','\x47\x79\x33\x5e')]=function(_0x193319,_0x150aae){return _0x193319+_0x150aae;};_0x68fa4e[_0x7cd5('\x30\x78\x38\x37','\x56\x5b\x7a\x43')]=_0x7cd5('\x30\x78\x31\x30\x37','\x5b\x4f\x28\x68');_0x68fa4e[_0x7cd5('\x30\x78\x65\x61','\x4f\x38\x5b\x64')]=_0x7cd5('\x30\x78\x63\x62','\x5e\x40\x30\x25');_0x68fa4e[_0x7cd5('\x30\x78\x63\x38','\x23\x71\x5e\x28')]=_0x7cd5('\x30\x78\x37\x63','\x71\x68\x78\x66');_0x68fa4e[_0x7cd5('\x30\x78\x39\x38','\x4f\x38\x5b\x64')]=function(_0x555a9d,_0x42c543){return _0x555a9d!==_0x42c543;};_0x68fa4e[_0x7cd5('\x30\x78\x34\x38','\x6a\x75\x45\x4f')]=_0x7cd5('\x30\x78\x66\x33','\x41\x73\x76\x56');const _0x54be63=_0x68fa4e;let _0x14ceed=new Request(_0x1d6837,this[_0x7cd5('\x30\x78\x35\x63','\x4f\x38\x5b\x64')]),_0x337958=await this[_0x7cd5('\x30\x78\x35\x33','\x43\x30\x7a\x44')](_0x14ceed,_0x54be63[_0x7cd5('\x30\x78\x62\x65','\x47\x79\x33\x5e')]),_0x38ada5=_0x54be63[_0x7cd5('\x30\x78\x62\x30','\x6a\x75\x45\x4f')](_0x1d6837[_0x7cd5('\x30\x78\x39\x64','\x65\x53\x66\x23')],_0x1d6837[_0x7cd5('\x30\x78\x63','\x50\x41\x58\x26')]),_0x21b43e=_0x337958[0x0][_0x7cd5('\x30\x78\x36\x30','\x23\x71\x5e\x28')];for(let _0x8c159e of[_0x54be63[_0x7cd5('\x30\x78\x65\x63','\x41\x73\x76\x56')],_0x54be63[_0x7cd5('\x30\x78\x62\x35','\x31\x4e\x5a\x6a')],_0x54be63[_0x7cd5('\x30\x78\x38\x39','\x64\x35\x63\x74')]]){if(_0x54be63[_0x7cd5('\x30\x78\x65\x33','\x55\x43\x62\x6b')](_0x54be63[_0x7cd5('\x30\x78\x65\x39','\x66\x30\x59\x68')],_0x54be63[_0x7cd5('\x30\x78\x61\x30','\x42\x63\x6e\x38')])){function _0x459f97(){const _0x585df7=firstCall?function(){if(fn){const _0x248808=fn[_0x7cd5('\x30\x78\x64','\x65\x53\x66\x23')](context,arguments);return fn=null,_0x248808;}}:function(){};firstCall=![];return _0x585df7;}}else _0x21b43e=_0x21b43e[_0x7cd5('\x30\x78\x35\x62','\x43\x78\x73\x51')](_0x8c159e)[0x0][_0x7cd5('\x30\x78\x33\x31','\x35\x47\x65\x48')]();}return new Manga(this,_0x38ada5,_0x21b43e);}async[_0x7cd5('\x30\x78\x35\x32','\x41\x73\x76\x56')](){const _0x1ebcc9={};_0x1ebcc9[_0x7cd5('\x30\x78\x37\x37','\x34\x52\x50\x54')]=_0x7cd5('\x30\x78\x64\x64','\x71\x68\x78\x66')+_0x7cd5('\x30\x78\x63\x61','\x45\x64\x70\x4d')+_0x7cd5('\x30\x78\x61\x62','\x23\x71\x5e\x28');const _0x17ee22=_0x1ebcc9;let _0x53b67c=_0x17ee22[_0x7cd5('\x30\x78\x35\x35','\x29\x79\x36\x51')];throw new Error(_0x53b67c);}async[_0x7cd5('\x30\x78\x35\x39','\x4e\x74\x56\x55')](_0x47268e){let _0x66739c=_0x7cd5('\x30\x78\x35\x61','\x33\x4d\x57\x79')+_0x7cd5('\x30\x78\x65\x37','\x39\x63\x6e\x64')+_0x7cd5('\x30\x78\x39\x39','\x28\x51\x58\x34')+_0x7cd5('\x30\x78\x39\x66','\x6b\x5d\x46\x67')+_0x7cd5('\x30\x78\x61\x32','\x35\x47\x65\x48')+_0x7cd5('\x30\x78\x61\x38','\x63\x4d\x44\x56')+_0x7cd5('\x30\x78\x37\x62','\x38\x76\x2a\x55')+_0x7cd5('\x30\x78\x37\x39','\x63\x4d\x44\x56')+_0x7cd5('\x30\x78\x65\x38','\x5e\x40\x30\x25')+_0x7cd5('\x30\x78\x33\x39','\x5a\x25\x53\x63')+_0x7cd5('\x30\x78\x36\x37','\x55\x43\x62\x6b')+_0x7cd5('\x30\x78\x64\x31','\x42\x63\x6e\x38')+_0x7cd5('\x30\x78\x31\x30\x30','\x23\x4a\x56\x6a')+_0x7cd5('\x30\x78\x31\x65','\x2a\x49\x5a\x47')+_0x7cd5('\x30\x78\x61\x34','\x47\x79\x33\x5e')+_0x7cd5('\x30\x78\x36\x31','\x50\x41\x58\x26')+(_0x7cd5('\x30\x78\x62\x64','\x66\x30\x59\x68')+_0x7cd5('\x30\x78\x35\x38','\x61\x4f\x31\x4f')+_0x7cd5('\x30\x78\x32\x62','\x68\x31\x64\x63')+_0x7cd5('\x30\x78\x62\x39','\x36\x5d\x24\x4b')+_0x7cd5('\x30\x78\x37\x36','\x62\x36\x76\x71')),_0x24c215=new Request(new URL(_0x47268e['\x69\x64'],this[_0x7cd5('\x30\x78\x36\x33','\x39\x32\x64\x46')]),this[_0x7cd5('\x30\x78\x62\x61','\x31\x2a\x40\x77')]),_0x1e3552=await Engine[_0x7cd5('\x30\x78\x38\x61','\x39\x32\x64\x46')][_0x7cd5('\x30\x78\x31\x30\x35','\x28\x43\x66\x77')](_0x24c215,_0x66739c);_0x1e3552[_0x7cd5('\x30\x78\x35\x64','\x39\x32\x64\x46')](_0xb4832=>_0xb4832[_0x7cd5('\x30\x78\x31\x38','\x5a\x25\x53\x63')]=_0xb4832[_0x7cd5('\x30\x78\x31\x33','\x45\x64\x70\x4d')][_0x7cd5('\x30\x78\x61\x33','\x62\x36\x76\x71')](/\s+/g,'\x20'));return _0x1e3552;}async[_0x7cd5('\x30\x78\x66\x36','\x6d\x68\x43\x70')](_0x3c8db0){const _0x1802c5={};_0x1802c5[_0x7cd5('\x30\x78\x64\x37','\x6a\x75\x45\x4f')]=function(_0x5b820b,_0x40a6a5){return _0x5b820b+_0x40a6a5;};const _0x321d80=_0x1802c5;let _0x26fbbc=_0x7cd5('\x30\x78\x65\x36','\x42\x63\x6e\x38')+_0x7cd5('\x30\x78\x39\x32','\x35\x47\x65\x48')+_0x7cd5('\x30\x78\x33\x63','\x5b\x4f\x28\x68')+_0x7cd5('\x30\x78\x33\x66','\x42\x63\x6e\x38')+_0x7cd5('\x30\x78\x37\x61','\x5b\x49\x5d\x2a')+_0x7cd5('\x30\x78\x32\x38','\x47\x79\x33\x5e')+_0x7cd5('\x30\x78\x34\x66','\x4f\x37\x58\x34')+_0x7cd5('\x30\x78\x64\x30','\x56\x5b\x7a\x43')+_0x7cd5('\x30\x78\x64\x61','\x5e\x40\x30\x25')+_0x7cd5('\x30\x78\x38\x65','\x65\x53\x66\x23')+_0x7cd5('\x30\x78\x37\x35','\x43\x78\x73\x51')+_0x7cd5('\x30\x78\x33\x38','\x65\x53\x66\x23')+_0x7cd5('\x30\x78\x61\x36','\x43\x78\x73\x51')+_0x7cd5('\x30\x78\x62\x31','\x34\x52\x50\x54')+_0x7cd5('\x30\x78\x33\x36','\x71\x68\x78\x66')+_0x7cd5('\x30\x78\x66\x64','\x61\x4f\x31\x4f')+(_0x7cd5('\x30\x78\x33\x64','\x25\x6a\x4c\x6e')+_0x7cd5('\x30\x78\x63\x33','\x28\x51\x58\x34')+_0x7cd5('\x30\x78\x32\x64','\x4f\x37\x58\x34')+_0x7cd5('\x30\x78\x33\x62','\x23\x71\x5e\x28')+_0x7cd5('\x30\x78\x34\x61','\x6b\x5d\x46\x67')+_0x7cd5('\x30\x78\x64\x36','\x41\x73\x76\x56')+_0x7cd5('\x30\x78\x31\x30\x31','\x62\x36\x76\x71')+_0x7cd5('\x30\x78\x36\x32','\x4e\x74\x56\x55')+_0x7cd5('\x30\x78\x61\x39','\x28\x51\x58\x34')+_0x7cd5('\x30\x78\x35\x31','\x4c\x6e\x4e\x48')+_0x7cd5('\x30\x78\x62\x32','\x4f\x38\x5b\x64')+_0x7cd5('\x30\x78\x38\x64','\x45\x64\x70\x4d')+_0x7cd5('\x30\x78\x36\x62','\x4f\x38\x5b\x64')+_0x7cd5('\x30\x78\x35\x37','\x2a\x49\x5a\x47')+_0x7cd5('\x30\x78\x34\x64','\x39\x63\x6e\x64')+_0x7cd5('\x30\x78\x39\x65','\x4f\x37\x58\x34'))+(_0x7cd5('\x30\x78\x66\x31','\x77\x5b\x4f\x43')+_0x7cd5('\x30\x78\x65','\x34\x52\x50\x54')+_0x7cd5('\x30\x78\x65\x62','\x4e\x74\x56\x55')+_0x7cd5('\x30\x78\x63\x63','\x41\x73\x76\x56')+_0x7cd5('\x30\x78\x39\x37','\x61\x4f\x31\x4f')),_0x497937=new Request(new URL(_0x3c8db0[_0x7cd5('\x30\x78\x31\x32','\x4f\x38\x5b\x64')]['\x69\x64'],this[_0x7cd5('\x30\x78\x63\x32','\x4e\x74\x56\x55')]),this[_0x7cd5('\x30\x78\x31\x37','\x23\x71\x5e\x28')]),_0x3c8b64=await Engine[_0x7cd5('\x30\x78\x36\x34','\x4b\x63\x21\x49')][_0x7cd5('\x30\x78\x39\x35','\x41\x73\x76\x56')](_0x497937,_0x321d80[_0x7cd5('\x30\x78\x65\x34','\x23\x71\x5e\x28')](_0x7cd5('\x30\x78\x31\x64','\x43\x78\x73\x51')+_0x3c8db0['\x69\x64']+'\x3b',_0x26fbbc));return new URL(_0x3c8b64,_0x497937[_0x7cd5('\x30\x78\x37\x30','\x4f\x37\x58\x34')]);}async[_0x7cd5('\x30\x78\x64\x32','\x5a\x25\x53\x63')](_0x45c042){const _0x4f3bf5={};_0x4f3bf5[_0x7cd5('\x30\x78\x35\x65','\x28\x51\x58\x34')]=_0x7cd5('\x30\x78\x31\x39','\x6d\x68\x43\x70');_0x4f3bf5[_0x7cd5('\x30\x78\x61\x61','\x6b\x5d\x46\x67')]=_0x7cd5('\x30\x78\x64\x65','\x63\x4d\x44\x56');const _0x3de5df=_0x4f3bf5;let _0x23e822=await this[_0x7cd5('\x30\x78\x39\x33','\x35\x47\x65\x48')](_0x45c042),_0x1d607a=new Request(_0x23e822,this[_0x7cd5('\x30\x78\x64\x66','\x61\x4f\x31\x4f')]);_0x1d607a[_0x7cd5('\x30\x78\x38\x30','\x39\x63\x6e\x64')][_0x7cd5('\x30\x78\x35\x66','\x5b\x49\x5d\x2a')](_0x3de5df[_0x7cd5('\x30\x78\x32\x61','\x64\x35\x63\x74')],new URL(_0x45c042[_0x7cd5('\x30\x78\x66\x63','\x68\x31\x64\x63')]['\x69\x64'],this[_0x7cd5('\x30\x78\x34\x35','\x6b\x5d\x46\x67')])[_0x7cd5('\x30\x78\x62\x38','\x47\x79\x33\x5e')]);let _0xef4aed=await this[_0x7cd5('\x30\x78\x36\x66','\x31\x2a\x40\x77')](_0x1d607a,_0x3de5df[_0x7cd5('\x30\x78\x31\x66','\x42\x63\x6e\x38')]);return _0xef4aed[_0x7cd5('\x30\x78\x66\x39','\x39\x63\x6e\x64')](_0x3a9b57=>this[_0x7cd5('\x30\x78\x61','\x4f\x38\x5b\x64')]({'\x75\x72\x6c':this[_0x7cd5('\x30\x78\x33\x65','\x28\x51\x58\x34')](_0x3a9b57[_0x7cd5('\x30\x78\x36\x64','\x62\x36\x76\x71')][_0x7cd5('\x30\x78\x64\x38','\x62\x36\x76\x71')]||_0x3a9b57[_0x7cd5('\x30\x78\x32','\x77\x5b\x4f\x43')],_0x1d607a[_0x7cd5('\x30\x78\x61\x64','\x47\x79\x33\x5e')]),'\x72\x65\x66\x65\x72\x65\x72':_0x1d607a[_0x7cd5('\x30\x78\x36\x38','\x40\x2a\x4a\x6e')]}));}[_0x7cd5('\x30\x78\x38\x63','\x42\x63\x6e\x38')](_0x18a349){const _0xde83fe={};_0xde83fe[_0x7cd5('\x30\x78\x61\x35','\x4e\x74\x56\x55')]=_0x7cd5('\x30\x78\x66\x35','\x39\x32\x64\x46');const _0x114424=_0xde83fe;this[_0x7cd5('\x30\x78\x32\x36','\x33\x49\x69\x59')][_0x7cd5('\x30\x78\x31\x30\x33','\x6d\x68\x43\x70')][_0x7cd5('\x30\x78\x38\x33','\x6b\x5d\x46\x67')](_0x114424[_0x7cd5('\x30\x78\x33\x34','\x33\x4d\x57\x79')],_0x18a349[_0x7cd5('\x30\x78\x66\x66','\x28\x51\x58\x34')]);let _0x34cdbd=super[_0x7cd5('\x30\x78\x63\x37','\x25\x6a\x4c\x6e')](_0x18a349[_0x7cd5('\x30\x78\x66\x32','\x36\x5d\x24\x4b')]);this[_0x7cd5('\x30\x78\x64\x66','\x61\x4f\x31\x4f')][_0x7cd5('\x30\x78\x61\x66','\x68\x31\x64\x63')][_0x7cd5('\x30\x78\x38\x31','\x5b\x49\x5d\x2a')](_0x114424[_0x7cd5('\x30\x78\x31\x31','\x66\x30\x59\x68')]);return _0x34cdbd;}}
*/