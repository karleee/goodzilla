# Goodzilla

## Introduction
Goodzilla is an endless runner and shooter game built in vanilla Javascript, inspired by the cinematic world of 'Godzilla'. As a nod to the classic mechagodzilla portrayed in the films, run through the streets of Tokyo as an adorable miniaturized form of the reptile and use your fire breathing abilities to defend the city from hordes of robots. 

<kbd>
<img src="https://github.com/karleee/goodzilla/blob/master/README_images/goodzilla_main1.png" alt="Homepage" width="900px"     border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/goodzilla/blob/master/README_images/goodzilla_main2.png" alt="Game over page" width="900px" border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/goodzilla/blob/master/README_images/goodzilla_main3.png" alt="Game over page" width="900px" border="1">
</kbd>

## Technologies Used
* Languages – Vanilla Javascript
* Hosting – Heroku


## Feature Spotlight
### Player Customization

To add more depth to the game, I created a player sprite customization option before the main game loop begins. Players are presented with four different colored versions of the mini Goodzilla sprite to choose from, complete with hovering effects and background artowrk integration.

<kbd>
<img src="https://github.com/karleee/goodzilla/blob/master/README_images/goodzilla_character1.png" alt="Character menu page" width="900px" border="1">
</kbd>

<br>
<br>

**Challenges**
> Navigating Game Screens

The first challenge was to implement a way for multiple game screens and to find a way that would allow the user to go back and forth between them. Although I am familiar with the use of components and additional libraries, my goal for this application was to create it completely in vanilla Javascript.

<br>

> Canvas Rendering

Having primarily used normal HTML tags for webpage rendering and self produced images made in Illustrator or Photoshop, using canvas to render the game was a new concept for me that took quite a bit of research to debug certain rendering blurriness and automatic image smoothing.

<br>

> Enemy Spawning

Rendering enemies at a consistent speed and preventing them from stacking on top of each other (or at least a smaller chance of them clumping together) was another interesting challenge to tackle.

<br>
<br>

**Solutions**
> Navigating Game Screens: Solution

Because I was limited to vanilla Javascript, using components was a solution that I wanted to avoid. Instead, I chose to initially 'hide' the html elements that rendered each game screen and use event listeners on buttons to determine whether or not to 'reveal' a menu screen. The main reason why I chose to solve this problem this way was because of the flexibility to refactor a large portion of the code in these different menu screens later on; the functionality behind the `draw` function for each of these screens is almost identical, which makes it a great candidate to turn it into a utility or helper function later on.

``` javascript
  // Drawing the game start menu
  draw() {
    const menu = document.getElementById('game-start-menu');
    menu.classList.add('active');
    this.clickHandler();
  }
```

<br>

> Canvas Rendering: Solution

Rendering or altering the style text and images through CSS proved to be an issue with how canvas rendered graphics; after doing my research, it appeared that setting a fixed size for the canvas directly in the attributes and avoiding styling via CSS was the solution to avoid blurry or warped text and images. 

<br>

> Enemy Spawning: Solution

To create the guests amount dropdown menu, I created a HTML element that rendered the entirety of the dropdown menu; however, to make it appear as though it only activated when the user clicked on the guests options input bar, I initially set the opacity to 0. Once the user clicks on the input bar, a class is added to this HTML element and using styling, I changed the opacity to 1 for this specific class. This created the toggling effect that I was trying to accomplish with this piece of the calendar widget. And to create the editing buttons (adding and subtracting) in the dropdown menu I used icon tags that dynamically changed content depending on whether or not the maximum amount of guests had been reached.

<kbd>
<img src="https://github.com/karleee/airbnb_clone/blob/master/README_images/calendar_widget_guests.png" alt="Homepage" width="300px" border="1">
</kbd>

And to keep my code DRY, I managed to create a single adding and subtracting click event for every category of guests in the dropdown menu. These generic functions take in a string that indicates which type of guest they need to change the state for; and it also provides checks to see if the maximum guest amount has been reached. Because there can only be a maximum of four guests, the maximum amount for any of these categories can only be four. And if the code execution has reached the inside of the initial `if` statement, then we can safely assume that the total guest count has not reached the maximum and additions can still be made. A similar process applies to the subtraction function as well, except of course that the changes to the state are decreasing the total amount and the bounding range is checking to see if the guest amount is already at 0 (in that case, we cannot subtract any more). To account for how Airbnb handles the amount of infants in a rental, I excluded the infant guests from my total count.

``` javascript
// Handles guests adding click
  handleGuestsAddingClick(guestType) {
    let totalGuests = this.state.adultGuests + this.state.childrenGuests;
    let newTotalGuests;
    let guestCount;

    if (guestType === 'adult') {
      guestCount = this.state.adultGuests;
    } else if (guestType === 'children') {
      guestCount = this.state.childrenGuests;
    } else {
      let newInfantGuests = this.state.infantGuests + 1;
      this.setState({ infantGuests: newInfantGuests });
      return;
    }

    if (totalGuests < 4) {
      newTotalGuests = totalGuests + 1;
      this.setState({ totalGuests: newTotalGuests });

      if (guestType === 'adult' && guestCount < 4) {
        let newAdultGuests = guestCount + 1;
        this.setState({ adultGuests: newAdultGuests });
      } else if (guestType === 'children' && guestCount < 4) {
        let newChildrenGuests = guestCount + 1;
        this.setState({ childrenGuests: newChildrenGuests });
      } 
    }
  }
```

------

### Feature #2



**Challenges**
> Challenge #1

> Challenge #2

> Challenge #3

**Solutions**

> Solution #1


  
> Solution #2


> Solution #3



## Future Updates


| Version Number        | Updates           | 
| :------------- |:------------- |
| Version 1.1      | Booking Form |  

