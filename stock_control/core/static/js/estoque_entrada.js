$(document).ready(function () {
  // insert class in the first item of product
  $("#id_estoque-0-produto").addClass("clProduto");
  $("#id_estoque-0-quantidade").addClass("clQuantidade");

  $("#id_estoque-0-saldo").prop("type", "hidden");

  $('label[for="id_estoque-0-saldo"]').append(
    '<span id ="id_estoque-0-saldo-span" class ="lead" style="padding-left: 15px;"></span>',
  );

  $("#add-item").click(function (e) {
    e.preventDefault();
    var count = $("#estoque").children().length;
    var templateMarkup = $("#item-estoque").html();
    var compiledTemplate = templateMarkup.replace(/__prefix__/g, count);
    $("div#estoque").append(compiledTemplate);
    //update form count
    $("#id_estoque-TOTAL_FORMS").attr("value", count + 1);

    $("#id_estoque-" + count + "-saldo").prop("type", "hidden");

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

let estoque, saldo, campo, campo2, quantidade;

$(document).on("change", ".clProduto", function () {
  let pk = $(this).val();
  let url = "/produto/" + pk + "/json/";
  let self = $(this);

  $.ajax({
    url: url,
    type: "GET",

    success: function (response) {
      estoque = response.data[0].estoque;
      campo = self.attr("id").replace("produto", "quantidade");
      //remove the value of quantity field
      $("#" + campo).val("");
    },
    error: function (xhr) {},
  });
});

$(document).on("change", ".clQuantidade", function () {
  quantidade = $(this).val();
  saldo = Number(quantidade) + Number(estoque);
  campo = $(this).attr("id").replace("quantidade", "saldo");
  $("#" + campo).prop("type", "hidden");
  $("#" + campo).val(saldo);
  campo2 = $(this).attr("id").replace("quantidade", "saldo-span");
  $("#" + campo2).text(saldo);
});
