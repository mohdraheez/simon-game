var color = ['green','red','yellow','blue'];
var randomArray = [];
var userClicked = [];
var reload=0,gameLevel=0,userLevel=0;

$(document).keypress(function(){
    if(reload===0){
        randomColorChooser();
    }
    reload++;
})

function randomColorChooser(){

    $('#level-title').text('Level '+ gameLevel);
    gameLevel++;

    var num = (Math.floor(Math.random()*10))%4;

    var randomColor = color[num]; 

    randomArray.push(randomColor);

    $('#'+randomColor).fadeOut(120).fadeIn(120);
    playSound(randomColor);
}

$('.btn').click(function(){
    if(reload!=0){

    userLevel++;
    var choosenColor = $(this).attr('id');
    userClicked.push(choosenColor);

    animatePress(choosenColor);
    setTimeout(removeAnimate,50,choosenColor);
    playSound(choosenColor);
    
    checkAnswer(userLevel-1);

    }

    if(userLevel === gameLevel && reload!=0){

        setTimeout(randomColorChooser,1000);
        userClicked.length = 0;
        userLevel = 0;

    }
});


function animatePress(btn){
    $('#'+btn).addClass('pressed');
}

function removeAnimate(btn){
    $('#'+btn).removeClass('pressed');
}

function checkAnswer(level){
    if(randomArray[level]!=userClicked[level]){

        randomArray.length=0;
        userClicked.length=0;
        userLevel = 0;
        gameLevel = 0;
        $('#level-title').text('Game Over! Press Any Key To restart');
        playSound('wrong');
        animateWrong();
        setTimeout(removeAnimateWrong,1500);
        reload=0;

    }
}

function animateWrong(){
    $('body').addClass('game-over');
    
}

function removeAnimateWrong(){
    $('body').removeClass('game-over');

}

function playSound(name){
    var audioUrl = '/sounds/'+name+'.mp3';
    var audio = new Audio(audioUrl);
    audio.setAttribute('allow','autoplay');
    audio.play();
}
