$("div.mask.mask-inner ul.list li").on("click", function() {
  console.log('clicked!')
  $('.main-header popin-header animation-start animation-start-timeout displayed').removeClass('displayed');
});
