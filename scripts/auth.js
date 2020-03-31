// Tracking Auth Status (listen for auth status changes)
auth.onAuthStateChanged(user => {
  if (user) {
    // get data
    db.collection('guides')
      .get()
      .then(snapShot => {
        setupGuides(snapShot.docs);
        setupUI(user);
      });
  } else {
    setupUI();
    setupGuides([]);
  }
});

// Create new guid
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', e => {
  e.preventDefault();

  db.collection('guides')
    .add({
      content: createForm['title'].value,
      title: createForm['content'].value
    })
    .then(() => {
      // close the modal and reset

      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(err => {
      console.error(err.message);
    });
});

// Signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  });
});

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // sign up the user
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
