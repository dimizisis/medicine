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
}

/** 
 * Convert an array into a CSV string
 */
function arrayToCsv(medicine) {
    var csvStr = 'name,expirationDate,stockCount,barcode,remarks\n';
    for (var m of getProfileInstance().medicine) {
        csvStr += m.name + ',' + m.expirationDate + ',' + m.stockCount + ',' + m.barcode + ',' + m.remarks + '\n';
    }
    return csvStr;
}

function createImportExportDiv() {
    var importExportDiv = document.createElement('div');
    importExportDiv.classList.add('import-export-div');
    var importA = document.createElement('a');
    importA.id = 'import-a';
    var importImg = document.createElement('img');
    importImg.src = './assets/import.svg';
    importImg.id = 'import-img';
    importImg.classList.add('clickable');
    importA.appendChild(importImg);

    var exportA = document.createElement('a');
    exportA.id = 'export-a';
    var exportImg = document.createElement('img');
    exportImg.src = './assets/export.svg';
    exportImg.id = 'export-img';
    exportImg.classList.add('clickable');
    exportImg.addEventListener('click', downloadCSV);
    exportA.appendChild(exportImg);

    importExportDiv.appendChild(importImg);
    importExportDiv.appendChild(exportA);

    return importExportDiv;
}

function downloadCSV() {
    var exportImg = document.getElementById('export-a');
    exportImg.download = 'data.csv';
    var blob = new Blob([arrayToCsv(getProfileInstance().medicine)], { type: 'text/csv;' });
    exportImg.href = window.URL.createObjectURL(blob);
}

/** 
 * Creates table with user's medicine.
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
                markMedicineByExpirationDate(medicineSection);
            }, 100);
            createModifyButton(medicineSection);
            createDeleteButton(medicineSection, medicine.name);
            allMedicineSection.appendChild(medicineSection);
        }
    }
}

/** 
 * Deletes the section with all medicine (list).
 */
function deleteAllMedicineSection() {
    var allMedicineSection = document.getElementById('medicine');
    allMedicineSection.remove();
}

/** 
 * Deletes 'add medicine' button.
 */
function deleteAddMedicineButton() {
    var addMedicineButton = document.getElementById('add-medicine-img');
    addMedicineButton.remove();
}

/** 
 * Creates the 'add medicine' button.
 */
function createAddMedicineButton() {
    var allMedicineSection = document.getElementById('medicine');
    let addMedicineImg = document.createElement('img');
    addMedicineImg.id = 'add-medicine-img'
    addMedicineImg.alt = 'add';
    addMedicineImg.src = './assets/plus.svg';
    addMedicineImg.classList.add('button');
    addMedicineImg.classList.add('clickable');
    addMedicineImg.addEventListener('click', function () { showCreateMedicineSection(); });
    allMedicineSection.appendChild(addMedicineImg);
}

/** 
 * Marks each medicine accourding to their expiration date.
 * Red: expired or expires today
 * Yellow: expires soon
 * Green: ahead of expiration time
 * 
 * @param {Element} medicineSection medicine to be marked
 */
function markMedicineByExpirationDate(medicineSection) {
    var expirationDate = new Date(medicineSection.getElementsByClassName('expiration-date-label')[0].innerText.replace('Expiration Date: ', ''));
    if ((expirationDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24) <= 0) {
        medicineSection.classList.remove('ahead-of-expiration');
        medicineSection.classList.remove('expires-soon');
        medicineSection.classList.add('expired');
    } else if ((expirationDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24) <= 7) {
        medicineSection.classList.remove('ahead-of-expiration');
        medicineSection.classList.remove('expired');
        medicineSection.classList.add('expires-soon');
    } else {
        medicineSection.classList.remove('expired');
        medicineSection.classList.remove('expires-soon');
        medicineSection.classList.add('ahead-of-expiration');
    }
}

/** 
 * Shows the medicine modification window.
 * Triggered when the user clicks the modify button.
 * 
 * @param {Element} medicineSection medicine to be marked
 */
function showModificationWindow(medicineSection) {
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

/** 
 * Prepares the new profile list (along with all the medicine lists).
 * Triggered when the user creates new medicine or modifies an existing one.
 * 
 * @param {Element} newMedicineInstance medicine instance to be upserted
 * @returns {Array} the new profile list
 */
function prepareNewProfileList(newMedicineInstance) {
    var profileName = getProfileName();
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    var newProfileLst = [...profileLst];
    for (var profile of newProfileLst) {
        if (profile.name === profileName) {
            profile.medicine = profile.medicine.map(m => m.barcode !== newMedicineInstance.barcode ? m : newMedicineInstance);
            for (var med of profile.medicine) {
                if (med.barcode === newMedicineInstance.barcode) {
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

/**
 * Creates a delete button for existing medicine (section).
 * @param {Element} medicineSection - Medicine's section
 * @param {string} medicineName - Medicine's complete name
 */
function createDeleteButton(medicineSection, medicineName) {
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
 * Creates a modification button for existing medicine (section).
 * @param {Element} medicineSection - Medicine's section
 */
function createModifyButton(medicineSection) {
    var modifyMedicineButton = document.createElement('div');
    modifyMedicineButton.style.display = 'inline-block;';
    var modifyImg = document.createElement('img');
    modifyImg.src = './assets/edit.svg';
    modifyImg.classList.add('create-medicine-btn');
    modifyImg.classList.add('clickable');
    modifyImg.addEventListener('click', function () { showModificationWindow(medicineSection); });
    modifyMedicineButton.appendChild(modifyImg);
    medicineSection.appendChild(modifyMedicineButton);
}

/**
 * Creates a new search input (text area).
 * @returns {Element} a search input element
 */
function createSearchInput() {
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

/**
 * Performs search among medicine.
 */
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

/**
 * Checks if a medicine element is a search result
 * based on a filter
 * @param {Array} labels the labels within the medicine element
 * @returns {boolean} true if the medicine must be returned as a search result, false otherwise.
 */
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

/**
 * Creates a sort by div area.
 * @param {int} index the starting index of dropdown list
 * @returns {Element} sort by div area.
 */
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
        document.getElementById('medicine').appendChild(createSearchInput());
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
 * Parameters are only needed when the function is triggered due to modification.
 * @param {string} nameTxt medicine's full name
 * @param {string} expirationDateTxt medicine's expiration date
 * @param {int} stockCount medicine's stock count
 * @param {string} barcodeTxt medicine's barcode
 * @param {string} remarksTxt remarks' text
 * @param {Element} editableMedicineDiv non null only when is triggered due to modification
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
    if (nameTxt !== '') {
        nameTextArea.innerText = nameTxt;
        nameTextArea.value = nameTxt;
    }
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

    var cameraDiv = document.createElement('div');
    cameraDiv.id = 'scanner-container';
    cameraDiv.style.display = 'none';

    barcodeScanButton.addEventListener('click', function () {
        if (!_scannerIsRunning) {
            cameraDiv.style.display = '';
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
    remarksLabel.id = 'remarks-lbl';
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
            markMedicineByExpirationDate(medicineElement);
            medicineElement.classList.add('visible');
        }, 150);
        saveMedicineToLocalStorage(medicine);
        newMedicineDiv.remove();
        createModifyButton(medicineElement);
        createDeleteButton(medicineElement, nameTextArea.value);
        saveLastUpdated();
    });

    var cancelImg = document.createElement('img');
    cancelImg.src = './assets/deny.svg';
    cancelImg.classList.add('create-medicine-btn');
    cancelImg.classList.add('clickable');
    cancelImg.addEventListener('click', function () {
        Quagga.stop();
        newMedicineDiv.remove();
        if (nameTxt !== '') {
            let medicine = new Medicine(nameTextArea.value, expirationDateInput.value, medicineStockCountInput.value, barcodeInput.value, remarksTextArea.value);
            let medicineElement = createMedicineElement(medicine);
            document.getElementById('add-medicine-img').parentNode.insertBefore(medicineElement, document.getElementById('add-medicine-img'));
            setTimeout(function () {
                markMedicineByExpirationDate(medicineElement);
                medicineElement.classList.add('visible');
            }, 150);
            createModifyButton(medicineElement);
            createDeleteButton(medicineElement, nameTextArea.value);
        }
    });
    buttonDiv.appendChild(okImg);
    buttonDiv.appendChild(cancelImg);

    newMedicineDiv.appendChild(nameLabel);
    newMedicineDiv.appendChild(expirationDateLabel);
    newMedicineDiv.appendChild(medicineStockCountLabel);
    newMedicineDiv.appendChild(barcodeLabel);
    newMedicineDiv.appendChild(cameraDiv);
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

function saveLastUpdated() {
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    var curProfile = getProfileInstance();
    for (var profile of profileLst) {
        if (profile.name === getProfileName()) {
            profile.lastUpdated = new Date(Date.now()).toLocaleString();
        }
    }
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

/**
 * Starts barcode scanner.
 */
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
            Quagga.stop();
            document.getElementById('scanner-container').style.display = 'none';
            console.log(err);
            return
        }

        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
    });


    Quagga.onDetected(function (result) {
        document.getElementById('medicine-barcode-txt').value = result.codeResult.code;
        Quagga.stop();
        document.getElementById('scanner-container').style.display = 'none';
        _scannerIsRunning = false;
    });
}

/**
 * Gets profile instance from localstorage.
 * @returns {UserProfile} user profile instance
 */
function getProfileInstance() {
    if (getProfileName() === '')
        return;
    let profileLst = JSON.parse(localStorage.getItem('profiles'));
    if (profileLst.find(findProfileByName) === undefined)
        window.location.href = '404.html';
    return profileLst.find(findProfileByName);
}

/**
 * Returns profile instance from localstorage.
 * @returns {UserProfile} user profile instance
 */
function findProfileByName(profile) {
    return profile.name === getProfileName();
}

/**
 * Returns profile name from localstorage.
 * @returns {UserProfile} user profile instance
 */
function getProfileName() {
    return localStorage.getItem('currProfile');
}

/**
 * Sets theme according to user's preference.
 * Dark theme is applied by default
 */
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

document.getElementById('back-btn').addEventListener('click', function () { window.location.href = 'index.html'; });
window.addEventListener('load', setTheme);
window.addEventListener('load', function () { document.getElementById('cover').parentNode.insertBefore(createSection('Medicine List', 'medicine', './assets/medicine.svg', 'profiles'), document.getElementById('cover').nextSibling); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(createSearchInput()); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(createImportExportDiv()); });
window.addEventListener('load', function () { document.getElementById('medicine').appendChild(createSortByElements()); });
window.addEventListener('load', displayMedicine);
window.addEventListener('load', createAddMedicineButton);
