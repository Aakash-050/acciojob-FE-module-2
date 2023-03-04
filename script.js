const blogs = document.querySelector('#blogs')
const createButton = document.querySelector('#create')
const createModal = document.querySelector('#createModal')
const createInputHeading = document.querySelector('#createHeading')
const createInputContent = document.querySelector('#createContent')
const editModal = document.querySelector('#editModal')
const editInputHeading = document.querySelector('#editHeading')
const editInputContent = document.querySelector('#editContent')
const publishPost = document.querySelector('#publishPost')
const cancelPost = document.querySelector('#cancelPost')
const savePost = document.querySelector('#savePost')
const deletePost = document.querySelector('#deletePost')
const createCloseIcon = document.querySelector('#createClose')
const editCloseIcon = document.querySelector('#editClose')

let blogArray = []
let editId = null

function createBlog(object){
    const blogDiv = document.createElement('div')
    blogDiv.id = object.id
    blogDiv.classList.add('blog')
    const headingDiv = document.createElement('div')
    headingDiv.classList.add('heading')
    const contentDiv = document.createElement('div')
    contentDiv.classList.add('content')
    const footerDiv = document.createElement('div')
    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('buttonContainer')
    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    const dateDiv = document.createElement('div')
    const dateContent = document.createElement('span')
    dateContent.classList.add('date')
    headingDiv.textContent = object.heading
    contentDiv.textContent = object.content
    editButton.textContent = 'Edit Post'
    deleteButton.textContent = 'Delete Post'
    dateContent.textContent = `Created At: ${new Date().toLocaleString('en-IN')}`
    editButton.addEventListener('click',() => {
        editModal.classList.remove('hide')
        editModal.classList.add('active')
        populateInputInEditBlog(object)
        editId = object.id
    })
    deleteButton.addEventListener('click',() => {
        blogDiv.remove()
        editModal.classList.remove('active')
        editModal.classList.add('hide')
    })
    buttonDiv.append(editButton,deleteButton)
    dateDiv.append(dateContent)
    blogDiv.append(headingDiv,contentDiv,footerDiv)
    footerDiv.append(buttonDiv,dateDiv)
    blogs.append(blogDiv)
}

function populateInputInEditBlog(object){
    const headingDiv = document.querySelector(`[id="${object.id}"] > .heading`)
    const contentDiv = document.querySelector(`[id="${object.id}"] > .content`)
    editInputHeading.value = headingDiv.textContent
    editInputContent.value = contentDiv.textContent
}

createCloseIcon.addEventListener('click',() => {
    createInputHeading.value = ''
    createInputContent.value = ''
    createModal.classList.add('hide')
    createModal.classList.remove('active')
})

editCloseIcon.addEventListener('click',() => {
    editModal.classList.remove('active')
    editModal.classList.add('hide')
})

createButton.addEventListener('click',() => {
    createModal.classList.add('active')
    createModal.classList.remove('hide')
})

publishPost.addEventListener('click',(e) => {
    e.preventDefault()
    console.log(blogArray,blogArray.length)
    const object = {
        id: blogArray.length === 0 ? 1 : blogArray.length+1,
        heading: createInputHeading.value,
        content:createInputContent.value
    }
    blogArray.push(object)
    createBlog(object)
    createInputHeading.value = ''
    createInputContent.value = ''
    createModal.classList.add('hide')
    createModal.classList.remove('active')
})

cancelPost.addEventListener('click',(e) => {
    e.preventDefault()
    createModal.classList.add('hide')
    createModal.classList.remove('active')
    createInputHeading.value = ''
    createInputContent.value = ''
})

savePost.addEventListener('click',(e) => {
    e.preventDefault()
    blogArray[editId-1]['heading'] = editInputHeading.value
    blogArray[editId-1]['content'] = editInputContent.value
    document.querySelector(`[id="${editId}"] > .heading`).textContent = editInputHeading.value 
    document.querySelector(`[id="${editId}"] > .content`).textContent = editInputContent.value 
    document.querySelector(`[id="${editId}"] .date`).textContent = `Last Modified At: ${new Date().toLocaleString('en-IN')}`
    editInputHeading.value = ''
    editInputContent.value = ''
    editModal.classList.add('hide')
    editModal.classList.remove('active')
    editId = null
})

deletePost.addEventListener('click',(e) => {
    e.preventDefault()
    editModal.classList.add('hide')
    editModal.classList.remove('active')
    document.getElementById(editId).remove()
    blogArray = blogArray.filter((e) => e.id === editId)
})