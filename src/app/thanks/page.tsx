import Link from "next/link";

export default function Thanks() {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Thank you!</h1>
        <p className="mt-3 text-gray-700">
          We&apos;ve received your order. We&apos;ll reach out shortly to get you onboarded.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-xl border px-5 py-3 text-sm hover:bg-gray-50">
          Back to Home
        </Link>
      </section>
    );
  }
  