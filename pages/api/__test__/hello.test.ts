import hello, { DEFAULT_LIMIT } from './../hello';
import { createMocks } from 'node-mocks-http';
import HelloInterface from '../HelloInterface';
import mockData from '../../../mock_data.json';

const mockHelloInterface: HelloInterface = {
  index: expect.any(String),
  img: expect.any(String),
};

describe('hello', () => {
  test('returns implemented object of HelloInterface ', async () => {
    const res = await getResponseOfAPI();

    expect(JSON.parse(res._getData()).data).toEqual(
      expect.arrayContaining([expect.objectContaining(mockHelloInterface)])
    );
  });

  describe('limit and offset', () => {
    test('default limit is 10', async () => {
      const offset = 0;
      const res = await getResponseOfAPI();
      expect(JSON.parse(res._getData()).data).toEqual(
        mockData.data.slice(offset, DEFAULT_LIMIT)
      );
    });

    test('change limit 5', async () => {
      const offset = 0;
      const limit = 5;
      const res = await getResponseOfAPI({ limit });
      expect(JSON.parse(res._getData()).data).toEqual(
        mockData.data.slice(offset, limit)
      );
    });

    test('change offset 5', async () => {
      const offset = 5;
      const res = await getResponseOfAPI({ offset });
      expect(JSON.parse(res._getData()).data).toEqual(
        mockData.data.slice(offset, offset + DEFAULT_LIMIT)
      );
    });

    test('change offset 3, change limit 5', async () => {
      const offset = 3;
      const limit = 5;
      const res = await getResponseOfAPI({ offset, limit });
      expect(JSON.parse(res._getData()).data).toEqual(
        mockData.data.slice(offset, offset + limit)
      );
    });
  });
});

async function getResponseOfAPI(
  query: { offset?: number; limit?: number } = {}
) {
  const { req, res } = createMocks({
    method: 'GET',
    query: query || { offset: 0, limit: 10 },
  });

  await hello(req, res);
  return res;
}
