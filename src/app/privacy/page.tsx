import { site } from "@/config/site";

export default function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-gray-700">
        {site.name} respects your privacy. We collect only the data needed to deliver our services and never sell your information.
      </p>
      <p className="mt-2 text-gray-700">
        Questions? Contact <a className="underlin e" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </section>
  );
}
