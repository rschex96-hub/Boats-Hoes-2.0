const packageSelect = document.getElementById('package');
const addOnCheckboxes = Array.from(document.querySelectorAll('.addon'));
const packageTotalEl = document.getElementById('packageTotal');
const addonsTotalEl = document.getElementById('addonsTotal');
const tripTotalEl = document.getElementById('tripTotal');
const depositTotalEl = document.getElementById('depositTotal');
const remainingTotalEl = document.getElementById('remainingTotal');
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('successMessage');
const dateInput = document.getElementById('date');

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function updateTotals() {
  const packageTotal = Number(packageSelect.value);
  const addonsTotal = addOnCheckboxes
    .filter((checkbox) => checkbox.checked)
    .reduce((sum, checkbox) => sum + Number(checkbox.value), 0);

  const tripTotal = packageTotal + addonsTotal;
  const deposit = Math.max(Math.round(tripTotal * 0.25), 100);
  const remaining = tripTotal - deposit;

  packageTotalEl.textContent = formatMoney(packageTotal);
  addonsTotalEl.textContent = formatMoney(addonsTotal);
  tripTotalEl.textContent = formatMoney(tripTotal);
  depositTotalEl.textContent = formatMoney(deposit);
  remainingTotalEl.textContent = formatMoney(remaining);
}

packageSelect.addEventListener('change', updateTotals);
addOnCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', updateTotals));

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  successMessage.classList.remove('hidden');
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

updateTotals();
