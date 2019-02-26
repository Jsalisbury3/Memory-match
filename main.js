var count = 1;
var clickCount = 0;
var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var games_played = 0;
var canIflip = true;
var mismatchesAllowed = 10;
var flag = false;

$(document).ready(function(){
    initializeApp();
});
function initializeApp(){
    applyBackground();
    card_clicked();
    $('#reset').click(resetGame); 
    $('.audio-tag').hide()
}
function muteAudio(){
    if(!flag){
        $('.muteButton').text("Unmute Audio")
        flag=true
    }else{
        $('.muteButton').text('Mute Audio')
        flag=false
    }
}
function createBackOfCards(){
    var imagesArray = ['images/1yoda.png', 'images/darth-vader.jpg','images/han-solo.jpg', 'images/leia.jpg',
    'images/luke-skywalker.jpg','images/R2-D2.jpg','images/rey.jpeg','images/kylo.jpg','images/c-3po.jpg','images/1yoda.png',
    'images/darth-vader.jpg','images/han-solo.jpg', 'images/leia.jpg','images/luke-skywalker.jpg','images/R2-D2.jpg',
    'images/rey.jpeg','images/kylo.jpg','images/c-3po.jpg'];
    var randomArray =[];
    for(var i=0; i<18; i++){
        var randomNumber = Math.floor(Math.random()*imagesArray.length);
        randomArray.push(imagesArray[randomNumber]);
        imagesArray.splice(randomNumber, 1);
    }
    return randomArray;
}
function applyBackground(){
    var backgroundArray = createBackOfCards();
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
function showModalLose(){
    $('.modalLose').css("display","block");
    if(flag){
        return;
    }else{
        $("#imperial_march").get(0).play();   
    }  
}
function modalCloseLose(){
    $('.modalLose').css("display","none");
    $("#imperial_march").get(0).load();
    $("#imperial_march").get(0).pause();
    resetGame();
}
function showModalWin(){
    $('.modalWin').css("display","block");
    if(flag){
        return;
    }else{
        $("#theme_song").get(0).play();   
    }
}
function modalCloseWin(){
    $('.modalWin').css("display","none");
    $("#theme_song").get(0).load();
    $("#theme_song").get(0).pause();
    resetGame();
}
function audioPlay(){
    if(flag){
        return;
    }
    switch (first_card_clicked){
        case 'url("https://jordansalisbury.me/star-wars/images/leia.jpg")':
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#leia').get(0).play();
            $('#leia').get(0).onended = function(){
                $('.audio-tag').hide()
            }
             break;
        case "url('https://jordansalisbury.me/star-wars/images/darth-vader.jpg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#darthVader').get(0).play();
            $('#darthVader').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/1yoda.png')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#yoda').get(0).play();
            $('#yoda').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/han-solo.jpg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#hanSolo').get(0).play();
            $('#hanSolo').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/luke-skywalker.jpg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#lukeSkywalker').get(0).play();
            $('#lukeSkywalker').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/c-3po.jpg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#c3po').get(0).play();
            $('#c3po').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/R2-D2.jpg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#r2-d2').get(0).play();
            $('#r2-d2').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/kylo.jpg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#kyloRen').get(0).play();
            $('#kyloRen').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
        case "url('https://jordansalisbury.me/star-wars/images/rey.jpeg')":
            $('.audio-tag').show()
            $('.audio-tag').addClass('shake')
            $('#rey').get(0).play();
            $('#rey').get(0).onended = function(){
                $('.audio-tag').hide()
            }
            break;
    }
}
function checkMatch(){
    if(first_card_clicked === second_card_clicked && match_counter < 8  ){
        audioPlay();
        clickCount++;
        match_counter++;
        cardDefault();
        removeHover();
    }
    else if (first_card_clicked !== second_card_clicked) {
        mismatchesAllowed--;
        takeDamage(mismatchesAllowed);
        if(mismatchesAllowed <= 0){
            showModalLose();          
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
            showModalWin(); 
        },currentTrackLength);
    }
}
function resetGame() {
    if(clickCount=== 0 ){
        return;
    }
    $('.flipped').removeClass('flipped');
    $('.attempt .value').html("");
    $('.accuracy .value').html("");
    $('#health').css('background-color', "blue");
    $('#health').css('box-shadow', "0px 0px 7px 1.5px blue");
    count = 1;
    mismatchesAllowed = 10;
    games_played++;
    $('#health').css("width","379px");
    $('.games-played .value').text(games_played);
    clickCount = 0;
    match_counter = 0;
    cardDefault();
    applyBackground();
    card_clicked();
}
function takeDamage(mismatchCountdown){
    var health = 10*mismatchCountdown;
    $('#health').css("width",`${health}%`);
    switch(health){
        case 90:
            $('#health').css('background-color', "hsl(267, 34%, 58%)")
            $('#health').css('box-shadow', "0px 0px 7px 1.5px hsl(267, 34%, 58%)")
            break;
        case 80:  
            $('#health').css('background-color', "hsl(112, 66%, 39%)");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px hsl(112, 66%, 39%)")
            break; 
        case 70:
            $('#health').css('background-color', "hsl(63, 71%, 45%)");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px hsl(63, 71%, 45%)")
            break;
        case 60:
            $('#health').css('background-color', "hsl(34, 75%, 59%)");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px hsl(34, 75%, 59%)")
            break;
        case 50:
            $('#health').css('background-color', "red")
            $('#health').css('box-shadow', "0px 0px 7px 1.5px red")
            break;
        case 40:
            $('#health').css('background-color', "hsl(112, 66%, 39%)");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px hsl(112, 66%, 39%)")
            break;
        case 30:
            $('#health').css('background-color', "blue");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px blue")
            break;
        case 20:
            $('#health').css('background-color', "hsl(267, 34%, 58%)");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px hsl(267, 34%, 58%)")
            break;
        case 10:
            $('#health').css('background-color', "red");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px red")
            break;
        case 0:
            $('#health').css('background-color', "blue");
            $('#health').css('box-shadow', "0px 0px 7px 1.5px blue")
            break;
    } 
}
function removeHover(){
    $('.flipped').removeClass('front:hover');
}