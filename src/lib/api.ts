// // src/lib/api.ts

// const BASE_URL = 'https://www.api.distinguishedscholarsacademy.com/api'

// /**
//  * Helper to handle API responses and errors
//  */
// async function handleResponse(response: Response) {
//   const data = await response.json()
//   if (!response.ok) {
//     throw new Error(data.message || data.error || 'Something went wrong')
//   }
//   return data
// }

// export const dsaApi = {
//   auth: {
//     register: (payload: any) =>
//       fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       }).then(handleResponse),

//     verifyOtp: (email: string, otp: string) =>
//       fetch(`${BASE_URL}/auth/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp }),
//       }).then(handleResponse),

//     login: (payload: any) =>
//       fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       }).then(handleResponse),

//     forgotPassword: (email: string) =>
//       fetch(`${BASE_URL}/auth/forgot-password`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       }).then(handleResponse),

//     // Updated to match: {{URL}}/auth/reset-password/{{token}}
//     resetPassword: (payload: { newPassword: string; token: string }) =>
//       fetch(`${BASE_URL}/auth/reset-password/${payload.token}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword: payload.newPassword }),
//       }).then(handleResponse),

//     getProfile: (token: string) =>
//       fetch(`${BASE_URL}/auth/profile`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }).then(handleResponse),
//   },

//   quizzes: {
//     // Admin: Create Quiz
//     create: (payload: any, token: string) =>
//       fetch(`${BASE_URL}/quizzes`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }).then(handleResponse),

//     // Student: Get quiz by link
//     getByLink: (link: string, token: string) =>
//       fetch(`${BASE_URL}/quizzes/link/${link}`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       }).then(handleResponse),

//     verifyCode: (
//       payload: { link: string; accessCode: string },
//       token: string,
//     ) =>
//       fetch(`${BASE_URL}/quizzes/verify-code`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       }).then(handleResponse),

//     submit: (
//       id: string,
//       payload: { timeTaken: number; answers: any[] },
//       token: string,
//     ) =>
//       fetch(`${BASE_URL}/quizzes/${id}/submit`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       }).then(handleResponse),

//     getLeaderboard: (id: string, token: string) =>
//       fetch(`${BASE_URL}/quizzes/${id}/leaderboard`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       }).then(handleResponse),
//   },

//   programs: {
//     create: (payload: { name: string; endDate: string }) =>
//       fetch(`${BASE_URL}/programs`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       }).then(handleResponse),

//     getAll: () => fetch(`${BASE_URL}/programs`).then(handleResponse),
//   },
// }

// src/lib/api.ts

const BASE_URL = 'https://www.api.distinguishedscholarsacademy.com/api'

/**
 * Helper to handle API responses and errors
 */
async function handleResponse(response: Response) {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Something went wrong')
  }
  return data
}

/**
 * Helper to get token safely in client-side environment
 */
const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('dsa_token')
  }
  return null
}

export const dsaApi = {
  auth: {
    register: (payload: any) =>
      fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    verifyOtp: (email: string, otp: string) =>
      fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      }).then(handleResponse),

    login: (payload: any) =>
      fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    forgotPassword: (email: string) =>
      fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).then(handleResponse),

    resetPassword: (payload: { newPassword: string; token: string }) =>
      fetch(`${BASE_URL}/auth/reset-password/${payload.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: payload.newPassword }),
      }).then(handleResponse),

    // Added '?' to make token optional and fallback to localStorage
    getProfile: (token?: string) => {
      const activeToken = token || getStoredToken()
      return fetch(`${BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${activeToken}`,
          'Content-Type': 'application/json',
        },
      }).then(handleResponse)
    },
  },

  quizzes: {
    create: (payload: any, token?: string) =>
      fetch(`${BASE_URL}/quizzes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token || getStoredToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    getByLink: (link: string, token?: string) =>
      fetch(`${BASE_URL}/quizzes/link/${link}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token || getStoredToken()}` },
      }).then(handleResponse),

    verifyCode: (
      payload: { link: string; accessCode: string },
      token?: string,
    ) =>
      fetch(`${BASE_URL}/quizzes/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || getStoredToken()}`,
        },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    submit: (
      id: string,
      payload: { timeTaken: number; answers: any[] },
      token?: string,
    ) =>
      fetch(`${BASE_URL}/quizzes/${id}/submit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token || getStoredToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    getLeaderboard: (id: string, token?: string) =>
      fetch(`${BASE_URL}/quizzes/${id}/leaderboard`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token || getStoredToken()}` },
      }).then(handleResponse),
  },

  programs: {
    create: (payload: { name: string; endDate: string }) =>
      fetch(`${BASE_URL}/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(handleResponse),

    getAll: () => fetch(`${BASE_URL}/programs`).then(handleResponse),
  },
}
