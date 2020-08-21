function isFloat(num) {
  if (num % 1 == 0) {
    return false;
  } else {
    return true;
  }
}
function verifNCasas(num) {
  const maxCasas = 50;
  if (num > maxCasas) {
    $("#casas").val(maxCasas);
    num = maxCasas;
    alert(
      "A precisão de casas não deve ultrapassar " +
        maxCasas +
        ". O valor foi automáticamente arredondado."
    );
  }
  return num;
}

function toComma(num) {
  let conv = String(num).replace(".", ",");
  return conv;
}

$("#calcForm").submit((e) => {
  e.preventDefault(); //Avoid page reload when submit this form.
  const op = Number($("#cat-op").val());
  const adj = Number($("#cat-adj").val());
  let nCasas = Number($("#casas").val());

  // The API doesn't accept float numbers, here's the verify.
  if (!isFloat(op) && !isFloat(adj) && !isFloat(nCasas)) {
    nCasas = verifNCasas(nCasas);

    // Details about the API request.
    var settings = {
      url: "https://atlas-231814.appspot.com/calcula",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ cat_op: op, cat_adj: adj }),
    };

    $.ajax(settings)
      .done((response) => {
        // If nothing get wrong with API.
        $(".notice").animate({ opacity: 0 }, 250);
        setTimeout(() => {
          if ($("#virgula").is(":checked")) {
            // If point to comma is checked, convert it.
            let toConvert = Number(response.hip).toFixed(nCasas);
            $("#result").text(toComma(toConvert));
          } else {
            $("#result").text(Number(response.hip).toFixed(nCasas));
          }
        }, 250);
        // Create an animation of fadeIn when it shows the result.
        $(".notice").animate({ opacity: 1 }, 500);
      })
      .fail(() => {
        // If something get wrong with API.
        alert(
          "Algo deu errado com a API, por favor contate o administrador do sistema."
        );
      });
  } else {
    alert("Os valores inseridos devem ser inteiros.");
  }
});
