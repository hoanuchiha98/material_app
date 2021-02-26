(function ($) {
  $.fn.AjaxModal = function (options) {

    createContainer();
    var settings = $.extend({
      modalWidth: '50%',
      fadeInDuration: 300,
      fadeOutDuration: 300,
      overlayOpacity: 0.3,
      closeButton: '&times;',
      dismissable: true,
    }, options);

    //Bind to click
    this.bind("click.AjaxModal", function (e) {
      var Form = $(this.form);
      if (Form.length) {
        var modalTitle = $(this).data('title');
        var modalUrl = $(Form).attr('action');
        var modalMethod = $(Form).attr('method');
        var modalData = $(Form).serialize();
        makeRequest(modalMethod, modalUrl, modalData, modalTitle)
      } else {
        var modalTitle = $(this).data('title');
        var modalUrl = $(this).attr('href');
        makeRequest('GET', modalUrl, null, modalTitle)
      }
      return false; //Make unclickable
    });

    //bind to click for closing
    $('body').on('click', '.AjaxModal-close', function () {
      closeModal();
    });
    $('body').on('click', '.AjaxModal-overlay', function () {
      if (settings.dismissable) {
        closeModal();
      }
    });
    $(document).keyup(function (e) {
      if (e.keyCode == 27 && settings.dismissable) { // escape key maps to keycode `27`
        closeModal();
      }
    });

    //Close the Modal
    function closeModal() {
      $('.AjaxModal-overlay, #ajax-modal').fadeOut(settings.fadeOutDuration, function () {
        $('.AjaxModal-overlay').remove();
        $('#ajax-modal').empty();
      });
    }

    function openModal(content, title) {
      var titleText = '';
      if (title) {
        titleText = title;
      }
      //Create the modal
      $('#ajax-modal').html('<div class="AjaxModal-top">' + titleText + '<span class="AjaxModal-close">' + settings.closeButton + '</div></div><div class="AjaxModal-content">' + content + '</div>');
      $('#ajax-modal').css('width', settings.modalWidth);
      $('#ajax-modal').fadeIn(settings.fadeInDuration);

      //Setup the overlay
      $('body').append('<div class="AjaxModal-overlay"></div>');
      $('.AjaxModal-overlay').css('opacity', settings.overlayOpacity);
      $('.AjaxModal-overlay').hide();
      $('.AjaxModal-overlay').fadeIn(settings.fadeInDuration);
    }

    //create container for modal
    function createContainer() {
      $('body').append('<div class="AjaxModal-modal" id="ajax-modal"></div>');
      $('#ajax-modal').hide();
    }

    //Make the request 
    function makeRequest(method, url, data, title) {
      $.ajax({
        url: url,
        type: method,
        data: data,
        success: function (result) {
          openModal(result, title);
        }
      });
    }
  };
}(jQuery));