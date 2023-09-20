import RichText  from './contentful-rich-text'
import CoverImage from './cover-image'

export default function Hero({ document, title, heroImageUrl, slug }) {
  return(
    <>
      <div>
        <CoverImage title={title} url={heroImageUrl} slug={slug}/>
      </div>
      <RichText document={document}/>
    </>
  )
}
