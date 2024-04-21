// Initialize Firebase
const config = {
    apiKey: "AIzaSyB-iPfSyGcGaF54iOt_-f8LAJwOLIzggk0",
    authDomain: "adashingata-94432.firebaseapp.com",
    projectId: "adashingata-94432",
    storageBucket: "adashingata-94432.appspot.com",
    messagingSenderId: "1047607099369",
    appId: "1:1047607099369:web:b7adc449a14eb25f499578"
};
firebase.initializeApp(config);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

// update firestore settings
db.settings({ timestampsInSnapshots: true });

const customerContactForm = document.querySelector('#contact-form');
  customerContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    customerContactForm.querySelector('.error').innerHTML = 'Sending . . .';
    db.collection('customerContact').add({
      id: customerContactForm['contact-id'].value,
      firstName: customerContactForm['contact-first-name'].value,
      lastName: customerContactForm['contact-last-name'].value,
      email: customerContactForm['contact-email'].value,
      phone: customerContactForm['contact-phone'].value,
      subject: customerContactForm['contact-subject'].value,
      message: customerContactForm['contact-message'].value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        customerContactForm.reset();
        customerContactForm.querySelector('.error').innerHTML = 'Thanks for your message. We will be in touch.';
    }).catch(err => {
        customerContactForm.querySelector('.error').innerHTML = err.message;
    });
  });