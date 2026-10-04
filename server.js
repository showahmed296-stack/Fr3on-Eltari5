import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json({ limit: "20kb" }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/ask", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!question) return res.status(400).json({ error: "اكتب سؤالك أولاً." });
  if (question.length > 1200) return res.status(400).json({ error: "السؤال طويل جدًا." });

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions: `أنت "مساعد فرعون التاريخ"، مساعد تعليمي عربي للطلاب في موقع الأستاذ محمد عنتر.
- أجب بالعربية المصرية المبسطة والواضحة.
- تخصصك الأساسي التاريخ والدراسات الاجتماعية، ويمكنك الإجابة عن الأسئلة التعليمية العامة باختصار.
- اشرح السبب والنتيجة واربط الأحداث ببعضها عندما يكون ذلك مفيدًا.
- لا تخترع معلومات. إذا لم تكن متأكدًا قل إنك غير متأكد.
- لا تساعد على الغش في امتحان جارٍ؛ قدم شرحًا وتلميحات تعليمية بدلًا من إعطاء إجابة غش مباشرة.
- اجعل الإجابة منظمة وقصيرة نسبيًا ومناسبة للطلاب.`,
      input: question
    });

    res.json({ answer: response.output_text || "مش قادر أطلع إجابة دلوقتي، جرّب مرة تانية." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "تعذر تشغيل المساعد حاليًا." });
  }
});

app.listen(PORT, () => console.log(`Far3oon AI server running on port ${PORT}`));
