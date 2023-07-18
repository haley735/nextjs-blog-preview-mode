import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../components/container'
import PostBody from '../components/post-body'
import MoreStories from '../components/more-stories'
import Header from '../components/header'
import PostHeader from '../components/post-header'
import SectionSeparator from '../components/section-separator'
import Layout from '../components/layout'
import { getAllPagesWithSlug, getPageAndMorePages, getAllPagesForHome, getHeaderForSlug } from '../lib/api'
import PostTitle from '../components/post-title'
import { CMS_NAME } from '../lib/constants'

export default function Page({ page, pages, header, preview }) {
  const router = useRouter();
  // console.log('morePages: ', pages);

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
            <p>We have a page</p>
           </>
          // <>
          //   <article>
          //     <Head>
          //       <title>
          //         {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
          //       </title>
          //       <meta property="og:image" content={post.coverImage.url} />
          //     </Head>
          //     <PostHeader
          //       title={post.title}
          //       coverImage={post.coverImage}
          //       date={post.date}
          //       author={post.author}
          //     />
          //     <PostBody content={post.content} />
          //   </article>
          //   <SectionSeparator />
          //   {morePosts && morePosts.length > 0 && (
          //     <MoreStories posts={morePosts} />
          //   )}
          // </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPageAndMorePages(params.slug, preview);
  const allPages = (await getAllPagesForHome(preview)) ?? []
  const header = (await getHeaderForSlug(preview)) ?? []
  return {
    props: {
      preview,
      page: data?.page ?? null,
      pages: allPages,
      header: header
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesForHome()
  return {
    allPages: allPages,
    paths: allPages?.map(({ slug }) => `/${slug}`) ?? [],
    fallback: true,
  }
}
