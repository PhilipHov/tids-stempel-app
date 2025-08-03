import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function getChatResponse(message: string, context?: string): Promise<string> {
  // If no OpenAI API key is available, return a fallback response
  if (!openai) {
    return "AI chat funktionalitet er ikke tilgængelig uden API nøgle. Kontakt administrator for at aktivere denne funktion.";
  }
  try {
    const systemPrompt = `Du er en hjælpsom AI assistent for en dansk arbejdstidsapp. Du hjælper brugere med:
- Spørgsmål om arbejdstid og timeregistrering
- Arbejdspladsrelaterede råd
- Generelle spørgsmål om arbejde
- Support til appen

Svar altid på dansk og vær venlig og professionel. Hold svarene korte og relevante.
${context ? `\n\nKontekst: ${context}` : ''}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    return response.choices[0].message.content || "Beklager, jeg kunne ikke behandle dit spørgsmål.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Der opstod en fejl. Prøv igen senere.";
  }
}