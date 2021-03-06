## Classes

<dl>
<dt><a href="#UserProfile">UserProfile</a></dt>
<dd><p>Class representing a user profile.</p>
</dd>
<dt><a href="#Medicine">Medicine</a></dt>
<dd><p>Class representing a drug (medicine).</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#displayProfiles">displayProfiles()</a></dt>
<dd><p>Creates table with user profiles.</p>
</dd>
<dt><a href="#saveProfileToLocalStorage">saveProfileToLocalStorage()</a></dt>
<dd><p>Saves profile data to local storage properly.</p>
</dd>
<dt><a href="#replaceProfileToLocalStorage">replaceProfileToLocalStorage()</a></dt>
<dd><p>Saves profile data to local storage properly.</p>
</dd>
<dt><a href="#deleteProfileFromLocalStorage">deleteProfileFromLocalStorage()</a></dt>
<dd><p>Deletes profile data from local storage.</p>
</dd>
<dt><a href="#createProfileElement">createProfileElement(profile)</a> ⇒ <code>Element</code></dt>
<dd><p>Create new profile, given a user profile object.</p>
</dd>
<dt><a href="#createDeleteButton">createDeleteButton(medicineSection, medicineName)</a></dt>
<dd><p>Creates a delete button for existing user profile (section).</p>
</dd>
<dt><a href="#createModifyButton">createModifyButton(profileSection)</a></dt>
<dd><p>Creates a modification button for existing profile (section).</p>
</dd>
<dt><a href="#showCreateProfileSection">showCreateProfileSection()</a></dt>
<dd><p>Shows profile creation div when user clicks the add profile button.</p>
</dd>
<dt><a href="#profileExists">profileExists(profileName)</a> ⇒</dt>
<dd><p>Checks if profile already exists in localstorage.</p>
</dd>
<dt><a href="#saveLastUpdated">saveLastUpdated(profileName)</a></dt>
<dd><p>Saves the last updated timestamp.</p>
</dd>
<dt><a href="#showModificationWindow">showModificationWindow(profileSection)</a></dt>
<dd><p>Shows the medicine modification window.
Triggered when the user clicks the modify button.</p>
</dd>
<dt><a href="#createSection">createSection(headerStr, categoryIconSrc, categoryIconAltTxt)</a> ⇒ <code>Element</code></dt>
<dd><p>Creates a section, along with its header
and icon.</p>
</dd>
<dt><a href="#setTheme">setTheme()</a></dt>
<dd><p>Sets the apropriate theme. Checks to see if a relative
record exists in localstorage, else checks the user&#39;s
operating system theme.</p>
</dd>
<dt><a href="#arrayToCsv">arrayToCsv()</a></dt>
<dd><p>Convert an array into a CSV string</p>
</dd>
<dt><a href="#createImportExportDiv">createImportExportDiv()</a> ⇒</dt>
<dd><p>Creates a div element for the import/export buttons.</p>
</dd>
<dt><a href="#uploadCSV">uploadCSV()</a></dt>
<dd><p>Triggers the hidden input element.
Triggered each time user presses the &#39;upload&#39; button.</p>
</dd>
<dt><a href="#downloadCSV">downloadCSV()</a></dt>
<dd><p>Prepares a CSV file and starts the download.
Triggered each time user presses the &#39;download&#39; button.</p>
</dd>
<dt><a href="#parse">parse(data)</a></dt>
<dd><p>Parses CSV and sets the new data (medicine list).</p>
</dd>
<dt><a href="#displayMedicine">displayMedicine(sortBy)</a></dt>
<dd><p>Creates table with user&#39;s medicine.</p>
</dd>
<dt><a href="#deleteAllMedicineSection">deleteAllMedicineSection()</a></dt>
<dd><p>Deletes the section with all medicine (list).</p>
</dd>
<dt><a href="#deleteAddMedicineButton">deleteAddMedicineButton()</a></dt>
<dd><p>Deletes &#39;add medicine&#39; button.</p>
</dd>
<dt><a href="#createAddMedicineButton">createAddMedicineButton()</a></dt>
<dd><p>Creates the &#39;add medicine&#39; button.</p>
</dd>
<dt><a href="#markMedicineByExpirationDate">markMedicineByExpirationDate(medicineSection)</a></dt>
<dd><p>Marks each medicine accourding to their expiration date.
Red: expired or expires today
Yellow: expires soon
Green: ahead of expiration time</p>
</dd>
<dt><a href="#showModificationWindow">showModificationWindow(medicineSection)</a></dt>
<dd><p>Shows the medicine modification window.
Triggered when the user clicks the modify button.</p>
</dd>
<dt><a href="#saveMedicineToLocalStorage">saveMedicineToLocalStorage()</a></dt>
<dd><p>Saves medicine data to local storage properly.</p>
</dd>
<dt><a href="#prepareNewProfileList">prepareNewProfileList(newMedicineInstance)</a> ⇒ <code>Array</code></dt>
<dd><p>Prepares the new profile list (along with all the medicine lists).
Triggered when the user creates new medicine or modifies an existing one.</p>
</dd>
<dt><a href="#deleteMedicineFromLocalStorage">deleteMedicineFromLocalStorage()</a></dt>
<dd><p>Deletes medicine data from local storage.</p>
</dd>
<dt><a href="#createMedicineElement">createMedicineElement(medicine)</a> ⇒ <code>Element</code></dt>
<dd><p>Creates new medicine, given a medicine object.</p>
</dd>
<dt><a href="#createDeleteButton">createDeleteButton(medicineSection, medicineName)</a></dt>
<dd><p>Creates a delete button for existing medicine (section).</p>
</dd>
<dt><a href="#createModifyButton">createModifyButton(medicineSection)</a></dt>
<dd><p>Creates a modification button for existing medicine (section).</p>
</dd>
<dt><a href="#createSearchInput">createSearchInput()</a> ⇒ <code>Element</code></dt>
<dd><p>Creates a new search input (text area).</p>
</dd>
<dt><a href="#search">search()</a></dt>
<dd><p>Performs search among medicine.</p>
</dd>
<dt><a href="#isSearchResult">isSearchResult(labels)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if a medicine element is a search result
based on a filter</p>
</dd>
<dt><a href="#createSortByElements">createSortByElements(index)</a> ⇒ <code>Element</code></dt>
<dd><p>Creates a sort by div area.</p>
</dd>
<dt><a href="#showCreateMedicineSection">showCreateMedicineSection(nameTxt, expirationDateTxt, stockCount, barcodeTxt, remarksTxt, editableMedicineDiv)</a></dt>
<dd><p>Shows medicine creation div when user clicks the add medicine button.
Parameters are only needed when the function is triggered due to modification.</p>
</dd>
<dt><a href="#medicineExists">medicineExists(name, expirationDate, barcode)</a> ⇒</dt>
<dd><p>Checks if a medicine already exists in the profile. Distinct key: (name, expiration date, barcode)</p>
</dd>
<dt><a href="#saveLastUpdated">saveLastUpdated()</a></dt>
<dd><p>Saves the last updated timestamp.</p>
</dd>
<dt><a href="#startScanner">startScanner()</a></dt>
<dd><p>Starts barcode scanner.</p>
</dd>
<dt><a href="#getProfileInstance">getProfileInstance()</a> ⇒ <code><a href="#UserProfile">UserProfile</a></code></dt>
<dd><p>Gets profile instance from localstorage.</p>
</dd>
<dt><a href="#findProfileByName">findProfileByName()</a> ⇒ <code><a href="#UserProfile">UserProfile</a></code></dt>
<dd><p>Returns profile instance from localstorage.</p>
</dd>
<dt><a href="#getProfileName">getProfileName()</a> ⇒ <code><a href="#UserProfile">UserProfile</a></code></dt>
<dd><p>Returns profile name from localstorage.</p>
</dd>
<dt><a href="#setTheme">setTheme()</a></dt>
<dd><p>Sets theme according to user&#39;s preference.
Dark theme is applied by default</p>
</dd>
<dt><a href="#createSection">createSection(headerStr, categoryIconSrc, categoryIconAltTxt)</a> ⇒ <code>Element</code></dt>
<dd><p>Creates a section, along with its header
and icon.</p>
</dd>
</dl>

<a name="UserProfile"></a>

## UserProfile
Class representing a user profile.

**Kind**: global class  
<a name="new_UserProfile_new"></a>

### new UserProfile(name)
Creates a user profile instance


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Profile's complete name |

<a name="Medicine"></a>

## Medicine
Class representing a drug (medicine).

**Kind**: global class  
<a name="new_Medicine_new"></a>

### new Medicine(name, expirationDate, stock, barcode, remarks)
Creates a medicine instance


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Medicine's complete name |
| expirationDate | <code>string</code> | Medicine's expiration date |
| stock | <code>int</code> | Medicine's stock |
| barcode | <code>string</code> | Medicine's barcode |
| remarks | <code>string</code> | Medicine's potential remarks |

<a name="displayProfiles"></a>

## displayProfiles()
Creates table with user profiles.

**Kind**: global function  
<a name="saveProfileToLocalStorage"></a>

## saveProfileToLocalStorage()
Saves profile data to local storage properly.

**Kind**: global function  
<a name="replaceProfileToLocalStorage"></a>

## replaceProfileToLocalStorage()
Saves profile data to local storage properly.

**Kind**: global function  
<a name="deleteProfileFromLocalStorage"></a>

## deleteProfileFromLocalStorage()
Deletes profile data from local storage.

**Kind**: global function  
<a name="createProfileElement"></a>

## createProfileElement(profile) ⇒ <code>Element</code>
Create new profile, given a user profile object.

**Kind**: global function  
**Returns**: <code>Element</code> - a div element (profile's new div)  

| Param | Type | Description |
| --- | --- | --- |
| profile | [<code>UserProfile</code>](#UserProfile) | Profile's instance |

<a name="createDeleteButton"></a>

## createDeleteButton(medicineSection, medicineName)
Creates a delete button for existing user profile (section).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| medicineSection | <code>Element</code> | Profile's section |
| medicineName | <code>string</code> | Profile's complete name |

<a name="createModifyButton"></a>

## createModifyButton(profileSection)
Creates a modification button for existing profile (section).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| profileSection | <code>Element</code> | Profiles's section |

<a name="showCreateProfileSection"></a>

## showCreateProfileSection()
Shows profile creation div when user clicks the add profile button.

**Kind**: global function  
<a name="profileExists"></a>

## profileExists(profileName) ⇒
Checks if profile already exists in localstorage.

**Kind**: global function  
**Returns**: true if already exists, false otherwise.  

| Param | Description |
| --- | --- |
| profileName | the name of the profile we are checking |

<a name="saveLastUpdated"></a>

## saveLastUpdated(profileName)
Saves the last updated timestamp.

**Kind**: global function  

| Param | Description |
| --- | --- |
| profileName | the name of the profile updated. |

<a name="showModificationWindow"></a>

## showModificationWindow(profileSection)
Shows the medicine modification window.
Triggered when the user clicks the modify button.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| profileSection | <code>Element</code> | medicine to be marked |

<a name="createSection"></a>

## createSection(headerStr, categoryIconSrc, categoryIconAltTxt) ⇒ <code>Element</code>
Creates a section, along with its header
and icon.

**Kind**: global function  
**Returns**: <code>Element</code> - Section's element  

| Param | Type | Description |
| --- | --- | --- |
| headerStr | <code>string</code> | The header's string |
| categoryIconSrc | <code>string</code> | Icon's src |
| categoryIconAltTxt | <code>string</code> | Icon's alternative text |

<a name="setTheme"></a>

## setTheme()
Sets the apropriate theme. Checks to see if a relative
record exists in localstorage, else checks the user's
operating system theme.

**Kind**: global function  
<a name="arrayToCsv"></a>

## arrayToCsv()
Convert an array into a CSV string

**Kind**: global function  
<a name="createImportExportDiv"></a>

## createImportExportDiv() ⇒
Creates a div element for the import/export buttons.

**Kind**: global function  
**Returns**: the division element  
<a name="uploadCSV"></a>

## uploadCSV()
Triggers the hidden input element.
Triggered each time user presses the 'upload' button.

**Kind**: global function  
<a name="downloadCSV"></a>

## downloadCSV()
Prepares a CSV file and starts the download.
Triggered each time user presses the 'download' button.

**Kind**: global function  
<a name="parse"></a>

## parse(data)
Parses CSV and sets the new data (medicine list).

**Kind**: global function  

| Param | Description |
| --- | --- |
| data | csv data uploaded |

<a name="displayMedicine"></a>

## displayMedicine(sortBy)
Creates table with user's medicine.

**Kind**: global function  

| Param | Default | Description |
| --- | --- | --- |
| sortBy | <code>name-asc</code> | string that represents the sort criteria |

<a name="deleteAllMedicineSection"></a>

## deleteAllMedicineSection()
Deletes the section with all medicine (list).

**Kind**: global function  
<a name="deleteAddMedicineButton"></a>

## deleteAddMedicineButton()
Deletes 'add medicine' button.

**Kind**: global function  
<a name="createAddMedicineButton"></a>

## createAddMedicineButton()
Creates the 'add medicine' button.

**Kind**: global function  
<a name="markMedicineByExpirationDate"></a>

## markMedicineByExpirationDate(medicineSection)
Marks each medicine accourding to their expiration date.
Red: expired or expires today
Yellow: expires soon
Green: ahead of expiration time

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| medicineSection | <code>Element</code> | medicine to be marked |

<a name="showModificationWindow"></a>

## showModificationWindow(medicineSection)
Shows the medicine modification window.
Triggered when the user clicks the modify button.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| medicineSection | <code>Element</code> | medicine to be marked |

<a name="saveMedicineToLocalStorage"></a>

## saveMedicineToLocalStorage()
Saves medicine data to local storage properly.

**Kind**: global function  
<a name="prepareNewProfileList"></a>

## prepareNewProfileList(newMedicineInstance) ⇒ <code>Array</code>
Prepares the new profile list (along with all the medicine lists).
Triggered when the user creates new medicine or modifies an existing one.

**Kind**: global function  
**Returns**: <code>Array</code> - the new profile list  

| Param | Type | Description |
| --- | --- | --- |
| newMedicineInstance | <code>Element</code> | medicine instance to be upserted |

<a name="deleteMedicineFromLocalStorage"></a>

## deleteMedicineFromLocalStorage()
Deletes medicine data from local storage.

**Kind**: global function  
<a name="createMedicineElement"></a>

## createMedicineElement(medicine) ⇒ <code>Element</code>
Creates new medicine, given a medicine object.

**Kind**: global function  
**Returns**: <code>Element</code> - a div element (profile's new div)  

| Param | Type | Description |
| --- | --- | --- |
| medicine | [<code>Medicine</code>](#Medicine) | Medicine's complete name |

<a name="createDeleteButton"></a>

## createDeleteButton(medicineSection, medicineName)
Creates a delete button for existing medicine (section).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| medicineSection | <code>Element</code> | Medicine's section |
| medicineName | <code>string</code> | Medicine's complete name |

<a name="createModifyButton"></a>

## createModifyButton(medicineSection)
Creates a modification button for existing medicine (section).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| medicineSection | <code>Element</code> | Medicine's section |

<a name="createSearchInput"></a>

## createSearchInput() ⇒ <code>Element</code>
Creates a new search input (text area).

**Kind**: global function  
**Returns**: <code>Element</code> - a search input element  
<a name="search"></a>

## search()
Performs search among medicine.

**Kind**: global function  
<a name="isSearchResult"></a>

## isSearchResult(labels) ⇒ <code>boolean</code>
Checks if a medicine element is a search result
based on a filter

**Kind**: global function  
**Returns**: <code>boolean</code> - true if the medicine must be returned as a search result, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| labels | <code>Array</code> | the labels within the medicine element |

<a name="createSortByElements"></a>

## createSortByElements(index) ⇒ <code>Element</code>
Creates a sort by div area.

**Kind**: global function  
**Returns**: <code>Element</code> - sort by div area.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>int</code> | <code>0</code> | the starting index of dropdown list |

<a name="showCreateMedicineSection"></a>

## showCreateMedicineSection(nameTxt, expirationDateTxt, stockCount, barcodeTxt, remarksTxt, editableMedicineDiv)
Shows medicine creation div when user clicks the add medicine button.
Parameters are only needed when the function is triggered due to modification.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| nameTxt | <code>string</code> |  | medicine's full name |
| expirationDateTxt | <code>string</code> |  | medicine's expiration date |
| stockCount | <code>int</code> | <code>1</code> | medicine's stock count |
| barcodeTxt | <code>string</code> |  | medicine's barcode |
| remarksTxt | <code>string</code> |  | remarks' text |
| editableMedicineDiv | <code>Element</code> | <code></code> | non null only when is triggered due to modification |

<a name="medicineExists"></a>

## medicineExists(name, expirationDate, barcode) ⇒
Checks if a medicine already exists in the profile. Distinct key: (name, expiration date, barcode)

**Kind**: global function  
**Returns**: true if already exists in the profile, false otherwise.  

| Param | Description |
| --- | --- |
| name | the name of the medicine |
| expirationDate | the expiration date of the medicine |
| barcode | the medicine's barcode |

<a name="saveLastUpdated"></a>

## saveLastUpdated()
Saves the last updated timestamp.

**Kind**: global function  
<a name="startScanner"></a>

## startScanner()
Starts barcode scanner.

**Kind**: global function  
<a name="getProfileInstance"></a>

## getProfileInstance() ⇒ [<code>UserProfile</code>](#UserProfile)
Gets profile instance from localstorage.

**Kind**: global function  
**Returns**: [<code>UserProfile</code>](#UserProfile) - user profile instance  
<a name="findProfileByName"></a>

## findProfileByName() ⇒ [<code>UserProfile</code>](#UserProfile)
Returns profile instance from localstorage.

**Kind**: global function  
**Returns**: [<code>UserProfile</code>](#UserProfile) - user profile instance  
<a name="getProfileName"></a>

## getProfileName() ⇒ [<code>UserProfile</code>](#UserProfile)
Returns profile name from localstorage.

**Kind**: global function  
**Returns**: [<code>UserProfile</code>](#UserProfile) - user profile instance  
<a name="setTheme"></a>

## setTheme()
Sets theme according to user's preference.
Dark theme is applied by default

**Kind**: global function  
<a name="createSection"></a>

## createSection(headerStr, categoryIconSrc, categoryIconAltTxt) ⇒ <code>Element</code>
Creates a section, along with its header
and icon.

**Kind**: global function  
**Returns**: <code>Element</code> - Section's element  

| Param | Type | Description |
| --- | --- | --- |
| headerStr | <code>string</code> | The header's string |
| categoryIconSrc | <code>string</code> | Icon's src |
| categoryIconAltTxt | <code>string</code> | Icon's alternative text |

