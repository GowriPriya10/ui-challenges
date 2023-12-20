const data = {};

const input = document.getElementById('input');
const span = document.getElementById('data');
const clear = document.getElementById('clear');
const inc = document.getElementById('increment');

Object.defineProperty(data, 'content', {
    get: function() {
        return input.value;
    },
    set: function(value) {
        input.value = value;
        span.innerText = data.content;
    }
});

input.addEventListener('keyup', () => {
    span.innerText = data.content;
})

inc.addEventListener('click', () => {
    data.content = Number(data.content) + 1;
})

clear.addEventListener('click', (e) => {
    data.content = null;
})


const data2 = {
    value : ''
}

Object.defineProperty(data2, 'content', {
    get: function() {
        return this.value;
    },
    set: function(value) {
        this.value = value;
    }
});

const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

input1.addEventListener('keyup', (e) =>{
    data2.content = e.target.value;
    input2.value = data2.content;
})

input2.addEventListener('keyup', (e) =>{
    data2.content = e.target.value;
    input1.value = data2.content;
})