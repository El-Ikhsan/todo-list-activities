const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const userActivities = document.getElementById("userActivities");
const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");
const updateForm = document.getElementById("updateForms");


document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('https://toha-todo-list-activities.vercel.app/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const result = await response.json();
    alert('your account created successfully!');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('https://toha-todo-list-activities.vercel.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.json();
    alert('logged in to your account successfully!');
    const token = result.data.token;
    sessionStorage.setItem('token', token); 
    showUserProfile(token);
  } catch (error) {
    console.error(error);
  }
});


async function showUserProfile(token) {
  try {
    const response = await fetch('https://toha-todo-list-activities.vercel.app/api/users/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const user = await response.json();
    console.log(user);
    userInfo.innerText = `Username: ${user.data.username} \tName: ${user.data.name}`;
    container.classList.add("hidden");
    userActivities.classList.remove("hidden");
  } catch (error) {
    console.error(error);
  }
}


document.getElementById('updateForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = sessionStorage.getItem('token'); 
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('https://toha-todo-list-activities.vercel.app/api/users/current', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }

    const result = await response.json();
    alert('your account updated successfully!');
    console.log(result);
    showUserProfile(token);
  } catch (error) {
    console.error(error);
  }
});

logoutBtn.addEventListener('click', async () => {
  const token = sessionStorage.getItem('token'); 

  try {
    const response = await fetch('https://toha-todo-list-activities.vercel.app/api/users/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    sessionStorage.removeItem('token'); 
    container.classList.remove("hidden");
    userActivities.classList.add("hidden");
  } catch (error) {
    console.error(error);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    showUserProfile(token);
  }
});

document.getElementById('inputActivity').addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = sessionStorage.getItem('token'); 
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
      const response = await fetch('https://toha-todo-list-activities.vercel.app/api/activities', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'authorization': token
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Failed to create activity');
      }

      const result = await response.json();
      const activityId = result.data.id;
      alert('Activity created successfully!');
      console.log(activityId);
      getActivityForm(activityId);
  } catch (error) {
      console.error(error);
      alert('Error creating activity');
  }
});

async function getActivityForm (activityId) {
  const token = sessionStorage.getItem('token');


  try {
      const response = await fetch(`https://toha-todo-list-activities.vercel.app/api/activities/${activityId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
      });

      if (!response.ok) {
          throw new Error('Failed to get activity');
      }

      const result = await response.json();
      const activityContainer = document.getElementById('getActivityResult');
      activityContainer.innerHTML = '';
      const activityElement = makeActivity(result.data);
      activityContainer.appendChild(activityElement);
    
  } catch (error) {
      console.error(error);
      alert('Error getting activity');
  }
}

function makeActivity(activityData) {
  const title = document.createElement('h3');
  title.innerText = activityData.title;

  const information = document.createElement('p');
  information.innerText = activityData.information;

  const day = document.createElement('p');
  day.innerText = activityData.day;

  const date = document.createElement('p');
  date.innerText = activityData.date;

  const time = document.createElement('p');
  time.innerText = activityData.time;

  const textContainer = document.createElement('div');
  textContainer.classList.add('bio');
  textContainer.append(title, information, day, date, time);

  const container = document.createElement('article');
  container.classList.add('activityItem');
  container.append(textContainer);
  container.setAttribute('id', `${activityData.id}`);

  const trashButton = document.createElement('button');
  trashButton.classList.add('trash');
  trashButton.addEventListener('click', function () {
    removeActivity(activityData.id);
  });

  const editButton = document.createElement('button');
  editButton.classList.add('edit');
  editButton.addEventListener('click', function () {
    sessionStorage.setItem("activityId", activityData.id);
    updateActivity();
  });

  const trashIcon = document.createElement('img');
  trashIcon.setAttribute('src', 'assets/delete.png');
  trashButton.append(trashIcon);

  const editIcon = document.createElement('img');
  editIcon.setAttribute('src', 'assets/edit.png');
  editButton.append(editIcon);

  const actionContainer = document.createElement('div');
  actionContainer.classList.add('action');
  actionContainer.append(editButton, trashButton);
  container.append(actionContainer);

  return container;
}

const updateActivityForm = document.getElementById('updateActivityForm');
const handleUpdateActivitySubmit = async (event) => {
  event.preventDefault();
  const token = sessionStorage.getItem("token");
  const Id = sessionStorage.getItem("activityId");
  const activityId = parseInt(Id);
  console.log(activityId);
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    const response = await fetch(`https://toha-todo-list-activities.vercel.app/api/activities/${activityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update activity');
    }

    const result = await response.json();
    userActivities.classList.remove("hidden");
    updateForm.classList.add("hidden");
    getActivityForm(result.data.id);

  } catch (error) {
    console.error(error);
  }
};

const updateActivity = () => {
  userActivities.classList.add("hidden");
  updateForm.classList.remove("hidden");

  updateActivityForm.removeEventListener('submit', handleUpdateActivitySubmit);
  updateActivityForm.addEventListener('submit', handleUpdateActivitySubmit);
};

async function removeActivity(activityId) {
  const token = sessionStorage.getItem('token');
  
  try {
    const response = await fetch(`https://toha-todo-list-activities.vercel.app/api/activities/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to remove activity');
    }

    const result = await response.json();
    console.log(result.data);

    const activityElement = document.getElementById(`${activityId}`);
    if (activityElement) {
      activityElement.remove();
    }

    alert('Activity removed successfully!');
  } catch (error) {
    console.error(error);
    alert('Error removing activity');
  }
}


document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput').value;
  const searchCategory = document.getElementById('searchCategory').value;

  try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`https://toha-todo-list-activities.vercel.app/api/activities?${searchCategory}=${searchInput}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'authorization': token
          }
      });

      if (!response.ok) {
          throw new Error('Failed to search activities');
      }

      const result = await response.json();
      displaySearchResult(result.data);
  } catch (error) {
      console.error(error);
      alert('Error searching activities');
  }
});

function displaySearchResult(activities) {
  const searchResultDiv = document.getElementById('getActivityResult');
  searchResultDiv.innerHTML = '';

  activities.forEach(activity => {
      const activityElement = makeActivity(activity);
      searchResultDiv.appendChild(activityElement);
  });
}

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
