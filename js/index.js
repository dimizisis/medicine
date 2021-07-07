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
            addModifyButton(profileSection, profile.name);
            addDeleteButton(profileSection, profile.name);
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
    addProfileImg.addEventListener('click', showCreateProfileSection);

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

    var profileNameLabel = document.createElement('a');
    profileNameLabel.classList.add('create-profile-labels');
    profileNameLabel.classList.add('profile-name');
    profileNameLabel.innerHTML = profile.name;
    profileNameLabel.href = 'medicine_list.html?profile=' + profile.name, true;
    profileNameLabel.addEventListener('click', function () {
        window.location.href = 'medicine_list.html?profile=' + profile.name;
    });

    var totalMedicineLabel = document.createElement('label');
    totalMedicineLabel.innerHTML = 'Total Medicine: '.bold() + profile.medicine.length;
    totalMedicineLabel.classList.add('create-profile-labels');

    var createdLabel = document.createElement('label');
    createdLabel.innerHTML = 'Created: '.bold() + profile.createDate;
    createdLabel.classList.add('create-profile-labels');

    var lastUpdatedLabel = document.createElement('label');
    lastUpdatedLabel.innerHTML = 'Last Updated: '.bold() + profile.lastUpdated;
    lastUpdatedLabel.classList.add('create-profile-labels');

    profileDiv.appendChild(profileNameLabel);
    profileDiv.appendChild(totalMedicineLabel);
    profileDiv.appendChild(createdLabel);
    profileDiv.appendChild(lastUpdatedLabel);

    return profileDiv;
}

function addDeleteButton(profileSection, profileName) {
    var deleteProfileButton = document.createElement('div');
    deleteProfileButton.style.display = 'inline-block;';
    var deleteImg = document.createElement('img');
    deleteImg.src = './assets/deny.svg';
    deleteImg.classList.add('create-profile-btn');
    deleteImg.classList.add('clickable');
    deleteImg.addEventListener('click', function () { deleteProfileFromLocalStorage(profileName); profileSection.remove(); });
    deleteProfileButton.appendChild(deleteImg);
    profileSection.appendChild(deleteProfileButton);
}

function addModifyButton(profileSection, profileName) {
    var modifyProfileButton = document.createElement('div');
    modifyProfileButton.style.display = 'inline-block;';
    var modifyImg = document.createElement('img');
    modifyImg.src = './assets/edit.svg';
    modifyImg.classList.add('create-profile-btn');
    modifyImg.classList.add('clickable');
    modifyImg.addEventListener('click', function () { });
    modifyProfileButton.appendChild(modifyImg);
    profileSection.appendChild(modifyProfileButton);
}

/**
 * Shows profile creation div when user clicks the add profile button.
 */
function showCreateProfileSection() {
    var newProfileDiv = document.createElement('div');
    newProfileDiv.classList.add('rounded');
    newProfileDiv.classList.add('element');
    newProfileDiv.classList.add('visible');
    var textArea = document.createElement('textarea');
    textArea.placeholder = 'Profile Name';
    textArea.id = 'profile-name-txt';
    textArea.classList.add('info-textarea');
    var buttonDiv = document.createElement('div');
    var okImg = document.createElement('img');
    okImg.src = './assets/ok.svg';
    okImg.classList.add('create-profile-btn');
    okImg.classList.add('clickable');
    okImg.addEventListener('click', function () {
        let newProfile = createProfileElement(new UserProfile(textArea.value, 0));
        document.getElementById('add-profile-img').parentNode.insertBefore(newProfile, document.getElementById('add-profile-img'));
        setTimeout(function () {
            newProfile.classList.add('visible');
        }, 150);
        saveProfileToLocalStorage();
        newProfileDiv.remove();
        addModifyButton(newProfile, textArea.value);
        addDeleteButton(newProfile, textArea.value);
    });
    var cancelImg = document.createElement('img');
    cancelImg.src = './assets/deny.svg';
    cancelImg.classList.add('create-profile-btn');
    cancelImg.classList.add('clickable');
    cancelImg.addEventListener('click', function () { newProfileDiv.remove(); });
    buttonDiv.appendChild(okImg);
    buttonDiv.appendChild(cancelImg);
    newProfileDiv.appendChild(textArea);
    newProfileDiv.appendChild(buttonDiv);
    document.getElementById('add-profile-img').parentNode.insertBefore(newProfileDiv, document.getElementById('add-profile-img'));
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
    } else if (currentTheme === 'dark-theme') {
        document.getElementById('change-theme-img').src = './assets/light.svg';
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
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
