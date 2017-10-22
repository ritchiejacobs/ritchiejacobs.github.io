---
layout: post
title: "Constuctor vs ngOnInit"
date: 2017-10-22 00:00:00 +0200
tags: Angular
---

If you are just starting out with Angular 2 it is not always clear what the difference is
between the constructor and ngOnInit methods.

In this post we're going more into detail when to use `constructor` and `ngOnInit`.

## Constructor
Lorem ipsum dolor sit amet, ad vis adhuc periculis principes, dicunt quodsi inermis ei vix, eos ut elitr nominavi suscipit. At usu quod possit. Vidisse commune patrioque mel ut, ea numquam accusata per. Novum graeco ad vel.

Putant habemus intellegam eam ne, his ex antiopam ocurreret, quo ut legendos cotidieque. Eu justo melius pro. Ut est porro tractatos, ne sit agam ocurreret.

```
var Element = (function() {
  function Element() {}
  Object.defineProperty(Element.prototype, 'className', {
    get: function() {
      return this._class;
    },
    set: function(name) {
      this._class = 'todd-' + name;
    },
    enumerable: true,
    configurable: true,
  });
  return Element;
})();
```

## ngOnInit
Lorem ipsum dolor sit amet, ad vis adhuc periculis principes, dicunt quodsi inermis ei vix, eos ut elitr nominavi suscipit. At usu quod possit. Vidisse commune patrioque mel ut, ea numquam accusata per. Novum graeco ad vel.

Putant habemus intellegam eam ne, his ex antiopam ocurreret, quo ut legendos cotidieque. Eu justo melius pro. Ut est porro tractatos, ne sit agam ocurreret.

```
@Component({...})
export class DateComponent {
  private _dateObject: Date;

  @Input() set date(date: number) {
    // assuming `date` is something like 1506439684321
    this._dateObject = new Date(date);
  }

  get date() {
    return `The date is ${this._dateObject}`;
  }
}
```

Putant habemus intellegam eam ne, his ex antiopam ocurreret, quo ut legendos cotidieque. Eu justo melius pro. Ut est porro tractatos.
