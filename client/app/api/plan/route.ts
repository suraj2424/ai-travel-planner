import { generatePlan, type PlanInput } from "@/lib/itinerary";

const BUDGETS = ["shoestring", "comfort", "luxe"] as const;
const PACES = ["relaxed", "balanced", "packed"] as const;

function parseBody(raw: unknown): PlanInput {
  if (typeof raw !== "object" || raw === null) throw new Error("Bad payload");
  const b = raw as Record<string, unknown>;

  const destination =
    typeof b.destination === "string" ? b.destination.trim().slice(0, 60) : "";
  if (!destination) throw new Error("Tell us where — even “somewhere warm” works.");

  const days =
    typeof b.days === "number" && Number.isFinite(b.days)
      ? Math.min(10, Math.max(2, Math.round(b.days)))
      : 5;
  const travelers =
    typeof b.travelers === "number" && Number.isFinite(b.travelers)
      ? Math.min(12, Math.max(1, Math.round(b.travelers)))
      : 2;
  const budget = BUDGETS.includes(b.budget as (typeof BUDGETS)[number])
    ? (b.budget as PlanInput["budget"])
    : "comfort";
  const pace = PACES.includes(b.pace as (typeof PACES)[number])
    ? (b.pace as PlanInput["pace"])
    : "balanced";
  const styles = Array.isArray(b.styles)
    ? (b.styles as unknown[]).filter((s): s is string => typeof s === "string").slice(0, 6)
    : [];
  const month = typeof b.month === "string" ? b.month.slice(0, 20) : "";

  return { destination, days, travelers, budget, pace, styles, month };
}

export async function POST(req: Request) {
  let input: PlanInput;
  try {
    input = parseBody(await req.json());
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }

  // Let the engine breathe — planning should feel considered, not instant.
  await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));

  const plan = generatePlan(input);

  return Response.json({ plan, id: null });
}
