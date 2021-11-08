$(document).ready(function () {
  // insert class in the first item of product
  $("#id_estoque-0-produto").addClass("clProduto");
  $("#id_estoque-0-quantidade").addClass("clQuantidade");

  $("#add-item").click(function (e) {
    e.preventDefault();
    var count = $("#estoque").children().length;
    var templateMarkup = $("#item-estoque").html();
    var compiledTemplate = templateMarkup.replace(/__prefix__/g, count);
    $("div#estoque").append(compiledTemplate);
    //update form count
    $("#id_estoque-TOTAL_FORMS").attr("value", count + 1);

    //some animate to scroll to view our new form

    $("html, body").animate(
      {
        scrollTop: $("#add-item").position().top - 200,
      },
      800,
    );

    $("#id_estoque-" + count + "produto").addClass("clProduto");
    $("#id_estoque-" + count + "quantidade").addClass("clQuantidade");
  });
});

let estoque, saldo, campo, quantidade;

$(document).on("change", ".clProduto", function () {
  let pk = $(this).val();
  let url = "/produto/" + pk + "/json/";

  $.ajax({
    url: url,
    type: "GET",
    success: function (response) {
      estoque = response.data[0].estoque;
      console.log(estoque);
      campo = this.attr("id").replace("produto", "quantidade");
      //remove the value of quantity field
      $("#" + campo).val("");
    },
    error: function (xhr) {},
  });
});

$(document).on("change", ".clQuantidade", function () {
  quantidade = $(this).val();
  saldo = Number(estoque) - Number(quantidade);
  campo = $(this).attr("id").replace("quantidade", "saldo");
  $("#" + campo).val(saldo);
});
