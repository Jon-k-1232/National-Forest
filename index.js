
function queryParams(params) {
    const searchItem = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return searchItem.join('&');
}


function displayHits(responseJson, maxHits) {
    $('.apiError').empty();
    $('.resultsList').empty();

    for (let i = 0; i < responseJson.data.length & i < maxHits; i++) {
        $('.resultsList').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`)
        console.log('displayHits Looped');
        }
    $('.results').removeClass('hidden');
}


function getHits(parkURL,stateArray,maxHit,apiKey) {
    const params = {
        stateCode: stateArray,
        limit: maxHit
    }

    const query = queryParams(params);
    const url = parkURL + '?' + query + '&api_key=' + apiKey;

    fetch(url)
        .then(response => response.json())
            .then(responseJson => { // 35-38 print the json object to console
                console.log(responseJson);
                return responseJson;
            })
        .then(responseJson => displayHits(responseJson, maxHit))
        .catch(error => {
            $('.apiError').text(`Never trust a computer you can’t throw out a window. Error message: ${error.message}.`)
        });
}


function Start() {
    $('.searchForm').on('submit', function(e){
        e.preventDefault();
        const parkURL = 'https://api.nps.gov/api/v1/parks'
        const stateArray = $('.searchState').val().split(",");
        const maxHit = $('.maxHits').val();
        const apiKey = 'fWY4ryb2t3NSPaNZORhEEtoguauSgkRAtqMzjue9';
        getHits(parkURL,stateArray,maxHit,apiKey);
        console.log('start ran');
    })
}

$(Start);