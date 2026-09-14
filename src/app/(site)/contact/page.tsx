import ContactCard from "@/components/contact/ContactCard";

export const metadata = {
  title: "Contact | Otis Library",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl text-white">Contact Us</h1>
        <p className="mt-4 text-slate-400">
          We&apos;d love to hear from you. Reach out with questions, feedback,
          or requests for help.
        </p>
      </div>

      <div className="mt-10">
        <ContactCard />
      </div>
    </div>
  );
}
