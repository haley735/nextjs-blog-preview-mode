import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Header from '../components/header'
import { getAllPagesForHome, getAllPostsForHome, getHeaderForSlug, getSubpagesForPage } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ preview, allPosts, allPages, subpages, header }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  console.log('entered index');
  return (
    <>
      <Layout preview={preview} >
        {/* <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head> */}
        <Header key='header-1' pages={allPages} headerMedia={header} subpages={subpages}/>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  let allPages = (await getAllPagesForHome(preview)) ?? []
  const header = (await getHeaderForSlug(preview)) ?? []
  // const subpages = (await getSubpagesForPage(preview)) ?? []
  const subpages = [];
  if(allPages.length > 0){
    allPages = allPages.reverse();
  }
  return {
    props: { preview, allPosts, allPages, header, subpages },
  }
}