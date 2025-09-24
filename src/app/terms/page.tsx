import { site } from "@/config/site";

export default function Terms() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-gray-700">
        By using {site.name}, you agree to fair, lawful use of our site and services. Content is provided as-is without warranties.
      </p>
      <p className="mt-2 text-gray-700">
        Questions? Contact <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </section>
  );
}
