var buttons = document.querySelectorAll(".delete");
var clicked = false;
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    var id = event.target.getAttribute("data-target");
    console.log("girdim");
    $.ajax({
      url: `/${id}`,
      method: "DELETE",
      success: function (data) {
        console.log(data);
        location.reload();
      },
    });
  });
});

var result = document.getElementById("result");
var search = document.getElementById("search");

result.addEventListener('click', () =>{
  location.href = "?search=" + search.value;
})

var page =document.querySelectorAll(".page");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

page.forEach((p) =>{
  p.addEventListener('click', (e) =>{
    location.href = "?search=" + params.search + "&page=" + e.target.innerHTML;
  })
})

//console.log(window.location.search);



console.log(params.search);
console.log(params.page);

