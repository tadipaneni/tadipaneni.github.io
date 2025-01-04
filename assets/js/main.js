!(function($) {
  "use strict";

  // Smooth scroll function
  function smoothScroll(target) {
    const $target = $(target);
    const headerHeight = $('.header-fixed').outerHeight();
    
    if ($target.length) {
      $('html, body').animate({
        scrollTop: $target.offset().top - headerHeight
      }, 800, 'easeInOutExpo');
      return true;
    }
    return false;
  }

  // Handle navigation clicks
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      const hash = this.hash;

      if (smoothScroll(hash)) {
        // Update active state
        $('.nav-menu .active').removeClass('active');
        $(this).closest('li').addClass('active');

        // Update URL
        if (history.pushState) {
          history.pushState(null, null, hash);
        }

        // Handle mobile nav
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    }
  });

  // Handle initial hash on page load
  $(window).on('load', function() {
    if (window.location.hash) {
      if (smoothScroll(window.location.hash)) {
        $('.nav-menu .active').removeClass('active');
        $('.nav-menu').find(`[href="${window.location.hash}"]`).closest('li').addClass('active');
      }
    }
  });

  // Update active menu item on scroll
  $(window).on('scroll', function() {
    const scrollPosition = $(this).scrollTop() + 200; // Offset for better trigger point

    $('section').each(function() {
      const sectionTop = $(this).offset().top;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $('.nav-menu .active').removeClass('active');
        $('.nav-menu').find('a[href="#' + sectionId + '"]').closest('li').addClass('active');
      }
    });
  });

  // Mobile Navigation
  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    $('.mobile-nav-overly').toggle();
  });


  // Add this script after your other scripts
$(document).ready(function() {
  const particlesContainer = $('<div class="particles"></div>');
  $('#home').prepend(particlesContainer);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = $('<div class="particle"></div>');
    particle.css({
      'position': 'absolute',
      'width': Math.random() * 5 + 'px',
      'height': Math.random() * 5 + 'px',
      'background': 'rgba(255, 255, 255, 0.5)',
      'border-radius': '50%',
      'left': Math.random() * 100 + '%',
      'top': Math.random() * 100 + '%',
      'animation': `float ${Math.random() * 10 + 5}s linear infinite`
    });
    particlesContainer.append(particle);
  }
});

// Add this CSS for the particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-100vh) translateX(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

})(jQuery);