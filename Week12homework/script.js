

let isStartPage = document.getElementById("q1");

if (isStartPage != undefined){
    localStorage.clear();
}
let q1 = document.getElementById("q1");

if (q1 != undefined){
    q1.addEventListener("change", () => {
        let q1_radios = document.getElementsByName("q1");
        for(let i = 0; i < q1_radios.length; i++){
            if(q1_radios[i].checked){
                localStorage.setItem("q1", q1_radios[i].value);
            }
        }
    });
}




let q2 = document.getElementById("q2");

if (q2 != undefined){
    q2.addEventListener("change", () => {
        let q2_radios = document.getElementsByName("q2");
        for(let i = 0; i < q2_radios.length; i++){
            if(q2_radios[i].checked){
                localStorage.setItem("q2", q2_radios[i].value);
            }
        }
    });
}


let q3 = document.getElementById("q3");

if (q3 != undefined){
    q3.addEventListener("change", () => {
        let q3_radios = document.getElementsByName("q3");
        for(let i = 0; i < q3_radios.length; i++){
            if(q3_radios[i].checked){
                localStorage.setItem("q3", q3_radios[i].value);
            }
        }
    });
}




let q4 = document.getElementById("q4");

if (q4 != undefined){
    q4.addEventListener("change", () => {
        let q4_radios = document.getElementsByName("q4");
        for(let i = 0; i < q4_radios.length; i++){
            if(q4_radios[i].checked){
                localStorage.setItem("q4", q4_radios[i].value);
            }
        }
    });
}



let q5 = document.getElementById("q5");

if (q5 != undefined){
    q5.addEventListener("change", () => {
        let q5_radios = document.getElementsByName("q5");
        for(let i = 0; i < q5_radios.length; i++){
            if(q5_radios[i].checked){
                localStorage.setItem("q5", q5_radios[i].value);
            }
        }
    });
}


let q6 = document.getElementById("q6");

if (q6 != undefined){
    q6.addEventListener("change", () => {
        let q6_radios = document.getElementsByName("q6");
        for(let i = 0; i < q6_radios.length; i++){
            if(q6_radios[i].checked){
                localStorage.setItem("q6", q6_radios[i].value);
            }
        }
    });
}



let q7 = document.getElementById("q7");

if (q7 != undefined){
    q7.addEventListener("change", () => {
        let q7_radios = document.getElementsByName("q7");
        for(let i = 0; i < q7_radios.length; i++){
            if(q7_radios[i].checked){
                localStorage.setItem("q7", q7_radios[i].value);
            }
        }
    });
}




let q8 = document.getElementById("q8");

if (q8 != undefined){
    q8.addEventListener("change", () => {
        let q8_radios = document.getElementsByName("q8");
        for(let i = 0; i < q8_radios.length; i++){
            if(q8_radios[i].checked){
                localStorage.setItem("q8", q8_radios[i].value);
            }
        }
    });
}



let q9 = document.getElementById("q9");

if (q9 != undefined){
    q9.addEventListener("change", () => {
        let q9_radios = document.getElementsByName("q9");
        for(let i = 0; i < q9_radios.length; i++){
            if(q9_radios[i].checked){
                localStorage.setItem("q9", q9_radios[i].value);
            }
        }
    });
}


let q10_input = document.getElementById("q10_input");

if (q10_input != undefined){
    q10_input.addEventListener("input", () => {

        let money = parseInt(q10_input.value);
        let score = 0;

        if (isNaN(money) || money <= 0){
            return;
        }

        if (money >= 1 && money <= 200){
            score = 1;
        } 
        else if (money <= 400){
            score = 2;
        } 
        else if (money <= 1000){
            score = 3;
        } 
        else {
            score = 4;
        }

        localStorage.setItem("q10", score);
    });
}



let results = document.getElementById("results");

if (results != undefined){

    let q1 = parseInt(localStorage.getItem("q1"));
    let q2 = parseInt(localStorage.getItem("q2"));
    let q3 = parseInt(localStorage.getItem("q3"));
    let q4 = parseInt(localStorage.getItem("q4"));
    let q5 = parseInt(localStorage.getItem("q5"));
    let q6 = parseInt(localStorage.getItem("q6"));
    let q7 = parseInt(localStorage.getItem("q7"));
    let q8 = parseInt(localStorage.getItem("q8"));
    let q9 = parseInt(localStorage.getItem("q9"));
    let q10 = parseInt(localStorage.getItem("q10"));

    let points = 0;

    points += q1 || 0;
    points += q2 || 0;
    points += q3 || 0;
    points += q4 || 0;
    points += q5 || 0;
    points += q6 || 0;
    points += q7 || 0;
    points += q8 || 0;
    points += q9 || 0;
    points += q10 || 0;

    let percent = Math.round((points / 40) * 100);

    results.innerHTML = `Results: ${points} / 40<br>Your idol influence level: ${percent}%`;

    let resultText = document.getElementById("resultText");

    if (points <= 15){

        resultText.innerHTML = `
        <h3>Casual Listener</h3>
        <p>You enjoy K-pop, but it doesn’t control your life. Your idol influences you a little, but you stay independent.</p>

        <p><strong>You are:</strong><br>
        Chill, curious, and low-pressure.</p>

        <p><strong>Try this:</strong><br>
        - Make a playlist<br>
        - Watch performances casually<br>
        - Explore new groups</p>
        `;

    } 
    else if (points <= 25){

        resultText.innerHTML = `
        <h3>Engaged Fan</h3>
        <p>Your idol affects your mood and habits. You actively follow content and enjoy fandom culture.</p>

        <p><strong>You are:</strong><br>
        Active and emotionally connected.</p>

        <p><strong>Try this:</strong><br>
        - Join fan chats<br>
        - Rank your favorite eras<br>
        - Go to fan events</p>
        `;

    } 
    else if (points <= 35){

        resultText.innerHTML = `
        <h3>Emotionally Invested Fan 💖</h3>
        <p>Your idol strongly impacts your emotions, identity, and daily routine.</p>

        <p><strong>You are:</strong><br>
        Passionate and deeply connected.</p>

        <p><strong>Try this:</strong><br>
        - Make fan edits or art<br>
        - Reflect on your fandom habits<br>
        - Set a merch budget</p>
        `;

    } 
    else {

        resultText.innerHTML = `
        <h3>High-Impact Stan</h3>
        <p>Your idol plays a major role in your life — emotionally, socially, and financially.</p>

        <p><strong>You are:</strong><br>
        Loyal, intense, and all-in.</p>

        <p><strong>Try this:</strong><br>
        - Start a fan page<br>
        - Organize your collection<br>
        - Take a healthy break day</p>

        <p><strong>Reminder:</strong><br>
        Love your idol, but take care of your time, money, and emotions too 💡</p>
        `;
    }
}