const fetchNBAData = function () {
  let input = $("#teamName").val();

  $.get(`teams/${input}`, function (teamData) {
    $("#players-grid").empty();
    this.source = $("#players").html();
    this.template = Handlebars.compile(this.source);
    this.newHTML = this.template({ teamData });
    $("#players-grid").append(this.newHTML);
  });
};
