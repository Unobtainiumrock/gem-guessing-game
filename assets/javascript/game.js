
$(document).ready(function() {

  var gameData = {
    goal: randomizer(19,120),
    wins: 0,
    losses: 0,
    accumulator: 0
  }


  // Sets up initial game data
  initializeGame();

  // Iterate all gems and dynamically add click event listeners.
  $('.gem').each(function() {

    $(this).click(function() {

      // Prevents losing the binding of 'this' when passing the data attribute of the clicked gem.
      var that = this;

      /**
       * Uses a method extended to JQuery. This method takes a string to determine
       * the type of animation to be performed, and an optional callback to
       * be performed after each animation finishes running.
       * In this case we want to provide a callback, so that
       * the score only updates after each animation cycles.
       */
      $(this).animateCss('rubberBand',function() {

        updateAccumulator($(that).attr('val'));
        checkAccumulatedAgainstTotal();
      });

    });

  })





// Helper functions cannot be separated into another file because game.js and helper-functions.js
// would be interdependent on eachother. In other words,
// putting one file path before the other in the index.html doesn't work, because each requires the other

  /**
   * Populates the game with random numbers for gems and goal.
   */
  function initializeGame() {
   $('#goal').text(gameData.goal);
   randomizeGems();
 }

  /**
   * Increments the game data's accumulator with the random gem amount, and updates
   * page with the new accumulated value.
   * 
   * @param  {string} gemAmt: Is the randomized data attribute of the gem clicked.
   */
  function updateAccumulator(gemAmt) {
    gameData.accumulator+= parseInt(gemAmt);
    $('#accumulator').text(gameData.accumulator);
  }

  
  /**
   * Checks if the total points accumulated from gem clicks is equal to the
   * randomly generated goal amount. If so, it will increment wins/losses based on outcome,
   * and update it on the page to the user
   */
  function checkAccumulatedAgainstTotal() {
    // If you hit the goal
    if(gameData.accumulator === gameData.goal) {
      gameData.wins++;
      $('#wins').text(gameData.wins);
      alert('Winner!');
      clearRound();
      // if you go over the goal
    } else if (gameData.accumulator > gameData.goal) {
      gameData.losses++;
      $('#losses').text(gameData.losses);
      alert('Loser!');
      clearRound();
    }
  } 
  // d
  /**
   * Takes an upperbound number, and returns a randomly genereated # 1 - upperBound
   * 
   * @param  {number} upperBound: Is the limit for the highest randomly generate number
   * @returns {number}
   */
  function randomizer(lowerBound,upperBound) {
    return Math.floor(Math.random() * upperBound) + lowerBound;
  }

  
  /**
   * Iterates the gem class and updates their 'val' data attributes to a random number 1 - 12
   */
  function randomizeGems() {
    $('.gem').each(function() {
      // Add the random 1-12 to each gem
      $(this).attr('val',randomizer(1,12));
    })
  }
  
  /**
   * Called on each win/loss, this will reset the randomized goal, accumulated points,
   * hidden gem data attribute values, and update the respective visual data shown to users.
   */
  function clearRound() {
    gameData.goal = randomizer(19,120);
    gameData.accumulator = 0;
    randomizeGems();
    $('#goal').text(gameData.goal);
    $('#accumulator').text(gameData.accumulator);
  }

})
