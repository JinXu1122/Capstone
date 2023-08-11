const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data() {
    return {
      title: 'Idea Forum',
      token: '',
      user: {},
      ideas: [],
      upvotes:[],
      comments:[],
      showNewIdea: false,
      showEditIdea: false,
      showNewComment: false,
      showLogin: false,
      loginForm: {
        email: '',
        password: ''
      },
      newIdeaForm: {
        title: '',
        content: ''
      },
      editIdeaForm: {
        title: '',
        content: ''
      },
      commentForm: {
        content: ''
      }
    }
  },
  created: async function () {
    // Implement logic to check if the user is already logged in and fetch user data
    // Call this.getUser() or similar method to get user info and notes.
  },
  methods: {
    login:async function () {
      // Implement logic to handle user login and store the token
    },
    getIdeas:async function () {
      // Implement logic to fetch all ideas
    },
    addIdea:async function () {
      // Implement logic to add a new idea
    },
    editIdea: function(idea) {
      // Implement logic to show the edit idea form and populate with idea data
    },
    updateIdea:async function () {
      // Implement logic to update the edited idea
    },
    deleteIdea:async function (idea) {
      // Implement logic to delete the idea
    },
    upvoteIdea:async function (idea) {
      // Implement logic to upvote the idea
    },
    addComment:async function (idea) {
      // Implement logic to add a new comment to the idea
      
    },  
    logout:async function () {
      // Implement logic to handle user logout
    }
  }
})

// Mount the app to an HTML element (e.g., div with id "app")
app.mount('#app')
