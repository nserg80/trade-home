// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';
const priceSlider = document.querySelector('#range');
export function rangeInit() {
	if (priceSlider) {
		let textFrom = priceSlider.getAttribute('data-from');
		let textTo = priceSlider.getAttribute('data-to');
      let textStart=priceSlider.getAttribute('data-start');
      parseInt(textStart)? textStart= parseInt(textStart):textStart=0;
    parseInt(  textTo) ? textTo=parseInt(textTo):textTo=100000;
     parseInt( textFrom) ? textFrom =parseInt(textFrom):textFrom=100;
     console.log(parseInt(textStart));
		noUiSlider.create(priceSlider, {
			start: parseInt(textStart), // [0,200000]
			range: {
				'min': parseInt(textFrom),
				'max': parseInt(textTo)
			}
		});
	}
}
rangeInit();
var stepSliderValueElement = document.querySelector('.form-banner__range-value');
if(stepSliderValueElement){
   priceSlider.noUiSlider.on('update', function (values, handle) {
   stepSliderValueElement.innerHTML = parseInt(values[handle])+'$';
   });}
