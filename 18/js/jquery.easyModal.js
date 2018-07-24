;(function ($) {

  class Modal {
    constructor(element, options) {
      this.modal = element;
      this.defauldOptions = {
        closeClass: ".close-modal",
        overlayOpacity: 0.7,
        duration: 500,
        autoClose: false,
        autoCloseTime: 1000
      };
      this.options = $.extend(this.defauldOptions, options);
      this.autoCloseCount;
    }

    init() {
      // показываем overlay
      this.showOverlay()
      // показываем модальное окно
        .then(this.showModal())
      // устанавливаем события
        .then(this.setEvents());

      // закрываем окно через указанное количество времени
      if (this.options.autoClose) {
        this.autoCloseCount = setTimeout(function () {
          this.closeModal();
        }.bind(this), this.options.autoCloseTime);
      }
    }

    showOverlay() {
      const self = this;

      return new Promise(function (resolve,reject){
        $("body").css({"overflow-y": "hidden"});

        const overlay = $("<div class='overlay'></div>").css({
          "display": "block",
          "position": "fixed",
          "top": 0,
          "left": 0,
          "width": "100%",
          "height": "100%",
          "z-index": 999,
          "opacity": 0,
          "background-color": `rgba(0, 0, 0, ${self.options.overlayOpacity})`
        });

        self.modal.before(overlay);
      });
    }

    showModal() {
      const self = this;

      return new Promise(function (resolve,reject) {
        // Получаем ширину и высоту модального окна
        const {halfWidth, halfHeight} = self.calcModalSize();

        // Показываем overlay
        $(".overlay").animate({
          "opacity": 1
        }, self.options.duration);

        // Показываем модальное окно
        self.modal.css({
          "display": "block",
          "position": "fixed",
          "top": "50%",
          "left": "50%",
          "z-index": 1000,
          "opacity": 0,
          "margin-top": `-${halfHeight}px`,
          "margin-left": `-${halfWidth}px`
        }).animate({
          "opacity": 1
        }, self.options.duration);
      })
    }

    setEvents() {
      $(".overlay").on("click", (e) => this.closeModal())
      $(this.options.closeClass).on("click", (e) => this.closeModal())
    }

    clearEvents() {
      $(".overlay").off("click");
      $("this.options.closeClass").off("click");
    }

    closeModal() {
      if (this.autoCloseCount) {
        clearTimeout(this.autoCloseCount);
      }
      $("body").css({"overflow-y": "auto"});
      $(".overlay")
        .animate({"opacity": 0}, this.options.duration, () => $(".overlay").remove());

      // скрываем модальное окно
      this.modal.animate({
        "opacity": 0
      }, this.options.duration, () => this.modal.css({"display": "none"}));

      this.clearEvents();
    }

    calcModalSize() {
      const halfWidth = this.modal.outerWidth() / 2;
      const halfHeight = this.modal.outerHeight() / 2;

      return {
        halfHeight,
        halfWidth
      }
    }
  }

  $.fn.easyModal = function (options) {
    new Modal(this, options).init();
  }
})(jQuery);