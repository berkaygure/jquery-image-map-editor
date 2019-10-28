# jQuery Image Map Editor
It's a small plugin to map an image. You can use for mark area(s) over image.

### How is it work?
It wraps your image with SVG element and you draw `polygon`, `circle` and `rectangle` elements over the SVG. 
The plugin's does'nt have an user interface it only provides methods to manage drawing.

### How to use?

Let's say we've an image with demo id.

```html
<img src="/a-nice-image.png" id="demo" />
```
This will initialize plugin.
```javascript
$('#demo').imageMapEditor();
```
To start drawing we have to add shape.

```html
<button id="addNewPolygon">
    Add Polygon
</button>
```

```javascript
$('#addNewPolygon').click(function () {
  $('#demo').imageMapEditor('addShape', {
      type: 'Polygon'
  });
})
```
Now, you can start draw polygon with click to over image.
