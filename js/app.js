'use strict';

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

// insert appropriate code block into the t-shirt color select element 
$('#design').change(function(){
  if ($(this).val() === 'js puns') {
    $('#color').html(jsPuns);
  } else if ($(this).val() === 'heart js') {
    $('#color').html(iHeartJS);
  } else {
    $('#color').html('');
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