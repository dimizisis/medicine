'use strict';

/** Class representing a user profile. */
class UserProfile {
    /**
      * Creates a tennis player instance
      * @param {string} name - Player's complete name
      */
    constructor(name) {
        this.name = name;
        this.medicine = [];
    }

    /**
      * Adds a new medicine object to user's medicine list
      */
    addMedicine(m) {
        this.medicine.push(m);
    }

    /**
      * Returns a string representation of the player's instance
      */
    toString() {
        return this.name + ', ' + this.birthday + ', ' + this.birthplace + ', ' + this.citizenship + ', ' + this.height + ', ' + this.outfitter;
    }

    /**
      * Creates a Map object with player's basic info.
      * @returns {Map} a Map object
      */
    toKeyValuePair() {
        let infoMap = new Map();
        infoMap.set('Name', this.name);
        infoMap.set('Date of Birth', this.birthday);
        infoMap.set('Place of birth', this.birthplace);
        infoMap.set('Age', isNaN(parseInt(new Date().getFullYear() - new Date(this.birthday).getFullYear())) ? '-' : parseInt(new Date().getFullYear() - new Date(this.birthday).getFullYear()));
        infoMap.set('Height (m)', this.height);
        infoMap.set('Citizenship', this.citizenship);
        infoMap.set('Outfitter', this.outfitter);
        return infoMap;
    }
}

/** Class representing a user profile. */
class Medicine {
    /**
      * Creates a tennis player instance
      * @param {string} name - Player's complete name
      * @param {string} birthday - Player's birthday (MM/DD/YYYY)
      * @param {string} birthplace - Player's birthplace (country name)
      * @param {string} citizenship - Player's citizenship (country name)
      * @param {number} height - Player's height (in meters)
      * @param {string} outfitter - Player's outfitter (Brand's complete name)
      */
    constructor(name, expirationDate, barcode, remarks) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.barcode = barcode;
        this.remarks = remarks;
    }

    /**
      * Returns a string representation of the player's instance
      */
    toString() {
        return this.name + ', ' + this.birthday + ', ' + this.birthplace + ', ' + this.citizenship + ', ' + this.height + ', ' + this.outfitter;
    }

    /**
      * Creates a Map object with player's basic info.
      * @returns {Map} a Map object
      */
    toKeyValuePair() {
        let infoMap = new Map();
        infoMap.set('Name', this.name);
        infoMap.set('Date of Birth', this.birthday);
        infoMap.set('Place of birth', this.birthplace);
        infoMap.set('Age', isNaN(parseInt(new Date().getFullYear() - new Date(this.birthday).getFullYear())) ? '-' : parseInt(new Date().getFullYear() - new Date(this.birthday).getFullYear()));
        infoMap.set('Height (m)', this.height);
        infoMap.set('Citizenship', this.citizenship);
        infoMap.set('Outfitter', this.outfitter);
        return infoMap;
    }
}

/** Creates table with player's basic info
 */
function displayProfiles() {
    var profilesSection = createSection('Profiles', 'profiles', './assets/profile.svg', 'profiles');

    /* Insert infoSection AFTER cover */
    document.getElementById('cover').parentNode.insertBefore(profilesSection, document.getElementById('cover').nextSibling);

    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    if (profileLst != null) {
        console.log(profileLst);
        for (var profile of profileLst) {
            let profileSection = showProfileSection(profile.name);
            profilesSection.appendChild(profileSection);
        }
    } else {
        localStorage.setItem('profiles', JSON.stringify([]));
    }

    let addProfileImg = document.createElement('img');
    addProfileImg.id = 'add-profile-img'
    addProfileImg.alt = 'add';
    addProfileImg.src = './assets/plus.svg';
    addProfileImg.addEventListener('click', showCreateProfileSection);

    profilesSection.appendChild(addProfileImg);
}

/**
 * Saves profile data to local storage properly.
 */
function saveProfileToLocalStorage() {
    var profileName = document.getElementById('profile-name-txt');
    console.log(profileName.value)
    if (profileName.value === '')
        return;
    var profile = new UserProfile(profileName.value);
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    profileLst.push(profile);
    console.log(profileLst);
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

function showProfileSection(profileName) {
    var profileDiv = document.createElement('div');
    profileDiv.classList.add('rounded');
    var profileNameLabel = document.createElement('label');
    profileNameLabel.innerHTML = 'Profile Name: ' + profileName;
    profileNameLabel.id = 'profile-name-lbl'
    profileDiv.appendChild(profileNameLabel);
    return profileDiv;
}

function showCreateProfileSection() {
    var newProfileDiv = document.createElement('div');
    newProfileDiv.classList.add('rounded');
    var textArea = document.createElement('textarea');
    textArea.placeholder = 'Profile Name';
    textArea.id = 'profile-name-txt'
    var okButton = document.createElement('div');
    okButton.classList.add('button');
    var okImg = document.createElement('img');
    okImg.src = './assets/complete.svg'
    okButton.appendChild(okImg);
    okButton.addEventListener('click', saveProfileToLocalStorage);
    newProfileDiv.appendChild(textArea);
    newProfileDiv.appendChild(okButton);
    document.getElementById('add-profile-img').parentNode.insertBefore(newProfileDiv, document.getElementById('add-profile-img'));
}

/**
 * Creates a section, along with its header
 * and icon.
 * @param {string} headerStr - The header's string
 * @param {string} categoryIconSrc - Icon's src
 * @param {string} categoryIconAltTxt - Icon's alternative text
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

window.addEventListener('load', displayProfiles);