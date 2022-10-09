# Simple stepper for react
## installation:
``` npm i @ribrary/stepper ```
## FAQs

### Basics: 
```js
  <Stepper>
        <StepperBar rgbColor="purple"/>
        <Steps>
      <h1>One</h1>      
      <h1>two</h1>      
      <h1>three</h1>      
      <h1>four</h1>      
      <h1>five</h1>      
      <h1>six</h1>      
      </Steps>
        <StepperNav size={50} color="rgb(255, 230, 0)" limiters={true}></StepperNav>
      </Stepper>
```
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
### css classes
- step-buttons: for all buttons
#### for <StepperNav/>
- step-buttons: for all buttons
- step-nav-section: for main section 
- step-nav-buttons: for all navigation buttons
- step-nav-limiters: for start and end buttons 
- step-nav-previous: for previous button
- step-nav-current: for current buttons
- step-nav-next

#### for <StepperBar/>
- step-buttons: for all buttons
- step-bar-buttons: for all bar buttons
- step-bar-previous: for previous button
- stp-bar-next: for next button