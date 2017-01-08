$("div.nav-button.popin-button-header").on("click", function() {
  $( "div.ajax-container" ).toggleClass( "shade" );
  $("div.ajax-container header h1").toggleClass("shadeText");
});
