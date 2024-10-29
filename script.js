document.addEventListener('DOMContentLoaded', function () {
    // בדיקה אם email.js נטען בהצלחה
    if (typeof emailjs !== 'undefined') {
        // console.log("Emailjs נטען בהצלחה");
        emailjs.init("p17o6yIafOaPKlBLT");
    } else {
        return; // יציאה מוקדמת אם Emailjs לא נטען
    }

    // בדיקה אם העמוד הוא admin.html (עמוד האדמין)
    if (document.getElementById("submit-admin")) {
        // שליפה של כתובת המייל מה-LocalStorage
        const encodeEmail = localStorage.getItem('emailAdmin');
        if (encodeEmail) {
            const decodeEmail = atob(encodeEmail);
            // הצגת המייל על המסך
            document.getElementById('currentEmail').textContent = decodeEmail;
        } else {
            document.getElementById('currentEmail').textContent = 'לא הוזנה כתובת מייל';
        }

        // אירוע ללחיצה על הכפתור של האדמין לשמירת האימייל
        document.getElementById("submit-admin").addEventListener('click', function () {
            const email = document.getElementById("emailAdmin").value;

            if (validateEmail(email)) {
                //קידוד האימייל לפי - Base64
                const encodeEmail = btoa(email);
                localStorage.setItem('emailAdmin', encodeEmail)
                // console.log("כתובת המייל החדשה שנשמרה: " + email);
                
                showNotification("כתובת המייל נשמרה בהצלחה");
                // location.reload;
            } else {
                showNotification("אנא הזן כתובת מייל חוקית.");
            }
        });

    }
    // בדיקה אם העמוד הוא index.html (עמוד הטופס של המשתמש)
    if (document.getElementById("contact-form")) {
        document.getElementById("contact-form").addEventListener("submit", function (event) {
            event.preventDefault(); // מונע את הרענון של הדף
            // alert("תודה על שליחת הבקשה!");

            //שליפת המייל המאוחסן (כתובת המייל של האדמין)
            const encodeEmail = localStorage.getItem('emailAdmin');
            if (encodeEmail) {
                const decodeEmail = atob(encodeEmail);

                //שליחת מייל דרך EmailJS
                emailjs.send("service_y6v521m", "template_1mpe55g", {
                    to_email: decodeEmail,
                    from_name: document.getElementById('full-name').value,
                    from_email: document.getElementById('email').value,
                    message: document.getElementById("message").value

                })
                    .then(function (response) {
                        showNotification("המייל נשלח בהצלחה")
                      //   console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        showNotification('שליחת המייל נכשלה.');
                        // console.log('FAILED...', error);
                    });
            } else {
                showNotification("כתובת המייל של האדמין לא נשמרה.");
            }
        });
    }
//הצגץ הודעה במקום alert
function showNotification(message){
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification');
    document.body.appendChild(notification);
    setTimeout(function(){
        notification.classList.add('show');
    }, 10);

    setTimeout(()=> {
        notification.classList.remove('show');
        setTimeout(()=> notification.remove(), 300);
    }, 5000);
}




});
// פונקציה לוודא שהאימייל תקין
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}









// //שכפול לעריכה בתנאים
// document.addEventListener('DOMContentLoaded', function () {
//     emailjs.init("p17o6yIafOaPklBLT");

//     // בדיקה אם העמוד הוא admin.html (עמוד האדמין)


//     // שליפה של כתובת המייל מה-LocalStorage
//     const encodeEmail = localStorage.getItem('emailAdmin');
//     if (encodeEmail) {
//         const decodeEmail = atob(encodeEmail);
//         console.log("כתובת המייל שנמצאה: " + decodeEmail);//בדיקת פלט בקונסול

//         // הצגת המייל על המסך
//         document.getElementById('currentEmail').textContent = decodeEmail;
//     } else {
//         console.log("לא נמצאה כתובת מייל ב - LocalStorage. ");

//         document.getElementById('currentEmail').textContent = 'לא הוזנה כתובת מייל';
//     }
// });
// console.log("אחרי ההצגה");

// document.getElementById("submit-admin").addEventListener('click', function () {
//     const email = document.getElementById("emailAdmin").value;
//     if (validateEmail(email)) {
//         //קידוד האימייל לפי - Base64
//         const encodeEmail = btoa(email);
//         localStorage.setItem('emailAdmin', encodeEmail)
//         alert("כתובת המייל נשמרה בהצלחה");
//     } else {
//         alert("אנא הזן כתובת מייל חוקית.");
//     }
// });


// document.getElementById("contact-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // מונע את הרענון של הדף
//     alert("תודה על שליחת הבקשה!");
//     //שליפת המייל המאוחסן (כתובת המייל של האדמין)
//     const encodeEmail = localStorage.getItem('emailAdmin');
//     if (encodeEmail) {
//         const decodeEmail = atob(encodeEmail);
//         //שליחת מייל דרך EmailJS
//         emailjs.send("service_y6v521m", "template_y9djsm8", {
//             to_email: decodeEmail,
//             from_name: document.getElementById('full-name').value,
//             from_email: document.getElementById('email').value,
//             message: document.getElementById("message").value
//         })
//             .then(function (response) {
//                 alert("המייל נשלח בהתלחה")
//                 console.log('SUCCESS!', response.status, response.text);

//             }, function (error) {
//                 alert('שליחת המייל נכשלה.');
//                 console.log('FAILED...', error);
//             });
//     } else {
//         alert("כתובת המייל של האדמין לא נשמרה.");
//     }
// });


