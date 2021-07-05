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
function displayMedicine(sortBy = 'default') {

    var allMedicineSection = document.getElementById('medicine');
    var profile = getProfileInstance();
    var sorted_medicine = profile.medicine;

    if (sortBy === 'name') {
        sorted_medicine.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else if (sortBy === 'stockCount') {
        sorted_medicine.sort((a, b) => (a.stockCount > b.stockCount) ? 1 : ((b.stockCount > a.stockCount) ? -1 : 0));
    } else if (sortBy === 'date') {
        sorted_medicine.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    }

    if (profile != null) {
        for (var medicine of sorted_medicine) {
            let medicineSection = createMedicineElement(medicine);
            setTimeout(function () {
                medicineSection.classList.add('visible');
            }, 100);
            addDeleteButton(medicineSection, medicine.name);
            allMedicineSection.appendChild(medicineSection);
        }
    }
}

function deleteAllMedicineSection() {
    var allMedicineSection = document.getElementById('medicine');
    allMedicineSection.remove();
}

function deleteAddMedicineButton() {
    var addMedicineButton = document.getElementById('add-medicine-img');
    addMedicineButton.remove();
}

function createAddMedicineButton() {

    var allMedicineSection = document.getElementById('medicine');
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
 * Deletes medicine data from local storage.
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
 * Creates new medicine, given a medicine object.
 * @param {Medicine} medicine - Medicine's complete name
 * 
 * @returns {Element} a div element (profile's new div)
 */
function createMedicineElement(medicine) {
    var medicineDiv = document.createElement('div');
    medicineDiv.classList.add('element');
    medicineDiv.classList.add('rounded');

    /* Medicine Name */
    var medicineNameLabel = document.createElement('label');
    medicineNameLabel.innerHTML = 'Name: ' + medicine.name;
    medicineNameLabel.classList.add('medicine-label');

    /* Expiration Date */
    var expirationDateLabel = document.createElement('label');
    expirationDateLabel.innerHTML = 'Expiration Date: ' + medicine.expirationDate;
    expirationDateLabel.classList.add('medicine-label');

    /* Stock Count */
    var medicineStockCountLabel = document.createElement('label');
    medicineStockCountLabel.innerHTML = 'Stock Count: ' + medicine.stockCount;
    medicineStockCountLabel.classList.add('medicine-label');

    /* Medicine's Barcode */
    var barcodeLabel = document.createElement('label');
    barcodeLabel.innerHTML = 'Barcode: ' + medicine.barcode;
    barcodeLabel.classList.add('medicine-label');

    /* Medicine Remarks */
    var remarksLabel = document.createElement('label');
    remarksLabel.innerHTML = 'Remarks: ' + medicine.remarks;
    remarksLabel.classList.add('medicine-label');

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

function addSearchInput() {
    var searchInput = document.createElement('input');
    searchInput.name = 'search';
    searchInput.id = 'search-input';
    searchInput.setAttribute('type', 'search');
    searchInput.classList.add('search-input');
    searchInput.placeholder = 'Search for medicine...';

    searchInput.addEventListener('keyup', search);

    return searchInput;
}

function search() {
    var medicineDivs, labels;
    medicineDivs = document.getElementsByClassName('element rounded visible');
    for (var i = 0; i < medicineDivs.length; ++i) {
        labels = medicineDivs[i].getElementsByClassName('medicine-label');
        if (isSearchResult(labels)) {
            medicineDivs[i].style.display = '';
        } else {
            medicineDivs[i].style.display = 'none';
        }
    }
}

function isSearchResult(labels, filter) {
    var textValue, filter, input;
    input = document.getElementById('search-input');
    filter = input.value.toUpperCase();
    for (var j = 0; j < labels.length; ++j) {
        textValue = labels[j].textContent.toUpperCase() || labels[i].innerText.toUpperCase();
        if (textValue.indexOf(filter) > -1) {
            return true;
        }
    }
}

function createSortByElements(index = 0) {
    var sortByDiv = document.createElement('div');
    sortByDiv.classList.add('sort-by-div');
    var sortByLabel = document.createElement('label');
    sortByLabel.innerHTML = 'Sort By: ';

    var dropDownSortBy = document.createElement('select');
    var name = document.createElement('option');
    name.value = 'name';
    name.innerHTML = 'Name';
    var date = document.createElement('option');;
    date.value = 'date';
    date.innerHTML = 'Date';
    var stockCount = document.createElement('option');
    stockCount.value = 'stockCount';
    stockCount.innerHTML = 'Stock Count';
    dropDownSortBy.options.add(name);
    dropDownSortBy.options.add(date);
    dropDownSortBy.options.add(stockCount);

    dropDownSortBy.selectedIndex = index;

    dropDownSortBy.addEventListener('change', function (e) {
        deleteAddMedicineButton();
        deleteAllMedicineSection();
        document.getElementById('cover').parentNode.insertBefore(createSection('Medicine', 'medicine', './assets/medicine.svg', 'profiles'), document.getElementById('cover').nextSibling);
        document.getElementById('medicine').appendChild(createSortByElements(this.selectedIndex));
        displayMedicine(this.value);
        createAddMedicineButton();
    });

    sortByDiv.appendChild(sortByLabel);
    sortByDiv.appendChild(dropDownSortBy);

    return sortByDiv;
}

/**
 * Shows medicine creation div when user clicks the add medicine button.
 */
function showCreateMedicineSection() {
    var newMedicineDiv = document.createElement('div');
    newMedicineDiv.classList.add('element');
    newMedicineDiv.classList.add('rounded');

    /* Medicine Name */
    var nameTextArea = document.createElement('textarea');
    nameTextArea.classList.add('info-textarea');
    nameTextArea.placeholder = 'Medicine Name';
    nameTextArea.id = 'medicine-name-txt';
    nameTextArea.wrap = 'off';

    /* Expiration Date */
    var expirationDateInput = document.createElement('input');
    expirationDateInput.classList.add('info-textarea');
    expirationDateInput.setAttribute('type', 'date');
    expirationDateInput.setAttribute('value', new Date());
    expirationDateInput.id = 'medicine-expiration-input';

    /* Stock Count */
    var medicineStockCountInput = document.createElement('input');
    medicineStockCountInput.classList.add('info-textarea');
    medicineStockCountInput.setAttribute('type', 'number');
    medicineStockCountInput.setAttribute('value', 1);
    medicineStockCountInput.min = 1;
    medicineStockCountInput.id = 'medicine-stock-count-input';

    /* Medicine's Barcode */
    var barcodeInput = document.createElement('textarea');
    barcodeInput.classList.add('info-textarea');
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
        setTimeout(function () {
            medicineElement.classList.add('visible');
        }, 150);
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
    setTimeout(function () {
        newMedicineDiv.classList.add('visible');
    }, 50);
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
window.addEventListener('load', function () { document.getElementById('cover').parentNode.insertBefore(createSection('Medicine', 'medicine', './assets/medicine.svg', 'profiles'), document.getElementById('cover').nextSibling); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(addSearchInput()); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(createSortByElements()); });
window.addEventListener('load', displayMedicine);
window.addEventListener('load', createAddMedicineButton);