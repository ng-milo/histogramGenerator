var theMax = 0; // Position of the max grade
var theLow = 0; // Position of the lowest grade
var average = 0;
var median = 0;
var nameArray = Array();
var gradeArray = Array();
var boundArray = Array();
var countArray = Array();
var globalTruth = true;

function calculateStats(){
    // Get the max and calculate the average
    tmpMax = gradeArray[0];
    tmpSml = gradeArray[0];
    for (let i = 0; i<gradeArray.length; i++){
        if (gradeArray[i] > tmpMax){
            theMax = i;
            tmpMax = gradeArray[i];
        }
        if (gradeArray[i] < tmpSml){
            theLow = i;
            tmpSml = gradeArray[i];
        }
        average += gradeArray[i];
    }
    // Calculate the highest and lowest score
    var tmpHigh = nameArray[theMax] + " (" + gradeArray[theMax].toFixed(2) + "%)";
    var tmpLow =  nameArray[theLow] + " (" + gradeArray[theLow].toFixed(2) + "%)";
    // Calculate the median
    gradeArray.sort(function(a, b){return a-b});
    if ((gradeArray.length)%2 == 0){
        console.log(gradeArray.length)
        median = (gradeArray[Math.floor((gradeArray.length)/2)] + gradeArray[Math.floor((gradeArray.length)/2)+1]) / 2;
    }
    else{
        median = gradeArray[Math.floor(((gradeArray.length))/2)];
    }
    average = average / gradeArray.length;
    document.getElementById("highest").value = tmpHigh;
    document.getElementById("lowest").value = tmpLow;
    document.getElementById("mean").value = average.toFixed(2) + "%";
    document.getElementById("median").value = median.toFixed(2) + "%";
    document.getElementById("fileError").style.opacity = "0%";
    document.getElementById("statsArea").style.opacity = "100%";
}

function convertArray(boolChecker, csvArr) {
    if (boolChecker == true){ // Ensure grades are all good
        for (let i = 0; i<csvArr.length; i++){
            nameArray.push(csvArr[i][0]);
            gradeArray.push(parseFloat(csvArr[i][1]));
        }
        nameArray.shift()
        gradeArray.shift()
        calculateStats();
        globalTruth = true;
    }
    else{
        // Make a popup for csv file being wrong
        globalTruth = false;
    }
}

function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
    // Set tmpFile to hold the element of the csv file
    let text = event.target.result;
    // Split the file into different lines
    text = text.split("\n");
    // Create a temporary array
    let csvArray = Array();
    // Split the individual lines into name and grade
    for (let i = 0; i<text.length; i++){
        let line = text[i].split(",");
        csvArray.push(line);
    }
    var tmpCheck = true;
    // No point displaying anything if there is nothing in the file
    if (csvArray.length < 1){
        tmpCheck = false;
    }
    else{
        // Check the csvArray for all numbers as grades
        for (let i = 1; i<csvArray.length; i++){
            if (parseFloat(csvArray[i][1]) === false || isNaN(parseFloat(csvArray[i][1])) === true){
                tmpCheck = false;
            }
        }
    }
    convertArray(tmpCheck, csvArray);
}

function checkBound() { // Checks all the bounds are valid and 
    if (document.getElementById("max").value && document.getElementById("a+").value && document.getElementById("a").value && document.getElementById("a-").value && document.getElementById("b+").value && document.getElementById("b").value && document.getElementById("b-").value && document.getElementById("c+").value && document.getElementById("c").value && document.getElementById("c-").value && document.getElementById("d").value && document.getElementById("f").value){
        if (parseFloat(document.getElementById("max").value) !== false && parseFloat(document.getElementById("a+").value) !== false && parseFloat(document.getElementById("a").value) !== false && parseFloat(document.getElementById("a-").value) !== false && parseFloat(document.getElementById("b+").value) !== false && parseFloat(document.getElementById("b").value) !== false && parseFloat(document.getElementById("b-").value) !== false && parseFloat(document.getElementById("c+").value) !== false && parseFloat(document.getElementById("c").value) !== false && parseFloat(document.getElementById("c-").value) !== false && parseFloat(document.getElementById("d").value) !== false && parseFloat(document.getElementById("f").value) !== false){
            if (globalTruth == true){
                parseBound();
            }
        }
        else {
            document.getElementById("boundError").style.opacity = "100%";
        }
    }
    else {
        document.getElementById("boundError").style.opacity = "100%";
    }
}

function quickArray() {
    boundArray.push(parseFloat(document.getElementById("a+").value));
    boundArray.push(parseFloat(document.getElementById("a").value));
    boundArray.push(parseFloat(document.getElementById("a-").value));
    boundArray.push(parseFloat(document.getElementById("b+").value));
    boundArray.push(parseFloat(document.getElementById("b").value));
    boundArray.push(parseFloat(document.getElementById("b-").value));
    boundArray.push(parseFloat(document.getElementById("c+").value));
    boundArray.push(parseFloat(document.getElementById("c").value));
    boundArray.push(parseFloat(document.getElementById("c-").value));
    boundArray.push(parseFloat(document.getElementById("d").value));
    boundArray.push(parseFloat(document.getElementById("f").value));
    let tmp = boundArray[0];
    for (let i = 0; i<11; i++){ // Check largest to smallest
        if (boundArray[i] > tmp){
            // Shoot error message
            return false;
        }
    }
    return true;
}

function parseBound() {
    // Convert the bounds into an array
    let tmpMax = parseFloat(document.getElementById("max").value);
    if (quickArray() == false){
        document.getElementById("boundError").style.opacity = "100%";
    }
    else {
        let posStop = gradeArray.length;
        let tmpArr = Array();
        for (var f = 0; f < 11; f++){
            countArray[f] = 0;
        }
        // Count the amount of values in each grade
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
        for (var i = 1; i<boundArray.length; i++){
            var tmp = parseFloat(boundArray[i][1]);
            if (tmp >= aplus && tmp <= max){
                countArray[0] += 1;
            }
            else if (tmp >= a && tmp < aplus){
                countArray[1] += 1;
            }
            else if (tmp >= aminus && tmp < a){
                countArray[2] += 1;
            }
            else if (tmp >= bplus && tmp < aminus){
                countArray[3] += 1;
            }
            else if (tmp >= b && tmp < bplus){
                countArray[4] += 1;
            }
            else if (tmp >= bminus && tmp < b){
                countArray[5] += 1;
            }
            else if (tmp >= cplus && tmp < bminus){
                countArray[6] += 1;
            }
            else if (tmp >= c && tmp < cplus){
                countArray[7] += 1;
            }
            else if (tmp >= cminus && tmp < c){
                countArray[8] += 1;
            }
            else if (tmp >= d && tmp < cminus){
                countArray[9] += 1;
            }
            else if (tmp >= f && tmp < d){
                countArray[10] += 1;
            }
        }

        changeDisplay();
    }
}

function changeDisplay() {
    // Get the largest value in the array to scale the graph
    let inpLargest = boundArray[0];
    for (var i = 0; i < countArray.length; i++){
        if (countArray[i] > inpLargest){
            inpLargest = countArray[i];
        }
    }
    // Adjust the height of the bars
    var frontWord = "polygon(0% 0%, 100% 0%, 100% ";
    var midWord = "%, 0 ";
    var backWord = "%)";
    // Change the height of each bar
    document.getElementById("aplusGraph").style.clipPath = frontWord + (((countArray[0] / inpLargest) * 100)) + midWord + (((countArray[0] / inpLargest) * 100)) + backWord;
    document.getElementById("aGraph").style.clipPath = frontWord + (((countArray[1] / inpLargest) * 100)) + midWord + (((countArray[1] / inpLargest) * 100)) + backWord;
    document.getElementById("aminusGraph").style.clipPath = frontWord + (((countArray[2] / inpLargest) * 100)) + midWord + (((countArray[2] / inpLargest) * 100)) + backWord;
    document.getElementById("bplusGraph").style.clipPath = frontWord + (((countArray[3] / inpLargest) * 100)) + midWord + (((countArray[3] / inpLargest) * 100)) + backWord;
    document.getElementById("bGraph").style.clipPath = frontWord + (((countArray[4] / inpLargest) * 100)) + midWord + (((countArray[4] / inpLargest) * 100)) + backWord;
    document.getElementById("bminusGraph").style.clipPath = frontWord + (((countArray[5] / inpLargest) * 100)) + midWord + (((countArray[5] / inpLargest) * 100)) + backWord;
    document.getElementById("cplusGraph").style.clipPath = frontWord + (((countArray[6] / inpLargest) * 100)) + midWord + (((countArray[6] / inpLargest) * 100)) + backWord;
    document.getElementById("cGraph").style.clipPath = frontWord + (((countArray[7] / inpLargest) * 100)) + midWord + (((countArray[7] / inpLargest) * 100)) + backWord;
    document.getElementById("cminusGraph").style.clipPath = frontWord + (((countArray[8] / inpLargest) * 100)) + midWord + (((countArray[8] / inpLargest) * 100)) + backWord;
    document.getElementById("dGraph").style.clipPath = frontWord + (((countArray[9] / inpLargest) * 100)) + midWord + (((countArray[9] / inpLargest) * 100)) + backWord;
    document.getElementById("fGraph").style.clipPath = frontWord + (((countArray[10] / inpLargest) * 100)) + midWord + (((countArray[10] / inpLargest) * 100)) + backWord;
    // Make all elements visible and invisible
    let docArray = ["aplusGraph", "aGraph", "aminusGraph", "bplusGraph", "bGraph", "bminusGraph", "cplusGraph", "cGraph", "cminusGraph", "dGraph", "fGraph"];
    for (let i = 0; i<11; i++){
        document.getElementById(docArray[i]).style.display = "block";
    }
    // Check the max and make sure to cut off elements that exceed it
    let stopElement = 0;
    for (let i = 0; i<11; i++){
        if (boundArray[i] > boundArray[0]){
            stopElement = i;
            break;
        }
    }
    if (stopElement != 0){ // Set all elements from 1-stopElement to invisible
        for (let i = 1; i<stopElement; i++){ // Might need to be stopElement +1? dont know
            document.getElementById(docArray[i-1]).style.display = "none";
        }
    }
    // Make the entire graph visible
    document.getElementById("wholeGraph").style.opacity = "100%";
    // Make the error message invisible
    document.getElementById("boundError").style.opacity = "0%";
    // Make it so that hovering shows number
    document.getElementById("aplusGraph").firstElementChild.textContent = countArray[0];
    document.getElementById("aGraph").firstElementChild.textContent = countArray[1];
    document.getElementById("aminusGraph").firstElementChild.textContent = countArray[2];
    document.getElementById("bplusGraph").firstElementChild.textContent = countArray[3];
    document.getElementById("bGraph").firstElementChild.textContent = countArray[4];
    document.getElementById("bminusGraph").firstElementChild.textContent = countArray[5];
    document.getElementById("cplusGraph").firstElementChild.textContent = countArray[6];
    document.getElementById("cGraph").firstElementChild.textContent = countArray[7];
    document.getElementById("cminusGraph").firstElementChild.textContent = countArray[8];
    document.getElementById("dGraph").firstElementChild.textContent = countArray[9];
    document.getElementById("fGraph").firstElementChild.textContent = countArray[10];
}

function checkInput() {
    document.getElementById("max").oninput = function() {parseBound()};
    document.getElementById("a+").oninput = function() {parseBound()};
    document.getElementById("a").oninput = function() {parseBound()};
    document.getElementById("a-").oninput = function() {parseBound()};
    document.getElementById("b+").oninput = function() {parseBound()};
    document.getElementById("b").oninput = function() {parseBound()};
    document.getElementById("b-").oninput = function() {parseBound()};
    document.getElementById("c+").oninput = function() {parseBound()};
    document.getElementById("c").oninput = function() {parseBound()};
    document.getElementById("c-").oninput = function() {parseBound()};
    document.getElementById("d").oninput = function() {parseBound()};
    document.getElementById("f").oninput = function() {parseBound()};
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

function cleanInput(){
    document.getElementById("max").oninput = function() {testInput(this)};
    document.getElementById("a+").oninput = function() {testInput(this)};
    document.getElementById("a").oninput = function() {testInput(this)};
    document.getElementById("a-").oninput = function() {testInput(this)};
    document.getElementById("b+").oninput = function() {testInput(this)};
    document.getElementById("b").oninput = function() {testInput(this)};
    document.getElementById("b-").oninput = function() {testInput(this)};
    document.getElementById("c+").oninput = function() {testInput(this)};
    document.getElementById("c").oninput = function() {testInput(this)};
    document.getElementById("c-").oninput = function() {testInput(this)};
    document.getElementById("d").oninput = function() {testInput(this)};
    document.getElementById("f").oninput = function() {testInput(this)};
}


// Check for users uploading data
document.getElementById('inputFile').addEventListener('change', handleFileSelect, false);
// Check for any changes to the bounds
cleanInput();
checkInput();
