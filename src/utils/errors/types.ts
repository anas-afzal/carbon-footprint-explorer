export type UnexpectedError = {
  name: 'UnexpectedError';
  message?: string;
};

export type ParseError = {
  name: 'ParseError';
  message?: string;
};

export type HttpError = {
  name: 'HttpError';
  message?: string;
};
