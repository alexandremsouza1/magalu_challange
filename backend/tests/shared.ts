import fs from 'fs';

export const setToken = (newToken: string) => {
  fs.writeFileSync('token.txt', newToken);
};

export const getToken = () => {
  return fs.readFileSync('token.txt', 'utf8').trim();
};
