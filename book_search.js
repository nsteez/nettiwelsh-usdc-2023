const jasmineTime = [{
    "Title":"The FairyTail Wedding",
    "ISBN": "9544005200001",
    "Content": [
        {
            "Page": 100,
            "Line": 1,
            "Text": "The animals danced, then they sang a song."
        }]
},  {
    "Title":"The Race to Down",
    "ISBN": "9541100020000",
        "Content": [
            {
                "Page": 10,
                "Line": 2,
                "Text": "As the trees sway in in the wind."
            },
            {
                "Page": 10,
                "Line": 3,
                "Text": "Then shield breaks beneath our feet, it was then at that moment it all made sense."
            },
            {
                "Page": 10,
                "Line": 4,
                "Text": "My eyes filled with tears as I watched in dismay."
            }
    ]

}]

const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const expectedHyphenResults = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN":"9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const expectedApostropheResult = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN":"9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const expectedMulti = {
    SearchTerm: 'then',
    Results:
    [ { ISBN: '9544005200001', Page: 100, Line: 1 },
     { ISBN: '9541100020000', Page: 10, Line: 3 },
     { ISBN: '9541100020000', Page: 10, Line: 4 } ]
    }

const expectedApostropheResult2 = {
    "SearchTerm": "Canadians",
    "Results": []
}
/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */

function findSearchTermInBooks(searchTerm, scannedTextObj){
    result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    for (let i = 0; i < scannedTextObj.length; i++){
        let isbn = scannedTextObj[i].ISBN
        let content = scannedTextObj[i].Content

    for (const [idx, cont] of content.entries()){
        let page = cont['Page']
        let line = cont['Line']
        let text = cont['Text']

        if (text.includes(searchTerm)){
            result['Results'].push({"ISBN": isbn, "Page": page, "Line":line})
        }

        else if (text.slice(-1) == '-'){
            end = text.split(" ").slice(-1)[0].slice(0,-1)
            beginning = content[idx+1]['Text'].split(" ")[0]
            entireWord = end+ beginning

            if (entireWord == searchTerm){
                result['Results'].push({"ISBN": isbn, "Page": page, "Line":line})
            }
        }
    }
    //console.log(content)
}return result
}

/*Unit Test*/


/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}


/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

const testHypenResult = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(expectedHyphenResults) === JSON.stringify(testHypenResult)) {
    console.log("PASS: TestHyphen");
}else {
    console.log("FAIL: TestHyphen 1");
    console.log("Expected:", expectedHyphenResults);
    console.log("Received:", testHypenResult);
}

const testApostropheResult = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(expectedApostropheResult) === JSON.stringify(testApostropheResult)) {
    console.log("PASS: TestApostrophe");
}else {
    console.log("FAIL: TestApostrophe 1");
    console.log("Expected:", expectedApostropheResult);
    console.log("Received:", testApostropheResult);
}


const testApostropheResult2 = findSearchTermInBooks("Canadians", twentyLeaguesIn);
if (testApostropheResult2.Results.length ===0){
    console.log("PASS: TestApostrophe 2")
} else {
    console.log("FAIL: TestApostrophe 2")
}

const testCapitalization = findSearchTermInBooks("However", twentyLeaguesIn);
if (testCapitalization.Results.length == 0) {
    console.log("PASS: TestCapitalization")
} else {
    console.log("FAIL: TestCapitalization");
    console.log("Expected:", 0);
}

const testMultiBooks = findSearchTermInBooks("then", twentyLeaguesIn);
if (testCapitalization.Results.length == 0) {
    console.log("PASS: TestCapitalization")
} else {
    console.log("FAIL: TestCapitalization");
    console.log("Expected:", 0);
}