import EditBlog from "./components/edit-blog";

export default function Page({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <EditBlog id={id} />;
}
