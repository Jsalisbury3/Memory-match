var count = 1;
var clickCount = 0;
var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var games_played = 0;
var canIflip = true;
var mismatchesAllowed = 10;
// var i=0;



$(document).ready(function(){
    // $("#backgroundMusic").get(0).play();
    initializeApp();
});

function initializeApp(){
    applyBackground();
    card_clicked();
    $('#reset').click(resetGame);
    // modalClose();
}

function createBackOfCards(){
    var imagesArray = ['images/yoda.png', 'images/darth-vader.jpg','images/han-solo.jpg', 'images/leia.jpg',
    'images/luke-skywalker.jpg','images/R2-D2.jpg','images/rey.jpeg','images/kylo.jpg','images/c-3po.jpg','images/yoda.png',
    'images/darth-vader.jpg','images/han-solo.jpg', 'images/leia.jpg','images/luke-skywalker.jpg','images/R2-D2.jpg',
    'images/rey.jpeg','images/kylo.jpg','images/c-3po.jpg'];
    var randomArray =[];
    for(var i=0; i<18; i++){
        var randomNumber = Math.floor(Math.random()*imagesArray.length);
        console.log(randomArray)
        randomArray.push(imagesArray[randomNumber]);
        imagesArray.splice(randomNumber, 1);
    }
    return randomArray;
}
var backgroundArray = createBackOfCards();

function applyBackground(){
    for(var i=1; i<=backgroundArray.length; i++){
        $('#card'+i).css('background-image',"url("+backgroundArray[i-1]+")");
    }
}

function isSoundPaused(audio){
    var isSoundPaused;
    for(var i=0; i<audio.length; i++){
        if(audio[i].paused){
            isSoundPaused = true;
        }
        else{
            isSoundPaused = false;
            break;
        }
    }
    return isSoundPaused;
}

function card_clicked(){
    $('.container').on('click', function () {
        if(isSoundPaused($('.dialogue'))) {
            if (!$(this).find('.flip').hasClass('flipped')) {
                if (canIflip === true) {
                    if (first_card_clicked === null) {
                        $(this).find('.flip').addClass('flipped');
                        first_card_clicked = $(this).find('.back').css('background-image');
                        clickCount++;
                    }
                    else {
                        if (!$(this).find('.flip').hasClass('flipped')) {
                            $(this).find('.flip').addClass("flipped");
                            second_card_clicked = $(this).find('.back').css('background-image');
                            canIflip = false;
                            checkMatch();
                        }
                    }
                    if (clickCount % 2 === 0) {
                        $('.attempt .value').text(count++);
                        $('.accuracy .value').html((((match_counter) / (clickCount / 2)) * 100).toFixed(0) + "%");
                    }
                }
            }
        }
    });
}

function cardDefault(){
    first_card_clicked = null;
    second_card_clicked = null;
    canIflip = true;
}

function flipBack() {
    $('.flipped').filter(function () {
        var back = $(this).find('.back');
        var source = back.css('background-image');
        return source === first_card_clicked || source === second_card_clicked;
    }).removeClass('flipped');
    cardDefault();
}

function audioPlay(){
    console.log('audio play')
}


// function playVideo(video){
//     $('iframe')[0].src=video;
// }

// function showModal(){
//     $('.modal').css("display","block");
// }


function audioPlay(){
    switch (first_card_clicked){
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/leia.jpg")':
             $('#leia').get(0).play();
             break;
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/darth-vader.jpg")':
            $('#darthVader').get(0).play();
            break;
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/yoda.png")':
            $('#yoda').get(0).play();
            break;
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/han-solo.jpg")':
            $('#hanSolo').get(0).play();
            break;
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/luke-skywalker.jpg")':
            $('#lukeSkywalker').get(0).play();
            break;
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/c-3po.jpg")':
            $('#c3po').get(0).play();
            break;
        case 'url("file:///Users/jordansalisbury/Desktop/LFZ/sw_memory_match/images/R2-D2.jpg")':
            $('#r2-d2').get(0).play();
            break;
        
        
        
        
    }
}

function checkMatch(){
    if(first_card_clicked === second_card_clicked && match_counter < 8  ){
        console.log(first_card_clicked);
        audioPlay();
        clickCount++;
        match_counter++;
        cardDefault();
    }
    else if (first_card_clicked !== second_card_clicked) {
        mismatchesAllowed--;
        takeDamage(mismatchesAllowed);
        if(mismatchesAllowed <= 0){
            // showModal();
            // playVideo(youDied);
        }
        clickCount++;
        setTimeout(flipBack, 800);
    }
    else{
        audioPlay();
        match_counter++;
        var currentTrackLength;
        for(var i=0;i<$('.dialogue').length; i++){
            if(!$('.dialogue')[i].paused){
                currentTrackLength = $('.dialogue')[i].duration*1000;
            }
        }
        setTimeout(function() {
            showModal();
            playVideo(darkEnding);
        },currentTrackLength);
    }
}

function resetGame() {
    $('.flipped').removeClass('flipped');
    $('.attempt .value').html("");
    $('.accuracy .value').html("");
    count = 1;
    mismatchesAllowed = 10;
    games_played++;
    $('#health').css("width","100%");
    $('.games-played .value').text(games_played);
    clickCount = 0;
    match_counter = 0;
    cardDefault();
    // $('#staminaAnimation').css('animation-name','staminaLoss');

}
function modalClose(){
    $('.modal').click(function(){
        $('.modal').css("display","none");
        $('iframe')[0].src='';
        resetGame();
    })
}
function takeDamage(mismatchCountdown){
    var health = 10*mismatchCountdown;
    $('#health').css("width",`${health}%`);
}










// $(document).ready(initializeApp);

// var first_card_clicked = null;
// var second_card_clicked = null;
// var total_possible_matches = 9;
// var match_counter = 0;
// var matches = 0;
// var attempts = 0;
// var games_played = 0;
// var accuracy = matches/attempts

// function initializeApp(){
//     addClickHandlersToElements();
//     displayStats();
//     $('.reset').click(resetGame);
// }
// function addClickHandlersToElements(){
//     $(".card").click(handleCardClick);
// }

// function handleCardClick(){
    
//     if(first_card_clicked === null){
//         first_card_clicked = $(this);
//         console.log('first card clicked');
//         showCard(this);
//     }else{
//         console.log('second card clicked');
//         second_card_clicked = $(this);
//         showCard(this);
//         attempts++;
//         if(  $(first_card_clicked).find('.front').css('background-image') === $(second_card_clicked).find('.front').css('background-image')){
//                 matches++;
//                 attempts++;
//                 console.log("They Match");
//                 first_card_clicked = null;
//                 second_card_clicked = null;
//                 accuracy = (matches/attempts)*100;
//                 accuracy = parseFloat(accuracy).toFixed(0)+ '%';
//                 displayStats();
//                 if(matches=== total_possible_matches){
//                     $('.header_info').text('You won!!');
//                 }
//                 }else{
//                     console.log("not same");
//                     accuracy = (matches/attempts)*100;
//                     accuracy = parseFloat(accuracy).toFixed(0)+ '%';
//                     stopClick();
//                     setTimeout(onNotMatchingImages, 400);
//                     startClick();
//                     displayStats();
//                 }
//         }
// }

// function onNotMatchingImages (){
//     first_card_clicked.find('.back').removeClass('hide-card');
//     second_card_clicked.find('.back').removeClass('hide-card');
//     first_card_clicked = null;
//     second_card_clicked = null;
// }
// function stopClick(){
//     $('.card').off("click");
// }
// function startClick(){
//     setTimeout(function(){
//         $('.card').click(handleCardClick);
//     }, 750);
// }
// function showCard(card){
//     $(card).find('.back').addClass('hide-card');
// }
// function displayStats(){
//     $('.games_value').text(games_played);
//     $('.attempts_value').text(attempts);
//     $('.accuracy_value').text(accuracy);
//     $('.matches').text(matches);
// }
// function resetStats(){
//     accuracy=0;
//     matches=0;
//     attempts=0;
//     displayStats();
// }
// function resetGame(){
//     games_played++
//     resetStats();
//     displayStats();
//     $('.card').find('.back').removeClass('hide-card');
    
// }

