
const USERS_KEY = "foodie_users";
const SESSION_KEY = "foodie_session";

// Read all registered users
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

// Return only public user details
function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

// Register a new user
export async function signup({ name, email, password }) {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();

  if (users.some(user => user.email === cleanEmail)) {
    throw new Error("Email already exists");
  }

  const user = {
    id: Date.now().toString(),
    name: name.trim(),
    email: cleanEmail,
    password
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, user])
  );

  localStorage.setItem(SESSION_KEY, user.id);

  return publicUser(user);
}

// Log in an existing user
export async function login({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();

  const user = getUsers().find(
    user => user.email === cleanEmail &&
            user.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem(SESSION_KEY, user.id);

  return publicUser(user);
}

// Log out
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// Get the currently logged-in user
export function getCurrentUser() {
  const id = localStorage.getItem(SESSION_KEY);

  const user = getUsers().find(user => user.id === id);

  return user ? publicUser(user) : null;
}
