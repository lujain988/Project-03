async function loadProfile() {
    try {
        // حاول الحصول على البيانات من localStorage
        const storedData = localStorage.getItem('profileData');
        
        if (storedData) {
            // إذا كانت البيانات موجودة، قم بتحميلها من localStorage
            const userData = JSON.parse(storedData);
            updateProfile(userData);
            console.log('Data loaded from localStorage:', userData);
        } else {
            // إذا لم تكن البيانات موجودة، قم بتحميلها من users.json
            const response = await fetch('users.json');
            
            const data = await response.json();

            // ابحث عن المستخدم الذي حسابه HR وقم بتخزين بياناته في localStorage
            for (let i = 0; i < data.users.length; i++) {
                const user = data.users[i];
                if (user.account.is_hr) {
                    console.log('HR User Data:', user);
                    updateProfile(user);
                    localStorage.setItem('profileData', JSON.stringify(user));
                    break;
                }
            }
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function updateProfile(user) {
    document.getElementById('first_name').innerText = user.personal_information.first_name;
    document.getElementById('last_name').innerText = user.personal_information.last_name;
    document.getElementById('profilePhoto').src = user.personal_information.img;
    document.getElementById('profilePicture').src = user.personal_information.img;
    document.getElementById('profileId').innerText = user.personal_information.id;
    document.getElementById('profileEmail').innerText = user.personal_information.email;
    document.getElementById('profilePhone').innerText = user.personal_information.phone;
    document.getElementById('profileAddress').innerText = user.personal_information.address;
    document.getElementById('profileCountry').innerText = user.personal_information.country;
    document.getElementById('profileCity').innerText = user.personal_information.city;

    const educationContainer = document.getElementById('profileEducation');
    educationContainer.innerHTML = '';

    user.education.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.innerHTML = `<span>${edu.date}</span><p>${edu.description}</p>`;
        educationContainer.appendChild(eduDiv);
    });

    document.getElementById('jobTitle').innerText = user.job.job_title;
    document.getElementById('jobTitle1').innerText = user.job.job_title;
    document.getElementById('department').innerText = user.job.department;
    document.getElementById('department1').innerText = user.job.department;
    document.getElementById('employeeType').innerText = user.job.employee_type;
    document.getElementById('employeeType1').innerText = user.job.employee_type;
    document.getElementById('startDate').innerText = user.job.start_date;
    document.getElementById('contractEndDate').innerText = user.job.contract_end_date;
    document.getElementById('lineManager').innerText = user.job.line_manager;
}

// تنفيذ تحميل الملف
loadProfile();
console.log(localStorage.getItem("profileData"))