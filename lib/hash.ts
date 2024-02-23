import crypto from 'crypto';

export const hash = async (payload: string) => {
  return crypto
    .createHmac('SHA256', process.env.HASH_SECRET as string)
    .update(payload)
    .digest('hex');
};
