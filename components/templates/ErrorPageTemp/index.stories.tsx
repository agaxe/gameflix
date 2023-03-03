import { number, withKnobs } from '@storybook/addon-knobs';
import ErrorPageTemp from './index';

export default {
  title: 'component/templates/ErrorPageTemp',
  component: ErrorPageTemp,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '에러 페이지 템플릿 컴포넌트'
  }
};

export function errorPageTemp() {
  const statusCode = number('statusCode', 404);

  return (
    <div style={{ height: '300px' }}>
      <ErrorPageTemp statusCode={statusCode} />
    </div>
  );
}

errorPageTemp.story = {
  name: 'Default'
};
