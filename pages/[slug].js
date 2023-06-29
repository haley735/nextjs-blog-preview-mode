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
import { getAllPagesWithSlug, getPageAndMorePages } from '../lib/api'
import PostTitle from '../components/post-title'
import { CMS_NAME } from '../lib/constants'

export default function Page({ page, morePages, preview }) {
  const router = useRouter();
  console.log('page: ', page);
  console.log('morePages: ', morePages);

  if (!router.isFallback && !page) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
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
  console.log('page params: ', params);
  console.log('page preview: ', preview);
  const data = await getPageAndMorePages(params.slug, preview);
  console.log('data from first get: ', data);
  return {
    props: {
      preview,
      page: data?.page ?? null,
      morePages: data?.morePages ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug()
  return {
    paths: allPages?.map(({ slug }) => `/${slug}`) ?? [],
    fallback: true,
  }
}
