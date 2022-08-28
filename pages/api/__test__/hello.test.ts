// __tests__/animal.test.js
// 🚨 Remember to keep your `*.test.js` files out of your `/pages` directory!
import { createMocks } from 'node-mocks-http';
import hello from '../hello';

describe('hello', () => {
  test('returns imgs', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await hello(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ img: expect.any(String) }),
      ])
    );
  });
});
