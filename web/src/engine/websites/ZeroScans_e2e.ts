import { TestFixture, type Config } from '../../../test/WebsitesFixture';

const config: Config = {
    plugin: {
        id: 'zeroscans',
        title: 'ZeroScans'
    },
    container: {
        url: 'https://zeroscans.com/comics/second-life-ranker',
        id: JSON.stringify({ id: 7, slug: 'second-life-ranker'}),
        title: 'Second Life Ranker',
        timeout: 10000
    },
    child: {
        id: '5985',
        title: 'Chapter 161'
    },
    entry: {
        index: 1,
        size: 3_442_522,
        type: 'image/png'
    }
};

const fixture = new TestFixture(config);
describe(fixture.Name, () => fixture.AssertWebsite());