# Learning basic CSS Animation principles
>Just a simple learning project that is based on the series of the CSS Animation tutorials of the DevTips YouTube Channel.

By giving some elements an animation we try to make them alive and give some movement.

CSS offers two mains ways of animating elements
1. Transition.
2. Animation combined with Keyframes.

## Transition

### How to animate
Syntax of the CSS transitions is written like following:
```css
.element{
    transition: [property][duration][ease][delay];
}
```
Here we access the element using the CSS class selector. We can access the HTML element in any other valid way using CSS selector, e.g. `#app{}` to access the element that has an `id="app"` attribute. 

Let's take a look at each parameter of the `transition` property:
* property - what is gonna be animated, e.g. height, width, color, opacity etc.
* duration - how long does the transition last.
* ease - how is transition distributed accross time, e.g. we want our animation to start slowly and continiously speed up.
* delay - how long is a delay before the transition a.k.a animation in this case is initiated or started.

The simple example would look like following:
```css
.element{
    transition: opacity 500ms ease-in-out 1s;
}
```

To animate several properties using transition, the sets of values of the `transition` property should be comma-separated:
```css
.element{
    transition: [property][duration][ease][delay], [property][duration][ease][delay], ...;
}
```
The last `delay` property may be omitted and will cause no animation delay.

### What to animate

There are [**animatable**](http://oli.jp/2010/css-animatable-properties/) and **non-animatable** properties. The **non-animatable** properties just don't make any sense to be animated, e.g. `display`, `font-family`, `position`.

**Performant** (to be animated) properties are: position, scale, rotation, opacity. These elements must not be re-rendered and don't cause layout reflow.

### What triggers the animation
1. Hover pseudo class.
2. Class changes.

### Practical example
Let's create a simple HTML page that contains a `div` element styled which results in a simple pink box.
```html
<!DOCTYPE html>
<html>
    <head>
        <title>CSS Transition</title>
        <link href="styles.css" rel="stylesheet"/>        
    </head>
    <body>
        <div id="box"></div>
    </body>
</html>
```

```css
body{
    padding: 20px;
}

#box{
    width: 100px;
    height: 100px;
    background: violet;
    display: inline-block;
}
```

We can change the box by moving it 100 pixels down right and rotating it 45 degrees by modifying corresponding css:
```css
#box{
    width: 100px;
    height: 100px;
    background: violet;
    display: inline-block;
    transform: translate(100px, 100px) rotate(45deg);
}
```

This results into already modified css-element when it's got rendered. To animate it, lets add a trigger using two different ways.

The animation a.k.a transition happens only when something gets changed. That means that the css `transition` property must sit on the source element (.box) and wait for the corresponding property to be changed and the destination/end style (the property that is changing) must be contained in a separate/destination class (.box:hover).

#### Hover Pseudo Class Trigger

```css
#box{
    width: 100px;
    height: 100px;
    background: violet;
    display: inline-block;
    transition: transform 1s ease-in-out 1s;
}

#box:hover{
    transform: translate(100px, 100px) rotate(45deg);
}
```

#### Class Change Trigger
Lets add another html element.

```html
<div id="box1"></div>
```

```css
#box1{
    width: 100px;
    height: 100px;
    background: violet;
    display: inline-block;
    transition: transform 1s ease-in-out;
}

#box1.hovered{
    transform: translate(100px, 100px) rotate(30deg);
}
```

We use some javascript code that adds an event listener to our DOM element. When we move the mouse over this element, the event listener will toggle the ``hovered` css class to the classlist of this element and therefore will trigger the transition of the `transform` property.

```javascript
    document.querySelector('#box1').addEventListener('mouseover', (e) => {
    const box = e.target;
    box.classList.toggle('hovered');
})
```

## Animation Property & Keyframes
Animation property and keyframes are coupled.

### Keyframes 
* define what is happening, how the style is changing
* is like "what the animation does"
* do not have selectors
* are in the root of the css
* are not nested inside of anything

#### Syntax
```css
@keyframes [name]{
    from{
        [styles];
    }
    to{
        [styles];
    }
}
```

The animation happens independently of the current state unlike the transition where the animation happens only if some properties change.

Moreover, we can define more "key frames" or "steps" of our animation by specifying procentual values instead of `from` and `to` keywords.

```css
@keyframes [name]{
    0%{
        [styles];
    }
    10%{
        [styles]; 
    }
    ...
    100%{
        [styles];
    }
}
```

### Animation
* define how the animation is happening
* is like "how the animation" is done
* is inside of a selector

#### Syntax
```css
.element{
    animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];
}
```

### Triggering
The best way to trigger animation is to move the `animation` property to a separate CSS class and toggle it when required using JavaScript.

```javascript
const box = document.querySelector('.box');
box.addEventListener('click', (e) => {
    box.classList.toggle('box-animation');
});
```

```css
.box{
    height: 100%;
    width: 100%;
    background-color: violet;
}

.box-animation{
    animation-name: box-animation;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-iteration-count: infinite;
}
``` 
> The animation properties are specified explicitly here, however this can be shorthanded and written in one line.