<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">


    <div id="firstBox" style="background-color: #6DBCDB ;">
        <section class="pt-5 position-relative" data-sal="slide-up" data-sal-delay="400">
            <img class="position-absolute teacher-whiteboard  maximum-dimensions" src="../assets/teacher.png" alt="teacher">
            <img class="position-absolute teacherman-whiteboard  maximum-dimensions" src="../assets/teacherman.png" alt="teacherman">
            <div class="container position-relative">
              <div class="row justify-content-center">
                <div class="col-md-9 col-lg-7 col-xl-6">
                  <div class="text-center chalkboard-text">
                    <h2 class="mb-3">TUTORS PROFILE PAGE</h2>
                    <p>Please fill this in for us to get to know you better.</p>
                  </div>
                </div>         
              </div>
            </div>
        </section>
        <div v-if="!uploaded">
            <div class="container mt-5 z-index-3">
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10 p-3 bg-white border rounded-custom shadowed-container">
                        <form class="row g-3 " id="profileForm" enctype="multipart/form-data" @submit.prevent="addNewProfile">
                            <!-- Image Upload and User Information Left Side -->
                            <div class="col-md-12 col-sm-12 col-lg-4 text-center">
                                <div class="image-upload">
                                    <label for="imageUpload" class="form-label">Profile Image *<i class="fas fa-edit"></i></label>
                                    <div class="image-preview " >
                                        <input type="file" ref="myPhoto" id="imageUpload" name="profileImage" accept="image/*" @change="showImagePreview">
                                        <label for="imageUpload" v-if="!selectedImage" class="upload-button">Upload Image</label>
                                        <img v-if="selectedImage" :src="selectedImage" alt="Preview" width="200" height="300">
                                    </div>
                                </div>
                            </div>
                            <!-- Right Side (Form) -->
                            <div class="col-md-12 col-sm-12 col-lg-8 ">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="name" class="form-label">Name *</label>
                                        <input type="text" v-model="form.name" class="form-control mb-0" placeholder = 'Enter your name' id="name" required>
                                    </div>
                                    <div class="col-md-6 mt-4 mt-md-0">
                                        <label for="emailAddress" class="form-label">Email Address</label>
                                        <input type="email" disabled v-model="email" class="form-control" id="emailAddress">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="contact" class="form-label">Contact Number *</label>
                                        <input type="number" class="form-control" v-model="form.contact" id="contact">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="highestEdu" class="form-label">Highest Education *</label>
                                        <input type="text" v-model="form.highestEdu" class="form-control" id="highestEdu">
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div class="col-6 ">
                                        <label for="tutorGender" class="form-label">Gender : * &nbsp;  </label>
                                        <select id="tutorGender" v-model="form.gender" name="tutorGender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <label for="nearestMRT" class="form-label">Nearest MRT: *</label>
                                        <div class="position-static">
                                            <select id="nearestMRT" v-model="form.location" name="nearestMRT">
                                                <!-- The dropdown options will be added here -->
                                                <option value="" disabled>Select an MRT station</option>
                                                <option v-for="station, key in mrtStations" :key="station">
                                                    {{ key }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Checkbox Options -->
                                <div class="row">
                                    <div class="col-12 pt-3">
                                        <label class="form-label">I prefer to teach: *</label>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Primary School" v-model="form.selectedLevel" type="checkbox" id="teachPrimary">
                                            <label class="form-check-label"  for="teachPrimary">Primary School</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Lower Sec" v-model="form.selectedLevel" type="checkbox" id="teachLowerSecondary">
                                            <label class="form-check-label" for="teachLowerSecondary">Lower Secondary</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Upper Sec" v-model="form.selectedLevel" type="checkbox" id="teachUpperSecondary">
                                            <label class="form-check-label" for="teachUpperSecondary">Upper Secondary</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Checkbox Options - Preferred Subjects (Initially Hidden) -->
                                <div class="row">
                                    <div class="col-12 pt-3 pb-3" id="preferredSubjects" >
                                        <label class="form-label">Preferred Subjects : *</label>
                                        <div class="d-flex flex-wrap-md">
                                            <!-- Primary School Subjects -->
                                            <div id="primarySubjects"  :style="{display: form.selectedLevel.includes('Primary School') ? 'block' : 'none'}" class="subject-container">
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Math" v-model="form.selectedSubjects" type="checkbox" id="primaryMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Primary School Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School English" v-model="form.selectedSubjects" type="checkbox" id="primaryEnglishSubject">
                                                    <label class="form-check-label" for="englishSubject">Primary School English</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Science" v-model="form.selectedSubjects" type="checkbox" id="primaryScienceSubject">
                                                    <label class="form-check-label" for="scienceSubject">Primary School Science</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Chinese" v-model="form.selectedSubjects" type="checkbox" id="primaryChineseSubject">
                                                    <label class="form-check-label" for="chineseSubject">Primary School Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Higher Chinese" v-model="form.selectedSubjects" type="checkbox" id="primaryHigherChineseSubject">
                                                    <label class="form-check-label" for="higherChineseSubject">Primary School Higher Chinese</label>
                                                </div>
                                            </div>

                                            <!-- Lower Secondary Subjects -->
                                            <div id="lowerSecondarySubjects"  :style="{display: form.selectedLevel.includes('Lower Sec') ? 'block' : 'none'}" class="subject-container">
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Math" v-model="form.selectedSubjects" type="checkbox" id="lowerSecMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Lower Sec Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec English" v-model="form.selectedSubjects" type="checkbox" id="lowerSecEnglishSubject">
                                                    <label class="form-check-label" for="englishSubject">Lower Sec English</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Science" v-model="form.selectedSubjects" type="checkbox" id="lowerSecScienceSubject">
                                                    <label class="form-check-label" for="scienceSubject">Lower Sec Science</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Chinese" v-model="form.selectedSubjects" type="checkbox" id="lowerSecChineseSubject">
                                                    <label class="form-check-label" for="chineseSubject">Lower Sec Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Higher Chinese" v-model="form.selectedSubjects" type="checkbox" id="lowerSecChineseSubject">
                                                    <label class="form-check-label" for="higherChineseSubject">Lower Sec Higher Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Geography" v-model="form.selectedSubjects" type="checkbox" id="lowerSecGeographySubject">
                                                    <label class="form-check-label" for="geographySubject">Lower Sec Geography</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec History" v-model="form.selectedSubjects" type="checkbox" id="lowerSecHistorySubject">
                                                    <label class="form-check-label" for="historySubject">Lower Sec History</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Literature" v-model="form.selectedSubjects" type="checkbox" id="lowerSecLiteratureSubject">
                                                    <label class="form-check-label" for="literatureSubject">Lower Sec Literature</label>
                                                </div>
                                            </div>

                                            <!-- Upper Secondary Subjects -->
                                            <div id="upperSecondarySubjects" :style="{display: form.selectedLevel.includes('Upper Sec') ? 'block' : 'none'}" class="subject-container">
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec E Math" v-model="form.selectedSubjects" type="checkbox" id="upperSecEMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Upper Sec E Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec A Math" v-model="form.selectedSubjects" type="checkbox" id="upperSecAMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Upper Sec A Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec English" v-model="form.selectedSubjects" type="checkbox" id="upperSecEnglishSubject">
                                                    <label class="form-check-label" for="englishSubject">Upper Sec English</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Physics" v-model="form.selectedSubjects" type="checkbox" id="upperSecPhysicsSubject">
                                                    <label class="form-check-label" for="physicsSubject">Upper Sec Physics</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Chemistry" v-model="form.selectedSubjects" type="checkbox" id="upperSecChemistrySubject">
                                                    <label class="form-check-label" for="chemSubject">Upper Sec Chemistry</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Biology" v-model="form.selectedSubjects" type="checkbox" id="upperSecBiologySubject">
                                                    <label class="form-check-label" for="bioSubject">Upper Sec Biology</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Chinese" v-model="form.selectedSubjects" type="checkbox" id="upperSecChineseSubject">
                                                    <label class="form-check-label" for="chineseSubject">Upper Sec Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Higher Chinese" v-model="form.selectedSubjects" type="checkbox" id="upperSecChineseSubject">
                                                    <label class="form-check-label" for="higherChineseSubject">Upper Sec Higher Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Geography" v-model="form.selectedSubjects" type="checkbox" id="upperSecGeographySubject">
                                                    <label class="form-check-label" for="geographySubject">Upper Sec Geography</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec History" v-model="form.selectedSubjects" type="checkbox" id="upperSecHistorySubject">
                                                    <label class="form-check-label" for="historySubject">Upper Sec History</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Social Studies" v-model="form.selectedSubjects" type="checkbox" id="upperSecSocialStudiesySubject">
                                                    <label class="form-check-label" for="historySubject">Upper Sec Social Studies</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Literature" v-model="form.selectedSubjects" type="checkbox" id="upperSecLiteratureSubject">
                                                    <label class="form-check-label" for="literatureSubject">Upper Sec Literature</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec POA" v-model="form.selectedSubjects" type="checkbox" id="upperSecPOASubject">
                                                    <label class="form-check-label" for="literatureSubject">POA</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-12">
                                    <button class="btn btn-primary">Create Profile</button>
                                </div> 
                            </div>
                        </form>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="container mt-5 z-index-3">
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10 p-3 bg-white border rounded-custom shadowed-container">
                        <form class="row g-3 " id="profileForm" enctype="multipart/form-data" @submit.prevent="updateProfile">
                            <!-- Image Upload and User Information Left Side -->
                            <div class="col-md-12 col-sm-12 col-lg-4 text-center">
                                <div class="image-upload">
                                    <label for="imageUpload" class="form-label">Profile Image *<i class="fas fa-edit"></i></label>
                                    <div class="image-preview " >
                                        <input type="file" ref="existingPhoto" id="imageUpload" name="profileImage" accept="image/*" @change="showNewImagePreview">
                                        <label for="imageUpload" class="upload-button">
                                            <img :src="existing.newPhoto" v-if="!newPhotoSelected" width="200" height="300">
                                            <img :src="newPhotoSelected" v-if="newPhotoSelected" width="200" height="300">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Side (Form) -->
                            <div class="col-md-12 col-sm-12 col-lg-8 ">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="name" class="form-label">Name *</label>
                                        <input type="text" v-model="existing.name" class="form-control" id="name">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="emailAddress"  class="form-label">Email Address</label>
                                        <input type="email" disabled v-model="email" class="form-control" id="emailAddress">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="contact" class="form-label">Contact Number *</label>
                                        <input type="number" class="form-control" v-model="existing.contact" id="contact">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="highestEdu" class="form-label">Highest Education *</label>
                                        <input type="text" v-model="existing.highestEdu" class="form-control" id="highestEdu">
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div class="col-6 ">
                                        <label for="tutorGender " class="form-label">Gender : * &nbsp; </label>
                                        <select id="tutorGender" v-model="existing.gender" name="tutorGender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div class="col-6">
                                        <label for="nearestMRT" class="form-label">Nearest MRT : * </label>
                                        <div class="position-static">
                                            <select id="nearestMRT" v-model="existing.location" name="nearestMRT">
                                                <!-- The dropdown options will be added here -->
                                                <option value="" disabled>Select an MRT station</option>
                                                <option v-for="station, key in mrtStations" :key="station" >
                                                    {{ key }}
                                                </option>
                                            </select>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                <!-- Checkbox Options -->
                                <div class="row">
                                    <div class="col-12 pt-3">
                                        <label class="form-label">I prefer to teach :  *</label>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Primary School" v-model="existing.selectedLevel" type="checkbox" id="teachPrimary">
                                            <label class="form-check-label"  for="teachPrimary">Primary School</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Lower Sec" v-model="existing.selectedLevel" type="checkbox" id="teachLowerSecondary">
                                            <label class="form-check-label" for="teachLowerSecondary">Lower Secondary</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Upper Sec" v-model="existing.selectedLevel" type="checkbox" id="teachUpperSecondary">
                                            <label class="form-check-label" for="teachUpperSecondary">Upper Secondary</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Checkbox Options - Preferred Subjects (Initially Hidden) -->
                                <div class="row">
                                    <div class="col-12 pt-3 pb-3" id="preferredSubjects" >
                                        <label class="form-label">Preferred Subjects : *</label>
                                        <div class="d-flex flex-wrap-md">
                                            <!-- Primary School Subjects -->
                                            <div id="primarySubjects"  :style="{display: existing.selectedLevel.includes('Primary School') ? 'block' : 'none'}" class="subject-container">
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Math" v-model="existing.selectedSubjects" type="checkbox" id="primaryMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Primary School Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School English" v-model="existing.selectedSubjects" type="checkbox" id="primaryEnglishSubject">
                                                    <label class="form-check-label" for="englishSubject">Primary School English</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Science" v-model="existing.selectedSubjects" type="checkbox" id="primaryScienceSubject">
                                                    <label class="form-check-label" for="scienceSubject">Primary School Science</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Chinese" v-model="existing.selectedSubjects" type="checkbox" id="primaryChineseSubject">
                                                    <label class="form-check-label" for="chineseSubject">Primary School Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Primary School Higher Chinese" v-model="existing.selectedSubjects" type="checkbox" id="primaryHigherChineseSubject">
                                                    <label class="form-check-label" for="higherChineseSubject">Primary School Higher Chinese</label>
                                                </div>
                                            </div>

                                            <!-- Lower Secondary Subjects -->
                                            <div id="lowerSecondarySubjects"  :style="{display: existing.selectedLevel.includes('Lower Sec') ? 'block' : 'none'}" class="subject-container">
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Math" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Lower Sec Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec English" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecEnglishSubject">
                                                    <label class="form-check-label" for="englishSubject">Lower Sec English</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Science" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecScienceSubject">
                                                    <label class="form-check-label" for="scienceSubject">Lower Sec Science</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Chinese" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecChineseSubject">
                                                    <label class="form-check-label" for="chineseSubject">Lower Sec Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Higher Chinese" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecChineseSubject">
                                                    <label class="form-check-label" for="higherChineseSubject">Lower Sec Higher Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Geography" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecGeographySubject">
                                                    <label class="form-check-label" for="geographySubject">Lower Sec Geography</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec History" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecHistorySubject">
                                                    <label class="form-check-label" for="historySubject">Lower Sec History</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Lower Sec Literature" v-model="existing.selectedSubjects" type="checkbox" id="lowerSecLiteratureSubject">
                                                    <label class="form-check-label" for="literatureSubject">Lower Sec Literature</label>
                                                </div>
                                            </div>

                                            <!-- Upper Secondary Subjects -->
                                            <div id="upperSecondarySubjects" :style="{display: existing.selectedLevel.includes('Upper Sec') ? 'block' : 'none'}" class="subject-container">
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec E Math" v-model="existing.selectedSubjects" type="checkbox" id="upperSecEMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Upper Sec E Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec A Math" v-model="existing.selectedSubjects" type="checkbox" id="upperSecAMathSubject">
                                                    <label class="form-check-label" for="mathSubject">Upper Sec A Math</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec English" v-model="existing.selectedSubjects" type="checkbox" id="upperSecEnglishSubject">
                                                    <label class="form-check-label" for="englishSubject">Upper Sec English</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Physics" v-model="existing.selectedSubjects" type="checkbox" id="upperSecPhysicsSubject">
                                                    <label class="form-check-label" for="physicsSubject">Upper Sec Physics</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Chemistry" v-model="existing.selectedSubjects" type="checkbox" id="upperSecChemistrySubject">
                                                    <label class="form-check-label" for="chemSubject">Upper Sec Chemistry</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Biology" v-model="existing.selectedSubjects" type="checkbox" id="upperSecBiologySubject">
                                                    <label class="form-check-label" for="bioSubject">Upper Sec Biology</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Chinese" v-model="existing.selectedSubjects" type="checkbox" id="upperSecChineseSubject">
                                                    <label class="form-check-label" for="chineseSubject">Upper Sec Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Higher Chinese" v-model="existing.selectedSubjects" type="checkbox" id="upperSecChineseSubject">
                                                    <label class="form-check-label" for="higherChineseSubject">Upper Sec Higher Chinese</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Geography" v-model="existing.selectedSubjects" type="checkbox" id="upperSecGeographySubject">
                                                    <label class="form-check-label" for="geographySubject">Upper Sec Geography</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec History" v-model="existing.selectedSubjects" type="checkbox" id="upperSecHistorySubject">
                                                    <label class="form-check-label" for="historySubject">Upper Sec History</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Social Studies" v-model="existing.selectedSubjects" type="checkbox" id="upperSecSocialStudiesySubject">
                                                    <label class="form-check-label" for="historySubject">Upper Sec Social Studies</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Literature" v-model="existing.selectedSubjects" type="checkbox" id="upperSecLiteratureSubject">
                                                    <label class="form-check-label" for="literatureSubject">Upper Sec Literature</label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input" value="Upper Sec Principles of Accounts" v-model="existing.selectedSubjects" type="checkbox" id="upperSecPOASubject">
                                                    <label class="form-check-label" for="literatureSubject">Principles of Accounts</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div> 
                            <div class="row text-center">
                                <div class="col-12">
                                    <button class="btn btn-primary">Update Profile</button>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script>
import { db , auth, storage} from '/src/firebase/init.js'
import {ref, uploadBytes, getDownloadURL,} from 'firebase/storage'
import {collection, addDoc, onSnapshot, query, where, doc, updateDoc} from 'firebase/firestore'
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                gender: 'male',
                selectedLevel: [],
                selectedSubjects: [],
                name: '',
                highestEdu: '',
                contact: null,
                location: '',
                
            },
            selectedImage: null,
            newPhotoSelected: null,
            existing: {
                gender: 'male',
                selectedLevel: [],
                selectedSubjects: [],
                name: '',
                highestEdu: '',
                contact: null,
                location: '',
                newPhoto: null
            },
            email: "",
            id: null,
            photoURL: null,
            uploaded: false,
            mrtStations: {},
            profileUID: null,
            change: false
        }
    },
    methods: {
        
        addNewProfile: function() {
            const storageRef = ref(storage, 'tutorsProfile/' + this.id + 'DP')
            uploadBytes(storageRef, this.$refs.myPhoto.files[0])
            .then(() => {
                console.log("uploaded")
                return getDownloadURL(storageRef)
                
            })
            .then((url) => {
                this.photoURL = url
                addDoc(collection(db,'tutors'),{
                    name: this.form.name,
                    email: this.email,
                    gender: this.form.gender,
                    highestEdu:this.form.highestEdu,
                    teaches:this.form.selectedLevel,
                    contactNumber: this.form.contact,
                    subjects:this.form.selectedSubjects,
                    userID:this.id,
                    photo_url:this.photoURL,
                    location: this.form.location,
                    lat: this.mrtStations[this.form.location].lat,
                    long: this.mrtStations[this.form.location].lng
                })
                alert("Profile Created Successfully!")
            })

        },

        getUsers() {
            onSnapshot(query(collection(db,'tutors'), where('userID', '==', this.id)), (snap) => {

                snap.forEach((doc) => {
                    if(doc.exists()) {
                        this.profileUID = doc.id
                        this.uploaded = true
                        this.existing.newPhoto = doc.data().photo_url
                        this.existing.name = doc.data().name
                        this.existing.contact = doc.data().contactNumber
                        this.existing.gender = doc.data().gender
                        this.existing.location = doc.data().location
                        this.existing.selectedSubjects = doc.data().subjects
                        this.existing.selectedLevel = doc.data().teaches
                        this.existing.highestEdu = doc.data().highestEdu
                    }
                })
            })
           
        },
        updateProfile: function(){
            if(this.newPhotoSelected){
                const storageRef = ref(storage, 'tutorsProfile/' + this.id + 'DP')
                uploadBytes(storageRef, this.$refs.existingPhoto.files[0])
                .then(() => {
                    console.log("uploaded")
                    return getDownloadURL(storageRef)
                })
                .then((url) => {
                    const docRef = doc(db, 'tutors', this.profileUID);
                    updateDoc(docRef , {
                        name: this.existing.name,
                        photo_url: url,
                        gender: this.existing.gender,
                        highestEdu:this.existing.highestEdu,
                        teaches:this.existing.selectedLevel,
                        contactNumber: this.existing.contact,
                        subjects:this.existing.selectedSubjects,
                        location: this.existing.location    
                    })
                })
            }
            else{
                const docRef = doc(db, 'tutors', this.profileUID);
                    updateDoc(docRef , {
                        name: this.existing.name,
                        gender: this.existing.gender,
                        highestEdu:this.existing.highestEdu,
                        teaches:this.existing.selectedLevel,
                        contactNumber: this.existing.contact,
                        subjects:this.existing.selectedSubjects,
                        location: this.existing.location    
                    })
            }
            
            alert("Profile Updated Successfully!")
        },
        showImagePreview(event){
            const input = event.target
            if(input.files && input.files[0]){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.selectedImage = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
            else{
                this.selectedImage = null
            }
        },

        showNewImagePreview(event){
            const input = event.target
            if(input.files && input.files[0]){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.newPhotoSelected = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
            else{
                this.newPhotoSelected = null
            }
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
                    mrtStn[key] = {lat, lng}

                    this.mrtStations = Object.fromEntries(
                        Object.entries(mrtStn).sort(([a], [b]) => a.localeCompare(b))
                    )
                })
            })
            .catch((error) => {
                console.log(error)
            })
    },
    mounted(){
        this.getUsers()
        
    }
}
</script>

<style scoped>
        *{
            font-family: 'Constantia', serif;
        }
        .text-center {
            text-align: center!important;
        }

        #firstBox{
            margin-top: 65px;
        }
        .z-index-3 {
            position: relative;
            z-index: 3; 
        }
        .max-dimensions {
            max-width: 300px;
            max-height: 200px;
        }

        .image-upload {
            text-align: center;
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
            margin-bottom: 2rem;
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
        text-transform: uppercase;
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

        .chalkboard-text {
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 20px;
            border-radius: 5px;
            z-index: -1; /* Adjust this value as needed to ensure it's above the images */
            border: 5px solid #8B4513; /* Dark border color resembling a chalkboard frame */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a subtle shadow for depth */
        }
        .rounded-custom {
            border-radius: 20px; /* Adjust the radius value as needed */
        }
        .shadowed-container {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px; /* Add padding for spacing and better visualization */
            background-color: whitesmoke; /* You can adjust the background color as needed */
        }
        
        .form-group {
            margin-bottom: 3rem;
        }
        .form-check-label {
            color: #979797;
            font-family: "runda",sans-serif;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 0;
            text-transform: none;
        }

        /* stylelint-disable-next-line no-duplicate-selectors */
        select.form-control {
            &[size],
            &[multiple] {
                height: auto;
            }
        }
</style>