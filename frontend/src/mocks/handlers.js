import { rest } from 'msw';
import { postsSampleData } from './dataSamples';

export const handlers = [
  // Intercept "GET http://localhost:3000/api/posts/" requests...
  rest.get('http://localhost:3000/api/posts/', (req, res, ctx) => {
    // ...and respond to them using this JSON response.
    return res(
      ctx.status(200),
      ctx.json(postsSampleData)
    );
  }),
];
