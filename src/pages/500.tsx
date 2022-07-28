import { ErrorComposition } from 'compositions/error';

const InternalError = () => (
  <ErrorComposition statusCode={500} message='Internal Server Error' />
);

export default InternalError;
