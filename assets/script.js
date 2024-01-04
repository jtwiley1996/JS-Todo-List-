// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var scheduleContainer = $('#schedule-container');
    var currentHour = dayjs().hour();
  
    //Clears localStorage 
    if (currentHour == 0){
      localStorage.clear();
    }
  
  //Button event listener to save id/input value pairs locally
    $('.saveBtn').on('click', function() {
      var timeBlockId = $(this).closest('.time-block').attr('id');
      var timeBlockInput = $(this).closest('.time-block').find('.description').val();
      localStorage.setItem(timeBlockId, timeBlockInput.trim());
      console.log('storage saved');
    })
  
   //Give each hour div a color based on the current time of day
    scheduleContainer.children().each(function (){
      //Get just the number from each div by slicing off the "hour-" part of the string and converting to a NUM
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
  
  //Populate the hour divs with locally stored data
    for (var i = 9; i < 18; i++){
      var thisHourBlock = '#hour-'+i;
      var savedInput = localStorage.getItem('hour-'+i);
      console.log(savedInput);
      $(thisHourBlock).find('.description').val(savedInput);
    }
  
    //Sets the current date in the header of the page
    var currentDay = dayjs();
    console.log(currentDay.format('dddd, MMMM DD YYYY'))
    $('#currentDay').text(currentDay.format('dddd, MMMM DD, YYYY'))
  });