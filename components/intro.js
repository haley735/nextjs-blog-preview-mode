import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function Intro({ intros }) {
  const introList = intros[0];

  return (
    <section className="flex flex-col items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h3 className="text-6xl md:text-4xl font-gotham-bold text-teal tracking-widest leading-tight md:pr-8">
        {introList.header.toUpperCase()}
      </h3>
      <div className="m-8 w-3/4">
        <p className="text-center text-black text-justify font-gotham-book text-md mt-5 md:pl-8">
          {introList.body.json.content[0].content[0].value}
        </p>
      </div>
      
    </section>
  )
}
