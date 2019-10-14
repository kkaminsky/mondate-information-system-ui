<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md12>
        <v-container fluid >
          <v-layout row >
            <v-flex md8 offset-md2>
              <v-data-table
                :headers="headers"
                :items="data"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>My USERS</v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                    <div class="flex-grow-1"></div>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.username" label="username"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.level" label="level"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-combobox :items="roles" v-model="editedItem.role" label="role"></v-combobox>
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
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(item)"
                  >
                    delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">update</v-btn>
                </template>
              </v-data-table>

            </v-flex>

          </v-layout>
          <v-layout row>
            <v-flex md8 offset-md2>
              <v-data-table
                :headers="headersFiles"
                :items="dataFiles"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>My FILES</v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                    <div class="flex-grow-1"></div>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.username" label="username"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.level" label="level"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-combobox :items="roles" v-model="editedItem.role" label="role"></v-combobox>
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
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(item)"
                  >
                    delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">update</v-btn>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex md8 offset-md2>
              <v-data-table
                :headers="headersReq"
                :items="dataReq"
                sort-by="calories"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>My REQUESTS FOR DELETE</v-toolbar-title>
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                    <div class="flex-grow-1"></div>
                    <v-dialog v-model="dialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.username" label="username"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.level" label="level"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-combobox :items="roles" v-model="editedItem.role" label="role"></v-combobox>
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
                  </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(item)"
                  >
                    delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">update</v-btn>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'username', value: 'username' },
        { text: 'role', value: 'role' },
        { text: 'level', value: 'level'},
        { text: 'Actions', value: 'action', sortable: false, align: 'right' },
      ],
      data: [],
      dataFiles:[],
      headersFiles:[
        { text: 'file name', value: 'fileName' },
        { text: 'level', value: 'level'},
        { text: 'Actions', value: 'action', sortable: false, align: 'right' },
      ],
      dataReq: [],
      headersReq:[
        { text: 'file name', value: 'fileName' },
        { text: 'owner name', value: 'ownerName'},
        { text: 'Actions', value: 'action', sortable: false, align: 'right' },
      ],
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
      },
      oldUsername: "",
      roles:["ROLE_USER","ROLE_ADMIN"]
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$http.post("/api/user/all",{
          userCheck:{
            username: localStorage.getItem("username"),
            signature: localStorage.getItem("signature"),
            userRole: localStorage.getItem("userRole")
          }
        }).then(res=>{
          this.data = res.data
        },error=>{
          console.log(Object.keys(error.response))

          alert("Ошибка!" + error.response.data.message)
        })


        this.$http.post("/api/user/get/files",{
          userCheck:{
            username: localStorage.getItem("username"),
            signature: localStorage.getItem("signature"),
            userRole: localStorage.getItem("userRole")
          }
        }).then(res=>{
          this.dataFiles = res.data
        },error=>{
          console.log(Object.keys(error.response))

          alert("Ошибка!" + error.response.data.message)
        })


        this.$http.post("/api/user/get/reqs",{
          userCheck:{
            username: localStorage.getItem("username"),
            signature: localStorage.getItem("signature"),
            userRole: localStorage.getItem("userRole")
          }
        }).then(res=>{
          this.dataReq = res.data
        },error=>{
          console.log(Object.keys(error.response))

          alert("Ошибка!" + error.response.data.message)
        })
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.oldUsername = item.username
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
        confirm('Are you sure you want to delete this item?')
        this.$http.post("/api/user/delete",{
          userCheck:{
            username: localStorage.getItem("username"),
            userRole: localStorage.getItem("userRole"),
            signature: localStorage.getItem("signature")
          },
          username: item.username
        }).then(res=>{
          setTimeout(()=>{
            this.initialize()
          }, 500)
        },err=>{
          alert(err)
        })

      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.$http.post("/api/user/edit",{
          userCheck:{
            username: localStorage.getItem("username"),
            userRole: localStorage.getItem("userRole"),
            signature: localStorage.getItem("signature")
          },
          oldUsername:this.oldUsername,
          newUsername: this.editedItem.username,
          newRole: this.editedItem.role,
          newLevel: this.editedItem.level
        }).then(res=>{
          setTimeout(()=>{
            this.initialize()
          },300)
        }, err=>{
          alert(err)
        })
        this.close()
      },
    },
  }
</script>

<style scoped>

</style>
