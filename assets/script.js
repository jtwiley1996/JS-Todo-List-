
$(function () {
    var scheduleContainer = $('#schedule-container');
    var currentHour = dayjs().hour();
  
    //Clears the localStorage 
    if (currentHour == 0){
      localStorage.clear();
    }
  //event listener that saves ID
    $('.saveBtn').on('click', function() {
      var timeBlockId = $(this).closest('.time-block').attr('id');
      var timeBlockInput = $(this).closest('.time-block').find('.description').val();
      localStorage.setItem(timeBlockId, timeBlockInput.trim());
      console.log('storage saved');
    })
   //Changes the color base on what time of day it is
    scheduleContainer.children().each(function (){
        //simpplifies the number by cutting off hour- part of string and changing to a number
      var hourNum = Number(this.id.slice(5));
      if (currentHour < hourNum){
        $(this).addClass('future');
      }
      if (currentHour === hourNum){
        $(this).addClass('present')
      }
      if (currentHour > hourNum){
        $(this).addClass('past')
      }
    })
  //Populates hour divs with stored data
    for (var i = 9; i < 18; i++){
      var thisHourBlock = '#hour-'+i;
      var savedInput = localStorage.getItem('hour-'+i);
      console.log(savedInput);
      $(thisHourBlock).find('.description').val(savedInput);
    }
  
    //Sets the date
    var currentDay = dayjs();
    console.log(currentDay.format('dddd, MMMM DD YYYY'))
    $('#currentDay').text(currentDay.format('dddd, MMMM DD, YYYY'))
  });