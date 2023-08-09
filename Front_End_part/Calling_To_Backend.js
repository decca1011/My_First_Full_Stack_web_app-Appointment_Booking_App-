function test() {
  // Retrieve data
  var uid = document.getElementById("username").value;
  var pwd = document.getElementById("password").value;
  var eml = document.getElementById("email").value;

  alert("user id is " + uid + ", password " + pwd +  "& email" +eml );

  var myObj = {
    name: uid,
    pass: pwd,
    em: eml,
  };

  axios.post('http://localhost:3000/post/user', myObj)
    .then((response) => {
      console.log(response);
      getOnscreen();
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getOnscreen() {
  try {
    const response = await axios.get('http://localhost:3000/get/user'); // Fetch data from the server

    const userList = response.data; // Assuming the response contains an array of user objects

    const w = document.getElementById('myList');
    w.innerHTML = ''; // Clear the list before populating

    userList.forEach((user) => {
      const x = createListItemElement(user);
      w.appendChild(x);
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(userId, listItemElement, userListElement) {
  try {
    console.log('User deleted:', userId);
    await axios.delete(`http://localhost:3000/user/${userId}`);

    // Remove the deleted list item from the UI
    listItemElement.remove();

    // Fetch and update the user list again
    await getOnscreen();
  } catch (error) {
    console.error('Error deleting user:', error, userId);
  }
}

async function editUser(user, listItemElement, userListElement) {
  const updatedName = prompt('Enter updated name:', user.name);
  const updatedPass = prompt('Enter updated password:', user.pass);
  const updatedEm = prompt('Enter updated email:', user.em);

  if (updatedName !== null && updatedPass !== null && updatedEm !== null) {
    const updatedUserData = {
      userId: user.id,
      name: updatedName,
      pass: updatedPass,
      em: updatedEm,
    };

    try {
      const response = await axios.post('http://localhost:3000/user/edit', updatedUserData);
      console.log('User updated:', response.data);

      // Update the user in the UI
      const updatedUser = response.data;
      const updatedElement = createListItemElement(updatedUser);
      listItemElement.replaceWith(updatedElement);

    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
}

function createListItemElement(user) {
  const x = document.createElement('LI');
  const getElement =
    'Name => ' +
    user.name +
    ',   ' +
    'e-mail => ' +
    user.em +
    ' ,    ' +
    '  pwd => ' +
    user.pass;
  const t = document.createTextNode(getElement);
  x.appendChild(t);

  const deleteButton = document.createElement('input');
  deleteButton.type = 'button';
  deleteButton.value = 'Delete';
  deleteButton.className = 'delete-button';
  deleteButton.onclick = () => {
    // Call a function to delete the user data from the server and then update the UI
    deleteUser(user.id, x, w);
  };
  x.appendChild(deleteButton);

  const editButton = document.createElement('input');
  editButton.type = 'button';
  editButton.value = 'Edit';
  editButton.className = 'edit-button';
  editButton.onclick = () => {
    // Call a function to edit the user data and update the UI
    editUser(user, x, w);
  };
  x.appendChild(editButton);

  return x;
}
