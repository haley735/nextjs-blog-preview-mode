import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '@components/container'
import PostBody from '@components/post-body'
import MoreStories from '@components/more-stories'
import Header from '@components/header'
import PostHeader from '@components/post-header'
import SectionSeparator from '@components/section-separator'
import Layout from '@components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts, getHeaderForSlug, getAllPagesForHome } from '@api'
import PostTitle from '@components/post-title'
import { CMS_NAME } from '../../lib/constants'

export default function Post({ post, morePosts, preview, allPages, header }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header pages={allPages} headerMedia={header}/>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta property="og:image" content={post.coverImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
            <SectionSeparator />
            {morePosts && morePosts.length > 0 && (
              <MoreStories posts={morePosts} />
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  const allPages = (await getAllPagesForHome(preview)) ?? []
  const header = (await getHeaderForSlug(preview)) ?? []
  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
      allPages: allPages,
      header: header,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  }
}
