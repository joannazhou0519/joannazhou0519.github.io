(function($) {
    var slide = function(ele, options) {
        var $ele = $(ele);
        var setting = {
            speed: 1500,
            interval: 6000,
        };

        $.extend(true, setting, options);

        var states = [
            { $zIndex: 1, width: 180, height: 150, top: 69, left: 134, $opacity: 0.2 },
            { $zIndex: 2, width: 195, height: 170, top: 59, left: 0, $opacity: 0.4 },
            { $zIndex: 3, width: 255, height: 218, top: 35, left: 110, $opacity: 0.7 },
            { $zIndex: 4, width: 336, height: 288, top: 0, left: 263, $opacity: 1 },
            { $zIndex: 3, width: 255, height: 218, top: 35, left: 470, $opacity: 0.7 },
            { $zIndex: 2, width: 195, height: 170, top: 59, left: 620, $opacity: 0.4 },
            { $zIndex: 1, width: 180, height: 150, top: 69, left: 500, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var totalSlides = $lis.length;
        var currentIndex = 0;
        var timer = null;

        $ele.find('.next').on('click', function() {
            next();
        });
        $ele.find('.prev').on('click', function() {
            prev();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        $lis.on('click', function() {
            var $img = $(this).find('img');
            var src = $img.attr('src');
            var $overlay = $('<div class="image-overlay"><img src="' + src + '" class="enlarged-image"/></div>');
            $('body').append($overlay);
            setTimeout(function() {
                $overlay.addClass('visible');
            }, 10);
            $overlay.on('click', function(event) {
                if (!$(event.target).is('.enlarged-image')) {
                    $overlay.removeClass('visible');
                    setTimeout(function() {
                        $overlay.remove();
                    }, 500);
                }
            });
        });

        move();
        autoPlay();

        function move() {
            $lis.each(function(index, element) {
                var pos = (index + currentIndex) % totalSlides;
                if (pos < states.length) {
                    var state = states[pos];
                    $(element).css('zIndex', state.$zIndex).stop().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                    $(element).css('visibility', 'visible');
                } else {
                    $(element).css('visibility', 'hidden');
                }
            });
        }

        function next() {
            currentIndex = (currentIndex + 1) % totalSlides;
            move();
        }

        function prev() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            move();
        }

        function autoPlay() {
            timer = setInterval(prev, setting.interval); // Change next to prev here
        }
    }

    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele, options);
        });
        return this;
    }
})(jQuery);
