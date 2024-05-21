
const calculate = document.getElementById('calculate');
const result_container = document.getElementById('result_container');
const result = document.getElementById('result');

calculate.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    const obj = {
        name : name,
        age : age,
        gender : gender,
        height : height,
        weight : weight
    }

    add(obj);
});

async function add(obj) {
    try{
        let response = await fetch('/bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
            // throw new Error(`HTTP error! status: ${response.status}`);
        }
        response = await response.json();
        result.innerHTML = response.bmi;
        result_container.removeAttribute('hidden');    
    }
    catch(err){
        console.log('There has been a problem with your fetch operation: ', err);
    }
}