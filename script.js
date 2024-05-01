// select the item element
const item = document.querySelector('.item');

// attach the dragstart event handler
item.addEventListener('dragstart', dragStart);

// handle the dragstart
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);

  setTimeout(() => {
    e.target.classList.add('hide');
  }, 0);
}

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter)
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);
});

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.preventDefault();
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.preventDefault();
  e.target.classList.remove('drag-over');

  // get the draggable element
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  // add it to the drop target
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove('hide');
}

// global event listeners for the document
document.addEventListener('dragenter', dragEnterDocument);
document.addEventListener('dragover', dragOverDocument);
document.addEventListener('dragleave', dragLeaveDocument);
document.addEventListener('drop', dropOutside);

// Event handlers for document-level drag and drop
function dragEnterDocument(e) {
  e.preventDefault();
}

function dragOverDocument(e) {
  e.preventDefault();
}

function dragLeaveDocument(e) {
  // If the drag leaves the document, remove the drag-over class from all boxes
  boxes.forEach(box => {
    box.classList.remove('drag-over');
  });
}

function dropOutside(e) {
  e.preventDefault();
  // If the drop happens outside any box, remove the drag-over class from all boxes
  boxes.forEach(box => {
    box.classList.remove('drag-over');
  });

  // Also display the draggable element (if it's hidden)
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);
  draggable.classList.remove('hide');
}
