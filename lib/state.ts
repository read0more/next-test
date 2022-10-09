import { NextApiRequest, NextApiResponse } from 'next';
import { generators } from 'openid-client';
import { fromBase64, toBase64 } from './encoding';

export const STATE_COOKIE = 'state';

export interface IState {
  backToPath: string;
  bytes: string;
}

export function serializeAuthState(state: Partial<IState>): string {
  // probably you would base64 encode this
  return toBase64({
    ...state,
    bytes: generators.state(),
  });
}

export function deserializeAuthState(value: string): IState {
  return fromBase64(value);
}

export function setAuthStateCookie(res: NextApiResponse, state: string): void {
  res.setHeader(
    'set-cookie',
    `state=${state}; path=/; samesite=false; httponly; Max-Age${
      15 * 60 * 1000
    };`
  );
}

export function getAuthStateCookie(req: NextApiRequest): string {
  return req.cookies[STATE_COOKIE] ?? '';
}
