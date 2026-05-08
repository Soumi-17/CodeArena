import axios from "axios";

export const generateQuestionsFromClaude = async ({
  domain,
  difficulty,
  type,
  count,
}) => {

  const prompt = `
Generate ${count} ${difficulty} level ${domain} ${type} questions.

Rules:
- Return ONLY valid JSON
- No markdown
- No explanation
- Each question must be unique

Format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": ""
  }
]
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};