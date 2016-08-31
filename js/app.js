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