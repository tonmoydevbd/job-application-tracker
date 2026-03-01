1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans:
getElementById -> It only takes element's id name as argument. The id name must be a string and unique. It returns null if no element found. It selects one unique element.

getElementsByClassName -> It takes element's class name as an argument. It selects all elements with a specific class name. it gives htmlCollection.

querySelector -> It takes css selector as argument. It selects the first element that match a css selector.

querySelectorAll -> It takes css selector as argument. It selects all elements that match the css selector. It returns nodeList.


--------0--------


2. How do you create and insert a new element into the DOM?

Ans: 
First, creat an element using document.createElement('tagName'); 
Then, add content to it using .innerHTML = 'content'; or .innerText = 'content'
Finally, append it to an existing element using .appendChild() method.

Example:
html code:
<ul></ul>

JavaScript code:
const liEl = document.createElement('li');
liEl.innerText = 'This list item created from js.';
document.querySelector('ul').appendChild(liEl);


--------0--------


3. What is Event Bubbling? And how does it work?

Ans:
Event bubbling is when an event happens on an element, it fires event listener, start from the target element then parent element, grandparent element and all the way up to the document.

Example:
html code:
<div>
  <article>
    <button>Click</button>
  </article>
</div> 

js code:
document.querySelector('div').addEventListener('click', ()=> console.log('div tag clicked!'));
document.querySelector('article').addEventListener('click', ()=> console.log('article tag clicked!'));
document.querySelector('div').addEventListener('click', ()=> console.log('button tag clicked!'));


Here the target is the button element. So first console logs 'button tag clicked!'. Then it bubbles to its parrent and console logs 'article tag clicked!'. Then bubbles to div element and console logs 'div tag clicked!'. At last bubbles up to document.

--------0--------

4. What is Event Delegation in JavaScript? Why is it useful?

Ans: 
Event Delegation is when a single event listener is used on a parent element to manage events for all its child elements rather than add a separate listener to each child.
It is useful because it helps to write cleaner code, better performance, added elements dynamically.


--------0--------


5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: 
preventDefault() -> This method is used to stop the browser's default behavior of an element. It doesn't stop event bubbling.

stopPropagation() -> This method is used to stop the event from bubbling up the dom tree. It doesn't stop browser's default behavior.