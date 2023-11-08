<template>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>



    <div style="background-color: whitesmoke;">
        <section class="topSection text-light p-5 text-center text-sm-start" id="container1">
            <div class="jumbotron textBox">
                <div>
                    <h1 id="bannerText">Welcome to <span id="typewriter" style="color: #007bff;">{{text}}</span><span id="cursor">|</span></h1>
                    <p class="lead">"This is where you can find your desired tutors based on your preferences"</p>
                    <hr class="my-4">
                </div>
                <div class="container filter">
                    <div class="row">
                        <form @submit.prevent="handleFilter()">
                            <div class="input-group justify-content-center text-align-center">
                                <div class="col-md-3 col-11 mt-1">
                                    <select id="eduLevel" class="form-select form-select-lg form-field filter-left border border-warning border-4 shadow-none" aria-label="Default select example" v-model="filter.level">
                                        <option value="" disabled>Education Level</option>
                                        <option value="any">Any</option>
                                        <option value="Primary School">Primary School</option>
                                        <option value="Lower Sec">Lower Secondary School</option>
                                        <option value="Upper Sec">Upper Secondary School</option>
                                    </select>
                                </div>
                                <div class="col-md-3 col-11 mt-1">
                                    <select id="subject" class="form-select form-select-lg form-field border border-warning border-4 shadow-none" aria-label="Default select example" v-model="filter.subject">
                                        <option value="" disabled style="color: #888;">Subject</option>
                                        <option value="any" v-if="filter.level !== ''">Any</option>
                                        <option :value="filter.level + ' ' + subject" v-for="subject in emptySubjects" :key="subject">
                                            {{ subject }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-3 col-11 mt-1">
                                    <input class="form-control form-control-lg form-field border border-warning border-4 shadow-none" type="number" id="distanceRadius" placeholder="Distance Radius (km)" v-model="filter.distance">
                                </div>
                                <div class="col-md-1 col-11 mt-1">
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
    </div>
    


    <div class="container-fluid my-5">
        <div class="row py-1 mx-4 justify-content-around">
            <!-- START HERE -->
            <div class="col-lg-10 col-sm-12 py-1 bg-light border tutor-display mt-2">
                <div v-if="!filteredButton">
                    <div v-if="recommendedTutors.length === 0" class="row justify-content-center text-center">
                        <img class="no-result-img" src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"  alt="">
                        <h4>Sorry, we can't find any tutor that match your preferences!</h4>
                        <p>Please try searching using different Education Level, Subject or Distance</p>
                    </div>
                    <div v-else class="row px-1 justify-content-around text-center">
                        <h4 style="font-weight: bold">Our Recommended Tutors</h4>
                        <div class="col-lg-3 col-md-5 col-12 my-2" v-for="tutor in recommendedTutors" :key="tutor.userID">
                            <div class="card-display">
                            <div class="image-content">
                                <span class="overlay"></span>
                                <div class="card-image">
                                    <img class="card-img" :src="tutor.photo_url" alt="">
                                </div>
                            </div>
                            <div class="card-content">
                                <h1 class="name text-dark">{{tutor.name}}</h1>
                                <div class="subjects text-center">
                                    <h5 >I'm efficient in teaching:</h5>
                                    <button class="btn btn-warning m-1" disabled v-for="subject in tutor.subjects" :key="subject">
                                        {{subject}}
                                    </button>
                                </div>
                                <p class="mrtInfor"><i class="fa-solid fa-location-dot" style="color: #ff0f0f;"></i>    {{ tutor.location.slice(0, -3) }}</p>
                                <p class="distanceInfor"><i class="fa-solid fa-train" ></i>      {{ tutor.distanceBetween === '0.0' ? 'Same area' : tutor.distanceBetween + ' away from you' }}</p>
                                <button type="button" class="btn btn-primary cardButton" data-bs-toggle="modal" :data-bs-target="'#tutor-' + tutor.userID">Book</button>
                            </div>
                        </div>

                        <div class="modal fade" :id="'tutor-' + tutor.userID"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Book a Tuition Session with {{tutor.name}}</h5>
                                        <button v-on:click="resetSelected()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form @submit.prevent="handleBooking()">
                                        <div class="modal-body">
                                            <select id="select" class="form-select" aria-label="Default select example" v-model="profile.listingID" required>
                                                <option value="" disabled selected>Choose a timeslot</option>
                                                <option v-for="timeSlot in tutor.tuitionTimeslots" :key="timeSlot.uid" :value="timeSlot.id">
                                                    {{ timeSlot.date }}
                                                    {{ timeSlot.time }}
                                                </option>
                                            </select>
                                            <label for="select" class="col-form-label">Interested Subject</label>
                                            <select id="select" class="form-select" aria-label="Default select example" v-model="profile.subjectInterested" required>
                                                <option value="" disabled selected>Choose a subject</option>
                                                <option v-for="subject in tutor.subjects" :key="subject.uid" :value="subject">
                                                    {{ subject }}
                                                </option>
                                            </select>
                                            <label for="comment">Additional Notes: </label>
                                            <textarea v-model="profile.notes" class="form-control" rows="5" id="comment" name="text" :placeholder="'Write a note to ' + tutor.name + '...'"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button v-on:click="resetSelected()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button data-bs-dismiss="modal"  type="submit" class="btn btn-primary">Book Now</button> 
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-if="filteredTutors.length === 0" class="row my-3 justify-content-center text-center">
                        <img class="no-result-img" src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"  alt="">
                        <h4>Sorry, we can't find any tutor that match your preferences!</h4>
                        <p>Please try searching using different Education Level, Subject or Distance</p>
                    </div>
                    <div v-else class="row px-1 justify-content-around text-center">
                        <h4 style="font-weight: bold">Our Filtered Results</h4>
                        <div class="col-lg-3 col-md-5 col-12 my-2" v-for="tutor in filteredTutors" :key="tutor.userID">
                            <div class="card-display">
                            <div class="image-content">
                                <span class="overlay"></span>
                                <div class="card-image">
                                    <img class="card-img" :src="tutor.photo_url" alt="">
                                </div>
                            </div>
                            <div class="card-content">
                                <h1 class="name text-dark">{{tutor.name}}</h1>
                                <div class="subjects text-center">
                                    <h5 >I'm efficient in teaching:</h5>
                                    <button class="btn btn-warning m-1" disabled v-for="subject in tutor.subjects" :key="subject">
                                        {{subject}}
                                    </button>
                                </div>
                                <p class="mrtInfor"><i class="fa-solid fa-location-dot" style="color: #ff0f0f;"></i>    {{ tutor.location.slice(0, -3) }}</p>
                                <p class="distanceInfor"><i class="fa-solid fa-train" ></i>      {{ tutor.distanceBetween === '0.0' ? 'Same area' : tutor.distanceBetween + ' away from you' }}</p>
                                <button type="button" class="btn btn-primary cardButton" data-bs-toggle="modal" :data-bs-target="'#tutor-' + tutor.userID">Book</button>
                            </div>
                        </div>

                        <div class="modal fade" :id="'tutor-' + tutor.userID"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Book a Tuition Session with {{tutor.name}}</h5>
                                        <button v-on:click="resetSelected()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form @submit.prevent="handleBooking()">
                                        <div class="modal-body">
                                            <select id="select" class="form-select" aria-label="Default select example" v-model="profile.listingID" required>
                                                <option value="" disabled selected>Choose a timeslot</option>
                                                <option v-for="timeSlot in tutor.tuitionTimeslots" :key="timeSlot.uid" :value="timeSlot.id">
                                                    {{ timeSlot.date }}
                                                    {{ timeSlot.time }}
                                                </option>
                                            </select>
                                            <label for="select" class="col-form-label">Interested Subject</label>
                                            <select id="select" class="form-select" aria-label="Default select example" v-model="profile.subjectInterested" required>
                                                <option value="" disabled selected>Choose a subject</option>
                                                <option v-for="subject in tutor.subjects" :key="subject.uid" :value="subject">
                                                    {{ subject }}
                                                </option>
                                            </select>
                                            <label for="comment">Additional Notes: </label>
                                            <textarea v-model="profile.notes" class="form-control" rows="5" id="comment" name="text" :placeholder="'Write a note to ' + tutor.name + '...'"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button v-on:click="resetSelected()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button data-bs-dismiss="modal"  type="submit" class="btn btn-primary">Book Now</button> 
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                    
            </div>
            <div class="col-lg-1 col-12 upcoming-request"> 
                <div class="row text-center">
                    <div class="container-fluid bg-light py-1  upcoming-box border mt-2">
                        <h5 style="font-weight: 600;">Upcoming Sessions</h5>
                        <div v-for="confirmed in confirmedRequests" :key="confirmed.id" class="card my-2 w-100 text-center" style="max-height: 210px; border-radius: 10px;" >
                            <div class="card-body">
                                <h5 class="card-title">{{confirmed.tutorName}}</h5>
                                <p class="card-text"><i class="fa-solid fa-location-dot" style="color: #ff0f0f;"></i> {{confirmed.nearestMRT.slice(0, -3)}}</p>
                                <p class="card-text">{{confirmed.date}} {{confirmed.time}}</p>
                                <p class="card-text"><i class="fas fa-phone-alt"></i> {{confirmed.tutorContact}}</p>

                                <!-- <p><strong>Subject:</strong> {{confirmed.subjectInterested}}</p> -->
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid bg-light py-1 request-box border mt-2">
                        <h5 style="font-weight: bold">Your Requests</h5>
                        <div v-for="request in pendingRequests" :key="request.id" class="card my-2 w-100 text-center " style="max-height: 260px; border-radius: 10px;">
                            <div class="card-body">
                                <h5 class="card-title">{{request.tutorName}}</h5>
                                <p class="card-text">{{request.date}} {{request.time}}</p>
                                <p><strong>Subject:</strong> {{request.subjectInterested}}</p>
                                <div v-if="request.status == 'pending'" class="container-fluid" style="border-radius: 25px;" >
                                    <h6 class="text-warning">PENDING</h6>
                                </div>
                                <div v-if="request.status == 'rejected'" class="container-fluid" style="border-radius: 25px;">
                                    <h6 class="text-danger ">REJECTED</h6>
                                    <button @click="removeRequest(request.id)" class="btn btn-primary">Ackowledge</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import { db, auth } from '/src/firebase/init.js'
import axios from 'axios'
import {collection,doc, getDoc, addDoc, onSnapshot, query, where, updateDoc,} from 'firebase/firestore'


export default {
    data() {
        return {
            studentPreferences: {
                subjects: [],
            
            },
            filteredButton: false,
            recommendedTutors: [],
            filteredTutors: [],
            id: '',
            timeSlot: [],
            profile: {
                childName: '',
                parentName: '',
                educationLevel: '',
                nearestMRT: '',
                childGender: '',
                parentContactNum: '',
                listingID: '',
                notes: '',
                tutorID: '',
                selectedDate: '',
                selectedTime: '',
                tutorName: '',
                subjectInterested: '',
                parentLat: '',
                parentLong: '',
                tutorMRT: '',
                tutorContactNo: ''
            },
            filter: {
                level: '',
                subject: '',
                distance: ''
            },
            mrtStations: {},
            confirmedRequests: [],
            pendingRequests: [],
            subjectsOptions: {
                'Primary School': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese'],
                'Lower Sec': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese', 'Geography', 'Literature', 'History'],
                'Upper Sec': ['English', 'E Math', 'A Math', 'Chinese', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Social Studies', 'POA', 'Literature'],
            },
            text: '',
            sleepTime: 100,
            curPhraseIndex: 0,
            phrases: ['Your Homepage']
        }
    },
    created() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.id = user.uid;
                this.type = user.displayName
                this.getStudentSubjects()
                this.getConfirmedRequests()
                this.getRequest()
                
            }
            this.writeLoop()
            
        });
    },
    methods: {
        getStudentSubjects(){
            onSnapshot(query(collection(db,'parents'), where('userID', '==', this.id)), (snap) => {
                this.studentPreferences.subjects = []
                snap.forEach((doc) => {
                    if(doc.exists()) {
                        this.studentPreferences.subjects = doc.data().subjects
                        this.profile.childName = doc.data().childName
                        this.profile.nearestMRT = doc.data().location
                        this.profile.childGender = doc.data().childGender
                        this.profile.parentName = doc.data().parentName
                        this.profile.educationLevel = doc.data().level
                        this.profile.parentContactNum = doc.data().parentContactNum
                        this.profile.parentLat = doc.data().lat
                        this.profile.parentLong = doc.data().long
                        
                    }
                })   
                if (this.studentPreferences.subjects.length > 0) {
                    this.getRecommended();
                }
            })
        },
        getRecommended(){
            this.recommendedTutors = [];
            const tutorsCollection = collection(db, 'tutors')
            const myQuery = query(
                tutorsCollection,
                where('subjects', 'array-contains-any', this.studentPreferences.subjects)
            )
            onSnapshot(myQuery, (snap) => {
                snap.forEach((doc) => {
                    const tutorData = {id: doc.id,...doc.data() }
                    if (typeof window.google !== "undefined" && typeof window.google.maps !== "undefined") {
                        const origin = new window.google.maps.LatLng(this.profile.parentLat,this.profile.parentLong)
                        const destination = new window.google.maps.LatLng(tutorData.lat,tutorData.long)
                        let distance = window.google.maps.geometry.spherical.computeDistanceBetween(origin, destination)
                        distance = (distance/1000).toFixed(1)
                        tutorData.distanceBetween = distance
                    }
                    this.getTuitionTimeslots(tutorData)
                    this.recommendedTutors = []

                })
                
            })
        },

        getTuitionTimeslots(tutorData){
            const tuitionTimeslotsCollection = collection(db, 'listings');
            const timeslotsQuery = query(
                tuitionTimeslotsCollection,
                where('uid', '==', tutorData.userID),
                where("status", '==', 'available') 
            )
            onSnapshot(timeslotsQuery, (snap) => {
                const timeSlot = []
                snap.forEach((doc) => {
                    timeSlot.push({ id: doc.id, ...doc.data() });
                });

                timeSlot.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });

                if(timeSlot.length > 0){
                    if(this.filteredButton){
                        if(!this.filteredTutors.some((tutor) => tutor.id === tutorData.userID)){
                            tutorData.tuitionTimeslots = timeSlot;
                            this.filteredTutors.push(tutorData);
                        }
                    }
                    else{
                        if(!this.recommendedTutors.some((tutor) => tutor.id === tutorData.userID)){
                            tutorData.tuitionTimeslots = timeSlot;
                            this.recommendedTutors.push(tutorData);
                        }
                    }
                    
                    
                }
            });
        },
        resetSelected(){
            this.profile.notes = '',
            this.profile.listingID = '',
            this.profile.subjectInterested = ''
        },
       
        async handleBooking(){
            const docRef = doc(db, "listings", this.profile.listingID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                this.profile.selectedDate = data.date
                this.profile.selectedTime = data.time
                this.profile.tutorID = data.uid
                this.profile.tutorName = data.tutorName
                this.profile.tutorMRT = data.nearestMRT
                this.profile.tutorContactNo = data.tutorContact
                await addDoc(collection(db,'requests'),{
                    listingID: this.profile.listingID,
                    parentName: this.profile.parentName,
                    childName: this.profile.childName,
                    childGender: this.profile.childGender,
                    educationLevel: this.profile.educationLevel,
                    notes: this.profile.notes,
                    nearestMRT: this.profile.nearestMRT,
                    parentContactNo: this.profile.parentContactNum,
                    date: this.profile.selectedDate,
                    time: this.profile.selectedTime,
                    status: "pending",
                    parentID: this.id,
                    tutorID: this.profile.tutorID,
                    tutorName: this.profile.tutorName,
                    tutorContact: this.profile.tutorContactNo,
                    subjectInterested: this.profile.subjectInterested,
                    tutorMRT: this.profile.tutorMRT
                })
                alert("Booking Request Sent")

                await updateDoc(docRef, {
                    status: 'pending'
                })
                this.profile.listingID = ''
                this.profile.notes = ''
                this.profile.subjectInterested = '';
                if(this.filteredButton){
                    this.filteredTutors = []
                    this.handleFilter()
                }
                else{
                    this.recommendedTutors = []
                    this.getRecommended()
                }
                
            } 
        },
        getConfirmedRequests(){
            onSnapshot(query(collection(db,'requests'), where('parentID', '==', this.id),where("status", "==", "confirmed")), (snap) => {
                    this.confirmedRequests = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.confirmedRequests.push({id:doc.id, ...doc.data()})
                        }
                    })
                    this.confirmedRequests.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    });
            })
        },
        
        getRequest(){
            onSnapshot(query(collection(db,'requests'), where('parentID', '==', this.id),where("status", "in", ["pending", "rejected"])), (snap) => {
                    this.pendingRequests = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.pendingRequests.push({id:doc.id, ...doc.data()})
                        }
                    })
                    this.pendingRequests.sort((a, b) => {
                        if (a.status === "rejected" && b.status === "pending") {
                            return -1; // "rejected" comes before "pending"
                        }
                        if (a.status === "pending" && b.status === "rejected") {
                            return 1; // "pending" comes after "rejected"
                        }
                        
                        // If status is the same, compare the "date"
                        return new Date(a.date) - new Date(b.date);
                    });
            })
        },
        removeRequest(id){
            const requestRef = doc(db,'requests',id)
            updateDoc(requestRef, {
                status: 'acknowledged'
            })
        },
        handleFilter(){
            this.filteredButton = true
            this.filteredTutors = [];
            const tutorsCollection = collection(db, 'tutors')
            let filtered = query(tutorsCollection)
            

            if(this.filter.level && this.filter.level !== '' && this.filter.level !== 'any'){
                filtered = query(filtered, where('teaches','array-contains', this.filter.level))
            }

            onSnapshot(filtered, (snap) => {
                snap.forEach((doc) => {
                    const tutorData = {id: doc.id,...doc.data() }
                    if (!this.filter.subject || this.filter.subject === 'any' || (this.filter.subject !== '' && this.filter.subject !== 'any' && tutorData.subjects.includes(this.filter.subject))) {
                        if (typeof window.google !== "undefined" && typeof window.google.maps !== "undefined") {
                            const origin = new window.google.maps.LatLng(this.profile.parentLat,this.profile.parentLong)
                            const destination = new window.google.maps.LatLng(tutorData.lat,tutorData.long)
                            let distance = window.google.maps.geometry.spherical.computeDistanceBetween(origin, destination)
                            distance = (distance/1000).toFixed(1)

                            if (distance <= this.filter.distance) {
                                tutorData.distanceBetween = distance;
                                this.getTuitionTimeslots(tutorData);
                                this.filteredTutors = []
                            }
                            
                        }
                    }
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
    mounted(){
        // Fetch MRT station names from the text file
        axios.get('/mrt_lrt_data.txt')
                .then((response) => {

                    // Split the response into an array of station names and remove empty entries
                    const lines  = response.data.split('\n').filter(line => line.trim() !== '')
                    const mrtStn = {}
                    lines.forEach(line => {
                        const parts = line.split('\t')
                        const stationName = parts[0]
                        const type = parts[1]
                        const lat = parseFloat(parts[2])
                        const lng = parseFloat(parts[3])

                        const key = `${stationName} ${type}`
                        mrtStn[key] = {lat,lng}

                        this.mrtStations = Object.fromEntries(
                            Object.entries(mrtStn).sort(([a], [b]) => a.localeCompare(b))
                        )
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
                
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

      body {
        background: whitesmoke !important;
      }


      /* Tutor Profile Display */
      .card-display {
          border-radius: 25px;
          background-color: #FFF;
          height: 100%;
          position: relative;
          padding-bottom: 130px;
          box-shadow: 10px 10px 5px lightgrey;
      }

      .image-content,
      .card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3px 5px;
      }

      .card-image {
          position: relative;
          height: 150px;
          width: 150px;
          border-radius: 50%;
          background: #FFF;
          padding: 3px;
      }

      .image-content {
          position: relative;
          row-gap: 3px;
          padding: 18px 0;
      }

      .overlay {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background-color: #4070F4;
          border-radius: 25px 25px 0 25px;
      }

      .overlay::before,
      .overlay::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -40px;
          height: 40px;
          width: 40px;
          background-color: #4070F4;
      }

      .overlay::after {
          border-radius: 0 25px 0 0;
          background-color: #FFF;
      }

      .card-image .card-img{
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #4070F4;
      }

      .name {
          font-size: 22px;
          font-weight: 500;
      }

      .cardButton {
          position: absolute;
          font-size: 16px;
          margin: 14px;
          bottom: 5px;
      }

      .distanceInfor {
        position: absolute;
        font-size: 15px;
        bottom: 60px;
      }

      .mrtInfor {
        position: absolute;
        bottom: 80px;
      }

      .timeslots {
        list-style: none;
        padding: 5px 10px;
      }

      /* Top Section */
      .topSection {
        background-image: url('https://media.istockphoto.com/id/639392022/vector/bookshelves-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=1DNOwFJabnlqHzShnSHfWOsNBUTtIaOgFBcpGQO_-oQ=');
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

      /* Typing Animation */
      #cursor {
        color: #007bff;
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

      /* Upcoming layout */
      .upcoming-request {
        min-width: 180px;
      }

      @media (max-width: 1231px) {
        .upcoming-request {
          min-width: 100%;
          margin-top: 10px;
        }

        .tutor-display {
          min-width: 100%;
          background-color: whitesmoke;
        }

        .upcoming-box {
          width: 49%;
          float: left;
          background-color: whitesmoke;
        }

        .request-box {
          width: 49%;
          float: right;
          background-color: whitesmoke;
        }
      }

     
      /* No Resesult Image Sizing */
      .no-result-img {
        width: 100px;
      }

      #nar_bar {
        height: 84px;
      }

      /* Footer */
      #footer {
        padding: 25px 0px;
      }
      footer h5 {
        padding: 10px 0px;
      }
      #footer li a {
        text-decoration: none;
      }
      .custom-footer-margin {
        background-color: black;
        color: white;
      }
      /* end footer */

      #nav_bar {
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
      }
</style>