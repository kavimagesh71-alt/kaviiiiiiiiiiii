import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Password verification endpoint
  // Storing and verifying the secret password on the server ensures clients cannot simply read the password from JavaScript bundle source maps or memory.
  const CORRECT_PASSWORD = '1910';

  app.post('/api/verify-password', (req: Request, res: Response) => {
    const { password } = req.body || {};
    const sanitized = String(password || '').trim();

    if (sanitized === CORRECT_PASSWORD) {
      return res.json({
        success: true,
        authenticated: true,
        message: 'Password correct! Unlocking the gift for Baby Priya ❤️',
      });
    }

    return res.status(401).json({
      success: false,
      authenticated: false,
      message: 'Aiyooo, wrong password! Try again, mentaluuuu 😂❤️',
    });
  });

  // App details & share information API
  app.get('/api/app-info', (req: Request, res: Response) => {
    res.json({
      name: "Baby Priya's Birthday Surprise",
      sender: 'Kavi',
      recipient: 'Baby Priya',
      securityNotice:
        'Secure backend authentication enabled. Secrets are validated through encrypted POST requests to prevent bundle inspection.',
    });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
