(function () {
    const form = document.getElementById('cardForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const ownerInput = document.getElementById('owner');
    const expMonth = document.getElementById('expMonth');
    const expYear = document.getElementById('expYear');
    const cvvInput = document.getElementById('cvv');
    const err = document.querySelector('.errorMsg');
    const success = document.querySelector('.successMsg');
  
    const vNumber = document.getElementById('visual-number');
    const vName = document.getElementById('visual-name');
    const vExp = document.getElementById('visual-exp');
    const vCvv = document.getElementById('visual-cvv');
  
    // Populate expiration years (current year + 10)
    (function populateYears() {
      const now = new Date();
      const short = now.getFullYear() % 100;
      for (let i = 0; i <= 10; i++) {
        const y = short + i;
        const opt = document.createElement('option');
        opt.value = String(y).padStart(2, '0');
        opt.textContent = String(y).padStart(2, '0');
        expYear.appendChild(opt);
      }
    })();
  
    function formatCardNumber(value) {
      return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
  
    function luhnCheck(cardNum) {
      const digits = cardNum.replace(/\D/g, '');
      let sum = 0;
      let doubleUp = false;
      for (let i = digits.length - 1; i >= 0; i--) {
        let d = parseInt(digits.charAt(i), 10);
        if (doubleUp) {
          d *= 2;
          if (d > 9) d -= 9;
        }
        sum += d;
        doubleUp = !doubleUp;
      }
      return sum % 10 === 0;
    }
  
    function detectCardType(number) {
      const n = number.replace(/\D/g, '');
      if (/^3[47]/.test(n)) return 'amex';
      if (/^4/.test(n)) return 'visa';
      if (/^5[1-5]/.test(n)) return 'mastercard';
      if (/^6(?:011|5)/.test(n)) return 'discover';
      return 'unknown';
    }
  
    // Live updates
    cardNumberInput.addEventListener('input', (e) => {
      const formatted = formatCardNumber(e.target.value);
      e.target.value = formatted;
      vNumber.textContent = formatted || '#### #### #### ####';
    });
  
    ownerInput.addEventListener('input', (e) => {
      vName.textContent = e.target.value.toUpperCase() || 'CARDHOLDER NAME';
    });
  
    expMonth.addEventListener('change', updateExpVisual);
    expYear.addEventListener('change', updateExpVisual);
  
    function updateExpVisual() {
      const m = expMonth.value || 'MM';
      const y = expYear.value || 'YY';
      vExp.textContent = `${m}/${y}`;
    }
  
    cvvInput.addEventListener('input', () => {
      vCvv.textContent = cvvInput.value || '###';
    });
  
    function validateFormData(data) {
      if (!data.owner || data.owner.trim().length < 2)
        return { ok: false, msg: 'Please enter the card owner name.' };
  
      const digits = (data.cardNumber || '').replace(/\s+/g, '');
      if (!/^\d{13,19}$/.test(digits))
        return { ok: false, msg: 'Card number must be 13 to 19 digits.' };
  
      if (!luhnCheck(digits))
        return { ok: false, msg: 'That card number looks invalid.' };
  
      if (!data.expMonth || !data.expYear)
        return { ok: false, msg: 'Select an expiration month and year.' };
  
      const now = new Date();
      const thisYear = now.getFullYear() % 100;
      const thisMonth = now.getMonth() + 1;
      const expYearNum = parseInt(data.expYear, 10);
      const expMonthNum = parseInt(data.expMonth, 10);
      if (expYearNum < thisYear || (expYearNum === thisYear && expMonthNum < thisMonth)) {
        return { ok: false, msg: 'Card has expired.' };
      }
  
      const cardType = detectCardType(digits);
      const cvvDigits = (data.cvv || '').replace(/\D/g, '');
      if (cardType === 'amex' && cvvDigits.length !== 4)
        return { ok: false, msg: 'AMEX cards require a 4-digit CVV.' };
      if (cardType !== 'amex' && cvvDigits.length !== 3)
        return { ok: false, msg: 'Please enter a 3-digit CVV.' };
  
      return { ok: true };
    }
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = {
        owner: this.owner.value,
        cardNumber: this.cardNumber.value,
        expMonth: this.expMonth.value,
        expYear: this.expYear.value,
        cvv: this.cvv.value,
      };
  
      const r = validateFormData(data);
      if (!r.ok) {
        err.textContent = r.msg;
        success.textContent = '';
        return false;
      }
  
      success.textContent = 'Payment information accepted. (Demo only)';
      err.textContent = '';
      form.reset();
      vNumber.textContent = '#### #### #### ####';
      vName.textContent = 'CARDHOLDER NAME';
      vExp.textContent = 'MM/YY';
      vCvv.textContent = '###';
    });
  
    [cardNumberInput, ownerInput, expMonth, expYear, cvvInput].forEach(el => {
      el.addEventListener('input', () => {
        err.textContent = '';
        success.textContent = '';
      });
    });
  })();  