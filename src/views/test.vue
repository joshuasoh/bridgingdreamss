<template>
    <section class=" text-light p-5 text-center text-sm-start" id="container1" style="background-color: #0069d9;">
        <div class="jumbotron">
            <div class="text-center">
                <h1 class="display-4">Welcome to Your Homepage</h1>
                <p class="lead" style="font-style: italic;">"This is where you can find your desired tutors based on your preferences"</p>
                <hr class="my-4">
          </div>
          <div class="container">
            <div class="row">
                <!-- <form @submit.prevent="handleFilter()">
                    <div class="input-group justify-content-center text-align-center">
                        <div class="col-md-3 col-6 m-1">
                            <label for="eduLevel" class="form-label" style="font-size: 20px;">Education Level</label>
                            <select id="eduLevel" class="form-select" aria-label="Default select example" >
                            </select>
                        </div>
                    </div>
                </form> -->
            </div>
          </div>
        </div>
    </section>


    <div class="container-fluid my-2">
        <div class="row py-1">
            <div class="col-lg-10 col-sm-12 py-1 bg-light">
                <div class="row text-center">
                    <h4>Our Recommended Tutors</h4>
                </div>
                <div class="row justify-content-around">
                    <div v-for="tutor in recommendedTutors" :key="tutor.userID" class="col-lg-3 col-md-5 col-12 my-2">
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
                                    <h5 >I teaches:</h5>
                                    <button class="btn btn-warning m-1" disabled v-for="subject in tutor.subjects" :key="subject">
                                        {{subject}}
                                    </button>
                                </div>
                                <p class="mrtInfor"><i class="fa-solid fa-location-dot" style="color: #ff0f0f;"></i>  {{tutor.location}}</p>
                                <p class="distanceInfor"><i class="fa-solid fa-train"></i> {{tutor.distanceBetween}} away from you</p>
                                <button type="button" class="btn btn-primary cardButton" data-bs-toggle="modal" :data-bs-target="'#tutor-' + tutor.tutorID">Book</button>
                            </div>
                        </div>

                        <div class="modal fade" :id="'tutor-' + tutor.tutorID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
            <div class="col-lg-2 col-12">
                <div class="container-fluid bg-light py-1">
                    <h4>Upcoming Sessions</h4>
                    <div v-for="confirmed in confirmedRequests" :key="confirmed.id" class="card mb-3 text-center " style="max-height: 190px; border-radius: 10px;" >
                        <div class="card-body">
                            <h5 class="card-title">{{confirmed.tutorName}}</h5>
                            <p class="card-text">{{confirmed.date}} {{confirmed.time}}</p>
                            <p><strong>Subject:</strong> {{confirmed.subjectInterested}}</p>
                        </div>
                    </div>
                </div>
                <div class="container-fluid bg-light py-1">
                    <h4>Your Requests</h4>
                    <div v-for="request in pendingRequests" :key="request.id" class="card mb-3 text-center " style="max-height: 260px; border-radius: 10px;">
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
    <footer id="contact" class="page-footer p-2 text-md-left">
        <div class="container py-5">
            <div class="row g-4">
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase font-weight-bold mb-4">
                        Bridging Dreams
                    </h5>
                    <p>
                        Founded on 18th October 2023
                    </p>
                    <p>
                        Made by Information System Students 
                    </p>
                    <p>
                        Singapore Management Univeristy 
                    </p>
                </div>
                <div class="col-lg-2 col-md-2 mx-auto">
                    <h5 class="text-uppercase font-weight-bold mb-4">Follow Us</h5>
                    <p id="icon">
                        <i class='bx bxl-facebook'></i>
                        <i class='bx bxl-instagram'></i>
                        <i class='bx bxl-twitter'></i>
                        <i class='bx bxl-youtube'></i>
                    </p>
                </div>
                <div class="col-lg-3 col-xs-12 location">
                    <h5 class="text-uppercase font-weight-bold mb-4">Location</h5>
                    <p class="d-flex">
                        147 Killiney Road
                    </p>
                    <p class="d-flex">
                        +65 9451 8710
                    </p>
                    <p class="d-flex">
                        bridgingdreamsinfo@gmail.com
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <footer class="p-3 bg-dark text-white text-center position-relative">
        <div class="container">
            <p class="mb-0">
                Copyright &copy; 2023 Bridging Dreams
            </p>
    
            <a href="#" class="position-absolute bottom-0 end-0 p-5">
                <i class="bi bi-arrow-up-circle h1"></i>
            </a>
          </div>
    </footer>

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
            recommendedTutors: [],
            id: '',
            timeSlot: [],
            profile: {
                childName: '',
                parentName: '',
                educationLevel: '',
                nearestMRT: '',
                childGender: '',
                contactNum: '',
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
            },
            mrtStations: {},
            confirmedRequests: [],
            pendingRequests: []
        }
    },
    created() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.id = user.uid;
                this.getStudentSubjects()
                this.getConfirmedRequests()
                this.getRequest()
            }
            
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
                        this.profile.contactNum = doc.data().contactNumber
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
                        if(distance == 0){
                            distance = 'Same Area'
                        }else{
                            distance = distance + ' km'
                        }
                        tutorData.distanceBetween = distance
                    }
                    console.log(tutorData.subjects)
                    this.getTuitionTimeslots(tutorData)
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
                    if(!this.recommendedTutors.some((tutor) => tutor.id === tutorData.userID)){
                        tutorData.tuitionTimeslots = timeSlot;
                        this.recommendedTutors.push(tutorData);
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
                await addDoc(collection(db,'requests'),{
                    listingID: this.profile.listingID,
                    parentName: this.profile.parentName,
                    childName: this.profile.childName,
                    childGender: this.profile.childGender,
                    educationLevel: this.profile.educationLevel,
                    notes: this.profile.notes,
                    nearestMRT: this.profile.nearestMRT,
                    contactNum: this.profile.contactNum,
                    date: this.profile.selectedDate,
                    time: this.profile.selectedTime,
                    status: "pending",
                    parentID: this.id,
                    tutorID: this.profile.tutorID,
                    tutorName: this.profile.tutorName,
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
                this.recommendedTutors = []
                this.getRecommended()
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
                    this.confirmedRequests.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    });
            })
        },
        removeRequest(id){
            const requestRef = doc(db,'requests',id)
            updateDoc(requestRef, {
                status: 'acknowledged'
            })
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
    }

}


</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }
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
</style>