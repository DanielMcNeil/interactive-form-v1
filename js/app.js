'use strict';

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

// t-shirt theme code blocks
var jsPuns = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
jsPuns += '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
jsPuns +='<option value="gold">Gold (JS Puns shirt only)</option>'

var iHeartJS = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
iHeartJS += '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
iHeartJS += '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>'

// insert appropriate code block into the t-shirt color select element and show size and color
$('#design').change(function(){
  if ($(this).val() === 'js puns') {
    $('#color').html(jsPuns);
    $('label[for=size]').parent().show();
    $('#colors-js-puns').show();
  } else if ($(this).val() === 'heart js') {
    $('#color').html(iHeartJS);
    $('label[for=size]').parent().show();
    $('#colors-js-puns').show();
  } else {
    $('#color').html('');
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
  var checked = 0
  $('.activities input[type=checkbox]').each(function(){
    if ($(this).prop('checked')) {
      checked ++;
    }
  });
  return checked
}

$('form').submit(function(event){
  // prevent submission of form if any info is missing
  if ($('#name').prop('value') === "" || $('#mail').prop('value') === "" || 
     ($('#title').val() === "other" && $('#other-title').prop('value') === "") || 
     $('#design').val() === "" || activitiesChecked() === 0 || $('#payment').val() === "" || 
     ($('#payment').val() === "credit card" && ($('#cc-num').prop('value') === "" || $('#zip').prop('value') === "" || $('#cvv').prop('value') === "" ))) {
    event.preventDefault();
  }
  
  // add error class and message for form fields if required information is missing (or remove it if information is provided)
  if ($('#name').prop('value') === "") {
    $('label[for=name]').html('Name: (please provide your name)').addClass('error');
  } else {
    $('label[for=name]').html('Name:').removeClass('error');
  }

  if ($('#mail').prop('value') === "") {
    $('label[for=mail]').html('Email: (please provide your email address)').addClass('error');
  } else {
    $('label[for=mail]').html('Email:').removeClass('error');
  }

  if ($('#title').val() === "other" && $('#other-title').prop('value') === "") {
    $('label[for=other-title]').addClass('error');
  } else {
    $('label[for=other-title]').removeClass('error');
  }

  if ($('#design').val() === "") {
    $('.shirt legend').html("T-Shirt Info<br><label class='error'>Don't forget to pick a T-Shirt");
  } else {
    $('.shirt legend').html('T-Shirt Info');
  }

  if (activitiesChecked() === 0) {
    $('.activities legend').html("Register for Activities<br><label class='error'>Please choose at least 1 activity");
  } else {
    $('.activities legend').html('Register for Activities');
  }

  $('#credit-card div input').each(function(){
    if ($(this).prop('value') === "") {
      $(this).parent().addClass('error');
    } else {
      $(this).parent().removeClass('error');
    }
  });

  if ($('#payment').val() === "") {
    $('#noSelection > p').addClass('error');
  } else {
    $('#noSelection > p').removeClass('error');
  }
});