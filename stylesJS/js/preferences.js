function loadData() {
    fetch('./JPNChars/HIRAGANA.json') // Replace 'data.json' with your JSON file or API endpoint
        .then(response => response.json())
        .then(data => {
            data.forEach(row => {
                console.log(row["hiragana"])
                const div = document.createElement("div");
                div.id = row["romaji"];
                div.className = row["romaji"];
                const checkboxe = document.createElement("input")
                checkboxe.type = "checkbox";
                checkboxe.id = row["romaji"] + "id";
                checkboxe.class = row["romaji"] + "id";
                checkboxe.checked = true;
                const label = document.createElement("label")
                label.for = row["romaji"] + "id";
                label.innerText = row["hiragana"]
                

                div.appendChild(checkboxe)
                div.appendChild(label)
                document.getElementById("checkboxes").appendChild(div); 
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
loadData()