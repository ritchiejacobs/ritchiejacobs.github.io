---
layout: post
title: Using the BEM methodology in Angular
description: In this article we’ll look into a solution to implement the BEM methodology into an Angular application.
date: 2019-05-05
tags: Angular
---

In this article we'll look into a solution to implement the BEM methodology into an Angular application. BEM (Block-Element-Modifier) is a CSS naming methodology that attempts to speed up and simplify web development by dividing the user interface into separate blocks.

You might wonder if it is still necessary to use BEM since Angular allows scoped styling. By default Angular will encapsulate the components CSS into the view so other components are not affected by its styling. Personally I find that it is still very useful for naming the elements of a component and to easily apply certain styling based on the provided input.

## Getting started

We'll build a `<app-button>` component that you can use throughout your application. You will be able to set a `color` so we can create a save and cancel button based on your application's theme colors. Provide an alternative look with the `outline` property. Or prevent a user from saving a form with the `disabled` property.

We start with the basic setup of the component and create our `@Input()` properties:

```js
import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent  {
  @Input() color: 'primary' | 'success' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() outline: boolean = false;

  constructor() {}
}
```

- Color: Show a specific border and background color based on your theme colors.
- Outline: Show only a colored border, make the background transparent.
- Disable: Show the button in a greyed out state.

Using these Input properties we can quickly add buttons with various colors and states across our application.

## Building the class map

Next up we'll set up some functionality to build a class map. This map will contain a list of Modifier classes to apply to our Block element. To do this we utilise the [NgClass](https://angular.io/api/common/NgClass) directive. With this directive we can conditionally add or remove CSS classes on HTML elements.

The `updateClassMap()` method will create an object which will contain all the CSS classes to apply to our Block element. NgClass will evaluate this object. If the value of a key is truthy the class will be added, otherwise the class will be removed.


```js
rootClass: string;
classMap: any;

constructor(private elementRef: ElementRef) {}

ngOnInit() {
  this.rootClass = this.elementRef.nativeElement.tagName.toLowerCase(); // returns 'app-button'
  this.updateClassMap();
}

updateClassMap() {
  this.classMap = {
    [`${this.rootClass}`]: true,
    [`${this.rootClass}--${this.color}`]: !!this.color, // Add this class if true
    [`${this.rootClass}--outline`]: this.outline, // Add this class if true
    [`${this.rootClass}--disabled`]: this.disabled, // Add this class if true
  };
}
```

The first key is our root class, we always need it so we set this to `true`. Because I want my root class to be exactly the same as my component selector I get a reference to the components `tagName` and store it in a variable. This is entirely optional, you can just fill in a string if you want to user another class name.

Notice I also make use of ES6 [string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). This makes it a lot easier to use variables in strings. It is especially useful for the color modifier, which requires the color name to be in the class name (e.g. `.app-button--success`).

We'll call the `updateClassMap()` method in the `ngOnInit` lifecycle hook. This ensures that all Input properties are set before we create the object. We can now add the classes in the component template:

```
<button [ngClass]="classMap"><ng-content></ng-content></button>
```

## Updating the view

For simplicity's sake I update the `classMap` by calling `updateClassMap()` on every `ngOnChanges` lifecycle. This means that every time an `@Input()` property is updated we update the classes on our container element as well.

```js
ngOnChanges() {
  this.updateClassMap();
}
```

Alternatively you could call this method using an input property setter if you have a lot of unrelated `@Input()` properties.

## Adding the styling

What remains is to add the component's styling for the block class and each modifier. I prefer to use [SASS](https://sass-lang.com/) since this goes nice together with BEM using selector nesting, variables, etc...

```scss
$component: '.app-button';

#{$component} {
  // Block styling

  &--primary {
    // Color modifier styling
  }

  &--disabled {
    // Disabled modifier styling
  }

  &--outline {
    // Outline modifier styling
  }
}
```

You can check out the full styling on the [Stackblitz demo](https://stackblitz.com/edit/angular-bem-components?file=src%2Fapp%2Fbutton%2Fbutton.component.scss) page.

## Using the component

You now use the button component in your application and quickly apply various states and combinations:

```
// Outlined primary button
<app-button color="primary" [outline]="true">Request a demo</app-button>

// Disabled save button
<app-button color="success" [disabled]="true">Save</app-button>
```

## Demo

<iframe src="https://stackblitz.com/edit/angular-bem-components?ctl=1&embed=1&file=src/app/button/button.component.ts&hideExplorer=1&hideNavigation=1&view=preview"></iframe>
