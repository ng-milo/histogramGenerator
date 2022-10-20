var fileTruth = false;
var arr = Array();
var sortedArr = Array();
var countArr = Array();
var highName = "";
var highest = 0;
var lowName = "";
var lowest = 0;
var average = 0;
var median = 0;
var denominator = 0;

function arraySorting(){
    var tmp = 0;
    for (var i = 1; i<arr.length; i++){
        tmp = parseFloat(arr[i][1]);
        sortedArr.push(tmp);
    }
    sortedArr.sort(function(a, b){return a-b});
}

function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
    let text = event.target.result;
    let lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(",");
        arr.push(line);
    }
    // Check if CSV content is valid
    let tmpChecking = true;
    for (var i = 1; i<arr.length; i++){
        if (parseFloat(arr[i][1]) === false || isNaN(parseFloat(arr[i][1]))){
            tmpChecking = false;
        }
    }
    if (tmpChecking == true){
        var tmp = 0;
        highName = arr[1][0];
        highest = parseFloat(arr[1][1]);
        lowName = arr[1][0];
        lowest = parseFloat(arr[1][1]);
        // Get the highest and lowest values
        for (var i = 1; i<arr.length; i++){
            tmp = parseFloat(arr[i][1]);
            if (tmp > highest){
                highest = tmp;
                highName = arr[i][0];
            }
            else if (tmp < lowest){
                lowest = tmp;
                lowName = arr[i][0];
            }
            average += tmp;
        }
        average = average / (arr.length-1);
        var tmpNum = arr.length+1;
        tmpNum = tmpNum / 2;
        // Sort the array for the median
        arraySorting();
        // Calculate the median
        if (sortedArr.length%2 == 0){
            median = (sortedArr[Math.floor(sortedArr.length/2)] + sortedArr[Math.floor(sortedArr.length/2)+1]) / 2;
        }
        else{
            median = sortedArr[Math.floor((sortedArr.length)/2)];
        }
        // Use DOM to change the statistics
        var tmpHigh = highName + " (" + highest.toFixed(2) + "%)";
        var tmpLow =  lowName + " (" + lowest.toFixed(2) + "%)";
        document.getElementById("highest").value = tmpHigh;
        document.getElementById("lowest").value = tmpLow;
        document.getElementById("mean").value = average.toFixed(2) + "%";
        document.getElementById("median").value = median.toFixed(2) + "%";
        
        document.getElementById("fileError").style.opacity = "0%";
        document.getElementById("statsArea").style.opacity = "100%";
        handleUserInput(fileTruth);
    }
    else{
        document.getElementById("fileError").style.opacity = "100%";
        document.getElementById("statsArea").style.opacity = "0%";
    }
}



function handleUserInput(trut){
    // Check if file has been uploaded
    if (trut == true) {
        // Get the input values and check for valid inputs
        if (document.getElementById("max").value && document.getElementById("a+").value && document.getElementById("a").value && document.getElementById("a-").value && document.getElementById("b+").value && document.getElementById("b").value && document.getElementById("b-").value && document.getElementById("c+").value && document.getElementById("c").value && document.getElementById("c-").value && document.getElementById("d").value && document.getElementById("f").value){
            if (parseFloat(document.getElementById("max").value) !== false && parseFloat(document.getElementById("a+").value) !== false && parseFloat(document.getElementById("a").value) !== false && parseFloat(document.getElementById("a-").value) !== false && parseFloat(document.getElementById("b+").value) !== false && parseFloat(document.getElementById("b").value) !== false && parseFloat(document.getElementById("b-").value) !== false && parseFloat(document.getElementById("c+").value) !== false && parseFloat(document.getElementById("c").value) !== false && parseFloat(document.getElementById("c-").value) !== false && parseFloat(document.getElementById("d").value) !== false && parseFloat(document.getElementById("f").value) !== false){
                var tmpArr = Array();
                tmpArr.push(parseFloat(document.getElementById("max").value));
                tmpArr.push(parseFloat(document.getElementById("a+").value));
                tmpArr.push(parseFloat(document.getElementById("a").value));
                tmpArr.push(parseFloat(document.getElementById("a-").value));
                tmpArr.push(parseFloat(document.getElementById("b+").value));
                tmpArr.push(parseFloat(document.getElementById("b").value));
                tmpArr.push(parseFloat(document.getElementById("b-").value));
                tmpArr.push(parseFloat(document.getElementById("c+").value));
                tmpArr.push(parseFloat(document.getElementById("c").value));
                tmpArr.push(parseFloat(document.getElementById("c-").value));
                tmpArr.push(parseFloat(document.getElementById("d").value));
                tmpArr.push(parseFloat(document.getElementById("f").value));
                // Check if the values are in the correct order
                var constinuer = true;
                for (var i = 1; i<tmpArr.length-1; i++){
                    if (tmpArr[i] <= tmpArr[i+1]){
                        constinuer = false;
                    }
                }
                if (constinuer == true){
                    var max = parseFloat(document.getElementById("max").value);
                    var aplus = parseFloat(document.getElementById("a+").value);
                    var a = parseFloat(document.getElementById("a").value);
                    var aminus = parseFloat(document.getElementById("a-").value);
                    var bplus = parseFloat(document.getElementById("b+").value);
                    var b = parseFloat(document.getElementById("b").value);
                    var bminus = parseFloat(document.getElementById("b-").value);
                    var cplus = parseFloat(document.getElementById("c+").value);
                    var c = parseFloat(document.getElementById("c").value);
                    var cminus = parseFloat(document.getElementById("c-").value);
                    var d = parseFloat(document.getElementById("d").value);
                    var f = parseFloat(document.getElementById("f").value);
                    // Initialize the count array to all zeros
                    for (var f = 0; f < 11; f++){
                        countArr[f] = 0;
                    }
                    // Count the amount of values in each grade
                    for (var i = 1; i<arr.length; i++){
                        var tmp = parseFloat(arr[i][1]);
                        if (tmp >= aplus && tmp <= max){
                            countArr[0] += 1;
                        }
                        else if (tmp >= a && tmp < aplus){
                            countArr[1] += 1;
                        }
                        else if (tmp >= aminus && tmp < a){
                            countArr[2] += 1;
                        }
                        else if (tmp >= bplus && tmp < aminus){
                            countArr[3] += 1;
                        }
                        else if (tmp >= b && tmp < bplus){
                            countArr[4] += 1;
                        }
                        else if (tmp >= bminus && tmp < b){
                            countArr[5] += 1;
                        }
                        else if (tmp >= cplus && tmp < bminus){
                            countArr[6] += 1;
                        }
                        else if (tmp >= c && tmp < cplus){
                            countArr[7] += 1;
                        }
                        else if (tmp >= cminus && tmp < c){
                            countArr[8] += 1;
                        }
                        else if (tmp >= d && tmp < cminus){
                            countArr[9] += 1;
                        }
                        else if (tmp >= f && tmp < d){
                            countArr[10] += 1;
                        }
                    }

                    // Get the largest value in the array
                    var largest = 0;
                    for (var i = 0; i < countArr.length; i++){
                        if (countArr[i] > largest){
                            largest = countArr[i];
                        }
                    }

                    // Adjust the height of the bars
                    var frontWord = "polygon(0% 0%, 100% 0%, 100% ";
                    var midWord = "%, 0 ";
                    var backWord = "%)";

                    document.getElementById("aplusGraph").style.clipPath = frontWord + (((countArr[0] / largest) * 100)) + midWord + (((countArr[0] / largest) * 100)) + backWord;
                    document.getElementById("aGraph").style.clipPath = frontWord + (((countArr[1] / largest) * 100)) + midWord + (((countArr[1] / largest) * 100)) + backWord;
                    document.getElementById("aminusGraph").style.clipPath = frontWord + (((countArr[2] / largest) * 100)) + midWord + (((countArr[2] / largest) * 100)) + backWord;
                    document.getElementById("bplusGraph").style.clipPath = frontWord + (((countArr[3] / largest) * 100)) + midWord + (((countArr[3] / largest) * 100)) + backWord;
                    document.getElementById("bGraph").style.clipPath = frontWord + (((countArr[4] / largest) * 100)) + midWord + (((countArr[4] / largest) * 100)) + backWord;
                    document.getElementById("bminusGraph").style.clipPath = frontWord + (((countArr[5] / largest) * 100)) + midWord + (((countArr[5] / largest) * 100)) + backWord;
                    document.getElementById("cplusGraph").style.clipPath = frontWord + (((countArr[6] / largest) * 100)) + midWord + (((countArr[6] / largest) * 100)) + backWord;
                    document.getElementById("cGraph").style.clipPath = frontWord + (((countArr[7] / largest) * 100)) + midWord + (((countArr[7] / largest) * 100)) + backWord;
                    document.getElementById("cminusGraph").style.clipPath = frontWord + (((countArr[8] / largest) * 100)) + midWord + (((countArr[8] / largest) * 100)) + backWord;
                    document.getElementById("dGraph").style.clipPath = frontWord + (((countArr[9] / largest) * 100)) + midWord + (((countArr[9] / largest) * 100)) + backWord;
                    document.getElementById("fGraph").style.clipPath = frontWord + (((countArr[10] / largest) * 100)) + midWord + (((countArr[10] / largest) * 100)) + backWord;

                    // Make all elements visible and invisible
                    let docArray = ["aplusGraph", "aGraph", "aminusGraph", "bplusGraph", "bGraph", "bminusGraph", "cplusGraph", "cGraph", "cminusGraph", "dGraph", "fGraph"];
                    let gradeDisplay = ["gradesAplus", "gradesA", "gradesAminus", "gradesBplus", "gradesB", "gradesBminus", "gradesCplus", "gradesC", "gradesCminus", "gradesD", "gradesF"];
                    document.getElementById("aplusGraph").style.display = "block";
                    document.getElementById("aGraph").style.display = "block";
                    document.getElementById("aminusGraph").style.display = "block";
                    document.getElementById("bplusGraph").style.display = "block";
                    document.getElementById("bGraph").style.display = "block";
                    document.getElementById("bminusGraph").style.display = "block"; 
                    document.getElementById("cplusGraph").style.display = "block";
                    document.getElementById("cGraph").style.display = "block";
                    document.getElementById("cminusGraph").style.display = "block";
                    document.getElementById("dGraph").style.display = "block";
                    document.getElementById("fGraph").style.display = "block";

                    document.getElementById("gradesAplus").style.display = "block";
                    document.getElementById("gradesA").style.display = "block";
                    document.getElementById("gradesAminus").style.display = "block";
                    document.getElementById("gradesBplus").style.display = "block";
                    document.getElementById("gradesB").style.display = "block";
                    document.getElementById("gradesBminus").style.display = "block"; 
                    document.getElementById("gradesCplus").style.display = "block";
                    document.getElementById("gradesC").style.display = "block";
                    document.getElementById("gradesCminus").style.display = "block";
                    document.getElementById("gradesD").style.display = "block";
                    document.getElementById("gradesF").style.display = "block";
                    // Check the max and make sure to cut off elements that exceed it
                    let stopElement = 0;
                    for (let i = 1; i<12; i++){
                        if (tmpArr[i] > tmpArr[0]){
                            stopElement = i;
                        }
                    }
                    // Set sizing of bars
                    let numofBars = 11 - stopElement;
                    let newSizing = Math.floor(100 / numofBars);
                    for (let i = 0; i<11; i++){
                        document.getElementById(docArray[i]).style.width = newSizing + "%";
                        document.getElementById(gradeDisplay[i]).style.width = newSizing + "%";
                    }
                    if (stopElement != 0){ // Set all elements from 1-stopElement to invisible
                        for (let i = 0; i<stopElement; i++){ // Might need to be stopElement +1? dont know
                            document.getElementById(docArray[i]).style.display = "none";
                            document.getElementById(gradeDisplay[i]).style.display = "none";
                        }
                    }
                    // Make the entire graph visible
                    document.getElementById("wholeGraph").style.opacity = "100%";
                    // Make the error message invisible
                    document.getElementById("boundError").style.opacity = "0%";
                    // Make it so that hovering shows number
                    document.getElementById("aplusGraph").firstElementChild.textContent = countArr[0];
                    document.getElementById("aGraph").firstElementChild.textContent = countArr[1];
                    document.getElementById("aminusGraph").firstElementChild.textContent = countArr[2];
                    document.getElementById("bplusGraph").firstElementChild.textContent = countArr[3];
                    document.getElementById("bGraph").firstElementChild.textContent = countArr[4];
                    document.getElementById("bminusGraph").firstElementChild.textContent = countArr[5];
                    document.getElementById("cplusGraph").firstElementChild.textContent = countArr[6];
                    document.getElementById("cGraph").firstElementChild.textContent = countArr[7];
                    document.getElementById("cminusGraph").firstElementChild.textContent = countArr[8];
                    document.getElementById("dGraph").firstElementChild.textContent = countArr[9];
                    document.getElementById("fGraph").firstElementChild.textContent = countArr[10];
                }
                else{
                    document.getElementById("boundError").style.opacity = "100%";
                }
            }
        }
    }
}

function testInput(inp){
    let tmp = inp.value.replace(/[^0-9.]/g, '');
    tmp.replace(/^0[^.]/, '0');
    if (tmp.indexOf('.') != -1){ // There exists a decimal
        let count = 0;
        for (let i = 0; i<tmp.length; i++){
            if (tmp[i] == '.'){
                count += 1;
            }
        }
        if (count > 1){ // Repalces any other decimals
            // Reverse string to not mess up the first decimal
            let rev = tmp.split("").reverse().join("");
            for (let i = 0; i<count-1; i++){
                rev = rev.replace('.', '');
            }
            // Make the string back to the original
            tmp = rev.split("").reverse().join("");
        }
    }
    if (tmp != inp.value || (parseFloat(inp.value)) === false) { // Display error message
        inp.setCustomValidity("Please ensure input only contains numbers");
        inp.value = tmp;
    }
    else {
        inp.setCustomValidity("");
    }
    inp.reportValidity();
}

    
const fileSelector = document.getElementById('inputFile');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    // Check file type
    if (fileList[0].type == "text/csv" || fileList[0].type == "application/vnd.ms-excel"){
        fileTruth = true;
        arr = Array();
        sortedArr = Array();
        countArr = Array();
        highName = "";
        highest = 0;
        lowName = "";
        lowest = 0;
        average = 0;
        median = 0;
        denominator = 0;
        const reader = new FileReader();
        // reader.onload = handleFileLoad;
        reader.readAsText(fileList[0]);
    }
    else{
        fileTruth = false;
    }
});

// Listen for file upload
document.getElementById('inputFile').addEventListener('change', handleFileSelect, false);
// Listen for text input changes
document.getElementById("max").oninput = function() {handleUserInput(fileTruth); testInput(this); testInput(this)};
document.getElementById("a+").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("a").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("a-").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("b+").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("b").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("b-").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("c+").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("c").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("c-").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("d").oninput = function() {handleUserInput(fileTruth); testInput(this)};
document.getElementById("f").oninput = function() {handleUserInput(fileTruth); testInput(this)};



