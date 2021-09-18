import { productionBlocker } from './productionBlocker';

const handlerMock = jest.fn();

const resMock: any = (() => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
})();

beforeEach(() => {
  delete process.env.LOCAL;
  delete process.env.NODE_ENV;
  jest.clearAllMocks();
});

const allowExpect = () => {
  expect(handlerMock).toBeCalled();
  expect(resMock.status).not.toBeCalled();
  expect(resMock.json).not.toBeCalled();
};

const notAllowExpect = () => {
  expect(handlerMock).not.toBeCalled();
  expect(resMock.status).toBeCalledWith(403);
  expect(resMock.json).toBeCalled();
};

test.each([['POST'], ['PUT'], ['DELETE']])(
  'should not allow method is not GET',
  async (method) => {
    await productionBlocker(handlerMock)({ method } as any, resMock);
    notAllowExpect();
  },
);

test.each([
  ['GET', 'true', 'production', allowExpect],
  ['GET', 'true', 'development', allowExpect],
  ['GET', 'false', 'production', allowExpect],
  ['GET', 'false', 'development', allowExpect],
  ['GET', '', 'production', allowExpect],
  ['GET', '', 'development', allowExpect],
  ['PUT', 'true', 'production', allowExpect],
  ['PUT', 'true', 'development', allowExpect],
  ['PUT', 'false', 'production', notAllowExpect],
  ['PUT', 'false', 'development', allowExpect],
  ['PUT', '', 'production', notAllowExpect],
  ['PUT', '', 'development', allowExpect],
])(
  'when method is %s, should allow if LOCAL=%s and NODE_ENV=%s',
  async (method, local, nodeEnv, expectFn) => {
    process.env.LOCAL = local;
    process.env.NODE_ENV = nodeEnv;
    await productionBlocker(handlerMock)({ method } as any, resMock);
    expectFn();
  },
);
