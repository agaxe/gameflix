import { ErrorPageTemp } from '@/components/templates/ErrorPageTemp';

function Error({ statusCode }) {
  return <ErrorPageTemp statusCode={statusCode} />;
}

// * getInitialProps
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
