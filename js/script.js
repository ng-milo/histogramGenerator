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
                for (var i = 0; i<tmpArr.length-1; i++){
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
                    // Check the max and make sure to cut off elements that exceed it
                    var stopElement = 0;
                    for (let i = 0; i<11; i++){
                        if (tmpArr[i] > tmpArr[0]){
                            stopElement = i;
                            break;
                        }
                    }
                    var docArray = ["aplusGraph", "aGraph", "aminusGraph", "bplusGraph", "bGraph", "bminusGraph", "cplusGraph", "cGraph", "cminusGraph", "dGraph", "fGraph"];
                    if (stopElement != 0){ // Set all elements from 1-stopElement to invisible
                        for (let i = 1; i<stopElement; i++){ // Might need to be stopElement +1? dont know
                            document.getElementById(docArray[i-1]).style.visibility = "hidden";
                        }
                    }
                    for (let i = 0; i<11; i++){
                        document.getElementById(docArray[i]).style.visibility = "visible";
                    }

                    document.getElementById("wholeGraph").style.opacity = "100%";
                    document.getElementById("boundError").style.opacity = "0%";

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
document.getElementById("max").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("a+").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("a").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("a-").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("b+").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("b").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("b-").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("c+").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("c").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("c-").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("d").oninput = function() {handleUserInput(fileTruth)};
document.getElementById("f").oninput = function() {handleUserInput(fileTruth)};



