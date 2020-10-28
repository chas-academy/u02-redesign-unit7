/* ––––
NOTE: This form check is just a visual function. We are simply checking that the required fields have a values and indicating to the user if something is missing/wrong. A real form check should also (among other things) make sure that field values are in the correct format, e.g. email is a real email address, phone is only numbers, name has X characters etc.
–––– */

// This will serve as a "form state" check
// Default is false = form has errors
let formOk = false;

// We'll use this variable to check if empty fields have
// focused so we can focus the first field that is empty
let hasFocused = false;

// Initial empty array for field data
let fieldsArray = [];

// Loop function for our fields
const loopFields = (fields) => {

	// Iterator for field value check
	// Used to match with formOk on click event
	let fieldOk = 0;

	// Loop the fields to check for values
	fields.forEach(field => {

		// Since phone is marked as optional wee need to respect
		// that by excluding the phone field in our field loop test
		if (field.name !== 'phone') {
			const value = field.value;
			const hasValue =
				typeof value !== 'undefined'
					&& value !== null
					&& value !== ''
					? true
					: false;

			// Using aria-invalid we can create a nice visual style
			// indicating to the user that something is missing/wrong
			if (!hasValue) {
				field.setAttribute('aria-invalid', 'true');

				// Check if any field has been focused
				// so we can stay on the first one
				if (!hasFocused) {
					field.focus();
					hasFocused = true;
				}
			} else {
				field.setAttribute('aria-invalid', 'false');
				fieldOk++;
			}
		}
	});

	// If the number of fields passed is equal to the fields array length
	// (minus 1, remember, we're excluding phone since it's not required)
	// then change fromOk to true so we can process the form
	if (fieldOk === fields.length - 1) {
		formOk = true;
	}
}

const clearForm = (fields) => {
	formOk = false;
	hasFocused = false;
	fieldsArray = [];
	fields.forEach(field => {
		field.value = '';
	});
}

const formEl = document.querySelector('form#contact-form');
const formButton = formEl.querySelector('button');

// Monitor user interaction, "click"
formButton.addEventListener('click', (event) => {

	// Start by using the event to
	// stop the form from submitting
	// by using preventDefault function
	event.preventDefault();

	// Now we can start checking the form

	// Get all the fields from the form
	let formFields = formEl.querySelectorAll('input, textarea, select');

	// Insert them into our empty fields array
	formFields.forEach(field => fieldsArray.push(field));

	// Run fields loop function and make sure
	// there are fields in the fields array
	if (fieldsArray.length) {
		loopFields(fieldsArray);

		if (formOk) {
			// Do form thank you stuff
			const thankYouFlashEl = document.createElement('div');
			thankYouFlashEl.id = 'thank-you-flash';
			thankYouFlashEl.innerHTML = '<h3>Tack!</h3><p>Vi har nu mottagit ditt meddelande och återkommer till dig snarast.</p>';

			const closeButtonEl = document.createElement('button');
			closeButtonEl.classList.add('close-button');
			thankYouFlashEl.appendChild(closeButtonEl);

			// const closeButton = thankYouFlashEl.querySelector('button.close-button');
			closeButtonEl.addEventListener('click', () => {
				thankYouFlashEl.remove();
			})

			// Append thank you element to body
			document.body.append(thankYouFlashEl);

			// Clear fields 
			clearForm(fieldsArray);

			// For good measure we'll remove the
			// thank you flash once it's done.
			// The time out should match css animation
			setTimeout(() => {
				thankYouFlashEl.remove();
			}, 7000);
		}
	}
});

// Check if something has changed
formEl.addEventListener('change', () => {
	loopFields(fieldsArray);
});

// Check if something is changing while user is typing
formEl.addEventListener('keydown', () => {
	loopFields(fieldsArray);
});
