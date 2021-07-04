'use strict';

/** Class representing a drug (medicine). */
class Medicine {
    /**
      * Creates a medicine instance
      * @param {string} name - Medicine's complete name
      * @param {string} expirationDate - Medicine's expiration date
      * @param {int} stock - Medicine's stock
      * @param {string} barcode - Medicine's barcode
      * @param {string} remarks - Medicine's potential remarks
      */
    constructor(name, expirationDate, stock, barcode, remarks) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.stockCount = stock;
        this.barcode = barcode;
        this.remarks = remarks;
    }

    /**
      * Returns a string representation of the player's instance
      */
    toString() {
        return this.name;
    }

    /**
      * Creates a Map object with medicine's basic info.
      * @returns {Map} a Map object
      */
    toKeyValuePair() {
        let infoMap = new Map();
        infoMap.set('Name', this.name);
        return infoMap;
    }
}

/** Creates table with user's medicine.
 */
function displayMedicine() {
    var allMedicineSection = createSection('Medicine', 'medicine', './assets/medicine.svg', 'profiles');

    /* Insert infoSection AFTER cover */
    document.getElementById('cover').parentNode.insertBefore(allMedicineSection, document.getElementById('cover').nextSibling);

    var profile = getProfileInstance();
    if (profile != null) {
        for (var medicine of profile.medicine) {
            let medicineSection = createMedicineElement(medicine);
            addDeleteButton(medicineSection, medicine.name);
            allMedicineSection.appendChild(medicineSection);
        }
    }

    let addMedicineImg = document.createElement('img');
    addMedicineImg.id = 'add-medicine-img'
    addMedicineImg.alt = 'add';
    addMedicineImg.src = './assets/plus.svg';
    addMedicineImg.classList.add('button');
    addMedicineImg.classList.add('clickable');
    addMedicineImg.addEventListener('click', showCreateMedicineSection);

    allMedicineSection.appendChild(addMedicineImg);
}

/**
 * Saves profile data to local storage properly.
 */
function saveMedicineToLocalStorage(medicine) {
    var profileLst = prepareNewProfileList(medicine);
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

function prepareNewProfileList(newMedicineInstance) {
    var profileName = getProfileName();
    console.log(profileName);
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    var newProfileLst = [...profileLst];
    for (var profile of newProfileLst) {
        if (profile.name === profileName) {
            profile.medicine.push(newMedicineInstance);
        }
    }
    console.log(newProfileLst);
    return newProfileLst;
}

/**
 * Deletes profile data from local storage.
 */
function deleteMedicineFromLocalStorage(medicineName) {
    let profileLst = JSON.parse(localStorage.getItem('profiles'));
    for (var profile of profileLst) {
        if (profile.name === getProfileName()) {
            profile.medicine = profile.medicine.filter(item => item.name !== medicineName);
        }
    }
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

/**
 * Create new profile, given a profile object.
 * @param {Medicine} medicine - Profile's complete name
 * 
 * @returns {Element} a div element (profile's new div)
 */
function createMedicineElement(medicine) {
    var medicineDiv = document.createElement('div');
    medicineDiv.classList.add('rounded');

    /* Medicine Name */
    var medicineNameLabel = document.createElement('a');
    medicineNameLabel.innerHTML = 'Name: ' + medicine.name;
    medicineNameLabel.id = 'medicine-name-lbl';
    // medicineNameLabel.href = 'medicine_list.html?profile=' + profile.name;
    // medicineNameLabel.addEventListener('click', function () {
    //     window.location.href = 'medicine_list.html?profile=' + profile.name;
    // });

    /* Expiration Date */
    var expirationDateLabel = document.createElement('label');
    expirationDateLabel.innerHTML = 'Expiration Date: ' + medicine.expirationDate;
    expirationDateLabel.id = 'expiration-date-lbl';

    /* Stock Count */
    var medicineStockCountLabel = document.createElement('label');
    medicineStockCountLabel.innerHTML = 'Stock Count: ' + medicine.stockCount;
    medicineStockCountLabel.id = 'stock-count-lbl';

    /* Medicine's Barcode */
    var barcodeLabel = document.createElement('label');
    barcodeLabel.innerHTML = 'Barcode: ' + medicine.barcode;
    barcodeLabel.id = 'barcode-lbl';

    /* Medicine Remarks */
    var remarksLabel = document.createElement('label');
    remarksLabel.innerHTML = 'Remarks: ' + medicine.remarks;
    remarksLabel.id = 'remarks-lbl';

    medicineDiv.appendChild(medicineNameLabel);
    medicineDiv.appendChild(document.createElement('br'));
    medicineDiv.appendChild(expirationDateLabel);
    medicineDiv.appendChild(document.createElement('br'));
    medicineDiv.appendChild(medicineStockCountLabel);
    medicineDiv.appendChild(document.createElement('br'));
    medicineDiv.appendChild(barcodeLabel);
    medicineDiv.appendChild(document.createElement('br'));
    medicineDiv.appendChild(remarksLabel);

    return medicineDiv;
}

function addDeleteButton(medicineSection, medicineName) {
    var deleteMedicineButton = document.createElement('div');
    deleteMedicineButton.style.display = 'inline-block;';
    var deleteImg = document.createElement('img');
    deleteImg.src = './assets/deny.svg';
    deleteImg.classList.add('create-medicine-btn');
    deleteImg.classList.add('clickable');
    deleteImg.addEventListener('click', function () { deleteMedicineFromLocalStorage(medicineName); medicineSection.remove(); });
    deleteMedicineButton.appendChild(deleteImg);
    medicineSection.appendChild(deleteMedicineButton);
}

/**
 * Shows medicine creation div when user clicks the add profile button.
 */
function showCreateMedicineSection() {
    var newMedicineDiv = document.createElement('div');
    newMedicineDiv.classList.add('rounded');

    /* Medicine Name */
    var nameTextArea = document.createElement('textarea');
    nameTextArea.placeholder = 'Medicine Name';
    nameTextArea.id = 'medicine-name-txt';
    nameTextArea.wrap = 'off';

    /* Expiration Date */
    var expirationDateInput = document.createElement('input');
    expirationDateInput.setAttribute('type', 'date');
    expirationDateInput.setAttribute('value', new Date());
    expirationDateInput.id = 'medicine-expiration-input';

    /* Stock Count */
    var medicineStockCountInput = document.createElement('input');
    medicineStockCountInput.setAttribute('type', 'number');
    medicineStockCountInput.setAttribute('value', 1);
    medicineStockCountInput.min = 1;
    medicineStockCountInput.id = 'medicine-stock-count-input';

    /* Medicine's Barcode */
    var barcodeInput = document.createElement('textarea');
    barcodeInput.placeholder = 'Barcode';
    barcodeInput.id = 'medicine-barcode-txt';

    /* Medicine Remarks */
    var remarksTextArea = document.createElement('textarea');
    remarksTextArea.placeholder = 'Remarks';
    remarksTextArea.id = 'medicine-remakrs-txt';

    var buttonDiv = document.createElement('div');
    var okImg = document.createElement('img');
    okImg.src = './assets/ok.svg';
    okImg.classList.add('create-medicine-btn');
    okImg.classList.add('clickable');
    okImg.addEventListener('click', function () {
        let medicine = new Medicine(nameTextArea.value, expirationDateInput.value, medicineStockCountInput.value, barcodeInput.value, remarksTextArea.value);
        let medicineElement = createMedicineElement(medicine);
        document.getElementById('add-medicine-img').parentNode.insertBefore(medicineElement, document.getElementById('add-medicine-img'));
        saveMedicineToLocalStorage(medicine);
        newMedicineDiv.remove();
        addDeleteButton(medicineElement, nameTextArea.value);
    });
    var cancelImg = document.createElement('img');
    cancelImg.src = './assets/deny.svg';
    cancelImg.classList.add('create-medicine-btn');
    cancelImg.classList.add('clickable');
    cancelImg.addEventListener('click', function () { newMedicineDiv.remove(); });
    buttonDiv.appendChild(okImg);
    buttonDiv.appendChild(cancelImg);
    newMedicineDiv.appendChild(nameTextArea);
    newMedicineDiv.appendChild(document.createElement('br'));
    newMedicineDiv.appendChild(expirationDateInput);
    newMedicineDiv.appendChild(document.createElement('br'));
    newMedicineDiv.appendChild(medicineStockCountInput);
    newMedicineDiv.appendChild(document.createElement('br'));
    newMedicineDiv.appendChild(barcodeInput);
    newMedicineDiv.appendChild(document.createElement('br'));
    newMedicineDiv.appendChild(remarksTextArea);
    newMedicineDiv.appendChild(document.createElement('br'));
    newMedicineDiv.appendChild(buttonDiv);
    document.getElementById('add-medicine-img').parentNode.insertBefore(newMedicineDiv, document.getElementById('add-medicine-img'));
}


function getProfileInstance() {
    if (getProfileName() === '')
        return;
    let profileLst = JSON.parse(localStorage.getItem('profiles'));
    return profileLst.find(findProfileByName);
}

function findProfileByName(profile) {
    return profile.name === getProfileName();
}

function getProfileName() {
    return window.location.href.split('profile=')[1];
}

/**
 * Creates a section, along with its header
 * and icon.
 * @param {string} headerStr - The header's string
 * @param {string} categoryIconSrc - Icon's src
 * @param {string} categoryIconAltTxt - Icon's alternative text
 * 
 * @return {Element} Section's element
 */
function createSection(headerStr, id, categoryIconSrc, categoryIconAltTxt) {
    var section = document.createElement('section');
    section.id = id;
    var imgDiv = document.createElement('div');
    var categoryIcon = document.createElement('img');
    categoryIcon.src = categoryIconSrc;
    categoryIcon.classList.add('category-icon');
    categoryIcon.alt = categoryIconAltTxt;
    imgDiv.appendChild(categoryIcon);

    var header = document.createElement('h2');
    header.textContent = headerStr;
    imgDiv.appendChild(header);

    section.appendChild(imgDiv);

    return section;
}

window.addEventListener('load', displayMedicine);