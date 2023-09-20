import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Divider from './divider';


const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => `<p clasName="text-bold">${text}<p>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) =>
      <p className="p-4" >{children}</p>,
    [BLOCKS.HR]: (node, children) =>
      <Divider options={{'marginBottom': true}} />,
    [BLOCKS.HEADING_4]: (node, children) => 
      <h4 className="text-6xl font-bold p-4">{children}</h4>,
    [BLOCKS.QUOTE]: (node, children) =>
      <blockquote>{children}</blockquote>,

  },
};

export default function RichText({ document }) {

  return(
    <>
      {/* { documentToHtmlString(document, options) } */}
      { documentToReactComponents(document, options) }
    </>
  )

}
