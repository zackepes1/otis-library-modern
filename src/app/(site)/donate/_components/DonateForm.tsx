"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { IconHeartHandshake, IconLock } from "@tabler/icons-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRESET_AMOUNTS = [25, 50, 100, 250];

const stripeAppearance: import("@stripe/stripe-js").Appearance = {
  theme: "night",
  variables: {
    colorPrimary: "#4798ff",
    colorBackground: "#121a2e",
    colorText: "#e2e8f0",
    colorTextSecondary: "#94a3b8",
    colorDanger: "#f87171",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "8px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(255,255,255,0.1)",
      backgroundColor: "rgba(255,255,255,0.03)",
    },
    ".Input:focus": { borderColor: "#4798ff", boxShadow: "none" },
    ".Label": { color: "#94a3b8", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" },
  },
};

function CheckoutForm({ amount, recurring }: { amount: number; recurring: boolean }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setStatus("loading");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/success`,
      },
    });

    if (error) {
      setErrorMsg(error.message ?? "Payment failed. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {status === "error" && (
        <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-50"
      >
        <IconHeartHandshake size={18} stroke={2} />
        {status === "loading"
          ? "Processing…"
          : `Give $${amount}${recurring ? "/month" : ""}`}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <IconLock size={12} />
        Secured by Stripe · PCI DSS compliant
      </p>
    </form>
  );
}

export default function DonateForm() {
  const [recurring, setRecurring] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [step, setStep] = useState<"choose" | "pay">("choose");
  const [fetchError, setFetchError] = useState("");

  const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
  const amountValid = !isNaN(amount) && amount >= 1;

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!amountValid || !name.trim() || !email.trim()) return;
    setFetchError("");

    const res = await fetch("/api/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, recurring, name: name.trim(), email: email.trim() }),
    });

    if (!res.ok) {
      setFetchError("Something went wrong. Please try again.");
      return;
    }

    const data = await res.json();
    if (data.clientSecret) {
      setClientSecret(data.clientSecret);
      setStep("pay");
    } else {
      setFetchError("Could not initialize payment. Please try again.");
    }
  }

  if (step === "pay" && clientSecret) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand/5 px-4 py-3">
          <div>
            <p className="text-xs text-slate-400">{recurring ? "Monthly gift" : "One-time gift"}</p>
            <p className="text-xl font-semibold text-white">
              ${amount}
              {recurring ? <span className="text-sm font-normal text-slate-400">/month</span> : null}
            </p>
          </div>
          <button
            onClick={() => { setStep("choose"); setClientSecret(null); }}
            className="text-xs text-brand hover:underline"
          >
            Change
          </button>
        </div>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: stripeAppearance }}
        >
          <CheckoutForm amount={amount} recurring={recurring} />
        </Elements>
      </div>
    );
  }

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      {/* Frequency */}
      <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
        {(["One-time", "Monthly"] as const).map((label) => {
          const isRecurring = label === "Monthly";
          return (
            <button
              key={label}
              type="button"
              onClick={() => setRecurring(isRecurring)}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition ${
                recurring === isRecurring
                  ? "bg-brand text-ink shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Amount */}
      <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Select amount
        </p>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
              className={`rounded-lg border py-3 text-sm font-semibold transition ${
                !customAmount && selectedAmount === a
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-white/10 text-slate-300 hover:border-white/30 hover:text-white"
              }`}
            >
              ${a}
            </button>
          ))}
        </div>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            $
          </span>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Other amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-7 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* Donor info */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Your information
        </p>
        <input
          type="text"
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
        />
      </div>

      {fetchError && (
        <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">{fetchError}</p>
      )}

      <button
        type="submit"
        disabled={!amountValid || !name.trim() || !email.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-40"
      >
        Continue to payment →
      </button>
    </form>
  );
}
