<template>
    <!-- <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'> -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"> -->
    <!-- <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'> -->

    <section class="topSection text-light p-5 text-center text-sm-start" id="container1">
        <div class="jumbotron textBox">
            <div class="">
                <h1 id="banner" >Welcome to <span id="typewriter" style="color: #FFC436;">{{text}}</span><span id="cursor">|</span></h1>
                <p class="lead">
                    "This is where you will find all of the available Lecture Notes, Exercise Worksheets and Exam Papers"
                </p>
                <hr class="my-4">
            </div>
            <div class="container filter">
                <div class="row">
                    <form @submit.prevent="handleFilter()">
                        <div class="input-group justify-content-center text-align-center">
                            <div class="col-md-3 col-11 mt-1">
                                <select id="eduLevel"  class="form-select form-select-lg form-field filter-left border border-warning border-4 shadow-none" aria-label="Default select example" v-model="filter.level">
                                    <option value="" disabled>Education Level</option>
                                    <option value="any">Any</option>
                                    <option value="Primary School">Primary School</option>
                                    <option value="Lower Secondary">Lower Secondary School</option>
                                    <option value="Upper Secondary">Upper Secondary School</option>
                                </select>
                            </div>
                            <div class="col-md-3 col-11 mt-1">
                                <!-- <label for="subject" class="form-label">Subject</label> -->
                                <select id="subject" class="form-select form-select-lg form-field filter-left border border-warning border-4 shadow-none" aria-label="Default select example" v-model="filter.subject">
                                    <option value="" v-if="filter.level == ''" disabled style="color: #888;">Subject</option>
                                    <option value="any" v-if="filter.level !== ''">Any</option>
                                    <option :value="subject" v-for="subject in emptySubjects" :key="subject">
                                        {{ subject }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-3 col-11 mt-1">
                                <!-- <label for="documentType" class="form-label">Document Type</label> -->
                                <select id="documentType" class="form-select form-select-lg form-field filter-left border border-warning border-4 shadow-none" v-model="filter.type">
                                    <option value="" disabled style="color: #888;">Document Type</option>
                                    <option value="any">Any</option>
                                    <option value="Lecture Notes">Lecture Notes</option>
                                    <option value="Worksheets">Worksheets</option>
                                    <option value="Exam Paper">Exam Paper</option>
                                </select>
                            </div>
                            <div class="col-md-1 col-11 mt-1">
                                <!-- <label for="button" class="form-label" style="visibility: hidden;">Action</label> -->
                                <button id="button" class="btn btn-primary btn-lg form-field filter-right border border-4 border-warning shadow-none" type="submit">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <div class="container table-box">
        <table v-if="!isVisible" class="table table-bordered text-center shadow table-customer">
            <thead>
                <tr>
                    <th>Title</th> 
                    <th>Type</th>
                    <th>Education Level</th>
                    <th>Subject</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="result in getAllResources" :key="result.uid">
                    <td>{{ result.title }}</td>
                    <td>{{ result.type }}</td>
                    <td>{{ result.level }}</td>
                    <td>{{ result.subject }}</td>
                    <td>
                        <a :href="result.file_url" target="_blank" class="btn btn-outline-dark">View</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <div v-if="filteredResults.length === 0" class="row justify-content-center text-center">
                <img class="no-result-img" src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"  alt="">
                <h4>Sorry, we can't find any document that match your preferences!</h4>
                <p>Please try search using different Education Level, Subject or Document Type</p>
            </div>
            <table v-else class="table table-bordered text-center shadow table-customer">
                <thead>
                    <tr>
                        <th>Title</th> 
                        <th>Type</th>
                        <th>Education Level</th>
                        <th>Subject</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="result in filteredResults" :key="result.uid">
                        <td>{{ result.title }}</td>
                        <td>{{ result.type }}</td>
                        <td>{{ result.level }}</td>
                        <td>{{ result.subject }}</td>
                        <td>
                            <a :href="result.file_url" target="_blank" class="btn btn-outline-dark">View</a>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>

</template>

<script>
import { db , auth,} from '/src/firebase/init.js'
import {collection, onSnapshot, query, where,orderBy} from 'firebase/firestore'


export default {
    data() {
        return {
            name: null,
            isVisible: false,
            filter:{
                level: '',
                subject: '',
                type: '',

            },
            text: '',
            sleepTime: 100,
            curPhraseIndex: 0,
            phrases: ['Resource Library'],
            subjectsOptions: {
                'Primary School': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese'],
                'Lower Secondary': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese', 'Geography', 'Literature', 'History'],
                'Upper Secondary': ['English', 'E Math', 'A Math', 'Chinese', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Social Studies', 'POA', 'Literature'],
            },
            filteredResults: [],
            getAllResources: []
        }
    },
    methods: {
        async getUsers() {
            onSnapshot(query(collection(db,'resource')), (snap) => {
                this.profile = [];
                snap.forEach((doc) => {
                    if(doc.exists()) {
                        this.profile.push(doc.data())
                    }
                })
            })
           
        },

        getResource(){
            this.getAllResources = []
            const resourceRef = collection(db,'resource')
            let filtered = query(resourceRef)
            onSnapshot(filtered, (snap) => {
                snap.forEach((doc) => {
                    this.getAllResources.push(doc.data())
                })
            })
        },

        async handleFilter(){
            this.isVisible = true
            this.filteredResults = []
            const resourceRef = collection(db,'resource')
            let filtered = query(resourceRef)

            if(this.filter.level && this.filter.level !== '' && this.filter.level !== 'any'){
                filtered = query(filtered, where('level','==', this.filter.level))
            }

            if(this.filter.subject && this.filter.subject !== ''&& this.filter.subject !== 'any'){
                filtered = query(filtered, where('subject','==', this.filter.subject))
            }

            if(this.filter.type && this.filter.type !=='any'){
                filtered = query(filtered, where('type','==', this.filter.type))
            }

            filtered = query(
                filtered,
                orderBy('type'),
                orderBy('subject'),
                orderBy('level')
            );

            onSnapshot(filtered, (snap) => {
                snap.forEach((doc) => {
                    this.filteredResults.push(doc.data())
                })
            })
            
        },

        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },

        /* eslint-disable no-constant-condition */
        async writeLoop() {
            while (true) {
                let curWord = this.phrases[this.curPhraseIndex];
  
                for (let i = 0; i < curWord.length; i++) {
                    this.text = curWord.substring(0, i + 1);
                    await this.sleep(this.sleepTime);
                }
  
                await this.sleep(this.sleepTime * 10);
  
                for (let i = curWord.length; i > 0; i--) {
                    this.text = curWord.substring(0, i - 1);
                    await this.sleep(this.sleepTime);
                }
  
                await this.sleep(this.sleepTime * 5);
    
                if (this.curPhraseIndex === this.phrases.length - 1) 
                    {this.curPhraseIndex = 0;} 
                else {this.curPhraseIndex++;}
            }
        }

    },
    created(){
        var user = auth.currentUser
        if(user){
            this.name = user.uid
        }
        this.getUsers()
        this.writeLoop()
        this.getResource()
        
    },
    computed: {
        emptySubjects() {
            return this.subjectsOptions[this.filter.level] || [];
        }
        
    },
    watch: {
        'filter.level': function (newLevel) {
            if (newLevel !== '') {
                this.filter.subject = 'any';
            } 
            else{
                this.filter.subject = ''
            }
        },
    },
    
}


</script>
<style scoped>
   * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Constantia', serif;
      }

      .topSection {
        background-image: url('https://i.pinimg.com/736x/b9/5f/d4/b95fd451544263818f64478b88237f55.jpg');
        background-size: contain;
        margin-top: 65px;
      }

      .textBox {
        background-color: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border: 5px solid #8B4513;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }

      /* Filter */
  

      #button {
      width: 85px;
      }

      @media (max-width: 768px) {
      #button {
        width: 100%;
        }
      }

      @media (min-width: 768px) {
      .textBox {
        position: relative;
        }

      .filter {
        position: absolute;
        bottom: -75px;
        left: 50%;
        transform: translateX(-50%);
        }
      }

      /* typing animation */
      #cursor {
        color: #FFC436;
        animation: blink 1s linear infinite;
      }

      @keyframes blink {
        0% {
          opacity: 100%;
        }
        50% {
          opacity: 0%;
        }
      }

      h2{
          text-align: center;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: white;
          padding: 30px 0;
      }

      /* Filter Styling and Positioning */
      .form-field {
        border-radius: 0;
      }

      .filter-left {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      .filter-right {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }


      /* Table Custom */
      .table-cutom {
        border-radius: 10px;
      }

      .table-box {
        margin-top: 65px;
      }


      /* No Result Found Img Sizing */
      .no-result-img {
        width: 100px;
      }

</style>