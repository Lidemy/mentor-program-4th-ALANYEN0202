document
  .querySelector('.form__data')
  .addEventListener('submit', (e) => {
    let hasError = false;
    const values = {};

    const elements = document.querySelectorAll('.required');// eslint-disable-next-line
    for (const element of elements) {
      let isVaild = true;
      const input = element.querySelector('input[type=text]');
      const radio = element.querySelectorAll('input[type=radio]');
      if (input) {
        values[input.name] = input.value;
        if (!input.value) {
          isVaild = false;
        }
      } else if (radio.length) {
        isVaild = [...radio].some(radios => radios.checked);
        if (isVaild) {
          const r = element.querySelectorAll('input[type=radio]:checked');
          values[r.name] = r.value;
        }
      } else { // eslint-disable-next-line
        continue;
      }
      if (!isVaild) {
        hasError = true;
        element.classList.remove('hide-error');
        e.preventDefault();
      } else {
        element.classList.add('hide-error');
      }
    }
    if (!hasError) {
      alert(JSON.stringify(values));
    }
  });
