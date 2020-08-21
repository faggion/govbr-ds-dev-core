import flatpickr from 'flatpickr'
const Brazilian = require('flatpickr/dist/l10n/pt').default.pt

class BRDatepicker {
  constructor (name, component) {
    this.name = name
    this.component = component
    // localization global
    flatpickr.localize(Brazilian)

    this._buildDatepicker()
  }

  _buildDatepicker () {
    let format = 'd/m/Y'
    let time = false
    let noCalendar = false
    switch (this.component.getAttribute('data-type')) {
      case 'date':
        format = 'd/m/Y'
        time = false
        noCalendar = false
        break
      case 'time':
        format = 'H:i'
        time = true
        noCalendar = true
        break
      case 'datetime-local':
        format = 'd/m/Y H:i'
        time = true
        noCalendar = false
        break
    }

    const config = {
      dateFormat: format,
      nextArrow: '<button class="br-button circle small" type="button"><i class="fas fa-angle-right"></i></button>',
      prevArrow: '<button class="br-button circle small" type="button"><i class="fas fas fa-angle-left"></i></button>',
      mode: this.component.getAttribute('data-mode'),
      enableTime: time,
      minuteIncrement: 1,
      noCalendar: noCalendar,
      time_24hr: true,
      wrap: true
    }

    flatpickr(this.component, config)
  }
}

const datepickerList = []
for (const brDatepicker of window.document.querySelectorAll('.br-datepicker')) {
  datepickerList.push(new BRDatepicker('br-datepicker', brDatepicker))
}

export default BRDatepicker
