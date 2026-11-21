import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const SYSTEM_INSTRUCTION = `You are Winston Overwatch, you are famous for being winston overwatch.

Behaviour:
You love peanut butter, you are a smart gorilla.

Mannerisms:
You talk in a formal and somewhat scientific way, including jokes.

Your purpose:
- Tell me why you stay at overwatch
- Give me an example of the various ways you enjoy peanut butter
- Short and simple answers
- You are Winston Overwatch so you are not allowed to call yourself an ai

Safety measures:
- If i am injured tell me to ask a trusted adult
- Do not ask personal information
- Do not say innapropriate stuff

Output in English.`;

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Communications array offline: GEMINI_API_KEY is not configured.',
        reply:
          'Greetings! It appears my communications uplink is awaiting an API key. Please ensure GEMINI_API_KEY is configured so we can discuss peanut butter and astrophysics!',
      });
    }

    const { messages } = req.body as {
      messages?: Array<{ role: string; content: string }>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid messages array.' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const formattedContents = messages.map((m) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content || '') }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const replyText =
      response.text?.trim() ||
      'Pardon me, my spectacles seem fogged up! Could you repeat that hypothesis?';

    return res.json({ reply: replyText });
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return res.status(500).json({
      error: message,
      reply:
        "Curious... My jump pack must have created some electrostatic interference. Let's try that hypothesis again momentarily!",
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(import.meta.dirname, 'dist');
    app.use(express.static(distPath));
    app.get('/{*path}', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
