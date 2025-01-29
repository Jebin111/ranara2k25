var Countdown = {
  
    // Backbone-like structure
    $el: $('.countdown'),
    
    // Params
    countdown_interval: null,
    total_seconds: 0,
    
    // Initialize the countdown  
    init: function() {
      
      // Target date: February 2 at 9:00 AM
      const targetDate = new Date("Feb 12, " + new Date().getFullYear() + " 9:00:00");
      const currentDate = new Date();
  
      // Calculate total seconds remaining
      this.total_seconds = Math.floor((targetDate - currentDate) / 1000);
  
      // DOM
      this.$ = {
        days: this.$el.find('.bloc-time.days .figure'),
        hours: this.$el.find('.bloc-time.hours .figure'),
        minutes: this.$el.find('.bloc-time.min .figure'),
        seconds: this.$el.find('.bloc-time.sec .figure')
      };
  
      // Initialize countdown values
      this.values = {
        days: Math.floor(this.total_seconds / (24 * 60 * 60)),
        hours: Math.floor((this.total_seconds % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((this.total_seconds % (60 * 60)) / 60),
        seconds: this.total_seconds % 60
      };
  
      // Start the countdown
      this.count();
    },
    
    count: function() {
      var that = this,
          $day_1 = this.$.days.eq(0),
          $day_2 = this.$.days.eq(1),
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1 = this.$.minutes.eq(0),
          $min_2 = this.$.minutes.eq(1),
          $sec_1 = this.$.seconds.eq(0),
          $sec_2 = this.$.seconds.eq(1);
  
      this.countdown_interval = setInterval(function() {
        if (that.total_seconds > 0) {
  
          --that.total_seconds;
  
          // Calculate new values
          that.values.days = Math.floor(that.total_seconds / (24 * 60 * 60));
          that.values.hours = Math.floor((that.total_seconds % (24 * 60 * 60)) / (60 * 60));
          that.values.minutes = Math.floor((that.total_seconds % (60 * 60)) / 60);
          that.values.seconds = that.total_seconds % 60;
  
          // Update DOM values
          that.checkHour(that.values.days, $day_1, $day_2);
          that.checkHour(that.values.hours, $hour_1, $hour_2);
          that.checkHour(that.values.minutes, $min_1, $min_2);
          that.checkHour(that.values.seconds, $sec_1, $sec_2);
  
        } else {
          clearInterval(that.countdown_interval);
          document.querySelector('.event-started').style.display = 'block';
          document.querySelector('.wrap').style.display = 'none';
        }
      }, 1000);
    },
    
    animateFigure: function($el, value) {
      var that = this,
          $top = $el.find('.top'),
          $bottom = $el.find('.bottom'),
          $back_top = $el.find('.top-back'),
          $back_bottom = $el.find('.bottom-back');
  
      // Before we begin, change the back value
      $back_top.find('span').html(value);
      $back_bottom.find('span').html(value);
  
      // Then animate
      TweenMax.to($top, 0.8, {
        rotationX: '-180deg',
        transformPerspective: 300,
        ease: Quart.easeOut,
        onComplete: function() {
          $top.html(value);
          $bottom.html(value);
          TweenMax.set($top, { rotationX: 0 });
        }
      });
  
      TweenMax.to($back_top, 0.8, {
        rotationX: 0,
        transformPerspective: 300,
        ease: Quart.easeOut,
        clearProps: 'all'
      });
    },
    
    checkHour: function(value, $el_1, $el_2) {
      var val_1 = value.toString().charAt(0),
          val_2 = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();
  
      if (value >= 10) {
        if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      } else {
        if (fig_1_value !== '0') this.animateFigure($el_1, 0);
        if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
      }
    }
  };
  
  // Start the countdown
  Countdown.init();
  