import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { VAR_COLOR } from '@/static/styles/variable';

const { COLOR_PRIMARY, COLOR_LINE_GRAY } = VAR_COLOR;

const thumbSize = 17;
const trackHeight = 7;
const trackRadius = 5;
const halfSize = thumbSize / 2;

export const CustomSlider = withStyles({
  root: {
    color: COLOR_PRIMARY,
    height: trackHeight
  },
  thumb: {
    height: thumbSize,
    width: thumbSize,
    backgroundColor: 'currentColor',
    marginTop: -5,
    marginLeft: -halfSize,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  track: {
    height: trackHeight,
    borderRadius: trackRadius
  },
  rail: {
    height: trackHeight,
    borderRadius: trackRadius,
    background: COLOR_LINE_GRAY
  }
})(Slider);
