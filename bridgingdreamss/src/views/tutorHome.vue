<template>
    <!-- <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'> -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div>
        <section class="topSection text-light mt-5 p-5 text-center text-sm-start" id="container1">
            <div class="jumbotron textBox">
                <div>
                    <img class="position-absolute tuition maximum-dimensions" src="../assets/tuition.png" alt="tuition">
                    <h1>Welcome to <span id="typewriter" style="color: #007bff;"></span><span id="cursor">|</span></h1>
                    <p class="lead">
                        This is where you can create your listings and match with students.
                    </p>
                    <hr class="my-4">
                </div>
            </div>
        </section>
        

    </div>
    <div class="container">

        <div class="row mx-2 justify-content-center">
            <div class="col-lg-8 my-2">
                <div class="row justify-content-center">
                    <div class="p-3 mb-3 bg-white border ">
                        <h4 class="text-center" style="font-weight:bolder">Your Requests</h4>
                        <table class="table text-center">
                                <tr>
                                    <th>Parent's Name</th>
                                    <th>Child's Name</th>
                                    <!-- <th>Education Level</th> -->
                                    <th>Subject</th>
                                    <th>Date & Time</th>
                                    <th>Action</th>
                                </tr>
                                <tbody>
                                    <tr v-for="request of requests" :key="request.tutorID">
                                        <td>{{request.parentName}}</td>
                                        <td>{{request.childName}}</td>
                                        <!-- <td>{{request.educationLevel}}</td> -->
                                        <td>{{request.subjectInterested }}</td>
                                        <td>{{request.date}} | {{ request.time }}</td>
                                        <td><button class="btn btn-primary btn-sm" data-bs-toggle="modal" :data-bs-target="'#modal-' + request.listingID">View</button></td>     
                                    </tr>
                                </tbody>
                                
                        </table>
                        <div v-for="request of requests" :key="request.tutorID">
                                        <div class="modal fade" :id="'modal-' + request.listingID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticBackdropLabel">Conduct a Tuition Session with <span><strong>{{ request.childName }} </strong></span></h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="container-fluid">
                                                            <div class="row my-2 border-bottom">
                                                                <div class="col-6">
                                                                    <strong>Child Name:</strong> 
                                                                </div>
                                                                <div class="col-6 text-center">
                                                                    {{request.childName}}
                                                                </div>
                                                            </div>
                                                            <div class="row my-2 border-bottom">
                                                                <div class="col-6">
                                                                    <strong>Gender:</strong> 
                                                                </div>
                                                                <div class="col-6 text-center">
                                                                    {{request.childGender}}
                                                                </div>
                                                            </div>
                                                            <div class="row my-2 border-bottom">
                                                                <div class="col-6">
                                                                    <strong>Subject:</strong> 
                                                                </div>
                                                                <div class="col-6 text-center">
                                                                    {{request.subjectInterested}}
                                                                </div>
                                                            </div>
                                                            <div v-if="request.notes != ''" class="row my-2">
                                                                <div class="col-6">
                                                                    <strong>Additional Notes from Parent:</strong> 
                                                                </div>
                                                                <div class="col-12">
                                                                    {{request.notes}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button @click="acceptRequest(request.listingID,request.id)" data-bs-dismiss="modal"  class="btn btn-primary">Accept</button> 
                                                        <button @click="rejectRequest(request.listingID,request.id)" data-bs-dismiss="modal" class="btn btn-danger">Reject</button> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="p-3 bg-white border">
                        <h4 class="text-center" style="font-weight:bolder;">Your Listings</h4>
                        <table class="table text-center">
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                            <tbody>
                                <tr v-for="(schedule) in schedules" :key="schedule.uid">
                                    <td>{{schedule.date}}</td>
                                    <td>{{schedule.time}}</td>
                                    <td><button @click="deleteListing(schedule.id)" class="btn btn-danger btn-sm">Delete</button></td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <div class="text-center">
                            <button type="button" class="btn btn-success text-center btn-sm" data-bs-toggle="modal" data-bs-target="#modal">Create Listing</button>  
                        </div>
                        <div id="modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Create Listing </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                        
                                        <div class="modal-body">
                                            <label class="form-label" for="preferredDate">Date</label>
                                            <input v-model="form.date" class="form-control" type="date" id="preferredDate" name="preferredDate">
                                            <br>
                                            <label class="form-label" for="preferredTime">Time</label>
                                            <select v-model="form.time" class="form-control" id="preferredTime" name="preferredTime">
                                                <option value="" selected disabled>Choose a timeslot</option>
                                                <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                                                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                                                <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                                                <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                                                <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                                                <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
                                            </select>
                                        </div>
                                        <div class="modal-footer">
                                            <button data-bs-dismiss="modal" @click="addNewProfile" type="submit" class="btn btn-secondary">Create</button> 
                                            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
            
            <div class="col-lg-3 my-2">
                <div class="p-3 bg-white border">
                    <h5 class="text-center" style="font-weight:bolder;">Upcoming Sessions</h5>
                    <div v-for="confirmed of confirmedRequests" :key="confirmed.id" class="card mb-3 text-center">
                        <div class="card-body">
                            <h5 class="card-title">{{confirmed.childName}}</h5>
                            <h6 class="card-text">{{ confirmed.nearestMRT.slice(0, -3) }}</h6>
                            <p class="card-text">{{confirmed.date}} {{confirmed.time}}</p>
                            <a href="#" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#modal-' + confirmed.listingID">View</a>
                        </div>
                    </div>
                    <div v-for="confirmed of confirmedRequests" :key="confirmed.id">
                        <div class="modal fade" :id="'modal-' +  confirmed.listingID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Upcoming Session with {{confirmed.childName }}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    
                                    <div class="modal-body">
                                        <div class="container-fluid">
                                            <div class="row my-2 border-bottom">
                                                <div class="col-6">
                                                    <strong>Child Name:</strong> 
                                                </div>
                                                <div class="col-6 text-center">
                                                    {{confirmed.childName}}
                                                </div>
                                            </div>
                                            <div class="row my-2 border-bottom">
                                                <div class="col-6">
                                                    <strong>Gender:</strong> 
                                                </div>
                                                <div class="col-6 text-center">
                                                    {{confirmed.childGender}}
                                                </div>
                                            </div>
                                            <div class="row my-2 border-bottom">
                                                <div class="col-6">
                                                    <strong>Subject:</strong> 
                                                </div>
                                                <div class="col-6 text-center">
                                                    {{confirmed.subjectInterested}}
                                                </div>
                                            </div>
                                            <div class="row my-2 border-bottom">
                                                <div class="col-6">
                                                    <strong>Contact Number:</strong> 
                                                </div>
                                                <div class="col-6 text-center">
                                                    {{confirmed.parentContactNo}}
                                                </div>
                                            </div>
                                            <div v-if="confirmed.notes != ''" class="row my-2">
                                                <div class="col-6">
                                                    <strong>Additional Notes from Parent:</strong> 
                                                </div>
                                                <div class="col-12">
                                                    {{confirmed.notes}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button data-bs-dismiss="modal" type="button" class="btn btn-secondary">Close</button>
                                    </div>
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

import { db , auth} from '/src/firebase/init.js'
    import {collection,doc, addDoc, onSnapshot, query, where, updateDoc,deleteDoc} from 'firebase/firestore'
    export default {
        
        data() {
            return {
                id: null,
                form: {
                    date: '',
                    time: '',
                    status: 'available',
                    tutorName: '',
                    nearestMrt: '',
                    tutorContactNum: '',
                },
                options: { day: '2-digit', month: 'long', year: 'numeric'},
                schedules: [],
                upcomingSchedules: [],
                requests: [],
                confirmedRequests: [],
            }
        },
        methods: {
            
            addNewProfile: function() {
                var selectedDate = new Date(this.form.date)
                var newDate = selectedDate.toLocaleDateString(undefined,this.options)

                onSnapshot(query(collection(db,'tutors'), where('userID', '==', this.id)), (snap) => {
                    
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.form.tutorName = doc.data().name
                            this.form.nearestMrt = doc.data().location
                            this.form.tutorContactNum = doc.data().contactNumber
                            addDoc(collection(db,'listings'),{
                                date: newDate,
                                tutorContact: this.form.tutorContactNum,
                                status: this.form.status,
                                time: this.form.time,
                                uid: this.id,
                                tutorName: this.form.tutorName,
                                nearestMRT: this.form.nearestMrt
                                
                            })
                            this.popupVisible = false
                            this.form.date = ''
                            this.form.time = ''

                            alert("Schedule Created Successfully!")
                        }
                    })
                })
            },
            getSchedules() {
                onSnapshot(query(collection(db,'listings'), where('uid', '==', this.id),where('status',"==","available")), (snap) => {
                    this.schedules = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.schedules.push({id:doc.id, ...doc.data()})
                        }
                    })
                    this.schedules.sort((a, b) => {
                        // Assuming 'date' is a string in the format "YYYY-MM-DD"
                        return new Date(a.date) - new Date(b.date);
                    });
                })
            },
            
            getRequests() {
                onSnapshot(query(collection(db,'requests'), where('tutorID', '==', this.id),where("status", "==", "pending")), (snap) => {
                    this.requests = []
                    snap.forEach((doc) => {
                        if(doc.exists()) {
                            this.requests.push({id:doc.id, ...doc.data()})
                        }
                    })
                    this.requests.sort((a, b) => {
                        // Assuming 'date' is a string in the format "YYYY-MM-DD"
                        return new Date(a.date) - new Date(b.date);
                    });
                })
            },
            getConfirmedRequests(){
                onSnapshot(query(collection(db,'requests'), where('tutorID', '==', this.id),where("status", "==", "confirmed")), (snap) => {
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
            acceptRequest(listingID,requestID){
                
                const listingRef = doc(db, "listings", listingID)
                const requestRef = doc(db,'requests',requestID)
                if(window.confirm("Are you sure you want to accept this request?")){
                    updateDoc(listingRef, {
                        status: 'unavailable'
                    })
                    updateDoc(requestRef, {
                        status: 'confirmed'
                    })
                    alert("Request Successfully Accepted")
                }
                
            },
            rejectRequest(listingID,requestID){
                
                const listingRef = doc(db, "listings", listingID)
                const requestRef = doc(db,'requests',requestID)
                if(window.confirm("Are you sure you want to reject this request?")){
                    updateDoc(listingRef, {
                        status: 'available'
                    })
                    updateDoc(requestRef, {
                        status: 'rejected'
                    })

                    alert("Request Successfully Rejected")
                }
                
            },
            deleteListing(id){
                console.log(id)
                const listingRef = doc(db, 'listings', id);
                deleteDoc(listingRef)
                    .then(() => {
                        alert("Listing Successfully Deleted!")
                    })
            }
        },
        created() {
            var user = auth.currentUser
            if(user){
                this.id = user.uid
            }
            this.getSchedules()
            this.getRequests()
            this.getConfirmedRequests()
        }
    }
</script>

<style scoped>
    .topSection {
          background-image: url('../assets/tutorhomepagebookshelf.png');
          background-size: contain;
      }

      /* Banner */
      .textBox {
        background-color: rgba(0, 0, 0, 0.7);
        padding: 15px;
        border: 5px solid #8B4513;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);                               
      }

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
        }}

      /* Table Format */
      table{
        border: 3px solid lightgrey;
      }

      th{
        background: #6dbcd6 !important;
        font-weight:bolder;
      }
      td{
        padding: 15px;

        text-align:center;
      }

      tr {
        border-bottom: 2px solid lightgrey;
      }
      
      /* Background Image with the kids */
      .tuition {
        position: absolute;
        max-width: 2000px; /* You can adjust the max-width if needed */
        max-height: 620px; /* You can adjust the max-height if needed */
        z-index: -1; /* Place the image behind the content */
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

    
</style>