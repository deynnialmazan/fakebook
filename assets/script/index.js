'use strict';

const userFile = document.querySelector('.user-file');
const textUserInput = document.querySelector('.user-input');
const fileChoosen = document.querySelector('.file-choosen');
const userInfo = document.querySelector('.user-info');
const userImage = document.querySelector('.user-image-header');
const userInfoP = document.querySelector('.user-info-p');
const contentPostUser = document.querySelector('.content-post-user');
const postBtn = document.querySelector('.post-btn');
const userPost = document.querySelector('.user-post-box');
const displayPost = document.querySelector('.display-post');

//Show name of file selected
function showFileName() {
  const curFiles = userFile.files;
    for (const file of curFiles) {
      const para = document.createElement('p');
      para.textContent = `${file.name}`;
      fileChoosen.appendChild(para);
    }
}

userFile.addEventListener('change', showFileName);

//Parent class
class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
      this.#id = id;
      this.#name = name;
      this.#userName = userName;
      this.#email= email;
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get userName() { return this.#userName; }
  get email() { return this.#email; }

  getInfo() {
    return `
    <b><br>Id:</b> ${this.#id}
    <b><br>Name:</b> ${this.#name}
    <b><br>Username:</b> ${this.#userName}
    <b><br>Email:</b> ${this.#email}
    `
  }

}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    get pages() { return this.#pages; }
    get groups() { return this.#groups; }

    getCanMonetize() {
      if(this.#canMonetize === true) { 
        return 'Yes';
      } 
    return 'No'; 
    }
    
    get canMonetize() { return this.#canMonetize; }

    getInfo() {
      
    return `
    ${super.getInfo()}
    <b><br>Pages:</b> ${this.#pages}
    <b><br>Groups:</b> ${this.#groups}
    <b><br>Can Monetize:</b> ${this.getCanMonetize()}
    `
    }
}

//Generating subscriber
const pages = ['Developers Page', 'Software Students']

const subscriber = new Subscriber(
  '4523', 
  'Deynni Almazan', 
  'drosby', 
  'deynnialmazan@hotmail.com',
  ['Developers Page', 'Software Students'],
  ['Mommy&Tribe', 'Developers Team', 'Honduras Group', 'MITT Students'],
  true
  );


let infoBox = subscriber.getInfo();

//console.log(infoBox);
//console.log(subscriber.name);


//Displaying user info
let statusBox= 'hide';

userImage.addEventListener('click', () => {
    if (statusBox === 'hide') {
    userInfo.style.display = 'block';
    userInfo.innerHTML = infoBox;
    statusBox = 'show';
   } else if (statusBox === 'show') {
    userInfo.style.display = 'none';
    statusBox = 'hide';
   }
});


//Posting
function post() {
    const today = new Date();
    const date = today.toDateString().slice(4);
    const post = document.createElement('div');
    post.classList.add('user-post-box');
    post.innerHTML = `
              <div class="header">
                <div class="user-data">
                    <picture class="user-post-image">
                        <img class="user-post-image" src="./assets/image/deynni.png">
                    </picture>
                    <p class="display-username">${subscriber.name}</p>
                  </div>
                  <div class="post-date"><p>${date}</p></div>
              </div>
              <div class="content-post-user">
                <p class="user-text-post">${textUserInput.value}</p>
              </div>`;
    const curFiles = userFile.files;

    for (const file of curFiles) {
    const image = document.createElement('img'); // creating image
    image.src = URL.createObjectURL(file);
    image.classList.add('user-image-post');
    post.append(image);
                
    }   
        
   displayPost.prepend(post);
   displayPost.style.display = 'block';
   fileChoosen.innerHTML = "";
   textUserInput.value = ""; 

}


postBtn.addEventListener('click', () => {
  post();
  userFile.value = "";
});
  

 
