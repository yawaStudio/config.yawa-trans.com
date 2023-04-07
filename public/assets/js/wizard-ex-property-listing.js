/**
 *  Form Wizard
 */

'use strict';

(function() {
    // Init custom option check
    window.Helpers.initCustomOptionCheck();

    const flatpickrRange = document.querySelector('.flatpickr'),
        phoneMask = document.querySelector('.contact-number-mask'),
        plCountry = $('#plCountry'),
        plFurnishingDetailsSuggestionEl = document.querySelector('#plFurnishingDetails');

    // Phone Number Input Mask
    if (phoneMask) {
        new Cleave(phoneMask, {
            phone: true,
            phoneRegionCode: 'US'
        });
    }

    // select2 (Country)

    if (plCountry) {
        plCountry.wrap('<div class="position-relative"></div>');
        plCountry.select2({
            placeholder: 'Select country',
            dropdownParent: plCountry.parent()
        });
    }

    if (flatpickrRange) {
        flatpickrRange.flatpickr();
    }

    // Tagify (Furnishing details)
    const furnishingList = [
        'Fridge',
        'TV',
        'AC',
        'WiFi',
        'RO',
        'Washing Machine',
        'Sofa',
        'Bed',
        'Dining Table',
        'Microwave',
        'Cupboard'
    ];
    if (plFurnishingDetailsSuggestionEl) {
        const plFurnishingDetailsSuggestion = new Tagify(plFurnishingDetailsSuggestionEl, {
            whitelist: furnishingList,
            maxTags: 10,
            dropdown: {
                maxItems: 20,
                classname: 'tags-inline',
                enabled: 0,
                closeOnSelect: false
            }
        });
    }

    // Vertical Wizard
    // --------------------------------------------------------------------

    const wizardPropertyListing = document.querySelector('#wizard-property-listing');
    if (typeof wizardPropertyListing !== undefined && wizardPropertyListing !== null) {
        // Wizard form
        const wizardPropertyListingForm = wizardPropertyListing.querySelector('#wizard-property-listing-form');
        // Wizard steps
        const wizardPropertyListingFormStep1 = wizardPropertyListingForm.querySelector('#personal-details');
        const wizardPropertyListingFormStep2 = wizardPropertyListingForm.querySelector('#property-details');
        // Wizard next prev button
        const wizardPropertyListingNext = [].slice.call(wizardPropertyListingForm.querySelectorAll('.btn-next'));
        const wizardPropertyListingPrev = [].slice.call(wizardPropertyListingForm.querySelectorAll('.btn-prev'));

        const validationStepper = new Stepper(wizardPropertyListing, {
            linear: true
        });

        // Personal Details
        const FormValidation1 = FormValidation.formValidation(wizardPropertyListingFormStep1, {



        }).on('core.form.valid', function() {
            // Jump to the next step when all fields in the current step are valid
            validationStepper.next();
        });

        // Property Details
        const FormValidation2 = FormValidation.formValidation(wizardPropertyListingFormStep2, {


        }).on('core.form.valid', function() {
            // Jump to the next step when all fields in the current step are valid
            validationStepper.next();
        });

        // select2 (Property type)
        const plPropertyType = $('#plPropertyType');
        if (plPropertyType.length) {
            plPropertyType.wrap('<div class="position-relative"></div>');
            plPropertyType
                .select2({
                    placeholder: 'Select property type',
                    dropdownParent: plPropertyType.parent()
                })
                .on('change.select2', function() {
                    // Revalidate the color field when an option is chosen
                    FormValidation2.revalidateField('plPropertyType');
                });
        }



        wizardPropertyListingNext.forEach(item => {
            item.addEventListener('click', event => {
                // When click the Next button, we will validate the current step
                switch (validationStepper._currentIndex) {
                    case 0:
                        FormValidation1.validate();
                        break;

                    case 1:
                        FormValidation2.validate();
                        break;


                    default:
                        break;
                }
            });
        });

        wizardPropertyListingPrev.forEach(item => {
            item.addEventListener('click', event => {
                switch (validationStepper._currentIndex) {


                    case 1:
                        validationStepper.previous();
                        break;

                    case 0:

                    default:
                        break;
                }
            });
        });
    }
})();
