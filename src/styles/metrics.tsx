import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');
// import Device from 'react-native-device-info';

// const isTablet = Device.isTablet();

//Guideline sizes are based on standard ~iphone14" screen mobile device
const guidelineBaseWidth = width < height ? 428 : 926;
const guidelineBaseHeight = width < height ? 926 : 428;

const aspectRatio = width / height;
const aspectCompare = aspectRatio / 2.1635514;


if (aspectCompare > 1) {
  const widthNew = height * width < height ? 0.46220302 : 2.1635514;
  const aspect = widthNew / width < height ? 428 : 926;

  var scale1 = (size: number) => aspect * size;
  //   console.log('scale11111');
} else {

  var scale1 = (size: number) => (width / guidelineBaseWidth) * size;
  //   console.log('scale22222');
}

const scale = scale1;
//const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
