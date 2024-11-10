let MAINDATA = null
        
function getData() {
    return fetch('./JPNChars/HIRAGANA.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Propagate the error further if needed
        });
}

async function processData() {
    try {
        const data = await getData();
        return data; // Return the fetched data
    } catch (error) {
        // Handle errors here
        console.error('Error getting data:', error);
        throw error; // Propagate the error further if needed
    }
}
async function fetchAndProcessData() {
    try {
        const jsonData = await processData();
        // Process or use the JSON data as needed here
        return jsonData; // Return the processed data if needed further
    } catch (error) {
        // Handle errors here
        console.error('Error fetching or processing data:', error);
        throw error; // Propagate the error further if needed
    }
}


async function __init__() {
    var pref = JSON.parse(localStorage.preferences || '{"type":"all"}') || {};
    MAINDATA = await fetchAndProcessData();
    console.log(MAINDATA[100]["romaji"])
    /*if(pref["type"] == "exception")
    */
    
    document.getElementById("questiontext").innerText = MAINDATA[0]["romaji"]
    document.getElementById("answertext").innerText = MAINDATA[0]["hiragana"]
}
function is_question_state() {
    return document.getElementById("questiondiv").style.display == "" ? true : false
}

//ERROR
document.addEventListener("click", (event) => {
    if (is_question_state() == true) {
        // nothing to change

        // changing state to answer
        document.getElementById("questiondiv").style.display = "None"
        document.getElementById("answerdiv").style.display = ""
    } else if(is_question_state() == false) {
        // insert new questions
        let new_answer = "ERROR 409"
        let new_question = "ERROR 409" 
        let number = Math.floor(Math.random() * MAINDATA.length);
        new_question = MAINDATA[number]["romaji"]
        new_answer = MAINDATA[number]["hiragana"]
        document.getElementById("answertext").innerText = new_answer
        document.getElementById("questiontext").innerText = new_question
        //changing state, back to questions
        document.getElementById("answerdiv").style.display = "None"
        document.getElementById("questiondiv").style.display = ""
    }
});

__init__()
