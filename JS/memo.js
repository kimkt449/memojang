const saveBtn = document.querySelector(".memojang_input_btn");
const memojangText = document.querySelector(".memojnag_input_text");
const savedMemojang = document.querySelector(".saved_memojang");
let memos = [];

function localSaveMemo() {
  localStorage.setItem("memo", JSON.stringify(memos));
}

function deleteMemo(savedMemoBox) {
  const box = savedMemoBox.target.parentElement;
  box.remove();
  memos = memos.filter((item) => item.id !== parseInt(box.id));
  localSaveMemo();
}

function paintMemo(memoTextObj) {
  const savedMemoPart = document.createElement("div");
  const savedMemoBox = document.createElement("div");
  savedMemoBox.classList.add("box");
  savedMemoBox.classList.add("savebox");
  savedMemoBox.innerText = memoTextObj.text;
  savedMemoPart.id = memoTextObj.id;
  savedMemojang.appendChild(savedMemoPart);
  savedMemoPart.appendChild(savedMemoBox);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.classList.add("delete_btn");
  savedMemoPart.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", deleteMemo);
}

function saveMemo(event) {
  event.preventDefault();
  const memoText = memojangText.value;
  memojangText.value = "";
  const memoTextObj = {
    text: memoText,
    id: Date.now(),
  };
  paintMemo(memoTextObj);
  memos.push(memoTextObj);
  localSaveMemo();
}

saveBtn.addEventListener("click", saveMemo);

const savedMemo = localStorage.getItem("memo");

if (savedMemo) {
  const parsedMemo = JSON.parse(savedMemo);
  memos = parsedMemo;
  memos.forEach(paintMemo);
}
