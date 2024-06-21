// Validate Name
let profileName = document.getElementById("profileName");
let nameError = document.getElementById("nameError");
let namePattern = /^[^0-9]*$/;

profileName.addEventListener("input", validateName);

function validateName() {
    if (namePattern.test(profileName.value)) {
        nameError.innerHTML = "";
        return true;
    } else {
        nameError.innerHTML = "Numbers are not allowed";
        return false;
    }
}

// Validate Email
let profileEmail = document.getElementById("profileEmail");
let emailError = document.getElementById("emailError");
let emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

profileEmail.addEventListener("input", validateEmail);

function validateEmail() {
    if (emailPattern.test(profileEmail.value)) {
        emailError.innerHTML = "";
        return true;
    } else {
        emailError.innerHTML = "This email is not valid";
        return false;
    }
}

// Validate Phone
let profilePhone = document.getElementById("profilePhone");
let phoneError = document.getElementById("phoneError");
let phonePattern = /^(?:\+962[0-9]{9}|07[789][0-9]{7})$/;

profilePhone.addEventListener("input", validatePhone);

function validatePhone() {
    if (phonePattern.test(profilePhone.value)) {
        phoneError.innerHTML = "";
        return true;
    } else {
        phoneError.innerHTML = "Invalid Jordanian phone number";
        return false;
    }
}

// Validate New Password
let newPassword = document.getElementById("newPassword");
let newPasswordError = document.getElementById("newPasswordError");

newPassword.addEventListener("input", validateNewPassword);

function validateNewPassword() {
    if (newPassword.value.length < 6) {
        newPasswordError.innerHTML = "Password must be at least 6 characters long";
        return false;
    } else {
        newPasswordError.innerHTML = "";
        return true;
    }
}

// Validate Confirm Password
let confirmPassword = document.getElementById("confirmPassword");
let confirmPasswordError = document.getElementById("confirmPasswordError");

confirmPassword.addEventListener("input", validateConfirmPassword);

function validateConfirmPassword() {
    if (confirmPassword.value !== newPassword.value) {
        confirmPasswordError.innerHTML = "Passwords do not match";
        return false;
    } else {
        confirmPasswordError.innerHTML = "";
        return true;
    }
}



// localStorage.setItem("currentPassword",123123)
// النص المشفر Base64
let encodedPassword = "MTIzQWJjJiY=";

// فك التشفير إلى النص الأصلي
let decodedPassword = atob(encodedPassword);

console.log(decodedPassword);  // ستظهر "123Abc&&"

// Validate Current Password
let currentPassword = document.getElementById("currentPassword");
let currentPasswordError = document.getElementById("currentPasswordError");

currentPassword.addEventListener("input", validateCurrentPassword);

function validateCurrentPassword() {
    const savedPassword = decodedPassword ;
    if (currentPassword.value === savedPassword) {
        currentPasswordError.innerHTML = "";
        return true;
    } else {
        currentPasswordError.innerHTML = "Current password is incorrect";
        return false;
    }
}

// Save Profile
document.addEventListener('DOMContentLoaded', function() {
    loadProfileForEdit();
    loadSavedProfileData();

    document.getElementById('saveProfileButton').addEventListener('click', saveProfile);
    document.getElementById('cancelEditButton').addEventListener('click', cancelEdit);
});

function saveProfile(event) {
    event.preventDefault();


// التحقق من صحة جميع الحقول
var isNameValid = validateName();
var isEmailValid = validateEmail();
var isPhoneValid = validatePhone();
var isNewPasswordValid = true;
var isConfirmPasswordValid = true;

// تحقق من صحة كلمة المرور الجديدة فقط إذا تم إدخالها
if (newPassword.value !== "" || confirmPassword.value !== "") {
    isNewPasswordValid = validateNewPassword();
    isConfirmPasswordValid = validateConfirmPassword();
}

// تحقق من صحة كلمة المرور الحالية فقط إذا تم إدخال كلمة مرور جديدة
var isCurrentPasswordValid = true;
if (newPassword.value !== "" && confirmPassword.value !== "") {
    isCurrentPasswordValid = validateCurrentPassword();
}


    // Validate all fields
    if (isNameValid && isEmailValid && isPhoneValid && isCurrentPasswordValid && (newPassword.value === "" || (isNewPasswordValid && isConfirmPasswordValid))) {
        try {
            const fullName = profileName.value.split(' ');
            const email = profileEmail.value;
            const phone = profilePhone.value;
            const profilePhoto = document.getElementById('profilePhotoPreview').src;

            const firstName = fullName[0];
            const lastName = fullName[1];

            // Retrieve existing profile data
            const existingProfileData = JSON.parse(localStorage.getItem('profileData')) || {};

            // Update personal information
            const updatedPersonalInformation = {
                ...existingProfileData.personal_information,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                profile_photo: profilePhoto
            };

            // Merge updated personal information with existing profile data
            const updatedProfileData = {
                ...existingProfileData,
                personal_information: updatedPersonalInformation
            };

            // Save updated profile data to localStorage
            localStorage.setItem('profileData', JSON.stringify(updatedProfileData));

           // Check if new password is entered
          const newPasswordValue = newPassword.value.trim();
          if (newPasswordValue !== "") {
           localStorage.setItem('decodedPassword', newPasswordValue);
}



            alert('Profile saved successfully!');

        } catch (error) {
            console.error('Error saving profile data:', error);
            alert('Failed to save profile data.');
        }
    } else {
        alert('Please fill out all fields correctly.');
    }
}

function loadProfileForEdit() {
    try {
        const profileData = localStorage.getItem('profileData');
        if (!profileData) {
            console.error('No profile data found in localStorage.');
            return;
        }

        const user = JSON.parse(profileData);

        // Populate form fields with profile data
        profileName.value = `${user.personal_information.first_name} ${user.personal_information.last_name}`;
        profileEmail.value = user.personal_information.email;
        profilePhone.value = user.personal_information.phone;
        profilePhoto.src=user.personal_information.profile_photo;
       

    } catch (error) {
        console.error('Error loading profile data for edit:', error);
    }
}

function loadSavedProfileData() {
    try {
        const profileData = localStorage.getItem('profileData');
        if (profileData) {
            const user = JSON.parse(profileData);

            // Populate form fields with saved profile data
            profileName.value = `${user.personal_information.first_name} ${user.personal_information.last_name}`;
            profileEmail.value = user.personal_information.email;
            profilePhone.value = user.personal_information.phone;

            if (user.personal_information.profile_photo) {
                document.getElementById('profilePhotoPreview').src = user.personal_information.profile_photo;
            }
        }

    } catch (error) {
        console.error('Error loading saved profile data:', error);
    }
}

function cancelEdit() {
    window.location.href = 'Profile.html'; // Adjust based on your actual profile page filename
}
