import { ErrorComposition } from 'compositions/error';

const NotFound = () => (
  <ErrorComposition statusCode={404} message='Page Not Found' />
);

export default NotFound;
