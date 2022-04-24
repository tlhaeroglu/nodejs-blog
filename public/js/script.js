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
        method: "GET";
        location.reload();
      },
    });
  });
});

/*$('.delete').die('click').click( (e) =>{
    e.preventDefault();
    let id = e.target.getAttribute('data-target');

    

    page.isLoaded = true;
})*/
