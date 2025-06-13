const input1 = document.getElementById("mysearch");
function mysearch() {
  let changecase = input1.value.toUpperCase();
  // console.log(changecase);
  let list = document.getElementById("myul");
  let listiems = list.getElementsByTagName("li");

  for (let i = 0; i < listiems.length; i++) {
    let x = listiems[i].getElementsByTagName("a")[0];
    x.textContent.toUpperCase().indexOf(changecase) > -1
      ? (listiems[i].style.display = "")
      : (listiems[i].style.display = "none");
  }
}
