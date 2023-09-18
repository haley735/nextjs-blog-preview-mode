import Container from '@components/container'
import MoreStories from '@components/more-stories'
import HeroPost from '@components/hero-post'
import Intro from '@components/intro'
import Layout from '@components/layout'
import Header from '@components/header'
import { getAllPagesForHome, 
  getAllPostsForHome, 
  getHeaderForSlug, 
  getSubpagesForPage, 
  getPageEvents, 
  getTextIntroForPage,
  getHorizontalIconsForPage, 
  getVerticalIconsForPage,
  getGallery} from '@api'
import Divider from '@components/divider'
import UpcomingEvents from '@components/upcoming-events'
import HorizontalIcons from '@components/horizontal-icons'
import VerticalIcons from '@components/vertical-icons'
import MediaGallery from '@components/media-gallery'

export default function Index({ preview, allPages, subpages, header, events, textIntros, horizontalIconGroups, verticalIconGroups, gallery }) {
  // const heroPost = allPosts[0];
  // const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout preview={preview} >
        <Header pages={allPages} headerMedia={header} subpages={subpages}/>
        <Container>
          <Intro intros={textIntros}/>
          <Divider options={{'marginBottom': true}}></Divider>
          {horizontalIconGroups &&
            <HorizontalIcons icons={horizontalIconGroups}/>

          }
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )} */}
          {/* <Divider></Divider> */}
          
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
        {events && (
            <UpcomingEvents events={events}/>
          )}
        {verticalIconGroups &&
          <VerticalIcons icons={verticalIconGroups}/>
        }
        {gallery && 
          <MediaGallery images={gallery}/>

        }
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  // const allPosts = (await getAllPostsForHome(preview)) ?? []
  const allPages = (await getAllPagesForHome(preview)) ?? [];
  const header = (await getHeaderForSlug(preview)) ?? [];
  // const subpages = (await getSubpagesForPage(preview)) ?? []
  const events = (await getPageEvents('home', preview)) ?? [];
  const textIntros = (await getTextIntroForPage('home', preview)) ?? [];
  const horizontalIconGroups = (await getHorizontalIconsForPage('home', preview)) ?? [];
  const verticalIconGroups = (await getVerticalIconsForPage('home', preview)) ?? [];
  const gallery = (await getGallery(preview)) ?? [];
  // console.log('h-icons: ', horizontalIconGroups);
  
  //TODO: update subpages api to have nested navigation
  const subpages = [];
  // if(allPages.length > 0){
  //   allPages = allPages.reverse();
  // }
  return {
    props: { preview, allPages, header, subpages, events, textIntros, horizontalIconGroups, verticalIconGroups, gallery },
  }
}