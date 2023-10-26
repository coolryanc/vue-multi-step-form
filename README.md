# vue-multi-step-form

This project was bootstrapped with [create-vue](https://github.com/vuejs/create-vue)

https://github.com/ryanC1993/vue-multi-step-form/assets/9876706/6b07298c-cec7-4c07-9161-ecaa501e10e7

## Specs
- [x] Back links appear on every screen other than the first one, going back to the step the user was just on
- [x] Input is required on every screen prior to proceeding to the next.
- [x] On the last screen, provide a submit button that calls a handleSubmit.
- [x] Show a success screen.

## Solution
In case there are new requirements from PM to add different multi-step form or add new steps, we want to make a more generic component `MultiStepForm`. The component has ability to render steps dynamically.

### Props (API Design)
To render multi-step dynamically, we need the following props:
- `steps`: A list of step objects. Each step is an object with the following fields
  - `type`: The input type of the current step, e.g. date input and password input.
  - `key`: The key for the final form value object, also used as the render key.
  - `label`: The text label to display in the current step.
  - `required`: Optional and defaults to true.
  - `ruleValidator`: Optional. Custom validator function to display error hint.

### input type (step.type)
By current requirement, it needs to support 4 types of input:
- [\<input type="text"\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text)
- [\<input type="date"\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
- [\<input type="email"\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)
- [\<input type="password"\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)

Wrap these 4 input types as components, and based on the props steps, render the input component by `step.type`.

### State
We need the following states:
- `currentStep`: To render the corresponding step from props.steps.
- `formErrorHint`: To display the current error message.
- `formValues`: During input in each step, should synchronize the key & value to the formValues object.

### Next button
The next button should handle the logic about checking that the input value is not empty as well as the custom rule.

### Submit button
We should emit an event to let the parent component know that the submit button was clicked, and the parent component can have the callback function, the params of the callback function would be the `formValues`.

## Test Cases
- The Back button should not appear in the first step, but should appear in other steps.
  - When go back to previous step, the previous input value should be shown.
- The Next button should not appear in the final steps.
  - Next button should not work if the value is empty or doesn't pass the rule check.
- The submit button should appear in the final steps.
  - Clicking Submit should display a success screen.


## Accessibility
- Add `aria-label` to buttons.
- Add `aria-required` to required inputs. The `aria-required` attribute indicates that user input is required on the element.

## Project Setup
```sh
npm install
# Compile and Hot-Reload for Development
npm run dev 
# Type-Check, Compile and Minify for Production
npm run build
```
