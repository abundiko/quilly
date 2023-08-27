
export function HTMLText({ html }:{html?:string}) {
  return <div dangerouslySetInnerHTML={{ __html: html??"" }} />;
}
export default HTMLText