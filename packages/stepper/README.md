# Introduction 
- Simple stepper for react. Which should the content step by step. 

# installation:
```shell
 npm i @ribrary/stepper 
 ```

It has four components

 - <Stepper> : the main/parent component
 - <StepperNav>  : simple navigation buttons
 - <StepperBar> :  A progress bar to show an over view 
 - <Steps> : A Container to for every step
 - <Step> : optional sub-container for <Steps> for clarity and additional feature.
 
### Basics: 
```js
  <Stepper>
    <StepperBar rgbColor="purple"/>
    <Steps>
      <Step label="Starting">One</Step>      
      <Step label="Second step">two</Step>      
      <Step label="3rd">three</Step>      
      <Step label="fourth">four</Step>      
      <Step label="fifth">five</Step>      
      <Step label="Done">six</Step>      
    </Steps>
    <StepperNav size={50} color="rgb(255, 230, 0)" limiters={true}></StepperNav>
  </Stepper>
```


# <StepperBar   rgbColor="a color name in RGB", size={23} fadePercentage={23}>
- rgbColor: name for color button, otherwise you can change with your following css
- size: size of buttons 
- fadePercentage: fade on hover

# <StepperNav limiters={true} steps={true} rgbColor:"rgb(255,0,0)" size={40}  fadePercentage={32}/>
- limiters: end and start buttons
- steps: show all numerics steps
- rgbColor: color for buttons: you can over ride with your own css
- size: size of buttons 

### Using your own next and previous, without using <StepperBar> and <StepperNav>
 - NextStepButton
 - PreviousStepButton
 - CurrentStepButton

 ```js 
 import {PreviousStepButton} from "@ribrary/stepper";
  <Stepper>
    <Steps>
      <div>Hello</div>
      <div>world</div>
      <div>Bye</div>
    </Steps>
  <PreviousStepButton>
      <button>Your button Previous</button>
  </PreviousStepButton>
  <CurrentStepButton>
      <button>Current</button>
  </CurrentStepButton>
  <NextStepButton>
      <button>Your button Next</button>
  </NextStepButton>
</Stepper>

 ```
### Customizations
- step-buttons: for all buttons
#### for <StepperNav/>
- stepper-buttons: for all buttons
- stepper-nav: for main section 
- stepper-nav--btns: for all navigation buttons
- stepper-nav--limiters: for start and end buttons 
- stepper-nav--previous: for previous button
- stepper-nav--current: for current buttons
- stepper-nav--next

#### for <StepperBar/>
- stepper-buttons: for all buttons
- stepper-bar: main class for nav
- stepper-bar--btn: for all bar buttons
- stepper-bar--previous: for previous button
- stepper-bar--next: for next button