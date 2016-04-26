
// add Marin to main-container as you scroll from top
$(window).on( 'scroll', function(){

  var scrollDownHeightValue = $(this).scrollTop();

  console.log(scrollDownHeightValue)

  if ( scrollDownHeightValue > 124){
    $('.navbar').css({
      'borderBottom': '25px solid #E0E0E0',
      '-webkit-box-shadow': 'none',
      'box-shadow': '#E0E0E0'
    })
  }
  if ( scrollDownHeightValue < 124) {
    $('.navbar').css({'borderBottom': '0px'})
  }
});
