
const header = {

    cache: {
        pragma: { 'Pragma': 'no-cache' },
        maxAge: (seconds) => { return { 'Cache-Control': `max-age=${seconds}` } },
        maxStale: (seconds) => { return { 'Cache-Control': `max-stale=${seconds}` } },
        minRefresh: (seconds) => { return { 'Cache-Control': `max-stale=${seconds}` } },
        noCache: { 'Cache-Control': 'no-cache' },
        noStore: { 'Cache-Control': 'no-store' },
        noTransform: { 'Cache-Control': 'no-transform' },
        onlyIfCache: { 'Cache-Control': 'only-if-cached' },
        immutable: { 'Cache-Control': 'immutable' },
        staleWhileRevalidate: (seconds) => { return { 'Cache-Control': `stale-while-revalidate=${seconds}` }; },
        staleIfError: (seconds) => { return { 'Cache-Control': `stale-if-error=${seconds}` }; }
    }

    //, ...
};

export default header;
