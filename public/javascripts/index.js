/**
 * Created by alxk on 5/02/17.
 */

/**
 * Created by alxu on 9/10/16.
 */

var main = function () {
	"use strict";

	var addComment = function () {
		var $input = $('.newMessage input');
		var $commentText = $input.val().trim();

		if ( $commentText == "" ) {
			return;
		}
		$('.preview p').text($commentText);

	};

	// $('.newMessage .send').on('click', function (event) {
	// 	addComment();
	// });


	$('.newMessage input').on('input', function ( event ) {
		var $input = $('.newMessage input');
		var $commentText = $input.val().trim();
		if ($commentText.length <= 0 ) {
			$('.newMessage .send').addClass('hidden');
		} else {
			$('.newMessage .send').removeClass('hidden');
		}
	});
};



$(document).ready(main);