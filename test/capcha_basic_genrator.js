function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
};

const Canvas = require('canvas');
const Char_array = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const Char_length = Char_array.length;
const canvasW = 150; // rộng
const canvasH = 30; // cao
const canvas = Canvas.createCanvas(canvasW, canvasH);
const context = canvas.getContext('2d');
// Background
context.beginPath();
context.rect(0, 0, canvasW, canvasH);
context.fillStyle = '#000000'; // background màu đen
context.fill();
context.closePath();
// End background
const captchaLength = 6; // Best, max: 7 (độ dài captcha)
const stringNumber = 6; // số đường kẻ
const dotCount = 30; // số chấm nhiễu
const result = []; // array chứa kết quả captcha (dạng ['a', 'b', 'c' ])
for (let i = 0; i < captchaLength; i++) {
	const sIndex = Math.floor(Math.random() * Char_length);
	const sDeg = (Math.random() * 30 * Math.PI) / 180;
	const cTxt = Char_array[sIndex];
	result[i] = cTxt.toLowerCase();
	const x = 10 + i * 20;
	const y = 20 + Math.random() * 8;
	context.font = 'bold 23px noto'; // Font family custom
	context.translate(x, y);
	context.rotate(sDeg);
	context.fillStyle = randomColor();
	context.fillText(cTxt, 0, 0);
	context.rotate(-sDeg);
	context.translate(-x, -y);
}
for (let i = 0; i < stringNumber; i++) {
	context.strokeStyle = randomColor();
	context.beginPath();
	context.moveTo(Math.random() * canvasW, Math.random() * canvasH);
	context.lineTo(Math.random() * canvasW, Math.random() * canvasH);
	context.stroke();
}
for (let i = 0; i < dotCount; i++) {
	context.strokeStyle = randomColor();
	context.beginPath();
	const x = Math.random() * canvasW;
	const y = Math.random() * canvasH;
	context.moveTo(x, y);
	context.lineTo(x + 1, y + 1);
	context.stroke();
}

console.log({
	buffer: canvas.toBuffer(),
	base64PNG: canvas.toDataURL(),
	text: result.join(''),
});