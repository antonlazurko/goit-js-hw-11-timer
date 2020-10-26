// создание класса (плагина)
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.refs = {
      timerFieldSecs: document.querySelector(`${selector} [data-value="secs"]`),
      timerFieldMins: document.querySelector(`${selector} [data-value="mins"]`),
      timerFieldHours: document.querySelector(
        `${selector} [data-value="hours"]`,
      ),
      timerFieldDays: document.querySelector(`${selector} [data-value="days"]`),
    };
  }

  // функция вычисления корректынх данных для таймера
  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
  }

  // функция рендера разметки
  timerMarkup(remainsTime) {
    this.refs.timerFieldSecs.textContent = remainsTime.secs;
    this.refs.timerFieldMins.textContent = remainsTime.mins;
    this.refs.timerFieldHours.textContent = remainsTime.hours;
    this.refs.timerFieldDays.textContent = remainsTime.days;
  }

  //   основная функция
  countdownStart() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const remainsTime = this.getTimeComponents(deltaTime);
      this.timerMarkup(remainsTime);
    }, 1000);
  }
}

// создание экземпляра класса
const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('jan 01, 2021'),
});

countdownTimer.countdownStart();
