import DynamicBlog from "./components/dynamic-blog";

export default function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <DynamicBlog id={id} />;
}
