
$(document).ready(function() {

  // Globals
  var goal = randomizer(120);
  var wins = 0;
  var losses = 0;
  var accumulator = 0;


  // Populate visible data on page.
  $('#goal').text(goal);

  // Populate hidden data on page
  randomizeGems();
  

  // Iterate all gems and dynamically add event listeners
  $('.gem').each(function() {

    $(this).click(function() {
      var gemAmt = $(this).attr('val');
      // console.log(gemAmt);
      accumulator+= parseInt(gemAmt);
      $('#accumulator').text(accumulator);

      // If you hit the goal
      if(accumulator === goal) {
        alert('Winner!');
        wins++;
        $('#wins').text(wins);
        clearRound();
        // if you go over the goal
      } else if (accumulator > goal) {
        alert('Loser!');
        losses++;
        $('#losses').text(losses);
        clearRound();
      }

    });


  })


  function randomizer(upperBound) {
    return Math.floor(Math.random() * upperBound) + 1;
  }

  function randomizeGems() {
    $('.gem').each(function() {
      // Add the random 1-12 to each gem
      $(this).attr('val',randomizer(12));
    })
  }

  function clearRound() {
    goal = randomizer(120);
    accumulator = 0;
    randomizeGems();
    $('#goal').text(goal);
    $('#accumulator').text(accumulator);
  }

})