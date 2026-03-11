## Lets test some `.md` !

[MDX example](https://jfcere.github.io/ngx-markdown/cheat-sheet#tables)

## Headers

```no-highlight
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Horizontal Rules

```
---

---

---
```

---

---

---

## Emphasis

```
**This is bold text**

_This is italic text_

~Strikethrough~
```

**This is bold text**

_This is italic text_

~Strikethrough~

## Blockquotes

```
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
```

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

## Lists

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

4. You can use sequential numbers...
5. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar

## Code and Syntax Highlighting

````
Inline `code` has `back-ticks around` it.

```
No Language indicated, so no syntax highlighting.
```

```ts
// ts
var foo = function (bar) {
  console.log(foo(5));
  return bar++;
};

```

```html
<!-- html -->
<markdown [src]="'../assets/md/test.md'"> </markdown>
```

```scss
// css
.myclass {
  width: 100%;
}
```
````

Inline `code` has `back-ticks around` it.

```
No Language indicated, so no syntax highlighting.
```

```ts
// ts
var foo = function (bar) {
  console.log(foo(5));
  return bar++;
};
```

```html
<!-- html -->
<markdown [src]="'../assets/md/test.md'"> </markdown>
```

```scss
// css
.myclass {
  width: 100%;
}
```

## Tables

Tables aren't part of the core Markdown spec, but they are part of GFM and _Markdown Here_ supports them. They are an easy way of adding tables to your email -- a task that would otherwise require copy-pasting from another application.

```no-highlight
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

## Links

There are two ways to create links.

```no-highlight
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://google.com
[1]: http://google.com
[link text itself]: http://www.google.com

## Images

```no-highlight
Inline-style:
![alt-text](https://octodex.github.com/images/stormtroopocat.jpg 'The Stormtroopocat')

Reference-style:
![alt-text][cat-pic]

[cat-pic]: https://octodex.github.com/images/dojocat.jpg 'The Dojocat'
```

Inline-style:
![alt-text](https://octodex.github.com/images/stormtroopocat.jpg 'The Stormtroopocat')

Reference-style:
![alt-text][cat-pic]

[cat-pic]: https://octodex.github.com/images/dojocat.jpg 'The Dojocat'

## How to include Angular component example

```html
<!-- example(button-overview) -->

<!-- example({
    "example": "wizard-example",
    "height": "700"
}) -->
```
