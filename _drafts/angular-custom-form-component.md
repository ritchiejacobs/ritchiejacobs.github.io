---
layout: post
title: Creating a custom form component in Angular
description: How to create a custom form component for an Angular application.
tags: Angular
---

One of the most common elements when building an Angular application are form fields. Your users need to provide his data to use all the functionalities of your app. These fields will be used on multiple pages, modals, footers, ... and will be in most cases similar in appearance and functionality. So it makes sense to harness one of Angular's core features to create these controls: reusable components.

But how do we hook up this custom component to our form? We cannot access the input field directly since it is wrapped by the host component and maybe other elements, depending on your design. In this article we will discuss how to create a custom form control and hook it up to a Reactive form.

*Note: for this article you will need to have some experience with Reactive Forms. You can read up on Reactive Forms in the [official Angular documentation](https://angular.io/guide/reactive-forms).*

**DEMO:** [Custom Reactive Form Component example](https://stackblitz.com/edit/angular-reactive-form-component)


## Hooking up the ControlValueAccessor

The first thing we will need to do is hook up the `ControlValueAccessor` interface to our newly created component. By implementing this interface we create a bridge between our components DOM and the Angular forms API.

```ts
@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements ControlValueAccessor {
  constructor() {}

  writeValue() {}

  registerOnChange() {}

  registerOnTouched() {}
}
```

Inside the constructor we inject `NgControl` to bind the `FormControl` object to the DOM element:

```ts
constructor(
  @Self()
  @Optional()
  private ngControl: NgControl
) {
  if (this.ngControl) {
    this.ngControl.valueAccessor = this;
  }
}
```
Note that we add two decorators to the dependency:

- `@Self()`: We want to retrieve the dependency only from the local injector, not from the parent or ancestors.
- `@Optional()`: We want to be able to use the component without a form, so we mark the dependency as optional.


## Writing form values to the view

We have now created a connection between the `FormControl` and the custom component. But this is not yet reflected in the template of our component.

The forms API will call the `writeValue()` method every time the form model is updated (for example by using `setValue()`). So we use this hook to update the input `value` property:

```ts
value: any = '';

writeValue(value: any): void {
  this.value = value;
}

```

```html
<input ... [value]="value" ... />
```

The same needs to be done for the disabled state. The forms API will trigger the `setDisabledState()` method when the control status changes.

```ts
@Input() disabled: boolean;

setDisabledState(isDisabled: boolean): void {
  this.disabled = isDisabled;
}
```

```html
<input ... [disabled]="disabled" ... />
```

## Updating the form with view changes

Likewise, we'll also have to inform the model when the view is updated.

To do this we will have to add the `registerOnChange` method to our component class. Inside this method we will store the callback function as an internal method. This callback function is used by the Forms API to update the form model when values are updated in the view. We can now call this method with our custom component by triggering `this.onChange`.

```ts
registerOnChange(fn: any): void {
  this.onChange = fn;
}

private onChange() {}
```

Every time the user changes the `value` of an `<input>` element an `InputEvent` is fired. We will listen for this event in the component template and trigger that `onChange` event, which in turn will trigger the stored function to update the form model.

```html
<input
  ...
  (input)="onChange($event.target.value)"
  ...
/>
```

If your form is configured to update on `blur` instead of the default `change` you will have to add the `registerOnTouched` method as well:

```ts
registerOnChange(fn: any): void {
  this.onChange = fn;
}

registerOnTouched(fn: any): void {
  this.onTouched = fn;
}

private onChange() {}
private onTouched() {}
```
```html
<input
  ...
  (input)="onChange($event.target.value)"
  (blur)="onTouched()"
  ...
/>
```

Note: When using `<input type="text">` the `(change)` event will only be fired when the element loses focus. The `(input)` event is fired instantly when the value changes. Make sure to check what event is best to be used if you are using a different element.

## Conclusion

We have now created our own custom form component by wrapping an input element and implementing the `ControlValueAccessor` class. Whenever this component is used inside a Reactive Form a bridge will be established with the Forms API to keep the view and model in sync.

Make sure to check the [Stackblitz demo](https://stackblitz.com/edit/angular-reactive-form-component) to get a better overview on how to setup a custom form control in your own Angular projects.
