export const EMAIL_REGEX = /^[A-Za-z0-9]+(?:[._-]?[A-Za-z0-9]+)*@gmail\.com$/i;

export const isEmailValid = (value = '') => EMAIL_REGEX.test(String(value).trim());

export const ROLE_REDIRECTS = {
  admin: '/admin',
  projectManager: '/project-manager',
  consultant: '/consultant',
  client: '/client',
};

export const getRoleRedirect = (role) => ROLE_REDIRECTS[role] || '/login';

export const saveAuthSession = (token, user) => {
  localStorage.setItem('sms_token', token);
  localStorage.setItem('sms_user', JSON.stringify(user));
};

export const getAuthSession = () => {
  try {
    const token = localStorage.getItem('sms_token');
    const user = localStorage.getItem('sms_user');

    if (!token || !user) {
      return null;
    }

    return {
      token,
      user: JSON.parse(user),
    };
  } catch (error) {
    return null;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem('sms_token');
  localStorage.removeItem('sms_user');
};
