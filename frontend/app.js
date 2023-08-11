const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data: function () {
    return {
      title: 'Idea Forum',
      token: '',
      user: {},
      ideas: [],
      editIdeaId: -1,
      commentIdeaId: -1,
      commentTitle: '',
      commentsCounts: {}, // Dict to store comments.length for each idea
      upvotesCounts: {}, // Dict to store upvotes.length for each idea
      showReg: false,
      showLogin: false,
      showNewIdea: false,
      showEditIdea: false,
      showNewComment: false,
      regErrs: {},
      logErrs: {},
      newIdeaErrs: {},
      editIdeaErrs: {},
      commentErrs: {},
      regForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      loginForm: {
        email: '',
        password: ''
      },
      ideaForm: {
        title: '',
        content: ''
      },
      editForm: {
        title: '',
        content: ''
      },
      commentForm: {
        content: ''
      }
    }
  },
  created: async function () {
    try {
      this.token = sessionStorage.getItem('token') || ''
      if (this.token !== '') {
        this.user = JSON.parse(sessionStorage.getItem('user') || {})
      }

      this.getIdeas();

    } catch (error) {
      console.log(error);
    }

  },
  methods: {   
    validateForm: function (form, inputFields) {    
      this.regErrs = {};  
      this.logErrs = {};
      this.newIdeaErrs = {};      
      this.editIdeaErrs = {};      
      this.commentErrs = {};
      switch (form) {
        case 'regForm':          
          for (const field of inputFields) {
            switch (field) {
              case 'name':
                if (!this.regForm[field]) {
                  this.regErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                break;
              case 'email': 
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!this.regForm[field]) {
                  this.regErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                else if (!emailRegex.test(this.regForm[field])) {
                  this.regErrs[field] = 'Please enter a valid email.'
                }
                break;
              case 'password':
                if (!this.regForm[field]) {
                  this.regErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                else if (this.regForm[field].length < 8) {
                  this.regErrs[field] = 'The password must be at least 8 characters.';
                }
                break;
              case 'password_confirmation':
                if (!this.regForm[field]) {
                  this.regErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                else if (this.regForm[field] !== this.regForm['password']) {
                  this.regErrs[field] = 'Passwords do not match.';
                }
                break;
            }           
          } 
          return Object.keys(this.regErrs).length === 0;
          break;
        case 'loginForm':         
          for (const field of inputFields) {
            switch (field) {              
              case 'email': 
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if (!this.loginForm[field]) {
                  this.logErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                else if (!emailRegex.test(this.loginForm[field])) {
                  this.logErrs[field] = 'Please enter a valid email.'
                }
                break;
              case 'password':
                if (!this.loginForm[field]) {
                  this.logErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                else if (this.loginForm[field].length < 8) {
                  this.logErrs[field] = 'The password must be at least 8 characters.';
                }
                break;
            }           
          }  
          return Object.keys(this.logErrs).length === 0;
          break;
        case 'ideaForm':         
          for (const field of inputFields) {
            switch (field) {              
              case 'title': 
                if (!this.ideaForm[field]) {
                  this.newIdeaErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                break;
              case 'content':
                if (!this.ideaForm[field]) {
                  this.newIdeaErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                }
                break;
            }           
          }  
          return Object.keys(this.newIdeaErrs).length === 0;
          break;  
          case 'editForm':
            for (const field of inputFields) {
              switch (field) {              
                case 'title': 
                  if (!this.editForm[field]) {
                    this.editIdeaErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                  }
                  break;
                case 'content':
                  if (!this.editForm[field]) {
                    this.editIdeaErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                  }
                  break;
              }           
            }  
            return Object.keys(this.editIdeaErrs).length === 0;
            break;    
          case 'commentForm':
            for (const field of inputFields) {
              switch (field) {
                case 'content':
                  if (!this.commentForm[field]) {
                   this.commentErrs[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')} is required.`;
                  }
                  break;
            }
          }
          return Object.keys(this.commentErrs).length === 0;
          break;            
      }       
    },
    register: async function () {
      //Validate form fields
      if (!this.validateForm('regForm', ['name', 'email', 'password', 'password_confirmation'])) {
        return;
      }
      //Submit registration form
      try {
        const response = await fetch(`${baseUrl}/register`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.regForm)
        });

        const json = await response.json();
        console.log(json);

        this.showReg = false;

      } catch (error) {
        console.log(error)
      }
    },
    login: async function () {
      //Validate form fields
      if (!this.validateForm('loginForm', ['email', 'password'])) {
        return;
      }
      //Submit login form
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        })

        const json = await response.json()
        this.token = json.token
        this.user = json.user
        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('user', JSON.stringify(json.user))

        this.showLogin = false

      } catch (error) {
        console.log(error)
      }
    },
    logout: async function () {
      try {
        // Make a request to the logout endpoint to invalidate the user's token
        const response = await fetch(`${baseUrl}/logout`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });

        // Clear the token and user data from sessionStorage
        this.token = '';
        this.user = {};
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      } catch (error) {
        console.log(error);
      }
    },
    getIdeas: async function () {
      try {
        // baseUrl/api/ideas
        const response = await fetch(`${baseUrl}/api/ideas`, {
          method: 'get',
          headers: {
            'Accept': 'application/json'
          }
        })

        this.ideas = await response.json()

        // Iterate through each idea and get its comments and upvotes count
        this.commentsCounts = {};
        this.upvotesCounts = {};
        for (const idea of this.ideas) {
          const commentsCount = await this.getCommentsCount(idea);
          this.commentsCounts[idea.id] = commentsCount;

          const upvotesCount = await this.getUpvotesCount(idea);
          this.upvotesCounts[idea.id] = upvotesCount;
        }

      } catch (error) {
        console.log(error)
      }
    },
    getCommentsCount: async function (idea) {
      try {
        // Fetch comments count for the idea
        const commentsResponse = await fetch(`${baseUrl}/api/ideas/${idea.id}/comments`, {
          method: 'get',
          headers: {
            'Accept': 'application/json'
          }
        });
        const comments = await commentsResponse.json();
        return comments.length || 0;
      } catch (error) {
        console.log(error);
        return 0;
      }
    },
    getUpvotesCount: async function (idea) {
      try {
        // Fetch comments count for the idea
        const upvotesResponse = await fetch(`${baseUrl}/api/ideas/${idea.id}/upvotes`, {
          method: 'get',
          headers: {
            'Accept': 'application/json'
          }
        });
        const upvotes = await upvotesResponse.json();
        return upvotes.length || 0;
      } catch (error) {
        console.log(error);
        return 0;
      }
    },
    addIdea: async function () {
      //Validate form fields
      if (!this.validateForm('ideaForm', ['title', 'content'])) {
        return;
      }
      //Submit new idea form
      try {
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.ideaForm)
        })

        const newIdea = await response.json()
        console.log(newIdea)
        this.ideas.push(newIdea)
        this.showNewIdea = false

        // Fetch the comments and upvotes count for the new idea
        const commentsCount = await this.getCommentsCount(newIdea);
        const upvotesCount = await this.getUpvotesCount(newIdea);
        // Update the commentsCounts and upvotesCounts arrays with the new counts 
        this.commentsCounts[newIdea.id] = commentsCount;
        this.upvotesCounts[newIdea.id] = upvotesCount;

        // Clear input fields after idea is stored
        this.ideaForm.title = '';
        this.ideaForm.content = '';

      } catch (error) {
        console.log(error);
      }
    },
    editIdea: function (idea) {
      // Save the id of the idea to be edited in editIdeaId
      this.editIdeaId = idea.id;

      // Pre-fill the editForm fields with the idea data
      this.editForm.title = idea.title;
      this.editForm.content = idea.content;

      // Show the edit form
      this.showEditIdea = true;

    },
    updateIdea: async function () {
      //Validate form fields
      if (!this.validateForm('editForm', ['title', 'content'])) {
        return;
      }
      //Submit edit idea form
      try {
        const response = await fetch(`${baseUrl}/api/ideas/${this.editIdeaId}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.editForm)
        });

        const updatedIdea = await response.json();
        console.log(updatedIdea);

        // Find the index of the updated idea in the ideas array
        const index = this.ideas.findIndex((idea) => idea.id === updatedIdea.id);

        if (index !== -1) {
          // Update the idea in the ideas array
          this.ideas[index] = updatedIdea;
          // Hide the edit form after successful update
          this.showEditIdea = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteIdea: async function (idea) {
      try {
        const response = await fetch(`${baseUrl}/api/ideas/${idea.id}`, {
          method: 'delete',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });

        const deletedIdea = await response.json();
        console.log(deletedIdea);

        const index = this.ideas.findIndex((item) => item.id === idea.id);
        if (index !== -1) {
          this.ideas.splice(index, 1);
          console.log('Idea deleted successfully:', idea);
        }
        else {
          // If the response status is not 204, handle the error as needed
          console.log('Failed to delete idea:', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    },
    upvoteIdea: async function (idea) {
      console.log(this.user.id + " " + idea.id);
      try {
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas/${idea.id}/upvotes`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });

        const upvotedIdea = await response.json();
        console.log(upvotedIdea);

        // Update the upvotes count for the idea
        this.upvotesCounts[idea.id]++;

      } catch (error) {
        console.log(error)
      }
    },
    newComment: function (idea) {
      // Save the id of the idea to be commented in commentIdeaId
      this.commentIdeaId = idea.id;
      this.commentTitle = idea.title;

      // Show the edit form
      this.showNewComment = true;

    },
    addComment: async function () {
      //Validate form fields
      if (!this.validateForm('commentForm', ['content'])) {
        return;
      }
      //Submit comment form
      try {
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/ideas/${this.commentIdeaId}/comments`, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.commentForm)
        });

        const addedComment = await response.json();
        console.log(addedComment);

        this.showNewComment = false;

        // Update the comments count for the idea
        this.commentsCounts[this.commentIdeaId]++;

      } catch (error) {
        console.log(error)
      }
    }
  }
})

app.mount('#app')