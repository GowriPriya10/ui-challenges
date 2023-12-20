import Operations from "./calc";

export default class Calculator {
    constructor(input, clearBtn, toggleSign) {
        this.input1 = null;
        this.input2 = null;
        this.currentOperation = null;
        this.isSecondInput = false;
        this.currentInput = input;

        this.clearBtn = clearBtn;
        this.toggleSignNode = toggleSign;
    }

    addFunctionality(wrapper) {
        this.clear();
        this.toggleSign();
        this.wrapperFunctionality(wrapper);
    }

    clear() {
        this.clearBtn.addEventListener('click', (e) => {
            if(e.target.textContent === 'C') {
                this.input1 = null;
                this.input2 = null;
                this.isSecondInput = false;
                this.currentInput.value = null;
                this.currentOperation = null;
                this.clearBtn.innerText = 'AC';
            }
        })
    }

    toggleSign() {
        this.toggleSignNode.addEventListener('click', (e) => {
            this.input1 = -parseFloat(this.input1);
            this.currentInput.value = this.input1;
        })
    }

    wrapperFunctionality(wrapper) {
        wrapper.addEventListener('click', (e) => {
            /**
             * 1. Check if click is on button or not
             * 2. If button, check if class is num or op
             * 3. If num, add to current input
             * 4. If op, perform applicable op and populate result
             */
            if(e.target.nodeName === 'BUTTON'){
                if(e.target.className === 'num' || e.target.className === 'op'){
                    if(!e.target.dataset.action){
                        this.currentInput.value += e.target.textContent;
                        this.isSecondInput ? this.input2 = this.currentInput.value : this.input1 = this.currentInput.value;
                    }else {
                        this.performOperation(e.target.dataset.action);
                    }
                }
            }
            
            // Change text of clear button to 'C' if current input is defined
            if(this.currentInput.value && this.clearBtn.innerText === 'AC') {
                this.clearBtn.innerText = 'C';
            }
        })
        
    }

    performOperation(action){
        if(this.input1) {
            if(action === '='){
                if(!this.input2 && this.isSecondInput)
                    this.input2 = this.input1;

                const result = Operations[this.currentOperation](parseFloat(this.input1), parseFloat(this.input2));
                this.currentInput.value = result;
                this.input1 = result;
            }else {
                this.currentOperation = action;
                this.currentInput.value = null;
                this.isSecondInput = true;
            }
        }else{
            alert('Input something to perform a calculation!!')
        }
    }
}