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
  return (
    <>
      <Layout preview={preview} >
        <Header pages={allPages} headerMedia={header} subpages={subpages}/>
        <Container>
          {textIntros && textIntros.length && 
            <Intro intros={textIntros}/>
          }
          <Divider options={{'marginBottom': true}}></Divider>
          {horizontalIconGroups && horizontalIconGroups.length &&
            <HorizontalIcons icons={horizontalIconGroups}/>
          }
        </Container>
        {events && events.length && (
            <UpcomingEvents events={events}/>
          )}
        {verticalIconGroups && verticalIconGroups.length &&
          <VerticalIcons icons={verticalIconGroups}/>
        }
        {gallery && gallery.length &&
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
  
  //TODO: update subpages api to have nested navigation
  const subpages = [];
  return {
    props: { preview, allPages, header, subpages, events, textIntros, horizontalIconGroups, verticalIconGroups, gallery },
  }
}