<template>
    <div style="background-color: #6DBCDB ;" >
        <section class="pt-5 position-relative mt-5" data-sal="slide-up" data-sal-delay="400">
        <img class="position-absolute bookshelf maximum-dimensions" src="../assets/bookshelf.png" alt="teacherman">
        <img class="position-absolute bookshelf2 maximum-dimensions" src="../assets/bookshelf.png" alt="teacherman">
        <div class="container position-relative z-index-3">
            <div class="row justify-content-center">
                <div class="col-md-9 col-lg-7 col-xl-6">
                    <div class="text-center chalkboard-text">
                        <h2 class="mb-3">TUTORS UPLOAD PAGE</h2>
                        <p>Upload and share educational material to our resource library</p>
                    </div>
                </div>         
            </div>
        </div>
        </section>

        <div class="container pt-3 ">
            <div class="row ">
                <div class="col-md-2 col-1"></div>
                <div class="col-md-8 col-10  z-index-3">
                    <div class="p-3 border mb-3 bg-white border rounded-custom shadowed-container">
                        <h3 class="text-center">My Uploads</h3>
                        <table class="table table-responsive">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th class="text-end"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="profile in profiles" :key="profile.id">
                                    <td>{{ profile.data.title }}</td>
                                    <td class="text-end">
                                        <a :href="profile.data.file_url" target="_blank" class="btn btn-primary btn-sm me-1">View</a>
                                        <a @click="deleteResource(profile.data.title,profile.id)" class="btn btn-danger btn-sm">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-1"></div>
            <div class="row">
                <div class="col-md-2 col-1"></div>
                <div class="col-md-8 col-10 z-index-3">
                    <div class="p-3 border mb-3 bg-white border rounded-custom shadowed-container">
                        <h3 class="text-center">Upload a File</h3>
                        <form @submit.prevent="uploadFile">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" v-model="form.title" class="form-control" id="title" name="title" required>
                            </div>
                            <div class="mb-3">
                                <label for="file" class="form-label">Input File</label>
                                <input type="file" ref="fileName" class="form-control" id="file" name="file" required>
                            </div>
                            <div class="mb-3">
                                <label for="type" class="form-label">Type</label>
                                <select class="form-select" id="type" v-model="form.type"  name="type" required>
                                    <option value="Worksheets">Worksheets</option>
                                    <option value="Lecture Notes">Lecture Notes</option>
                                    <option value="Exam Paper">Exam Paper</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="educationLevel" class="form-label">Education Level</label>
                                <select class="form-select" id="educationLevel" v-model="form.subjectLevel" name="educationLevel" required>
                                    <option value="Primary School">Primary</option>
                                    <option value="Lower Secondary">Lower Secondary</option>
                                    <option value="Upper Secondary">Upper Secondary</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="subject" class="form-label">Subject</label>
                                <select class="form-select" id="subject" name="subject" v-model="form.selectedSubject" required>
                                    <option v-for="subject in subjectsList" :key="subject" >{{ subject }}</option>       
                                </select>
                            </div>
                            <div class="text-center">
                                <button  type="submit" class="btn btn-primary">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-1"></div>
        </div>
    </div>
    
</template>

<script>
import { db , auth,storage } from '/src/firebase/init.js'
import {ref, deleteObject, uploadBytes, getDownloadURL} from 'firebase/storage'
import {collection, onSnapshot, where, query, doc, deleteDoc, addDoc} from 'firebase/firestore'


export default {
    data() {
        return {
            profiles: [],
            form: {
                title: '',
                fileName: '',
                type: '',
                subjectLevel: '',
                selectedSubject: '',
                file_url: ''
                 
            },
            subjectsOptions: {
                'Primary School': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese'],
                'Lower Secondary': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese', 'Geography', 'Literature', 'History'],
                'Upper Secondary': ['English', 'E Math', 'A Math', 'Chinese', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Social Studies', 'POA', 'Literature'],
            },
            userID: null
        }
    },
    methods: {
        async getResources() {
            
            onSnapshot(query(collection(db,'resource'), where('uid', '==', this.userID)), (snap) => {
                this.profiles = []
                snap.forEach((doc) => { 
                    if(doc.exists()) {
                        this.profiles.push({id: doc.id, data: doc.data()})
                    }
                })
            })
            
        },
        async deleteResource(title,id){
            
            const confirmDelete = window.confirm("Are you sure you want to delete this resource?");
            if(confirmDelete){
                try {
                    await deleteDoc(doc(db, "resource", id));
                    const desertRef = ref(storage, 'resource/' + title + ".pdf");
                    deleteObject(desertRef)
                    alert("File Successfully Deleted!")
                }
                
                catch{
                    alert("OH NO")
                }
            }
            
        },
        uploadFile: function() {
            console.log("hi")
            const storageRef = ref(storage, 'resource/' + this.form.title +".pdf")
            
            uploadBytes(storageRef, this.$refs.fileName.files[0])
            .then(() => {   
                return getDownloadURL(storageRef)
            })
            .then((url) => {
                console.log(url)
                this.file_url = url
                addDoc(collection(db,'resource'),{
                    title: this.form.title,
                    file_url:this.file_url,
                    type: this.form.type,
                    level: this.form.subjectLevel,
                    subject: this.form.selectedSubject,
                    uid: this.userID
                })
                alert("File Uploaded Successfully")
            })
            .then(() => {
                this.form.title = '',
                this.$refs.fileName = '',
                this.$refs.fileName.value = '',
                this.form.type = '',
                this.form.subjectLevel = '',
                this.form.selectedSubject = ''
           
            })
        },
    }
    ,
    created(){
        var user = auth.currentUser
        if(user){
            this.userID = user.uid
        }
        
        this.getResources()

    },
    computed: {
        subjectsList() {
            return this.subjectsOptions[this.form.subjectLevel] || [];
        }
    }
}
</script>

<style scoped>

       

            h3{
                font-weight:bolder;
                text-transform:none;
            }

            .rounded-custom {
                border-radius: 20px; /* Adjust the radius value as needed */
            }

            .shadowed-container {
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 20px; /* Add padding for spacing and better visualization */
                background-color: whitesmoke; /* You can adjust the background color as needed */
            }

            .form-label{
                font-weight:bold;
            }

            .maximum-dimensions{
                max-width:800px;
                max-height:600px;
            }

            .bookshelf {
                position: absolute;
                max-width: 800px; /* You can adjust the max-width if needed */
                max-height: 600px; /* You can adjust the max-height if needed */
                z-index: 0; /* Place the image behind the content */
            }

            .bookshelf2{
                position: absolute;
                right:0;
                max-width: 800px; /* You can adjust the max-width if needed */
                max-height: 600px; /* You can adjust the max-height if needed */
                z-index: 0; /* Place the image behind the content */
            }

            .z-index-3{
                z-index: 3;
            }

            .chalkboard-text {
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 20px;
                border-radius: 5px;
                z-index: -1; /* Adjust this value as needed to ensure it's above the images */
                border: 5px solid #8B4513; /* Dark border color resembling a chalkboard frame */
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a subtle shadow for depth */
            }
            @media (max-width: 700px) {
                .btn-separator {
                    margin-bottom: 5px;
                }
            }
</style>
