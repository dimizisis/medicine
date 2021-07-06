'use strict';

//import Quagga from 'quagga';

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
                markMedicine(medicineSection);
            }, 100);
            addModifyButton(medicineSection, medicine.name);
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

function markMedicine(medicineSection) {
    var expirationDate = new Date(medicineSection.getElementsByClassName('expiration-date-label')[0].innerText.replace('Expiration Date: ', ''));
    if ((expirationDate.getTime() - getCurrentDate().getTime()) / (1000 * 3600 * 24) <= 0) {
        medicineSection.classList.remove('ahead-of-expiration');
        medicineSection.classList.remove('expires-soon');
        medicineSection.classList.add('expired');
    } else if ((expirationDate.getTime() - getCurrentDate().getTime()) / (1000 * 3600 * 24) <= 7) {
        medicineSection.classList.remove('ahead-of-expiration');
        medicineSection.classList.remove('expired');
        medicineSection.classList.add('expires-soon');
    } else {
        medicineSection.classList.remove('expired');
        medicineSection.classList.remove('expires-soon');
        medicineSection.classList.add('ahead-of-expiration');
    }
}

function getCurrentDate() {
    return new Date();
}

function modifyMedicineSection(medicineSection) {
    medicineSection.style.display = 'none';
    var name = medicineSection.getElementsByClassName('medicine-name')[0].innerText;
    var expirationDate = medicineSection.getElementsByClassName('expiration-date-label')[0].innerText.replace('Expiration Date: ', '');
    var stockCount = medicineSection.getElementsByClassName('stock-label')[0].innerText.replace('Stock Count: ', '');
    var barcode = medicineSection.getElementsByClassName('barcode-label')[0].innerText.replace('Barcode: ', '');
    var remarks = medicineSection.getElementsByClassName('remarks-label')[0].innerText.replace('Remarks: ', '');
    showCreateMedicineSection(name, expirationDate, stockCount, barcode, remarks, medicineSection);
}

/**
 * Saves medicine data to local storage properly.
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
            profile.medicine = profile.medicine.map(m => m.barcode !== newMedicineInstance.barcode ? m : newMedicineInstance);
            for (var med of profile.medicine) {
                if (med.barcode === newMedicineInstance.barcode) {
                    console.log(newMedicineInstance.barcode);
                    med.name = newMedicineInstance.name;
                    med.expirationDate = newMedicineInstance.expirationDate;
                    med.stockCount = newMedicineInstance.stockCount;
                    med.remarks = newMedicineInstance.remarks;
                    return newProfileLst;
                }
            }
            profile.medicine.push(newMedicineInstance);
        }
    }
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
    medicineNameLabel.innerHTML = medicine.name;
    medicineNameLabel.classList.add('medicine-name');

    /* Expiration Date */
    var expirationDateLabel = document.createElement('label');
    expirationDateLabel.innerHTML = 'Expiration Date: '.bold() + medicine.expirationDate;
    expirationDateLabel.classList.add('expiration-date-label');

    /* Stock Count */
    var medicineStockCountLabel = document.createElement('label');
    medicineStockCountLabel.innerHTML = 'Stock Count: '.bold() + medicine.stockCount;
    medicineStockCountLabel.classList.add('stock-label');

    /* Medicine's Barcode */
    var barcodeLabel = document.createElement('label');
    barcodeLabel.innerHTML = 'Barcode: '.bold() + medicine.barcode;
    barcodeLabel.classList.add('barcode-label');

    /* Medicine Remarks */
    var remarksLabel = document.createElement('label');
    remarksLabel.innerHTML = 'Remarks: '.bold() + medicine.remarks;
    remarksLabel.classList.add('remarks-label');

    medicineDiv.appendChild(medicineNameLabel);
    medicineDiv.appendChild(expirationDateLabel);
    medicineDiv.appendChild(medicineStockCountLabel);
    medicineDiv.appendChild(barcodeLabel);
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

function addModifyButton(medicineSection, medicineName) {
    var modifyMedicineButton = document.createElement('div');
    modifyMedicineButton.style.display = 'inline-block;';
    var modifyImg = document.createElement('img');
    modifyImg.src = './assets/edit.svg';
    modifyImg.classList.add('create-medicine-btn');
    modifyImg.classList.add('clickable');
    modifyImg.addEventListener('click', function () { modifyMedicineSection(medicineSection); });
    modifyMedicineButton.appendChild(modifyImg);
    medicineSection.appendChild(modifyMedicineButton);
}

function addSearchInput() {
    var searchInput = document.createElement('input');
    searchInput.name = 'search';
    searchInput.id = 'search-input';
    searchInput.setAttribute('type', 'search');
    searchInput.classList.add('search-input');
    searchInput.placeholder = 'Search for medicine...';

    searchInput.addEventListener('keyup', search);
    searchInput.addEventListener('input', search);

    return searchInput;
}

function search() {
    var medicineDivs, labels;
    medicineDivs = document.getElementsByClassName('element rounded visible');
    for (var i = 0; i < medicineDivs.length; ++i) {
        labels = medicineDivs[i].querySelectorAll('.medicine-name, .remarks-label, .barcode-label');
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
        document.getElementById('cover').parentNode.insertBefore(createSection('Medicine List', 'medicine', './assets/medicine.svg', 'medicine'), document.getElementById('cover').nextSibling);
        document.getElementById('medicine').appendChild(addSearchInput());
        document.getElementById('medicine').appendChild(createSortByElements(this.selectedIndex));
        displayMedicine(this.value);
        createAddMedicineButton();
    });

    sortByDiv.appendChild(sortByLabel);
    sortByDiv.appendChild(dropDownSortBy);

    return sortByDiv;
}

var _scannerIsRunning = false;

/**
 * Shows medicine creation div when user clicks the add medicine button.
 */
function showCreateMedicineSection(nameTxt = '', expirationDateTxt = '', stockCount = 1, barcodeTxt = '', remarksTxt = '', editableMedicineDiv = null) {
    var newMedicineDiv = document.createElement('div');
    newMedicineDiv.classList.add('element');
    newMedicineDiv.classList.add('rounded');
    newMedicineDiv.id = 'new-medicine-div';

    /* Medicine Name */
    var nameLabel = document.createElement('label');
    nameLabel.classList.add('create-med-lbl');
    nameLabel.innerHTML = 'Medicine Name: '.bold();
    var nameTextArea = document.createElement('textarea');
    nameTextArea.classList.add('info-textarea');
    nameTextArea.id = 'medicine-name-txt';
    nameTextArea.wrap = 'off';
    nameTextArea.innerText = nameTxt;
    nameTextArea.value = nameTxt;
    nameLabel.appendChild(nameTextArea);

    /* Expiration Date */
    var expirationDateLabel = document.createElement('label');
    expirationDateLabel.classList.add('create-med-lbl');
    expirationDateLabel.innerHTML = 'Expiration Date: '.bold();
    var expirationDateInput = document.createElement('input');
    expirationDateInput.classList.add('info-textarea');
    expirationDateInput.setAttribute('type', 'date');
    expirationDateInput.setAttribute('value', new Date());
    expirationDateInput.id = 'medicine-expiration-input';
    expirationDateInput.innerHTML = expirationDateTxt;
    expirationDateInput.value = expirationDateTxt;
    expirationDateLabel.appendChild(expirationDateInput);

    /* Stock Count */
    var medicineStockCountLabel = document.createElement('label');
    medicineStockCountLabel.classList.add('create-med-lbl');
    medicineStockCountLabel.innerHTML = 'Stock Count: '.bold();
    var medicineStockCountInput = document.createElement('input');
    medicineStockCountInput.classList.add('info-textarea');
    medicineStockCountInput.setAttribute('type', 'number');
    medicineStockCountInput.setAttribute('value', 1);
    medicineStockCountInput.min = 1;
    medicineStockCountInput.innerHTML = stockCount;
    medicineStockCountInput.value = stockCount;
    medicineStockCountInput.id = 'medicine-stock-count-input';

    medicineStockCountLabel.appendChild(medicineStockCountInput);

    /* Medicine's Barcode */
    var barcodeLabel = document.createElement('label');
    barcodeLabel.classList.add('create-med-lbl');
    barcodeLabel.innerHTML = 'Barcode: '.bold();
    var barcodeInput = document.createElement('textarea');
    barcodeInput.classList.add('info-textarea');
    barcodeInput.innerHTML = barcodeTxt;
    barcodeInput.value = barcodeTxt;

    barcodeInput.id = 'medicine-barcode-txt';
    barcodeLabel.appendChild(barcodeInput);
    var barcodeScanButton = document.createElement('img');
    barcodeScanButton.id = 'barcode-scan-btn';
    barcodeScanButton.src = './assets/scan.svg';
    barcodeScanButton.addEventListener('click', function () {
        if (!_scannerIsRunning) {
            if (document.getElementById('scanner-container') === null) {
                var cameraDiv = document.createElement('div');
                cameraDiv.id = 'scanner-container';
                document.getElementById('medicine-remakrs-txt').parentNode.insertBefore(cameraDiv, document.getElementById('medicine-remakrs-txt'));
            } else {
                document.getElementById('scanner-container').style.display = '';
            }
            startScanner();
        } else {
            Quagga.stop();
            document.getElementById('scanner-container').style.display = 'none';
            _scannerIsRunning = false;
        }
    });
    barcodeLabel.appendChild(barcodeScanButton);

    /* Medicine Remarks */
    var remarksLabel = document.createElement('label');
    remarksLabel.classList.add('create-med-lbl');
    remarksLabel.innerHTML = 'Remarks: '.bold();
    var remarksTextArea = document.createElement('textarea');
    remarksTextArea.id = 'medicine-remakrs-txt';
    remarksTextArea.classList.add('info-textarea');
    remarksTextArea.innerHTML = remarksTxt;
    remarksTextArea.value = remarksTxt;
    remarksLabel.appendChild(remarksTextArea);

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
            markMedicine(medicineElement);
            medicineElement.classList.add('visible');
        }, 150);
        saveMedicineToLocalStorage(medicine);
        newMedicineDiv.remove();
        addModifyButton(medicineElement, nameTextArea.value);
        addDeleteButton(medicineElement, nameTextArea.value);
    });
    var cancelImg = document.createElement('img');
    cancelImg.src = './assets/deny.svg';
    cancelImg.classList.add('create-medicine-btn');
    cancelImg.classList.add('clickable');
    cancelImg.addEventListener('click', function () { newMedicineDiv.remove(); Quagga.stop(); });
    buttonDiv.appendChild(okImg);
    buttonDiv.appendChild(cancelImg);
    newMedicineDiv.appendChild(nameLabel);
    newMedicineDiv.appendChild(expirationDateLabel);
    newMedicineDiv.appendChild(medicineStockCountLabel);
    newMedicineDiv.appendChild(barcodeLabel);
    // newMedicineDiv.appendChild(barcodeScanButton);
    newMedicineDiv.appendChild(remarksLabel);
    newMedicineDiv.appendChild(buttonDiv);
    if (editableMedicineDiv === null)
        document.getElementById('add-medicine-img').parentNode.insertBefore(newMedicineDiv, document.getElementById('add-medicine-img'));
    else
        editableMedicineDiv.parentNode.insertBefore(newMedicineDiv, editableMedicineDiv);
    setTimeout(function () {
        newMedicineDiv.classList.add('visible');
    }, 50);
}

function startScanner() {
    Quagga.init({
        inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 380,
                height: 220,
                facingMode: 'environment'
            },
        },
        decoder: {
            readers: [
                'code_128_reader',
                'ean_reader',
                'ean_8_reader',
                'code_39_reader',
                'code_39_vin_reader',
                'codabar_reader',
                'upc_reader',
                'upc_e_reader',
                'i2of5_reader'
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            console.log(err);
            return
        }

        console.log('Initialization finished. Ready to start');
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
    });


    Quagga.onDetected(function (result) {
        console.log('Barcode detected and processed : [' + result.codeResult.code + ']', result);
    });
}

function getProfileInstance() {
    if (getProfileName() === '')
        return;
    let profileLst = JSON.parse(localStorage.getItem('profiles'));
    if (profileLst.find(findProfileByName) === undefined)
        window.location.href = '404.html';
    return profileLst.find(findProfileByName);
}

function findProfileByName(profile) {
    return profile.name === getProfileName();
}

function getProfileName() {
    return window.location.href.split('profile=')[1];
}

function setTheme() {
    if (localStorage.getItem('theme') === 'light-theme') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    }
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

window.addEventListener('load', setTheme);
window.addEventListener('load', function () { document.getElementById('cover').parentNode.insertBefore(createSection('Medicine List', 'medicine', './assets/medicine.svg', 'profiles'), document.getElementById('cover').nextSibling); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(addSearchInput()); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(createSortByElements()); });
window.addEventListener('load', displayMedicine);
window.addEventListener('load', createAddMedicineButton);
