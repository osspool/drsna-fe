import { redirect } from "next/navigation";
import { getBaseUrl } from "@/lib/domain-helpers";

export default async function BookingPage() {
  // Resolve domain-aware context so the route matches metadata dynamism
  await getBaseUrl();
  redirect("/contact");
}
