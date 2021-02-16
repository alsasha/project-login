
import '../css/style.css';
import './plugins/bootstrap';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './view/form';
import { login } from './services/auth.service';
import { notify } from './view/notifications';
import { getNews } from './services/news.service';
import registerUI from './config/register.config';
import { registration } from './services/registration.service';
import { getCountriesDb } from './services/getCountries';
import { getCitiesDb } from './services/getCities';
import { getAutocomplete } from './plugins/bootstrap/bootstrap';

const { form, inputEmail, inputPassword } = UI;
const { registerForm, 
    registerEmail,
    registerPassword,
    registerNickname,
    registerFirstName,
    registerLastName,
    registerPhone,
    registerGenderOrientation,
    registerCountry,
    registerCity,
    registerDateOfBirth
} = registerUI;
const inputs = [inputEmail, inputPassword ];
const registerInputs = [ registerEmail,
    registerPassword,
    registerNickname,
    registerFirstName,
    registerLastName,
    registerPhone,
    registerGenderOrientation,
    registerCountry,
    registerCity,
    registerDateOfBirth ];


// Events
form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onRegisterFormSubmit();
});
inputs.forEach(input => {
    input.addEventListener('focus', () => removeInputError(input));
});
registerCity.addEventListener('focus', () => {
    uploadCity();
});
registerCountry.addEventListener('focus', () => {
    registerCity.value = '';
});
uploadCountries();

// Handlers

async function uploadCountries() {
    getCountriesDb().then(countries => {
        getAutocomplete(registerCountry.id, countries);
    });
}

async function onFormSubmit() {
    inputs.forEach(input => removeInputError(input));
    const isValidForm = inputs.every(input => {
        const isValidInput = validate(input);
        if (!isValidInput) {
            showInputError(input);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();
        form.reset();
        notify({ msg: 'Authentification success', className: 'alert-success', timeout: 3000 });
    } catch(err) {
        notify({ msg: 'Something went wrong...', className: 'alert-danger', timeout: 3000 });
    }
}

async function onRegisterFormSubmit() {
    registerInputs.forEach(input => removeInputError(input));
    const isValidForm = registerInputs.every(input => {
        const isValidInput = validate(input);
        if (!isValidInput) {
            showInputError(input);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    try {
        const date = registerDateOfBirth.value.split('-').reverse();

        const res = await registration(
            registerEmail.value,
            registerPassword.value,
            registerNickname.value,
            registerFirstName.value,
            registerLastName.value,
            registerPhone.value,
            registerGenderOrientation.value,
            registerCountry.value,
            registerCity.value,
            ...date
        );
        if (res.error) {
            notify({ msg: res.message, className: 'alert-danger', timeout: 3000 });
        } else {
            notify({ msg: 'Registration success', className: 'alert-success', timeout: 3000 });
        }
    } catch(err) {
        console.log(err);
        notify({ msg: err, className: 'alert-danger', timeout: 3000 });
    }
}

async function uploadCity() {
    const CITY_INDEX = registerCountry.dataset.index;
    if (!CITY_INDEX) return false;
    getCitiesDb(CITY_INDEX).then(cities => {
        getAutocomplete(registerCity.id, cities);
    });
}
