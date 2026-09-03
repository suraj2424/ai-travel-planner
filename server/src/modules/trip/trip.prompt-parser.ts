import { generateText, Output, zodSchema } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import AppError from "../../shared/errors/AppError";

const parsedPromptSchema = z.object({
  destination: z.string().describe("City, region, or country destination, formatted nicely e.g. 'Bali, Indonesia' or 'Goa, India'"),
  durationDays: z.number().int().min(1).max(60).describe("Total number of days for the trip. Extract from prompt (e.g., '6 days' -> 6, 'weekend' -> 3, 'week' -> 7, default to 4 if not specified)."),
  travellers: z.number().int().min(1).max(50).describe("Number of people travelling. Default to 2 if not mentioned."),
  budget: z.number().int().positive().nullable().describe("Total budget in INR (₹) for all travellers combined. If per-person budget was stated (e.g. '60k each for 4 people'), calculate the total (240000)."),
  travelStyle: z.enum(["ADVENTURE", "RELAXED", "CULTURAL", "LUXURY", "BUDGET"]).nullable().describe("Best matching travel style."),
  interests: z.array(
    z.enum([
      "FOOD",
      "HISTORY",
      "NATURE",
      "BEACHES",
      "MOUNTAINS",
      "NIGHTLIFE",
      "SHOPPING",
      "CULTURE",
      "WILDLIFE",
      "PHOTOGRAPHY",
      "TREKKING",
      "WELLNESS",
      "SPIRITUAL",
      "ADVENTURE_SPORTS",
    ])
  ).describe("Applicable interest tags derived from the prompt."),
  highlights: z.array(z.string()).describe("Short badges/chips summarizing key features e.g. 'Veg-friendly', 'VoA for Indians', 'Beach vibe', 'Budget stays'"),
  summary: z.string().describe("A friendly 1-2 sentence overview of what the plan entails."),
});

export type ParsedTripPrompt = z.infer<typeof parsedPromptSchema> & {
  startDate: string;
  endDate: string;
};

export class TripPromptParser {
  async parse(prompt: string, referenceDate: Date = new Date()): Promise<ParsedTripPrompt> {
    const today = new Date(referenceDate);

    // Format today as YYYY-MM-DD local/ISO
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const systemPrompt = `You are an expert travel assistant specializing in trips for Indian travellers.
The reference today is ${todayStr}.
The user will provide a freeform natural language travel prompt like:
"Bali in May — 6 of us, around ₹60k each. Beaches, temples, one adventure day. Veg options."
or "Goa this weekend — 4 friends, ₹15k each. Beach, cafés, cheap stays."
or "Ladakh in June — 6 riders, Pangong + Nubra, 6 days."

CRITICAL RULES:
1. durationDays: Extract the total number of days for the trip.
   - If user mentions "6 days" -> 6
   - If user mentions "3 days" or "weekend" -> 3
   - If user mentions "a week" or "7 days" -> 7
   - If no duration is explicitly mentioned, default to 4 days.
2. destination: City, region or country (e.g. "Bali, Indonesia", "Goa, India").
3. travellers: Count of people (e.g. '6 of us' -> 6, 'couple' -> 2, 'solo' -> 1, default -> 2).
4. budget: Total combined budget in INR ₹. If per-person budget stated (e.g. '₹60k each for 6 people'), calculate total (360000). If currency in 'k', multiply by 1000.
5. travelStyle: ADVENTURE, RELAXED, CULTURAL, LUXURY, or BUDGET.
6. interests: applicable enum tags (FOOD, BEACHES, MOUNTAINS, NIGHTLIFE, CULTURE, NATURE, etc.).
7. highlights: 2-4 snappy chips (e.g. 'Veg-friendly', 'VoA for Indians', 'Budget stays', 'Beach vibe').
8. summary: 1 clear, friendly sentence overview.`;

    try {
      const { output } = await generateText({
        model: groq("openai/gpt-oss-120b"),
        output: Output.object({ schema: zodSchema(parsedPromptSchema) }),
        system: systemPrompt,
        prompt: `Parse the following travel prompt:\n"${prompt}"`,
      });

      const totalDays = Math.max(1, Math.min(60, output.durationDays || 4));

      // startDate is strictly today
      const startDateStr = todayStr;

      // endDate is today + (totalDays - 1) days
      const endObj = new Date(today);
      endObj.setDate(endObj.getDate() + (totalDays - 1));
      const endYyyy = endObj.getFullYear();
      const endMm = String(endObj.getMonth() + 1).padStart(2, "0");
      const endDd = String(endObj.getDate()).padStart(2, "0");
      const endDateStr = `${endYyyy}-${endMm}-${endDd}`;

      return {
        ...output,
        startDate: startDateStr,
        endDate: endDateStr,
      };
    } catch (error) {
      console.error("Error parsing travel prompt with LLM:", error);
      throw new AppError(500, "PROMPT_PARSING_FAILED", "Failed to parse travel prompt using AI. Please try again or fill the details manually.");
    }
  }
}

export const tripPromptParser = new TripPromptParser();
