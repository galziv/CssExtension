# CssExtension
js css extension for relative properties

###How to use
to make a div element with height of 40% from window and width of 80% from element with id 'someElement':
<br/>
```html
<div csse-style="height: window|40%;width: #someElement|80%;"></div>
```

The syntax is similar to css. Specify the property then ':' {selector|window|screen}|}{percentage}
<br/>
And in the document ready event call 
```javascript
csse.bootstrap()
```
