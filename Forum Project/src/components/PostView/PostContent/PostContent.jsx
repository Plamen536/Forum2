const PostContent = ({ content }) => {
  /**
   * @function renderContentWithBreaks
   * @description Splits the content string by newline characters and returns an array of <p> elements.
   * @param {string} contents - The post content to be split.
   * @returns {JSX.Element[]} An array of <p> elements with the split content.
   */

  const renderContentWithBreaks = (content) => {
    return content.split('\n').map((line, index) => <p key={index}>{line}</p>);
  };

  return <div className="postContent">{renderContentWithBreaks(content)}</div>;
};
export default PostContent;
