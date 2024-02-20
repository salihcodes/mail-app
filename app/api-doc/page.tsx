import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./components/react-swagger";

export default async function ApiDocPage() {
  const spec = await getApiDocs();
  if (!spec) {
    return <div>Api docs not found</div>;
  }

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
