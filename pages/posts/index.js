import Container from '@components/container'
import MoreStories from '@components/more-stories'
import HeroPost from '@components/hero-post'
import Layout from '@components/layout'
import Header from '@components/header'
import { getAllPostsForHome, 
    getAllPagesForHome, 
    getHeaderForSlug } from '@api'

export default function Posts({preview, allPages, subpages, allPosts, header}){
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);
    return (
        <>
            <Layout preview={preview} >
            <Header pages={allPages} headerMedia={header} subpages={subpages}/>
            <Container>
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
                {/* <Divider></Divider> */}
                
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
            </Layout>
        </>
    );

}

export async function getStaticProps({ preview = false }) {
    const allPosts = (await getAllPostsForHome(preview)) ?? []
    const header = (await getHeaderForSlug(preview)) ?? [];
    const allPages = (await getAllPagesForHome(preview)) ?? [];
    //TODO: update subpages api to have nested navigation
    const subpages = [];

    return {
        props: { preview, allPages, subpages, allPosts, header},
      }
}
