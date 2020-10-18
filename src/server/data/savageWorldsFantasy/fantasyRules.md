
# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!

This is a very nice editor! 

```javascript
const toast = 'asd';

```



## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
```js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
```
{table: tableName}

Pretty neat, eh?

## Tables?

| Feature            | Support       |
| :----------------- | :------------ |
| tables             | ✔             |
| alignment          | ✔             |
| wewt               | ✔             |
| This is quite cool | Or maybe not? |
|                    |               |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
