import Link from "next/link";

/* ========= ICONS (brand-accurate) ========= */

function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16 2C8.3 2 2 8.1 2 15.6c0 2.7.8 5.3 2.3 7.5L2 30l7.1-2.2c2 1.1 4.2 1.7 6.6 1.7 7.7 0 14-6.1 14-13.6C29.7 8.1 23.7 2 16 2Zm0 24.8c-2.1 0-4.1-.6-5.8-1.6l-.4-.2-4.2 1.3 1.4-4-.3-.4c-1.4-2-2.2-4.4-2.2-6.9C4.5 9.4 9.8 4.2 16 4.2S27.5 9.4 27.5 15.6 22.2 26.8 16 26.8Z" />
    </svg>
  );
}

function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.3-3.3 3.2-3.3.9 0 1.9.2 1.9.2v2.1h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.25 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

/* ========= PAGE ========= */

export default function ContactPage() {
  // 🔧 Replace with your real links later
  const whatsappNumber = "60123456789"; // no +, no spaces
  const facebookUrl = "https://www.facebook.com/share/1GZUghvvdF/?mibextid=wwXIfr";
  const instagramUrl = "https://www.instagram.com/kingsmenfc.2015?igsh=MTR6dXJhYnVrbWsycA==";

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 text-center">
        Contact
      </h1>

      <p className="mt-3 text-center text-gray-600">
        Connect with Kingsmen FC through our official channels.
      </p>

      {/* SOCIAL LINKS */}
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {/* WhatsApp */}
        <Link
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-md transition"
        >
          <IconWhatsApp className="w-10 h-10 text-[#25D366]" />
          <span className="font-semibold text-gray-900">WhatsApp</span>
        </Link>

        {/* Facebook */}
        <Link
          href={facebookUrl}
          target="_blank"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-md transition"
        >
          <IconFacebook className="w-10 h-10 text-[#1877F2]" />
          <span className="font-semibold text-gray-900">Facebook</span>
        </Link>

        {/* Instagram */}
        <Link
          href={instagramUrl}
          target="_blank"
          className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-md transition"
        >
          <IconInstagram className="w-10 h-10 text-[#E4405F]" />
          <span className="font-semibold text-gray-900">Instagram</span>
        </Link>
      </div>
    </section>
  );
}
