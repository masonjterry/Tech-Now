$(document).ready(function() {
  $(".save-btn").on("click", function(e) {
    e.preventDefault();
    let click = e.target.value;
    console.log(click);

    $.post(`/api/saved/${click}`, function(data) {

    }).then(function(result) {
      
    });

  });

  $(".note-btn").on("click", function(e){
    e.preventDefault();
    let click = e.target.value;
    console.log(click);
  });
});
