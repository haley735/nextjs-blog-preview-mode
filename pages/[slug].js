import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@components/container'
import MoreStories from '@components/more-stories'
import Header from '@components/header'
import Layout from '@components/layout'
import { getAllPagesWithSlug, 
  getPageAndMorePages, 
  getAllPagesForHome, 
  getHeaderForSlug,
  getPostBySource,
  getHero } from '@api'
import Intro from '@components/intro'
import Hero from '@components/contentful-hero-post'
import Divider from '../components/divider'

export default function Page({ page, pages, header, preview, posts, hero, intro }) {
  const router = useRouter();
  console.log('posts: ', posts);
  console.log('hero: ', hero);

  if (!router.isFallback && !page) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header pages={pages} headerMedia={header}/>

        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
          {intro && intro.length && 
            <Intro intros={textIntros}/>
          }
          {hero && 
            <Hero title={hero.title} document={hero.heroText.json} heroImageUrl={hero.heroImage.url} slug={null}/>
          }
          {posts && posts.length > 0 && (
            <>
              <Divider options={{'marginBottom': true}}/>
              <MoreStories posts={posts} />
            </>
          )}
          </>
          
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPageAndMorePages(params.slug, preview);
  const posts = (await getPostBySource(data?.page.title)) ?? [] 
  const allPages = (await getAllPagesForHome(preview)) ?? []
  const header = (await getHeaderForSlug(preview)) ?? []
  const hero = (await getHero(params.slug, preview)) ?? []
  return {
    props: {
      preview,
      page: data?.page ?? null,
      pages: allPages,
      header: header,
      posts: posts,
      hero: hero,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesForHome()
  return {
    paths: allPages?.map(({ slug }) => `/${slug}`) ?? [],
    fallback: true,
  }
}
