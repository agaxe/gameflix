import {Footer} from './index';
import { withKnobs } from '@storybook/addon-knobs';

export default {
	title: 'component/organisms/Footer',
	component: Footer,
	decorators: [withKnobs],
	parameters: {
		componentSubtitle: 'footer 컴포넌트',
	}
};

export function footer() {
	return (
		<Footer />
	)
}

footer.story = {
	name: 'Default'
}