<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <v-container fluid >
          <v-layout row>
            <v-flex  class="headline my-4" style="text-align: left">
              <p>This is your files.
              </p>
            </v-flex>
          </v-layout>
          <v-layout row >
            <v-flex md4 v-for="file in files" :id="file.id">
              <v-card>
                <v-card-title>
                  {{file.fileName}}
                </v-card-title>
                <v-card-actions>
                  <v-btn v-if="file.readFlag" @click="readFile(file)" text>
                    read
                  </v-btn>
                  <v-btn v-if="file.writeFlag" @click="writeFile(file)"  text>
                    write
                  </v-btn>
                  <v-btn :disabled="file.requestFlag" v-if="file.deleteFlag" @click="deleteFile(file)"  text>
                    delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex style="text-align: center" class="mt-5">
              <v-btn text @click="dialog = true" >
                Create file
              </v-btn>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Create file</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="fileName" label="File name"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogRead" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Read file</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea v-model="text" disabled="true"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="dialogRead = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogWrite" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Write file</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-textarea v-model="textWrite"></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="closeWrite">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveWrite">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "FileComponent",
      data(){
          return {
            files:[],
            fileName: "",
            dialog: false,
            dialogRead: false,
            dialogWrite: false,
            dialogTakeGrant: false,
            text: "",
            textWrite: "",
            fileBuffer:{},
            comboboxData:[],
            users: [],
            selectedUser:"",
            selectedGrant: ""
          }
      },
      methods:{
          readFile(file){
            this.$http.post("/api/user/file/read",{
              userCheck:{
                username: localStorage.getItem("username"),
                userRole: localStorage.getItem("userRole"),
                signature: localStorage.getItem("signature")
              },
              fileName: file.fileName
            }).then(res=>{
              this.text = res.data
              this.dialogRead = true
            })
          },
        writeFile(file){
          this.dialogWrite = true
          this.fileBuffer = file
        },
        deleteFile(file){
          let a = confirm("Are you sure?")
          if (a){
            this.$http.post("/api/user/file/send_delete_req",{
              userCheck:{
                username: localStorage.getItem("username"),
                userRole: localStorage.getItem("userRole"),
                signature: localStorage.getItem("signature")
              },
              fileName: file.fileName
            }).then(res=>{
              this.getFiles()
            })
          }
        },
          getFiles(){
            this.$http.post("/api/user/get/files",{
              userCheck:{
                username: localStorage.getItem("username"),
                signature: localStorage.getItem("signature"),
                userRole: localStorage.getItem("userRole")
              }
            }).then(res=>{
              this.files = res.data
            })
          },
        getAllUsers(){
          this.$http.post("/api/user/all",{
            userCheck:{
              username: localStorage.getItem("username"),
              userRole: localStorage.getItem("userRole"),
              signature: localStorage.getItem("signature")
            }
          }).then(res=>{
            this.users = res.data.map(u=>u.username)
          })
        },
        close () {
          this.dialog = false
        },
        closeWrite () {
          this.textWrite = ""
          this.fileBuffer = {}
          this.dialogWrite = false
        },
        closeTakeGrant () {
          this.selectedUser = ""
          this.selectedGrant = ""
          this.fileBuffer = {}
          this.dialogTakeGrant = false

        },
        saveWrite(){
          this.$http.post("/api/user/file/write",{
            userCheck:{
              username: localStorage.getItem("username"),
              userRole: localStorage.getItem("userRole"),
              signature: localStorage.getItem("signature")
            },
            fileName: this.fileBuffer.fileName,
            text: this.textWrite
          }).then(res=>{
            this.closeWrite()
          })
        },
        save () {
          this.$http.post("/api/user/create/file",{
            userCheck:{
              username: localStorage.getItem("username"),
              userRole: localStorage.getItem("userRole"),
              signature: localStorage.getItem("signature")
            },
            fileName: this.fileName
          }).then(res=>{
            setTimeout(()=>{
              this.getFiles()
            },300)
          }, e=>{
            alert("" + e.response.data.message)
          })
          this.close()
        },
      },
      created() {
          this.getFiles()
      }
    }
</script>

<style scoped>

</style>
