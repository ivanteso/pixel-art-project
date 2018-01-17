var pixelTable = $("#pixel_canvas");

// generic function made to eventually delete a previous grid already present on the page once the "submit" button is clicked
function deleteGrid() {
  pixelTable.children().remove();
}

// function for create the grid
function makeGrid() {
  const tableHeight = $("#input_height");
  const tableWidth = $("#input_width");
  const height = tableHeight.val();
  const width = tableWidth.val();
  const penToggle = $("button#penMode").attr("class");
  const bucketToggle = $("button#bucketMode").attr("class");

  for (let i = 0; i < height; i++) {
    const row = pixelTable.append("<tr></tr>");
    for (let j = 0; j < width; j++) {
      const cell = $("tr")
        .last()
        .append("<td></td>");
    }
  }

  // once the grid is made, it's possible to use a normal "pen mode" and select a left and right click color to paint the cells. It is also possible to delete a single cell double clicking on it
  $("td").click(function() {
    var colorOne = $("#colorPickerLeft").val();
    $(this).css("background-color", colorOne);
  });

  $("td").contextmenu(function() {
    event.preventDefault();
    var colorTwo = $("#colorPickerRight").val();
    $(this).css("background-color", colorTwo);
  });

  $("td").dblclick(function() {
    $(this).css("background-color", "rgb(255, 255, 255)");
  });
}

// draw a 20x20 grid by default once the page is loaded and initialize also the "fill", "delete" and "save" functions"
$("document").ready(function() {
  makeGrid();

  // "fill mode" button fill the entire canvas with the L click colour

  $("#bucketMode").click(function() {
    event.preventDefault();
    var colorOne = $("#colorPickerLeft").val();
    $("td").css("background-color", colorOne);
  });

  // "delete canvas" mode erase the whole table
  $("#deleteMode").click(function() {
    event.preventDefault();
    $("td").css("background-color", "rgb(255, 255, 255)");
  });

  // "save canvas" export the table and save it on the PC as image file (jpg)
  $("#save").click(function(event) {
    event.preventDefault();
    html2canvas($("#pixel_canvas"), {
      onrendered: function(canvas) {
        let link = document.getElementById("link");
        link.setAttribute("download", "your_canvas.jpg");
        link.setAttribute( "href", canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream"));
        link.click();
      }
    });
  });

  // clicking on "submit" delete the previous canvas and create a new 20x20 table
  $("#submit").click(function() {
    event.preventDefault();
    deleteGrid();
    makeGrid();
  });
});
