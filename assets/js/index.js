async function fetchDetails(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
} 
async function getCollections() {
    let collections = await fetchDetails('assets/homePage.json');
    collections.map(collection => {
        if (collection.collectiontype == 'landing') {
            getLandingPageDetails();
        }
    });
} 
async function getLandingPageDetails() {
    let lpResp = await fetchDetails('assets/test.json');
    if (lpResp && lpResp.length > 0) {
        // console.log(lpResp);
        appendData(lpResp)
    } 
} 
function appendData(data) { 

    var rightContainer = document.getElementById("newsDataR");
    var leftContainer = document.getElementById("newsDataL");
    var myHTMLL = '';
    var myHTMLR = ''; 

    for (var i = 0; i < data.length; i++) {


        if (null === data[i].intro) {
            myHTMLR += '<div class="tab_inner_right clearfix"><div class="col-sm-8 space_left"><div class="tab_inner_right_2">';
            myHTMLR += '<p class="newsTitleR1"><a href="' + data[i].nId + '">' + data[i].title + '</a></p>';
            myHTMLR += '<h6><span class="far fa-clock"> ' + data[i].timePosted + '&nbsp</span>';
            myHTMLR += '<span class="far fa-comment-alt"> ' + data[i].comments.length + '</span></h6>';
            myHTMLR += '</div></div>';
            myHTMLR += '<div class="col-sm-4 space_left"><div class="tab_inner_right_1">';
            myHTMLR += '<a href="' + data[i].nId + '"><img src="' + data[i].imageUrl + '" width="100%" height="70px"></a>';
            myHTMLR += '</div></div></div><hr>';

        } else {

            if ('right' == data[i].position) {
                myHTMLR += '<div class="tab_inner_left clearfix tab_inner_left_news">';
                myHTMLR += '<a href="' + data[i].nId + '"><img src="' + data[i].imageUrl + '" width="100%"></a>';
                myHTMLR += '<h4><a href="' + data[i].nId + '">' + data[i].title + '</a></h4>';
                myHTMLR += '<p class="newsTitleR">' + data[i].intro + '</p>';
                myHTMLR += '<h6><span class="far fa-clock"> ' + data[i].timePosted + '&nbsp;</span>';
                myHTMLR += '<span class="far fa-comment-alt"> ' + data[i].comments.length + '</span></h6><hr></div>';
            } else { 
                myHTMLL += '<div class="tab_inner_left clearfix tab_inner_left_news">';
                myHTMLL += '<a href="' + data[i].nId + '"><img src="' + data[i].imageUrl + '" width="100%"></a>';
                myHTMLL += '<h4><a href="' + data[i].nId + '">' + data[i].title + '</a></h4>';
                myHTMLL += '<p class="newsTitle">' + data[i].intro + '</p>';
                myHTMLL += '<h6><span class="far fa-clock"> ' + data[i].timePosted + '&nbsp;</span>';
                myHTMLL += '<span class="far fa-comment-alt"> ' + data[i].comments.length + '</span></h6><hr></div>';
            }
        }

    }
    rightContainer.innerHTML = myHTMLR;
    leftContainer.innerHTML = myHTMLL; 
    getElemntclassName('newsTitle');
    getElemntclassName('newsTitleR');

} 
function getElemntclassName(cname) {
    var toBold = document.getElementsByClassName(cname);
    for (var i = 0; i < toBold.length; ++i) {
        colorFirstWord(toBold[i]);
    }
}

function colorFirstWord(elem) {
    elem.innerHTML = elem.textContent.replace(/^(\w+)/, function (s, c) {
        return s.replace(c, '<b>' + c + '</b>');
    });
} 

getCollections();