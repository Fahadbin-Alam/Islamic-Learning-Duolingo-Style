// The charity behind the Me tab's "Give charity" row. The money is paid on the charity's own web page,
// in the phone's browser, never inside the app: Apple (guideline 3.2.2) and Google Play (Payments policy)
// both keep donations out of in-app purchases. The row stays hidden until donateUrl is set.
export type CharityConfig = {
  /** Shown on the sheet, e.g. "One World Relief". */
  name: string;
  /** The charity's donation page. The QR code and the DONATE button open it. */
  donateUrl: string;
  /** Amount chips, in `currency`. */
  amounts: number[];
  currency: "USD" | "GBP" | "EUR" | "CAD" | "AUD";
  /** The page takes the amount from this query parameter (donateUrl?amount=10). Leave empty if it can't. */
  amountParam: string;
  /** A page for one amount, such as a Stripe Payment Link made for $10. Wins over amountParam. */
  amountUrls: Partial<Record<number, string>>;
};

export const CHARITY: CharityConfig = {
  name: "",
  donateUrl: "",
  amounts: [5, 10, 25, 50],
  currency: "USD",
  amountParam: "",
  amountUrls: {}
};

const SYMBOLS: Record<CharityConfig["currency"], string> = { USD: "$", GBP: "£", EUR: "€", CAD: "CA$", AUD: "A$" };

export function charityEnabled(charity: CharityConfig = CHARITY) {
  return /^https:\/\//.test(charity.donateUrl.trim());
}

export function formatDonation(amount: number, charity: CharityConfig = CHARITY) {
  return `${SYMBOLS[charity.currency]}${amount}`;
}

/** Whether the page opens with `amount` already picked (else the giver picks it there). */
export function carriesAmount(amount: number, charity: CharityConfig = CHARITY) {
  return Boolean(charity.amountUrls[amount] || charity.amountParam);
}

/** The page the QR code and the DONATE button open for `amount`. */
export function donationUrl(amount: number | undefined, charity: CharityConfig = CHARITY) {
  const base = charity.donateUrl.trim();
  if (amount === undefined) return base;
  const own = charity.amountUrls[amount];
  if (own) return own;
  if (!charity.amountParam) return base;
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}${encodeURIComponent(charity.amountParam)}=${encodeURIComponent(String(amount))}`;
}
