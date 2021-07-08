'use strict';

/** Class representing a user profile. */
class UserProfile {
    /**
      * Creates a user profile instance
      * @param {string} name - Profile's complete name
      */
    constructor(name) {
        this.name = name;
        this.createDate = new Date(Date.now()).toLocaleString();
        this.lastUpdated = new Date(Date.now()).toLocaleString();
        this.medicine = [];
    }
}

/** Creates table with user profiles.
 */
function displayProfiles() {
    var profilesSection = createSection('Profiles', 'profiles', './assets/profile.svg', 'profiles');

    /* Insert infoSection AFTER cover */
    document.getElementById('cover').parentNode.insertBefore(profilesSection, document.getElementById('cover').nextSibling);

    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    if (profileLst != null) {
        for (var profile of profileLst) {
            let profileSection = createProfileElement(profile);
            profilesSection.appendChild(profileSection);
            setTimeout(function () {
                profileSection.classList.add('visible');
            }, 100);
        }
    } else {
        localStorage.setItem('profiles', JSON.stringify([]));
    }

    let addProfileImg = document.createElement('img');
    addProfileImg.id = 'add-profile-img'
    addProfileImg.alt = 'add';
    addProfileImg.src = './assets/plus.svg';
    addProfileImg.classList.add('button');
    addProfileImg.classList.add('clickable');
    addProfileImg.classList.add('centerized-btn');
    addProfileImg.addEventListener('click', function () { showCreateProfileSection(); });

    profilesSection.appendChild(addProfileImg);
}

/**
 * Saves profile data to local storage properly.
 */
function saveProfileToLocalStorage() {
    var profileName = document.getElementById('profile-name-txt');
    if (profileName.value === '')
        return;
    var profile = new UserProfile(profileName.value.replace(' ', '_'));
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    profileLst.push(profile);
    console.log(profileLst);
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

/**
 * Saves profile data to local storage properly.
 */
function replaceProfileToLocalStorage(oldName, newName, created = '') {
    if (oldName.value === '')
        return;
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    var newProf = new UserProfile(newName);
    if (created !== '')
        newProf.createDate = created;
    profileLst = profileLst.map(profile => profile.name !== oldName ? profile : newProf);
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

/**
 * Deletes profile data from local storage.
 */
function deleteProfileFromLocalStorage(profileName) {
    console.log(profileName)
    if (profileName === '')
        return;
    let profileLst = JSON.parse(localStorage.getItem('profiles'));
    let newProfileLst = profileLst.filter(item => item.name !== profileName);
    localStorage.setItem('profiles', JSON.stringify(newProfileLst));
}

/**
 * Create new profile, given a user profile object.
 * @param {UserProfile} profile - Profile's instance
 * 
 * @returns {Element} a div element (profile's new div)
 */
function createProfileElement(profile) {

    var profileDiv = document.createElement('div');
    profileDiv.classList.add('rounded');
    profileDiv.classList.add('element');

    var infoDiv = document.createElement('div');
    infoDiv.classList.add('info-div');

    var profileNameValue = document.createElement('a');
    profileNameValue.classList.add('create-profile-labels');
    profileNameValue.classList.add('profile-name');
    profileNameValue.innerHTML = profile.name;
    profileNameValue.href = 'medicine_list.html';
    profileNameValue.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.setItem('currProfile', profile.name);
        window.location.href = 'medicine_list.html';
    });
    profileDiv.appendChild(profileNameValue);

    var totalMedicineLabel = document.createElement('label');
    totalMedicineLabel.innerHTML = 'Total Medicine: '.bold();
    var totalMedicineValue = document.createElement('label');
    totalMedicineValue.innerHTML = profile.medicine.length;
    totalMedicineValue.classList.add('create-profile-labels');

    var createdLabel = document.createElement('label');
    createdLabel.innerHTML = 'Created: '.bold();
    var createdValue = document.createElement('label');
    createdValue.innerHTML = profile.createDate;
    createdValue.classList.add('created-label');

    var lastUpdatedLabel = document.createElement('label');
    lastUpdatedLabel.innerHTML = 'Last Updated: '.bold();
    var lastUpdatedValue = document.createElement('label');
    lastUpdatedValue.innerHTML = profile.lastUpdated;
    lastUpdatedValue.classList.add('last-updated-label');

    infoDiv.appendChild(totalMedicineLabel);
    infoDiv.appendChild(totalMedicineValue);
    infoDiv.appendChild(createdLabel);
    infoDiv.appendChild(createdValue);
    infoDiv.appendChild(lastUpdatedLabel);
    infoDiv.appendChild(lastUpdatedValue);
    profileDiv.appendChild(infoDiv);

    var buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');
    buttonDiv.appendChild(createModifyButton(profileDiv));
    buttonDiv.appendChild(createDeleteButton(profileDiv, profile.name));
    profileDiv.appendChild(buttonDiv);

    return profileDiv;
}

/**
 * Creates a delete button for existing user profile (section).
 * @param {Element} medicineSection - Profile's section
 * @param {string} medicineName - Profile's complete name
 */
function createDeleteButton(profileSection, profileName) {
    var deleteProfileButton = document.createElement('div');
    deleteProfileButton.style.display = 'inline-block;';
    var deleteImg = document.createElement('img');
    deleteImg.src = './assets/deny.svg';
    deleteImg.classList.add('create-profile-btn');
    deleteImg.classList.add('clickable');
    deleteImg.addEventListener('click', function () { deleteProfileFromLocalStorage(profileName); profileSection.remove(); });
    deleteProfileButton.appendChild(deleteImg);
    return deleteProfileButton;
}

/**
 * Creates a modification button for existing profile (section).
 * @param {Element} profileSection - Profiles's section
 */
function createModifyButton(profileSection) {
    var modifyProfileButton = document.createElement('div');
    modifyProfileButton.style.display = 'inline-block;';
    var modifyImg = document.createElement('img');
    modifyImg.src = './assets/edit.svg';
    modifyImg.classList.add('create-profile-btn');
    modifyImg.classList.add('clickable');
    modifyImg.addEventListener('click', function () { showModificationWindow(profileSection); });
    modifyProfileButton.appendChild(modifyImg);
    return modifyProfileButton;
}

/**
 * Shows profile creation div when user clicks the add profile button.
 */
function showCreateProfileSection(profileName = '', created = '') {
    var newProfileDiv = document.createElement('div');
    newProfileDiv.classList.add('rounded');
    newProfileDiv.classList.add('element');
    newProfileDiv.classList.add('visible');
    var textArea = document.createElement('textarea');
    textArea.placeholder = 'Profile Name';
    textArea.id = 'profile-name-txt';
    textArea.classList.add('info-textarea');
    textArea.wrap = 'off';
    if (profileName !== '') {
        textArea.innerText = profileName;
        textArea.value = profileName.toString();
    }
    var buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');
    var okImg = document.createElement('img');
    okImg.src = './assets/ok.svg';
    okImg.classList.add('create-profile-btn');
    okImg.classList.add('clickable');
    okImg.addEventListener('click', function () {
        if (textArea.value !== '' && !profileExists(textArea.value)) {
            let profile = new UserProfile(textArea.value);
            if (created !== '')
                profile.createDate = created;
            let newProfile = createProfileElement(profile);
            document.getElementById('add-profile-img').parentNode.insertBefore(newProfile, document.getElementById('add-profile-img'));
            setTimeout(function () {
                newProfile.classList.add('visible');
            }, 150);
            if (profileName !== '') {
                if (created !== '') {
                    replaceProfileToLocalStorage(profileName, textArea.value, created);
                }
            }
            else
                saveProfileToLocalStorage();
            newProfileDiv.remove();
        } else {
            textArea.classList.add('warning');
            if (textArea.value === '')
                textArea.placeholder = 'Not a valid name';
            else {
                textArea.value = '';
                textArea.innerText = '';
                textArea.placeholder = 'Profile already exists';
            }
        }
    });
    var cancelImg = document.createElement('img');
    cancelImg.src = './assets/deny.svg';
    cancelImg.classList.add('create-profile-btn');
    cancelImg.classList.add('clickable');
    cancelImg.addEventListener('click', function () {
        if (profileName !== '') {
            let profile = new UserProfile(profileName);
            let profileElement = createProfileElement(profile);
            document.getElementById('add-profile-img').parentNode.insertBefore(profileElement, document.getElementById('add-profile-img'));
            setTimeout(function () {
                profileElement.classList.add('visible');
            }, 150);
        }
        newProfileDiv.remove();
    });
    buttonDiv.appendChild(okImg);
    buttonDiv.appendChild(cancelImg);
    newProfileDiv.appendChild(textArea);
    newProfileDiv.appendChild(buttonDiv);
    document.getElementById('add-profile-img').parentNode.insertBefore(newProfileDiv, document.getElementById('add-profile-img'));
}

/**
 * Checks if profile already exists in localstorage.
 * @param profileName the name of the profile we are checking
 * @returns true if already exists, false otherwise.
 */
function profileExists(profileName) {
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    for (var profile of profileLst) {
        if (profile.name === profileName) {
            return true;
        }
    }
    return false;
}

/**
 * Saves the last updated timestamp.
 * @param profileName the name of the profile updated.
 */
function saveLastUpdated(profileName) {
    var profileLst = JSON.parse(localStorage.getItem('profiles'));
    for (var profile of profileLst) {
        if (profile.name === profileName) {
            profile.lastUpdated = new Date(Date.now()).toLocaleString();
        }
    }
    localStorage.setItem('profiles', JSON.stringify(profileLst));
}

/** 
 * Shows the medicine modification window.
 * Triggered when the user clicks the modify button.
 * 
 * @param {Element} profileSection medicine to be marked
 */
function showModificationWindow(profileSection) {
    profileSection.style.display = 'none';
    var profileName = profileSection.getElementsByClassName('profile-name')[0].innerText;
    showCreateProfileSection(profileName, profileSection.getElementsByClassName('created-label')[0].innerText);
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

/**
 * Sets the apropriate theme. Checks to see if a relative
 * record exists in localstorage, else checks the user's
 * operating system theme.
 */
function setTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light-theme') {
        document.getElementById('change-theme-img').src = './assets/dark.svg';
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        document.getElementById('change-theme-img').src = 'assets/dark.svg';
    } else if (currentTheme === 'dark-theme') {
        document.getElementById('change-theme-img').src = './assets/light.svg';
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        document.getElementById('change-theme-img').src = 'assets/light.svg';
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.add('light-theme');
        }
    }
}

const btn = document.getElementById('change-theme-img');
btn.addEventListener('click', function () {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        this.src = 'assets/dark.svg';
        localStorage.setItem('theme', 'light-theme');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        this.src = 'assets/light.svg';
        localStorage.setItem('theme', 'dark-theme');
    }
});

window.addEventListener('load', setTheme);
window.addEventListener('load', displayProfiles);
