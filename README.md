# jschan-api-sdk

Helper package to handle requests to a jschan api instance.

# How to use

`npm install ussaohelcim/jschan-api-sdk`

```js
const { jschan } = require('jschan-api-sdk')
const api = new jschan.api("https://fatchan.org")
```
```ts
import { jschan } from "jschan-api-sdk";
const api = new jschan.api("https://ptchan.org")
```

```js
const sdk = new jschan.api("https://ptchan.org")
const post = {
	message:"Hello.",
	thread:0,
}
sdk.postThread("br",post)//200
//Reply the thread 0 from "br", with the message "Hello."
```

```js
const sdk = new jschan.api("https://ptchan.org")
const post = {
	message:"Hello, /br/!.",
	thread:null,
	file: createReadStream("image.jpg")
}
sdk.postThread("br",post)//200
//Creates a new thread with the image
```