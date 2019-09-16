const { fromEvent, of, from } = rxjs
const { scan, delay, throttleTime, map, filter, last } = rxjs.operators

console.log(rxjs.operators)

const display = document.querySelector("#display")

fromEvent(document.querySelector("#hello-button"), "click").subscribe(e => display.innerText = "Hello!")

fromEvent(document.querySelector("#count-button"), "click")
	.pipe(scan(count => count + 1, 0))
	.subscribe(count => display.innerText = `${count}`)

fromEvent(document.querySelector("#interval-button"), "click")
	.pipe(
		delay(500),
		scan(str => str + "o", "F")
	)
	.subscribe(str => display.innerText = str)

fromEvent(document, "mousemove")
	.pipe(
		throttleTime(1000),
		map(event => event.clientX),
		scan((count, clientX) => count + clientX, 0)
	)
	.subscribe(count => console.log(count))

of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
	.pipe(
		filter(v => v % 2 === 0)
	)
	.subscribe(v => console.log(v))

from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	.pipe(
		scan((sum, v) => sum + v, 0),
		last()
	)
	.subscribe(sum => console.log(`Sum: ${sum}`))

fromEvent(document.querySelector("#text-input"), "keydown")
	.pipe(
		delay(0)
	)
	.subscribe(e => display.innerText = e.target.value)
