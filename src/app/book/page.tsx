// src/app/book/page.tsx
import { site } from "@/config/site";

export default function Book() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Book a Discovery Call</h1>
      <p className="mt-2 text-gray-600">Pick a time that works for you.</p>

      <div className="mt-6 w-full h-[800px]">
        <iframe
          title="Calendly"
          src={`${site.calendly}?hide_gdpr_banner=1`}
          className="w-full h-full rounded-2xl border"
        />
      </div>
    </section>
  );
}
