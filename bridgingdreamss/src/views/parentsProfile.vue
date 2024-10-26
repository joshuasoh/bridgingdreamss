<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <div  style="background-color:#6DBCDB; ">
        <section class="pt-5 mt-5 position-relative" data-sal="slide-up" data-sal-delay="400">
            <img class="position-absolute teacher-whiteboard maximum-dimensions" src="../assets/manpointing.png" alt="teacher">
            <img class="position-absolute teacherman-whiteboard maximum-dimensions" src="../assets/boypointing.png" alt="teacherman">
            <div class="container position-relative">
                <div class="row justify-content-center">
                <div class="col-md-9 col-lg-7 col-xl-6">
                    <div class="text-center chalkboard-text">
                    <h2 class="mb-3">PARENTS PROFILE PAGE</h2>
                    <p>Please fill this in for us to get to know you better.</p>
                    </div>
                </div>         
                </div>
            </div>
        </section>
        <div v-if="!uploaded">
        <div class="container firstBox mt-5 pb-5 z-index-3">
            <form class="row" enctype="multipart/form-data" id="parentForm" @submit.prevent="addNewProfile">
                <div class="col-lg-0 col-xl-1"></div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5">
                    <div class="p-3 border bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload" class="form-label" style="font-size:24px; font-weight:bolder;">Parent</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name *</label>
                                <input type="text" v-model="form.pName" class="form-control" id="parentsName" placeholder="Enter your name" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="emailAddress" class="form-label">Email Address</label>
                                <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="contactNumber" class="form-label">Contact Number *</label>
                                <input type="number" v-model="form.contact" class="form-control" id="phoneNumber" placeholder="Enter your phone number" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender *: &nbsp;    </label>
                                <select id="parentsGender" v-model="form.pGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="nearestMRT" class="form-label">Nearest MRT *: </label>
                                <div class="position-static">
                                    <select id="nearestMRT" class="form-select" v-model="form.location" name="nearestMRT">
                                        <!-- The dropdown options will be added here -->
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station, key in mrtStations" :key="station">
                                            {{ key }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                    <div class="p-3 bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload2" class="form-label" style="font-size:24px;font-weight:bolder;">Child</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name *</label>
                                <input type="text" v-model="form.cName" class="form-control" id="nameChild" placeholder="Enter your child's name" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender *:&nbsp;   </label>
                                <select id="parentsGender" v-model="form.cGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="educationLevel" class="form-label">Current Education Level *</label>
                                <select class="form-select" v-model="form.selectedLevel"  id="educationLevel">
                                    <option selected value="Primary School">Primary School</option>
                                    <option value="Lower Sec">Lower Secondary School</option>
                                    <option value="Upper Sec">Upper Secondary School</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="subjects" class="form-label">Subjects *</label>
                                <div id="subjects-checkbox">
                                    <div class="row">
                                        <div v-for="(subject, index) in emptySubjects" :key="subject" class="col-md-6">
                                            <input class="form-check-input" v-model="form.selectedSubjects" type="checkbox" :value="form.selectedLevel + ' ' + subject" :id="subject">
                                            <label class="form-check-label" :for="subject">{{ subject }}</label>
                                            <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center pt-3">
                    <button type="submit" id="saveDetailsButton" class="btn btn-primary">Save Details</button>
                </div>
                <div class="col-lg-0 col-xl-1"></div>

                <!-- <form class="row g-3" enctype="multipart/form-data" id="parentForm" @submit.prevent="addNewProfile">
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Parent Profile</h1>
                            <div class="row g-3" >
                                <div class="col-md-6">
                                    <label for="firstName"  class="form-label">Name</label>
                                    <input type="text" v-model="form.pName" class="form-control" id="parentsName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="emailAddress" class="form-label">Email Address</label>
                                    <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                                </div>
                                
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="form.pGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNumber" class="form-label">Contact Number</label>
                                    <input type="number" v-model="form.contact" class="form-control" id="phoneNumber" required>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Kid Profile</h1>
                            <div class="row g-3" enctype="multipart/form-data" id="childForm" @submit.prevent="addNewProfile">
                                <div class="col-md-6">
                                    <label for="firstName" class="form-label">Name</label>
                                    <input type="text" v-model="form.cName" class="form-control" id="nameChild" required>
                                </div>
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="form.cGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="nearestMRT">Nearest MRT: </label>
                                    <select id="nearestMRT" v-model="form.location" name="nearestMRT">
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station, key in mrtStations" :key="station">
                                            {{ key }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="educationLevel" class="form-label">Current Education Level</label>
                                    <select class="form-select" v-model="form.selectedLevel"  id="educationLevel">
                                        <option selected value="Primary School">Primary School</option>
                                        <option value="Lower Sec">Lower Secondary School</option>
                                        <option value="Upper Sec">Upper Secondary School</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="subjects" class="form-label">Subjects</label>
                                    <div id="subjects-checkbox">
                                        <div class="row">
                                            <div v-for="(subject, index) in emptySubjects" :key="subject" class="col-md-6">
                                                
                                                <input class="form-check-input" v-model="form.selectedSubjects" type="checkbox" :value="form.selectedLevel + ' ' + subject" :id="subject">
                                                <label class="form-check-label" :for="subject">{{ subject }}</label>
                                                <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center pt-3">
                        <button type="submit" id="saveDetailsButton" class="btn btn-primary">Save Details</button>
                    </div>
                </form> -->
                
            </form>
        </div>
        </div>
        <div v-else>
        <div class="container firstBox mt-5 pb-5 z-index-3">
            <form class="row" enctype="multipart/form-data" id="parentForm" @submit.prevent="updateProfile">
                <div class="col-lg-0 col-xl-1"></div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5">
                    <div class="p-3 border bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload" class="form-label" style="font-size:24px; font-weight:bolder;">Parent</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name *</label>
                                <input type="text" v-model="existing.pName" class="form-control" id="parentsName" placeholder="Enter your name" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="emailAddress" class="form-label">Email Address</label>
                                <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="contactNumber" class="form-label">Contact Number *</label>
                                <input type="number" v-model="existing.contact" class="form-control" id="phoneNumber" placeholder="Enter your phone number" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender *:&nbsp;     </label>
                                <select id="parentsGender" v-model="existing.pGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="nearestMRT" class="form-label">Nearest MRT *: </label>
                                <div class="position-static">
                                    <select id="nearestMRT" class="form-select" v-model="existing.location" name="nearestMRT">
                                        <!-- The dropdown options will be added here -->
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station, key in mrtStations" :key="station">
                                            {{ key }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                    <div class="p-3 bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload2" class="form-label" style="font-size:24px;font-weight:bolder;">Child</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name *</label>
                                <input type="text" v-model="existing.cName" class="form-control" id="nameChild" placeholder="Enter your child's name" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender *:&nbsp;  </label>
                                <select id="parentsGender" v-model="existing.cGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="educationLevel" class="form-label">Current Education Level *</label>
                                <select class="form-select" v-model="existing.selectedLevel"  id="educationLevel">
                                    <option selected value="Primary School">Primary School</option>
                                    <option value="Lower Sec">Lower Secondary School</option>
                                    <option value="Upper Sec">Upper Secondary School</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="subjects" class="form-label">Subjects *</label>
                                <div id="subjects-checkbox">
                                    <div class="row">
                                        <div v-for="(subject, index) in existingSubjects" :key="subject" class="col-md-6">
                                            <input class="form-check-input" v-model="existing.selectedSubjects" type="checkbox" :value="existing.selectedLevel + ' ' + subject" :id="subject">
                                            <label class="form-check-label" :for="subject">{{ subject }}</label>
                                            <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center pt-3">
                    <button type="submit" id="saveDetailsButton" class="btn btn-primary">Update Details</button>
                </div>
                <div class="col-lg-0 col-xl-1"></div>

            </form>
        </div>
        </div>
    </div>
    <!-- <section class="pt-5 mt-5 position-relative" data-sal="slide-up" data-sal-delay="400">
      <img class="position-absolute teacher-whiteboard z-index-minus-1 maximum-dimensions" src="../assets/manpointing.png" alt="teacher">
      <img class="position-absolute teacherman-whiteboard z-index-minus-1 maximum-dimensions" src="../assets/boypointing.png" alt="teacherman">
      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-md-9 col-lg-7 col-xl-6">
            <div class="text-center chalkboard-text">
              <h2 class="mb-3">PARENTS PROFILE PAGE</h2>
              <p>Please fill this in for us to get to know you better.</p>
            </div>
          </div>         
        </div>
      </div>
    </section> -->
    <!-- <div v-if="!uploaded">
        <div class="container firstBox my-5">
            <form class="row" enctype="multipart/form-data" id="parentForm" @submit.prevent="addNewProfile">
                <div class="col-lg-0 col-xl-1"></div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5">
                    <div class="p-3 border bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload" class="form-label" style="font-size:24px; font-weight:bolder;">Parent</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name *</label>
                                <input type="text" v-model="form.pName" class="form-control" id="parentsName" placeholder="Enter your name" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="emailAddress" class="form-label">Email Address</label>
                                <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="contactNumber" class="form-label">Contact Number</label>
                                <input type="number" v-model="form.contact" class="form-control" id="phoneNumber" placeholder="Enter your phone number" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender:    </label>
                                <select id="parentsGender" v-model="form.pGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="nearestMRT" class="form-label">Nearest MRT: </label>
                                <div class="position-static">
                                    <select id="nearestMRT" class="form-select" v-model="form.location" name="nearestMRT">
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station, key in mrtStations" :key="station">
                                            {{ key }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                    <div class="p-3 bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload2" class="form-label" style="font-size:24px;font-weight:bolder;">Child</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name</label>
                                <input type="text" v-model="form.cName" class="form-control" id="nameChild" placeholder="Enter your child's name" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender:  </label>
                                <select id="parentsGender" v-model="form.cGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="educationLevel" class="form-label">Current Education Level</label>
                                <select class="form-select" v-model="form.selectedLevel"  id="educationLevel">
                                    <option selected value="Primary School">Primary School</option>
                                    <option value="Lower Sec">Lower Secondary School</option>
                                    <option value="Upper Sec">Upper Secondary School</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="subjects" class="form-label">Subjects</label>
                                <div id="subjects-checkbox">
                                    <div class="row">
                                        <div v-for="(subject, index) in emptySubjects" :key="subject" class="col-md-6">
                                            <input class="form-check-input" v-model="form.selectedSubjects" type="checkbox" :value="form.selectedLevel + ' ' + subject" :id="subject">
                                            <label class="form-check-label" :for="subject">{{ subject }}</label>
                                            <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center pt-3">
                    <button type="submit" id="saveDetailsButton" class="btn btn-primary">Save Details</button>
                </div>
                <div class="col-lg-0 col-xl-1"></div>

                
            </form>
        </div>
    </div> -->
    <!-- <div v-else>
        <div class="container firstBox my-5">
            <form class="row" enctype="multipart/form-data" id="parentForm" @submit.prevent="updateProfile">
                <div class="col-lg-0 col-xl-1"></div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5">
                    <div class="p-3 border bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload" class="form-label" style="font-size:24px; font-weight:bolder;">Parent</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name *</label>
                                <input type="text" v-model="existing.pName" class="form-control" id="parentsName" placeholder="Enter your name" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="emailAddress" class="form-label">Email Address</label>
                                <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                            </div>
                            <div class="col-xl-6 col-12">
                                <label for="contactNumber" class="form-label">Contact Number</label>
                                <input type="number" v-model="existing.contact" class="form-control" id="phoneNumber" placeholder="Enter your phone number" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender:    </label>
                                <select id="parentsGender" v-model="existing.pGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="nearestMRT" class="form-label">Nearest MRT: </label>
                                <div class="position-static">
                                    <select id="nearestMRT" class="form-select" v-model="existing.location" name="nearestMRT">
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station, key in mrtStations" :key="station">
                                            {{ key }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                    <div class="p-3 bg-white border rounded-custom shadowed-container">
                        <div class="row g-3">
                            <div class="col-12 image-upload">
                                <label for="imageUpload2" class="form-label" style="font-size:24px;font-weight:bolder;">Child</label>
                            </div>
                            <div class="col-12">
                                <label for="firstName" class="form-label">Name</label>
                                <input type="text" v-model="existing.cName" class="form-control" id="nameChild" placeholder="Enter your child's name" required>
                            </div>
                            <div class="col-12">
                                <label for="parentsGender" class="form-label">Gender:  </label>
                                <select id="parentsGender" v-model="existing.cGender" name="parentsGender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="educationLevel" class="form-label">Current Education Level</label>
                                <select class="form-select" v-model="existing.selectedLevel"  id="educationLevel">
                                    <option selected value="Primary School">Primary School</option>
                                    <option value="Lower Sec">Lower Secondary School</option>
                                    <option value="Upper Sec">Upper Secondary School</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="subjects" class="form-label">Subjects</label>
                                <div id="subjects-checkbox">
                                    <div class="row">
                                        <div v-for="(subject, index) in existingSubjects" :key="subject" class="col-md-6">
                                            <input class="form-check-input" v-model="existing.selectedSubjects" type="checkbox" :value="existing.selectedLevel + ' ' + subject" :id="subject">
                                            <label class="form-check-label" :for="subject">{{ subject }}</label>
                                            <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center pt-3">
                    <button type="submit" id="saveDetailsButton" class="btn btn-primary">Update Details</button>
                </div>
                <div class="col-lg-0 col-xl-1"></div>

            </form>
        </div>
    </div> -->
    <!-- <div v-else>
        <div class="container">
            <div class="row">
                <form class="row g-3" enctype="multipart/form-data" id="parentForm" @submit.prevent="updateProfile">
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Parent Profile</h1>
                            <div class="row g-3" >
                                <div class="col-md-6">
                                    <label for="firstName"  class="form-label">Name</label>
                                    <input type="text" v-model="existing.pName" class="form-control" id="parentsName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="emailAddress" class="form-label">Email Address</label>
                                    <input type="email" disabled v-model="email" class="form-control" id="emailAddress" required>
                                </div>
                                
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="existing.pGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="contactNumber" class="form-label">Contact Number</label>
                                    <input type="number" v-model="existing.contact" class="form-control" id="phoneNumber" required>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="p-3 border bg-light">
                            <h1>Kid Profile</h1>
                            <div class="row g-3" enctype="multipart/form-data" id="childForm" @submit.prevent="addNewProfile">
                                <div class="col-md-6">
                                    <label for="firstName" class="form-label">Name</label>
                                    <input type="text" v-model="existing.cName" class="form-control" id="nameChild" required>
                                </div>
                                <div class="col-12">
                                    <label for="parentsGender">Gender:  </label>
                                    <select id="parentsGender" v-model="existing.cGender" name="parentsGender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="nearestMRT">Nearest MRT: </label>
                                    <select id="nearestMRT" v-model="existing.location" name="nearestMRT">
                                        <option value="" disabled>Select an MRT station</option>
                                        <option v-for="station,key in mrtStations" :key="station">
                                            {{ key }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="educationLevel" class="form-label">Current Education Level</label>
                                    <select class="form-select" v-model="existing.selectedLevel"  id="educationLevel">
                                        <option selected value="Primary School">Primary School</option>
                                        <option value="Lower Sec">Lower Secondary School</option>
                                        <option value="Upper Sec">Upper Secondary School</option>
                                    </select>
                                </div>
                                <div class="col-12">
                                    <label for="subjects" class="form-label">Subjects</label>
                                    <div id="subjects-checkbox">
                                        <div class="row">
                                            <div v-for="(subject, index) in existingSubjects" :key="subject" class="col-md-6">
                                                
                                                <input class="form-check-input" v-model="existing.selectedSubjects" type="checkbox" :value="existing.selectedLevel + ' ' + subject" :id="subject">
                                                <label class="form-check-label" :for="subject">{{ subject }}</label>
                                                <div v-if="(index + 1) % 2 === 0" class="w-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center pt-3">
                        <button type="submit" id="updateDetailsButton" class="btn btn-primary">Update Details</button>
                    </div>
                </form>
            </div>
        </div>
    </div> -->
</template>

<script>
import { db , auth} from '/src/firebase/init.js'
import {collection, addDoc, onSnapshot, query, where, doc, updateDoc} from 'firebase/firestore'
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                pName: '',
                cName: '',
                pGender: 'male',
                cGender: 'male',
                contact: null,
                selectedLevel: 'Primary School',
                selectedSubjects: [],
                location: '',
            },
            existing: {
                pName: '',
                cName: '',
                pGender: '',
                cGender: '',
                contact: null,
                selectedLevel: '',
                selectedSubjects: [],
                location: '',
            },
            subjectsOptions: {
                'Primary School': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese'],
                'Lower Sec': ['English', 'Math', 'Science', 'Chinese', 'Higher Chinese', 'Geography', 'Literature', 'History'],
                'Upper Sec': ['English', 'E Math', 'A Math', 'Chinese', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Social Studies', 'POA', 'Literature'],
            },
            email: "",
            id: null,
            uploaded: false,
            mrtStations: [],
            profileUID: null,
        }
    },
    computed: {
        emptySubjects() {
            return this.subjectsOptions[this.form.selectedLevel] || [];
        },
        existingSubjects(){
            return this.subjectsOptions[this.existing.selectedLevel] || [];
        }


    },
    methods: {
        
        addNewProfile: function() {
            addDoc(collection(db,'parents'),{
                parentName: this.form.pName,
                childName: this.form.cName,
                email: this.email,
                parentGender: this.form.pGender,
                childGender: this.form.cGender,
                level:this.form.selectedLevel,
                contactNumber: this.form.contact,
                subjects:this.form.selectedSubjects,
                userID:this.id,
                location: this.form.location,
                lat: this.mrtStations[this.form.location].lat,
                long: this.mrtStations[this.form.location].lng
            })
            alert("Profile Created Successfully!")
        },

        getUsers() {
            onSnapshot(query(collection(db,'parents'), where('userID', '==', this.id)), (snap) => {

                snap.forEach((doc) => {
                    if(doc.exists()) {
                        this.profileUID = doc.id
                        this.uploaded = true
                        this.existing.pName = doc.data().parentName
                        this.existing.cName = doc.data().childName
                        this.existing.contact = doc.data().parentContactNum
                        this.existing.pGender = doc.data().parentGender
                        this.existing.cGender = doc.data().childGender
                        this.existing.location = doc.data().location
                        this.existing.selectedSubjects = doc.data().subjects
                        this.existing.selectedLevel = doc.data().level
                    }
                })
            })
           
        },
        
        updateProfile: function(){
            const docRef = doc(db, 'parents', this.profileUID);
            updateDoc(docRef , {
                parentName: this.existing.pName,
                childName: this.existing.cName,
                parentGender: this.existing.pGender,
                childGender: this.existing.cGender,
                level:this.existing.selectedLevel,
                parentContactNum: this.existing.contact,
                subjects:this.existing.selectedSubjects,
                location: this.existing.location,
                lat: this.mrtStations[this.existing.location].lat,
                long: this.mrtStations[this.existing.location].lng
            })
            alert("Profile Updated Successfully!")
        }    
    }
    ,
    created(){
        var user = auth.currentUser
        if(user){
            this.id = user.uid
            this.email = user.email
        }
        
        this.getUsers()

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

<style scoped>
    .text-center {
            text-align: center!important;
        }

        .max-dimensions {
            max-width: 300px;
            max-height: 200px;
        }

        .z-index-minus-1 {
            z-index: -1!important;
        }
        
        .z-index-1 {
            z-index: 1;
        }

        .z-index-2 {
            z-index: 2;
        }
        .z-index-3 {
            position: relative;
            z-index: 3; 
        }
        .image-upload {
            text-align: center;
            position: relative;
        }

        .form-check-input {
            margin: 4px 10px 0 0;
            position: relative;
        }

        .image-preview {
            width: 200px; /* Set the desired width */
            height: 300px; /* Set the desired height */
            border: 2px dashed #ccc;
            padding: 10px;
            cursor: pointer;
            position: relative;
            margin: 0 auto; /* Center horizontally */
            display: flex;
            align-items: center; /* Center vertically */
            justify-content: center; /* Center horizontally */
        }

        #imageUpload {
            display: none;
        }

        #imageUpload2 {
            display: none;
        }

        .upload-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
            color: #007bff;
            cursor: pointer;
        }

        .subject-container {
            display: inline-block;
            width: auto; /* Let it adjust its width based on content */
            vertical-align: top;
        }

        /* Add some margin between the containers */
        .subject-container + .subject-container {
            margin-left: 10px;
        }

        /* Adjust styles for the label elements if needed */
        .subject-container label {
            margin-bottom: 5px;
            display: block;
        }

        /* Style the image preview container */
        .image-preview {
            border: 2px dashed #ccc;
            padding: 10px;
            cursor: pointer;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Style the "Upload Image" button */
        #upload-button {
            color: #007bff;
            cursor: pointer;
            font-size: 16px;
        }


        .form-label {
            font-weight: bold;
            color: #333;
            margin-bottom:1.2rem;
        }

        .form-control {
            background-color: transparent;
            border: none;
            border-bottom: 2px solid #707070;
            border-radius: 0;
            color: #646464;
            font-size: 15px;
            font-weight: 300;
            padding: 0 0 1rem;
            margin-bottom: 1.5rem;
        }

        .form-control:focus {
        color: #646464;
        background-color: transparent;
        border-color: #707070;
        box-shadow: none;
        }

        .form-control::placeholder {
        color: #b1b1b1;
        }

        /* Style checkboxes and radio buttons */
        form label {
        font-family: 'Constantia', serif;
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.1rem;
        margin-bottom: 1rem;
        }
        
        .form-check-input:checked + .form-check-label::before {
            background-color: #007bff; /* Change the selected checkbox color */
        }

        /* Style the "Create Profile" button */
        .btn-primary {
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
        }

        .btn-primary:hover {
            background-color: #0056b3; 
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
        .maximum-dimensions{
            max-width:800px;
            max-height:600px;
        }
        .teacherman-whiteboard {
            position: absolute;
            right: 0;
            max-width: 800px; /* You can adjust the max-width if needed */
            max-height: 600px; /* You can adjust the max-height if needed */
           
        }
        .rounded-custom {
            border-radius: 20px; /* Adjust the radius value as needed */
        }
        .shadowed-container {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px; /* Add padding for spacing and better visualization */
            background-color: whitesmoke; /* You can adjust the background color as needed */
        }
        label{
          text-transform:uppercase;
        }
        #subject-checkbox {
            text-transform: none; /* This prevents the uppercase transformation */
        }
</style>