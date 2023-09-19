const POST_GRAPHQL_FIELDS = `
slug
title
source
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`

const GALLERY_FIELDS = `
title
photosCollection{
  items{
    title
    description
    contentType
    url
    width
    height
  }
}
`


const PAGE_ICON_GROUP_FIELDS = `
title
slug
icons{
  orientation
  groupImage
  iconsCollection{
    items{
      title
      body
      iconImage{
        url
      }
    }
  }
}
`

const PAGE_HORIZONTAL_ICON_GROUP_FIELDS = `
horizontalIcons{
  title
  displayTitle
  photoLocation
  photo{
    url
  }
  iconsCollection{
    items{
      title
      body
      iconImage{
        url
      }
    }
  }
}
`

const PAGE_VERTICAL_ICON_GROUP_FIELDS = `
verticalIcons{
  title
  displayTitle
  photoLocation
  photo{
    url
  }
  iconsCollection{
    items{
      title
      body
      iconImage{
        url
      }
    }
  }
}
`

const PAGE_INTRO_FIELDS = `
header
body{
  json
}
`

const PAGE_EVENTS_FIELDS = `
title
slug
eventsCollection {
  items{
    eventName
    eventStartDate
    eventEndDate
    eventLocation{
      __typename
      lat
      lon
    }
    eventLocationName
  }
}
`

const PAGE_HOME_NAV_FIELDS = `
title
slug
`
const HEADER_MEDIA_FIELDS = `
title
headerImage {
  url
}
headerVideo {
  url
}
logo {
  url
}
`

const SUBPAGE_GRAPHQL_FIELDS = `
  title
  slug
  linkedFrom {
    pageCollection {
      __typename
      items{
        title
        slug
      }
    }
  }
`

const PAGE_HERO_FIELDS = `
title
slug
heroImage{
  url
}
heroText{
  json
}
`

const PAGE_POST_FIELDS = `
title
slug
posts
`


const PAGE_GRAPHQL_FIELDS = `
title
slug
`
// heroText {
//   json
//   links {
//     assets {
//       block {
//         sys {
//           id
//         }
//         url
//         description
//       }
//     }
//   }
// }
// heroImage{
//   url
// }
// authorsCollection {
//   items {
//     __typename
//     sys {
//       id
      
//     }
//   }
// }
// postsCollection {
//   items {
//     __typename
//     sys {
//       id
//     }
//   }
// }
// subpagesCollection {
//   items {
//     __typename
//     sys {
//       id
//     }
//   }
// }
// `

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
  // .then(data => console.log(data))
  // {
  //   const res = response.json();
    // const reader = response.getReader();

    // reader.read().then(function pump({ done, value }) {
    //   if (done) {
    //     // Do something with last chunk of data then exit reader
    //     return;
    //   }
    //   // Otherwise do something here to process current chunk
    //   console.log(value);
    //   // Read some more, and call this function again
    //   return reader.read().then(pump);
    // });
    // console.log('graphQL response: ', reader);
  // })
}

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   Hero Text & Hero Image  ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function extractHero(fetchResponse){
  return fetchResponse?.data?.pageCollection?.items?.[0]
}

function extractHeroEntries(fetchResponse){
  return fetchResponse?.data?.pageCollection?.items
}

export async function getHero(slug, preview){
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: {slug: "${slug}"}) {
        items {
          ${PAGE_HERO_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractHero(entry)
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   Gallery  //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function exractGallery(fetchResponse){
  return fetchResponse?.data?.galleryCollection?.items?.[0]
}

function extractGalleryEntries(fetchResponse){
  return fetchResponse?.data?.galleryCollection?.items
}

export async function getGallery(preview){
  const entries = await fetchGraphQL(
    `query {
      galleryCollection(limit:10) {
        items {
          ${GALLERY_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractGalleryEntries(entries)
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   Icon Groups  ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function exractPageIcons(fetchResponse){
  return fetchResponse?.data?.pageCollection?.items?.[0]
}

function extractPageIconsEntries(fetchResponse){
  return fetchResponse?.data?.pageCollection?.items
}

function extractHorizontalIconGroup(fetchResponse){
  return fetchResponse?.data?.horizontalIconGroupCollection?.items?.[0]
}

function extractHorizontalIconGroupEntries(fetchResponse){
  return fetchResponse?.data?.horizontalIconGroupCollection?.items
}

function extractVerticalIconGroup(fetchResponse){
  return fetchResponse?.data?.verticalIconGroupCollection?.items?.[0]
}

function extractVerticalIconGroupEntries(fetchResponse){
  return fetchResponse?.data?.verticalIconGroupCollection?.items
}

export async function getHorizontalIconsForPage(slug, preview){
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: {slug: "${slug}"}, limit:10) {
        items {
          ${PAGE_HORIZONTAL_ICON_GROUP_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPageIconsEntries(entries)
}

export async function getHorizontalIconGroupsForPage(slug, preview){
  const filter = slug.charAt(0).toUpperCase() + slug.slice(1);
  const entries = await fetchGraphQL(
    `query {
      horizontalIconGroupCollection(limit:10) {
        items {
          ${PAGE_HORIZONTAL_ICON_GROUP_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractHorizontalIconGroupEntries(entries)
}

export async function getVerticalIconsForPage(slug, preview){
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: {slug: "${slug}"}, limit:10) {
        items {
          ${PAGE_VERTICAL_ICON_GROUP_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPageIconsEntries(entries)
}

export async function getVerticalIconGroupsForPage(slug, preview){
  const filter = slug.charAt(0).toUpperCase() + slug.slice(1);
  const entries = await fetchGraphQL(
    `query {
      verticalIconGroupCollection(where: {parentPage_contains_all: "${filter}"}, limit:10) {
        items {
          ${PAGE_VERTICAL_ICON_GROUP_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractVerticalIconGroupEntries(entries)
}

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   Text Intro  ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
function extractTextIntro(fetchResponse){
  return fetchResponse?.data?.textIntroCollection?.items?.[0]
}

function extractTextIntroEntries(fetchResponse){
  return fetchResponse?.data?.textIntroCollection?.items
}

export async function getTextIntroForPage(slug, preview){
  const entries = await fetchGraphQL(
    `query {
      textIntroCollection(where: {header_exists: true}) {
        items {
          ${PAGE_INTRO_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractTextIntroEntries(entries)
}



//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   SUBPAGES  /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function extractSubpage(fetchResponse){
  return fetchResponse?.data?.subpageCollection?.items?.[0]
}

function extractSubpageEntries(fetchResponse){
  return fetchResponse?.data?.subpageCollection?.items
}

export async function getSubpagesForPage(preview){
  const entries = await fetchGraphQL(
    `query {
      subpageCollection(where: {title_exists: true} preview: ${preview ? 'true' : 'false'}) {
        items {
          ${SUBPAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractSubpageEntries(entries)
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   HEADER  ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function extractHeader(fetchResponse){
  return fetchResponse?.data?.headerCollection?.items?.[0]
}

function extractHeaderEntries(fetchResponse){
  return fetchResponse?.data?.headerCollection?.items
}

export async function getHeaderForSlug(preview){
  const entries = await fetchGraphQL(
    `query {
      headerCollection(preview: ${preview ? 'true' : 'false'}) {
        items {
          ${HEADER_MEDIA_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractHeaderEntries(entries)
}
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   PAGES  ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function extractPage(fetchResponse){
  return fetchResponse?.data?.pageCollection?.items?.[0]
}

function extractPageEntries(fetchResponse){
  return fetchResponse?.data?.pageCollection?.items
}

export async function getPreviewPageBySlug(slug){
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPage(entry);
}

export async function getAllPagesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug_exists: true }) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPageEntries(entries);
}

export async function getAllPagesForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: {slug_exists: true, parentPage_exists: true} preview: ${preview ? 'true' : 'false'}) {
        items {
          ${PAGE_HOME_NAV_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPageEntries(entries);
}

export async function getPageAndMorePages(slug, preview) {
  console.log('function params: ', slug, preview);
  console.log('fields: ', PAGE_GRAPHQL_FIELDS);
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  console.log('page entry: ', entry);
  const entries = await fetchGraphQL(
    `query {
      pageCollection(where: { slug_not_in: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${PAGE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    page: extractPage(entry),
    morePages: extractPageEntries(entries),
  }
}

export async function getPageEvents(slug, preview){
  const entry = await fetchGraphQL(
    `query {
      pageCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PAGE_EVENTS_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    events: extractPage(entry),
  }
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////   POSTS  ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items
}

export async function getPostBySource(source) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { source: "${source}" }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPostEntries(entries)
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}
