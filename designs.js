var pixelTable = $("#pixel_canvas");

//funzione generica per cancellare una griglia eventualmente presente al caricamento pagina o quando si schiaccia il tasto "submit"

function deleteGrid() {
  pixelTable.children().remove();
}

// funzione per creare la tabella

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

  // una volta creata la tabella, si può usare la modalità "penna" con colori abbinati a L e R click sulla cella e "cancella" (doppio click) di default

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

//carica una griglia 20x20 di default al caricamento della pagina, inizializzando anche le funzioni "fill", "delete" e "save"

$("document").ready(function() {
  makeGrid();

  // il tasto "fill mode" colora tutto il canvas con il colore abbinato al L click

  $("#bucketMode").click(function() {
    event.preventDefault();
    var colorOne = $("#colorPickerLeft").val();
    $("td").css("background-color", colorOne);
  });

  // il tasto "delete canvas" resetta il canvas (colora tutto di bianco)

  $("#deleteMode").click(function() {
    event.preventDefault();
    $("td").css("background-color", "rgb(255, 255, 255)");
  });

  //il tasto save esporta il contenuto della tabella in un file immagine png

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

  //cliccando sul tasto "submit" si cancella la griglia precedente e ne ricarica una vuota sempre di dimensioni 20x20

  $("#submit").click(function() {
    event.preventDefault();
    deleteGrid();
    makeGrid();
  });
});
