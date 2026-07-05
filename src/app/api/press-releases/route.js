import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Helper to normalize state codes to full names and database collection names
const STATE_MAP = {
  'DL': { name: 'Delhi', collection: 'delhi' },
  'HR': { name: 'Haryana', collection: 'haryana' },
  'UP': { name: 'Uttar Pradesh', collection: 'uttar_pradesh' }
};

// Helper to map raw source IDs to formatted user-facing source names
function mapSourceName(source) {
  if (!source) return 'Official Source';
  const s = source.toLowerCase().trim();
  
  const sourcesMap = {
    'dda': 'Delhi Development Authority (DDA)',
    'up_rera': 'UP RERA',
    'uprera': 'UP RERA',
    'haryana_rera': 'Haryana RERA',
    'hrera': 'Haryana RERA',
    'huda': 'HUDA (Haryana Urban Development Authority)',
    'upsida': 'UPSIDA (UP State Industrial Development Authority)',
    'mint': 'LiveMint',
    'moneycontrol': 'MoneyControl',
    'economic_times': 'Economic Times',
    'economictimes': 'Economic Times',
    'hindustantimes': 'Hindustan Times',
    'ht': 'Hindustan Times',
    'timesofindia': 'Times of India',
    'toi': 'Times of India'
  };

  return sourcesMap[s] || source.toUpperCase().replace(/_/g, ' ');
}

// Helper to clean scraped content text from navigation fragments, extra whitespaces, etc.
function cleanContent(text) {
  if (!text) return '';
  
  // 1. Remove carriage returns and replace multiple newlines/whitespace with a single space
  let cleaned = text
    .replace(/\r\n/g, '\n')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 2. Remove leading garbage characters (e.g. cross marks, bullets, numbering anchors)
  cleaned = cleaned.replace(/^[×•\-\s]+/, '');

  // 3. Remove common navigation noise if the text starts with it
  const menuNoiseKeywords = [
    'industrial info', 'plantation resource', 'operating manual', 
    'important links', 'investor guide', 'news letters', 'track application'
  ];
  
  const matchCount = menuNoiseKeywords.filter(keyword => cleaned.toLowerCase().includes(keyword)).length;
  if (matchCount >= 3) {
    return "Official notice and guidelines from the Uttar Pradesh State Industrial Development Authority (UPSIDA).";
  }

  if (cleaned.toLowerCase().includes('screen reader') && cleaned.toLowerCase().includes('free / commercial')) {
    return "Official Screen Reader and website accessibility guidelines from the Delhi Development Authority (DDA).";
  }

  return cleaned;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const stateParam = (searchParams.get('state') || 'ALL').toUpperCase();
    const sourceParam = (searchParams.get('source') || 'ALL').toLowerCase(); // 'all', 'articles', 'press_releases'
    const tagParam = searchParams.get('tag');

    const client = await clientPromise;
    
    let dbArticles = [];
    let dbPressReleases = [];
    let hasLiveDbData = false;

    // 1. Fetch from property_news.articles
    if (sourceParam === 'all' || sourceParam === 'articles') {
      try {
        const db = client.db('property_news');
        const query = {};
        if (stateParam !== 'ALL') {
          query.state = new RegExp(`^${stateParam}`, 'i');
        }
        
        if (tagParam) {
          const escapedTag = tagParam.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const tagRegex = new RegExp(`^${escapedTag}$`, 'i');
          query.$or = [
            { tags: tagRegex },
            { builders: tagRegex },
            { projects: tagRegex },
            { authorities: tagRegex }
          ];
        }
        
        const articles = await db.collection('articles')
          .find(query)
          .sort({ published_at: -1 })
          .limit(30)
          .toArray();

        if (articles.length > 0) {
          hasLiveDbData = true;
          dbArticles = articles.map(doc => ({
            id: doc._id.toString(),
            source: 'articles',
            title: doc.title || 'Property News Update',
            content: cleanContent(doc.content || ''),
            url: doc.url || '#',
            date: doc.published_at ? new Date(doc.published_at).toISOString() : new Date().toISOString(),
            state: doc.state || 'General',
            city: doc.city || '',
            category: (doc.categories && doc.categories[0]) || 'News',
            categories: doc.categories || [],
            builders: doc.builders || [],
            projects: doc.projects || [],
            authorities: doc.authorities || [],
            sourceName: mapSourceName(doc.source || 'mint')
          }));
        }
      } catch (err) {
        console.error("Error fetching from property_news.articles:", err);
      }
    }

    // 2. Fetch from press_release state collections
    if (sourceParam === 'all' || sourceParam === 'press_releases') {
      try {
        const db = client.db('press_release');
        const collectionsToQuery = stateParam === 'ALL' 
          ? ['delhi', 'haryana', 'uttar_pradesh'] 
          : [STATE_MAP[stateParam]?.collection].filter(Boolean);

        for (const colName of collectionsToQuery) {
          const query = {};
          if (tagParam) {
            const escapedTag = tagParam.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const tagRegex = new RegExp(`^${escapedTag}$`, 'i');
            query.$or = [
              { tags: tagRegex },
              { builders: tagRegex },
              { projects: tagRegex },
              { authorities: tagRegex }
            ];
          }

          const prs = await db.collection(colName)
            .find(query)
            .sort({ published_at: -1 })
            .limit(20)
            .toArray();

          if (prs.length > 0) {
            hasLiveDbData = true;
            const mappedPrs = prs.map(doc => {
              // Convert database collection name to state code
              let stateCode = 'General';
              if (colName === 'delhi') stateCode = 'DL';
              else if (colName === 'haryana') stateCode = 'HR';
              else if (colName === 'uttar_pradesh') stateCode = 'UP';

              return {
                id: doc._id.toString(),
                source: 'press_releases',
                title: doc.title || 'Official Press Release',
                content: cleanContent(doc.content || doc.description || 'Official announcement and details regarding regional real estate guidelines.'),
                url: doc.url || '#',
                date: doc.published_at ? new Date(doc.published_at).toISOString() : new Date().toISOString(),
                state: stateCode,
                city: doc.city || '',
                category: (doc.categories && doc.categories[0]) || 'PR',
                categories: doc.categories || [],
                sourceName: mapSourceName(doc.source || colName)
              };
            });
            dbPressReleases.push(...mappedPrs);
          }
        }
      } catch (err) {
        console.error("Error fetching from press_release:", err);
      }
    }

    // Combine database results
    let combinedFeed = [...dbArticles, ...dbPressReleases];
    combinedFeed.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json({
      success: true,
      isLive: hasLiveDbData,
      data: combinedFeed
    });

  } catch (error) {
    console.error('Press Releases API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve feed. Please check MongoDB configuration.'
    }, { status: 500 });
  }
}
