// jquery.hoverSpin.js
// rotate images since 09/03/13 w/ http://basili.co

;(function($) {

	$.fn.hoverSpin = function(userOpts) {

		var
			opts = $.extend({}, $.fn.hoverSpin.defaultOpts, userOpts),
			divHeight = this.height(),
			image = $(this).children('img'),
			imageHeight = image.height()

			$(this).css('background-image', 'url(\'' + image.attr('src') + '\')')
			$(this).children('img').remove()
			image = null

		$(this)
			.bind('mousemove touchmove', onMouseMove)
			.bind('mouseenter touchstart', onMouseEnter)
			.data('exitPoint', 0)

		function onMouseEnter(e) {

			$(this).data('exitPoint', e.pageX || e.originalEvent.touches[0].pageX)
		}

		function onMouseMove(e) {

			var
				el = $(this),
				exitPoint = el.data('exitPoint'),
				currentPoint = e.pageX || e.originalEvent.touches[0].pageX

			if (currentPoint > exitPoint + opts.sensibility || currentPoint < exitPoint - opts.sensibility) {
				rotateIt.call(el, currentPoint > exitPoint ? -1 : 1)
				el.data('exitPoint', currentPoint)
			}
		}

		function rotateIt(direction) {

			var
				actualPos = getImagePos.call(this),
				newPos = actualPos + (divHeight * direction)

			if (newPos >= imageHeight) {
				newPos = 0
			} else if (newPos < 0) {
				newPos = imageHeight - divHeight
			}

			actualPos = newPos
			this.css('background-position', 0 +'px ' + actualPos + 'px')
		}

		function getImagePos() {

			var dirtyPos = (this.css('background-position') || '').split(' ');
			var cleanPos = parseInt(this.css('background-position-y') || dirtyPos[1], 10)
			return cleanPos
		}
	}

	$.fn.hoverSpin.defaultOpts = { sensibility: 10 }
})(jQuery)