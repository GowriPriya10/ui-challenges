import '../styles.css';
import Calculator from './calculator';

const wrapper = document.getElementById('wrapper')
const input = document.getElementById('input');
const clear = document.getElementById('clear');
const toggleSign = document.getElementById('toggle-sign');

const calculator = new Calculator(input, clear, toggleSign);
calculator.addFunctionality(wrapper);
