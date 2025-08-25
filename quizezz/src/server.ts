import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express, { Express, json } from 'express';
import { join } from 'path';
import { fileURLToPath } from 'node:url';

import bootstrap from './main.server';

export function app(): Express {
  const app: Express = express();
  app.use(json());

  const QUIZ = {
    id: 'edh-mini',
    title: 'EDH Mini Quiz',
    settings: { timePerQuestion: 15 },
    questions: [
      {
        id: 'q1',
        text: 'Among the following propositions, which one best describes the objective of EDH?',
        options: [
          {
            id: 'o1',
            text: 'A marketing platform for promoting schools.',
            correct: false,
          },
          {
            id: 'o2',
            text: 'A school management tool for schools in the EDH group.',
            correct: true,
          },
          {
            id: 'o3',
            text: 'A website for finding work after studies.',
            correct: false,
          },
          { id: 'o4', text: 'A virtual library for students.', correct: false },
        ],
      },
      {
        id: 'q2',
        text: 'Who primarily uses the EDH Staging version?',
        options: [
          { id: 'o1', text: 'The QA testing team', correct: true },
          { id: 'o2', text: 'Parents only', correct: false },
          { id: 'o3', text: 'Alumni only', correct: false },
          { id: 'o4', text: 'Vendors', correct: false },
        ],
      },
      {
        id: 'q3',
        text: '2 + 2 = ?',
        options: [
          { id: 'o1', text: '3', correct: false },
          { id: 'o2', text: '4', correct: true },
          { id: 'o3', text: '5', correct: false },
          { id: 'o4', text: '22', correct: false },
        ],
      },
    ],
  };

  const scoreboard: Array<{ name: string; score: number; when: number }> = [];

  app.get('/api/quiz', (_req, res) => {
    return res.json(QUIZ);
  });

  app.post('/api/score', (req, res) => {
    const { name, score } = (req.body ?? {}) as {
      name?: string;
      score?: number;
    };

    if (!name || typeof score !== 'number') {
      return res.status(400).json({ ok: false, message: 'Invalid payload' });
    }

    scoreboard.push({ name, score, when: Date.now() });
    scoreboard.sort((a, b) => b.score - a.score);

    return res.json({ ok: true, top: scoreboard.slice(0, 20) });
  });

  app.get('/api/scoreboard', (_req, res) => {
    return res.json({ top: scoreboard.slice(0, 20) });
  });

  const distFolder = join(process.cwd(), 'dist', 'quizezz', 'browser');
  const documentPath = join(distFolder, 'index.html');
  const commonEngine = new CommonEngine();

  app.get('*.*', express.static(distFolder, { maxAge: '1y' }));

  app.get('*', (req, res, next) => {
    commonEngine
      .render({
        bootstrap,
        documentFilePath: documentPath,
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      })
      .then((html) => res.send(html))
      .catch(next);
  });

  return app;
}

export function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`SSR listening on http://localhost:${port}`);
  });
}

const isDirectRun = (() => {
  try {
    const current = fileURLToPath(import.meta.url);
    const entry = process.argv[1]
      ? fileURLToPath(new URL(`file://${process.argv[1]}`).href)
      : '';
    return current === entry;
  } catch {
    return false;
  }
})();

if (isDirectRun) {
  run();
}

export default app;
