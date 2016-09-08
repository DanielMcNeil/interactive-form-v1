'use strict()';

// elements to initially hide.  They will appear based on selections, or if the user has JavaScript disabled.
$('label[for=size]').parent().hide();
$('#colors-js-puns').hide();

// show job role input element if 'other' is choosen from the Job Role select element
$('#title').change(function(){
  if ($(this).val() === "other") {
    $('#otherRole').show();
  } else {
    $('#otherRole').hide();
  }
});

// insert appropriate code block into the t-shirt color select element and show size and color
$('#design').change(function(){
  if ($(this).val() === 'js puns') {
    $('.jspun').show();
    $('.iheartjs').hide();
    $('#colorSelectBoxItText').prop('data-val','cornflowerblue');
    $('#colorSelectBoxItText').html('CornFlower Blue (JS Puns shirt only)');
    $('label[for=size]').parent().show();
    $('#colors-js-puns').show();
  } else if ($(this).val() === 'heart js') {
    $('.jspun').hide();
    $('.iheartjs').show();
    $('#colorSelectBoxItText').prop('data-val','tomato');
    $('#colorSelectBoxItText').html('Tomato (I &#9829; JS shirt only)');
    $('label[for=size]').parent().show();
    $('#colors-js-puns').show();
  } else {
    $('.jspun').hide();
    $('.iheartjs').hide();
    $('#colorSelectBoxItText').prop('data-val','');
    $('#colorSelectBoxItText').html('');
    $('label[for=size]').parent().hide();
    $('#colors-js-puns').hide();
  }
});

// initialize total price for activities and add event handler to activities check boxes
var total = 0;
$('.activities input').click(function(){
  // Display total price for activities checked
  if ($(this).attr('name') === 'all' && $(this).prop('checked')) {
    total += 200;
  } else if ($(this).attr('name') === 'all' && !$(this).prop('checked')) {
    total -= 200;
  } else if ($(this).prop('checked')) {
    total += 100;
  } else if (!$(this).prop('checked')) {
    total -= 100;
  }

  var displayTotal = '$' + total;
  $('#total').attr('value',displayTotal);

  // disable activity choice if user chooses another one that is scheduled at the same time
    // JavaScript Frameworks and Express
  if ($(this).attr('name') === 'js-frameworks' && $(this).prop('checked')) {
    $('input[name=express]').attr('disabled',true);
    $('input[name=express]').parent().addClass('greyed-out');
  } else if ($(this).attr('name') === 'js-frameworks' && !$(this).prop('checked')) {
    $('input[name=express]').attr('disabled',false);
    $('input[name=express]').parent().removeClass('greyed-out');
  } else if ($(this).attr('name') === 'express' && $(this).prop('checked')) {
    $('input[name=js-frameworks]').attr('disabled',true);
    $('input[name=js-frameworks]').parent().addClass('greyed-out');
  } else if ($(this).attr('name') === 'express' && !$(this).prop('checked')) {
    $('input[name=js-frameworks]').attr('disabled',false);
    $('input[name=js-frameworks]').parent().removeClass('greyed-out');
  }
    // JavaScript Libries and Node.js
   if ($(this).attr('name') === 'js-libs' && $(this).prop('checked')) {
    $('input[name=node]').attr('disabled',true);
    $('input[name=node]').parent().addClass('greyed-out');
  } else if ($(this).attr('name') === 'js-libs' && !$(this).prop('checked')) {
    $('input[name=node]').attr('disabled',false);
    $('input[name=node]').parent().removeClass('greyed-out');
  } else if ($(this).attr('name') === 'node' && $(this).prop('checked')) {
    $('input[name=js-libs]').attr('disabled',true);
    $('input[name=js-libs]').parent().addClass('greyed-out');
  } else if ($(this).attr('name') === 'node' && !$(this).prop('checked')) {
    $('input[name=js-libs]').attr('disabled',false);
    $('input[name=js-libs]').parent().removeClass('greyed-out');
  }
});

// display credit card, paypal, bitcoin information, or prompt for payment information depending on user choice (credit card is default)
$('#payment').change(function(){
  $('.paymentMethod div').hide();
    if ($('#payment').val() === "credit card") {
      $('#credit-card').show();
      $('#credit-card').children().show();
    } else if ($('#payment').val() === "paypal") {
      $('#paypal').show();
    } else if ($('#payment').val() === "bitcoin") {
      $('#bitcoin').show();
    } else if ($('#payment').val() === "") {
      $('#noSelection').show();
    }
  });

// form validation

  // number of activities checked
function activitiesChecked() {
  var checked = 0;
  $('.activities input[type=checkbox]').each(function(){
    if ($(this).prop('checked')) {
      checked ++;
    }
  });
  return checked;
}

$('form').submit(function(event){
  // check for valid credit card number and prevent form submission and show error message if invalid
  var ccNumber = $('#cc-num').prop('value');
  var numberArray = ccNumber.split('').map(Number);
  var checkDigit = numberArray[numberArray.length - 1];
  numberArray.pop();
  numberArray.reverse();
  var arrayTotal = 0;
  for (var n = 0; n < numberArray.length; ++n) {
    if (numberArray[n] % 2 !== 0) {
      numberArray[n] *= 2;
    }
    if (numberArray[n] > 9) {
      numberArray[n] -= 9;
    }
    arrayTotal += numberArray[n];
  }
  if (arrayTotal % 10 !== checkDigit) {
    event.preventDefault();
    $('label[for=cc-num]').addClass('error');
    $('.cc').removeClass('is-hidden');
  } else {
    $('.cc').addClass('is-hidden');
    $('label[for=cc-num]').removeClass('error');
  }
  
  // prevent submission of form if any required information is missing
  if ($('#name').prop('value') === "" || $('#mail').prop('value') === "" || 
     ($('#title').val() === "other" && $('#other-title').prop('value') === "") || 
     $('#design').val() === "" || activitiesChecked() === 0 || $('#payment').val() === "" || 
     ($('#payment').val() === "credit card" && ($('#cc-num').prop('value') === "" || 
     $('#zip').prop('value').length < 5 || $('#cvv').prop('value').length < 3))) {
    event.preventDefault();
  
    // add error class and message for form fields if required information is missing (or remove it if information is provided)
    if ($('#name').prop('value') === "") {
      $('label[for=name]').html('Name: <span>(please provide your name)</span>').addClass('error');
    } else {
      $('label[for=name]').html('Name:').removeClass('error');
    }

    if ($('#mail').prop('value') === "") {
      $('label[for=mail]').html('Email: <span>(please provide your email address)</span>').addClass('error');
    } else {
      $('label[for=mail]').html('Email:').removeClass('error');
    }

    if ($('#title').val() === "other" && $('#other-title').prop('value') === "") {
      $('label[for=other-title]').addClass('error');
    } else {
      $('label[for=other-title]').removeClass('error');
    }

    if ($('#design').val() === "") {
      $('.shirt legend').html("T-Shirt Info<br><label class='error'><span>Don't forget to pick a T-Shirt</span>");
    } else {
      $('.shirt legend').html('T-Shirt Info');
    }

    if (activitiesChecked() === 0) {
      $('.activities legend').html("Register for Activities<br><label class='error'><span>Please choose at least 1 activity</span>");
    } else {
      $('.activities legend').html('Register for Activities');
    }

    if ($('#zip').prop('value').length < 5) {
      $('#zip').prev().addClass('error');
      $('.zip').removeClass('is-hidden');
    } else {
      $('#zip').prev().removeClass('error');
      $('.zip').addClass('is-hidden');
    }
    
    if ($('#cvv').prop('value').length < 3) {
      $('#cvv').prev().addClass('error');
      $('.cvv').removeClass('is-hidden');
    } else {
      $('#cvv').prev().removeClass('error');
      $('.cvv').addClass('is-hidden');
    }

    if ($('#payment').val() === "") {
      $('#noSelection > p').addClass('error');
    } else {
      $('#noSelection > p').removeClass('error');
    }
  }
});

$(document).ready(function(){
  //Calls the selectBoxIt method on your HTML select box.
  $("select").selectBoxIt();

  // fixes difference in width between the select box and the options box after applying the jQuery selectBoxIt plugin
  // takes the (inline style) width of the select box and sets the (inline style) min-width of the options box to that width
  $('.selectboxit-btn').each(function(){
    var selectStyle = $(this).prop('style');
    var selectWidth = selectStyle.width;
    var optionStyle = $(this).next().prop('style');
    optionStyle['min-width'] = selectWidth;
  });

  // move the dropdown for the expiration year over so that it is under the select box
  var expMonthWidth = parseFloat($('#exp-monthSelectBoxIt').prop('style').width);
  expMonthWidth += 16.8;
  var expYearMargin = expMonthWidth + 'px';
  $('#exp-yearSelectBoxItOptions').css('margin-left',expYearMargin);

  // add custom arrows to the select boxes

  $('.selectboxit > .selectboxit-option-icon-container > i').addClass('fa fa-arrow-circle-o-down');

  // style changes for select box on click
  $('.selectboxit-container').click(function() {
    $(this).children().removeClass('no-bottom-border');

    // remove bottom border from select box if it is open
    if ($(this).children('.selectboxit-list').attr('aria-hidden','false')) {
      $(this).children('.selectboxit').addClass('no-bottom-border');
    }
    
    // put bottom border back on select box after choosing an option
    // puts the down arrow back in the select box after choosing an option
    $(this).prev().change(function() {
      $(this).next().children().removeClass('no-bottom-border');
      $('.selectboxit > .selectboxit-option-icon-container > i').addClass('fa fa-arrow-circle-o-down');
    });

    // puts bottom border back on select box if user clicks away without choosing an option and then hovers back over the select box
    $(this).hover(function() {
      if ($(this).children('.selectboxit').hasClass('no-bottom-border') && !$(this).children('.selectboxit').hasClass('selectboxit-open')) {
        $(this).children().removeClass('no-bottom-border');
      }
    });

    // select boxes only open down (opening up breaks style; side affect of using selectBoxIt)
    var downOnly = $(this).children('.selectboxit-list').prop('style');
    downOnly.top = 'auto';
  });
});