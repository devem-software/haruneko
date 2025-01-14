import { TestFixture } from '../../../test/WebsitesFixture';

const config = {
    plugin: {
        id: 'cerisescans',
        title: 'Cerise Scans'
    },
    container: {
        url: 'https://cerisescan.com/home1/manga/adele02/',
        id: JSON.stringify({ post: '45', slug: '/home1/manga/adele02/' }),
        title: 'Just Leave Me Be'
    },
    child: {
        id: '/home1/manga/adele02/cap-01/',
        title: 'Cap. 01',
    },
    entry: {
        index: 0,
        size: 1_424_016,
        type: 'image/jpeg'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());